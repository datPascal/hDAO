import { LitElement, html } from 'lit';
import { state, customElement } from 'lit/decorators.js';
import { InstalledCell, ActionHash, Record, AppWebsocket, InstalledAppInfo } from '@holochain/client';
import { contextProvided } from '@lit-labs/context';
import { appWebsocketContext, appInfoContext } from '../../contexts';
import { ProposalVote } from './proposal-vote';
import '@material/mwc-button';
import '@material/mwc-checkbox';

@customElement('create-proposal-vote')
export class CreateProposalVote extends LitElement {

  @state()
  _proposalPageHash: ActionHash
 | undefined;

  @state()
  _vote: boolean
 | undefined;

  isProposalVoteValid() {
    return this._proposalPageHash && this._vote;
  }

  @contextProvided({ context: appWebsocketContext })
  appWebsocket!: AppWebsocket;

  @contextProvided({ context: appInfoContext })
  appInfo!: InstalledAppInfo;

  async createProposalVote() {
    const cellData = this.appInfo.cell_data.find((c: InstalledCell) => c.role_id === 'dao')!;

    const proposalVote: ProposalVote = { 
      proposal_page_hash: this._proposalPageHash!,

      vote: this._vote!,
    };

    const record: Record = await this.appWebsocket.callZome({
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
    return html`
      <div style="display: flex; flex-direction: column">
        <span style="font-size: 18px">Create ProposalVote</span>

          <!-- TODO: implement the creation of proposal_page_hash -->
          <mwc-formfield label="">
            <mwc-checkbox  @input=${(e: CustomEvent) => { this._vote = (e.target as any).value;} }></mwc-checkbox>
          </mwc-formfield>

        <mwc-button 
          label="Create ProposalVote"
          .disabled=${!this.isProposalVoteValid()}
          @click=${() => this.createProposalVote()}
        ></mwc-button>
    </div>`;
  }
}
