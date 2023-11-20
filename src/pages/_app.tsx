import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";


import { api } from "~/utils/api";

import "~/styles/globals.css";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-toastify/dist/ReactToastify.css';
import { MantineProvider } from "@mantine/core";
import { ToastContainer } from "react-toastify";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MantineProvider>
        <main className={GeistSans.className}>
          <Component {...pageProps} />
          <ToastContainer theme="colored" />
        </main>
      </MantineProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
