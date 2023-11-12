import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { type AppType } from "next/app";
import { Toaster } from "react-hot-toast";
import Layout from "~/components/base/Layout/Layout";
import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </SessionProvider>
    </ChakraProvider>
  );
};

export default MyApp;
