const Dispatcher = require("flux").Dispatcher;
const Emitter = require("events").EventEmitter;
import { injected, walletconnect } from "../config/connectors";
import { ActionTypes } from "../config/constants";
import * as mutations from "./mutations";

const dispatcher = new Dispatcher();
const emitter = new Emitter();

class Store {
    constructor() {
        this.store = {
            account: {},
            connectorsByName: {
                MetaMask: injected,
                WalletConnect: walletconnect
            },
            web3context: null,
            assets: [],
            totalAssetPrice: 0,
            totalVotingPower: 0
        };

        dispatcher.register(
            function(action) {
                switch (action.type) {
                    case ActionTypes.CONFIGURE:
                        mutations.configure(this, emitter, {});
                        break;
                    case ActionTypes.DEPOSIT:
                        mutations.makeDeposit(this, emitter, action.payload);
                        break;
                    case ActionTypes.REPAY:
                        mutations.makeRepay(this, emitter, action.payload);
                        break;
                    case ActionTypes.WITHDRAW:
                        mutations.makeWithdraw(this, emitter, action.payload);
                        break;
                    case ActionTypes.BORROW:
                        mutations.makeBorrow(this, emitter, action.payload);
                        break;
                    case ActionTypes.REWARDS:
                        mutations.makeStake(this, emitter, action.payload);
                        break;
                    case ActionTypes.FAUCET:
                        mutations.makeFaucet(this, emitter, action.payload);
                        break;
                    case ActionTypes.REWARDS_CLAIM:
                        mutations.makeRewardsClaim(this, emitter, action.payload);
                        break;
                    case ActionTypes.REWARDS_WITHDRAW:
                        mutations.makeRewardsWithdraw(this, emitter, action.payload);
                        break;
                    case ActionTypes.UPDATE_COLLATERAL:
                        mutations.updateCollateral(this, emitter, action.payload);
                        break;
                    case ActionTypes.SWAP_BORROW_RATE:
                        mutations.swapBorrowRate(this, emitter, action.payload);
                        break;
                    case ActionTypes.SUBMIT_VOTE:
                        mutations.submitVote(this, emitter, action.payload);
                        break;
                    case ActionTypes.EXECUTE_PROPOSAL:
                        mutations.executeProposal(this, emitter, action.payload);
                        break;
                    case ActionTypes.QUEUE_PROPOSAL:
                        mutations.queueProposal(this, emitter, action.payload);
                        break;
                    case ActionTypes.VOTING_POWER:
                        mutations.getVotingPower(this, emitter, action.payload);
                        break;
                    default:
                        break;
                }
            }.bind(this)
        );
    }

    getStore(index) {
        return this.store[index];
    }

    setStore(obj) {
        this.store = { ...this.store, ...obj };
        return emitter.emit("StoreUpdated");
    }
}

const store = new Store();

export default {
    store: store,
    emitter: emitter,
    dispatcher: dispatcher
};
