import { __decorate } from "tslib";
import { LitElement, html, customElement, css } from "lit-element";
let CorpButton = class CorpButton extends LitElement {
    render() {
        return html `
      <button class="corp-button"><slot></slot></button>
    `;
    }
};
CorpButton.styles = css `
    .corp-button {
      background-color: #e7e7e7;
      color: black;
      border: none;
      border-radius: 4px;
      padding: 20px 43px;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
    }
    .corp-button:hover {
      background-color: #aaaaaa;
    }
  `;
CorpButton = __decorate([
    customElement("corp-button")
], CorpButton);
export { CorpButton };
//# sourceMappingURL=corp-button.js.map