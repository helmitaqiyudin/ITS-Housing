import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import '@mantine/core/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { MantineProvider } from "@mantine/core";
import { ToastContainer } from "react-toastify";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MantineProvider>
      <Component {...pageProps} />
      <ToastContainer theme="colored"/>
      </MantineProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
