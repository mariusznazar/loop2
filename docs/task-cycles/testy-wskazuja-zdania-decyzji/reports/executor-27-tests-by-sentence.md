### 93.1
- `tests/sim/loop.test.mjs:414` a loop's map run through the first chill leaves the Understanding, the programs and the counts as it found them, and its copy empty
- `tests/view/rule-editor.test.mjs:169` the list stands under the heading „sprawdzane od góry”
- `tests/view/rule-editor.test.mjs:265` counts stand where the page gives them: a rule's „Wykonano n×” and a group's sum, and none where counts are null
- `tests/view/program-editor.test.mjs:1588` a group's summary: its name, condition, number of rules and the sum of their counts where counts stand
- `tests/view/program-panel.test.mjs:676` during a map run the copy stands first and is shown with counts; a saved program picked shows none and takes its own edits
- `tests/view/program-panel.test.mjs:1501` Programy beside a map run ${stage} shows the saved program, with the sentence above the editor and no list, copy or switch
### 93.2
- `tests/sim/copy.test.mjs:99` a send with a program number carries out a copy of that program, whose base is its content, makes it the character's program used last and the one entered with last, and clears the character's pick
- `tests/sim/copy.test.mjs:184` Restart carries on the copy of the map run it replaces, its unsaved change included, with every count from zero and the programs as they were
- `tests/sim/copy-actions.test.mjs:162` „Zapisz w programie” leaves the copy, the streak, the beaten attacks and the counts, and the other programs
- `tests/sim/copy-actions.test.mjs:238` „Zapisz jako nowy program” is no switch: the streak, the beaten attacks, the counts and the entered-with program stay
- `tests/sim/copy-actions.test.mjs:290` „Porzuć zmiany” starts again the count of a rule whose content the discard changes
- `tests/sim/copy-actions.test.mjs:328` a switch gives the map run a fresh copy of the other program, with the streak, the beaten attacks and the counts at zero
- `tests/sim/program-counts.test.mjs:81` an initial wait leaves every rule at zero
- `tests/sim/program-counts.test.mjs:96` later starts count and each restart or new send resets before the minute-zero choice
- `tests/sim/program-counts.test.mjs:142` identical rules count independently and keep their counts after group reorder and transfer
- `tests/sim/program-counts.test.mjs:170` every condition/action content field resets only its edited rule, also after Stop
- `tests/sim/program-counts.test.mjs:245` canonical equivalent content preserves history despite key order, extra fields and floating rounding
- `tests/sim/program-counts.test.mjs:271` deleting an active rule removes its count; adding its duplicate starts at zero and completion does not restore it
- `tests/sim/program-counts.test.mjs:292` editing an active rule resets it immediately and its old completion adds no count
- `tests/view/program-editor.test.mjs:162` group conditions offer the same kinds and editable fields while preserving rules and counts
### 93.3
- `tests/sim/program-list.test.mjs:231` deleting the program the counts stand beside clears the counts; deleting another leaves them
- `tests/sim/program-list.test.mjs:254` Zakończ after the deletion of the copy's program clears the counts
- `tests/sim/program-list.test.mjs:291` an edit reconciles the counts only where they stand beside the program edited
- `tests/sim/copy.test.mjs:202` Zakończ keeps a count beside a rule of the copy's program whose condition and action are the copy's, and 0 beside one whose content differs
- `tests/sim/copy.test.mjs:222` Zakończ clears the counts where the copy's program is gone
- `tests/sim/copy.test.mjs:299` setProgram outside a map run edits the program entered with last, or else the first of the list, and reconciles counts only where they stand beside it
- `tests/sim/program-counts.test.mjs:54` counts stay absent through program edits before the first send
- `tests/sim/program-counts.test.mjs:96` later starts count and each restart or new send resets before the minute-zero choice
- `tests/sim/program-counts.test.mjs:111` pause and death retain counts, including an action interrupted by death
- `tests/sim/program-counts.test.mjs:170` every condition/action content field resets only its edited rule, also after Stop
- `tests/sim/completion.test.mjs:261` the counts of the rules stay after a completion, through end
- `tests/view/rule-editor.test.mjs:265` counts stand where the page gives them: a rule's „Wykonano n×” and a group's sum, and none where counts are null
- `tests/view/program-panel.test.mjs:806` „Restart” and a death show the copy with counts; „Zakończ” shows the copy's program with them
- `tests/view/program-panel.test.mjs:845` „Zakończ” after the copy's program was deleted shows the first program of the list, without counts
- `tests/view/account-screen.test.mjs:4786` after „Zakończ” the bar's „Programy” shows the program the copy belonged to, and `#/programy/{n}` still shows program n
### 164.1
- `tests/sim/copy.test.mjs:77` an edit during a map run leaves program 1 as it was while the map run carries out the edited copy
- `tests/sim/copy.test.mjs:99` a send with a program number carries out a copy of that program, whose base is its content, makes it the character's program used last and the one entered with last, and clears the character's pick
- `tests/sim/copy.test.mjs:184` Restart carries on the copy of the map run it replaces, its unsaved change included, with every count from zero and the programs as they were
- `tests/sim/copy-actions.test.mjs:328` a switch gives the map run a fresh copy of the other program, with the streak, the beaten attacks and the counts at zero
- `tests/sim/copy-actions.test.mjs:362` a switch leaves the seed, the minute, the map, the body, the backpack and the action in progress, and the state around the map run
- `tests/sim/copy-actions.test.mjs:395` a switch is refused without a map run, after death, for a program not on the list and for the program of the copy
- `tests/sim/flow.test.mjs:67` a send starts a map run at minute 0 with the seed mixed from the last seed and the real time
- `tests/sim/flow.test.mjs:120` Restart starts a new map run at minute 0 with the same seed and tiles and the copy as it stands
- `tests/sim/loop.test.mjs:289` without a program number a loop takes the program of the character's row: the pick, else the one used last
- `tests/sim/loop.test.mjs:501` editing or deleting the program after the start leaves the loop on the content it took, in every later map run
### 164.2
- `tests/sim/program-list.test.mjs:435` an edit of the copy reaches only the copy while the list holds more programs
- `tests/sim/copy.test.mjs:77` an edit during a map run leaves program 1 as it was while the map run carries out the edited copy
- `tests/sim/copy-actions.test.mjs:97` „Zapisz w programie” after an edit of the copy gives the program the copy's content and leaves the streak
- `tests/sim/copy-actions.test.mjs:179` „Zapisz w programie” replaces changes the copy lacks at once, without a confirmation
- `tests/sim/copy-actions.test.mjs:213` „Zapisz jako nowy program” adds the copy's content at the end of the list under the next number, and the copy belongs to it
- `tests/sim/copy-actions.test.mjs:275` „Porzuć zmiany” returns the copy to its base, reconciles the counts and zeroes the streak and the beaten attacks
- `tests/sim/copy-actions.test.mjs:328` a switch gives the map run a fresh copy of the other program, with the streak, the beaten attacks and the counts at zero
- `tests/view/program-panel.test.mjs:1227` „Zapisz w programie” writes the copy into its program, and the line and the activity go
- `tests/view/program-panel.test.mjs:1245` the line of a changed program stands with and without unsaved changes, and goes after „Zapisz w programie”
- `tests/view/program-panel.test.mjs:1331` „Porzuć zmiany” restores the copy's program and the line goes
### 164.3
- `tests/sim/program-list.test.mjs:264` an edit replaces the content of the program numbered, the others stay
- `tests/sim/program-list.test.mjs:337` the list operations run in a map run and outside one alike
- `tests/sim/copy.test.mjs:99` a send with a program number carries out a copy of that program, whose base is its content, makes it the character's program used last and the one entered with last, and clears the character's pick
- `tests/sim/copy.test.mjs:184` Restart carries on the copy of the map run it replaces, its unsaved change included, with every count from zero and the programs as they were
- `tests/sim/copy-actions.test.mjs:328` a switch gives the map run a fresh copy of the other program, with the streak, the beaten attacks and the counts at zero
- `tests/view/program-panel.test.mjs:676` during a map run the copy stands first and is shown with counts; a saved program picked shows none and takes its own edits
### 165.1
- `tests/sim/program-list.test.mjs:76` a second created program is named „Program 2” and takes the number 2
- `tests/sim/program-list.test.mjs:89` a created program holds the empty group „Program” under „Zawsze”, at the end, and takes the next number
- `tests/sim/program-list.test.mjs:107` a number is not given again after a deletion
- `tests/sim/program-list.test.mjs:445` pulled programs are appended at the end of the list in order, numbered from the next number, which rises by their count
- `tests/sim/program-list.test.mjs:498` the counter rises by the count of the appended programs and nothing is appended for none
- `tests/sim/copy.test.mjs:62` a new game holds program 1, „Program”, with the empty rule group „Program” under „Zawsze”, the next program number 2 and no record of a program
- `tests/sim/copy-actions.test.mjs:213` „Zapisz jako nowy program” adds the copy's content at the end of the list under the next number, and the copy belongs to it
### 165.2
- `tests/sim/program-list.test.mjs:362` a pick names a character of the team and a program of the list
- `tests/sim/copy.test.mjs:99` a send with a program number carries out a copy of that program, whose base is its content, makes it the character's program used last and the one entered with last, and clears the character's pick
- `tests/sim/copy.test.mjs:202` Zakończ keeps a count beside a rule of the copy's program whose condition and action are the copy's, and 0 beside one whose content differs
### 166.1
- `tests/view/program-list.test.mjs:73` each program is a link to its own number's address, in the list's order
- `tests/view/program-panel.test.mjs:1571` showProgram shows the saved program asked for and takes its edits; one gone from the list gives way to the first
- `tests/view/account-screen.test.mjs:4590` Siedziba holds no program panel; Programy holds the list and a panel with the sentence; Przejście holds the select list with the copy first and no sentence
- `tests/view/account-screen.test.mjs:4631` the address picks the program on the list and in the panel, an edit on Programy lands in it and never in the copy, and `#/programy` shows the first
- `tests/view/account-screen.test.mjs:4681` the program each panel shows stays its own: a pick on the select list of Przejście does not move Programy
### 166.2
- `tests/view/program-panel.test.mjs:1501` Programy beside a map run ${stage} shows the saved program, with the sentence above the editor and no list, copy or switch
- `tests/view/program-panel.test.mjs:1541` the sentence stands only while the game state holds a map run: not before a send, gone after „Zakończ”
- `tests/view/program-panel.test.mjs:1555` the panel of a map run's screen holds the sentence of Programy nowhere
- `tests/view/account-screen.test.mjs:4590` Siedziba holds no program panel; Programy holds the list and a panel with the sentence; Przejście holds the select list with the copy first and no sentence
### 166.3
- `tests/view/program-panel.test.mjs:676` during a map run the copy stands first and is shown with counts; a saved program picked shows none and takes its own edits
- `tests/view/program-panel.test.mjs:790` a panel whose first state holds a map run shows the copy, as after a load
- `tests/view/program-panel.test.mjs:806` „Restart” and a death show the copy with counts; „Zakończ” shows the copy's program with them
- `tests/view/run-screen.test.mjs:316` the screen draws the map run it was given, the copy of that map run in its program panel, not the game state's
- `tests/view/account-screen.test.mjs:4590` Siedziba holds no program panel; Programy holds the list and a panel with the sentence; Przejście holds the select list with the copy first and no sentence
### 167.1
- `tests/sim/program-list.test.mjs:89` a created program holds the empty group „Program” under „Zawsze”, at the end, and takes the next number
- `tests/view/program-list.test.mjs:123` Usuń hands the chosen program's number to the page, and Nowy program hands it the act
- `tests/view/program-list.test.mjs:145` with the pull away the list has no pull button and no line
- `tests/view/program-list.test.mjs:156` at rest the pull is a plain enabled button, among the list's acts, and a press hands the page the pull
- `tests/view/program-panel.test.mjs:536` a new game's panel lists „Program”, shows it, and „Usuń” is disabled
- `tests/view/program-panel.test.mjs:555` „Nowy program” shows „Program 2”, makes „Usuń” active, and the editor edits program 2
- `tests/view/previous-save.test.mjs:273` an account without the flag, or with it false, never asks and has no button, however often the screen is shown
- `tests/view/previous-save.test.mjs:304` the question is asked at each entering of Programy; while it is open the button is away, and a document shows it
- `tests/view/previous-save.test.mjs:339` a game built at the address of Programy asks at once
- `tests/view/previous-save.test.mjs:354` an answer of null leaves the button away, and a failure of the check leaves it away with one sentence; the next entering asks again
- `tests/view/previous-save.test.mjs:567` a pull that finds no previous save says so and the button goes away
- `tests/view/previous-save.test.mjs:631` a 403 previous-save-forbidden says the account has no such privilege now, and the button goes away
- `tests/view/previous-save.test.mjs:799` the page gives the game the account's flag: only a privileged account's game asks for the previous save
- `tests/view/previous-save.test.mjs:861` the button stands in the screen Programy alone
### 167.2
- `tests/sim/program-list.test.mjs:197` a deletion removes the program, and is refused for the last one and for a program not on the list
- `tests/view/program-list.test.mjs:105` Usuń is inactive while the list holds one program and active beside two (D-167)
- `tests/view/program-panel.test.mjs:536` a new game's panel lists „Program”, shows it, and „Usuń” is disabled
- `tests/view/program-panel.test.mjs:642` „Usuń” of the shown program shows the first program of the list, and is disabled with one left
### 168.1
- `tests/sim/program-list.test.mjs:211` deleting the copy's program leaves the copy on its content, its number none and its name kept
- `tests/sim/program-list.test.mjs:246` a deletion during a map run leaves the counts of the copy
- `tests/view/program-panel.test.mjs:845` „Zakończ” after the copy's program was deleted shows the first program of the list, without counts
- `tests/view/program-panel.test.mjs:1348` a copy whose program was deleted keeps its heading, offers only „Zapisz jako nowy program”, and it is active
### 168.2
- `tests/sim/copy-actions.test.mjs:149` a copy whose program is deleted has unsaved changes and its program no changes the copy lacks
- `tests/sim/copy-actions.test.mjs:196` „Zapisz w programie” is refused without a map run, without unsaved changes and with the program gone
- `tests/sim/copy-actions.test.mjs:249` „Zapisz jako nowy program” works where the program is gone and after death
- `tests/sim/copy-actions.test.mjs:310` „Porzuć zmiany” is refused without a map run, without unsaved changes and with the program gone
- `tests/view/program-panel.test.mjs:1348` a copy whose program was deleted keeps its heading, offers only „Zapisz jako nowy program”, and it is active
### 169.1
- `tests/sim/program-list.test.mjs:76` a second created program is named „Program 2” and takes the number 2
- `tests/sim/program-list.test.mjs:89` a created program holds the empty group „Program” under „Zawsze”, at the end, and takes the next number
- `tests/sim/program-list.test.mjs:120` the suggested name is „Program n” for the smallest n from 2 that no name takes, letter case ignored
- `tests/sim/copy.test.mjs:62` a new game holds program 1, „Program”, with the empty rule group „Program” under „Zawsze”, the next program number 2 and no record of a program
- `tests/view/program-panel.test.mjs:536` a new game's panel lists „Program”, shows it, and „Usuń” is disabled
- `tests/view/program-panel.test.mjs:555` „Nowy program” shows „Program 2”, makes „Usuń” active, and the editor edits program 2
- `tests/view/program-panel.test.mjs:1311` „Zapisz jako nowy program” suggests „Program 3” beside „Program 2”, and its field leaves at the same action again
- `tests/view/end-question.test.mjs:467` „Zapisz” of a copy whose program was deleted saves it as a new program under the first free name with no name field, ends the map run, and Programy shows the new program
- `tests/view/account-screen.test.mjs:4717` „Nowy program” of the list shows the new program with a new entry of the history
### 169.2
- `tests/sim/program-list.test.mjs:138` a typed name is trimmed, and refused as empty or as taken regardless of letter case
- `tests/sim/program-list.test.mjs:164` a program's own name in another letter case does not block its rename; the name has no length limit
- `tests/sim/program-list.test.mjs:176` a rename keeps the place, the number and the content, and stores the trimmed name
- `tests/sim/program-list.test.mjs:190` a rename throws on an empty name, a taken name and a program not on the list
- `tests/sim/copy-actions.test.mjs:262` „Zapisz jako nowy program” is refused without a map run, without unsaved changes and on a name that is empty or taken
- `tests/view/program-list.test.mjs:310` a chosen program keeps its own name, letter case changed, without a refusal
- `tests/view/program-list.test.mjs:325` a name another program bears is refused in the field, and Zapisz hands nothing on
- `tests/view/program-list.test.mjs:342` an empty name is refused in the field with its own message
- `tests/view/program-panel.test.mjs:575` „Zmień nazwę” fills the field with the name, warns of an empty or taken name, and saves a trimmed one
- `tests/view/program-panel.test.mjs:1277` „Zapisz jako nowy program” offers the first free name, refuses a taken one, and the copy then belongs to the new program
### 169.2p
- `tests/sim/program-list.test.mjs:445` pulled programs are appended at the end of the list in order, numbered from the next number, which rises by their count
- `tests/sim/program-list.test.mjs:467` a pulled name taken on the list takes the next free number, and the next one Las (3) while Las (2) stands
- `tests/sim/program-list.test.mjs:480` a pulled name is numbered against the programs appended before it, and a name ending in (2) gets another (2)
- `tests/sim/program-list.test.mjs:489` a pulled name is taken regardless of letter case, and the number keeps the name's own letters
- `tests/sim/program-list.test.mjs:527` the game state after an append is saved and loaded again whole, names taken in another letter case, with Polish letters, an emoji and 5000 characters among them
- `tests/view/previous-save.test.mjs:389` a pull fetches the previous save again and appends its programs in order with free names and the next numbers, and the game saves at once
- `tests/view/previous-save.test.mjs:455` after a pull the button stays, and a second press appends the programs again as copies
### 170.1
- `tests/view/maps-screen.test.mjs:476` the characters stand in the order of their creation, each with its lines from the top
- `tests/view/maps-screen.test.mjs:549` the list „Program:” shows the program of the row in the order of the player's list and a change hands the page the pick
### 170.2
- `tests/sim/program-list.test.mjs:377` a row's program is the pick, then the program used last, then the one entered with last, then the first
- `tests/sim/program-list.test.mjs:396` a row's program passes over each record once its program is deleted
- `tests/sim/program-list.test.mjs:417` a pick is kept through the creation of another character and cleared by the send
- `tests/sim/program-list.test.mjs:429` a pick on one row leaves the other rows' programs
- `tests/sim/copy.test.mjs:99` a send with a program number carries out a copy of that program, whose base is its content, makes it the character's program used last and the one entered with last, and clears the character's pick
- `tests/sim/copy.test.mjs:139` a send without a program number takes the first still on the list of the row's pick, the character's program used last, the program entered with last and the first program
- `tests/sim/copy-actions.test.mjs:328` a switch gives the map run a fresh copy of the other program, with the streak, the beaten attacks and the counts at zero
- `tests/view/maps-screen.test.mjs:549` the list „Program:” shows the program of the row in the order of the player's list and a change hands the page the pick
### 171.1
- `tests/view/program-panel.test.mjs:1178` the copy shows its heading; an edit of the copy brings „Niezapisane zmiany w kopii.” and activates the three buttons
- `tests/view/program-panel.test.mjs:1348` a copy whose program was deleted keeps its heading, offers only „Zapisz jako nowy program”, and it is active
- `tests/view/run-screen.test.mjs:316` the screen draws the map run it was given, the copy of that map run in its program panel, not the game state's
### 171.2
- `tests/sim/copy-actions.test.mjs:110` a copy just taken has no unsaved changes and its program no changes the copy lacks; without a map run both are false
- `tests/sim/copy-actions.test.mjs:120` an edit of the copy makes it unsaved, and an edit put back makes it equal again
- `tests/sim/copy-actions.test.mjs:129` a rule added and then deleted still counts as an unsaved change, the identity counter having moved
- `tests/sim/copy-actions.test.mjs:162` „Zapisz w programie” leaves the copy, the streak, the beaten attacks and the counts, and the other programs
- `tests/sim/copy-actions.test.mjs:196` „Zapisz w programie” is refused without a map run, without unsaved changes and with the program gone
- `tests/sim/copy-actions.test.mjs:262` „Zapisz jako nowy program” is refused without a map run, without unsaved changes and on a name that is empty or taken
- `tests/sim/copy-actions.test.mjs:310` „Porzuć zmiany” is refused without a map run, without unsaved changes and with the program gone
- `tests/view/program-panel.test.mjs:1178` the copy shows its heading; an edit of the copy brings „Niezapisane zmiany w kopii.” and activates the three buttons
- `tests/view/program-panel.test.mjs:1227` „Zapisz w programie” writes the copy into its program, and the line and the activity go
- `tests/view/program-panel.test.mjs:1331` „Porzuć zmiany” restores the copy's program and the line goes
### 171.3
- `tests/sim/copy-actions.test.mjs:213` „Zapisz jako nowy program” adds the copy's content at the end of the list under the next number, and the copy belongs to it
- `tests/view/program-panel.test.mjs:1277` „Zapisz jako nowy program” offers the first free name, refuses a taken one, and the copy then belongs to the new program
- `tests/view/program-panel.test.mjs:1311` „Zapisz jako nowy program” suggests „Program 3” beside „Program 2”, and its field leaves at the same action again
### 172
- `tests/sim/copy-actions.test.mjs:110` a copy just taken has no unsaved changes and its program no changes the copy lacks; without a map run both are false
- `tests/sim/copy-actions.test.mjs:137` an edit of the program the copy came from makes the program hold changes the copy lacks, and an edit put back does not
- `tests/sim/copy-actions.test.mjs:162` „Zapisz w programie” leaves the copy, the streak, the beaten attacks and the counts, and the other programs
- `tests/sim/copy-actions.test.mjs:179` „Zapisz w programie” replaces changes the copy lacks at once, without a confirmation
- `tests/view/program-panel.test.mjs:1245` the line of a changed program stands with and without unsaved changes, and goes after „Zapisz w programie”
### 173.1
- `tests/sim/copy-actions.test.mjs:189` „Zapisz w programie” is allowed after death and keeps the streak of the ended map run
- `tests/sim/copy-actions.test.mjs:249` „Zapisz jako nowy program” works where the program is gone and after death
- `tests/sim/copy-actions.test.mjs:301` „Porzuć zmiany” after death leaves the streak of the ended map run
- `tests/view/program-panel.test.mjs:1428` on the screen after a death the copy's buttons work and there is no switch button
### 173.2
- `tests/view/end-question.test.mjs:258` the question reads „Zapisać, odrzucić, wrócić?” and offers „Zapisz”, „Odrzuć” and „Wróć” in that order, only „Odrzuć” a destructive button, each asking its own act
- `tests/view/end-question.test.mjs:285` the line of D-172 stands under the sentence only while the copy's program is on the list and holds changes the copy lacks
- `tests/view/end-question.test.mjs:344` „Zakończ” with unsaved changes asks at every moment of the map run, leaves the map run where it is and stops the one that goes on
- `tests/view/end-question.test.mjs:395` „Zakończ” without unsaved changes ends the map run at once and opens Postać of its character
- `tests/view/end-question.test.mjs:424` „Zapisz” saves the copy into its program, replacing what the program had since, ends the map run and leads to Postać, and Programy then shows that program
- `tests/view/end-question.test.mjs:703` the buttons of the panel work while the question stands, and it goes when the copy holds no unsaved changes, leaving the map run paused
- `tests/view/end-question.test.mjs:821` the question stands under the band of a discovery and directly above the heading of the copy, after the list „Program:” and „Nowy program”, also after a completion in the minute of a discovery
- `tests/view/end-question.test.mjs:870` the question stays in its place while the panel shows another program, and never stands on Programy
- `tests/view/end-window-game.test.mjs:811` „Zakończ” of the window with no unsaved changes ends the map run at once and opens Postać
- `tests/view/end-window-game.test.mjs:828` „Zakończ” of the window with unsaved changes closes the window and asks in the panel of the copy; „Wróć” leaves the window closed and „Koniec przejścia” opens it
- `tests/view/end-window-game.test.mjs:897` „Otwarte: Las — głębiej →” with no unsaved changes ends the map run and opens the screen Mapy at the card of the opened map in place of Postać
- `tests/view/end-window-game.test.mjs:919` the question asked by „Otwarte: …” leads to the screen Mapy at the opened map after „Zapisz” and after „Odrzuć”, and „Wróć” leads nowhere
- `tests/view/run-screen.test.mjs:285` the question stands in the program panel, directly above the heading of the copy and under the band of a discovery, only while the screen is told to show it
### 173.3
- `tests/view/program-panel.test.mjs:806` „Restart” and a death show the copy with counts; „Zakończ” shows the copy's program with them
- `tests/view/program-panel.test.mjs:1452` after „Zakończ” with unsaved changes the copy's section is gone
- `tests/view/end-question.test.mjs:395` „Zakończ” without unsaved changes ends the map run at once and opens Postać of its character
- `tests/view/end-question.test.mjs:424` „Zapisz” saves the copy into its program, replacing what the program had since, ends the map run and leads to Postać, and Programy then shows that program
- `tests/view/end-question.test.mjs:467` „Zapisz” of a copy whose program was deleted saves it as a new program under the first free name with no name field, ends the map run, and Programy shows the new program
- `tests/view/end-question.test.mjs:534` „Odrzuć” ends the map run with no save, the program as it was, and leads to Postać
- `tests/view/end-window-game.test.mjs:745` „Koniec przejścia” pressed while the question stands closes the question and opens the window, so the two never stand together
- `tests/view/end-window-game.test.mjs:811` „Zakończ” of the window with no unsaved changes ends the map run at once and opens Postać
- `tests/view/end-window-game.test.mjs:828` „Zakończ” of the window with unsaved changes closes the window and asks in the panel of the copy; „Wróć” leaves the window closed and „Koniec przejścia” opens it
- `tests/view/end-window-game.test.mjs:867` the question asked by „Zakończ” of the window leads to Postać after „Zapisz” and after „Odrzuć”
- `tests/view/end-window-game.test.mjs:897` „Otwarte: Las — głębiej →” with no unsaved changes ends the map run and opens the screen Mapy at the card of the opened map in place of Postać
- `tests/view/end-window-game.test.mjs:919` the question asked by „Otwarte: …” leads to the screen Mapy at the opened map after „Zapisz” and after „Odrzuć”, and „Wróć” leads nowhere
- `tests/view/end-window-game.test.mjs:960` after „Wróć” a later „Zakończ” leads to Postać, not to the map of the earlier „Otwarte”
- `tests/view/run-screen-state.test.mjs:134` the question closes the window, which stays closed after „Wróć”
- `tests/view/run-header.test.mjs:290` „Koniec przejścia” stands before „Restart” only in an ended map run with the window closed, and asks to open the window
- `tests/view/account-screen.test.mjs:4786` after „Zakończ” the bar's „Programy” shows the program the copy belonged to, and `#/programy/{n}` still shows program n
### 174.1
- `tests/sim/copy-actions.test.mjs:404` a switch is allowed where the copy's program is gone, to any program of the list
- `tests/view/program-panel.test.mjs:676` during a map run the copy stands first and is shown with counts; a saved program picked shows none and takes its own edits
- `tests/view/program-panel.test.mjs:1379` „Przełącz postać na ten program” stands beside another saved program only, and a click switches and shows the copy
- `tests/view/program-panel.test.mjs:1412` after „Zapisz jako nowy program” the switch button stands beside the first program and not beside the new one
- `tests/view/program-panel.test.mjs:1428` on the screen after a death the copy's buttons work and there is no switch button
- `tests/view/account-screen.test.mjs:4681` the program each panel shows stays its own: a pick on the select list of Przejście does not move Programy
### 174.2
- `tests/view/program-panel.test.mjs:1379` „Przełącz postać na ten program” stands beside another saved program only, and a click switches and shows the copy
- `tests/view/program-panel.test.mjs:1412` after „Zapisz jako nowy program” the switch button stands beside the first program and not beside the new one
- `tests/view/program-panel.test.mjs:1555` the panel of a map run's screen holds the sentence of Programy nowhere
### 384
- `tests/view/program-panel.test.mjs:642` „Usuń” of the shown program shows the first program of the list, and is disabled with one left
- `tests/view/program-panel.test.mjs:845` „Zakończ” after the copy's program was deleted shows the first program of the list, without counts
- `tests/view/program-panel.test.mjs:1571` showProgram shows the saved program asked for and takes its edits; one gone from the list gives way to the first
- `tests/view/account-screen.test.mjs:4738` deleting the program shown opens the nearest screen, Programy with the first program, in place of its entry
- `tests/view/account-screen.test.mjs:4831` after „Zakończ” `#/programy` shows the first program once the copy's program is deleted, during the map run or on Programy
