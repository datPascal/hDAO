import { __decorate } from "tslib";
import { LitElement, html, customElement, css } from "lit-element";
let textfield = class textfield extends LitElement {
    render() {
        return html `
      <button class="text-field"><slot></slot></button>
    `;
    }
};
textfield.styles = css `
    .text-field {
      background-color: #c9c5c5;
      color: black;
      border: none;
      border-radius: 4px;
      padding: 100px 300px;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
    }
  `;
textfield = __decorate([
    customElement("text-field")
], textfield);
export { textfield };
//# sourceMappingURL=textfield.js.map