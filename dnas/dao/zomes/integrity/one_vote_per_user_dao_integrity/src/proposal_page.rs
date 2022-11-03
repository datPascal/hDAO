use hdi::prelude::*;
#[hdk_entry_helper]
#[derive(Clone)]
pub struct ProposalPage {
    pub content: String,
    pub title: String,
}
