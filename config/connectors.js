import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import WalletConnectProvider from "@walletconnect/web3-provider";

import config from "./vars";
// supportedChainIds: [1, 3, 4, 5, 42]
export const injected = new InjectedConnector({
    supportedChainIds: [Number(config.rpcChainId)]
});

// 1: 'https://mainnet.infura.io/v3/79701c57272c4fa8b5684a2db7a8941e',
// 3: 'https://ropsten.infura.io/v3/79701c57272c4fa8b5684a2db7a8941e',
// 4: 'https://rinkeby.infura.io/v3/79701c57272c4fa8b5684a2db7a8941e'

export const walletconnect = new WalletConnectConnector({
    rpc: { [Number(config.rpcChainId)]: config.rpcUrl },
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    pollingInterval: 1200
});

// export const walletconnect = new WalletConnectProvider({
//     rpc: {
//         1: "https://mainnet.infura.io/v3/79701c57272c4fa8b5684a2db7a8941e",
//         3: "https://ropsten.infura.io/v3/79701c57272c4fa8b5684a2db7a8941e",
//         4: 'https://rinkeby.infura.io/v3/79701c57272c4fa8b5684a2db7a8941e'
//     },
// });
//
// walletconnect.enable()
//
// walletconnect.on("accountsChanged", (accounts) => {
//     console.log("wallet connect account changed wisdom: ", accounts);
// });
//
// // Subscribe to chainId change
// walletconnect.on("chainChanged", (chainId) => {
//     console.log("walletconnect chain changed wisdom: ", chainId);
// });
//
// // Subscribe to session disconnection
// walletconnect.on("disconnect", (code, reason) => {
//     console.log("disconnected wallet connect")
//     console.log(code, reason);
// });