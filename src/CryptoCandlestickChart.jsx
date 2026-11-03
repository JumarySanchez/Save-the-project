import { CandlestickSeries, ColorType, CrosshairMode, createChart } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";

const CRYPTO_PAIRS = [
  { symbol: "BTCUSDT", label: "Bitcoin (BTC)" },
  { symbol: "ETHUSDT", label: "Ethereum (ETH)" },
  { symbol: "SOLUSDT", label: "Solana (SOL)" },
  { symbol: "BNBUSDT", label: "BNB (BNB)" },
  { symbol: "XRPUSDT", label: "XRP (XRP)" },
  { symbol: "ADAUSDT", label: "Cardano (ADA)" },
  { symbol: "DOGEUSDT", label: "Dogecoin (DOGE)" },
  { symbol: "LINKUSDT", label: "Chainlink (LINK)" },
  { symbol: "AVAXUSDT", label: "Avalanche (AVAX)" },
  { symbol: "LTCUSDT", label: "Litecoin (LTC)" },
  { symbol: "DOTUSDT", label: "Polkadot (DOT)" },
];

const TIMEFRAMES = [
  { value: "1m", label: "1 minute" },
  { value: "5m", label: "5 minutes" },
  { value: "15m", label: "15 minutes" },
  { value: "1h", label: "1 hour" },
  { value: "4h", label: "4 hours" },
  { value: "1d", label: "1 day" },
];

const CHART_HEIGHT = 440;
const REFRESH_INTERVAL_MS = 2000;

function parseCandle(row) {
  if (!Array.isArray(row) || row.length < 5) {
    throw new Error("The market feed returned an invalid candle.");
  }

  const [openTime, open, high, low, close] = row;
  const candle = {
    time: Math.floor(Number(openTime) / 1000),
    open: Number(open),
    high: Number(high),
    low: Number(low),
    close: Number(close),
  };

  if (!Object.values(candle).every(Number.isFinite)) {
    throw new Error("The market feed returned invalid price data.");
  }

  return candle;
}

export default function CryptoCandlestickChart() {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const [symbol, setSymbol] = useState(CRYPTO_PAIRS[0].symbol);
  const [timeframe, setTimeframe] = useState(TIMEFRAMES[0].value);
  const [status, setStatus] = useState("Connecting to market data…");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [latestPrice, setLatestPrice] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const chart = createChart(container, {
      width: container.clientWidth,
      height: CHART_HEIGHT,
      layout: {
        background: { type: ColorType.Solid, color: "#0B1124" },
        textColor: "#B7C0D8",
        attributionLogo: true,
      },
      grid: {
        vertLines: { color: "rgba(183,192,216,0.08)" },
        horzLines: { color: "rgba(183,192,216,0.08)" },
      },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: { borderColor: "rgba(183,192,216,0.2)" },
      timeScale: {
        borderColor: "rgba(183,192,216,0.2)",
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#9B7CFF",
      downColor: "#FFFFFF",
      borderUpColor: "#9B7CFF",
      borderDownColor: "#FFFFFF",
      wickUpColor: "#9B7CFF",
      wickDownColor: "#FFFFFF",
    });

    chartRef.current = chart;
    seriesRef.current = series;

    const resizeObserver = new ResizeObserver(([entry]) => {
      if (entry) chart.resize(Math.floor(entry.contentRect.width), CHART_HEIGHT);
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  useEffect(() => {
    const series = seriesRef.current;
    if (!series) return undefined;

    let active = true;
    let timerId;
    let initialized = false;
    const controller = new AbortController();
    series.setData([]);
    setStatus("Loading live candles…");
    setLastUpdated(null);
    setLatestPrice(null);

    async function refreshCandles() {
      const requestStartedAt = Date.now();
      try {
        const query = new URLSearchParams({ symbol, interval: timeframe, limit: "300" });
        const response = await fetch(`https://data-api.binance.vision/api/v3/klines?${query}`, {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`Market feed returned ${response.status}.`);

        const payload = await response.json();
        if (!Array.isArray(payload) || payload.length === 0) {
          throw new Error("No candle data is currently available for this market.");
        }

        const candles = payload.map(parseCandle);
        if (!active) return;

        if (!initialized) {
          series.setData(candles);
          chartRef.current?.timeScale().fitContent();
          initialized = true;
        } else {
          series.update(candles[candles.length - 1]);
        }

        setLatestPrice(candles[candles.length - 1].close);
        setLastUpdated(new Date());
        setStatus("Live · refreshing every 2 seconds");
      } catch (error) {
        if (active && error.name !== "AbortError") {
          setStatus(`Live market data unavailable: ${error.message}`);
        }
      } finally {
        if (active) {
          const delay = Math.max(0, REFRESH_INTERVAL_MS - (Date.now() - requestStartedAt));
          timerId = window.setTimeout(refreshCandles, delay);
        }
      }
    }

    refreshCandles();

    return () => {
      active = false;
      window.clearTimeout(timerId);
      controller.abort();
    };
  }, [symbol, timeframe]);

  const price = latestPrice === null
    ? "—"
    : new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: latestPrice < 1 ? 6 : 2 }).format(latestPrice);

  return (
    <section id="crypto-markets" className="w-full scroll-mt-20 border-y border-[#B7C0D8]/15 bg-[#050816] px-4 py-14 text-[#F4F7FB] sm:px-8 sm:py-20">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#C6B8FF]">Live crypto markets</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Crypto candlestick chart</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#B7C0D8]">
              Explore spot-market price history. Candles refresh every two seconds; market data may be delayed or unavailable.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <label className="flex flex-col gap-1 text-xs font-semibold text-[#B7C0D8]">
              Cryptocurrency
              <select
                value={symbol}
                onChange={(event) => setSymbol(event.target.value)}
                className="min-w-48 rounded-lg border border-[#B7C0D8]/25 bg-[#0B1124] px-3 py-2.5 text-sm text-[#F4F7FB]"
              >
                {CRYPTO_PAIRS.map((pair) => <option key={pair.symbol} value={pair.symbol}>{pair.label}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs font-semibold text-[#B7C0D8]">
              Candle interval
              <select
                value={timeframe}
                onChange={(event) => setTimeframe(event.target.value)}
                className="min-w-36 rounded-lg border border-[#B7C0D8]/25 bg-[#0B1124] px-3 py-2.5 text-sm text-[#F4F7FB]"
              >
                {TIMEFRAMES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select>
            </label>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-[#B7C0D8]/15 bg-[#0B1124]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#B7C0D8]/15 px-4 py-3">
            <p className="font-bold">{symbol.replace("USDT", "")}/USDT <span className="ml-2 font-normal text-[#B7C0D8]">{price}</span></p>
            <p className="text-xs text-[#B7C0D8]" role="status">{status}</p>
          </div>
          <div ref={containerRef} className="w-full" style={{ height: CHART_HEIGHT }} />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#8F9AB7]">
          <p>Source: Binance spot market. Last updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : "waiting for data"}</p>
          <a href="https://www.tradingview.com/" target="_blank" rel="noopener noreferrer" className="text-[#C6B8FF] underline underline-offset-4">
            Charting by TradingView
          </a>
        </div>
        <p className="mt-2 text-xs leading-5 text-[#8F9AB7]">
          Crypto prices are volatile. This chart is for general information only and is not investment advice or a recommendation to buy or sell any digital asset.
        </p>
      </div>
    </section>
  );
}
