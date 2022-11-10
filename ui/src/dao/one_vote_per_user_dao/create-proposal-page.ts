import { LitElement, html } from 'lit';
import { state, customElement } from 'lit/decorators.js';
import { InstalledCell, ActionHash, Record, AppWebsocket, InstalledAppInfo } from '@holochain/client';
import { contextProvided } from '@lit-labs/context';
import { appWebsocketContext, appInfoContext } from '../../contexts';
import { ProposalPage } from './proposal-page';
import '@material/mwc-button';
import '@material/mwc-textarea';
import '@material/mwc-textfield';

@customElement('create-proposal-page')
export class CreateProposalPage extends LitElement {

  @state()
  _content: string
 | undefined;

  @state()
  _title: string
 | undefined;

  isProposalPageValid() {
    return this._content && this._title;
  }

  @contextProvided({ context: appWebsocketContext })
  appWebsocket!: AppWebsocket;

  @contextProvided({ context: appInfoContext })
  appInfo!: InstalledAppInfo;

  async createProposalPage() {
    const cellData = this.appInfo.cell_data.find((c: InstalledCell) => c.role_id === 'dao')!;

    const proposalPage: ProposalPage = { 
      content: this._content!,

      title: this._title!,
    };

    const record: Record = await this.appWebsocket.callZome({
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
    return html`
      <div style="display: flex; flex-direction: column">
        <div style="display: flex; flex: 1; flex-direction: column; align-items: center;">
        <h1 style="font-family: 'Space Mono'; color: #183E29">Proposal Creation</h1>
      </div>

          <mwc-textarea outlined label="Proposal Title" @input=${(e: CustomEvent) => { this._content = (e.target as any).value;} }></mwc-textarea>
          <mwc-textfield outlined label="Proposal Text" @input=${(e: CustomEvent) => { this._title = (e.target as any).value; } }></mwc-textfield>

        <div><button @click=${this.createProposalPage}>Create Proposal</button></div>

    </div>`;
  }
}
