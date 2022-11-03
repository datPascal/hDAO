pub mod proposal_vote;
pub use proposal_vote::*;
pub mod proposal_page;
pub use proposal_page::*;
use hdi::prelude::*;
#[hdk_extern]
pub fn validate(_op: Op) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Valid)
}
#[hdk_entry_defs]
#[unit_enum(UnitEntryTypes)]
pub enum EntryTypes {
    ProposalPage(ProposalPage),
    ProposalVote(ProposalVote),
}
#[hdk_link_types]
pub enum LinkTypes {
    AllProposals,
    ProposalPageToProposalVote,
    AllProposalsVotedByUser,
    AllProposalsCreatedByUser,
}
