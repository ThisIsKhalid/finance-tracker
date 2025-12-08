"use client";
import { memo, useEffect, useRef } from "react";

interface WidgetConfig {
  symbol: string;
  colorTheme?: "light" | "dark";
  isTransparent?: boolean;
  locale?: string;
  width?: string;
}

interface TradingViewWidgetProps {
  symbols: string[];
  colorTheme?: "light" | "dark";
  isTransparent?: boolean;
}

function SingleWidget({ config }: { config: WidgetConfig }) {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify(config);

    const containerEl = container.current;

    if (containerEl) {
      containerEl.appendChild(script);
    }

    return () => {
      if (containerEl) {
        containerEl.innerHTML = "";
      }
    };
  }, [config]);

  return (
    <div
      className="tradingview-widget-container border border-gray-300 rounded-lg p-4 bg-slate-900"
      ref={container}
    >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

function TradingViewWidget({
  symbols,
  colorTheme = "dark",
  isTransparent = true,
}: TradingViewWidgetProps) {
  return (
    <div className="flex  gap-4">
      {symbols.map((symbol) => (
        <SingleWidget
          key={symbol}
          config={{
            symbol,
            colorTheme,
            isTransparent,
            locale: "en",
            width: "100%",
          }}
          
        />
      ))}
    </div>
  );
}

export default memo(TradingViewWidget);
