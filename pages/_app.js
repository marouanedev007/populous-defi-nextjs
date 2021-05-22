import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { ModalProvider } from "@area2k/use-modal";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

const theme = createMuiTheme({});

import "../styles/css/app.css";
import "../styles/css/custom.css";
import "../styles/css/index.css";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 1200;
  return library;
}

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </Web3ReactProvider>
    </ThemeProvider>
  );
}

export default MyApp;
