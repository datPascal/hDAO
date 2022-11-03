import { __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { state, customElement, property } from 'lit/decorators.js';
import { contextProvided } from '@lit-labs/context';
import { appWebsocketContext, appInfoContext } from '../../contexts';
import './proposal-vote-detail';
let ProposalVoteForProposalPage = class ProposalVoteForProposalPage extends LitElement {
    async firstUpdated() {
        const cellData = this.appInfo.cell_data.find((c) => c.role_id === 'dao');
        const records = await this.appWebsocket.callZome({
            cap_secret: null,
            cell_id: cellData.cell_id,
            zome_name: 'one_vote_per_user_dao',
            fn_name: 'get_proposal_vote_for_proposal_page',
            payload: this.actionHash,
            provenance: cellData.cell_id[1]
        });
    }
    render() {
        if (!this._records) {
            return html `<div style="display: flex; flex: 1; align-items: center; justify-content: center">
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;
        }
        return html `
      <div style="display: flex; flex-direction: column">
        ${this._records.map(r => html `<proposal-vote-detail .actionHash=${r.signed_action.hashed.hash}></proposal-vote-detail>`)}
      </div>
    `;
    }
};
__decorate([
    property()
], ProposalVoteForProposalPage.prototype, "actionHash", void 0);
__decorate([
    state()
], ProposalVoteForProposalPage.prototype, "_records", void 0);
__decorate([
    contextProvided({ context: appWebsocketContext })
], ProposalVoteForProposalPage.prototype, "appWebsocket", void 0);
__decorate([
    contextProvided({ context: appInfoContext })
], ProposalVoteForProposalPage.prototype, "appInfo", void 0);
ProposalVoteForProposalPage = __decorate([
    customElement('proposal-vote-for-proposal-page')
], ProposalVoteForProposalPage);
export { ProposalVoteForProposalPage };
//# sourceMappingURL=proposal-vote-for-proposal-page.js.map