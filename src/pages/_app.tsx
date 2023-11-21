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

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MantineProvider>
        <main className={`bg-[#f0f2f5] ${GeistSans.className}`}>
          <Component {...pageProps} />
          <ToastContainer theme="colored" />
        </main>
      </MantineProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
