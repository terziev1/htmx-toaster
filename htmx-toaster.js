class ToasterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.toasts = [];
    this.initializeEventListener();
    this.initializeContainer();
  }

  initializeContainer() {
    const container = document.createElement("div");
    container.classList.add("toaster");
    this.shadowRoot.appendChild(container);
  }

  initializeEventListener() {
    document.body.addEventListener("htmx:afterRequest", (event) => {
      console.log("event");
      const body = event.detail.xhr.getResponseHeader("X-Toast-Body");
      const type = event.detail.xhr.getResponseHeader("X-Toast-Type") || "default";
      if (body) {
        this.addToast({ body, type });
      }
    });
  }

  addToast({ body, type }) {
    const id = Math.random().toString(36).substr(2, 9);
    this.toasts.unshift({ id, body, type });
    this.renderToast(id);
    if (this.toasts.length > 3) {
      this.removeToast(this.toasts.pop().id);
    }
  }

  removeToast(id) {
    const index = this.toasts.findIndex((toast) => toast.id === id);
    if (index !== -1) {
      const toastElement = this.shadowRoot.querySelector(`#toast-${id}`);
      toastElement.classList.add("fade-out");
      toastElement.addEventListener("animationend", () => {
        toastElement.remove();
        this.toasts.splice(index, 1);
      });
    }
  }
  closeButton(id) {
    return `<button class="close-btn" style="padding:4px;transition:opacity 0.3s;position:absolute;top:2px;right:2px;" type="button" class="close" onclick="document.querySelector('htmx-toaster-component').removeToast('${id}')"> <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></button>`;
  }
  renderToast(id) {
    const { body, type } = this.toasts.find((toast) => toast.id === id);
    const toastElement = document.createElement("div");
    toastElement.id = `toast-${id}`;
    toastElement.className = `toast ${type}`;
    toastElement.innerHTML = `
        <p>${body}</p>
        ${this.closeButton(id)}
      `;
    this.shadowRoot.querySelector(".toaster").appendChild(toastElement);
    setTimeout(() => this.removeToast(id), 5000); // Auto-remove after 5 seconds
  }

  connectedCallback() {
    const style = document.createElement("style");
    style.textContent = `
        .toaster * { margin: 0; text-decoration: none; box-sizing: border-box; font-family: ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;}
        .toaster {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 10px;
            position: fixed;
            z-index: 2147483647;
            inset: 2rem;
            user-select: none;
            pointer-events: none;
        }
        .toast a { color: inherit; }
        .toast {
            position: relative;
            width: 100%;
            align-items: start;
            padding: 12px;
            padding-right: 16px;
            background-color: #fff;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border: 1px solid rgb(228, 228, 231);
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            border-radius: 10px;
            font-size: 1rem;
            line-height: 1.5rem;
            z-index: 50;
            color: hsl(0, 0%, 12%);
            text-align: left;
            animation: slideIn 0.3s ease-in-out;
            user-select: auto;
            pointer-events: auto;
            transition: transform 0.3s ease;
        }
        .default { background-color: white; }
        .success { background-color: lightgreen; }
        .info { background-color: lightblue; }
        .error { background-color: salmon; }
        @media (min-width: 640px) {
            .toaster { inset: 3rem; }
            .toast { max-width: 350px; }
        }
        .fade-out {
            animation: fadeOut 0.3s ease;
        }
        .toaster img {
            width: 64px;
            height: 64px;
            aspect-ratio: 1/1;
            object-fit: cover;
            border-radius: 4px;
            overflow: hidden;
            object-position: center;
        }
        .toast button{background-color:transparent;border:none;cursor:pointer;text-align:inherit}

        @keyframes slideIn { from { transform: translateX(10%); } to { transform: translateX(0); } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }`;

    this.shadowRoot.appendChild(style);
  }
}

customElements.define("htmx-toaster-component", ToasterComponent);
window.addEventListener("DOMContentLoaded", () => {
  const toasterElement = document.createElement("htmx-toaster-component");
  document.body.appendChild(toasterElement);
});
