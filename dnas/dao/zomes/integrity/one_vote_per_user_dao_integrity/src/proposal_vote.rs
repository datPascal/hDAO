use hdi::prelude::*;
#[hdk_entry_helper]
#[derive(Clone)]
pub struct ProposalVote {
    pub proposal_page_hash: ActionHash,
    pub vote: bool,
}
