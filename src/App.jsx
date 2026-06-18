import React, { useEffect, useMemo, useRef, useState } from "react";
import logoPng from "../public/Calo_purple_logo.png";

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
  { group: "Crypto", label: "XRPUSD", display: "XRP/USD", tvSymbol: "COINBASE:XRPUSD", price: 0.5821, change: 1.12 },
  { group: "Crypto", label: "ADAUSD", display: "ADA/USD", tvSymbol: "COINBASE:ADAUSD", price: 0.4432, change: -1.03 },
  { group: "Crypto", label: "DOGEUSD", display: "DOGE/USD", tvSymbol: "COINBASE:DOGEUSD", price: 0.1587, change: 2.42 },
  { group: "Crypto", label: "AVAXUSD", display: "AVAX/USD", tvSymbol: "COINBASE:AVAXUSD", price: 36.14, change: 1.65 },
  { group: "Crypto", label: "LINKUSD", display: "LINK/USD", tvSymbol: "COINBASE:LINKUSD", price: 16.88, change: 0.94 },
  { group: "Stocks", label: "AAPL", display: "AAPL", tvSymbol: "NASDAQ:AAPL", price: 214.32, change: 0.78 },
  { group: "Stocks", label: "TSLA", display: "TSLA", tvSymbol: "NASDAQ:TSLA", price: 356.41, change: 1.24 },
  { group: "Stocks", label: "NVDA", display: "NVDA", tvSymbol: "NASDAQ:NVDA", price: 142.11, change: 1.57 },
  { group: "Stocks", label: "MSFT", display: "MSFT", tvSymbol: "NASDAQ:MSFT", price: 467.23, change: 0.61 },
  { group: "Stocks", label: "GOOGL", display: "GOOGL", tvSymbol: "NASDAQ:GOOGL", price: 176.48, change: 0.52 },
  { group: "ETFs", label: "SPY", display: "SPY", tvSymbol: "AMEX:SPY", price: 590.12, change: 0.39 },
  { group: "ETFs", label: "QQQ", display: "QQQ", tvSymbol: "NASDAQ:QQQ", price: 521.77, change: 0.55 },
];

const aboutServices = [
  {
    title: "Cash Alternatives",
    description: "Alternative strategies focused on liquidity, cash flow, and capital preservation.",
    icon: "◈",
  },
  {
    title: "Crypto",
    description: "Digital asset education, custody solutions, and strategic market insights.",
    icon: "◎",
  },
  {
    title: "Commodities",
    description: "Diversification opportunities through precious metals, energy, and commodity markets.",
    icon: "▥",
  },
  {
    title: "Companies",
    description: "Long-term opportunities involving private businesses and growth-focused investments.",
    icon: "▦",
  },
];

const services = [
  {
    title: "Cash Alternatives",
    description:
      "Alternative strategies focused on liquidity, cash flow, and capital preservation.",
    features: ["Liquidity Management", "Capital Preservation", "Structured Yield", "Short-term Alternatives"],
  },
  {
    title: "Crypto",
    description:
      "Digital asset education, custody solutions, and strategic market insights.",
    features: ["Education", "Custody Guidance", "Token Research", "Strategic Insights"],
  },
  {
    title: "Commodities",
    description:
      "Diversification opportunities through precious metals, energy, and commodity markets.",
    features: ["Commodity Outlook", "Diversification", "Hedging", "Macro Insight"],
  },
  {
    title: "Companies",
    description:
      "Long-term opportunities involving private businesses and growth-focused investments.",
    features: ["Private Opportunities", "Company Analysis", "Growth Investing", "Operational Due Diligence"],
  },
];

const blogPosts = [
  {
    category: "Retirement",
    date: "Feb 21, 2024",
    title: "10 Quick Tips For Retirement",
    description: "[CLIENT CONTENT PENDING]",
  },
  {
    category: "Insurance",
    date: "Feb 21, 2024",
    title: "15 Best Blogs To Follow About Insurance",
    description: "[CLIENT CONTENT PENDING]",
  },
  {
    category: "Crypto",
    date: "Feb 21, 2024",
    title: "7 of the Best Crypto Strategies",
    description: "[CLIENT CONTENT PENDING]",
  },
  {
    category: "Insurance",
    date: "Jan 15, 2024",
    title: "Understanding Life Insurance Basics",
    description: "[CLIENT CONTENT PENDING]",
  },
  {
    category: "Lending",
    date: "Jan 8, 2024",
    title: "Premium Financing Explained",
    description: "[CLIENT CONTENT PENDING]",
  },
  {
    category: "Planning",
    date: "Dec 20, 2023",
    title: "Estate Planning in the Digital Age",
    description: "[CLIENT CONTENT PENDING]",
  },
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
      className="group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-200/30 hover:bg-white/[0.07] hover:text-white"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0c1322] text-cyan-100 transition group-hover:border-cyan-200/30 group-hover:text-white">
        {item.icon}
      </span>
      <span>{item.label}</span>
    </a>
  );
}

const CALO_INQUIRY_RECIPIENT = "protection@calocapital.io";
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
const EMAILJS_CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID?.trim() || EMAILJS_TEMPLATE_ID;

let emailjsInitialized = false;

function ensureEmailjsInitialized() {
  if (!EMAILJS_PUBLIC_KEY) {
    return false;
  }

  if (!emailjsInitialized) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    emailjsInitialized = true;
  }

  return true;
}

function getErrorMessage(error) {
  return error?.text || error?.message || "We could not send your request right now. Please try again.";
}

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

const pageRoutes = {
  Home: "#/",
  About: "#/about",
  Team: "#/team",
  Blog: "#/blog",
  Contact: "#/contact",
};

function getPageFromHash() {
  const hash = window.location.hash || "#/";
  if (hash === "#/about") return "About";
  if (hash === "#/team") return "Team";
  if (hash === "#/blog") return "Blog";
  if (hash === "#/contact") return "Contact";
  return "Home";
}

function Navbar({ currentPage, setPage }) {
  const [open, setOpen] = useState(false);
  const links = ["Home", "About", "Team", "Blog", "Contact"];

  function goTo(page) {
    setPage(page);
    window.location.hash = pageRoutes[page];
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070a14]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <button onClick={() => goTo("Home")} aria-label="Calo Capital home" className="text-left">
          <Logo />
        </button>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((label) => (
            <button
              key={label}
              onClick={() => goTo(label)}
              className={currentPage === label ? "text-sm font-black text-white" : "text-sm font-semibold text-slate-300 transition hover:text-white"}
            >
              {label}
            </button>
          ))}
        </nav>

        <button onClick={() => goTo("Contact")} className="hidden rounded-xl bg-violet-300 px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-violet-200 lg:inline-block">
          Schedule a Call
        </button>

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

function ShootingStars() {
  const shootingStars = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        id: index,
        top: `${4 + ((index * 13) % 54)}%`,
        left: `${-35 - index * 10}%`,
        delay: `${index * 1.25}s`,
        duration: `${2.8 + (index % 4) * 0.55}s`,
        scale: `${0.7 + (index % 3) * 0.18}`,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {shootingStars.map((star) => (
        <span
          key={star.id}
          className="shooting-star absolute block h-[2px] w-40 opacity-0"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            animationDuration: star.duration,
            transform: `scale(${star.scale})`,
          }}
        >
          <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_18px_6px_rgba(255,255,255,0.85),0_0_34px_12px_rgba(103,232,249,0.45)]" />
          <span className="absolute right-1 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-gradient-to-l from-white via-cyan-200/80 to-transparent shadow-[0_0_14px_rgba(103,232,249,0.65)]" />
        </span>
      ))}
    </div>
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

function StockChart({ coins }) {
  const [selectedSymbol, setSelectedSymbol] = useState("BTCUSD");
  const selectedAsset = CHART_ASSETS.find((asset) => asset.label === selectedSymbol) || CHART_ASSETS[0];
  const isUp = selectedAsset.change >= 0;

  useEffect(() => {
    const containerId = "tv_chart_container";
    let tvScript = null;

    function createWidget() {
      try {
        if (!window.TradingView) return;
        if (!document.getElementById(containerId)) return;

        // remove any previous widget content
        const el = document.getElementById(containerId);
        el.innerHTML = "";

        new window.TradingView.widget({
          autosize: true,
          symbol: selectedAsset.tvSymbol,
          interval: "D",
          timezone: "America/New_York",
          theme: "dark",
          style: "1",
          locale: "en",
          container_id: containerId,
          allow_symbol_change: false,
          hide_top_toolbar: true,
          hide_side_toolbar: false,
          withdateranges: false,
          // color overrides to better match Calo Capital branding
          overrides: {
            "paneProperties.background": "#050816",
            "paneProperties.vertGridProperties.color": "#1A2340",
            "paneProperties.horzGridProperties.color": "#1A2340",
            "scalesProperties.textColor": "#B7C0D8",
            "mainSeriesProperties.candleStyle.upColor": "#C6B8FF",
            "mainSeriesProperties.candleStyle.downColor": "#6D5EF5",
            "mainSeriesProperties.candleStyle.borderUpColor": "#C6B8FF",
            "mainSeriesProperties.candleStyle.borderDownColor": "#6D5EF5",
            "mainSeriesProperties.candleStyle.wickUpColor": "#C6B8FF",
            "mainSeriesProperties.candleStyle.wickDownColor": "#6D5EF5",
            "mainSeriesProperties.candleStyle.borderVisible": true,
            "mainSeriesProperties.candleStyle.wickVisible": true,
            "symbolWatermarkProperties.color": "#1A2340",
          },
        });
      } catch (err) {
        // fail silently — placeholder will remain visible
        // eslint-disable-next-line no-console
        console.warn("TradingView widget failed to load:", err);
      }
    }

    if (window.TradingView) {
      createWidget();
    } else {
      tvScript = document.createElement("script");
      tvScript.src = "https://s3.tradingview.com/tv.js";
      tvScript.async = true;
      tvScript.onload = createWidget;
      document.head.appendChild(tvScript);
    }

    return () => {
      const el = document.getElementById(containerId);
      if (el) el.innerHTML = "";
      if (tvScript && tvScript.parentNode) tvScript.parentNode.removeChild(tvScript);
    };
  }, [selectedAsset.tvSymbol]);

  return (
    <div className="rounded-3xl border border-white/10 bg-[#101323]/80 p-5 shadow-2xl shadow-violet-950/30 backdrop-blur-md">
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
          <p className={isUp ? "font-mono text-xl font-black text-emerald-300" : "font-mono text-xl font-black text-rose-300"}>
            {isUp ? "+" : ""}{selectedAsset.change.toFixed(2)}%
          </p>
          <p className="text-xs text-slate-400">24h Performance</p>
        </div>
      </div>
      <div className="relative flex h-72 items-center justify-center overflow-visible rounded-2xl border border-white/10 bg-[#070a14]">
        <div className="absolute inset-0 z-0 opacity-25">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
        </div>
        <div className="relative z-20 flex h-full w-full items-center justify-center px-0">
          <div ref={(el) => el && (el.style.width = "100%")} className="h-full w-full" id="tv_chart_container" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
        <div>
          <p className="text-xs text-slate-400">Selected Asset</p>
          <p className="font-mono text-xs font-black text-white">TradingView</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Inflation</p>
          <p className="font-mono text-xs font-black text-white">N/A</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Asset Value</p>
          <p className="font-mono text-xs font-black text-white">{formatPrice(selectedAsset.price)}</p>
        </div>
      </div>
    </div>
  );
}

function MovingPrompt() {
  const prompts = [
    "Market insight across cash alternatives, crypto, commodities, and companies.",
    "Clear strategic guidance for capital preservation and modern opportunity.",
    "Professional education for legacy-oriented financial decisions.",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIndex((value) => (value + 1) % prompts.length), 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl border border-violet-300/20 bg-violet-300/10 p-4 text-sm leading-6 text-violet-50 shadow-xl shadow-violet-950/20 backdrop-blur-md">
      <span className="mr-2">✦</span>{prompts[index]}
    </div>
  );
}

function HeroSection({ coins, setPage }) {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-[#070a14] pt-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(88,28,135,0.75)_0%,rgba(15,23,42,0.4)_42%,#070a14_78%)]" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&q=80')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070a14]/20 to-[#070a14]" />
      <FloatingStars />
      <ShootingStars />
      <MovingClouds />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-4 py-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-xs font-bold text-violet-200">Cash Alternatives · Crypto · Commodities · Companies</span>
          </div>

          <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            <span>Where Strategy</span>
            <br />
            <span>Meets Legacy</span>
          </h1>

          <p className="max-w-md text-base leading-relaxed text-slate-300 sm:text-lg">
            Calo Capital helps individuals and businesses navigate opportunities across cash alternatives, crypto, commodities, and companies through education, research, and strategic market insights.
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button onClick={() => setPage("About")} className="rounded-xl bg-violet-300 px-7 py-3.5 text-center text-sm font-black text-slate-950 transition hover:bg-violet-200">
              Learn More →
            </button>
            <button onClick={() => setPage("Contact")} className="rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-center text-sm font-bold text-white transition hover:bg-white/10">
              Schedule a Call
            </button>
          </div>

          <div className="max-w-md pt-2">
            <MovingPrompt />
          </div>
        </div>

        <div className="space-y-4">
          <StockChart coins={coins} />
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Gold", value: "$3,287", change: "-0.32%", up: false },
              { label: "S&P 500", value: "5,969", change: "+0.58%", up: true },
              { label: "ETH", value: formatPrice((coins.find((coin) => coin.symbol === "ETH") || FALLBACK_COINS[1]).price), change: "+1.87%", up: true },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                <p className="text-xs text-slate-400">{item.label}</p>
                <p className="font-mono text-sm font-black text-white">{item.value}</p>
                <p className={item.up ? "font-mono text-xs font-bold text-emerald-300" : "font-mono text-xs font-bold text-rose-300"}>{item.change}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MarketTicker({ coins, live }) {
  const items = useMemo(() => {
    const markets = buildTickerItems(coins);
    return [...markets, ...markets];
  }, [coins]);

  return (
    <section id="markets" className="relative overflow-hidden border-y border-white/10 bg-[#101323]/80 py-3 text-white">
      <div className="absolute left-4 top-1/2 z-10 flex -translate-y-1/2 items-center gap-1.5 rounded border border-white/10 bg-[#070a14]/90 px-2 py-1 backdrop-blur-sm">
        <div className={live ? "h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" : "h-1.5 w-1.5 rounded-full bg-yellow-300"} />
        <span className="font-mono text-[10px] font-black text-slate-300">{live ? "LIVE" : "DEMO"}</span>
      </div>

      <div className="animate-[marquee_34s_linear_infinite] whitespace-nowrap pl-24">
        {items.map((coin, index) => {
          const up = coin.change >= 0;
          return (
            <span key={`${coin.symbol}-${index}`} className="inline-flex items-center gap-2.5 border-r border-white/10 px-6">
              <span className="font-mono text-xs font-black text-white">{coin.symbol}</span>
              <span className="hidden text-xs text-slate-400 sm:inline">{coin.name}</span>
              <span className="font-mono text-xs font-bold text-white">{formatPrice(coin.price)}</span>
              <span className={up ? "font-mono text-xs font-bold text-emerald-300" : "font-mono text-xs font-bold text-rose-300"}>
                {up ? "▲" : "▼"} {Math.abs(coin.change).toFixed(2)}%
              </span>
            </span>
          );
        })}
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    ["3", "Core Planning Pillars"],
    ["24/7", "Market Awareness"],
    ["100%", "Education First"],
    ["1:1", "Consultation Path"],
  ];

  return (
    <section className="bg-[#070a14] px-5 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([value, label]) => (
          <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center">
            <p className="text-3xl font-black text-violet-200">{value}</p>
            <p className="mt-2 text-sm text-slate-400">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="bg-[#0b0f1d] px-5 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-sm font-black uppercase tracking-[0.3em] text-violet-200">Services</p>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="max-w-3xl text-3xl font-black sm:text-4xl">
            Calo Capital bridges cash alternatives, crypto, commodities, and company research through education, insight, and strategic market guidance.
          </h2>
          <p className="max-w-xl text-slate-300">
            Services are organized around the 4 C's to support informed decisions and long-term capital stewardship.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <article key={service.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:bg-white/[0.07]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-300/10 text-xl text-violet-200 ring-1 ring-violet-300/20">
                {index === 0 ? "◈" : index === 1 ? "◆" : index === 2 ? "△" : "✦"}
              </div>
              <h3 className="text-lg font-black text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{service.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span key={feature} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                    {feature}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section id="about" className="bg-[#070a14] px-5 py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
        <div>
          <p className="mb-3 text-sm font-black uppercase tracking-[0.3em] text-violet-200">Our Philosophy</p>
          <h2 className="text-3xl font-black sm:text-4xl">From unsure about money to confident about your financial direction.</h2>
        </div>
        <div className="space-y-5 text-slate-300">
          <p>
            At Calo Capital, the goal is to help visitors understand protection, capital access, and modern market opportunities in a clear and professional way.
          </p>
          <p>
            Calo Capital's core services are presented in a clean, premium structure designed for client education and consultation requests.
          </p>
          <a href="#contact" className="inline-block rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-black text-white hover:bg-white/10">
            Connect With Calo
          </a>
        </div>
      </div>
    </section>
  );
}

function BlogPreview() {
  return (
    <section id="insights" className="relative overflow-hidden bg-[#0b0f1d] px-5 py-20 text-white">
      <FloatingStars />
      <ShootingStars />
      <div className="relative mx-auto max-w-7xl">
        <p className="mb-3 text-center text-sm font-black uppercase tracking-[0.3em] text-violet-200">Insights</p>
        <h2 className="text-center text-3xl font-black sm:text-4xl">Financial education visitors can trust</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <article key={post.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:border-violet-300/30 hover:bg-white/[0.07]">
              <div className="mb-5 flex items-center gap-3 text-xs text-blue-300/80">
                <span className="rounded-full bg-violet-300/10 px-3 py-1 font-black text-violet-300">{post.category}</span>
                <span>▣ {post.date}</span>
              </div>
              <h3 className="text-xl font-black text-white">{post.title}</h3>
              <p className="mt-4 text-sm leading-6 text-blue-300/75">{post.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ setPage }) {
  return (
    <section className="bg-[#070a14] px-5 py-20 text-white">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-violet-300/20 bg-gradient-to-br from-violet-300/15 to-cyan-300/10 p-8 text-center shadow-2xl shadow-violet-950/30 lg:p-12">
        <h2 className="text-3xl font-black sm:text-4xl">Ready to create clarity around your next financial move?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">Book a consultation, ask a question, or request more information about cash alternatives, crypto, commodities, and company research.</p>
        <button
          onClick={() => setPage("Contact")}
          className="mt-8 inline-block rounded-xl bg-violet-300 px-7 py-3.5 text-sm font-black text-slate-950 hover:bg-violet-200"
        >
          Schedule a Call
        </button>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0b101b] px-5 py-28 text-center text-white sm:py-36">
        <div className="absolute inset-0 opacity-[0.12]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:92px_92px]" />
        </div>
        <FloatingStars />
        <ShootingStars />
        <div className="relative mx-auto max-w-5xl">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-violet-300">Get In Touch</p>
          <h1 className="mt-6 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">Contact</h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative min-h-screen bg-[#070a14] px-5 py-24 text-white">
        <FloatingStars />
        <ShootingStars />

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* LEFT */}
          <div>
            <div className="mb-8 rounded-2xl border border-white/6 bg-white/[0.02] p-6">
              <h3 className="text-lg font-black">Trust & Credibility</h3>
              <p className="mt-3 text-sm text-slate-300">Education-first, research-backed guidance across multiple asset classes:</p>
              <ul className="mt-3 ml-4 list-disc text-sm text-slate-300">
                <li>Education-First Approach</li>
                <li>Long-Term Strategic Thinking</li>
                <li>Capital Preservation Focus</li>
                <li>Market Research & Insights</li>
                <li>Multi-Asset Perspective</li>
              </ul>
            </div>
            <h2 className="text-3xl font-black">Let's start a conversation</h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-blue-300/75">
              Whether you're ready to build a plan or just have questions, we're here to help. Reach out and a member of our team will get back to you.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-violet-300/10 p-3 text-violet-300">✉</div>
                <div>
                  <p className="font-bold">Email</p>
                  <p className="text-sm text-slate-400">protection@calocapital.io</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-violet-300/10 p-3 text-violet-300">↗</div>
                <div>
                  <p className="font-bold">Book a Meeting</p>
                  <p className="text-sm text-slate-400">Schedule via Google Calendar</p>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-white/10 pt-6">
              <p className="mb-4 text-sm font-bold text-slate-300">Follow us</p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((item) => (
                  <SocialLink key={item.label} item={item} />
                ))}
              </div>
            </div>
            <div className="mt-6 text-sm leading-6 text-slate-400">
              The information on this website is educational and informational only and is not investment, legal, tax, or financial advice. Consult qualified professionals before making any investment decisions.
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0d1322]/90 p-8 shadow-xl backdrop-blur-md">
            <div className="flex min-h-[420px] flex-col justify-center rounded-2xl border-0 bg-transparent p-8 text-center shadow-none">
              <p className="text-sm font-black uppercase tracking-[0.28em] text-violet-300">Contact Form</p>
              <p className="mx-auto mt-5 max-w-lg text-lg leading-8 text-blue-300/75">Use the form in this section to request more information or begin a conversation with Calo Capital.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="relative overflow-hidden bg-[#070a14] px-5 py-20 text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&q=80')] bg-cover bg-center opacity-10" />
      <FloatingStars />
      <ShootingStars />
      <div className="relative mx-auto max-w-7xl">
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
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0b101b] px-5 py-28 text-center text-white sm:py-36">
        <div className="absolute inset-0 opacity-[0.12]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:92px_92px]" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-violet-300">About Us</p>
          <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">About Us</h1>
        </div>
      </section>

      <section className="bg-[#070a14] px-5 py-24 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Where Strategy Meets Legacy.
          </h2>
          <div className="mx-auto mt-9 h-px w-24 bg-violet-300/40" />
          <p className="mx-auto mt-9 max-w-3xl text-base leading-8 text-blue-300/80 sm:text-lg">
            Calo Capital helps individuals and businesses navigate opportunities across cash alternatives, crypto, commodities, and companies through education, research, and strategic market insights. Our approach is disciplined, clear, and built to support long-term decision-making with confidence.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b101b] px-5 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-violet-300">What We Are Best At</p>
            <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">Our Services</h2>
          </div>

          <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {aboutServices.map((service) => (
              <article key={service.title} className="rounded-2xl border border-white/10 bg-[#0d1322] p-8 shadow-xl shadow-black/10">
                <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-300/10 text-xl text-violet-300 ring-1 ring-violet-300/10">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black text-white">{service.title}</h3>
                <p className="mt-4 text-base leading-7 text-blue-300/75">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#070a14] px-5 py-24 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-black sm:text-4xl">Let's start your next strategic conversation</h2>
          <p className="mt-5 text-lg text-blue-300/75">Reach out to discuss cash alternatives, crypto, commodities, and companies with a clearer long-term framework.</p>
          <button
            onClick={() => {
              window.location.hash = pageRoutes.Contact;
              window.dispatchEvent(new HashChangeEvent("hashchange"));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="mt-10 rounded-xl bg-violet-300 px-9 py-4 text-sm font-black text-slate-950 transition hover:bg-violet-200"
          >
            Contact Us →
          </button>
        </div>
      </section>
    </>
  );
}

function TeamPage() {
  const team = [
    {
      name: "Marc Calo",
      role: "CEO",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
    },
    {
      name: "Sara Smith",
      role: "Account Manager",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
    },
    {
      name: "Amanda Peterson",
      role: "Director of Finance",
      image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=600&q=80",
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0b101b] px-5 py-28 text-center text-white sm:py-36">
        <div className="absolute inset-0 opacity-[0.12]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:92px_92px]" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-violet-300">Our People</p>
          <h1 className="mt-6 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">The Calo Team</h1>
        </div>
      </section>

      <section className="min-h-screen bg-[#070a14] px-5 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="group relative overflow-hidden rounded-3xl">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070a14]/80 via-transparent to-transparent" />

              </div>

              <h3 className="mt-6 text-xl font-black">{member.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function BlogPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0b101b] px-5 py-28 text-center text-white sm:py-36">
        <div className="absolute inset-0 opacity-[0.12]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:92px_92px]" />
        </div>
        <FloatingStars />
        <ShootingStars />
        <div className="relative mx-auto max-w-5xl">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-violet-300">Insights</p>
          <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">Blog</h1>
        </div>
      </section>

      <section className="relative min-h-screen overflow-hidden bg-[#070a14] px-5 py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,.08),transparent_28%),radial-gradient(circle_at_85%_75%,rgba(34,211,238,.07),transparent_30%)]" />
        <FloatingStars />
        <ShootingStars />
        <div className="relative mx-auto grid max-w-7xl gap-7 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.title} className="rounded-2xl border border-white/10 bg-[#0d1322]/90 p-8 shadow-xl shadow-black/10 backdrop-blur-sm transition hover:-translate-y-1 hover:border-violet-300/30 hover:bg-[#11182a]">
              <div className="mb-7 flex flex-wrap items-center gap-3 text-xs text-blue-300/80">
                <span className="rounded-full bg-violet-300/10 px-4 py-1.5 font-black text-violet-300">{post.category}</span>
                <span className="font-medium">▣ {post.date}</span>
              </div>
              <h2 className="text-2xl font-black leading-tight text-white">{post.title}</h2>
              <p className="mt-5 text-base leading-8 text-blue-300/75">{post.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function HomePage({ coins, live, setPage }) {
  return (
    <>
      <HeroSection coins={coins} setPage={setPage} />
      <MarketTicker coins={coins} live={live} />
      <StatsSection />
      <ServicesSection />
      <CTASection setPage={setPage} />
    </>
  );
}

function Footer() {
  const serviceLinks = ["Cash Alternatives", "Crypto", "Commodities", "Companies"];
  const companyLinks = ["Our Philosophy", "Leadership", "Client Excellence", "Contact"];

  return (
    <footer className="border-t border-white/10 bg-[#070a14] px-5 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-lg font-black tracking-wide text-white">Calo Capital</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
            Calo Capital — Where Strategy Meets Legacy. Educational content and market insights designed to help individuals and families make more informed financial decisions.
          </p>
        </div>
        <div>
          <p className="mb-4 font-black">Services</p>
          <div className="space-y-2">
            {serviceLinks.map((link) => <a key={link} href="#services" className="block text-sm text-slate-400 hover:text-white">{link}</a>)}
          </div>
        </div>
        <div>
          <p className="mb-4 font-black">Company</p>
          <div className="space-y-2">
            {companyLinks.map((link) => <a key={link} href="#about" className="block text-sm text-slate-400 hover:text-white">{link}</a>)}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-slate-500">
        © {new Date().getFullYear()} Calo Capital. Educational content only. No guaranteed financial returns.
      </div>
      <div className="mx-auto mt-6 max-w-7xl text-xs leading-6 text-slate-500">
        Investing involves risk, including the possible loss of principal. Past performance does not guarantee future results. Asset allocation, diversification, and portfolio strategies do not guarantee profits or protect against losses in declining markets.

        The information provided by Calo Capital is for educational and informational purposes only and should not be construed as investment, legal, tax, accounting, or financial advice. Visitors should consult qualified professionals before making any financial decisions.

        This material does not take into account an individual's specific investment objectives, financial situation, risk tolerance, or needs and is not intended as a recommendation, offer, or solicitation to buy or sell any security, investment product, or strategy.

        Calo Capital is not currently a registered investment advisor, broker-dealer, or fiduciary. Nothing contained on this website, in presentations, webinars, reports, or communications should be interpreted as personalized investment advice or a guarantee of future performance.

        Any references to digital assets, commodities, cash alternatives, businesses, or market opportunities are provided for educational discussion only. All investments and financial decisions carry risk, and individuals are solely responsible for evaluating whether any strategy is appropriate for their circumstances.

        Calo Capital may discuss third-party products, platforms, or service providers. Such references do not constitute an endorsement or guarantee of results. Users should perform their own due diligence before engaging with any third-party provider.

        By using this website, you acknowledge that you are responsible for your own financial decisions and agree that Calo Capital shall not be held liable for any losses arising from reliance on information presented through this website or related materials.
      </div>
      <div className="mx-auto mt-6 max-w-7xl flex flex-wrap gap-3">
        {socialLinks.map((item) => (
          <SocialLink key={item.label} item={item} />
        ))}
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
      @keyframes shootingStar {
        0% { transform: translate3d(0, 0, 0) rotate(18deg) scale(var(--star-scale, 1)); opacity: 0; }
        5% { opacity: 0; }
        14% { opacity: 1; }
        72% { opacity: 1; }
        100% { transform: translate3d(150vw, 62vh, 0) rotate(18deg) scale(var(--star-scale, 1)); opacity: 0; }
      }
      .shooting-star { animation: shootingStar 5s cubic-bezier(.2,.65,.42,1) infinite; }
      @keyframes cloudDriftOne {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes cloudDriftTwo {
        0% { transform: translateX(-12%); }
        100% { transform: translateX(-55%); }
      }
      .cloud-layer {
        background:
          radial-gradient(circle at 6% 75%, rgba(255,255,255,.34) 0 38px, transparent 39px),
          radial-gradient(circle at 15% 60%, rgba(255,255,255,.42) 0 55px, transparent 56px),
          radial-gradient(circle at 28% 74%, rgba(255,255,255,.32) 0 46px, transparent 47px),
          radial-gradient(circle at 41% 62%, rgba(255,255,255,.38) 0 62px, transparent 63px),
          radial-gradient(circle at 54% 78%, rgba(255,255,255,.30) 0 48px, transparent 49px),
          radial-gradient(circle at 68% 64%, rgba(255,255,255,.40) 0 58px, transparent 59px),
          radial-gradient(circle at 82% 74%, rgba(255,255,255,.30) 0 48px, transparent 49px),
          radial-gradient(circle at 94% 66%, rgba(255,255,255,.36) 0 56px, transparent 57px);
        filter: blur(1px);
      }
      .cloud-layer-one { animation: cloudDriftOne 58s linear infinite; }
      .cloud-layer-two { animation: cloudDriftTwo 78s linear infinite; }
    `}</style>
  );
}

export default function App() {
  const { coins, live } = useMarketData();
  const [currentPage, setCurrentPage] = useState(getPageFromHash());

  useEffect(() => {
    function handleHashChange() {
      setCurrentPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  function setPage(page) {
    setCurrentPage(page);
    window.location.hash = pageRoutes[page];
  }

  return (
    <main className="min-h-screen bg-[#070a14] font-sans">
      <GlobalStyles />
      <Navbar currentPage={currentPage} setPage={setPage} />
      {currentPage === "Home" && <HomePage coins={coins} live={live} setPage={setPage} />}
      {currentPage === "About" && <AboutPage />}
      {currentPage === "Team" && <TeamPage />}
      {currentPage === "Blog" && <BlogPage />}
      {currentPage === "Contact" && <ContactSection />}
      <Footer />
    </main>
  );
}
