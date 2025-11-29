import TradingViewWidget from "@/components/Testing/TradingViewWidget";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import React from "react";

export default function Home() {
  return (
    <div className="bg-secondary  h-screen w-full">
      <Container className="flex flex-col items-center justify-center h-full">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-6 text-white">
            Welcome to Our Application
          </h1>
          <p className="text-lg mb-8 text-white">
            This is the home page of our awesome application built with Next.js
            and Tailwind CSS.
          </p>
          <Button>Get Started</Button>
        </div>

        <div>
          <TradingViewWidget
            symbols={[
              "NASDAQ:AAPL",
              "TVC:GOLD",
              "BINANCE:BTCUSDT",
              "NASDAQ:TSLA",
            ]}
            colorTheme="dark"
          />
        </div>
      </Container>
    </div>
  );
}
