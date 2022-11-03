import { __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { state, customElement, property } from 'lit/decorators.js';
import { contextProvided } from '@lit-labs/context';
import { appWebsocketContext, appInfoContext } from '../../contexts';
import '@material/mwc-circular-progress';
import './proposal-vote-detail';
let AllProposalsVotedByUser = class AllProposalsVotedByUser extends LitElement {
    async firstUpdated() {
        const cellData = this.appInfo.cell_data.find((c) => c.role_id === 'dao');
        this._records = await this.appWebsocket.callZome({
            cap_secret: null,
            cell_id: cellData.cell_id,
            zome_name: 'one_vote_per_user_dao',
            fn_name: 'get_all_proposals_voted_by_user',
            payload: this.author,
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
        ${this._records.map(r => html `<proposal-vote-detail .actionHash=${r.signed_action.hashed.hash} style="margin-bottom: 16px;"></proposal-vote-detail>`)}
      </div>
    `;
    }
};
__decorate([
    property()
], AllProposalsVotedByUser.prototype, "author", void 0);
__decorate([
    state()
], AllProposalsVotedByUser.prototype, "_records", void 0);
__decorate([
    contextProvided({ context: appWebsocketContext })
], AllProposalsVotedByUser.prototype, "appWebsocket", void 0);
__decorate([
    contextProvided({ context: appInfoContext })
], AllProposalsVotedByUser.prototype, "appInfo", void 0);
AllProposalsVotedByUser = __decorate([
    customElement('all-proposals-voted-by-user')
], AllProposalsVotedByUser);
export { AllProposalsVotedByUser };
//# sourceMappingURL=all-proposals-voted-by-user.js.map