const env = process.env.NEXT_PUBLIC_NODE_ENV;
const vars = {
  env,
  apiUrl: process.env.NEXT_PUBLIC_SERVER_URL + "/api",
  lendingPoolAddress: process.env.NEXT_PUBLIC_LENDING_POOL_ADDRESS,
  lendingPoolCoreAddress: process.env.NEXT_PUBLIC_LENDING_POOL_CORE_ADDRESS,
  lendingPoolDataProviderAddress:
    process.env.NEXT_PUBLIC_LENDING_POOL_DATA_PROVIDER_ADDRESS,
  lendingPoolConfiguratorAddress:
    process.env.NEXT_PUBLIC_LENDING_POOL_CONFIGURATOR_ADDRESS,
  rewardPoolAddressManagerAddress:
    process.env.NEXT_PUBLIC_REWARD_POOL_ADDRESS_MANAGER_ADDRESS,
  chainlinkProxyPriceProviderAddress:
    process.env.NEXT_PUBLIC_CHAINLINK_PROXY_PRICE_PROVIDER_ADDRESS,
  feeProviderAddress: process.env.NEXT_PUBLIC_FEE_PROVIDER_ADDRESS,
  testFaucetAddress: process.env.NEXT_PUBLIC_TEST_FAUCET_ADDRESS,
  governanceV2Address: process.env.NEXT_PUBLIC_GOVERNANCE_V2_ADDRESS,
  governanceStrategyAddress:
    process.env.NEXT_PUBLIC_GOVERNANCE_STRATEGY_ADDRESS,
  daiAddress: process.env.NEXT_PUBLIC_DAI_ADDRESS,
  rpcUrl: process.env.NEXT_PUBLIC_ETH_RPC_URL,
  rpcChainId: process.env.NEXT_PUBLIC_ETH_RPC_CHAIN_ID,
  ropstenApiKey: process.env.NEXT_PUBLIC_ROPSTEN_API_KEY,
};

env === "production"
  ? console.log("This app is using production settings")
  : console.log("This app is using development settings");

console.log(vars);

export default vars;
