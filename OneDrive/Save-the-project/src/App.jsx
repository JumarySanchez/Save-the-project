import React, { useEffect, useMemo, useState } from "react";

const FALLBACK_COINS = [
  { symbol: "BTC", name: "Bitcoin", price: 97430, change: 2.14 },
  { symbol: "ETH", name: "Ethereum", price: 3812, change: 1.87 },
  { symbol: "SOL", name: "Solana", price: 172, change: 3.21 },
  { symbol: "BNB", name: "BNB", price: 608, change: -0.54 },
  { symbol: "XRP", name: "XRP", price: 0.5821, change: 1.12 },
  { symbol: "ADA", name: "Cardano", price: 0.4432, change: -1.03 },
];

const aboutServices = [
  {
    title: "Support",
    description: "Personalized guidance for every financial question, from day-to-day concerns to long-term strategy.",
    icon: "🎧",
  },
  {
    title: "Strategy",
    description: "Custom financial roadmaps aligned to your goals, risk tolerance, and timeline.",
    icon: "◎",
  },
  {
    title: "Management",
    description: "Active oversight of your financial plan with regular reviews and adjustments as life evolves.",
    icon: "▥",
  },
  {
    title: "Events",
    description: "Educational seminars and networking opportunities with industry experts and peers.",
    icon: "▦",
  },
  {
    title: "Training",
    description: "Workshops to help you understand insurance, lending, and digital asset fundamentals.",
    icon: "◇",
  },
  {
    title: "Consulting",
    description: "On-demand advisory sessions for entrepreneurs, families, and professionals seeking clarity.",
    icon: "□",
  },
];

const services = [
  {
    title: "Premium Insurance",
    description:
      "Protect your family, income, and future with tailored insurance planning designed around your goals.",
    features: ["Life Insurance", "Income Protection", "Legacy Planning", "Family Coverage"],
  },
  {
    title: "Bespoke Credit",
    description:
      "Access capital when you need it most through lending solutions that support flexibility and liquidity.",
    features: ["Policy Loans", "Premium Financing", "Bridge Capital", "Asset-backed Lines"],
  },
  {
    title: "Digital Assets",
    description:
      "Learn and explore modern crypto strategies with market education, risk awareness, and clear guidance.",
    features: ["Crypto Education", "Market Insight", "Digital Strategy", "Risk Awareness"],
  },
  {
    title: "Wealth Strategy",
    description:
      "Build a long-term financial plan that combines protection, capital access, and future-focused growth.",
    features: ["Planning", "Consulting", "Education", "Strategy"],
  },
];

const blogPosts = [
  {
    category: "Retirement",
    date: "Feb 21, 2024",
    title: "10 Quick Tips For Retirement",
    description: "Smart strategies to prepare for a comfortable and confident retirement, from early planning to portfolio diversification and risk management.",
  },
  {
    category: "Insurance",
    date: "Feb 21, 2024",
    title: "15 Best Blogs To Follow About Insurance",
    description: "Stay informed with the top insurance industry voices covering everything from life coverage to modern financial planning approaches.",
  },
  {
    category: "Crypto",
    date: "Feb 21, 2024",
    title: "7 of the Best Crypto Strategies",
    description: "Explore proven approaches to navigating the crypto market with confidence, from dollar-cost averaging to portfolio rebalancing strategies.",
  },
  {
    category: "Insurance",
    date: "Jan 15, 2024",
    title: "Understanding Life Insurance Basics",
    description: "A comprehensive guide for beginners on life insurance types, coverage options, and how to choose the right policy for your family.",
  },
  {
    category: "Lending",
    date: "Jan 8, 2024",
    title: "Premium Financing Explained",
    description: "How premium financing works, who it's for, and the key benefits of leveraging this strategy for high-value insurance policies.",
  },
  {
    category: "Planning",
    date: "Dec 20, 2023",
    title: "Estate Planning in the Digital Age",
    description: "How to include digital assets, crypto wallets, and online accounts in your estate plan for a complete wealth transfer strategy.",
  },
];

function formatPrice(price) {
  if (price >= 1000) return `$${price.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  if (price >= 1) return `$${price.toFixed(2)}`;
  return `$${price.toFixed(4)}`;
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

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/Calo_purple_logo.png" 
        alt="Calo Capital Logo"
        className="h-16 w-auto object-contain"
        style={{ background: 'transparent' }}
      />
      <div>
        <p className="text-lg font-black tracking-wide text-white">Calo Capital</p>
        <p className="text-xs uppercase tracking-[0.25em] text-violet-200/70">Core Strategy</p>
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
  Waitlist: "#/waitlist",
};

function getPageFromHash() {
  const hash = window.location.hash || "#/";
  if (hash === "#/about") return "About";
  if (hash === "#/team") return "Team";
  if (hash === "#/blog") return "Blog";
  if (hash === "#/contact") return "Contact";
  if (hash === "#/waitlist") return "Waitlist";
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
        <button onClick={() => goTo("Home")} aria-label="Calo Capital home">
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
  const btc = coins.find((coin) => coin.symbol === "BTC") || FALLBACK_COINS[0];
  const isUp = btc.change >= 0;
  const [hoverIndex, setHoverIndex] = useState(10);

  const chartData = useMemo(
    () => [
      { year: "2014", inflation: 1.6, price: btc.price * 0.08 },
      { year: "2015", inflation: 0.1, price: btc.price * 0.12 },
      { year: "2016", inflation: 1.3, price: btc.price * 0.18 },
      { year: "2017", inflation: 2.1, price: btc.price * 0.34 },
      { year: "2018", inflation: 2.4, price: btc.price * 0.26 },
      { year: "2019", inflation: 1.8, price: btc.price * 0.38 },
      { year: "2020", inflation: 1.2, price: btc.price * 0.46 },
      { year: "2021", inflation: 4.7, price: btc.price * 0.64 },
      { year: "2022", inflation: 8.0, price: btc.price * 0.52 },
      { year: "2023", inflation: 4.1, price: btc.price * 0.72 },
      { year: "2024", inflation: 3.0, price: btc.price * 0.88 },
      { year: "2025", inflation: 2.7, price: btc.price * 0.94 },
      { year: "2026", inflation: 2.5, price: btc.price },
    ],
    [btc.price]
  );

  const width = 754;
  const height = 320;
  const paddingX = 34;
  const paddingY = 34;
  const maxPrice = Math.max(...chartData.map((point) => point.price));
  const minPrice = Math.min(...chartData.map((point) => point.price));

  const plotted = chartData.map((point, index) => {
    const x = paddingX + (index / (chartData.length - 1)) * (width - paddingX * 2);
    const normalized = (point.price - minPrice) / (maxPrice - minPrice || 1);
    const y = height - paddingY - normalized * (height - paddingY * 2);
    return { ...point, x, y };
  });

  const active = plotted[hoverIndex] || plotted[plotted.length - 1];
  const path = plotted.map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`).join(" ");
  const fillPath = `${path} L${width - paddingX},${height - paddingY} L${paddingX},${height - paddingY} Z`;

  function handleMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const ratio = Math.min(Math.max(x / rect.width, 0), 1);
    const nextIndex = Math.round(ratio * (plotted.length - 1));
    setHoverIndex(nextIndex);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-[#101323]/80 p-5 shadow-2xl shadow-violet-950/30 backdrop-blur-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black text-slate-400">BTC/USD</span>
            <span className="rounded bg-violet-300/10 px-2 py-0.5 text-xs font-bold text-violet-200">INTERACTIVE</span>
          </div>
          <p className="mt-1 font-mono text-3xl font-black text-white">{formatPrice(active.price)}</p>
        </div>
        <div className="text-right">
          <p className={isUp ? "font-mono text-xl font-black text-emerald-300" : "font-mono text-xl font-black text-rose-300"}>
            {isUp ? "+" : ""}{btc.change.toFixed(2)}%
          </p>
          <p className="text-xs text-slate-400">24h Performance</p>
        </div>
      </div>

      <div
        className="relative h-64 cursor-crosshair overflow-hidden rounded-2xl border border-white/10 bg-[#070a14]"
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIndex(chartData.length - 1)}
        onTouchMove={(event) => {
          const touch = event.touches[0];
          if (!touch) return;
          const rect = event.currentTarget.getBoundingClientRect();
          const x = touch.clientX - rect.left;
          const ratio = Math.min(Math.max(x / rect.width, 0), 1);
          setHoverIndex(Math.round(ratio * (plotted.length - 1)));
        }}
      >
        <div className="absolute inset-0 opacity-25">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
        </div>
        <svg viewBox={`0 0 ${width} ${height}`} className="relative z-10 h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="caloChartFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={fillPath} fill="url(#caloChartFill)" />
          <path d={path} fill="none" stroke="#c4b5fd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <line x1={active.x} y1={paddingY} x2={active.x} y2={height - paddingY} stroke="rgba(255,255,255,.55)" strokeDasharray="6 6" />
          <circle cx={active.x} cy={active.y} r="8" fill="#070a14" stroke="#67e8f9" strokeWidth="4" />
        </svg>
        <div
          className="pointer-events-none absolute z-20 min-w-[150px] rounded-2xl border border-cyan-200/30 bg-[#070a14]/95 p-3 text-xs shadow-2xl shadow-cyan-950/40 backdrop-blur-md"
          style={{
            left: `${Math.min(Math.max((active.x / width) * 100, 12), 76)}%`,
            top: `${Math.min(Math.max((active.y / height) * 100 - 30, 8), 62)}%`,
          }}
        >
          <p className="font-mono font-black text-cyan-100">{active.year}</p>
          <p className="mt-1 text-slate-300">Inflation: <span className="font-black text-white">{active.inflation.toFixed(1)}%</span></p>
          <p className="text-slate-300">BTC Estimate: <span className="font-black text-white">{formatPrice(active.price)}</span></p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
        <div>
          <p className="text-xs text-slate-400">Selected Year</p>
          <p className="font-mono text-xs font-black text-white">{active.year}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Inflation</p>
          <p className="font-mono text-xs font-black text-white">{active.inflation.toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">BTC Value</p>
          <p className="font-mono text-xs font-black text-white">{formatPrice(active.price)}</p>
        </div>
      </div>
    </div>
  );
}

function MovingPrompt() {
  const prompts = [
    "Join the waitlist for early Calo Capital updates.",
    "Get market education, risk reminders, and consultation openings.",
    "Be first to know when new financial tools are released.",
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

function WaitlistPromptCard() {
  return (
    <button
      onClick={() => {
        window.location.hash = pageRoutes.Waitlist;
        window.dispatchEvent(new HashChangeEvent('hashchange'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className="group fixed bottom-5 right-5 z-50 hidden max-w-[280px] rounded-3xl border border-cyan-200/25 bg-[#070a14]/90 p-4 text-white shadow-2xl shadow-cyan-950/40 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-200/50 lg:block"
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="rounded-full bg-cyan-300/15 px-3 py-1 text-xs font-black text-cyan-100">WAITLIST OPEN</span>
        <span className="transition group-hover:translate-x-1">→</span>
      </div>
      <p className="text-sm font-bold leading-5">Get early access to Calo market updates and consultation openings.</p>
    </button>
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
          <Logo />
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-4 py-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-xs font-bold text-violet-200">Insurance · Lending · Crypto Strategies</span>
          </div>

          <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            <span>Financial</span>
            <br />
            <span>Control</span>
            <br />
            <span className="bg-gradient-to-r from-violet-200 via-cyan-200 to-blue-300 bg-clip-text text-transparent">With Calo Capital</span>
          </h1>

          <p className="max-w-md text-base leading-relaxed text-slate-300 sm:text-lg">
            Clarity, control, and continuity at every stage of your financial life — blending insurance, lending, and modern crypto strategies.
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
  const items = [...coins, ...coins];

  return (
    <section id="markets" className="relative overflow-hidden border-y border-white/10 bg-[#101323]/80 py-3 text-white">
      <div className="absolute left-4 top-1/2 z-10 flex -translate-y-1/2 items-center gap-1.5 rounded border border-white/10 bg-[#070a14]/90 px-2 py-1 backdrop-blur-sm">
        <div className={live ? "h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" : "h-1.5 w-1.5 rounded-full bg-yellow-300"} />
        <span className="font-mono text-[10px] font-black text-slate-300">{live ? "LIVE" : "DEMO"}</span>
      </div>

      <div className="animate-[marquee_42s_linear_infinite] whitespace-nowrap pl-24">
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
            Calo Capital bridges insurance-based planning, lending solutions, and digital asset education.
          </h2>
          <p className="max-w-xl text-slate-300">
            Calo Capital's core services are presented in a clean, premium structure designed for client education and consultation requests.
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

function CTASection() {
  return (
    <section className="bg-[#070a14] px-5 py-20 text-white">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-violet-300/20 bg-gradient-to-br from-violet-300/15 to-cyan-300/10 p-8 text-center shadow-2xl shadow-violet-950/30 lg:p-12">
        <h2 className="text-3xl font-black sm:text-4xl">Ready to create clarity around your next financial move?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">Book a consultation, ask a question, or request more information about insurance, lending, and digital asset education.</p>
        <button
          onClick={() => {
            window.location.hash = pageRoutes.Waitlist;
            window.dispatchEvent(new HashChangeEvent('hashchange'));
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="mt-8 inline-block rounded-xl bg-violet-300 px-7 py-3.5 text-sm font-black text-slate-950 hover:bg-violet-200"
        >
          Join the Waitlist
        </button>
      </div>
    </section>
  );
}

function WaitlistSection() {
  const [form, setForm] = useState({ name: "", email: "", interest: "Digital Assets" });
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("calo_waitlist") || "[]").length;
    } catch {
      return 0;
    }
  });

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    // Save to localStorage
    const entry = { ...form, createdAt: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem("calo_waitlist") || "[]");
    localStorage.setItem("calo_waitlist", JSON.stringify([entry, ...existing]));
    setCount(existing.length + 1);

    // Send email using EmailJS
    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      interest: form.interest,
      to_email: 'protection@calocapital.io',
      message: `New waitlist signup: ${form.name} (${form.email}) is interested in ${form.interest}`,
      reply_to: form.email
    };

    // Note: You'll need to set up EmailJS service with these IDs
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        setJoined(true);
        setForm({ name: "", email: "", interest: "Digital Assets" });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        // Still show success since we saved locally
        setJoined(true);
        setForm({ name: "", email: "", interest: "Digital Assets" });
        setLoading(false);
      });
  }

  return (
    <section id="waitlist" className="relative overflow-hidden bg-[#070a14] px-5 py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(34,211,238,.12),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(196,181,253,.13),transparent_30%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="mb-3 text-sm font-black uppercase tracking-[0.3em] text-cyan-200">Waitlist</p>
          <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">Build excitement before the full platform launches.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Visitors can join the Calo Capital waitlist for early updates, consultation openings, market education, and future platform tools.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              [count + 128, "Early members"],
              ["60 sec", "Signup time"],
              ["Free", "Early access"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-2xl font-black text-cyan-100">{value}</p>
                <p className="mt-1 text-sm text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-cyan-200/20 bg-white/[0.05] p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-md lg:p-8">
          {joined && <div className="mb-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm font-bold text-emerald-200">✅ You're on the waitlist! An email has been sent to protection@calocapital.io</div>}
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-200">Name</span>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-[#070a14] px-4 py-3 text-white outline-none ring-cyan-300/30 focus:ring-4" placeholder="Your name" />
          </label>
          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-bold text-slate-200">Email</span>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-[#070a14] px-4 py-3 text-white outline-none ring-cyan-300/30 focus:ring-4" placeholder="you@email.com" />
          </label>
          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-bold text-slate-200">What are you interested in?</span>
            <select value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-[#070a14] px-4 py-3 text-white outline-none ring-cyan-300/30 focus:ring-4">
              <option>Digital Assets</option>
              <option>Insurance Planning</option>
              <option>Lending Solutions</option>
              <option>Consultation</option>
            </select>
          </label>
          <button disabled={loading} className="mt-5 w-full rounded-2xl bg-cyan-300 px-6 py-4 font-black text-slate-950 transition hover:bg-cyan-200 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Sending..." : "Join Waitlist →"}
          </button>
          <p className="mt-4 text-center text-xs leading-5 text-slate-400">No spam. Your information will be sent to protection@calocapital.io for follow-up.</p>
        </form>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const saved = { ...form, createdAt: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem("calo_leads") || "[]");
    localStorage.setItem("calo_leads", JSON.stringify([saved, ...existing]));
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  }

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
                {["LinkedIn", "Facebook", "Instagram", "X"].map((item) => (
                  <span key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-[#0d1322]/90 p-8 shadow-xl backdrop-blur-md">
            {submitted && (
              <div className="mb-5 rounded-xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm font-bold text-emerald-200">
                Message sent successfully.
              </div>
            )}

            <label className="block">
              <span className="mb-2 block text-sm font-bold">Name</span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#070a14] px-4 py-3 text-white outline-none"
                placeholder="Your name"
              />
            </label>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-bold">Email</span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#070a14] px-4 py-3 text-white outline-none"
                placeholder="you@example.com"
              />
            </label>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-bold">Message</span>
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows="5"
                className="w-full resize-none rounded-xl border border-white/10 bg-[#070a14] px-4 py-3 text-white outline-none"
                placeholder="How can we help you?"
              />
            </label>

            <button className="mt-6 w-full rounded-xl bg-violet-300 px-6 py-4 font-black text-slate-950 transition hover:bg-violet-200">
              Send Message →
            </button>
          </form>
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
            A Creative Approach to Helping You Take
            <br className="hidden sm:block" /> Control of Your Money.
          </h2>
          <div className="mx-auto mt-9 h-px w-24 bg-violet-300/40" />
          <p className="mx-auto mt-9 max-w-3xl text-base leading-8 text-blue-300/80 sm:text-lg">
            At CaloCapital, we help you go from feeling unsure about money to feeling in control. If your plan doesn't add up, your retirement feels shaky, or your risks are unclear, we help you see what's wrong and fix it. We bring together insurance, lending, and modern tools like crypto so your money can grow, stay safe, and be easy to use. Our style is simple: we ask smart questions, listen closely, and build a plan that lowers stress and builds confidence. We're here to help you protect your family, grow your wealth, and plan for the future with clarity.
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
          <h2 className="text-3xl font-black sm:text-4xl">Let's build your financial plan</h2>
          <p className="mt-5 text-lg text-blue-300/75">Ready to take the first step? Reach out and we'll get started.</p>
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

                {/* linkedin icon */}
                <button className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-[#0b0f1d]/80 p-3 text-sm text-white backdrop-blur hover:bg-violet-300 hover:text-black transition">
                  in
                </button>
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
      <CTASection />
    </>
  );
}

function WaitlistPage() {
  return (
    <>
      <PageHeader
        eyebrow="Waitlist"
        title="Join the Calo Capital early access waitlist."
        description="Get updates about consultation openings, market education, and future financial tools."
      />
      <WaitlistSection />
    </>
  );
}

function Footer() {
  const serviceLinks = ["Premium Insurance", "Bespoke Credit", "Digital Assets", "Wealth Strategy"];
  const companyLinks = ["Our Philosophy", "Leadership", "Client Excellence", "Contact"];

  return (
    <footer className="border-t border-white/10 bg-[#070a14] px-5 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
            Insurance, lending, and digital asset education presented through a premium custom React website.
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
      {currentPage === "Waitlist" && <WaitlistPage />}
      {currentPage !== "Waitlist" && <WaitlistPromptCard />}
      <Footer />
    </main>
  );
}
