import { LitElement, html, customElement, css } from "lit-element";

@customElement("navbar-top")
export class navbartop extends LitElement {
  static styles = css`
    .navbartop {
        width: 100%;
        margin: auto;
        padding: 35px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #013f1c;;
    }
    .navbartop ul li {
        list-style: none;
        display: inline-block;
        margin: 0 20px;
        font-size: calc(20px + 2vmin);
    }
    .banner {
        width: 100%;
        height: 100px;
    }
  `;

  render() {
    return html`
    <body>
      <div class= "banner">
        <div class= "navbartop">
            <ul>
                <li><a>Hello</a></li>
                <li><a>World</a></li>
            </ul>
        </div>
      </div>
    <body>
    `;
  }
}
