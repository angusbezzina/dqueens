import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import TagManager from "react-gtm-module";

import { gtmManager } from "lib/constants";

import "styles/globals.scss";

const tagManagerArgs = {
  gtmId: gtmManager,
};

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
