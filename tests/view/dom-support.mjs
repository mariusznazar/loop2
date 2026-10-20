/** Recording DOM for ordinary control tests; no layout or rendered-style claims. */
export function installDOM(t) {
  const previous = globalThis.document;
  const previousOption = globalThis.Option;
  const document = {
    activeElement: null,
    createElement(tag) {
      return new Element(tag, document);
    },
  };
  globalThis.document = document;
  globalThis.Option = function Option(text, value) {
    const option = document.createElement("option");
    option.textContent = text;
    option.value = value;
    return option;
  };
  t.after(() => {
    if (previous === undefined) delete globalThis.document;
    else globalThis.document = previous;
    if (previousOption === undefined) delete globalThis.Option;
    else globalThis.Option = previousOption;
  });
  return document;
}

class Element {
  constructor(tag, document) {
    this.tagName = tag.toUpperCase();
    this.ownerDocument = document;
    this.children = [];
    this.parentNode = null;
    this.attributes = new Map();
    this.listeners = new Map();
    this.className = "";
    this.textContent = "";
    this.value = "";
    this.disabled = false;
    this.hidden = false;
    this.id = "";
    this.placeholder = "";
  }

  append(...children) {
    for (const child of children) {
      if (child.parentNode) child.parentNode.removeChild(child);
      this.children.push(child);
      child.parentNode = this;
      if (this.tagName === "SELECT" && this.children.length === 1)
        this.value = child.value;
    }
  }

  removeChild(child) {
    const index = this.children.indexOf(child);
    if (index === -1) throw new Error("Not a child");
    for (
      let active = this.ownerDocument.activeElement;
      active;
      active = active.parentNode
    ) {
      if (active === child) {
        this.ownerDocument.activeElement = null;
        break;
      }
    }
    this.children.splice(index, 1);
    child.parentNode = null;
  }

  replaceChildren(...children) {
    for (const child of [...this.children]) this.removeChild(child);
    if (this.tagName === "SELECT") this.value = "";
    this.append(...children);
  }

  add(option) {
    this.append(option);
  }

  get options() {
    return this.children;
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }

  removeAttribute(name) {
    this.attributes.delete(name);
  }

  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) ?? [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }

  dispatchEvent(event) {
    for (const listener of this.listeners.get(event.type) ?? [])
      listener.call(this, event);
  }

  click() {
    if (!this.disabled) this.dispatchEvent({ type: "click" });
  }

  focus() {
    this.ownerDocument.activeElement = this;
  }
}
