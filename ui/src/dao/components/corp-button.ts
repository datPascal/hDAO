import { LitElement, html, customElement, css } from "lit-element";

@customElement("corp-button")
export class CorpButton extends LitElement {
  static styles = css`
    .corp-button {
      background-color: #e7e7e7;
      color: black;
      border: none;
      border-radius: 4px;
      padding: 20px 43px;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      display: flex;
    }
    .corp-button:hover {
      background-color: #aaaaaa;
    }
  `;

  render() {
    return html`
      <button class="corp-button"><slot></slot></button>
    `;
  }
}