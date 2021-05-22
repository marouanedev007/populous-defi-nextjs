import { ActionTypes } from "../config/constants";

export const configure = (data) => ({
    type: ActionTypes.CONFIGURE,
    payload: {
        data
    }
});
export const deposit = (data) => ({
    type: ActionTypes.DEPOSIT,
    payload: {
        data
    }
});
export const withdraw = (data) => ({
    type: ActionTypes.WITHDRAW,
    payload: {
        data
    }
});
export const borrow = (data) => ({
    type: ActionTypes.BORROW,
    payload: {
        data
    }
});
export const rewards = (data) => ({
    type: ActionTypes.REWARDS,
    payload: {
        data
    }
});
export const repay = (data) => ({
    type: ActionTypes.REPAY,
    payload: {
        data
    }
});
export const faucet = (data) => ({
    type: ActionTypes.FAUCET,
    payload: {
        data
    }
});
export const rewardsClaim = (data) => ({
    type: ActionTypes.REWARDS_CLAIM,
    payload: {
        data
    }
});
export const rewardsWithdraw = (data) => ({
    type: ActionTypes.REWARDS_WITHDRAW,
    payload: {
        data
    }
});
export const updateCollateralAction = (data) => ({
    type: ActionTypes.UPDATE_COLLATERAL,
    payload: {
        data
    }
});
export const swapBorrowRate = (data) => ({
    type: ActionTypes.SWAP_BORROW_RATE,
    payload: {
        data
    }
});
export const submitVote = (data) => ({
    type: ActionTypes.SUBMIT_VOTE,
    payload: {
        data
    }
});
export const executeProposal = (data) => ({
    type: ActionTypes.EXECUTE_PROPOSAL,
    payload: {
        data
    }
});
export const queueProposal = (data) => ({
    type: ActionTypes.QUEUE_PROPOSAL,
    payload: {
        data
    }
});
export const getVotingPower = (data = {}) => ({
    type: ActionTypes.VOTING_POWER,
    payload: {
        data
    }
});


