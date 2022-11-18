import { __decorate } from "tslib";
import { LitElement, html, customElement, css } from "lit-element";
let homePage = class homePage extends LitElement {
    render() {
        return html `
        <main style="width: 100%;">
          <div class="title-bar">
          </div>
        </main>
    `;
    }
};
homePage.styles = css `
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(12px + 2vmin);
      color: #061831;
      margin: 0 auto;
      text-align: center;
    }
    main {
      flex-grow: 1;
      background: #fdfbfb;
    }
  `;
homePage = __decorate([
    customElement("home-page")
], homePage);
export { homePage };
//# sourceMappingURL=home-page.js.map