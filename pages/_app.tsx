import "@/styles/globals.scss";
import type { AppProps } from "next/app";

import { ChakraBaseProvider, extendBaseTheme } from "@chakra-ui/react";
// `@chakra-ui/theme` is a part of the base install with `@chakra-ui/react`
import chakraTheme from "@chakra-ui/theme";
import { Fade } from "@chakra-ui/react";

const components = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    ...components,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraBaseProvider theme={theme}>
      <Fade in={true}>
        <Component {...pageProps} />
      </Fade>
    </ChakraBaseProvider>
  );
}
