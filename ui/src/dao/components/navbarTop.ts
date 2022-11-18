import { LitElement, html, customElement, css } from "lit-element";

@customElement("navbar-top")
export class navbartop extends LitElement {
  static styles = css`
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

  render() {
    return html`
      <button class="navbar-top"><slot></slot></button>
    `;
  }
}
