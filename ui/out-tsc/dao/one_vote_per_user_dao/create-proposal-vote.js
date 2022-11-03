import { __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { state, customElement } from 'lit/decorators.js';
import { contextProvided } from '@lit-labs/context';
import { appWebsocketContext, appInfoContext } from '../../contexts';
import '@material/mwc-button';
import '@material/mwc-checkbox';
let CreateProposalVote = class CreateProposalVote extends LitElement {
    isProposalVoteValid() {
        return this._proposalPageHash && this._vote;
    }
    async createProposalVote() {
        const cellData = this.appInfo.cell_data.find((c) => c.role_id === 'dao');
        const proposalVote = {
            proposal_page_hash: this._proposalPageHash,
            vote: this._vote,
        };
        const record = await this.appWebsocket.callZome({
            cap_secret: null,
            cell_id: cellData.cell_id,
            zome_name: 'one_vote_per_user_dao',
            fn_name: 'create_proposal_vote',
            payload: proposalVote,
            provenance: cellData.cell_id[1]
        });
        this.dispatchEvent(new CustomEvent('proposal-vote-created', {
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
        <span style="font-size: 18px">Create ProposalVote</span>

          <!-- TODO: implement the creation of proposal_page_hash -->
          <mwc-formfield label="">
            <mwc-checkbox  @input=${(e) => { this._vote = e.target.value; }}></mwc-checkbox>
          </mwc-formfield>

        <mwc-button 
          label="Create ProposalVote"
          .disabled=${!this.isProposalVoteValid()}
          @click=${() => this.createProposalVote()}
        ></mwc-button>
    </div>`;
    }
};
__decorate([
    state()
], CreateProposalVote.prototype, "_proposalPageHash", void 0);
__decorate([
    state()
], CreateProposalVote.prototype, "_vote", void 0);
__decorate([
    contextProvided({ context: appWebsocketContext })
], CreateProposalVote.prototype, "appWebsocket", void 0);
__decorate([
    contextProvided({ context: appInfoContext })
], CreateProposalVote.prototype, "appInfo", void 0);
CreateProposalVote = __decorate([
    customElement('create-proposal-vote')
], CreateProposalVote);
export { CreateProposalVote };
//# sourceMappingURL=create-proposal-vote.js.map