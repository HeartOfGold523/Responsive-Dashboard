import { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { fetchHotelCollection, refreshHotelCollection } from "./actions";
import { HotelsContextProvider } from "@/contexts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NYC Hotels",
  description: "Collection of hotels in the NYC Area",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = async ({
  children,
}: RootLayoutProps): Promise<JSX.Element> => {
  const { data, error } = await fetchHotelCollection();

  return (
    <html lang="en">
      <body className={inter.className}>
        <HotelsContextProvider
          collection={data}
          refreshCollection={refreshHotelCollection}
          error={error}
        >
          {children}
        </HotelsContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
