import { __decorate } from "tslib";
import { LitElement, css, html } from 'lit';
import { state, customElement } from 'lit/decorators.js';
import { contextProvided } from '@lit-labs/context';
import { appWebsocketContext, appInfoContext } from '../../contexts';
import '@material/mwc-button';
import '@material/mwc-textarea';
import '@material/mwc-textfield';
let CreateProposalPage = class CreateProposalPage extends LitElement {
    isProposalPageValid() {
        return this._content && this._title;
    }
    async createProposalPage() {
        const cellData = this.appInfo.cell_data.find((c) => c.role_id === 'dao');
        const proposalPage = {
            content: this._content,
            title: this._title,
        };
        const record = await this.appWebsocket.callZome({
            cap_secret: null,
            cell_id: cellData.cell_id,
            zome_name: 'one_vote_per_user_dao',
            fn_name: 'create_proposal_page',
            payload: proposalPage,
            provenance: cellData.cell_id[1]
        });
        this.dispatchEvent(new CustomEvent('proposal-page-created', {
            composed: true,
            bubbles: true,
            detail: {
                actionHash: record.signed_action.hashed.hash
            }
        }));
    }
    render() {
        return html `
      
      <div style="display: flex; flex: 1; flex-direction: column; align-items: center;">
        <h1 style="font-family: 'Space Mono'; color: #183E29">Proposal Creation</h1>

        <div class="article-container">
          <input type="text" class="article-title" placeholder="Proposal Title" @input=${(e) => { this._title = e.target.value; }}>
          <textarea class="article-content" placeholder="Proposal Content" @input=${(e) => { this._content = e.target.value; }}></textarea>
          <div style="align-items : center";>
            <button class="create-proposal-button" @click=${this.createProposalPage} >Create Proposal</button>
          </div>
        </div>
      </div>
        `;
    }
};
CreateProposalPage.styles = css `
  .Proposalbox {
      flex-direction: column;
      flex: 0 0 auto;
      width: 800px;
      max-height; 1200;
      display: flex;
      padding: var(2rem);
      z-index: 1;
      box-shadow: 0 8px 26px -4px hsla(0,0%,8%,.15),0 8px 9px -5px hsla(0,0%,8%,.06)!important;
      margin-top: var(2rem);
      align-items: flex-start;
      border-radius: var(2rem);
      flex-direction: column;
      backdrop-filter: saturate(200%) blur(30px);
      overflow-wrap: break-word;
      background-color: #d3d0d0;
      border-radius: 25px;
      align-items: center;
    }
    .ProposalboxesInner {
      display: flex; 
      flex-direction: column;
      border-width: 2;
      border-color: black;
    }
    .Proposaltitle {
      padding-left: 1rem;
      padding-top: 1rem;
      white-space: pre-line;
      padding-bottom: 1rem;
      width: 700px;
      font-size: 25px;
      overflow-wrap: break-word;
      max-width: 100%;
      text-overflow: ellipsis;
      color: black;
      align-self: content;
    }
    .Proposalcontent {
      padding-left: 1rem;
      white-space: pre-line;
      overflow-wrap: break-word;
      max-width: 100%;
      text-overflow: ellipsis;
      width: 700px;
      color: black;
      padding-bottom: 1rem;
      align-self: content;

    }.article-container {
      font-family: sans-serif;
      color: grey;
    }

    .article-title {
      width: 100%;
      font-size: 18px;
      padding: 10px;
      border: none;
      outline: none;
      background-color: transparent;
      color: grey;
    }

    .article-content {
      width: 100%;
      height: 500px;
      font-size: 16px;
      padding: 10px;
      border: none;
      outline: none;
      background-color: transparent;
      color: grey;
      resize: none;
    }

    .create-proposal-button {
      background-color: #4caf50; /* green color */
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      border-radius: 4px;
      align-self: middle;
      margin: auto; /* this will center the button within the container */
      cursor: pointer;
    }

    .create-proposal-button:hover {
      background-color: #3e8e41; /* darker green color on hover */
    }

`;
__decorate([
    state()
], CreateProposalPage.prototype, "_content", void 0);
__decorate([
    state()
], CreateProposalPage.prototype, "_title", void 0);
__decorate([
    contextProvided({ context: appWebsocketContext })
], CreateProposalPage.prototype, "appWebsocket", void 0);
__decorate([
    contextProvided({ context: appInfoContext })
], CreateProposalPage.prototype, "appInfo", void 0);
CreateProposalPage = __decorate([
    customElement('create-proposal-page')
], CreateProposalPage);
export { CreateProposalPage };
//# sourceMappingURL=create-proposal-page.js.map