import React, { useEffect, useMemo, useRef, useState } from "react";
import logoPng from "../public/Calo_purple_logo.png";
import hikerPng from "../assets/calo.jpg";
import heroVideoMp4 from "../assets/Calo-finances-hero.mp4";
import aboutImagePng from "../assets/p.png";
import whyPartnerBgPng from "../assets/m.png";
import cryptoWheelPng from "../assets/Crypto-Calo-capital-purple-animation.png";

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
      <div className="mx-auto flex w-full max-w-[min(94vw,1400px)] items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-[0.16em] sm:gap-4 sm:px-5 sm:text-xs sm:tracking-[0.18em]">
        <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-1 text-emerald-200">
          {live ? "Live" : "Fallback"}
        </span>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="ticker-track flex w-max items-center gap-3 whitespace-nowrap sm:gap-6">
            {items.map((item, index) => (
              <div key={`${item.symbol}-${index}`} className="flex items-center gap-2 whitespace-nowrap text-slate-200">
                <span className="text-slate-400">{item.symbol}</span>
                <span className="font-body text-white">{formatPrice(item.price)}</span>
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

function Logo({ logoSizeClass = "h-12 sm:h-16", textSizeClass = "text-base sm:text-lg", taglineClass = "text-[10px] uppercase tracking-[0.25em] text-violet-200/70 sm:text-xs" }) {
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
    <section className="relative min-h-[70svh] overflow-hidden bg-[#070a14] text-white sm:min-h-[80svh] lg:min-h-[90svh]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={heroVideoMp4}
        autoPlay
        muted
        loop
        playsInline
      />
    </section>
  );
}

const pageRoutes = {
  Home: "#/",
  About: "#about",
  Contact: "#contact",
};

function getPageFromHash() {
  const hash = window.location.hash || "#/";
  if (hash === "#/about" || hash === "#about" || hash === "#client-excellence") return "Home";
  if (hash === "#/contact" || hash === "#contact") return "Home";
  return "Home";
}

function Navbar({ currentPage, setPage }) {
  const [open, setOpen] = useState(false);
  const links = ["Home", "About", "Contact"];

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
      <div className="mx-auto flex w-full max-w-[min(94vw,1400px)] items-center justify-between px-4 py-4 sm:px-5">
        <button onClick={() => goTo("Home")} aria-label="Calo Capital home" className="text-left">
          <Logo />
        </button>

        <nav className="hidden flex-1 items-center justify-center gap-6 px-4 lg:flex lg:max-w-4xl xl:max-w-5xl xl:gap-12 xl:px-16">
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
    <div className="relative overflow-hidden rounded-3xl border border-violet-200/20 bg-[#101323]/85 p-4 shadow-2xl shadow-violet-950/35 backdrop-blur-md sm:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.32em] text-slate-400">Asset Selector</p>
          <p className="mt-1 text-xs text-slate-500">Switch between crypto, stocks, and ETFs</p>
        </div>
        <label className="flex flex-col gap-2 text-xs font-black uppercase tracking-[0.28em] text-slate-400 sm:flex-row sm:items-center sm:gap-3">
          <span className="whitespace-nowrap">Asset</span>
          <select
            value={selectedSymbol}
            onChange={(event) => setSelectedSymbol(event.target.value)}
            className="w-full min-w-0 rounded-xl border border-white/10 bg-[#070a14] px-3 py-2 font-body text-xs font-black tracking-[0.18em] text-white outline-none transition focus:border-violet-200/40 sm:min-w-[180px] sm:w-auto"
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

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-body text-xs font-black text-slate-400">{selectedAsset.display}</span>
            <span className="rounded bg-violet-300/10 px-2 py-0.5 text-xs font-bold text-violet-200">INTERACTIVE</span>
          </div>
          <p className="mt-1 font-body text-2xl font-black text-white sm:text-3xl">{formatPrice(selectedAsset.price)}</p>
        </div>
        <div className="text-left sm:text-right">
          <p className={selectedAsset.change >= 0 ? "font-body text-lg font-black text-emerald-300 sm:text-xl" : "font-body text-lg font-black text-rose-300 sm:text-xl"}>{selectedAsset.change >= 0 ? "+" : ""}{selectedAsset.change.toFixed(2)}%</p>
          <p className="text-xs text-slate-400">24h Performance</p>
        </div>
      </div>
      <div className="relative overflow-visible rounded-2xl border border-violet-200/20 bg-[#070a14] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-violet-200/25 bg-[#1A2340]/65 px-2 py-0.5 font-body text-[10px] font-black uppercase tracking-[0.16em] text-violet-100">
          Momentum
        </div>
        <div className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-violet-200/25 bg-[#1A2340]/65 px-2 py-0.5 font-body text-[10px] font-black uppercase tracking-[0.16em] text-violet-100">
          Trend
        </div>
        <div className="relative z-20 h-[320px] w-full sm:h-[420px] lg:h-[500px]">
          <TradingViewChart symbol={selectedAsset.tvSymbol} />
        </div>
      </div>

    </div>
  );
}

function ServicesSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

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

  function revealStyle(delayMs) {
    if (reduceMotion) {
      return { opacity: 1, transform: "none" };
    }

    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 620ms ease-out ${delayMs}ms, transform 620ms ease-out ${delayMs}ms`,
    };
  }

  function dividerStyle(delayMs) {
    if (reduceMotion) {
      return { opacity: 1, transform: "scaleX(1)" };
    }

    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "scaleX(1)" : "scaleX(0)",
      transformOrigin: "left center",
      transition: `opacity 520ms ease-out ${delayMs}ms, transform 520ms ease-out ${delayMs}ms`,
    };
  }

  return (
    <section ref={sectionRef} id="services" className="cc-guidance-section px-5 pb-20 pt-12 text-white sm:pb-24 sm:pt-16">
      <style>{`
        .cc-guidance-section {
          background-color: #050914;
        }
        .cc-guidance-inner {
          margin: 0 auto;
          width: 100%;
          max-width: 94vw;
        }
        .cc-guidance-intro {
          width: 100%;
          max-width: min(68%, 980px);
        }
        .cc-guidance-eyebrow {
          color: #a855f7;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .cc-guidance-eyebrow-line {
          margin-top: 0.7rem;
          height: 1px;
          width: 70px;
          background: #a855f7;
        }
        .cc-guidance-title {
          margin-top: 1.6rem;
          color: #f4f4f6;
          font-family: var(--font-display);
          font-size: clamp(2.05rem, 5.6vw, 4.2rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.08;
          text-wrap: balance;
        }
        .cc-guidance-title-accent {
          color: #a855f7;
        }
        .cc-guidance-body {
          margin-top: 1.7rem;
          max-width: 48rem;
          color: #b7c0d8;
          font-size: clamp(1rem, 1.4vw, 1.125rem);
          line-height: 1.68;
        }
        .cc-guidance-divider {
          margin-top: 2.6rem;
          border-top: 1px solid #323746;
        }
        .cc-guidance-grid {
          margin-top: 2.25rem;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0;
        }
        .cc-guidance-col {
          padding: 0 1.35rem;
        }
        .cc-guidance-col + .cc-guidance-col {
          border-left: 1px solid #323746;
        }
        .cc-guidance-col-title {
          color: #f4f4f6;
          font-family: var(--font-display);
          font-size: clamp(1.65rem, 2.2vw, 2.15rem);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .cc-guidance-col-line {
          margin-top: 0.8rem;
          height: 1px;
          width: 40px;
          background: #a855f7;
        }
        .cc-guidance-col-body {
          margin-top: 1rem;
          color: #b7c0d8;
          font-size: 0.98rem;
          line-height: 1.75;
        }
        .cc-guidance-list {
          margin-top: 1rem;
          padding-left: 1.1rem;
          color: #b7c0d8;
          font-size: 0.9rem;
          line-height: 1.78;
        }
        .cc-guidance-list li::marker {
          color: #a855f7;
        }

        @media (max-width: 1279px) {
          .cc-guidance-intro {
            max-width: 80%;
          }
          .cc-guidance-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .cc-guidance-col {
            padding: 1.35rem 1.1rem;
          }
          .cc-guidance-col + .cc-guidance-col {
            border-left: none;
          }
          .cc-guidance-col:nth-child(2n) {
            border-left: 1px solid #323746;
          }
          .cc-guidance-col:nth-child(n + 3) {
            border-top: 1px solid #323746;
          }
        }

        @media (max-width: 767px) {
          .cc-guidance-intro {
            max-width: 100%;
          }
          .cc-guidance-title {
            font-size: clamp(1.85rem, 9.2vw, 2.65rem);
            line-height: 1.1;
          }
          .cc-guidance-body {
            margin-top: 1.45rem;
            line-height: 1.65;
          }
          .cc-guidance-divider {
            margin-top: 2.1rem;
          }
          .cc-guidance-grid {
            margin-top: 1.8rem;
          }
          .cc-guidance-grid {
            grid-template-columns: 1fr;
          }
          .cc-guidance-col {
            padding: 1.15rem 0;
          }
          .cc-guidance-col:nth-child(2n),
          .cc-guidance-col + .cc-guidance-col {
            border-left: none;
          }
          .cc-guidance-col + .cc-guidance-col {
            border-top: 1px solid #323746;
          }
          .cc-guidance-col:nth-child(n + 3) {
            border-top: 1px solid #323746;
          }
        }
      `}</style>

      <div className="cc-guidance-inner">
        <div className="cc-guidance-intro">
          <p className="cc-guidance-eyebrow" style={revealStyle(0)}>Strategic Financial Guidance</p>
          <div className="cc-guidance-eyebrow-line" style={revealStyle(70)} />

          <h2 className="cc-guidance-title" style={revealStyle(140)}>
            Financial Consulting for
            <br />
            Long-Term Wealth <span className="cc-guidance-title-accent">Planning</span>
          </h2>

          <p className="cc-guidance-body" style={revealStyle(230)}>
            Calo Capital serves individuals, families, and business owners with personalized financial guidance, market insights, and investment strategy. Our four pillars support financial planning, portfolio diversification, and a long-term wealth strategy across changing economic trends.
          </p>
        </div>

        <div className="cc-guidance-divider" style={dividerStyle(320)} />

        <div className="cc-guidance-grid">
          {services.map((service, index) => (
            <article id={serviceIds[index]} key={service.title} className="cc-guidance-col" style={revealStyle(390 + index * 90)}>
              <h3 className="cc-guidance-col-title">{service.title}</h3>
              <div className="cc-guidance-col-line" />
              <p className="cc-guidance-col-body">{service.description}</p>
              <ul className="cc-guidance-list">
                {service.features.map((feature) => (
                  <li key={`${service.title}-${feature}`}>{feature}</li>
                ))}
              </ul>
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
  const sectionRef = useRef(null);
  const [hasJs, setHasJs] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const headingWords = [
    { text: "Personalized", accent: false },
    { text: "Financial", accent: false },
    { text: "Guidance.", accent: false },
    { text: "Built", accent: true },
    { text: "Around", accent: true },
    { text: "Your", accent: true },
    { text: "Goals.", accent: true },
  ];
  const paragraphWords = [
    "Calo",
    "Capital",
    "provides",
    "financial",
    "consulting",
    "and",
    "strategic",
    "advisory",
    "services",
    "for",
    "individuals,",
    "families,",
    "and",
    "business",
    "owners",
    "seeking",
    "clear",
    "direction",
    "in",
    "today's",
    "financial",
    "landscape.",
  ];

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const root = document.documentElement;
    if (!root.classList.contains("cc-about-js")) {
      root.classList.add("cc-about-js");
    }

    setHasJs(true);

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motionReduced = reducedMotionQuery.matches;
    setReduceMotion(motionReduced);

    if (motionReduced) {
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
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="about"
        className={`cc-about-section relative overflow-hidden px-5 pb-14 pt-16 text-white sm:pt-20 ${hasJs ? "cc-about-js" : ""} ${isVisible ? "cc-about-animated" : ""} ${reduceMotion ? "cc-about-reduced-motion" : ""}`}
      >
        <style>{`
          .cc-about-section {
            position: relative;
            overflow: hidden;
            isolation: isolate;
            background: #2b0d3f;
          }
          .cc-about-background {
            position: absolute;
            inset: 0;
            z-index: -1;
            background-image: url(${aboutImagePng});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }
          .cc-about-crypto-art {
            position: absolute;
            inset: 0;
            z-index: 1;
            pointer-events: none;
            overflow: hidden;
          }
          .cc-about-crypto-art-inner {
            position: absolute;
            top: 50%;
            right: -27vw;
            width: min(92vw, 1120px);
            transform: translateY(-50%);
            transform-origin: center center;
            will-change: transform, opacity, filter;
          }
          .cc-about-crypto-wheel {
            display: block;
            width: 100%;
            height: auto;
            transform-origin: center center;
            will-change: transform;
          }
          .cc-about-inner {
            position: relative;
            z-index: 2;
            width: min(100%, 1400px);
            margin-inline: auto;
            padding-inline: clamp(1.25rem, 5vw, 5rem);
          }
          .cc-about-copy {
            width: min(65%, 56rem);
            max-width: 56rem;
          }
          .cc-about-eyebrow {
            display: inline-block;
            transition-property: opacity, transform, filter;
            transition-duration: 760ms;
            transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          }
          .cc-about-heading {
            max-width: 13ch;
            font-family: var(--font-display);
            font-size: clamp(3rem, 6vw, 6.5rem);
            font-weight: 700;
            line-height: 1.01;
            letter-spacing: -0.03em;
            overflow-wrap: normal;
            word-break: normal;
            text-wrap: pretty;
          }
          .cc-about-heading-word {
            display: inline-block;
            margin-right: 0.3em;
            will-change: transform, opacity, filter, letter-spacing;
            transition-property: opacity, transform, filter, letter-spacing;
            transition-duration: 920ms;
            transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          }
          .cc-about-heading-word:last-child {
            margin-right: 0;
          }
          .cc-about-paragraph {
            display: block;
            max-width: 700px;
            transition-property: opacity, transform, filter;
            transition-duration: 900ms;
            transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          }
          .cc-about-underline {
            display: block;
            transform-origin: left;
            transition-property: transform;
            transition-duration: 900ms;
            transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          }
          .cc-about-js .cc-about-animate {
            opacity: 0;
          }
          .cc-about-js .cc-about-eyebrow {
            transform: translateY(10px);
            filter: blur(3px);
          }
          .cc-about-js .cc-about-heading-word {
            transform: translateY(18px) scale(0.985);
            filter: blur(5px);
            letter-spacing: 0.025em;
          }
          .cc-about-js .cc-about-paragraph {
            transform: translateY(16px);
            filter: blur(3px);
          }
          .cc-about-js .cc-about-underline {
            transform: scaleX(0);
          }
          .cc-about-js .cc-about-crypto-art-inner {
            opacity: 0;
            transform: translateY(-50%) translateX(32px) scale(0.985);
            filter: blur(6px);
            transition: opacity 960ms ease-out 620ms, transform 960ms ease-out 620ms, filter 960ms ease-out 620ms;
          }
          .cc-about-animated .cc-about-crypto-art-inner,
          .cc-about-reduced-motion .cc-about-crypto-art-inner {
            opacity: 1;
            transform: translateY(-50%) translateX(0) scale(1);
            filter: blur(0);
          }
          .cc-about-animated .cc-about-crypto-wheel {
            animation: ccAboutCryptoWheelSpin 26s linear infinite;
          }
          .cc-about-reduced-motion .cc-about-crypto-wheel {
            animation: none;
          }
          .cc-about-animated .cc-about-animate,
          .cc-about-reduced-motion .cc-about-animate {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
            letter-spacing: 0;
          }
          .cc-about-animated .cc-about-underline,
          .cc-about-reduced-motion .cc-about-underline {
            transform: scaleX(1);
          }
          @media (min-width: 1024px) {
            .cc-about-copy {
              width: min(65%, 56rem);
            }
          }
          @media (max-width: 1023px) {
            .cc-about-copy {
              width: min(80%, 48rem);
            }
          }
          @media (max-width: 767px) {
            .cc-about-inner {
              padding-inline: 1.25rem;
            }
            .cc-about-copy {
              width: 100%;
              max-width: 100%;
            }
            .cc-about-crypto-art-inner {
              right: -28vw;
              width: min(128vw, 820px);
            }
            .cc-about-heading {
              max-width: 14ch;
              font-size: clamp(2.6rem, 10vw, 4.1rem);
              line-height: 1.03;
            }
            .cc-about-heading-word {
              margin-right: 0.22em;
            }
            .cc-about-paragraph-word {
              margin-right: 0.18em;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .cc-about-eyebrow,
            .cc-about-heading-word,
            .cc-about-paragraph-word {
              opacity: 1 !important;
              transform: none !important;
              filter: none !important;
              letter-spacing: 0 !important;
              transition: none !important;
            }
            .cc-about-crypto-art-inner {
              opacity: 1 !important;
              transform: translateY(-50%) !important;
              filter: none !important;
              transition: none !important;
            }
            .cc-about-crypto-wheel {
              animation: none !important;
            }
          }
          @keyframes ccAboutCryptoWheelSpin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>

        <div className="cc-about-background" aria-hidden="true" />
        <div className="cc-about-crypto-art" aria-hidden="true">
          <div className="cc-about-crypto-art-inner">
            <img src={cryptoWheelPng} alt="" className="cc-about-crypto-wheel" />
          </div>
        </div>
        <div className="cc-about-inner relative">
          <div className="cc-about-copy">
            <p className="cc-about-eyebrow cc-about-animate text-xs font-black uppercase tracking-[0.42em] text-[#A855F7]" style={reduceMotion ? undefined : { transitionDelay: "0ms" }}>
              About Calo Capital
            </p>
            <h1 className="cc-about-heading mt-6 text-[#F4F7FB]" data-cc-about-split="true">
              {headingWords.map((word, index) => {
                const label = word.text;
                const isAccent = word.accent;

                return (
                  <span
                    key={`${label}-${index}`}
                    className={`cc-about-heading-word cc-about-animate${isAccent ? " text-[#A855F7]" : ""}`}
                    style={
                      reduceMotion
                        ? undefined
                        : {
                            transitionDelay: `${260 + index * 95}ms`,
                          }
                    }
                  >
                    {label}
                  </span>
                );
              })}
            </h1>
            <p className="cc-about-paragraph cc-about-animate mt-6 text-base leading-7 text-[#B7C0D8] sm:text-[1.02rem]" style={reduceMotion ? undefined : { transitionDelay: "1180ms" }}>
              {paragraphWords.join(" ")}
            </p>
            <div className="cc-about-underline cc-about-animate mt-8 h-px w-12 bg-[#A855F7]" style={reduceMotion ? undefined : { transitionDelay: "1550ms" }} />
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
    <section
      ref={sectionRef}
      id="client-excellence"
      className="relative overflow-hidden bg-[#070a14] px-5 py-24 text-white sm:py-28 lg:py-32"
      style={{ backgroundImage: `url(${whyPartnerBgPng})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
    >
      <div className="relative mx-auto w-full max-w-[94vw]">
        <div style={revealStyle(0, 24)}>
          <p className="text-xs font-black uppercase tracking-[0.4em] text-[#A855F7]" style={fadeStyle(0)}>
            WHY PARTNER WITH CALO CAPITAL
          </p>
          <div className="mt-3 h-px w-28 bg-[#A855F7]/70" />
        </div>

        <h2 className="mt-10 max-w-3xl text-[clamp(2.6rem,7vw,6.1rem)] font-black leading-[0.9] tracking-[-0.03em] text-[#F4F7FB]" style={revealStyle(150, 30)}>
          Markets move.
          <br />
          <span className="text-[#A855F7]">Sound strategy</span>
          <br />
          endures.
        </h2>

        <div className="mt-16" style={revealStyle(300, 24)}>
          <h3 className="text-sm font-black uppercase tracking-[0.28em] text-[#F4F7FB]" style={fadeStyle(300)}>
            OUR PRINCIPLES
          </h3>
          <p className="mt-7 max-w-xl text-base leading-8 text-[#B7C0D8] sm:text-lg" style={fadeStyle(380)}>
            We believe thoughtful guidance, transparent communication, and disciplined market perspective create the foundation for lasting financial relationships.
          </p>
          <p className="mt-8 max-w-xl text-base leading-8 text-[#B7C0D8] sm:text-lg" style={fadeStyle(460)}>
            Every recommendation begins with understanding your goals, not chasing trends.
          </p>
          <p className="mt-10 text-[15px] font-display text-[#A855F7]" style={fadeStyle(520)}>
            Our Mission
          </p>
          <p className="mt-4 max-w-xl text-base leading-8 text-[#B7C0D8] sm:text-lg" style={fadeStyle(600)}>
            Our mission is to help clients make informed financial decisions through strategic guidance, personalized planning, and transparent communication across every stage of wealth planning.
          </p>
          <p className="mt-8 text-[15px] font-display text-[#A855F7]" style={fadeStyle(680)}>
            Our Vision
          </p>
          <p className="mt-4 max-w-xl text-base leading-8 text-[#B7C0D8] sm:text-lg" style={fadeStyle(760)}>
            Our vision is to build long-term trusted relationships while helping clients pursue financial confidence through thoughtful planning, personalized financial guidance, and consistent market insight.
          </p>
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
      
      {/* CONTACT SECTION */}
      <section id="contact" className="relative overflow-hidden bg-[#070a14] px-4 py-20 text-white sm:px-5 sm:py-32 lg:py-44">
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:92px_92px]" />
        </div>
        
        <div className="relative mx-auto w-full max-w-[94vw]">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-violet-300">Let's Connect</p>
          <div className="mt-8">
            <h1 className="text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-8xl">
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
          <div className="mb-24 rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-purple-500/5 p-6 backdrop-blur-sm sm:p-12">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-300">Schedule Your Consultation</p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">Build Your Strategy with Marc Calo</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Use your consultation to review your financial strategy, discuss market insights, and plan next steps for retirement planning, business financial planning, and long-term wealth decisions.
            </p>
            <a
              href={SCHEDULE_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Google Calendar booking page in a new tab"
              className="mt-8 inline-block w-full rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 px-8 py-4 text-center text-base font-black text-white transition hover:scale-105 hover:shadow-lg hover:shadow-violet-500/50 sm:w-auto"
            >
              Open Calendar & Schedule Now →
            </a>
          </div>

          <div className="grid gap-12">
            <div>
              <h3 className="text-2xl font-black mb-8">Other Ways to Connect</h3>
              
              {/* EMAIL */}
              <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-violet-500/30 hover:bg-white/[0.04] sm:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20 text-xl">✉</div>
                <h4 className="font-black text-lg">Email Us</h4>
                <p className="mt-2 text-slate-300">Send us your questions about financial planning and strategy</p>
                <a href="mailto:protection@calocapital.io" className="mt-4 inline-block text-violet-400 font-bold hover:text-violet-300 transition">
                  protection@calocapital.io →
                </a>
              </div>

              {/* SOCIAL LINKS */}
              <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                <h4 className="font-black text-lg mb-5">Follow Our Insights</h4>
                <p className="text-sm text-slate-400 mb-5">Stay informed on market insights, economic trends, and investment strategy</p>
                <div className="flex flex-wrap gap-3 sm:gap-4">
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
    if (page === "About" || page === "Contact") {
      setCurrentPage("Home");
      window.location.hash = pageRoutes[page];
      return;
    }

    setCurrentPage(page);
    window.location.hash = pageRoutes[page];
  }

  return (
    <main className="min-h-screen bg-[#070a14] font-body">
      <GlobalStyles />
      <MarketTicker coins={coins} live={live} />
      <Navbar currentPage={currentPage} setPage={setPage} />
      {currentPage === "Home" && <HomePage coins={coins} live={live} setPage={setPage} />}
      <Footer />
    </main>
  );
}
