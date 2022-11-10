import { __decorate } from "tslib";
import { LitElement, html } from 'lit';
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
      <div style="display: flex; flex-direction: column">
        <div style="display: flex; flex: 1; flex-direction: column; align-items: center;">
        <h1 style="font-family: 'Space Mono'; color: #183E29">Proposal Creation</h1>
      </div>

          <mwc-textarea outlined label="Proposal Title" @input=${(e) => { this._content = e.target.value; }}></mwc-textarea>
          <mwc-textfield outlined label="Proposal Text" @input=${(e) => { this._title = e.target.value; }}></mwc-textfield>

        <div><button @click=${this.createProposalPage}>Create Proposal</button></div>

    </div>`;
    }
};
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