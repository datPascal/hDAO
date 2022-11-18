import { __decorate } from "tslib";
import { LitElement, html, customElement, css } from "lit-element";
let navbartop = class navbartop extends LitElement {
    render() {
        return html `
      <button class="navbar-top"><slot></slot></button>
    `;
    }
};
navbartop.styles = css `
    .navbar-top {
      background-color: #e9e5e5;
      color: black;
      border: none;
      border-radius: 4px;
      padding: 100px 300px;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
    }
  `;
navbartop = __decorate([
    customElement("navbar-top")
], navbartop);
export { navbartop };
//# sourceMappingURL=navbarTop.js.map