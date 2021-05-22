import Web3 from "web3";
import * as contractService from "../services/contract.service";
import assetService from "../services/asset.service";
import {
    ERROR,
    TRANSACTION_FINISHED,
    TRANSACTION_STARTED,
    TRANSACTION_FAILED,
} from "../config/constants";

const getWeb3Base = (store) => {
    const account = store.getStore("account");
    const context = store.getStore("web3context");
    if (context) {
        const web3 = new Web3(store.getStore("web3context").library.provider);
        return { web3, account };
    } else {
        return null;
    }
};

export const configure = async (store, emitter, payload) => {
    const base = getWeb3Base(store);
    if (base) {
        try {
            const data = await assetService.getAssetsWithAccount({
                address: base.account.address,
            });
            if (data) {
                const {
                    totalVotingPower,
                    account,
                    assets,
                    totalAssetPrice,
                } = data;
                store.setStore({
                    totalVotingPower,
                    account,
                    assets,
                    totalAssetPrice,
                });
            }
        } catch (err) {
            return emitter.emit(ERROR, err);
        }
    }
};

//Action for repay
export const makeRepay = (store, emitter, payload) => {
    const base = getWeb3Base(store);
    if (base) {
        contractService.makeRepay(
            {
                address: payload.data.reserve,
                amount: payload.data.amount,
                decimals: payload.data.decimals,
            },
            base,
            (err, reserves) => {
                if (err) {
                    console.log(err);
                    return emitter.emit(TRANSACTION_FAILED, err);
                }
                console.log(reserves);
                return emitter.emit(TRANSACTION_FINISHED, reserves);
            }
        );
    }
};

// Actions for deposit
export const makeDeposit = (store, emitter, payload) => {
    const base = getWeb3Base(store);
    if (base) {
        contractService.makeDeposit(
            {
                address: payload.data.reserve,
                amount: payload.data.amount,
                decimals: payload.data.decimals,
            },
            base,
            (err, reserves) => {
                if (err) {
                    console.log(err);
                    return emitter.emit(TRANSACTION_FAILED, err);
                }
                console.log(reserves);
                return emitter.emit(TRANSACTION_FINISHED, reserves);
            }
        );
    }
};

// Actions for withdraw
export const makeWithdraw = (store, emitter, payload) => {
    const base = getWeb3Base(store);
    if (base) {
        contractService.makeWithdraw(
            {
                address: payload.data.reserve,
                amount: payload.data.amount,
                decimals: payload.data.decimals,
            },
            base,
            (err, reserves) => {
                if (err) {
                    console.log(err);
                    return emitter.emit(TRANSACTION_FAILED, err);
                }
                console.log(reserves);
                return emitter.emit(TRANSACTION_FINISHED, reserves);
            }
        );
    }
};

// Actions for Reward withdrawreward
export const makeRewardsClaim = (store, emitter, payload) => {
    const base = getWeb3Base(store);
    if (base) {
        contractService.makeRewardsClaim(
            {
                address: payload.data.reserve,
                rewardPool: payload.data.rewardPool,
                decimals: payload.data.decimals,
            },
            base,
            (err, reserves) => {
                if (err) {
                    console.log(err);
                    return emitter.emit(TRANSACTION_FAILED, err);
                }
                console.log(reserves);
                return emitter.emit(TRANSACTION_FINISHED, {
                    approve: null,
                    reward: reserves,
                });
            }
        );
    }
};

// Actions for Reward withdraw
export const makeRewardsWithdraw = (store, emitter, payload) => {
    const base = getWeb3Base(store);
    if (base) {
        contractService.makeRewardsWithdraw(
            {
                address: payload.data.reserve,
                rewardPool: payload.data.rewardPool,
                amount: payload.data.amount,
                decimals: payload.data.decimals,
            },
            base,
            (err, reserves) => {
                if (err) {
                    console.log(err);
                    return emitter.emit(TRANSACTION_FAILED, err);
                }
                console.log(reserves);
                return emitter.emit(TRANSACTION_FINISHED, {
                    approve: null,
                    reward: reserves,
                });
            }
        );
    }
};

// Actions for Borrow
export const makeBorrow = (store, emitter, payload) => {
    emitter.emit(TRANSACTION_STARTED, {
        transaction: "borrow",
        type: "start",
    });

    const base = getWeb3Base(store);
    if (base) {
        contractService.makeBorrow(
            {
                address: payload.data.reserve,
                amount: payload.data.amount,
                decimals: payload.data.decimals,
                rateType: payload.data.rateType,
            },
            base,
            (err, reserves) => {
                if (err) {
                    console.log(err);
                    return emitter.emit(TRANSACTION_FAILED, {
                        type: "failed",
                        err,
                    });
                }

                console.log(reserves);
                return emitter.emit(TRANSACTION_FINISHED, {
                    type: "success",
                    reserves,
                });
            }
        );
    }
};

// Actions for deposit
export const makeStake = (store, emitter, payload) => {
    const base = getWeb3Base(store);
    if (base) {
        contractService.makeStake(
            {
                reserve: payload.data.reserve,
                ptoken: payload.data.ptoken,
                rewardPool: payload.data.rewardPool,
                amount: payload.data.amount,
                decimals: payload.data.decimals,
            },
            base,
            (err, reserves) => {
                if (err) {
                    console.log(err);
                    return emitter.emit(TRANSACTION_FAILED, err);
                }
                console.log(reserves);
                return emitter.emit(TRANSACTION_FINISHED, reserves);
            }
        );
    }
};

//Action for repay
export const makeFaucet = (store, emitter, payload) => {
    const base = getWeb3Base(store);
    if (base) {
        contractService.makeFaucet(
            {
                reserve: payload.data.reserve,
                amount: payload.data.amount,
                decimals: payload.data.decimals,
            },
            base,
            (err, reserves) => {
                if (err) {
                    console.log(err);
                    return emitter.emit(TRANSACTION_FAILED, err);
                }
                console.log(reserves);
                return emitter.emit(TRANSACTION_FINISHED, reserves);
            }
        );
    }
};

//action set collateral for each reserve
export const updateCollateral = (store, emitter, payload) => {
    const base = getWeb3Base(store);
    if (base) {
        contractService.updateCollateral(
            {
                reserve: payload.data.reserve,
                isCollateral: payload.data.isCollateral,
                store,
            },
            base,
            (err, reserves) => {
                if (err) {
                    console.log(err);
                    return emitter.emit(TRANSACTION_FAILED, err);
                }
                return emitter.emit(TRANSACTION_FINISHED, reserves);
            }
        );
    }
};

//action Swap Borrow Rate (Stable/Variable)
export const swapBorrowRate = (store, emitter, payload) => {
    const base = getWeb3Base(store);
    if (base) {
        contractService.swapBorrowRate(
            {
                reserve: payload.data.reserve,
                store,
            },
            base,
            (err, reserves) => {
                if (err) {
                    console.log(err);
                    return emitter.emit(TRANSACTION_FAILED, err);
                }
                return emitter.emit(TRANSACTION_FINISHED, reserves);
            }
        );
    }
};

// Actions for Create Proposal
export const createProposal = (store, emitter, payload) => {
    const base = getWeb3Base(store);
    if (base) {
        contractService.createProposal(
            {
                executor: payload.data.executor,
                targets: payload.data.targets,
                values: payload.data.values,
                signatures: payload.data.signatures,
                calldatas: payload.data.calldatas,
                withDelegatecalls: payload.data.withDelegatecalls,
                ipfsHash: payload.data.ipfsHash,
            },
            base,
            (err, reserves) => {
                if (err) {
                    console.log(err);
                    return emitter.emit(TRANSACTION_FAILED, err);
                }
                console.log(reserves);
                return emitter.emit(TRANSACTION_FINISHED, {
                    approve: null,
                    reward: reserves,
                });
            }
        );
    }
};

// Actions for Submit Vote
export const submitVote = (store, emitter, payload) => {
    const base = getWeb3Base(store);
    if (base) {
        contractService.submitVote(
            {
                tokenAddress: payload.data.tokenAddress,
                tokenAmount: payload.data.tokenAmount,
                proposalId: payload.data.proposalId,
                support: payload.data.support,
            },
            base,
            (err, result) => {
                if (err) {
                    console.log(err);
                    return emitter.emit(TRANSACTION_FAILED, err);
                }
                console.log(result);
                return emitter.emit(TRANSACTION_FINISHED, result);
            }
        );
    }
};

// Actions for Execute Proposal
export const executeProposal = (store, emitter, payload) => {
    const base = getWeb3Base(store);
    if (base) {
        contractService.executeProposal(
            {
                proposalId: payload.data.proposalId,
            },
            base,
            (err, result) => {
                if (err) {
                    console.log(err);
                    return emitter.emit(TRANSACTION_FAILED, err);
                }
                console.log(result);
                return emitter.emit(TRANSACTION_FINISHED, result);
            }
        );
    }
};

// Actions for Queue Proposal
export const queueProposal = (store, emitter, payload) => {
    const base = getWeb3Base(store);
    if (base) {
        contractService.queueProposal(
            {
                proposalId: payload.data.proposalId,
            },
            base,
            (err, result) => {
                if (err) {
                    console.log(err);
                    return emitter.emit(TRANSACTION_FAILED, err);
                }
                console.log(result);
                return emitter.emit(TRANSACTION_FINISHED, result);
            }
        );
    }
};

// Actions for get voting power
export const getVotingPower = (store, emitter, payload) => {
    const base = getWeb3Base(store);
    if (base) {
        contractService.getVotingPower(base, (err, result) => {
            if (err) {
                console.log(err);
                return emitter.emit(ERROR, err);
            }
            store.setStore({
                totalVotingPower: result,
            });
        });
    }
};
