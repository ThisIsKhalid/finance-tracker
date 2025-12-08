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

        <div className="space-y-8 w-full">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Commodities</h2>
            <TradingViewWidget
              symbols={["FOREXCOM:XAUUSD", "FOREXCOM:XAGUSD", "TVC:USOIL"]}
              colorTheme="dark"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Forex</h2>
            <TradingViewWidget
              symbols={[
                "FOREXCOM:EURUSD",
                "FOREXCOM:GBPUSD",
                "FOREXCOM:AUDUSD",
                "FOREXCOM:NZDUSD",
                "FOREXCOM:USDJPY",
                "FOREXCOM:USDCHF",
                "FOREXCOM:USDCAD",
              ]}
              colorTheme="dark"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Tech Stocks</h2>
            <TradingViewWidget
              symbols={[
                "NASDAQ:AAPL",
                "NASDAQ:MSFT",
                "NASDAQ:AMZN",
                "NASDAQ:META",
                "NASDAQ:NVDA",
                "NASDAQ:TSLA",
              ]}
              colorTheme="dark"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Crypto</h2>
            <TradingViewWidget
              symbols={[
                "BINANCE:BTCUSDT",
                "BINANCE:ETHUSDT",
                "BINANCE:LTCUSDT",
                "BINANCE:XRPUSDT",
                "BINANCE:SOLUSDT",
                "BINANCE:ADAUSDT",
              ]}
              colorTheme="dark"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
