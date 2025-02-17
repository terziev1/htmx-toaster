class ToasterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.toasts = [];
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.currentToast = null;
    this.isDragging = false;
    this.dragThreshold = 10;
    this.initializeEventListener();
    this.initializeContainer();
  }

  initializeContainer() {
    const container = document.createElement("div");
    container.classList.add("toaster");
    this.shadowRoot.appendChild(container);
  }

  generateTheme() {
    const colors = document.querySelector("script[data-htmxt-colors]")?.getAttribute("data-htmxt-colors") || null;
    if (!colors) return;
    const colorArray = colors.split(";");
    const defaults = ["#f2f2f2", "#000", "#e2f9ec", "#e6f1fb", "#f8e3e3"];
    const [bg, txt, sc, inf, err] = colorArray.map((color, index) => color || defaults[index]);
    return `.toaster {--bg:${bg};--txt:${txt};--sc:${sc};--in:${inf};--er:${err};}`;
  }
  initializeEventListener() {
    document.body.addEventListener("HXToast", (event) => {
      const body = event.detail.body;
      if (body) {
        this.addToast(body, event.detail.type || "default");
      }
    });
    document.body.addEventListener("htmx:afterRequest", (event) => {
      const body = event.detail.xhr.getResponseHeader("HXToaster-Body");
      if (body) {
        this.addToast(body, event.detail.xhr.getResponseHeader("HXToaster-Type") || "default");
      }
    });
  }

  addToast(body, type) {
    const id = Math.random().toString(36).substr(2, 9);
    if (this.toasts.length == 2) {
      this.removeToast(this.toasts[this.toasts.length - 1].id);
    }
    this.toasts.unshift({ id, body, type });
    this.renderToast(id);
    return id;
  }

  removeToast(id) {
    const index = this.toasts.findIndex((toast) => toast.id === id);
    if (index == -1) return;
    this.toasts.splice(index, 1);
    const toastElement = this.shadowRoot.querySelector(`#toast-${id}`);
    if (toastElement) {
      toastElement.classList.add("fade-out");
      toastElement.addEventListener("animationend", () => {
        toastElement.remove();
      });
    }
  }

  closeButton(id) {
    return `<button class="close-btn" style="padding:4px;position:absolute;top:2px;right:2px;" type="button"  onclick="document.querySelector('htmx-toaster-component').removeToast('${id}')">&#10005;</button>`;
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
    toastElement.addEventListener("touchstart", (event) => this.handleTouchStart(event, toastElement), { passive: true });
    toastElement.addEventListener("touchmove", (event) => this.handleTouchMove(event), { passive: true });
    toastElement.addEventListener("touchend", (event) => this.handleTouchEnd(event, id), { passive: true });
    setTimeout(() => this.removeToast(id), 5000); // Auto-remove after 5 seconds
  }

  connectedCallback() {
    const style = document.createElement("style");
    style.textContent = ` ${this.generateTheme()}
    .toaster * {margin: 0;text-decoration: none;box-sizing: border-box;font-family: ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;}
    .toaster {
      display: flex;
      flex-direction: column-reverse;
      justify-content: flex-end;
      align-items: flex-end;
      gap: 10px;
      position: fixed;
      z-index: 2147483647;
      inset: 2rem;
      user-select: none;
      pointer-events: none;
    }
    .toast a {color:var(--txt, #000);}
    .toast {
      position: relative;
      width: 100%;
      padding: 12px;
      padding-right: 16px;
      background-color: var(--bg, #f2f2f2);
      border: 1px solid rgb(228, 228, 231);
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      border-radius: 10px;
      font-size: 1rem;
      line-height: 1.5rem;
      z-index: 50;
      color: var(--txt, #000);
      text-align: left;
      animation: slideIn 0.3s  cubic-bezier( 0.645, 0.045, 0.355, 1 )   forwards;
      user-select: auto;
      pointer-events: auto;
    }
    .toast p {margin: 4px 0;}
    .success {background-color: var(--sc, #e2f9ec);}
    .info {background-color: var(--in, #e6f1fb);}
    .error {background-color: var(--er, #f8e3e3);}
    @media (min-width: 640px) {
      .toaster {inset: 3rem;}
      .toast {max-width: 350px;}
    }
    .fade-out {animation: fadeOut 0.3s  forwards;}
    .toast button {background-color: transparent;border: none;cursor: pointer;text-align: inherit;}
    @keyframes slideIn {from {transform: translateY(-20px) scale(0.9);opacity: 0;}to {transform: translateY(0) scale(1);opacity: 1;}}
    @keyframes fadeOut {from {opacity: 1;transform: scale(1);}to {opacity: 0;transform: scale(0.9);}}
    `;
    this.shadowRoot.appendChild(style);
  }

  handleTouchStart(event, toastElement) {
    this.touchStartX = event.changedTouches[0].screenX;
    this.currentToast = toastElement;
    this.isDragging = false; // Reset dragging flag on touch start
  }

  handleTouchMove(event) {
    if (!this.currentToast) return;
    this.touchEndX = event.changedTouches[0].screenX;
    const touchMoveX = this.touchEndX - this.touchStartX;
    if (Math.abs(touchMoveX) > this.dragThreshold) {
      this.isDragging = true; // Set dragging flag if movement exceeds threshold
      this.currentToast.style.transform = `translateX(${touchMoveX}px)`;
    }
  }

  handleTouchEnd(event, id) {
    if (!this.currentToast) return;
    const touchMoveX = this.touchEndX - this.touchStartX;
    const swipeThreshold = 100; // Swipe threshold in pixels

    if (this.isDragging && Math.abs(touchMoveX) > swipeThreshold) {
      this.removeToast(id);
    } else {
      this.currentToast.style.transform = "";
      this.currentToast.style.transition = "transform 0.3s ease";
      setTimeout(() => {
        if (this.currentToast) {
          this.currentToast.style.transition = "";
        }
      }, 300);
    }

    this.currentToast = null;
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.isDragging = false;
  }
}

if (customElements && !customElements.get("shopbox-results")) {
  customElements.define("htmx-toaster-component", ToasterComponent);
}

function createToasterComponent() {
  const toasterElement = document.createElement("htmx-toaster-component");
  toasterElement.id = "htmx-toaster";
  window.HTMXToaster = toasterElement;
  document.body.appendChild(toasterElement);
}
window.addEventListener("DOMContentLoaded", () => {
  createToasterComponent();
});

htmx.on("htmx:afterSettle", () => {
  if (document.getElementById("htmx-toaster")) {
    return;
  }
  createToasterComponent();
});
