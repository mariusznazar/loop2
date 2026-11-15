/**
 * The entry of the screen of the list of accounts in the registry of screens (D-411, D-281): built on
 * entering `#/konta` and taken down on leaving, so each entering reads the list again. A new screen
 * copies this entry. The entry holds what the screen shows — the state of the read, of the operation
 * whose answer is awaited and of the confirmation of „Zablokuj” — and the requests the screen's acts
 * make through the account client; the screen itself (`accounts-screen.tsx`) only draws it. Nothing
 * here runs when the module is imported.
 */
import type {
  AccountClient,
  AccountFailure,
  AccountResult,
  PanelOutcome,
} from "../account-api.js";
import {
  createAccountsScreen,
  type AccountAction,
  type AccountsScreenProps,
} from "./accounts-screen.js";
import type { ScreenEntry } from "./screen-registry.js";

export type AccountsEntryOptions = {
  /** The requests of the screen: the list and the four operations. */
  readonly client: Pick<
    AccountClient,
    | "listAccounts"
    | "blockAccount"
    | "unblockAccount"
    | "grantPreviousSave"
    | "revokePreviousSave"
  >;
  /** An answer said there is no session: the page ends the signed-in state (D-211). */
  readonly onSignedOut: () => void;
};

const READ_FAILED = "Nie udało się wczytać listy kont.";
const NO_RIGHT = "To konto nie ma prawa do listy kont.";
const OPERATION_FAILED = "Nie udało się wykonać operacji.";
const OWNER_NOT_BLOCKABLE = "Konta z rolą właściciela nie można zablokować.";
const UNKNOWN_ACCOUNT = "Konta o tym adresie już nie ma.";

function signedOut(failure: AccountFailure): boolean {
  return failure.kind === "refused" && failure.status === 401;
}

function ownerForbidden(failure: AccountFailure): boolean {
  return failure.kind === "refused" && failure.code === "owner-forbidden";
}

/** The one sentence a failed operation is said in. */
function operationSentence(failure: AccountFailure): string {
  if (failure.kind === "refused") {
    if (failure.code === "owner-not-blockable") return OWNER_NOT_BLOCKABLE;
    if (failure.code === "unknown-account") return UNKNOWN_ACCOUNT;
  }
  return OPERATION_FAILED;
}

/** Makes the entry of the list of accounts. */
export function createAccountsEntry(
  options: AccountsEntryOptions,
): ScreenEntry {
  const { client } = options;
  return {
    kinds: ["accounts"],
    lives: "while-shown",
    key: () => "accounts",
    build() {
      let props: AccountsScreenProps = {
        phase: "loading",
        sentence: null,
        canRetry: false,
        accounts: [],
        waiting: null,
        confirming: null,
      };
      /**
       * Numbers each chain of requests — a read, a retry, an operation with the read after it; an
       * answer counts only while its chain's number is the last, so an answer that comes after the
       * screen was taken down or after a later chain is ignored.
       */
      let chain = 0;
      let disposed = false;

      function show(changes: Partial<AccountsScreenProps>): void {
        props = { ...props, ...changes };
        screen.update(props);
      }

      /** Reads the list, which the screen then shows with `sentence` above it. */
      async function read(
        mine: number,
        sentence: string | null,
      ): Promise<void> {
        const result = await client.listAccounts();
        if (disposed || mine !== chain) return;
        if (result.ok) {
          show({
            phase: "ready",
            sentence,
            canRetry: false,
            accounts: result.value,
            waiting: null,
            confirming: null,
          });
          return;
        }
        if (signedOut(result.failure)) {
          show({ waiting: null });
          options.onSignedOut();
          return;
        }
        show({
          phase: "failed",
          sentence: ownerForbidden(result.failure) ? NO_RIGHT : READ_FAILED,
          canRetry: !ownerForbidden(result.failure),
          accounts: [],
          waiting: null,
          confirming: null,
        });
      }

      function request(
        email: string,
        action: AccountAction,
      ): Promise<AccountResult<PanelOutcome>> {
        switch (action) {
          case "block":
            return client.blockAccount(email);
          case "unblock":
            return client.unblockAccount(email);
          case "grant":
            return client.grantPreviousSave(email);
          case "revoke":
            return client.revokePreviousSave(email);
        }
      }

      /**
       * One operation of a row: its button waits, its request goes, and the list is read again,
       * whatever the answer was but a missing session or a missing right, which leave the list as it
       * stands.
       */
      async function run(
        mine: number,
        email: string,
        action: AccountAction,
      ): Promise<void> {
        const result = await request(email, action);
        if (disposed || mine !== chain) return;
        let sentence: string | null = null;
        if (!result.ok) {
          if (signedOut(result.failure)) {
            show({ waiting: null });
            options.onSignedOut();
            return;
          }
          if (ownerForbidden(result.failure)) {
            show({ waiting: null, sentence: NO_RIGHT });
            return;
          }
          sentence = operationSentence(result.failure);
        }
        await read(mine, sentence);
      }

      function operate(email: string, action: AccountAction): void {
        if (props.phase !== "ready" || props.waiting !== null) return;
        chain += 1;
        show({ waiting: { email, action }, sentence: null, confirming: null });
        void run(chain, email, action);
      }

      const screen = createAccountsScreen({
        controls: {
          retry() {
            if (props.phase !== "failed" || !props.canRetry) return;
            chain += 1;
            show({ phase: "loading", sentence: null, canRetry: false });
            void read(chain, null);
          },
          // The click sends nothing: the request goes with the confirmation (D-411).
          askBlock(email) {
            if (props.phase !== "ready" || props.waiting !== null) return;
            show({ confirming: email });
          },
          confirmBlock(email) {
            if (props.confirming !== email) return;
            operate(email, "block");
          },
          withdrawBlock() {
            if (props.confirming === null) return;
            show({ confirming: null });
          },
          unblock: (email) => operate(email, "unblock"),
          grant: (email) => operate(email, "grant"),
          revoke: (email) => operate(email, "revoke"),
        },
        props,
      });
      chain += 1;
      void read(chain, null);
      return {
        element: screen.element,
        drawResult: () => undefined,
        drawReading: () => undefined,
        dispose() {
          disposed = true;
          screen.dispose();
        },
      };
    },
  };
}
