import { Record, ActionHash, EntryHash, AgentPubKey } from '@holochain/client';

export interface ProposalVote { 
  proposal_page_hash: ActionHash
;

  vote: boolean
;
}
