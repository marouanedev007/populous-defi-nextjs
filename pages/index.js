import React, { useEffect, useState } from "react";
import Link from "next/link";
import Store from "../stores/store";
import { beautyNumber, beautyNumberDecimal, tokenSymbol } from "../utilities";
import landingLogo from "../styles/img/landing-logo.png";
import { CONNECTION_CONNECTED } from "../config/constants";
import { configure } from "../stores/action";
import assetService from "../services/asset.service";

function createData(
  assets,
  market_size,
  total_borrowed,
  deposit_apy,
  variable_borrow_apy,
  variable_stable_apy,
  reserve_address
) {
  return {
    assets,
    market_size,
    total_borrowed,
    deposit_apy,
    variable_borrow_apy,
    variable_stable_apy,
    reserve_address,
    row_inner_values: {
      deposit_apy: deposit_apy,
      variable_borrow_apy: variable_borrow_apy,
      variable_stable_apy: variable_stable_apy,
    },
  };
}

const emitter = Store.emitter;
const store = Store.store;
const dispatcher = Store.dispatcher;

const HomePage = () => {
  const [totalAssetPrice, setTotalAssetPrice] = useState(
    store.getStore("totalAssetPrice")
  );
  const [assets, setAssets] = useState(store.getStore("assets"));
  const [currencyType, setCurrencyType] = useState(1);

  let rows = [];
  assets.map((value) => {
    rows.push(
      createData(
        value.symbol,
        {
          totalLiquidity: value.totalLiquidity,
          assetsPrice: value.assetsPrice,
        },
        {
          totalBorrowed: value.totalBorrowed,
          assetsPrice: value.assetsPrice,
        },
        value.liquidityRate,
        value.variableBorrowRate,
        value.stableBorrowRate,
        value.reserveAddress
      )
    );
  });

  const connectionConnected = () => {
    const _account = store.getStore("account");
    if (_account.address !== null) {
      dispatcher.dispatch(configure());
    }
  };

  const getReserves = () => {
    assetService.getReserveData().then((data) => {
      let total_price = 0;
      for (let _data of data) {
        total_price += _data.assetsPrice * _data.totalLiquidity;
      }
      setAssets(data);
      setTotalAssetPrice(total_price);
    });
  };

  const storeUpdated = () => {
    const _assets = store.getStore("assets");
    const _totalAssetPrice = store.getStore("totalAssetPrice");
    if (_assets.length > 0) {
      setAssets([..._assets]);
      setTotalAssetPrice(_totalAssetPrice);
    }
  };

  const changeCurrencyType = (val) => {
    setCurrencyType(val);
  };

  useEffect(() => {
    emitter.on("StoreUpdated", storeUpdated);
    emitter.on(CONNECTION_CONNECTED, connectionConnected);

    if (assets.length === 0) getReserves();
    return () => {
      emitter.removeListener("StoreUpdated", storeUpdated);
      emitter.removeListener(CONNECTION_CONNECTED, connectionConnected);
    };
  }, []);

  useEffect(() => {
    const classNameDark = "dark-preview";
    document.body.classList.remove(classNameDark);
  }, []);

  const walletsDummyData = [
    { name: "Browser wallet", image: "images/wallets/browser_wallet.png" },
    { name: "Portis", image: "images/wallets/portis_wallet.png" },
    { name: "Ledger", image: "images/wallets/ledger_wallet.png" },
    { name: "Mew wallet", image: "images/wallets/mew_wallet.png" },
    { name: "Coinbase", image: "images/wallets/coinbase_wallet.png" },
    { name: "Authereum", image: "images/wallets/auth_wallet.png" },
    { name: "WalletConnect", image: "images/wallets/connect_wallet.png" },
    { name: "Torus", image: "images/wallets/torus_wallet.png" },
    { name: "Formatic", image: "images/wallets/fort_wallet.png" },
  ];

  const swaps = [
    { image: "images/uniswap.svg", buttonText: "Buy in Uniswap" },
    { image: "images/pancakeswap.svg", buttonText: "Buy in Pancakeswap" },
  ];

  return (
    <>
      <div id="wrapper" className="mb-1">
        <section className="landing-banner w-100">
          <div className="container h-100">
            <div className="row d-flex flex-row justify-content-center w-100 align-content-center mx-0">
              <div className="col-xl-9 col-lg-9 text-center justify-content-center mx-auto">
                <div className="caption">
                  <Link href="/" className="navbar-brand ">
                    <img src={landingLogo} alt="" />
                  </Link>
                  <h1 className="w-100 pt-5">The Money Market Protocol</h1>
                  <p className="w-100 pt-3">
                    PopDeFi is an open source and non-custodial protocol
                    enabling the creation of money markets. Users can earn
                    interest on deposits and borrow assets.
                  </p>
                  <button className="btn btn-light enter mt-5 mb-5 ">
                    Enter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="protocol w-100">
        <div className="container">
          <div className="row d-flex flex-row justify-content-center w-100 align-content-center protocol-conatiner-inner">
            <div className="col-xl-12 col-lg-12 text-center mb-5">
              <h3 className="w-100% p-0 m-0">Protocol Market Size</h3>
              <h2 className="w-100% p-0 m-0  ">
                $&nbsp;
                {beautyNumberDecimal(totalAssetPrice.toFixed(0))}
              </h2>
              <p className="mt-0">
                PopDeFi Market $&nbsp;
                {beautyNumber(totalAssetPrice.toFixed(0))}
              </p>
            </div>

            {swaps.map((swap) => (
              <div className="col-md-6 mb-3 mb-md-0">
                <div className="swap-cards py-3 py-md-0 app-radius app-shadow bg-white d-flex flex-column flex-md-row justify-content-md-between align-items-center px-4">
                  <div className="mb-3 mb-md-0">
                    <img
                      src={swap.image}
                      alt="uniswap logo"
                      style={{ height: 40 }}
                    />
                  </div>

                  <button
                    className="text-white py-2 px-4 app-primary-bg-color app-radius"
                    style={{ border: "none" }}
                  >
                    {swap.buttonText}
                  </button>
                </div>
              </div>
            ))}

            <div className="col-md-12">
              <div className="bg-white mt-4 p-4 app-radius app-shadow">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                  <div className="d-flex flex-column mb-3 mb-md-0">
                    <div className="app-text-black text-xl font-weight-bold">
                      Welcome to PopDefi
                    </div>

                    <div className="text-sm">
                      Connect your wallet and jump into DeF
                    </div>
                  </div>

                  <div className="d-flex align-items-center">
                    <div className="d-flex flex-column align-items-end">
                      <span className="app-text-black text-sm">Audited by</span>
                      <span
                        className="app-text-black text-sm"
                        style={{ fontWeight: 600 }}
                      >
                        Hacken
                      </span>
                    </div>

                    <div className="ml-3">
                      <img src="images/hacken.svg" alt="hacken-logo" />
                    </div>
                  </div>
                </div>

                {/* wallet cards */}
                <div className="wallet-card-grid mb-3 mt-4">
                  {walletsDummyData.map((wallet) => (
                    <div className="wallet-card-grid__item d-flex align-items-center justify-content-between app-bg-gray app-radius px-4">
                      <div className="app-text-black">{wallet.name}</div>
                      <img src={wallet.image} alt={wallet.name} />
                    </div>
                  ))}
                </div>

                <button
                  className="app-radius app-bg-gray app-primary-text-color w-100 py-2 mb-4 d-flex align-items-center justify-content-center"
                  style={{ border: "none" }}
                >
                  <span className="mr-2">or continue without wallet</span>
                  <img src="images/arrow-right.svg" />
                </button>

                <div className="d-flex flex-md-row flex-column justify-content-between align-items-center">
                  <div className="app-policies d-flex flex-column text-center text-md-left mb-3 mb-md-0">
                    <div className="app-text-black">
                      By unlocking Your wallet You agree to our
                    </div>
                    <div className="app-text-black">
                      <span className="app-primary-text-color">
                        Terms of Service
                      </span>
                      , <span className="app-primary-text-color">Privacy</span>{" "}
                      and{" "}
                      <span className="app-primary-text-color">
                        Cookie Policy
                      </span>
                    </div>
                  </div>

                  <div className="app-disclaimer app-text-black text-center text-md-left">
                    <span style={{ fontWeight: 600 }}>Disclaimer:</span> Wallets
                    are provided by External Providers and by selecting you
                    agree to Terms of those Providers. Your access to the wallet
                    might be reliant on the External Provider being operational.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="landing-footer w-100">
        <div className="container">
          <div className="row d-flex flex-row justify-content-center w-100 align-content-center mx-0">
            <div className="col-xl-6 col-lg-6 text-center justify-content-center mx-auto">
              <h2 className="w-100% p-0 m-0 ">Stay in Touch!</h2>
              <form className="news mb-5 mt-4 pb-3 d-flex flex-row w-100">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                />
                <input type="submit" name="submit" value="Submit" />
              </form>
              <p className="p-0 mb-3">© 2020 PopDeFi. All Rights Reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
