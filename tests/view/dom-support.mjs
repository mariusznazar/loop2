/** Recording DOM for ordinary control tests; no layout or rendered-style claims. */
export function installDOM(t) {
  const previous = globalThis.document;
  const document = {
    activeElement: null,
    createElement(tag) {
      return new Element(tag, document);
    },
  };
  globalThis.document = document;
  t.after(() => {
    if (previous === undefined) delete globalThis.document;
    else globalThis.document = previous;
  });
  return document;
}

class Element {
  constructor(tag, document) {
    this.tagName = tag.toUpperCase();
    this.ownerDocument = document;
    this.children = [];
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
      this.children.push(child);
      if (this.tagName === "SELECT" && this.children.length === 1)
        this.value = child.value;
    }
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
