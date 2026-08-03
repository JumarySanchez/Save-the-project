import React, { useEffect, useMemo, useRef, useState } from "react";
import logoPng from "../public/Calo_purple_logo.png";
import hikerPng from "../assets/hiker.png";
import caloGif from "../assets/Calo-gif.gif";
import caloJpg from "../assets/calo.jpg";

const FALLBACK_COINS = [
  { symbol: "BTC", name: "Bitcoin", price: 97430, change: 2.14 },
  { symbol: "ETH", name: "Ethereum", price: 3812, change: 1.87 },
  { symbol: "SOL", name: "Solana", price: 172, change: 3.21 },
  { symbol: "BNB", name: "BNB", price: 608, change: -0.54 },
  { symbol: "XRP", name: "XRP", price: 0.5821, change: 1.12 },
  { symbol: "ADA", name: "Cardano", price: 0.4432, change: -1.03 },
];

const CHART_ASSETS = [
  { group: "Crypto", label: "BTCUSD", display: "BTC/USD", tvSymbol: "COINBASE:BTCUSD", price: 97430, change: 2.14 },
  { group: "Crypto", label: "ETHUSD", display: "ETH/USD", tvSymbol: "COINBASE:ETHUSD", price: 3812, change: 1.87 },
  { group: "Crypto", label: "SOLUSD", display: "SOL/USD", tvSymbol: "COINBASE:SOLUSD", price: 172, change: 3.21 },
  { group: "Crypto", label: "XRPUSD", display: "XRP/USD", tvSymbol: "BITSTAMP:XRPUSD", price: 0.5821, change: 1.12 },
  { group: "Crypto", label: "ADAUSD", display: "ADA/USD", tvSymbol: "COINBASE:ADAUSD", price: 0.4432, change: -1.03 },
  { group: "Crypto", label: "DOGEUSD", display: "DOGE/USD", tvSymbol: "COINBASE:DOGEUSD", price: 0.1587, change: 2.42 },
  { group: "Crypto", label: "AVAXUSD", display: "AVAX/USD", tvSymbol: "COINBASE:AVAXUSD", price: 36.14, change: 1.65 },
  { group: "Crypto", label: "LINKUSD", display: "LINK/USD", tvSymbol: "COINBASE:LINKUSD", price: 16.88, change: 0.94 },
  { group: "Stocks", label: "AAPL", display: "AAPL", tvSymbol: "NASDAQ:AAPL", price: 214.32, change: 0.78 },
  { group: "Stocks", label: "TSLA", display: "TSLA", tvSymbol: "NASDAQ:TSLA", price: 356.41, change: 1.24 },
  { group: "Stocks", label: "NVDA", display: "NVDA", tvSymbol: "NASDAQ:NVDA", price: 142.11, change: 1.57 },
  { group: "Stocks", label: "MSFT", display: "MSFT", tvSymbol: "NASDAQ:MSFT", price: 467.23, change: 0.61 },
  { group: "Stocks", label: "GOOGL", display: "GOOGL", tvSymbol: "NASDAQ:GOOGL", price: 176.48, change: 0.52 },
  { group: "Commodities", label: "GOLD", display: "Gold", tvSymbol: "OANDA:XAUUSD", price: 3395, change: 1.4 },
  { group: "Indexes", label: "SPX", display: "S&P 500", tvSymbol: "SP:SPX", price: 6042, change: 0.42 },
  { group: "ETFs", label: "SPY", display: "SPY", tvSymbol: "AMEX:SPY", price: 590.12, change: 0.39 },
  { group: "ETFs", label: "QQQ", display: "QQQ", tvSymbol: "NASDAQ:QQQ", price: 521.77, change: 0.55 },
];

const services = [
  {
    title: "Cash Alternatives",
    description:
      "Strategic guidance on liquidity planning, cash management, and income-focused approaches designed to support capital preservation.",
    features: ["Liquidity Planning", "Cash Management", "Income-Focused Strategies", "Capital Preservation"],
  },
  {
    title: "Crypto",
    description:
      "Market insight on digital assets, including Bitcoin, Ethereum, and blockchain trends, with a focus on disciplined cryptocurrency strategy.",
    features: ["Bitcoin and Ethereum Insight", "Cryptocurrency Market Analysis", "Blockchain Trends", "Digital Asset Strategy"],
  },
  {
    title: "Commodities",
    description:
      "Perspective on precious metals and energy markets to support portfolio diversification and inflation-aware financial planning.",
    features: ["Precious Metals Perspective", "Energy Market Analysis", "Diversification Strategy", "Inflation Considerations"],
  },
  {
    title: "Companies",
    description:
      "Research-driven analysis of public markets and private opportunities focused on innovation, business quality, and long-term value creation.",
    features: ["Public Market Opportunities", "Private Opportunity Review", "Innovation Themes", "Long-Term Value Focus"],
  },
];

const serviceIds = services.map((service) => service.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
const serviceMarks = services.map((_, index) => String(index + 1).padStart(2, "0"));
const serviceTextures = [
  { panel: "bg-[linear-gradient(180deg,rgba(14,19,33,0.9)_0%,rgba(8,11,19,0.96)_100%)]", accent: "Cash Layer" },
  { panel: "bg-[linear-gradient(180deg,rgba(18,12,36,0.9)_0%,rgba(8,11,19,0.96)_100%)]", accent: "Digital Layer" },
  { panel: "bg-[linear-gradient(180deg,rgba(12,22,33,0.9)_0%,rgba(8,11,19,0.96)_100%)]", accent: "Real Asset Layer" },
  { panel: "bg-[linear-gradient(180deg,rgba(20,14,28,0.9)_0%,rgba(8,11,19,0.96)_100%)]", accent: "Business Layer" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/p/DX-IYIihBMP/",
    ariaLabel: "Open Calo Capital Instagram in a new tab",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/CaloCapital/",
    ariaLabel: "Open Calo Capital Facebook in a new tab",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path d="M14 8.5V7.1c0-.9.6-1.6 1.5-1.6H17V2.5h-1.9C12.5 2.5 11 4.1 11 6.6v1.9H8.9v3.1H11V21h3.1v-9.4h2.5l.4-3.1H14Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/calocapital/",
    ariaLabel: "Open Calo Capital LinkedIn in a new tab",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4" stroke="currentColor" strokeWidth="1.75" />
        <g transform="translate(0.7 0.6) scale(0.92)">
          <path d="M8.1 10.2h2.7V17H8.1v-6.8ZM9.45 8.9c-.85 0-1.44-.58-1.44-1.32s.59-1.31 1.44-1.31 1.44.58 1.44 1.31c0 .74-.59 1.32-1.44 1.32ZM12.8 10.2h2.6v1c.36-.7 1.15-1.2 2.28-1.2 1.88 0 3.02 1.18 3.02 3.43V17h-2.7v-3c0-1.01-.38-1.66-1.28-1.66-.86 0-1.45.57-1.45 1.58V17h-2.47v-6.8Z" fill="currentColor" />
        </g>
      </svg>
    ),
  },
];

function SocialLink({ item }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.ariaLabel}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-violet-300/35 hover:bg-violet-300/10 hover:text-white"
    >
      {item.icon}
      <span>{item.label}</span>
    </a>
  );
}

const SCHEDULE_CALL_URL = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1B5aYsQO11ULfIFT4BjQaiNTGM7OpuiwePgYL8e7gd_Uu1whzy5OFY-JDIXtxnpjqocqG1IaH3";

function getMissingConfigError() {
  const missing = [];
  if (!EMAILJS_SERVICE_ID) missing.push("VITE_EMAILJS_SERVICE_ID");
  if (!EMAILJS_PUBLIC_KEY) missing.push("VITE_EMAILJS_PUBLIC_KEY");
  if (!EMAILJS_TEMPLATE_ID) missing.push("VITE_EMAILJS_TEMPLATE_ID");
  return `EmailJS not configured. Missing: ${missing.join(", ")}. Please add these environment variables to your deployment.`;
}

async function sendInquiryEmail(templateId, templateParams) {
  if (!EMAILJS_SERVICE_ID || !templateId || !ensureEmailjsInitialized()) {
    throw new Error(getMissingConfigError());
  }

  return emailjs.send(EMAILJS_SERVICE_ID, templateId, templateParams);
}

function readStoredList(storageKey) {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
}

function storeInquiry(storageKey, entry) {
  const existing = readStoredList(storageKey);
  localStorage.setItem(storageKey, JSON.stringify([entry, ...existing]));
  return existing.length + 1;
}

function formatPrice(price) {
  if (price >= 1000) return `$${price.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  if (price >= 1) return `$${price.toFixed(2)}`;
  return `$${price.toFixed(4)}`;
}

function buildTickerItems(coins) {
  const coinMap = new Map(coins.map((coin) => [coin.symbol, coin]));

  const cryptoItems = [
    ["BTC", "Bitcoin"],
    ["ETH", "Ethereum"],
    ["SOL", "Solana"],
    ["XRP", "XRP"],
    ["ADA", "Cardano"],
  ].map(([symbol, name]) => {
    const coin = coinMap.get(symbol) || FALLBACK_COINS.find((fallbackCoin) => fallbackCoin.symbol === symbol);
    return {
      symbol,
      name,
      price: coin?.price ?? 0,
      change: coin?.change ?? 0,
    };
  });

  return [
    ...cryptoItems,
    { symbol: "AAPL", name: "Apple", price: 214.32, change: 0.78 },
    { symbol: "TSLA", name: "Tesla", price: 356.41, change: 1.24 },
    { symbol: "NVDA", name: "NVIDIA", price: 142.11, change: 1.57 },
    { symbol: "MSFT", name: "Microsoft", price: 467.23, change: 0.61 },
    { symbol: "SPY", name: "S&P 500 ETF", price: 590.12, change: 0.39 },
    { symbol: "QQQ", name: "Nasdaq 100 ETF", price: 521.77, change: 0.55 },
  ];
}

function useMarketData() {
  const [coins, setCoins] = useState(FALLBACK_COINS);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchPrices() {
      try {
        const ids = "bitcoin,ethereum,solana,binancecoin,ripple,cardano";
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
          { headers: { Accept: "application/json" } }
        );

        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;

        const map = [
          ["bitcoin", "BTC", "Bitcoin"],
          ["ethereum", "ETH", "Ethereum"],
          ["solana", "SOL", "Solana"],
          ["binancecoin", "BNB", "BNB"],
          ["ripple", "XRP", "XRP"],
          ["cardano", "ADA", "Cardano"],
        ];

        const nextCoins = map.map(([id, symbol, name], index) => {
          const item = data[id];
          if (!item) return FALLBACK_COINS[index];
          return {
            symbol,
            name,
            price: Number(item.usd || FALLBACK_COINS[index].price),
            change: Number(item.usd_24h_change || 0),
          };
        });

        setCoins(nextCoins);
        setLive(true);
      } catch (error) {
        setLive(false);
      }
    }

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { coins, live };
}

function MarketTicker({ coins, live }) {
  const items = useMemo(() => [...buildTickerItems(coins), ...buildTickerItems(coins)], [coins]);

  return (
    <div className="relative z-40 overflow-hidden border-b border-white/10 bg-[#050816]/95 text-white">
      <style>{`
        .ticker-track {
          animation: tickerMarquee 24s linear infinite;
          will-change: transform;
        }
        @keyframes tickerMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div className="mx-auto flex w-full max-w-[94vw] items-center gap-4 px-5 py-3 text-xs font-black uppercase tracking-[0.18em]">
        <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-1 text-emerald-200">
          {live ? "Live" : "Fallback"}
        </span>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="ticker-track flex w-max items-center gap-6 whitespace-nowrap">
            {items.map((item, index) => (
              <div key={`${item.symbol}-${index}`} className="flex items-center gap-2 whitespace-nowrap text-slate-200">
                <span className="text-slate-400">{item.symbol}</span>
                <span className="font-mono text-white">{formatPrice(item.price)}</span>
                <span className={item.change >= 0 ? "text-emerald-300" : "text-rose-300"}>
                  {item.change >= 0 ? "+" : ""}{item.change.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Logo({ logoSizeClass = "h-16", textSizeClass = "text-lg", taglineClass = "text-xs uppercase tracking-[0.25em] text-violet-200/70" }) {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src={logoPng}
        alt="Calo Capital Logo"
        className={`${logoSizeClass} w-auto shrink-0 self-center object-contain`}
        style={{ background: 'transparent' }}
      />
      <div className="text-left leading-tight">
        <p className={`${textSizeClass} font-black tracking-wide text-white`}>Calo Capital</p>
        <p className={taglineClass}>Where Strategy Meets Legacy</p>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[72svh] overflow-hidden bg-[#070a14] text-white">
      <div
        className="absolute inset-0 bg-[length:100%_auto] bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${caloGif})`, backgroundPosition: "center top" }}
      />
    </section>
  );
}

const pageRoutes = {
  Home: "#/",
  About: "#about",
  Team: "#leadership",
  Contact: "#contact",
};

function getPageFromHash() {
  const hash = window.location.hash || "#/";
  if (hash === "#/about" || hash === "#about" || hash === "#client-excellence") return "Home";
  if (hash === "#/team" || hash === "#team" || hash === "#leadership") return "Home";
  if (hash === "#/contact" || hash === "#contact") return "Home";
  return "Home";
}

function Navbar({ currentPage, setPage }) {
  const [open, setOpen] = useState(false);
  const links = ["Home", "About", "Team", "Contact"];

  function goTo(page) {
    setPage(page);
    window.location.hash = pageRoutes[page];
    setOpen(false);
    setTimeout(() => {
      const sectionId = pageRoutes[page].replace("#/", "").replace("#", "");
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 0);
  }

  return (
    <header className="z-50 bg-[#070a14]/40">
      <div className="mx-auto flex w-full max-w-[94vw] items-center justify-between px-5 py-4">
        <button onClick={() => goTo("Home")} aria-label="Calo Capital home" className="text-left">
          <Logo />
        </button>

        <nav className="hidden flex-1 items-center justify-center gap-12 px-16 lg:flex lg:max-w-4xl xl:max-w-5xl">
          {links.map((label) => (
            <button
              key={label}
              onClick={() => goTo(label)}
              className={currentPage === label ? "px-1 text-sm font-black text-white" : "px-1 text-sm font-semibold text-slate-300 transition hover:text-white"}
            >
              {label}
            </button>
          ))}
        </nav>
        <a
          href={SCHEDULE_CALL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-xl bg-[#8B5CF6] px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-[#A855F7] lg:inline-block"
        >
          Schedule a Call
        </a>

        <button
          onClick={() => setOpen((value) => !value)}
          className="rounded-xl border border-white/15 px-3 py-2 text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#070a14] px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((label) => (
              <button key={label} onClick={() => goTo(label)} className={currentPage === label ? "text-left text-sm font-black text-white" : "text-left text-sm font-semibold text-slate-300"}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function FloatingStars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 26 }, (_, index) => ({
        id: index,
        left: `${(index * 37) % 100}%`,
        top: `${(index * 19) % 100}%`,
        delay: `${(index % 7) * 0.6}s`,
        duration: `${3 + (index % 5)}s`,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute h-1 w-1 animate-pulse rounded-full bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.9)]"
          style={{ left: star.left, top: star.top, animationDelay: star.delay, animationDuration: star.duration }}
        />
      ))}
    </div>
  );
}

function MovingClouds() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-48 overflow-hidden">
      <div className="cloud-layer cloud-layer-one absolute bottom-[-52px] left-0 h-36 w-[220%] opacity-70" />
      <div className="cloud-layer cloud-layer-two absolute bottom-[-68px] left-0 h-44 w-[240%] opacity-55" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070a14] via-[#070a14]/75 to-transparent" />
    </div>
  );
}

function TradingViewChart({ symbol }) {
  const containerRef = useRef(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !widgetRef.current) return;

    const resolvedSymbol = String(symbol || "").includes(":")
      ? String(symbol).toUpperCase()
      : `BITSTAMP:${String(symbol || "BTCUSD").toUpperCase()}`;

    widgetRef.current.innerHTML = "";
    containerRef.current.querySelectorAll("script[data-tv-widget='advanced-chart']").forEach((node) => node.remove());

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.dataset.tvWidget = "advanced-chart";
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    // Free TradingView Advanced Chart widget does not expose direct toolbar/timeframe selected-state color overrides.
    // Use the closest supported settings via `overrides`, `studies_overrides`, and widget-level palette options.
    script.text = JSON.stringify({
      autosize: true,
      symbol: resolvedSymbol,
      interval: "240",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: false,
      withdateranges: true,
      details: true,
      studies: [],
      hide_side_toolbar: false,
      hide_top_toolbar: false,
      save_image: true,
      calendar: false,
      toolbar_bg: "#0A0B16",
      watchlist: [
        "BITSTAMP:BTCUSD",
        "COINBASE:ETHUSD",
        "NASDAQ:AAPL",
        "NASDAQ:TSLA",
        "NASDAQ:NVDA",
        "TVC:GOLD",
        "SP:SPX",
      ],
      overrides: {
        "paneProperties.background": "#0A0B16",
        "paneProperties.vertGridProperties.color": "#1E2030",
        "paneProperties.horzGridProperties.color": "#1E2030",
        "paneProperties.crossHairProperties.color": "#B8B1FF",
        "paneProperties.crossHairProperties.style": 2,
        "scalesProperties.textColor": "#A8A9B8",
        "scalesProperties.lineColor": "#1E2030",
        "mainSeriesProperties.candleStyle.upColor": "#6D4AFF",
        "mainSeriesProperties.candleStyle.downColor": "#D9D6FF",
        "mainSeriesProperties.candleStyle.borderUpColor": "#6D4AFF",
        "mainSeriesProperties.candleStyle.borderDownColor": "#D9D6FF",
        "mainSeriesProperties.candleStyle.wickUpColor": "#6D4AFF",
        "mainSeriesProperties.candleStyle.wickDownColor": "#D9D6FF",
        "symbolWatermarkProperties.color": "#1E2030",
      },
      studies_overrides: {
        "volume.volume.color.0": "#D9D6FF",
        "volume.volume.color.1": "#6D4AFF",
      },
    });

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.querySelectorAll("script[data-tv-widget='advanced-chart']").forEach((node) => node.remove());
      }
      if (widgetRef.current) widgetRef.current.innerHTML = "";
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container w-full h-full">
      <div
        ref={containerRef}
        className="w-full h-full"
      >
        <div
          ref={widgetRef}
        className="tradingview-widget-container__widget w-full h-full"
        />
      </div>
    </div>
  );
}

function StockChart({ coins }) {
  const [selectedSymbol, setSelectedSymbol] = useState("BTCUSD");
  const selectedAsset = CHART_ASSETS.find((asset) => asset.label === selectedSymbol) || CHART_ASSETS[0];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-violet-200/20 bg-[#101323]/85 p-5 shadow-2xl shadow-violet-950/35 backdrop-blur-md">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.32em] text-slate-400">Asset Selector</p>
          <p className="mt-1 text-xs text-slate-500">Switch between crypto, stocks, and ETFs</p>
        </div>
        <label className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-slate-400">
          <span className="whitespace-nowrap">Asset</span>
          <select
            value={selectedSymbol}
            onChange={(event) => setSelectedSymbol(event.target.value)}
            className="min-w-[180px] rounded-xl border border-white/10 bg-[#070a14] px-3 py-2 font-mono text-xs font-black tracking-[0.18em] text-white outline-none transition focus:border-violet-200/40"
          >
            <optgroup label="Crypto">
              {CHART_ASSETS.filter((asset) => asset.group === "Crypto").map((asset) => (
                <option key={asset.label} value={asset.label}>
                  {asset.label}
                </option>
              ))}
            </optgroup>
            <optgroup label="Stocks">
              {CHART_ASSETS.filter((asset) => asset.group === "Stocks").map((asset) => (
                <option key={asset.label} value={asset.label}>
                  {asset.label}
                </option>
              ))}
            </optgroup>
            <optgroup label="ETFs">
              {CHART_ASSETS.filter((asset) => asset.group === "ETFs").map((asset) => (
                <option key={asset.label} value={asset.label}>
                  {asset.label}
                </option>
              ))}
            </optgroup>
          </select>
        </label>
      </div>

      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black text-slate-400">{selectedAsset.display}</span>
            <span className="rounded bg-violet-300/10 px-2 py-0.5 text-xs font-bold text-violet-200">INTERACTIVE</span>
          </div>
          <p className="mt-1 font-mono text-3xl font-black text-white">{formatPrice(selectedAsset.price)}</p>
        </div>
        <div className="text-right">
          <p className={selectedAsset.change >= 0 ? "font-mono text-xl font-black text-emerald-300" : "font-mono text-xl font-black text-rose-300"}>{selectedAsset.change >= 0 ? "+" : ""}{selectedAsset.change.toFixed(2)}%</p>
          <p className="text-xs text-slate-400">24h Performance</p>
        </div>
      </div>
      <div className="relative overflow-visible rounded-2xl border border-violet-200/20 bg-[#070a14] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-violet-200/25 bg-[#1A2340]/65 px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-violet-100">
          Momentum
        </div>
        <div className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-violet-200/25 bg-[#1A2340]/65 px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-violet-100">
          Trend
        </div>
        <div className="relative z-20 h-[500px] w-full sm:h-[560px] lg:h-[620px]">
          <TradingViewChart symbol={selectedAsset.tvSymbol} />
        </div>
      </div>

    </div>
  );
}

function ServicesSection({ coins }) {
  return (
    <section id="services" className="relative overflow-hidden bg-[#0b0f1d] px-5 pb-20 pt-12 text-white sm:pb-24 sm:pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#070a14] to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(168,85,247,0.14),transparent_34%),radial-gradient(circle_at_82%_64%,rgba(124,58,237,0.12),transparent_36%)]" />

      <div className="relative mx-auto w-full max-w-[94vw]">
        <div className="mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-4 py-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-xs font-bold text-[#C084FC]">Cash Alternatives · Crypto · Commodities · Companies</span>
          </div>

          <div className="space-y-4">
            <StockChart coins={coins} />
          </div>
        </div>

        <div className="max-w-[80vw]">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-[#C6B8FF]">Strategic Financial Guidance</p>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-[#F4F7FB] sm:text-4xl lg:text-5xl">
            Financial Consulting for Long-Term Wealth Planning
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#B7C0D8] sm:text-lg">
            Calo Capital serves individuals, families, and business owners with personalized financial guidance, market insights, and investment strategy. Our four pillars support financial planning, portfolio diversification, and a long-term wealth strategy across changing economic trends.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <article
              id={serviceIds[index]}
              key={service.title}
              className={`service-card group relative overflow-hidden rounded-[1.55rem] border border-white/10 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_14px_34px_-26px_rgba(5,8,22,0.95)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#C084FC]/50 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_20px_38px_-28px_rgba(168,85,247,0.55)] ${serviceTextures[index].panel}`}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_56%,rgba(8,12,24,0.04),rgba(5,8,22,0.18)_70%,rgba(5,8,22,0.28)_100%)]" />
              
              {/* Top gradient line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C084FC]/40 to-transparent group-hover:via-[#C084FC]/60 transition" />
              
              
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1">
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#B7C0D8] group-hover:text-[#C084FC] transition">Pillar {serviceMarks[index]}</p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black tracking-tight text-[#F4F7FB] group-hover:text-[#C084FC] transition" style={{ fontFamily: "var(--calo-serif)" }}>
                  {service.title}
                </h3>
                <div className="mt-3 h-px w-8 bg-gradient-to-r from-[#C084FC] to-transparent group-hover:w-full transition-all duration-500" />
                <p className="mt-4 text-sm leading-6 text-[#B7C0D8] group-hover:text-[#D8C8F0] transition">{service.description}</p>
              </div>

              {/* Features list */}
              <div className="mt-6 space-y-2">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#B7C0D8] group-hover:text-[#D8C8F0] transition">
                    <span className="h-1 w-1 rounded-full bg-[#C084FC]/60 group-hover:bg-[#C084FC] transition" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Bottom accent label */}
              <div className="mt-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#B7C0D8] group-hover:text-[#C084FC] transition">
                <span className="h-px flex-1 bg-gradient-to-r from-[#B7C0D8]/20 group-hover:from-[#C084FC]/30 to-transparent transition" />
                <span>{serviceTextures[index].accent}</span>
                <span className="h-px flex-1 bg-gradient-to-l from-[#B7C0D8]/20 group-hover:from-[#C084FC]/30 to-transparent transition" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="relative overflow-hidden bg-[#070a14] px-5 py-20 text-white">
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${hikerPng})` }} />
      <div className="relative mx-auto w-full max-w-[94vw]">
        <Logo />
        <p className="mt-10 text-sm font-black uppercase tracking-[0.3em] text-violet-200">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{description}</p>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <>
      <section id="about" className="relative overflow-hidden bg-gradient-to-b from-[#0b0f1d] via-[#090d19] to-[#070a14] px-5 pb-14 pt-16 text-white sm:pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(168,85,247,0.12),transparent_28%),radial-gradient(circle_at_85%_72%,rgba(99,102,241,0.08),transparent_26%)]" />
        <div className="relative mx-auto w-full max-w-[94vw]">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.42em] text-[#A855F7]">About Calo Capital</p>
              <h1 className="mt-6 max-w-xl text-[clamp(3.2rem,7vw,5.4rem)] font-serif font-semibold leading-[0.96] tracking-tight text-[#F4F7FB]">
                Personalized Financial Guidance.
                <br />
                Built Around <span className="text-[#A855F7]">Your Goals.</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-[#B7C0D8] sm:text-[1.02rem]">
                Calo Capital provides financial consulting and strategic advisory services for individuals, families, and business owners seeking clear direction in today&apos;s financial landscape.
              </p>
              <div className="mt-8 h-px w-12 bg-[#A855F7]" />
            </div>

            <div className="relative mx-auto w-full max-w-[460px] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#101323] shadow-[0_24px_60px_-30px_rgba(5,8,22,0.95)]">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1400&q=80"
                alt="Mountain peak above clouds"
                className="h-[330px] w-full object-cover sm:h-[365px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070a14]/32 via-transparent to-transparent" />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

function TeamPage() {
  const team = [
    {
      name: "Marc Calo",
      title: "CEO",
      bio: "Provides personalized financial guidance focused on investment strategy, market insights, and long-term financial planning.",
      image: caloJpg,
    },
  ];

  return (
    <>
      <section id="leadership" className="relative overflow-hidden bg-[#070a14] px-5 pb-16 pt-16 text-white sm:pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.1),transparent_26%),radial-gradient(circle_at_82%_70%,rgba(99,102,241,0.08),transparent_24%)]" />
        <div className="relative mx-auto w-full max-w-[94vw]">
          <p className="text-xs font-black uppercase tracking-[0.42em] text-[#A855F7]">Our Team</p>
          <h1 className="mt-6 max-w-4xl text-[clamp(3rem,6.6vw,5.25rem)] font-serif font-semibold leading-[0.96] tracking-tight text-[#F4F7FB]">
            Strategic. Transparent.
            <br />
            Aligned With <span className="text-[#A855F7]">Your Priorities.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#B7C0D8] sm:text-[1.02rem]">
            Calo Capital combines financial strategy, market insight, and personalized guidance to help clients navigate financial planning decisions across traditional and alternative investments.
          </p>

          <div className="mt-12 grid max-w-[94vw] gap-6 md:grid-cols-2 xl:grid-cols-3">
            {team.map((member) => (
              <article key={member.name} className="group overflow-hidden rounded-[1.05rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,19,33,0.95)_0%,rgba(8,11,19,0.98)_100%)] shadow-[0_18px_40px_-30px_rgba(5,8,22,0.95)] transition duration-300 hover:-translate-y-1 hover:border-[#A855F7]/30">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-[270px] w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070a14]/74 via-transparent to-transparent" />
                </div>

                <div className="p-5">
                  <h3 className="text-[1.02rem] font-medium text-[#F4F7FB]">{member.name}</h3>
                  <p className="mt-1 text-sm text-[#A855F7]">{member.title}</p>
                  <p className="mt-4 text-sm leading-6 text-[#B7C0D8]">{member.bio}</p>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open LinkedIn profile for ${member.name}`}
                    className="mt-6 inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#A855F7]/45 text-[0.72rem] font-semibold text-[#A855F7] transition hover:border-[#A855F7]/70 hover:bg-[#A855F7]/10 hover:text-white"
                  >
                    in
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function WhyPartnerSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const principles = [
    ["Transparent Communication", "Plain-language guidance"],
    ["Personalized Strategy", "Built around your goals"],
    ["Strategic Market Perspective", "Long-term thinking over speculation"],
    ["Integrity", "Honest conversations"],
    ["Client Relationships", "Partnership beyond the transaction"],
    ["Risk Awareness", "Disciplined decision making"],
  ];

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(reducedMotionQuery.matches);
    if (reducedMotionQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  function revealStyle(delayMs, translateY = 30) {
    if (reduceMotion) {
      return { opacity: 1, transform: "none" };
    }

    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : `translateY(${translateY}px)`,
      transition: `opacity 0.6s ease-out ${delayMs}ms, transform 0.6s ease-out ${delayMs}ms`,
    };
  }

  function fadeStyle(delayMs) {
    if (reduceMotion) {
      return { opacity: 1 };
    }

    return {
      opacity: isVisible ? 1 : 0,
      transition: `opacity 0.6s ease-out ${delayMs}ms`,
    };
  }

  return (
    <section ref={sectionRef} id="client-excellence" className="relative overflow-hidden bg-white px-5 py-24 text-[#111111] sm:py-28 lg:py-32">
      <div className="relative mx-auto w-full max-w-[94vw]">
        <div style={revealStyle(0, 24)}>
          <p className="text-xs font-black uppercase tracking-[0.4em] text-[#A855F7]" style={fadeStyle(0)}>
            WHY PARTNER WITH CALO CAPITAL
          </p>
          <div className="mt-3 h-px w-28 bg-[#A855F7]/70" />
        </div>

        <h2 className="mt-10 max-w-3xl text-[clamp(2.6rem,7vw,6.1rem)] font-black leading-[0.9] tracking-[-0.03em] text-[#111111]" style={revealStyle(150, 30)}>
          Markets move.
          <br />
          <span className="text-[#A855F7]">Sound strategy</span>
          <br />
          endures.
        </h2>

        <div className="mt-16 grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 xl:gap-20">
          <div style={revealStyle(300, 24)}>
            <h3 className="text-sm font-black uppercase tracking-[0.28em] text-[#1f2937]" style={fadeStyle(300)}>
              OUR PRINCIPLES
            </h3>
            <p className="mt-7 max-w-xl text-base leading-8 text-[#374151] sm:text-lg" style={fadeStyle(380)}>
              We believe thoughtful guidance, transparent communication, and disciplined market perspective create the foundation for lasting financial relationships.
            </p>
            <p className="mt-8 max-w-xl text-base leading-8 text-[#374151] sm:text-lg" style={fadeStyle(460)}>
              Every recommendation begins with understanding your goals, not chasing trends.
            </p>
            <p className="mt-10 text-[15px] font-serif text-[#A855F7]" style={fadeStyle(520)}>
              Our Mission
            </p>
            <p className="mt-4 max-w-xl text-base leading-8 text-[#374151] sm:text-lg" style={fadeStyle(600)}>
              Our mission is to help clients make informed financial decisions through strategic guidance, personalized planning, and transparent communication across every stage of wealth planning.
            </p>
            <p className="mt-8 text-[15px] font-serif text-[#A855F7]" style={fadeStyle(680)}>
              Our Vision
            </p>
            <p className="mt-4 max-w-xl text-base leading-8 text-[#374151] sm:text-lg" style={fadeStyle(760)}>
              Our vision is to build long-term trusted relationships while helping clients pursue financial confidence through thoughtful planning, personalized financial guidance, and consistent market insight.
            </p>
          </div>

          <div className="border-t border-[#e5e7eb]">
            {principles.map(([title, detail], index) => (
              <div
                key={title}
                className="why-principle-row border-b border-[#e5e7eb] py-5 sm:py-6"
                style={revealStyle(450 + index * 100, 20)}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                  <p className="why-principle-label text-base font-semibold text-[#111111] sm:text-[1.04rem]" style={fadeStyle(500 + index * 100)}>
                    {title}
                  </p>
                  <p className="text-sm font-medium text-[#4b5563] sm:text-right sm:text-[0.96rem]" style={fadeStyle(560 + index * 100)}>
                    {detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage({ coins, live, setPage }) {
  return (
    <>
      <HeroSection />
      <AboutPage />
      <WhyPartnerSection />
      <ServicesSection coins={coins} setPage={setPage} />
      <TeamPage />
      
      {/* CONTACT SECTION */}
      <section id="contact" className="relative overflow-hidden bg-[#070a14] px-5 py-32 text-white sm:py-44">
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:92px_92px]" />
        </div>
        
        <div className="relative mx-auto w-full max-w-[94vw]">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-violet-300">Let's Connect</p>
          <div className="mt-8">
            <h1 className="text-6xl font-black tracking-tight leading-[1.1] sm:text-7xl lg:text-8xl">
              Ready to Build
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-violet-300">Your Financial Strategy?</span>
            </h1>
          </div>
          <p className="mt-10 max-w-2xl text-lg leading-8 text-slate-300">
            Schedule a personalized consultation to explore financial solutions, investment opportunities, and a long-term wealth strategy tailored to your goals.
          </p>
        </div>

        <div className="relative mx-auto mt-24 w-full max-w-[94vw] sm:mt-28">
          {/* BOOKING CTA - PROMINENT */}
          <div className="mb-24 rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-purple-500/5 p-8 sm:p-12 backdrop-blur-sm">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-300">Schedule Your Consultation</p>
            <h2 className="mt-4 text-4xl font-black sm:text-5xl">Build Your Strategy with Marc Calo</h2>
            <p className="mt-5 max-w-2xl text-lg text-slate-300">
              Use your consultation to review your financial strategy, discuss market insights, and plan next steps for retirement planning, business financial planning, and long-term wealth decisions.
            </p>
            <a
              href={SCHEDULE_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Google Calendar booking page in a new tab"
              className="mt-8 inline-block rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 px-8 py-4 text-base font-black text-white transition hover:shadow-lg hover:shadow-violet-500/50 hover:scale-105"
            >
              Open Calendar & Schedule Now →
            </a>
          </div>

          <div className="grid gap-12">
            <div>
              <h3 className="text-2xl font-black mb-8">Other Ways to Connect</h3>
              
              {/* EMAIL */}
              <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition hover:border-violet-500/30 hover:bg-white/[0.04]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20 text-xl">✉</div>
                <h4 className="font-black text-lg">Email Us</h4>
                <p className="mt-2 text-slate-300">Send us your questions about financial planning and strategy</p>
                <a href="mailto:protection@calocapital.io" className="mt-4 inline-block text-violet-400 font-bold hover:text-violet-300 transition">
                  protection@calocapital.io →
                </a>
              </div>

              {/* SOCIAL LINKS */}
              <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
                <h4 className="font-black text-lg mb-5">Follow Our Insights</h4>
                <p className="text-sm text-slate-400 mb-5">Stay informed on market insights, economic trends, and investment strategy</p>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((item) => (
                    <SocialLink key={item.label} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Footer() {
  const serviceLinks = [
    { label: "Cash Alternatives", href: "#cash-alternatives" },
    { label: "Crypto", href: "#crypto" },
    { label: "Commodities", href: "#commodities" },
    { label: "Companies", href: "#companies" },
  ];
  const companyLinks = [
    { label: "Our Philosophy", href: "#about" },
    { label: "Leadership", href: "#leadership" },
    { label: "Client Excellence", href: "#client-excellence" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#070a14] px-5 py-12 text-white">
      <div className="mx-auto grid w-full max-w-[94vw] gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-lg font-black tracking-wide text-white">Calo Capital</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
            Calo Capital provides financial consulting and strategic advisory services for individuals, families, and business owners seeking personalized financial guidance and long-term planning.
          </p>
        </div>
        <div>
          <p className="mb-4 font-black">Services</p>
          <div className="space-y-2">
            {serviceLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                onClick={(e) => {
                  if (link.href.startsWith("#")) {
                    e.preventDefault();
                    const sectionId = link.href.replace("#", "");
                    const element = document.getElementById(sectionId);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }
                }}
                className="block text-sm text-slate-400 hover:text-white cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-4 font-black">Company</p>
          <div className="space-y-2">
            {companyLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                onClick={(e) => {
                  if (link.href.startsWith("#")) {
                    e.preventDefault();
                    const sectionId = link.href.replace("#", "");
                    const element = document.getElementById(sectionId);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }
                }}
                className="block text-sm text-slate-400 hover:text-white cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 w-full max-w-[94vw] border-t border-white/10 pt-6 text-[11px] leading-5 text-slate-500">
        Investing involves risk, including the possible loss of principal. Past performance does not guarantee future results. Asset allocation, diversification, and portfolio strategies do not guarantee profits or protect against losses in declining markets.

        The information provided by Calo Capital is for general informational purposes only and should not be construed as investment, legal, tax, accounting, or financial advice. Visitors should consult qualified professionals before making any financial decisions.

        This material does not take into account an individual's specific investment objectives, financial situation, risk tolerance, or needs and is not intended as a recommendation, offer, or solicitation to buy or sell any security, investment product, or strategy.

        Calo Capital is not currently a registered investment advisor, broker-dealer, or fiduciary. Nothing contained on this website, in presentations, webinars, reports, or communications should be interpreted as personalized investment advice or a guarantee of future performance.

        Any references to digital assets, commodities, cash alternatives, businesses, or market opportunities are provided for general informational discussion only. All investments and financial decisions carry risk, and individuals are solely responsible for evaluating whether any strategy is appropriate for their circumstances.

        Calo Capital may discuss third-party products, platforms, or service providers. Such references do not constitute an endorsement or guarantee of results. Users should perform their own due diligence before engaging with any third-party provider.

        By using this website, you acknowledge that you are responsible for your own financial decisions and agree that Calo Capital shall not be held liable for any losses arising from reliance on information presented through this website or related materials.
      </div>
      <div className="mx-auto mt-6 flex w-full max-w-[94vw] flex-wrap gap-3">
        {/* Footer social links intentionally removed per request */}
      </div>
    </footer>
  );
}

function GlobalStyles() {
  return (
    <style>{`
      html { scroll-behavior: smooth; }
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes cardAuroraDrift {
        0% { transform: translate3d(-4px, -2px, 0) scale(1); opacity: 0.24; }
        50% { transform: translate3d(7px, 4px, 0) scale(1.03); opacity: 0.34; }
        100% { transform: translate3d(-4px, -2px, 0) scale(1); opacity: 0.24; }
        100% { transform: translateX(-55%); }
      @keyframes serviceIconFloat {
        0% { transform: translate3d(0, 12px, 0) scale(0.96) rotate(-1deg); opacity: 0; }
        15% { opacity: 0.1; }
        50% { transform: translate3d(6px, -4px, 0) scale(1.03) rotate(1deg); opacity: 0.16; }
        85% { opacity: 0.08; }
        100% { transform: translate3d(-2px, -14px, 0) scale(0.98) rotate(0deg); opacity: 0; }
      }
      .service-card-aurora {
      .cloud-layer {
          radial-gradient(circle at 18% 18%, rgba(155,124,255,0.2) 0 18%, transparent 38%),
          radial-gradient(circle at 82% 72%, rgba(124,58,237,0.16) 0 16%, transparent 34%),
          linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(67,56,202,0.04) 34%, transparent 64%);
          radial-gradient(circle at 15% 60%, rgba(255,255,255,.42) 0 55px, transparent 56px),
        animation: cardAuroraDrift 18s ease-in-out infinite;
        0% { transform: translate3d(0, 0, 0); opacity: 0.18; }
        50% { transform: translate3d(-10px, 6px, 0); opacity: 0.28; }
        100% { transform: translate3d(0, 0, 0); opacity: 0.18; }
      }
        box-shadow: 0 0 0 1px rgba(192,132,252,0.12), 0 0 22px rgba(124,58,237,0.12);
        0% { transform: translateX(-9px); opacity: 0.12; }
        50% { transform: translateX(9px); opacity: 0.2; }
        100% { transform: translateX(-9px); opacity: 0.12; }
      }
      .service-card-nebula {
        background:
          radial-gradient(circle at 18% 18%, rgba(155,124,255,0.24) 0 22%, transparent 46%),
          radial-gradient(circle at 84% 76%, rgba(109,94,245,0.2) 0 18%, transparent 44%);
        mix-blend-mode: screen;
        animation: cardNebulaDrift 18s ease-in-out infinite;
      }
      .service-card-dust {
        background:
          radial-gradient(circle at 16% 64%, rgba(198,184,255,0.32) 0 1px, transparent 2px),
          radial-gradient(circle at 38% 22%, rgba(183,192,216,0.26) 0 1px, transparent 2px),
          radial-gradient(circle at 64% 58%, rgba(198,184,255,0.26) 0 1px, transparent 2px),
          radial-gradient(circle at 82% 30%, rgba(183,192,216,0.24) 0 1px, transparent 2px),
          radial-gradient(circle at 74% 82%, rgba(198,184,255,0.24) 0 1px, transparent 2px);
        background-size: 100% 100%;
        animation: cardDustDrift 16s ease-in-out infinite;
      }
      .service-card-shimmer {
        background:
          radial-gradient(circle at 50% 50%, rgba(198,184,255,0.05), transparent 40%),
          linear-gradient(122deg, transparent 0%, transparent 46%, rgba(168,85,247,0.09) 50%, transparent 54%, transparent 100%);
        animation: cardGridShimmer 20s ease-in-out infinite;
      }
      @keyframes serviceIconFloat {
        0% { transform: translate3d(0, 12px, 0) scale(0.94) rotate(-1deg); opacity: 0.03; }
        15% { opacity: 0.04; }
        50% { transform: translate3d(6px, -4px, 0) scale(0.98) rotate(1deg); opacity: 0.08; }
        85% { opacity: 0.05; }
        100% { transform: translate3d(-2px, -14px, 0) scale(0.95) rotate(0deg); opacity: 0.03; }
      }
      @keyframes shootingStarHorizontal {
        0% { left: -200px; opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { left: 1200px; opacity: 0; }
      }
      @keyframes shootingStarDiagonal {
        0% { left: -200px; opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { left: 1200px; opacity: 0; }
      }
      @keyframes diagonalShootingStarAnimation {
        0% {
          transform: translate(0, 0) rotate(var(--angle)) scaleX(var(--scale));
          opacity: 0;
          box-shadow: 0 0 20px 8px rgba(255, 255, 255, 0.9), 0 0 40px 16px rgba(103, 232, 249, 0.6);
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translate(1500px, 1500px) rotate(var(--angle)) scaleX(var(--scale));
          opacity: 0;
          box-shadow: 0 0 20px 8px rgba(255, 255, 255, 0.4), 0 0 40px 16px rgba(103, 232, 249, 0.2);
        }
      }
      .shooting-star {
        animation: shootingStarHorizontal 3s linear infinite;
      }
      .shooting-star-diagonal {
        animation: shootingStarDiagonal 3.5s linear infinite;
      }
      .diagonal-shooting-star {
        animation: diagonalShootingStarAnimation 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
      }
      .constellation-stars {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: 20;
      }

      .star-line {
        position: absolute;
        width: 260px;
        height: 1px;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(175, 235, 255, 0.9),
          rgba(190, 140, 255, 0.8),
          transparent
        );
        box-shadow:
          0 0 8px rgba(175, 235, 255, 0.9),
          0 0 18px rgba(160, 90, 255, 0.55);
        opacity: 0;
        transform: rotate(var(--angle, 25deg));
        animation: constellationDrift 9s linear infinite;
      }

      .star-line::before,
      .star-line::after {
        content: "";
        position: absolute;
        top: 50%;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: white;
        transform: translateY(-50%);
        box-shadow:
          0 0 10px white,
          0 0 22px rgba(160, 220, 255, 0.9),
          0 0 34px rgba(160, 90, 255, 0.7);
      }

      .star-line::before {
        left: 0;
      }

      .star-line::after {
        right: 0;
      }

      .star-line:nth-child(1) {
        top: 28%;
        left: -18%;
        animation-delay: 0s;
        animation-duration: 11s;
      }

      .star-line:nth-child(2) {
        top: 48%;
        left: -25%;
        animation-delay: 2s;
        animation-duration: 13s;
        --angle: 18deg;
      }

      .star-line:nth-child(3) {
        top: 66%;
        left: -20%;
        animation-delay: 4s;
        animation-duration: 12s;
        --angle: -12deg;
      }

      .star-line:nth-child(4) {
        top: 36%;
        left: 110%;
        animation-delay: 3s;
        animation-duration: 14s;
        --angle: 205deg;
      }

      .star-line:nth-child(5) {
        top: 76%;
        left: 105%;
        animation-delay: 6s;
        animation-duration: 12s;
        --angle: 190deg;
      }

      @keyframes constellationDrift {
        0% {
          opacity: 0;
          transform: translateX(0) translateY(0) rotate(var(--angle, 25deg));
        }

        12% {
          opacity: 1;
        }

        65% {
          opacity: 1;
        }

        100% {
          opacity: 0;
          transform: translateX(135vw) translateY(120px) rotate(var(--angle, 25deg));
        }
      }

      .why-reveal,
      .why-reveal-row {
        opacity: 0;
        transition-property: opacity, transform;
        transition-duration: 0.6s;
        transition-timing-function: ease-out;
      }

      .why-text-fade {
        opacity: 0;
        transition: opacity 0.6s ease-out;
      }

      .why-text-fade.is-visible {
        opacity: 1;
      }

      .why-reveal {
        transform: translateY(30px);
      }

      .why-reveal-row {
        transform: translateY(20px);
      }

      .why-reveal.is-visible,
      .why-reveal-row.is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      .why-principle-label {
        display: inline-block;
        position: relative;
        transition: padding-left 0.24s ease;
      }

      .why-principle-label::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 0;
        height: 1px;
        background: #A855F7;
        transition: width 0.24s ease;
      }

      .why-principle-row:hover .why-principle-label {
        padding-left: 6px;
      }

      .why-principle-row:hover .why-principle-label::after {
        width: 100%;
      }

      @media (prefers-reduced-motion: reduce) {
        .why-reveal,
        .why-reveal-row,
        .why-text-fade,
        .why-principle-label,
        .why-principle-label::after {
          transition: none !important;
          animation: none !important;
        }

        .why-reveal,
        .why-reveal-row,
        .why-text-fade {
          opacity: 1 !important;
          transform: none !important;
        }
      }

      /* security-css: prevent image saving and dragging */
      img {
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        pointer-events: none;
        -webkit-user-drag: none;
        -webkit-touch-callout: none;
      }
      img.interactive {
        pointer-events: auto;
      }
      body {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
      }
      /* service-card-icon styles removed to hide decorative glyphs */
    `}</style>
  );
}

export default function App() {
  const { coins, live } = useMarketData();
  const [currentPage, setCurrentPage] = useState(getPageFromHash());

  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash || "#/";
      setCurrentPage(getPageFromHash());

      const anchorId = hash.startsWith("#/") ? "" : hash.slice(1);
      requestAnimationFrame(() => {
        if (anchorId) {
          const target = document.getElementById(anchorId);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
          }
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  function setPage(page) {
    if (page === "About" || page === "Team" || page === "Contact") {
      setCurrentPage("Home");
      window.location.hash = pageRoutes[page];
      return;
    }

    setCurrentPage(page);
    window.location.hash = pageRoutes[page];
  }

  return (
    <main className="min-h-screen bg-[#070a14] font-sans">
      <GlobalStyles />
      <MarketTicker coins={coins} live={live} />
      <Navbar currentPage={currentPage} setPage={setPage} />
      {currentPage === "Home" && <HomePage coins={coins} live={live} setPage={setPage} />}
      {currentPage === "Team" && <TeamPage />}
      <Footer />
    </main>
  );
}
