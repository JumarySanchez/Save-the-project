import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CandlestickSeries, createChart } from "lightweight-charts";
import FinancingSections from "./FinancingSections.jsx";
import { LEGAL_UPDATED, privacyIntro, privacySections, termsIntro, termsSections } from "./legalContent.js";
import { faqGroups } from "./faqContent.js";
import logoPng from "../public/Calo_purple_logo.png";
import galaxyCoverPng from "./assets/purple-galaxy.png";
import hikerPng from "../assets/calo.jpg";
import heroVideoMp4 from "../assets/new.mp4";
import whyPartnerBgPng from "../assets/m.png";
import semiPng from "../assets/semi.png";
import semiWorldPng from "../assets/semi-world.png";
import socialInstagramPng from "../assets/3.png";
import socialFacebookPng from "../assets/4.png";
import socialLinkedInPng from "../assets/5.png";
import lifeDesignPng from "../assets/life-design.png";
import iraDesignPng from "../assets/IRA-design.png";
import trustDesignPng from "../assets/Trust-design.png";
import investmentDesignPng from "../assets/Investment-design.png";
import cryptoDesignPng from "../assets/Currency-design.png";
import marketChartDesignPng from "../assets/marketchart-design.png";
import fourCsPieChartPng from "../assets/piechart.png";

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
  { panel: "bg-[linear-gradient(180deg,rgba(26, 35, 64,0.9)_0%,rgba(5, 8, 22,0.96)_100%)]", accent: "Cash Layer" },
  { panel: "bg-[linear-gradient(180deg,rgba(26, 35, 64,0.9)_0%,rgba(5, 8, 22,0.96)_100%)]", accent: "Digital Layer" },
  { panel: "bg-[linear-gradient(180deg,rgba(26, 35, 64,0.9)_0%,rgba(5, 8, 22,0.96)_100%)]", accent: "Real Asset Layer" },
  { panel: "bg-[linear-gradient(180deg,rgba(26, 35, 64,0.9)_0%,rgba(5, 8, 22,0.96)_100%)]", accent: "Business Layer" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/calocapital/",
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
    href: "https://www.linkedin.com/company/calocapital/posts/?feedView=all",
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
        className="inline-flex items-center gap-2 rounded-full border border-[#B7C0D8]/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-[#B7C0D8] transition hover:border-[#C6B8FF]/35 hover:bg-[#6D5EF5]/10 hover:text-[#F4F7FB]"
    >
      {item.icon}
      <span>{item.label}</span>
    </a>
  );
}

const SCHEDULE_CALL_URL = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1B5aYsQO11ULfIFT4BjQaiNTGM7OpuiwePgYL8e7gd_Uu1whzy5OFY-JDIXtxnpjqocqG1IaH3";
const FINANCIAL_TOPICS_ROUTE = "/financial-topics";

const HOMEPAGE_TOPICS_DISCLAIMER =
  "This information is provided for general informational purposes only and should not be considered financial, investment, insurance, legal, or tax advice. Financial decisions should be discussed with appropriately qualified professionals.";

const financialTopics = [
  {
    id: "protecting-your-family",
    title: "Protecting Your Family",
    hook: "Protection starts with clarity before urgency.",
    shortDescription:
      "Explore general life insurance concepts and the questions people may consider when preparing for unexpected events and protecting those who depend on them.",
    intro:
      "Life insurance is generally designed to provide financial support to selected beneficiaries after the insured person's death. A person's family responsibilities, income, debts, future expenses, and long-term goals may influence the type and amount of coverage they consider.",
    concepts: [
      "The general purpose of life insurance",
      "Term life insurance",
      "Permanent life insurance",
      "Beneficiaries",
      "Coverage amounts",
      "Premiums",
      "Policy exclusions and limitations",
      "The importance of reviewing a policy carefully",
    ],
    professional:
      "A properly licensed insurance professional who is authorized to discuss or sell insurance products in your state.",
    evaluate: [
      "Ask what insurance licenses they hold",
      "Verify that the license is active",
      "Ask which companies they represent",
      "Determine whether they represent one company or multiple insurers",
      "Ask how they are compensated",
      "Request a clear explanation of costs, exclusions, limitations, and cancellation terms",
    ],
    firstConversationQuestions: [
      "What type of coverage are you recommending, and why?",
      "What is included and excluded?",
      "How long are premiums expected to remain the same?",
      "Can the premium or benefit change?",
      "What happens if I miss a payment?",
      "Are there surrender charges or cancellation fees?",
      "How are you compensated?",
      "What alternatives should I compare?",
    ],
    redFlags: [
      "Pressure to sign immediately",
      "Guaranteed claims that are not supported by policy documents",
      "Refusal to explain exclusions or fees",
      "Avoiding questions about licensing",
      "Recommending coverage without asking about your needs",
      "Asking you to provide sensitive information through an unsecured method",
    ],
  },
  {
    id: "retirement-and-iras",
    title: "Retirement and IRAs",
    hook: "A stronger retirement plan begins with better questions today.",
    shortDescription:
      "Understand common retirement priorities, the general role of IRAs, and the factors people may consider while preparing for their future.",
    intro:
      "Retirement planning generally involves evaluating future income needs, savings, time horizon, taxes, account rules, and personal risk tolerance. An IRA is one type of account that may be used as part of a broader retirement strategy.",
    concepts: [
      "The general purpose of retirement planning",
      "Traditional IRAs",
      "Roth IRAs",
      "Employer-sponsored retirement accounts",
      "Contribution rules",
      "Withdrawal rules",
      "Potential tax considerations",
      "Time horizon and risk",
    ],
    professional:
      "A properly registered or licensed financial professional may be appropriate, with a qualified tax professional for tax-specific questions and an attorney for legal or estate-planning issues.",
    evaluate: [
      "Ask what qualifications or registrations they hold",
      "Ask whether they are acting as a fiduciary during the engagement",
      "Ask how they are compensated",
      "Ask what fees may apply directly or indirectly",
      "Ask how recommendations fit your time horizon",
      "Confirm which questions should be directed to a tax professional",
    ],
    firstConversationQuestions: [
      "What qualifications or registrations do you hold?",
      "Are you acting as a fiduciary during this engagement?",
      "How are you compensated?",
      "What fees would I pay directly or indirectly?",
      "How does this approach reflect my time horizon?",
      "What risks should I understand?",
      "What tax questions should I discuss with a tax professional?",
      "Are there penalties or restrictions associated with withdrawals?",
    ],
    redFlags: [
      "Guaranteed retirement returns",
      "Pressure to move retirement funds immediately",
      "Vague or hidden fees",
      "Recommendations made before understanding your circumstances",
      "Advice to withdraw or transfer funds without explaining possible consequences",
      "Requests to send money to a personal account",
    ],
  },
  {
    id: "trusts-and-legacy",
    title: "Trusts and Legacy Planning",
    hook: "Legacy planning is about decisions that remain useful over time.",
    shortDescription:
      "Learn how wills, trusts, beneficiaries, and organized financial documents may contribute to a thoughtful legacy plan.",
    intro:
      "Legacy planning may involve organizing assets, reviewing beneficiaries, preparing legal documents, and deciding how property should be handled in the future. Trusts and wills serve different purposes and may require qualified legal guidance.",
    concepts: [
      "The general purpose of a will",
      "The general purpose of a trust",
      "Beneficiary designations",
      "Asset organization",
      "Powers of attorney",
      "Healthcare directives",
      "The role of an executor or trustee",
      "The importance of reviewing plans after major life changes",
    ],
    professional:
      "A qualified estate-planning attorney is generally appropriate. Tax questions may also require a qualified tax professional.",
    evaluate: [
      "Ask whether they regularly handle estate-planning matters",
      "Verify that the attorney is licensed to practice in your state",
      "Ask what documents may be appropriate for your circumstances",
      "Ask for total costs and any ongoing maintenance costs",
      "Ask how beneficiary designations should coordinate with the plan",
      "Ask how often the plan should be reviewed",
    ],
    firstConversationQuestions: [
      "Do you regularly handle estate-planning matters?",
      "Are you licensed to practice law in my state?",
      "What documents may be appropriate for my circumstances?",
      "What are the total costs?",
      "Who will be responsible for maintaining or updating the documents?",
      "How should beneficiary designations coordinate with the plan?",
      "Which decisions require tax guidance?",
      "How often should the plan be reviewed?",
    ],
    redFlags: [
      "A non-attorney offering individualized legal advice",
      "Generic documents presented as appropriate for everyone",
      "No discussion of state-specific requirements",
      "Unclear fees",
      "Pressure to transfer assets without a clear explanation",
      "No explanation of trustee responsibilities",
    ],
  },
  {
    id: "investments-and-wealth",
    title: "Investments and Wealth Building",
    hook: "Long-term growth decisions work best when risk is understood first.",
    shortDescription:
      "Explore foundational investment concepts, including time horizon, diversification, personal goals, and the relationship between potential opportunity and risk.",
    intro:
      "Investing involves the possibility of gains and losses. Time horizon, financial goals, liquidity needs, diversification, fees, and risk tolerance may all influence how someone evaluates investment options.",
    concepts: [
      "Risk and return",
      "Time horizon",
      "Diversification",
      "Liquidity",
      "Investment fees",
      "Market volatility",
      "Personal financial goals",
      "The possibility of losing money",
    ],
    professional:
      "A properly registered investment professional or other appropriately qualified financial professional may be appropriate, depending on the requested service.",
    evaluate: [
      "Ask for their full legal name and firm",
      "Ask what licenses or registrations they hold",
      "Independently verify their professional background",
      "Ask whether they are acting as a fiduciary",
      "Request written fee and conflict-of-interest disclosures",
      "Ask where assets would be held",
      "Confirm that accounts are not held in the professional's personal name",
    ],
    firstConversationQuestions: [
      "What services do you provide?",
      "What registrations or licenses do you hold?",
      "Are you acting as a fiduciary?",
      "How are you compensated?",
      "What fees and expenses may apply?",
      "What risks are involved?",
      "Where would my assets be held?",
      "How can I independently view my account?",
      "What conflicts of interest should I understand?",
      "What happens if I decide to end the relationship?",
    ],
    redFlags: [
      "Guaranteed or unusually consistent returns",
      "Pressure to act immediately",
      "Secrecy surrounding the investment strategy",
      "Refusal to provide written documentation",
      "Requests to transfer money to a personal account",
      "Difficulty verifying the professional or firm",
      "Claims that an opportunity has no risk",
      "Discouraging you from seeking a second opinion",
    ],
  },
  {
    id: "cryptocurrency",
    title: "Cryptocurrency and Digital Assets",
    hook: "Digital assets require security discipline as much as market awareness.",
    shortDescription:
      "Build a clearer understanding of cryptocurrency, market volatility, digital security, and the risks that should be considered before making financial decisions.",
    intro:
      "Cryptocurrency and digital assets can experience significant price changes and may involve technology, custody, fraud, liquidity, and regulatory risks. Visitors should understand how an asset works and how it would be stored before making a decision.",
    concepts: [
      "Market volatility",
      "Digital wallets",
      "Private keys and seed phrases",
      "Custodial and self-custodial storage",
      "Exchange risk",
      "Scams and impersonation",
      "Liquidity",
      "The possibility of permanent loss",
    ],
    professional:
      "A properly qualified professional for the specific service being offered, with verifiable licensing or registration where required.",
    evaluate: [
      "Ask what professional qualifications they hold",
      "Ask whether they are registered or licensed for the service being offered",
      "Ask how they are compensated",
      "Ask who controls the digital assets",
      "Ask where assets will be stored",
      "Ask what fees apply and whether assets can be withdrawn",
      "Ask how claims can be independently verified",
    ],
    firstConversationQuestions: [
      "What professional qualifications do you hold?",
      "Are you registered or licensed for the service you are offering?",
      "How are you compensated?",
      "Who controls the digital assets?",
      "Where will the assets be stored?",
      "What fees apply?",
      "What happens if the platform fails?",
      "Can I withdraw my assets?",
      "What are the major risks?",
      "How can I independently verify your claims?",
    ],
    redFlags: [
      "Guaranteed profits",
      "Promises of fast or risk-free returns",
      "Requests for a wallet seed phrase or private key",
      "Pressure to transfer funds immediately",
      "Unsolicited direct messages about investments",
      "Fake celebrity endorsements",
      "Requests to install unknown remote-access software",
      "Instructions to send cryptocurrency to unlock funds or pay an unexpected fee",
    ],
  },
  {
    id: "market-charts",
    title: "Understanding Market Charts",
    hook: "Charts can describe what happened, not promise what happens next.",
    shortDescription:
      "Learn the basic parts of a candlestick chart, including open, close, high, and low, and understand what market charts can and cannot communicate.",
    intro:
      "Market charts organize historical price information. They may help visitors observe past price movements, but they cannot guarantee or predict what a market will do next.",
    concepts: [
      "Open price",
      "Close price",
      "Highest price",
      "Lowest price",
      "Bullish candles",
      "Bearish candles",
      "Time intervals",
      "Volume",
      "Historical data",
      "The limitations of chart-based analysis",
    ],
    professional:
      "A qualified professional who can clearly explain whether they are providing general educational information or personalized recommendations, and whose qualifications can be independently verified.",
    evaluate: [
      "Ask what data source is being used",
      "Ask whether information is current or delayed",
      "Ask what the selected time interval represents",
      "Ask what limitations apply to the analysis",
      "Ask which risks are not visible on the chart",
      "Ask what qualifications they hold and how they are compensated",
    ],
    firstConversationQuestions: [
      "What data source is being used?",
      "Is the information current or delayed?",
      "What does the selected time interval represent?",
      "What are the limitations of this analysis?",
      "What risks are not visible on the chart?",
      "Are you providing general information or a personalized recommendation?",
      "What qualifications do you hold?",
      "How are you compensated?",
    ],
    redFlags: [
      "Claims that a chart guarantees the next market movement",
      "Secret indicators promising certain returns",
      "Refusal to discuss risk",
      "Selectively showing only successful predictions",
      "Pressure to purchase a trading signal or investment immediately",
      "Presenting historical performance as a guaranteed future result",
    ],
  },
];

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
        const symbols = [
          { symbol: "BTC", pair: "XBTUSD", resultKey: "XXBTZUSD" },
          { symbol: "ETH", pair: "ETHUSD", resultKey: "XETHZUSD" },
          { symbol: "SOL", pair: "SOLUSD", resultKey: "SOLUSD" },
          { symbol: "XRP", pair: "XRPUSD", resultKey: "XXRPZUSD" },
          { symbol: "ADA", pair: "ADAUSD", resultKey: "ADAUSD" },
        ];
        const response = await fetch(
          `https://api.kraken.com/0/public/Ticker?pair=${symbols.map((item) => item.pair).join(",")}`,
          { headers: { Accept: "application/json" } }
        );

        if (!response.ok) throw new Error(`Market feed returned ${response.status}`);
        const payload = await response.json();
        if (payload.error?.length) throw new Error(payload.error.join(", "));

        if (cancelled) return;

        let liveCount = 0;
        const nextCoins = symbols.map(({ symbol, resultKey }) => {
          const fallback = FALLBACK_COINS.find((coin) => coin.symbol === symbol);
          const item = payload.result?.[resultKey];
          if (!item || !fallback) return fallback;

          const price = Number(item.c?.[0]);
          const openingPrice = Number(item.o);
          if (!Number.isFinite(price) || !Number.isFinite(openingPrice) || openingPrice <= 0) return fallback;

          liveCount += 1;
          const change = openingPrice > 0 ? ((price - openingPrice) / openingPrice) * 100 : fallback.change;

          return {
            symbol: fallback.symbol,
            name: fallback.name,
            price,
            change: Number.isFinite(change) ? change : fallback.change,
          };
        });

        setCoins(nextCoins);
        setLive(liveCount === symbols.length);
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
    <div className="relative z-40 overflow-hidden border-b border-[#B7C0D8]/10 bg-[#050816]/95 text-[#F4F7FB]">
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
        <span className="rounded-full border border-[#6D5EF5]/25 bg-[#6D5EF5]/10 px-2 py-1 text-[#9B7CFF]">
          {live ? "Live" : "Fallback"}
        </span>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="ticker-track flex w-max items-center gap-3 whitespace-nowrap sm:gap-6">
            {items.map((item, index) => (
              <div key={`${item.symbol}-${index}`} className="flex items-center gap-2 whitespace-nowrap text-[#B7C0D8]">
                <span className="text-[#B7C0D8]">{item.symbol}</span>
                <span className="font-body text-[#F4F7FB]">{formatPrice(item.price)}</span>
                <span className={item.change >= 0 ? "text-[#9B7CFF]" : "text-[#C6B8FF]"}>
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

function Logo({ logoSizeClass = "h-12 sm:h-16", textSizeClass = "text-base sm:text-lg", taglineClass = "text-[9px] uppercase tracking-[0.2em] text-[#9B7CFF]/70 sm:text-xs" }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <img
        src={logoPng}
        alt="Calo Capital Logo"
        className={`${logoSizeClass} w-auto shrink-0 self-center object-contain`}
        style={{ background: 'transparent' }}
      />
      <div className="min-w-0 text-left leading-tight">
        <p className={`${textSizeClass} font-black tracking-wide text-[#F4F7FB]`}>Calo Capital</p>
        <p className={`${taglineClass} whitespace-normal`}>Where Strategy Meets Legacy</p>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section id="home" className="relative min-h-[70svh] overflow-hidden bg-[#050816] text-[#F4F7FB] sm:min-h-[80svh] lg:min-h-[90svh]">
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
  Home: "/",
  Explore: "/",
  "Four C's": "/financial-topics#four-cs",
  Contact: "/",
  "Financial Topics": FINANCIAL_TOPICS_ROUTE,
  Legal: "/legal",
  FAQs: "/faqs",
};

function normalizePath(pathname) {
  return pathname.replace(/\/+$/, "") || "/";
}

function getPageFromLocation() {
  const normalizedPath = normalizePath(window.location.pathname);
  if (normalizedPath === FINANCIAL_TOPICS_ROUTE || normalizedPath === "/four-cs") return "Financial Topics";
  if (normalizedPath === "/why-invest") return "Explore";
  if (normalizedPath === "/contact") return "Contact";
  if (normalizedPath === "/legal") return "Legal";
  if (normalizedPath === "/faqs") return "FAQs";
  return "Home";
}

function scrollToFinancialTopicsLocation() {
  const targetId = window.location.hash.slice(1) || (normalizePath(window.location.pathname) === "/four-cs" ? "four-cs" : "");
  if (targetId) {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function getHomeSectionFromPage(page) {
  if (page === "Explore" || page === "Why invest") return "crypto-candlestick";
  if (page === "Contact") return "contact";
  return "";
}

function scrollToHomeSection(page) {
  const sectionId = getHomeSectionFromPage(page);
  if (!sectionId) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

const NAV_ITEMS = [
  { label: "Home", section: "home" },
  { label: "Approach", section: "approach" },
  { label: "How It Works", section: "how" },
  { label: "Qualify", section: "qualify" },
  {
    label: "Financing",
    section: "financing",
    children: [
      { label: "Industries", section: "industries" },
      { label: "Market", section: "crypto-candlestick" },
      { label: "Resources", section: "resources" },
      { label: "FAQs", page: "FAQs" },
    ],
  },
  { label: "Financial Topics", page: "Financial Topics" },
  { label: "Contact", page: "Contact" },
];

const NAV_SECTION_IDS = NAV_ITEMS.flatMap((item) => [item, ...(item.children || [])]).filter((item) => item.section).map((item) => item.section);

function Navbar({ currentPage, setPage, goToSection }) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const onHome = !["Financial Topics", "Four C's", "Contact", "FAQs", "Legal"].includes(currentPage);

  useEffect(() => {
    if (!onHome) return undefined;
    const sections = NAV_SECTION_IDS;
    function update() {
      let active = "home";
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) active = id;
      });
      setActiveSection(active);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [onHome, currentPage]);

  function isActive(item) {
    if (item.children) return item.children.some(isActive) || (onHome && activeSection === item.section);
    if (item.section) return onHome && activeSection === item.section;
    if (item.page === "Financial Topics") return currentPage === "Financial Topics" || currentPage === "Four C's";
    return currentPage === item.page;
  }

  function handleClick(item) {
    setOpen(false);
    if (item.section) goToSection(item.section);
    else setPage(item.page);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#B7C0D8]/10 bg-[#050816]/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[min(96vw,1500px)] items-center justify-between gap-4 px-4 py-3 sm:px-5">
        <button onClick={() => handleClick({ section: "home" })} aria-label="Calo Capital home" className="shrink-0 text-left">
          <Logo />
        </button>

        <nav aria-label="Main" className="hidden min-w-0 flex-1 items-center justify-center gap-x-4 xl:flex 2xl:gap-x-6">
          {NAV_ITEMS.map((item) => {
            const button = (
              <button
                onClick={() => handleClick(item)}
                aria-current={isActive(item) ? "page" : undefined}
                aria-haspopup={item.children ? "menu" : undefined}
                className={`whitespace-nowrap border-b-2 px-1 py-1 text-[13px] transition ${
                  isActive(item)
                    ? "border-[#9B7CFF] font-black text-[#F4F7FB]"
                    : "border-transparent font-semibold text-[#B7C0D8] hover:text-[#F4F7FB]"
                }`}
              >
                {item.label}
                {item.children ? " ▾" : ""}
              </button>
            );
            if (!item.children) return <div key={item.label}>{button}</div>;
            return (
              <div key={item.label} className="group relative">
                {button}
                <div className="invisible absolute left-1/2 top-full z-50 min-w-[180px] -translate-x-1/2 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div role="menu" className="rounded-xl border border-[#B7C0D8]/15 bg-[#050816] py-2 shadow-[0_14px_40px_rgba(0,0,0,0.5)]">
                    {item.children.map((child) => (
                      <button
                        key={child.label}
                        role="menuitem"
                        onClick={() => handleClick(child)}
                        className={`block w-full px-4 py-2 text-left text-[13px] transition hover:bg-[#1A2340] hover:text-[#F4F7FB] ${
                          isActive(child) ? "font-black text-[#F4F7FB]" : "font-semibold text-[#B7C0D8]"
                        }`}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
        <a
          href={SCHEDULE_CALL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="schedule-call-radiant hidden shrink-0 rounded-none px-4 py-2 text-sm font-black text-[#F4F7FB] transition xl:inline-block"
        >
          Schedule a Call
        </a>

        <button
          onClick={() => setOpen((value) => !value)}
          className="rounded-xl border border-[#B7C0D8]/15 px-3 py-2 text-[#F4F7FB] xl:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="max-h-[75vh] overflow-y-auto border-t border-[#B7C0D8]/10 bg-[#050816] px-5 py-4 xl:hidden">
          <div className="flex flex-col gap-4">
            {NAV_ITEMS.flatMap((item) => [item, ...(item.children || []).map((child) => ({ ...child, indent: true }))]).map((item) => (
              <button
                key={`${item.indent ? "child-" : ""}${item.label}`}
                onClick={() => handleClick(item)}
                className={`${item.indent ? "pl-4 " : ""}${isActive(item) ? "text-left text-sm font-black text-[#F4F7FB]" : "text-left text-sm font-semibold text-[#B7C0D8]"}`}
              >
                {item.label}
              </button>
            ))}
            <a href={SCHEDULE_CALL_URL} target="_blank" rel="noopener noreferrer" className="schedule-call-radiant rounded-none px-4 py-2 text-center text-sm font-black text-[#F4F7FB]">
              Schedule a Call
            </a>
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
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050816] via-[#050816]/75 to-transparent" />
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
      toolbar_bg: "#050816",
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
        "paneProperties.background": "#050816",
        "paneProperties.vertGridProperties.color": "#1A2340",
        "paneProperties.horzGridProperties.color": "#1A2340",
        "paneProperties.crossHairProperties.color": "#C6B8FF",
        "paneProperties.crossHairProperties.style": 2,
        "scalesProperties.textColor": "#B7C0D8",
        "scalesProperties.lineColor": "#1A2340",
        "mainSeriesProperties.candleStyle.upColor": "#6D5EF5",
        "mainSeriesProperties.candleStyle.downColor": "#F4F7FB",
        "mainSeriesProperties.candleStyle.borderUpColor": "#6D5EF5",
        "mainSeriesProperties.candleStyle.borderDownColor": "#F4F7FB",
        "mainSeriesProperties.candleStyle.wickUpColor": "#6D5EF5",
        "mainSeriesProperties.candleStyle.wickDownColor": "#F4F7FB",
        "symbolWatermarkProperties.color": "#1A2340",
      },
      studies_overrides: {
        "volume.volume.color.0": "#F4F7FB",
        "volume.volume.color.1": "#6D5EF5",
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
    <div className="relative overflow-hidden rounded-3xl border border-[#C6B8FF]/20 bg-[#050816]/85 p-4 shadow-2xl shadow-[#050816]/35 backdrop-blur-md sm:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.32em] text-[#B7C0D8]">Asset Selector</p>
          <p className="mt-1 text-xs text-[#B7C0D8]">Switch between crypto, stocks, and ETFs</p>
        </div>
        <label className="flex flex-col gap-2 text-xs font-black uppercase tracking-[0.28em] text-[#B7C0D8] sm:flex-row sm:items-center sm:gap-3">
          <span className="whitespace-nowrap">Asset</span>
          <select
            value={selectedSymbol}
            onChange={(event) => setSelectedSymbol(event.target.value)}
            className="w-full min-w-0 rounded-xl border border-[#B7C0D8]/10 bg-[#050816] px-3 py-2 font-body text-xs font-black tracking-[0.18em] text-[#F4F7FB] outline-none transition focus:border-[#C6B8FF]/40 sm:min-w-[180px] sm:w-auto"
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
            <span className="font-body text-xs font-black text-[#B7C0D8]">{selectedAsset.display}</span>
            <span className="rounded bg-[#6D5EF5]/10 px-2 py-0.5 text-xs font-bold text-[#9B7CFF]">INTERACTIVE</span>
          </div>
          <p className="mt-1 font-body text-2xl font-black text-[#F4F7FB] sm:text-3xl">{formatPrice(selectedAsset.price)}</p>
        </div>
        <div className="text-left sm:text-right">
          <p className={selectedAsset.change >= 0 ? "font-body text-lg font-black text-[#9B7CFF] sm:text-xl" : "font-body text-lg font-black text-[#C6B8FF] sm:text-xl"}>{selectedAsset.change >= 0 ? "+" : ""}{selectedAsset.change.toFixed(2)}%</p>
          <p className="text-xs text-[#B7C0D8]">24h Performance</p>
        </div>
      </div>
      <div className="relative overflow-visible rounded-2xl border border-[#C6B8FF]/20 bg-[#050816] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-[#C6B8FF]/25 bg-[#050816]/65 px-2 py-0.5 font-body text-[10px] font-black uppercase tracking-[0.16em] text-[#9B7CFF]">
          Momentum
        </div>
        <div className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-[#C6B8FF]/25 bg-[#050816]/65 px-2 py-0.5 font-body text-[10px] font-black uppercase tracking-[0.16em] text-[#9B7CFF]">
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
    <section ref={sectionRef} id="services" className="cc-guidance-section px-5 pb-20 pt-12 text-[#F4F7FB] sm:pb-24 sm:pt-16">
      <style>{`
        .cc-guidance-section {
          background-color: #050816;
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
          color: #9B7CFF;
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
          background: #9B7CFF;
        }
        .cc-guidance-title {
          margin-top: 1.6rem;
          color: #F4F7FB;
          font-family: var(--font-display);
          font-size: clamp(2.05rem, 5.6vw, 4.2rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.08;
          text-wrap: balance;
        }
        .cc-guidance-title-accent {
          color: #9B7CFF;
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
          border-top: 1px solid #1A2340;
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
          border-left: 1px solid #1A2340;
        }
        .cc-guidance-col-title {
          color: #F4F7FB;
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
          background: #9B7CFF;
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
          color: #9B7CFF;
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
            border-left: 1px solid #1A2340;
          }
          .cc-guidance-col:nth-child(n + 3) {
            border-top: 1px solid #1A2340;
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
            border-top: 1px solid #1A2340;
          }
          .cc-guidance-col:nth-child(n + 3) {
            border-top: 1px solid #1A2340;
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
    <section className="relative overflow-hidden bg-[#050816] px-5 py-20 text-[#F4F7FB]">
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${hikerPng})` }} />
      <div className="relative mx-auto w-full max-w-[94vw]">
        <Logo />
        <p className="mt-10 text-sm font-black uppercase tracking-[0.3em] text-[#9B7CFF]">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#B7C0D8]">{description}</p>
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
        className={`cc-about-section relative overflow-hidden px-5 py-10 text-[#F4F7FB] sm:py-14 lg:py-8 ${hasJs ? "cc-about-js" : ""} ${isVisible ? "cc-about-animated" : ""} ${reduceMotion ? "cc-about-reduced-motion" : ""}`}
      >
        <style>{`
          .cc-about-section {
            position: relative;
            overflow: hidden;
            isolation: isolate;
            background: transparent;
          }
          .cc-about-inner {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            width: min(100%, 1400px);
            height: 100%;
            margin-inline: auto;
            padding-inline: clamp(1.25rem, 5vw, 5rem);
          }
          .cc-about-copy {
            width: min(100%, 56rem);
            max-width: 56rem;
          }
          .cc-about-eyebrow {
            display: inline-block;
            transition-property: opacity, transform, filter;
            transition-duration: 760ms;
            transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          }
          .cc-about-heading {
            max-width: 14ch;
            font-family: var(--font-display);
            font-size: clamp(2.5rem, 4.6vw, 5rem);
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
            font-size: 18px;
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
              width: min(100%, 56rem);
            }
          }
          @media (max-width: 1023px) {
            .cc-about-copy {
              width: min(100%, 48rem);
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
              top: auto;
              right: -8vw;
              bottom: -9rem;
              width: min(62vw, 280px);
              transform: translateX(32px) scale(0.985);
            }
            .cc-about-animated .cc-about-crypto-art-inner,
            .cc-about-reduced-motion .cc-about-crypto-art-inner {
              transform: translateX(0) scale(1);
            }
            .cc-about-heading {
              max-width: 14ch;
              font-size: clamp(2.4rem, 9vw, 3.6rem);
              line-height: 1.03;
            }
            .cc-about-paragraph {
              font-size: 17px;
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
          }
        `}</style>

        <div className="cc-about-inner relative">
          <div className="cc-about-copy">
            <p className="cc-about-eyebrow cc-about-animate text-xs font-black uppercase tracking-[0.42em] text-[#9B7CFF]" style={reduceMotion ? undefined : { transitionDelay: "0ms" }}>
              About Calo Capital
            </p>
            <h1 className="cc-about-heading mt-6 text-[#F4F7FB]" data-cc-about-split="true">
              {headingWords.map((word, index) => {
                const label = word.text;
                const isAccent = word.accent;

                return (
                  <span
                    key={`${label}-${index}`}
                    className={`cc-about-heading-word cc-about-animate${isAccent ? " text-[#9B7CFF]" : ""}`}
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
            <p className="cc-about-paragraph cc-about-animate mt-6 text-[22px] leading-[1.6] text-[#F4F7FB]" style={reduceMotion ? undefined : { transitionDelay: "1180ms" }}>
              {paragraphWords.join(" ")}
            </p>
            <div className="cc-about-underline cc-about-animate mt-8 h-px w-12 bg-[#9B7CFF]" style={reduceMotion ? undefined : { transitionDelay: "1550ms" }} />
          </div>
        </div>
      </section>
    </>
  );
}

function CryptoCandlestickSection() {
  const cryptoSymbols = [
    { label: "BTC/USD", marketSymbol: "BTCUSDT" },
    { label: "ETH/USD", marketSymbol: "ETHUSDT" },
    { label: "SOL/USD", marketSymbol: "SOLUSDT" },
    { label: "XRP/USD", marketSymbol: "XRPUSDT" },
    { label: "ADA/USD", marketSymbol: "ADAUSDT" },
    { label: "DOGE/USD", marketSymbol: "DOGEUSDT" },
    { label: "AVAX/USD", marketSymbol: "AVAXUSDT" },
    { label: "LINK/USD", marketSymbol: "LINKUSDT" },
  ];
  const [selectedSymbol, setSelectedSymbol] = useState(cryptoSymbols[0].marketSymbol);
  const [chartStatus, setChartStatus] = useState("Connecting to live market feed...");
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current || chartRef.current) return;

    const container = chartContainerRef.current;
    const chart = createChart(container, {
      width: container.clientWidth,
      height: container.clientHeight,
      layout: {
        background: { color: "#050816" },
        textColor: "#B7C0D8",
      },
      grid: {
        vertLines: { color: "#1A2340" },
        horzLines: { color: "#1A2340" },
      },
      crosshair: {
        vertLine: { color: "#C6B8FF" },
        horzLine: { color: "#C6B8FF" },
      },
      rightPriceScale: {
        borderColor: "#1A2340",
      },
      timeScale: {
        borderColor: "#1A2340",
        timeVisible: true,
      },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#6D5EF5",
      downColor: "#F4F7FB",
      borderUpColor: "#6D5EF5",
      borderDownColor: "#F4F7FB",
      wickUpColor: "#6D5EF5",
      wickDownColor: "#F4F7FB",
    });

    chartRef.current = chart;
    seriesRef.current = series;

    const resizeObserver = new ResizeObserver(() => {
      chart.applyOptions({
        width: container.clientWidth,
        height: container.clientHeight,
      });
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
    let cancelled = false;
    setChartStatus(`Loading ${selectedSymbol.replace("USDT", "/USD")} market data...`);

    function buildFallbackCandles(basePrice) {
      const nowSeconds = Math.floor(Date.now() / 1000);
      const fourHours = 60 * 60 * 4;
      let current = basePrice;

      return Array.from({ length: 120 }, (_, index) => {
        const drift = (Math.sin(index / 7) * 0.007 + (Math.random() - 0.5) * 0.01) * current;
        const open = current;
        const close = Math.max(0.0001, current + drift);
        const high = Math.max(open, close) + Math.abs(drift) * 0.45;
        const low = Math.min(open, close) - Math.abs(drift) * 0.45;
        current = close;

        return {
          time: nowSeconds - (120 - index) * fourHours,
          open,
          high,
          low,
          close,
        };
      });
    }

    async function loadData() {
      if (!seriesRef.current || !chartRef.current) return;

      const coinbaseProductBySymbol = {
        BTCUSDT: "BTC-USD",
        ETHUSDT: "ETH-USD",
        SOLUSDT: "SOL-USD",
        XRPUSDT: "XRP-USD",
        ADAUSDT: "ADA-USD",
        DOGEUSDT: "DOGE-USD",
        AVAXUSDT: "AVAX-USD",
        LINKUSDT: "LINK-USD",
      };
      const coinGeckoCoinBySymbol = {
        BTCUSDT: "bitcoin",
        ETHUSDT: "ethereum",
        SOLUSDT: "solana",
        XRPUSDT: "ripple",
        ADAUSDT: "cardano",
        DOGEUSDT: "dogecoin",
        AVAXUSDT: "avalanche-2",
        LINKUSDT: "chainlink",
      };
      const fallbackPriceBySymbol = {
        BTCUSDT: 64000,
        ETHUSDT: 3100,
        SOLUSDT: 160,
        XRPUSDT: 0.62,
        ADAUSDT: 0.45,
        DOGEUSDT: 0.16,
        AVAXUSDT: 34,
        LINKUSDT: 16,
      };

      function normalizeCandles(candles) {
        const chartData = candles
          .map((candle) => ({
            time: Number(candle.time),
            low: Number(candle.low),
            high: Number(candle.high),
            open: Number(candle.open),
            close: Number(candle.close),
          }))
          .filter((candle) => Number.isFinite(candle.time) && Number.isFinite(candle.low) && Number.isFinite(candle.high) && Number.isFinite(candle.open) && Number.isFinite(candle.close))
          .sort((a, b) => a.time - b.time);

        if (chartData.length === 0) {
          throw new Error("No market candle data available");
        }

        return chartData;
      }

      async function fetchCoinbaseCandles(product) {
        // Coinbase candles are [time, low, high, open, close, volume] in reverse-chronological order.
        const response = await fetch(
          `https://api.exchange.coinbase.com/products/${product}/candles?granularity=14400`,
          { headers: { Accept: "application/json" } }
        );

        if (!response.ok) {
          throw new Error(`Coinbase request failed: ${response.status}`);
        }

        const raw = await response.json();
        if (!Array.isArray(raw) || raw.length === 0) {
          throw new Error("Coinbase returned no candles");
        }

        return normalizeCandles(
          raw.map((candle) => ({
            time: candle[0],
            low: candle[1],
            high: candle[2],
            open: candle[3],
            close: candle[4],
          }))
        );
      }

      async function fetchCoinGeckoCandles(coinId) {
        // CoinGecko OHLC is [timestamp_ms, open, high, low, close].
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=30`,
          { headers: { Accept: "application/json" } }
        );

        if (!response.ok) {
          throw new Error(`CoinGecko request failed: ${response.status}`);
        }

        const raw = await response.json();
        if (!Array.isArray(raw) || raw.length === 0) {
          throw new Error("CoinGecko returned no candles");
        }

        return normalizeCandles(
          raw.map((candle) => ({
            time: Math.floor(Number(candle[0]) / 1000),
            open: candle[1],
            high: candle[2],
            low: candle[3],
            close: candle[4],
          }))
        );
      }

      try {
        const product = coinbaseProductBySymbol[selectedSymbol] || "BTC-USD";
        const coinId = coinGeckoCoinBySymbol[selectedSymbol] || "bitcoin";

        let chartData;
        try {
          chartData = await fetchCoinbaseCandles(product);
        } catch {
          chartData = await fetchCoinGeckoCandles(coinId);
        }

        if (cancelled) return;

        seriesRef.current.setData(chartData);
        chartRef.current.timeScale().fitContent();
        setChartStatus("Live market feed connected.");
      } catch {
        if (cancelled) return;
        const fallbackBase = fallbackPriceBySymbol[selectedSymbol] || 500;
        seriesRef.current.setData(buildFallbackCandles(fallbackBase));
        chartRef.current.timeScale().fitContent();
        setChartStatus("Live feed temporarily unavailable. Showing fallback candles for visual reference.");
      }
    }

    loadData();
    const refreshIntervalId = window.setInterval(loadData, 3_000);

    return () => {
      cancelled = true;
      window.clearInterval(refreshIntervalId);
    };
  }, [selectedSymbol]);

  return (
    <section
      id="crypto-candlestick"
      className="relative min-w-0 overflow-hidden bg-transparent px-5 py-8 text-[#F4F7FB] sm:py-10 lg:py-8"
    >
      <div className="mx-auto w-full max-w-[min(1400px,94vw)]">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9B7CFF]">Live Crypto Candlestick Chart</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {cryptoSymbols.map((item) => (
            <button
              key={item.marketSymbol}
              onClick={() => setSelectedSymbol(item.marketSymbol)}
              className={selectedSymbol === item.marketSymbol
                ? "rounded-none border border-[#C6B8FF] bg-[#C6B8FF]/15 px-3 py-1.5 text-xs font-black text-[#F4F7FB]"
                : "rounded-none border border-[#B7C0D8]/20 bg-transparent px-3 py-1.5 text-xs font-black text-[#9B7CFF] transition hover:border-[#C6B8FF] hover:text-[#F4F7FB]"}
              aria-pressed={selectedSymbol === item.marketSymbol}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-4 overflow-hidden border border-[#B7C0D8]/15 bg-[#050816]">
          <div
            ref={chartContainerRef}
            role="img"
            aria-label={`${selectedSymbol.replace("USDT", "/USD")} candlestick chart showing historical four-hour open, high, low, and close prices.`}
            className="h-[280px] w-full sm:h-[340px] lg:h-[240px]"
          />
          <div
            role="status"
            aria-live="polite"
            className={`flex h-[72px] items-center border-t border-[#B7C0D8]/15 px-4 py-3 text-sm leading-5 ${chartStatus.startsWith("Live feed temporarily unavailable") ? "text-[#B7C0D8]" : chartStatus.startsWith("Live market feed connected") ? "text-[#9B7CFF]" : "text-[#B7C0D8]"}`}
          >
            {chartStatus}
          </div>
          <div className="border-t border-[#B7C0D8]/10 px-4 py-3 text-xs leading-6 text-[#9B7CFF]">
            Powered by TradingView Lightweight Charts with market data feed for educational chart visualization.
          </div>
        </div>

        <div className="mt-4 bg-white/[0.02] p-4">
          <div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9B7CFF]">Understanding Market Charts</p>
              <h3 className="mt-1 text-lg font-black text-[#F4F7FB] sm:text-xl">
                Candlesticks show price movement, <span className="text-[#9B7CFF]">not certainty.</span>
              </h3>
              <p className="mt-1 text-sm leading-5 text-[#F4F7FB]">
                Each candle shows the opening, closing, highest, and lowest prices for a time period. Green or purple candles usually mean prices moved up, while lighter candles can signal a move down.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function GalaxyBackground({ shootingStars = false }) {
  return (
    <div className="calo-after-chart-sky" aria-hidden="true">
      {shootingStars && <><i /><i /><i /></>}
    </div>
  );
}

function FinancialTopicsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = 6;

  const goToSlide = (index) => {
    setActiveSlide(index);
    setIsPaused(true);
  };

  const goToPreviousSlide = () => {
    setActiveSlide((current) => (current - 1 + slideCount) % slideCount);
    setIsPaused(true);
  };

  const goToNextSlide = () => {
    setActiveSlide((current) => (current + 1) % slideCount);
    setIsPaused(true);
  };

  useEffect(() => {
    if (isPaused) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideCount);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isPaused, slideCount]);

  return (
    <section
      id="financial-priorities"
      className="relative overflow-hidden bg-[#050816] px-4 py-10 sm:py-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-6 text-center sm:mb-8">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9B7CFF]">Explore</p>
          <h2 className="mt-3 text-[clamp(2.1rem,4vw,4rem)] font-black leading-[1.05] text-[#F4F7FB]">Financial Topics</h2>
        </div>
        <style>{`
          @keyframes financialSlideIn {
            from { opacity: 0; transform: translateX(18px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .financial-carousel-slide {
            animation: financialSlideIn 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
          }
        `}</style>
        <article className="financial-carousel-slide life-insurance-slide mt-12 overflow-hidden rounded-[26px] bg-[#050816] text-[#F4F7FB]" style={{ display: activeSlide === 0 ? "block" : "none" }}>
          <style>{`
            .life-insurance-slide {
              position: relative;
              aspect-ratio: 2034 / 912;
              border: 1px solid rgba(198, 184, 255, 0.14);
            }
            .life-insurance-art {
              position: absolute;
              inset: 0;
              background: center / cover no-repeat url(${lifeDesignPng});
            }
            .life-insurance-copy {
              position: relative;
              z-index: 1;
              width: min(57%, 760px);
              padding: clamp(2rem, 5vw, 5.5rem) clamp(1.25rem, 5vw, 5.75rem);
            }
            .life-insurance-title {
              margin: 0;
              color: #F4F7FB;
              font-family: var(--font-display);
              font-size: clamp(2rem, 4.3vw, 5rem);
              font-weight: 700;
              letter-spacing: -0.03em;
              line-height: 0.98;
            }
            .life-insurance-title span,
            .life-insurance-why strong {
              color: #9B7CFF;
            }
            .life-insurance-hook {
              margin: 1rem 0 0;
              color: #F4F7FB;
              font-size: clamp(0.95rem, 1.45vw, 1.45rem);
              font-weight: 700;
              line-height: 1.35;
            }
            .life-insurance-body,
            .life-insurance-why,
            .life-insurance-disclaimer {
              color: #B7C0D8;
              font-size: clamp(0.82rem, 1.25vw, 1.18rem);
              line-height: 1.55;
            }
            .life-insurance-body {
              margin: clamp(1.5rem, 3vw, 3rem) 0 0;
            }
            .life-insurance-why {
              margin: clamp(1rem, 2vw, 2rem) 0 0;
            }
            .life-insurance-why strong {
              font-weight: 700;
            }
            .life-insurance-disclaimer {
              margin: 0.8rem 0 0;
              color: #B7C0D8;
              font-size: clamp(0.72rem, 1vw, 0.98rem);
            }
            @media (max-width: 767px) {
              .life-insurance-slide {
                aspect-ratio: auto;
              }
              .life-insurance-art {
                position: relative;
                aspect-ratio: 2034 / 912;
                background-size: contain;
                background-position: center top;
              }
              .life-insurance-copy {
                width: 100%;
                padding: 1.5rem 1.25rem 2rem;
              }
              .life-insurance-title {
                font-size: clamp(2.2rem, 11vw, 3.6rem);
              }
              .life-insurance-hook {
                margin-top: 0.8rem;
                font-size: 1rem;
              }
              .life-insurance-body,
              .life-insurance-why {
                font-size: 1rem;
                line-height: 1.55;
              }
              .life-insurance-disclaimer {
                font-size: 0.82rem;
              }
            }
          `}</style>
          <div className="life-insurance-art" aria-hidden="true" />
          <div className="life-insurance-copy">
            <h2 className="life-insurance-title">
              Protect Your <span>family</span>
            </h2>
            <p className="life-insurance-hook">Protection starts with clarity before urgency.</p>
            <p className="life-insurance-body">
              Explore general life insurance concepts and the questions people may consider when preparing for unexpected events and protecting those who depend on them. Common options include term life for set periods and permanent policies for longer term coverage.
            </p>
            <p className="life-insurance-why">
              <strong>Why it matters:</strong> A clear life insurance plan can help reduce financial stress, preserve household goals, and give families a framework for dealing with unexpected losses.
            </p>
            <p className="life-insurance-disclaimer">
              Professional roles, qualifications, and legal responsibilities can vary by jurisdiction and service type. Always confirm credentials and scope before acting.
            </p>
          </div>
        </article>

        <article className="financial-carousel-slide life-insurance-slide ira-insurance-slide mt-12 overflow-hidden rounded-[26px] bg-[#050816] text-[#F4F7FB]" style={{ display: activeSlide === 1 ? "block" : "none" }}>
          <style>{`
            .ira-insurance-art {
              background-image: url(${iraDesignPng});
              background-position: right center;
              background-size: 45% auto;
            }
            @media (max-width: 767px) {
              .ira-insurance-art {
                background-position: center top;
                background-size: contain;
              }
            }
          `}</style>
          <div className="life-insurance-art ira-insurance-art" aria-hidden="true" />
          <div className="life-insurance-copy">
            <h2 className="life-insurance-title">
              Retirement and <span>IRAs</span>
            </h2>
            <p className="life-insurance-hook">A stronger retirement plan begins with better questions today.</p>
            <p className="life-insurance-body">
              Understand common retirement priorities, the general role of IRAs, and the factors people may consider while preparing for their future. IRAs can be part of that conversation, with traditional and Roth accounts often used for different tax and planning goals, and the reason it matters is that the decisions made early can shape how comfortable and prepared someone feels in retirement.
            </p>
            <p className="life-insurance-why">
              <strong>Why it matters:</strong> The structure of retirement accounts and timing can materially affect long-term flexibility, tax efficiency, and peace of mind later in life.
            </p>
            <p className="life-insurance-disclaimer">
              Professional roles, qualifications, and legal responsibilities can vary by jurisdiction and service type. Always confirm credentials and scope before acting.
            </p>
          </div>
        </article>

        <article className="financial-carousel-slide life-insurance-slide trust-insurance-slide mt-12 overflow-hidden rounded-[26px] bg-[#050816] text-[#F4F7FB]" style={{ display: activeSlide === 2 ? "block" : "none" }}>
          <style>{`
            .trust-insurance-art {
              background-image: url(${trustDesignPng});
              background-position: right center;
              background-size: 43% auto;
            }
            @media (max-width: 767px) {
              .trust-insurance-art {
                background-position: center top;
                background-size: contain;
              }
            }
          `}</style>
          <div className="life-insurance-art trust-insurance-art" aria-hidden="true" />
          <div className="life-insurance-copy">
            <h2 className="life-insurance-title">
              Trusts and <span>Legacy Planning</span>
            </h2>
            <p className="life-insurance-hook">A thoughtful legacy plan begins with better questions today.</p>
            <p className="life-insurance-body">
              Learn how wills, trusts, beneficiaries, and organized financial documents may contribute to a thoughtful legacy plan. Trusts and legacy planning help organize how assets, responsibilities, and personal wishes are handled over time. These tools may be used to support family transitions, reduce confusion, and preserve long-term intentions, while common approaches include wills, revocable trusts, and beneficiary designations that need to align with a broader estate plan.
            </p>
            <p className="life-insurance-why">
              <strong>Why it matters:</strong> Thoughtful legacy planning can help avoid confusion, preserve intentions, and make future transitions easier for family members and beneficiaries.
            </p>
            <p className="life-insurance-disclaimer">
              Professional roles, qualifications, and legal responsibilities can vary by jurisdiction and service type. Always confirm credentials and scope before acting.
            </p>
          </div>
        </article>

        <article className="financial-carousel-slide life-insurance-slide investment-insurance-slide mt-12 overflow-hidden rounded-[26px] bg-[#050816] text-[#F4F7FB]" style={{ display: activeSlide === 3 ? "block" : "none" }}>
          <style>{`
            .investment-insurance-art {
              background-image: url(${investmentDesignPng});
              background-position: right center;
              background-size: auto 96%;
            }
            @media (max-width: 767px) {
              .investment-insurance-art {
                background-position: center top;
                background-size: contain;
              }
            }
          `}</style>
          <div className="life-insurance-art investment-insurance-art" aria-hidden="true" />
          <div className="life-insurance-copy">
            <h2 className="life-insurance-title">
              Investments and <span>Wealth Building</span>
            </h2>
            <p className="life-insurance-hook">Long-term growth decisions work best when risk is understood first.</p>
            <p className="life-insurance-body">
              Explore foundational investment concepts, including time horizon, diversification, personal goals, and the relationship between potential opportunity and risk. Investing is about matching long-term financial goals with the right balance of risk, time horizon, and liquidity. It matters because markets can rise and fall, so diversification, costs, and discipline often matter as much as the investment itself, and common options include stocks, bonds, mutual funds, and diversified portfolios.
            </p>
            <p className="life-insurance-why">
              <strong>Why it matters:</strong> The right investment approach depends on goals, time horizon, and risk tolerance, which is why understanding the basics helps people make more informed decisions.
            </p>
            <p className="life-insurance-disclaimer">
              Professional roles, qualifications, and legal responsibilities can vary by jurisdiction and service type. Always confirm credentials and scope before acting.
            </p>
          </div>
        </article>

        <article className="financial-carousel-slide life-insurance-slide crypto-insurance-slide mt-12 overflow-hidden rounded-[26px] bg-[#050816] text-[#F4F7FB]" style={{ display: activeSlide === 4 ? "block" : "none" }}>
          <style>{`
            .crypto-insurance-art {
              background-image: url(${cryptoDesignPng});
              background-position: right center;
              background-size: auto 86%;
            }
            @media (max-width: 767px) {
              .crypto-insurance-art {
                background-position: center top;
                background-size: contain;
              }
            }
          `}</style>
          <div className="life-insurance-art crypto-insurance-art" aria-hidden="true" />
          <div className="life-insurance-copy">
            <h2 className="life-insurance-title">
              <span>Cryptocurrency</span> and Digital Assets
            </h2>
            <p className="life-insurance-hook">Digital assets require security discipline as much as market awareness.</p>
            <p className="life-insurance-body">
              Build a clearer understanding of cryptocurrency, market volatility, digital security, and the risks to consider before making financial decisions. Cryptocurrency and digital assets are a newer category of financial exposure that can move quickly and carry meaningful technology, custody, and security risks. The importance of understanding them is that they are not just price charts; they also involve wallets, private keys, platform risk, fraud exposure, and the possibility of permanent loss, with common approaches including holding crypto directly, using exchanges, and storing assets in self-custody or custodial accounts.
            </p>
            <p className="life-insurance-why">
              <strong>Why it matters:</strong> Because the market moves quickly and security mistakes can be costly, it is important to understand both the opportunity and the risk before getting involved.
            </p>
            <p className="life-insurance-disclaimer">
              Professional roles, qualifications, and legal responsibilities can vary by jurisdiction and service type. Always confirm credentials and scope before acting.
            </p>
          </div>
        </article>

        <article className="financial-carousel-slide life-insurance-slide market-chart-slide mt-12 overflow-hidden rounded-[26px] bg-[#050816] text-[#F4F7FB]" style={{ display: activeSlide === 5 ? "block" : "none" }}>
          <style>{`
            .market-chart-art {
              background-image: url(${marketChartDesignPng});
              background-position: right center;
              background-size: auto 108%;
            }
            @media (max-width: 767px) {
              .market-chart-art {
                background-position: center top;
                background-size: contain;
                aspect-ratio: 1 / 1;
              }
            }
          `}</style>
          <div className="life-insurance-art market-chart-art" aria-hidden="true" />
          <div className="life-insurance-copy">
            <h2 className="life-insurance-title">
              Understanding <span>Market Charts</span>
            </h2>
            <p className="life-insurance-hook">Charts can describe what happened, not promise what happens next.</p>
            <p className="life-insurance-body">
              Learn the basic parts of a candlestick chart, including open, close, high, and low, and understand what market charts can and cannot communicate. Market charts can help explain how prices have moved over time, but they do not predict the future and should be used as context rather than certainty. They matter because trends, volume, and price action may help people ask better questions about risk and timing, while common chart types include candlesticks, line charts, and moving averages that describe history differently.
            </p>
            <p className="life-insurance-why">
              <strong>Why it matters:</strong> Charts are most useful when they are treated as information tools, not promises, which helps people keep perspective on risk, timing, and market uncertainty.
            </p>
            <p className="life-insurance-disclaimer">
              Professional roles, qualifications, and legal responsibilities can vary by jurisdiction and service type. Always confirm credentials and scope before acting.
            </p>
          </div>
        </article>

        <div className="mt-5 flex flex-col items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-3" aria-label="Financial slide navigation">
            <button
              type="button"
              aria-label="Previous financial topic slide"
              onClick={goToPreviousSlide}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B7C0D8]/30 bg-white/5 text-xl font-bold text-[#F4F7FB] transition hover:border-[#C6B8FF] hover:bg-[#C6B8FF]/10"
            >
              ←
            </button>

            <div className="flex items-center justify-center gap-3" aria-label="Financial topic slides">
              {Array.from({ length: slideCount }, (_, index) => (
                <button
                  key={`financial-slide-${index}`}
                  type="button"
                  aria-label={`Show financial topic slide ${index + 1}`}
                  aria-current={activeSlide === index ? "true" : undefined}
                  onClick={() => goToSlide(index)}
                  className={`h-3 w-3 rounded-full border border-[#B7C0D8]/30 transition-all duration-300 ${
                    activeSlide === index ? "w-8 bg-[#9B7CFF]" : "bg-white/20"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next financial topic slide"
              onClick={goToNextSlide}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B7C0D8]/30 bg-white/5 text-xl font-bold text-[#F4F7FB] transition hover:border-[#C6B8FF] hover:bg-[#C6B8FF]/10"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinancialTopicsPage() {
  return (
    <>
      <FourCsPage />
      <FinancialTopicsSection />
    </>
  );
}

function FourCsPage() {
  const [activeCard, setActiveCard] = useState(null);
  const [pinnedCard, setPinnedCard] = useState(null);
  const fourCsCards = services.map((service, index) => {
    const cardMeaning =
      index === 0
        ? "Cash alternatives are the more liquid or income-oriented places money may be held when the goal is to preserve capital and keep funds accessible."
        : index === 1
          ? "Crypto represents digital assets and blockchain exposure, where volatility, custody, and security matter just as much as opportunity."
          : index === 2
            ? "Commodities focus on tangible assets like metals and energy that may behave differently from cash or equity markets."
            : "Companies refers to investing in businesses, where fundamentals, innovation, and long-term value creation drive the conversation.";

    const cardExample =
      index === 0
        ? "Examples: money market funds, treasury-style holdings, or other liquid approaches used to manage cash efficiently."
        : index === 1
          ? "Examples: Bitcoin, Ethereum, and other digital assets considered alongside wallet security and exchange risk."
          : index === 2
            ? "Examples: gold, silver, energy exposure, and other real-asset themes used for diversification."
            : "Examples: public-market research, private opportunity review, and long-term business quality analysis.";

    const questionText = index === 1 ? `What is ${service.title}?` : `What are ${service.title}?`;

    return {
      ...service,
      mark: serviceMarks[index],
      texture: serviceTextures[index],
      question: questionText,
      meaning: cardMeaning,
      example: cardExample,
    };
  });

  function toggleCard(index) {
    setPinnedCard((current) => (current === index ? null : index));
  }

  return (
    <section id="four-cs" className="cc-slow-fade bg-[#050816] px-5 pb-12 pt-16 text-[#F4F7FB] sm:pb-16 sm:pt-20">
      <div className="mx-auto w-full max-w-[min(1200px,94vw)]">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9B7CFF]">Our Four C&apos;s</p>
        <h1 className="mt-4 max-w-4xl text-[34px] font-black leading-[1.05] tracking-[-0.02em] text-[#F4F7FB]">
          The four pillars behind our approach to wealth planning.
        </h1>
        <p className="mt-5 max-w-3xl text-[22px] leading-[1.6] text-[#B7C0D8]">
          Calo Capital uses these four focus areas to guide conversations around liquidity, digital assets, real assets, and business opportunities.
        </p>

        <style>{`
          .four-cs-panels {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            min-height: 0;
            gap: 1px;
            overflow: hidden;
            border: 1px solid rgba(198, 184, 255, 0.28);
            background: rgba(198, 184, 255, 0.28);
          }
          .four-cs-panel {
            position: relative;
            display: flex;
            flex-direction: column;
            min-height: 360px;
            overflow: hidden;
            color: #f4f7fb;
            background-color: #050816;
            background-image: linear-gradient(180deg, rgba(5, 8, 22, 0.52), rgba(5, 8, 22, 0.9)), var(--four-cs-cover);
            background-position: center;
            background-size: cover;
            transition: min-height 600ms cubic-bezier(0.22, 1, 0.36, 1), background 600ms ease, box-shadow 600ms ease;
          }
          .four-cs-panel.is-active {
            min-height: 520px;
            background-image: linear-gradient(140deg, rgba(109, 94, 245, 0.44), rgba(5, 8, 22, 0.82) 72%), var(--four-cs-cover);
            box-shadow: inset 0 0 0 1px rgba(198, 184, 255, 0.2);
          }
          .four-cs-panel-button {
            position: absolute;
            inset: 0;
            z-index: 2;
            width: 100%;
            height: 100%;
            cursor: pointer;
            border: 0;
            background: transparent;
            color: inherit;
            text-align: left;
          }
          .four-cs-panel-button:focus-visible {
            outline: 2px solid #C6B8FF;
            outline-offset: -5px;
          }
          .four-cs-panel-rail {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            padding: 24px 22px 18px;
            pointer-events: none;
          }
          .four-cs-panel-number {
            color: #9B7CFF;
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.2em;
          }
          .four-cs-panel-title {
            color: #B7C0D8;
            font-size: clamp(0.95rem, 1.5vw, 1.15rem);
            font-weight: 700;
            letter-spacing: -0.02em;
            line-height: 1.05;
          }
          .four-cs-panel-content {
            position: relative;
            z-index: 1;
            min-width: 0;
            max-height: 0;
            overflow: hidden;
            padding: 0 22px;
            opacity: 0;
            transform: translateY(16px);
            transition: max-height 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 420ms ease 80ms, transform 520ms cubic-bezier(0.22, 1, 0.36, 1) 40ms, padding 600ms ease;
            pointer-events: none;
          }
          .four-cs-panel.is-active .four-cs-panel-content {
            display: block;
            max-height: 560px;
            padding: 0 22px 22px;
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
          }
          .four-cs-panel-content h2,
          .four-cs-panel-content p {
            max-width: 31rem;
          }
          .four-cs-illustration {
            display: none !important;
          }
          @media (min-width: 768px) {
            .four-cs-panels {
              gap: 16px;
              border: 0;
              background: transparent;
              overflow: visible;
            }
            .four-cs-panel {
              border: 1px solid rgba(198, 184, 255, 0.28);
            }
          }
          @media (max-width: 767px) {
            .four-cs-panels {
              display: block;
              min-height: 0;
            }
            .four-cs-panel {
              display: block;
              min-height: 74px;
              border-bottom: 1px solid rgba(198, 184, 255, 0.2);
              transition: min-height 560ms cubic-bezier(0.22, 1, 0.36, 1), background 560ms ease;
            }
            .four-cs-panel:last-child {
              border-bottom: 0;
            }
            .four-cs-panel.is-active {
              min-height: 0;
            }
            .four-cs-panel-rail {
              width: 100%;
              height: 74px;
              flex-direction: row;
              align-items: center;
              padding: 18px 20px;
            }
            .four-cs-panel-title {
              writing-mode: horizontal-tb;
              transform: none;
              font-size: 1rem;
            }
            .four-cs-panel-content {
              display: block;
              max-height: 0;
              padding: 0 20px;
              transform: translateY(10px);
            }
            .four-cs-panel.is-active .four-cs-panel-content {
              display: block;
              grid-template-columns: none;
              max-height: 700px;
              padding: 8px 20px 24px;
            }
            .four-cs-illustration {
              min-height: 120px;
              margin-top: 22px;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .four-cs-panel,
            .four-cs-panel-content,
            .four-cs-illustration {
              transition-duration: 0.01ms;
              transition-delay: 0ms;
            }
          }
        `}</style>
        <div className="four-cs-panels mt-10" role="list">
          {fourCsCards.map((service, index) => {
            const isActive = pinnedCard === null ? activeCard === index : pinnedCard === index;

            return (
              <article
                key={service.title}
                id={serviceIds[index]}
                role="listitem"
                className={`four-cs-panel${isActive ? " is-active" : ""}`}
                style={{ "--four-cs-cover": `url(${galaxyCoverPng})` }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <button
                  type="button"
                  className="four-cs-panel-button"
                  onClick={() => toggleCard(index)}
                  onFocus={() => setActiveCard(index)}
                  onBlur={() => setActiveCard(null)}
                  aria-expanded={isActive}
                  aria-controls={`${serviceIds[index]}-content`}
                >
                  <span className="sr-only">{isActive ? "Collapse" : "Expand"} {service.title}</span>
                </button>
                <div className="four-cs-panel-rail" aria-hidden="true">
                  <span className="four-cs-panel-number">{service.mark}</span>
                  <span className="four-cs-panel-title">{service.title}</span>
                </div>
                <div id={`${serviceIds[index]}-content`} className="four-cs-panel-content">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[#9B7CFF]">{service.texture.accent}</p>
                  <h2 className="mt-4 text-[clamp(1.65rem,3vw,2.5rem)] font-black leading-[1.03] text-[#F4F7FB]">{service.question}</h2>
                  <div className="mt-5 space-y-4 text-sm leading-7 text-[#B7C0D8] sm:text-base">
                    <p>{service.meaning}</p>
                    <p>{service.example}</p>
                  </div>
                  <div className="four-cs-illustration" aria-hidden="true" />
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}

const socialMediaIcons = [
  { label: "Instagram", src: socialInstagramPng, href: "https://www.instagram.com/calocapital/" },
  { label: "Facebook", src: socialFacebookPng, href: "https://www.facebook.com/CaloCapital/" },
  { label: "LinkedIn", src: socialLinkedInPng, href: "https://www.linkedin.com/company/calocapital/posts/?feedView=all" },
];

const FORM_ENDPOINT = "https://formsubmit.co/ajax/protection@calocapital.io";

function ContactForm() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const fieldClass = "mb-4 w-full rounded-xl border border-[#B7C0D8]/25 bg-[#050816]/65 px-4 py-3 text-[15px] text-[#F4F7FB] placeholder:text-[#B7C0D8]/60";

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    setStatus("Sending...");
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      const data = await response.json();
      if (String(data.success) !== "true") throw new Error("Submission failed");
      form.reset();
      setStatus("Thank you! Your submission has been received. We will be in touch soon.");
    } catch {
      setStatus("Something went wrong. Please email protection@calocapital.io or call (650) 658-6822.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-10 rounded-2xl border border-[#B7C0D8]/20 bg-[#1A2340]/55 p-6">
      <h3 className="mb-4 text-2xl font-black text-[#F4F7FB]">Send us a message</h3>
      <input type="hidden" name="_subject" value="New message from calocapital.io" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <label htmlFor="contact-name" className="mb-1 block text-sm text-[#B7C0D8]">Name</label>
      <input id="contact-name" name="name" type="text" placeholder="Your name" className={fieldClass} />
      <label htmlFor="contact-email" className="mb-1 block text-sm text-[#B7C0D8]">Email address</label>
      <input id="contact-email" name="email" type="email" required placeholder="you@example.com" className={fieldClass} />
      <label htmlFor="contact-phone" className="mb-1 block text-sm text-[#B7C0D8]">Phone number</label>
      <input id="contact-phone" name="phone" type="tel" placeholder="(555) 555-5555" className={fieldClass} />
      <label htmlFor="contact-message" className="mb-1 block text-sm text-[#B7C0D8]">Message</label>
      <textarea id="contact-message" name="message" rows={5} required placeholder="How can we help?" className={fieldClass} />
      <button
        type="submit"
        disabled={sending}
        className="min-h-12 w-full rounded-full bg-gradient-to-br from-[#6D5EF5] to-[#9B7CFF] px-6 py-3 text-base font-semibold text-white disabled:opacity-60"
      >
        Send message
      </button>
      <p role="status" aria-live="polite" className="mt-3 text-sm text-[#B7C0D8]">{status}</p>
    </form>
  );
}

function ContactPage() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#1A2340] px-0 pb-0 pt-0 text-[#F4F7FB]">
      <div className="relative min-h-[620px] w-full overflow-hidden border-y border-[#B7C0D8]/10 bg-[#1A2340] shadow-[0_0_0_1px_rgba(198, 184, 255,0.12)] lg:min-h-[calc(100svh-6rem)]">
        <div className="absolute inset-0">
          <img src={semiWorldPng} alt="" className="h-full w-full object-cover object-center opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(109, 94, 245,0.42),rgba(5, 8, 22,0.7)_66%)]" />
        </div>

        <div className="relative z-10 grid items-center gap-8 px-4 py-8 sm:gap-10 sm:px-8 sm:py-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-14">
          <div className="max-w-xl min-w-0">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C6B8FF] sm:text-xs sm:tracking-[0.28em]">Get in touch</p>
            <h2 className="text-[34px] font-black leading-[0.96] tracking-[-0.04em] text-[#F4F7FB]">
              We are ready to hear from you
            </h2>
            <p className="mt-6 max-w-full text-[22px] leading-[1.6] text-[#B7C0D8]">
              Check out our weekly updates
              <br />
              on the stock market
            </p>

            <div className="mt-8 flex max-w-full flex-wrap items-center justify-center gap-3 sm:justify-start sm:gap-4">
              {socialMediaIcons.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="inline-flex items-center justify-center"
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    className="social-icon h-auto w-[3.25rem] object-contain drop-shadow-[0_0_18px_rgba(155, 124, 255,0.28)] sm:w-[4.25rem]"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 items-center justify-center">
            <div className="w-full max-w-[560px]">
              <ContactForm />
              <div className="border-t border-[#9B7CFF]/40 pt-8">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#9B7CFF]">Main Office</p>
              <div className="mt-4 space-y-2 text-[18px] leading-[1.8] text-[#F4F7FB]">
                <p>Nashville, TN • 41 Peabody Street, 37210</p>
                <p>Monday to Friday, 9:00 AM to 5:00 PM</p>
                <p>Email: protection@calocapital.io</p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage({ setPage }) {
  return (
    <>
      <HeroSection />
      <FinancingSections hero />
      <div
        className="relative grid items-stretch"
        style={{
          background: "radial-gradient(900px 500px at 78% 10%,rgba(109,94,245,.28),transparent 70%),#050816",
        }}
      >
        <CryptoCandlestickSection />
      </div>
      <FinancingSections />
    </>
  );
}

const disclaimer =
  "Investing involves risk, including the possible loss of principal. Past performance does not guarantee future results. The information on this website is for general educational purposes only and should not be interpreted as investment, legal, tax, accounting, or financial advice. Visitors should consult qualified professionals before making financial decisions. Calo Capital is not currently a registered investment advisor, broker-dealer, or fiduciary. Any references to digital assets, commodities, businesses, or market opportunities are general discussions only and should not be considered a recommendation or guarantee of results. Users should do their own diligence before acting on any information provided here.";

function linkifyText(text) {
  return text.split(/(protection@calocapital\.io|\(650\) 658-6822)/g).map((part, index) => {
    if (part === "protection@calocapital.io") return <a key={index} className="text-[#C6B8FF] underline" href={`mailto:${part}`}>{part}</a>;
    if (part === "(650) 658-6822") return <a key={index} className="text-[#C6B8FF] underline" href="tel:+16506586822">{part}</a>;
    return part;
  });
}

function LegalDocument({ id, number, title, intro, sections, children }) {
  return (
    <article id={id} className="scroll-mt-28 border-t border-[#C6B8FF66] pt-7">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-[#9B7CFF]">{number}</p>
      <h2 className="mt-3 text-3xl font-black text-[#F4F7FB]">{title}</h2>
      {sections && <p className="mt-2 text-sm text-[#B7C0D8]">Last updated: {LEGAL_UPDATED}</p>}
      {intro && <p className="mt-5 text-[20px] leading-[1.6] text-[#B7C0D8]">{intro}</p>}
      {children}
      {sections && (
        <div className="mt-8 space-y-8">
          {sections.map((section, sectionIndex) => (
            <div key={section.t}>
              <h3 className="text-xl font-bold text-[#F4F7FB]">{sectionIndex + 1}. {section.t}</h3>
              <div className="mt-3 space-y-3 text-[17px] leading-[1.7] text-[#B7C0D8]">
                {section.b.map((block, blockIndex) => {
                  if (typeof block === "string") return <p key={blockIndex}>{linkifyText(block)}</p>;
                  return (
                    <div key={blockIndex}>
                      {block.lead && <p className="mb-2">{block.lead}</p>}
                      <ul className="list-disc space-y-2 pl-6">
                        {block.list.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

function useScrollToHash() {
  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);
}

function LegalPage() {
  useScrollToHash();

  const jumpLinks = [
    ["privacy-policy", "Privacy Policy"],
    ["terms", "Terms & Conditions"],
    ["disclaimer", "Disclaimer"],
  ];

  return (
    <section className="bg-[#050816] px-5 pb-24 pt-16 text-[#F4F7FB] sm:pt-24">
      <div className="mx-auto w-full max-w-[min(900px,94vw)]">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9B7CFF]">Calo Capital</p>
        <h1 className="mt-4 text-[clamp(2.3rem,6vw,4.8rem)] font-black leading-[0.98] text-[#F4F7FB]">Legal</h1>
        <p className="mt-6 max-w-2xl text-[22px] leading-[1.6] text-[#B7C0D8]">
          Our Privacy Policy, Terms and Conditions, and Disclaimer.
        </p>
        <nav className="mt-8 flex flex-wrap gap-3" aria-label="Legal sections">
          {jumpLinks.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-full border border-[#C6B8FF66] px-5 py-2 text-sm font-semibold text-[#F4F7FB] transition hover:border-[#C6B8FF] hover:text-[#C6B8FF]"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="mt-14 space-y-14">
          <LegalDocument id="privacy-policy" number="01" title="Privacy Policy" intro={privacyIntro} sections={privacySections} />
          <LegalDocument id="terms" number="02" title="Terms and Conditions" intro={termsIntro} sections={termsSections} />
          <LegalDocument id="disclaimer" number="03" title="Disclaimer">
            <p className="mt-5 text-[17px] leading-[1.7] text-[#B7C0D8]">{disclaimer}</p>
          </LegalDocument>
        </div>
      </div>
    </section>
  );
}

function FaqsPage() {
  useScrollToHash();

  return (
    <section className="bg-[#050816] px-5 pb-24 pt-16 text-[#F4F7FB] sm:pt-24">
      <div className="mx-auto w-full max-w-[min(900px,94vw)]">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#9B7CFF]">Calo Capital</p>
        <h1 className="mt-4 text-[clamp(2.3rem,6vw,4.8rem)] font-black leading-[0.98] text-[#F4F7FB]">Frequently Asked Questions</h1>
        <p className="mt-6 max-w-2xl text-[22px] leading-[1.6] text-[#B7C0D8]">
          Straight answers about Calo Capital, how financing works, and how we protect your information.
        </p>

        <div className="mt-14 space-y-12">
          {faqGroups.map((group) => (
            <div key={group.title}>
              <h2 className="border-t border-[#C6B8FF66] pt-7 text-2xl font-black text-[#F4F7FB]">{group.title}</h2>
              <div className="mt-5 space-y-3">
                {group.items.map(([question, answer]) => (
                  <details key={question} className="group rounded-2xl border border-[#B7C0D8]/20 bg-[#1A2340]/55 px-6 py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-[#F4F7FB] [&::-webkit-details-marker]:hidden">
                      {question}
                      <span aria-hidden="true" className="text-2xl text-[#C6B8FF] transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-[17px] leading-[1.7] text-[#B7C0D8]">{linkifyText(answer)}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-[#9B7CFF]/50 bg-[#6D5EF5]/15 p-6">
          <h2 className="text-2xl font-black">Still have a question?</h2>
          <p className="mt-2 text-[17px] leading-[1.7] text-[#B7C0D8]">
            Call <a className="text-[#C6B8FF] underline" href="tel:+16506586822">(650) 658-6822</a> or email{" "}
            <a className="text-[#C6B8FF] underline" href="mailto:protection@calocapital.io">protection@calocapital.io</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer({ setPage }) {
  useEffect(() => {
    const widgetSelector = 'script[data-widget-id="6a872b48b433348f40d6511c"]';
    if (document.querySelector(widgetSelector)) return;

    const widgetScript = document.createElement("script");
    widgetScript.src = "https://widgets.leadconnectorhq.com/loader.js";
    widgetScript.async = true;
    widgetScript.dataset.resourcesUrl = "https://widgets.leadconnectorhq.com/chat-widget/loader.js";
    widgetScript.dataset.widgetId = "6a872b48b433348f40d6511c";
    widgetScript.dataset.source = "WEB_USER";
    document.body.appendChild(widgetScript);
  }, []);

  return (
    <></>
  );
}

function GlobalStyles() {
  return (
    <style>{`
      html { scroll-behavior: smooth; overflow-x: hidden; }
      body, #root { overflow-x: hidden; }
      * { box-sizing: border-box; }
      .calo-after-chart {
        --cac-navy: #050816;
        --cac-purple: #9B7CFF;
        --cac-indigo: #6D5EF5;
        --cac-slate: #1A2340;
        --cac-white: #F4F7FB;
        --cac-mist: #B7C0D8;
        --cac-aurora: #C6B8FF;
        color: var(--cac-white);
        line-height: 1.7;
      }
      .calo-after-chart-section {
        position: relative;
        overflow: hidden;
        padding: clamp(4rem, 9vw, 7rem) 1.25rem;
      }
      .calo-after-chart-wrap {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 1120px;
        margin: 0 auto;
      }
      .calo-after-chart h2 {
        margin: 0;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(2.4rem, 5vw, 3.8rem);
        font-weight: 700;
        line-height: 1.05;
      }
      .calo-after-chart h3,
      .calo-after-chart p {
        margin-top: 0;
      }
      .calo-after-chart-solutions {
        text-align: center;
        background:
          radial-gradient(1px 1px at 8% 22%,rgba(244,247,251,.7),transparent),
          radial-gradient(1px 1px at 22% 68%,rgba(244,247,251,.5),transparent),
          radial-gradient(1.5px 1.5px at 35% 12%,rgba(198,184,255,.7),transparent),
          radial-gradient(1px 1px at 48% 82%,rgba(244,247,251,.5),transparent),
          radial-gradient(1px 1px at 61% 30%,rgba(244,247,251,.6),transparent),
          radial-gradient(1.5px 1.5px at 74% 74%,rgba(198,184,255,.6),transparent),
          radial-gradient(1px 1px at 86% 16%,rgba(244,247,251,.6),transparent),
          radial-gradient(1px 1px at 93% 58%,rgba(244,247,251,.5),transparent),
          radial-gradient(60% 45% at 50% 0%,rgba(109,94,245,.25),transparent),
          var(--cac-navy);
      }
      .calo-after-chart-solutions h2,
      .calo-after-chart-contact h2 span {
        color: var(--cac-aurora);
        text-shadow: 0 0 22px rgba(155,124,255,.35);
      }
      .calo-after-chart-subtitle {
        max-width: 44ch;
        margin: 1.1rem auto 0;
        color: var(--cac-mist);
        font-size: 1.1rem;
      }
      .calo-after-chart-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1.5rem;
        margin-top: 3.25rem;
      }
      .calo-after-chart-card,
      .calo-after-chart-work-card {
        border: 1px solid rgba(183,192,216,.2);
        border-radius: 16px;
        background: rgba(26,35,64,.55);
        box-shadow: inset 0 1px 0 rgba(198,184,255,.14);
        backdrop-filter: blur(14px);
      }
      .calo-after-chart-card {
        padding: 2.4rem 1.25rem;
        color: inherit;
        transition: transform .2s, border-color .2s, box-shadow .2s;
      }
      .calo-after-chart-card:hover,
      .calo-after-chart-card.is-expanded {
        transform: translateY(-3px);
        border-color: rgba(198,184,255,.6);
        box-shadow: 0 0 30px rgba(155,124,255,.18);
      }
      .calo-after-chart-card-trigger {
        width: 100%;
        padding: 0;
        border: 0;
        background: transparent;
        color: inherit;
        cursor: pointer;
        text-align: center;
      }
      .calo-after-chart-card-trigger:focus-visible {
        outline: 2px solid var(--cac-aurora);
        outline-offset: 4px;
      }
      .calo-after-chart-card h3 {
        margin-bottom: .4rem;
        font-size: 1.05rem;
        font-weight: 600;
      }
      .calo-after-chart-card p {
        margin-bottom: 0;
        color: var(--cac-mist);
        font-size: .92rem;
        line-height: 1.5;
      }
      .calo-after-chart-card-details {
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        pointer-events: none;
        transition: max-height .28s ease, margin-top .28s ease, padding-top .28s ease, opacity .2s ease;
      }
      .calo-after-chart-card-details.is-visible {
        max-height: 260px;
        margin-top: 1.1rem;
        padding-top: 1rem;
        border-top: 1px solid rgba(183,192,216,.2);
        opacity: 1;
        pointer-events: auto;
      }
      .calo-after-chart-card-details p {
        font-size: .86rem;
      }
      .calo-after-chart-band {
        border-top: 1px solid rgba(183,192,216,.16);
        background: radial-gradient(50% 70% at 85% 8%,rgba(155,124,255,.24),transparent),linear-gradient(120deg,#050816 0%,#15123C 55%,#2A1F6B 100%);
      }
      .calo-after-chart-two {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        align-items: center;
        gap: clamp(2rem, 5vw, 4rem);
      }
      .calo-after-chart-pill {
        display: inline-block;
        margin-bottom: 1.4rem;
        padding: .4rem .9rem;
        border: 1px solid rgba(198,184,255,.4);
        border-radius: 999px;
        background: rgba(155,124,255,.12);
        color: var(--cac-aurora);
        font-size: .75rem;
        font-weight: 700;
        letter-spacing: .1em;
        text-transform: uppercase;
      }
      .calo-after-chart-band h2 { margin-bottom: 1.1rem; }
      .calo-after-chart-lede { margin-bottom: .9rem; font-size: 1.2rem; font-weight: 600; }
      .calo-after-chart-body { max-width: 50ch; margin-bottom: 0; color: var(--cac-mist); }
      .calo-after-chart-actions { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 1.75rem; }
      .calo-after-chart-button {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: .55rem;
        overflow: hidden;
        padding: .9rem 1.5rem;
        border: 1.5px solid var(--cac-purple);
        border-radius: 10px;
        background: var(--cac-purple);
        color: var(--cac-navy);
        font: inherit;
        font-weight: 600;
        text-decoration: none;
        cursor: pointer;
        transition: background .2s, box-shadow .2s, border-color .2s;
      }
      .calo-after-chart-button:hover {
        border-color: var(--cac-aurora);
        background: var(--cac-aurora);
        box-shadow: 0 0 26px rgba(155,124,255,.45);
      }
      .calo-after-chart-button-ghost {
        border-color: rgba(183,192,216,.5);
        background: transparent;
        color: var(--cac-white);
      }
      .calo-after-chart-button-ghost:hover { border-color: var(--cac-aurora); background: rgba(198,184,255,.1); box-shadow: none; }
      .calo-after-chart-work-card { padding: 1.75rem; }
      .calo-after-chart-work-card > h3 {
        margin-bottom: 1.25rem;
        text-align: center;
        font-size: 1.15rem;
      }
      .calo-after-chart-comparison { display: grid; grid-template-columns: 1fr 1fr; gap: .9rem; }
      .calo-after-chart-panel {
        padding: 1rem;
        border: 1px solid rgba(183,192,216,.14);
        border-radius: 12px;
        background: rgba(5,8,22,.5);
      }
      .calo-after-chart-panel strong { display: block; margin-bottom: .9rem; font-size: .85rem; font-weight: 600; }
      .calo-after-chart-bars { display: flex; height: 130px; align-items: flex-end; gap: .5rem; }
      .calo-after-chart-bar-column { display: flex; height: 100%; flex: 1; flex-direction: column; justify-content: flex-end; }
      .calo-after-chart-bar { position: relative; width: 100%; border-radius: 5px 5px 0 0; }
      .calo-after-chart-bitcoin { height: 100%; background: var(--cac-purple); }
      .calo-after-chart-bitcoin span {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 62%;
        border: 2px dashed var(--cac-purple);
        border-bottom: 0;
        border-radius: 5px 5px 0 0;
      }
      .calo-after-chart-loan { height: 66%; background: rgba(183,192,216,.5); }
      .calo-after-chart-covered { background: var(--cac-aurora); }
      .calo-after-chart-policy { height: 66%; background: var(--cac-indigo); }
      .calo-after-chart-bar-column > span { margin-top: .4rem; color: var(--cac-mist); text-align: center; font-size: .75rem; }
      .calo-after-chart-panel p { margin: .9rem 0 0; color: var(--cac-white); font-size: .85rem; line-height: 1.5; }
      .calo-after-chart-fine { margin: 1rem 0 0; color: var(--cac-mist); text-align: center; font-size: .8rem; font-weight: 300; }
      .calo-after-chart-contact {
        border-top: 1px solid rgba(183,192,216,.16);
        background: linear-gradient(90deg,#050816 50%,#10172E 50%);
      }
      .calo-after-chart-contact-layout {
        display: grid;
        grid-template-columns: minmax(0, 1.1fr) minmax(280px, .9fr);
        align-items: center;
        gap: clamp(2rem, 5vw, 4rem);
      }
      .calo-after-chart-contact h2 { margin-bottom: 1.25rem; }
      .calo-after-chart-contact-copy { max-width: 760px; }
      .calo-after-chart-reason { margin-top: 1.6rem; }
      .calo-after-chart-reason h3 { margin-bottom: .2rem; font-size: 1.05rem; }
      .calo-after-chart-reason p { margin: 0; color: var(--cac-mist); font-size: .95rem; line-height: 1.55; }
      .calo-after-chart-four-cs {
        width: 100%;
        min-width: 0;
      }
      .calo-after-chart-four-cs > h3 { margin: 0; text-align: center; font-size: 1.4rem; }
      .calo-after-chart-four-cs-intro { margin: .35rem 0 1rem; color: var(--cac-mist); text-align: center; font-size: .9rem; }
      .calo-after-chart-pie-wrap {
        position: relative;
        width: 100%;
        max-width: 460px;
        aspect-ratio: 1;
        margin: 0 auto;
      }
      .calo-after-chart-four-cs-image {
        width: 100%;
        height: auto;
        filter: grayscale(1);
      }
      .calo-after-chart-hotspots { position: absolute; inset: 0; }
      .calo-after-chart-hotspot {
        position: absolute;
        z-index: 1;
        inset: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        border: 0;
        background: transparent;
        cursor: pointer;
        transition: filter .2s ease;
      }
      .calo-after-chart-hotspot::before {
        position: absolute;
        inset: 0;
        background: rgba(155,124,255,.72);
        content: "";
        opacity: 0;
        transition: opacity .16s ease;
      }
      .calo-after-chart-hotspot:hover,
      .calo-after-chart-hotspot:focus-visible { z-index: 2; }
      .calo-after-chart-hotspot:hover::before,
      .calo-after-chart-hotspot:focus-visible::before { opacity: .9; }
      .calo-after-chart-hotspot:focus-visible { outline: 2px solid var(--cac-white); outline-offset: 2px; }
      .calo-after-chart-hotspot-cash-alternatives {
        clip-path: polygon(7% 51%, 42% 51%, 47% 47%, 51% 52%, 55% 48%, 55% 97%, 48% 96%, 40% 94%, 32% 91%, 24% 87%, 17% 81%, 11% 74%, 6% 65%, 4% 57%);
      }
      .calo-after-chart-hotspot-commodities {
        clip-path: polygon(51% 3%, 43% 4%, 35% 7%, 27% 11%, 20% 17%, 14% 23%, 9% 31%, 5% 39%, 3% 47%, 45% 48%, 48% 46%, 43% 42%, 49% 36%, 49% 3%);
      }
      .calo-after-chart-hotspot-crypto {
        clip-path: polygon(52% 3%, 60% 4%, 68% 7%, 76% 11%, 83% 17%, 89% 23%, 94% 31%, 97% 39%, 99% 47%, 84% 48%, 79% 54%, 73% 48%, 55% 48%, 55% 46%, 61% 42%, 55% 36%, 55% 3%);
      }
      .calo-after-chart-hotspot-companies {
        clip-path: polygon(55% 52%, 69% 52%, 74% 58%, 79% 52%, 97% 52%, 96% 61%, 93% 70%, 89% 78%, 83% 85%, 76% 91%, 68% 95%, 59% 97%, 56% 96%, 56% 60%, 52% 55%);
      }
      .calo-after-chart-four-cs-detail {
        max-width: 460px;
        margin: 1rem auto 0;
        padding: 1.2rem 1.35rem;
        border: 1px solid rgba(183,192,216,.2);
        border-radius: 12px;
        background: rgba(26,35,64,.72);
        box-shadow: inset 0 1px 0 rgba(198,184,255,.12);
        transition: border-color .2s ease, box-shadow .2s ease;
      }
      .calo-after-chart-four-cs-detail h4 { margin: 0; color: var(--cac-aurora); font-size: 1.05rem; }
      .calo-after-chart-four-cs-detail p { margin: .4rem 0 0; color: var(--cac-mist); font-size: .86rem; line-height: 1.5; }
      .calo-after-chart-four-cs-detail ul { display: flex; flex-wrap: wrap; gap: .4rem; margin: .8rem 0; padding: 0; list-style: none; }
      .calo-after-chart-four-cs-detail li { padding: .24rem .55rem; border: 1px solid rgba(198,184,255,.2); border-radius: 999px; color: var(--cac-white); font-size: .72rem; line-height: 1.4; }
      .calo-after-chart-four-cs-detail a { color: var(--cac-aurora); font-size: .82rem; font-weight: 600; text-underline-offset: 3px; }
      .calo-after-chart-quote {
        max-width: 30em;
        margin: 2.25rem 0 0;
        padding-left: 1.25rem;
        border-left: 2px solid var(--cac-purple);
        color: var(--cac-aurora);
        font-family: Georgia, "Times New Roman", serif;
        font-size: 1.55rem;
        font-style: italic;
        font-weight: 500;
        line-height: 1.3;
      }
      .calo-after-chart-sky {
        position: absolute;
        z-index: 0;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        background: linear-gradient(118deg,transparent 34%,rgba(109,94,245,.09) 46%,rgba(198,184,255,.06) 52%,transparent 66%);
      }
      .calo-after-chart-sky::before,
      .calo-after-chart-sky::after {
        position: absolute;
        inset: 0;
        background-repeat: no-repeat;
        content: "";
      }
      .calo-after-chart-sky::before {
        background-image: radial-gradient(2px 2px at 61% 60%,rgba(198,184,255,.9),transparent),radial-gradient(1px 1px at 67% 63%,rgba(244,247,251,.95),transparent),radial-gradient(1px 1px at 59% 41%,rgba(244,247,251,.95),transparent),radial-gradient(1px 1px at 70% 91%,rgba(244,247,251,.95),transparent),radial-gradient(1px 1px at 52% 60%,rgba(198,184,255,.9),transparent),radial-gradient(1px 1px at 3% 70%,rgba(198,184,255,.9),transparent),radial-gradient(1px 1px at 6% 27%,rgba(244,247,251,.95),transparent),radial-gradient(1px 1px at 5% 62%,rgba(198,184,255,.9),transparent),radial-gradient(1.5px 1.5px at 77% 28%,rgba(244,247,251,.95),transparent),radial-gradient(1px 1px at 39% 66%,rgba(198,184,255,.9),transparent),radial-gradient(1px 1px at 12% 61%,rgba(198,184,255,.9),transparent),radial-gradient(1.5px 1.5px at 72% 13%,rgba(244,247,251,.95),transparent);
        animation: caloAfterChartTwinkle 6s ease-in-out infinite alternate;
      }
      .calo-after-chart-sky::after {
        background-image: radial-gradient(1px 1px at 28% 9%,rgba(244,247,251,.95),transparent),radial-gradient(2px 2px at 92% 53%,rgba(198,184,255,.9),transparent),radial-gradient(2px 2px at 74% 83%,rgba(244,247,251,.95),transparent),radial-gradient(1.5px 1.5px at 36% 46%,rgba(155,124,255,.85),transparent),radial-gradient(1px 1px at 44% 4%,rgba(198,184,255,.9),transparent),radial-gradient(2px 2px at 19% 34%,rgba(244,247,251,.95),transparent),radial-gradient(1px 1px at 9% 62%,rgba(244,247,251,.95),transparent),radial-gradient(2px 2px at 89% 74%,rgba(244,247,251,.95),transparent);
        animation: caloAfterChartTwinkle 9s ease-in-out -3s infinite alternate;
      }
      .calo-after-chart-sky > i {
        position: absolute;
        top: 7%;
        left: 64%;
        width: var(--cac-star-length, 180px);
        height: 1.5px;
        border-radius: 2px;
        background: linear-gradient(90deg,#fff 0%,rgba(198,184,255,.6) 30%,rgba(155,124,255,0) 100%);
        filter: drop-shadow(0 0 5px rgba(198,184,255,.85));
        opacity: 0;
        transform: rotate(-35deg);
        animation: caloAfterChartShoot var(--cac-star-duration, 12s) linear var(--cac-star-delay, 0s) infinite;
      }
      .calo-after-chart-sky > i:nth-child(2) { top: 24%; left: 93%; --cac-star-length: 120px; --cac-star-duration: 14s; --cac-star-delay: 5.5s; }
      .calo-after-chart-sky > i:nth-child(3) { top: 3%; left: 36%; --cac-star-length: 210px; --cac-star-duration: 19s; --cac-star-delay: 10s; }
      @keyframes caloAfterChartTwinkle { from { opacity: .25; } to { opacity: 1; } }
      @keyframes caloAfterChartShoot {
        0% { opacity: 0; transform: rotate(-35deg) translateX(0); }
        2%, 10% { opacity: 1; }
        13%, 100% { opacity: 0; transform: rotate(-35deg) translateX(-860px); }
      }
      @media (max-width: 860px) {
        .calo-after-chart-two { grid-template-columns: 1fr; }
        .calo-after-chart-contact { background: var(--cac-navy); }
        .calo-after-chart-contact-layout { grid-template-columns: 1fr; }
        .calo-after-chart-contact-copy { max-width: 700px; }
        .calo-after-chart-four-cs { max-width: 700px; justify-self: center; }
      }
      @media (max-width: 520px) {
        .calo-after-chart-grid,
        .calo-after-chart-comparison { grid-template-columns: 1fr; }
        .calo-after-chart-sky > i:nth-child(3) { display: none; }
      }
      @media (prefers-reduced-motion: reduce) {
        .calo-after-chart-card { transition: none; }
        .calo-after-chart-hotspot,
        .calo-after-chart-hotspot::before,
        .calo-after-chart-four-cs-detail { transition: none; }
        .calo-after-chart-sky > i { display: none; }
        .calo-after-chart-sky::before,
        .calo-after-chart-sky::after { animation: none; opacity: .8; }
      }
      .cc-slow-fade {
        animation: ccSlowFade 1.35s cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      @keyframes ccSlowFade {
        from {
          opacity: 0;
          transform: translateY(14px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .cc-slow-fade {
          animation: none;
        }
      }
      img, svg, video, canvas { display: block; max-width: 100%; height: auto; }
      a, button, input, textarea, select { max-width: 100%; }
      chat-widget {
        --chat-widget-bubble-color: linear-gradient(135deg, #6D5EF5 0%, #9B7CFF 42%, #C6B8FF 100%) !important;
        --chat-widget-button-color: linear-gradient(135deg, #6D5EF5 0%, #9B7CFF 42%, #C6B8FF 100%) !important;
      }
      .social-icon { width: clamp(2.9rem, 15vw, 5rem); }
      @media (max-width: 480px) {
        .social-icon { width: clamp(2.6rem, 16vw, 3.6rem); }
      }
      .schedule-call-radiant {
        background: linear-gradient(135deg, #6D5EF5 0%, #9B7CFF 42%, #C6B8FF 100%);
        box-shadow: 0 0 0 1px rgba(198, 184, 255, 0.4), 0 0 18px rgba(109, 94, 245, 0.55), 0 0 36px rgba(155, 124, 255, 0.35);
        animation: scheduleCallRadiance 2.8s ease-in-out infinite;
      }
      .schedule-call-radiant:hover {
        background: linear-gradient(135deg, #6D5EF5 0%, #9B7CFF 46%, #C6B8FF 100%);
      }
      .schedule-call-radiant:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px rgba(198, 184, 255, 0.6), 0 0 0 5px rgba(5, 8, 22, 0.95), 0 0 24px rgba(155, 124, 255, 0.55);
      }
      @keyframes scheduleCallRadiance {
        0% {
          box-shadow: 0 0 0 1px rgba(198, 184, 255, 0.4), 0 0 14px rgba(109, 94, 245, 0.42), 0 0 28px rgba(155, 124, 255, 0.28);
        }
        50% {
          box-shadow: 0 0 0 1px rgba(198, 184, 255, 0.5), 0 0 24px rgba(109, 94, 245, 0.62), 0 0 46px rgba(155, 124, 255, 0.42);
        }
        100% {
          box-shadow: 0 0 0 1px rgba(198, 184, 255, 0.4), 0 0 14px rgba(109, 94, 245, 0.42), 0 0 28px rgba(155, 124, 255, 0.28);
        }
      }
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
          radial-gradient(circle at 82% 72%, rgba(109, 94, 245,0.16) 0 16%, transparent 34%),
          linear-gradient(135deg, rgba(155, 124, 255,0.1) 0%, rgba(109, 94, 245,0.04) 34%, transparent 64%);
          radial-gradient(circle at 15% 60%, rgba(255,255,255,.42) 0 55px, transparent 56px),
        animation: cardAuroraDrift 18s ease-in-out infinite;
        0% { transform: translate3d(0, 0, 0); opacity: 0.18; }
        50% { transform: translate3d(-10px, 6px, 0); opacity: 0.28; }
        100% { transform: translate3d(0, 0, 0); opacity: 0.18; }
      }
        box-shadow: 0 0 0 1px rgba(192,132,252,0.12), 0 0 22px rgba(109, 94, 245,0.12);
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
          linear-gradient(122deg, transparent 0%, transparent 46%, rgba(155, 124, 255,0.09) 50%, transparent 54%, transparent 100%);
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
          box-shadow: 0 0 20px 8px rgba(255, 255, 255, 0.9), 0 0 40px 16px rgba(109, 94, 245, 0.6);
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
          box-shadow: 0 0 20px 8px rgba(255, 255, 255, 0.4), 0 0 40px 16px rgba(109, 94, 245, 0.2);
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
          rgba(198, 184, 255, 0.9),
          rgba(198, 184, 255, 0.8),
          transparent
        );
        box-shadow:
          0 0 8px rgba(198, 184, 255, 0.9),
          0 0 18px rgba(155, 124, 255, 0.55);
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
          0 0 22px rgba(198, 184, 255, 0.9),
          0 0 34px rgba(155, 124, 255, 0.7);
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
        background: #9B7CFF;
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
  const [currentPage, setCurrentPage] = useState(getPageFromLocation());
  const [renderedPage, setRenderedPage] = useState(getPageFromLocation());
  const [transitionPhase, setTransitionPhase] = useState("idle");
  const [pendingPage, setPendingPage] = useState(null);
  const transitionTimerRef = useRef(null);

  const TRANSITION_OUT_MS = 160;
  const TRANSITION_IN_MS = 280;

  const clearTransitionTimer = useCallback(() => {
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
  }, []);

  const startPageTransition = useCallback(
    (nextPage) => {
      if (nextPage === renderedPage) {
        setCurrentPage(nextPage);
        if (nextPage === "Financial Topics") {
          requestAnimationFrame(scrollToFinancialTopicsLocation);
        }
        return;
      }

      clearTransitionTimer();
      setCurrentPage(nextPage);
      setPendingPage(nextPage);
      setTransitionPhase("out");
    },
    [clearTransitionTimer, renderedPage]
  );

  useEffect(() => {
    function handleLocationChange() {
      startPageTransition(getPageFromLocation());
    }

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, [startPageTransition]);

  useEffect(() => {
    if (transitionPhase === "out" && pendingPage) {
      clearTransitionTimer();
      transitionTimerRef.current = setTimeout(() => {
        setRenderedPage(pendingPage);
        setTransitionPhase("in");
      }, TRANSITION_OUT_MS);
      return;
    }

    if (transitionPhase === "in") {
      clearTransitionTimer();
      transitionTimerRef.current = setTimeout(() => {
        setTransitionPhase("idle");
        setPendingPage(null);
      }, TRANSITION_IN_MS);
    }
  }, [clearTransitionTimer, pendingPage, transitionPhase]);

  useEffect(() => {
    return () => clearTransitionTimer();
  }, [clearTransitionTimer]);

  useEffect(() => {
    if (renderedPage === "Financial Topics" || renderedPage === "Contact" || renderedPage === "Legal" || renderedPage === "FAQs") return;

    requestAnimationFrame(() => {
      scrollToHomeSection(renderedPage === "Home" ? currentPage : renderedPage);
    });
  }, [currentPage, renderedPage]);

  useEffect(() => {
    if (renderedPage !== "Financial Topics") return;
    requestAnimationFrame(scrollToFinancialTopicsLocation);
  }, [renderedPage]);

  function setPage(page, hash = "") {
    if (page === "Financial Topics" || page === "Four C's") {
      window.history.pushState({}, "", pageRoutes[page]);
      setCurrentPage(page);
      setRenderedPage("Financial Topics");
      setTransitionPhase("idle");
      setPendingPage(null);
      requestAnimationFrame(scrollToFinancialTopicsLocation);
      return;
    }

    if (page === "Contact") {
      window.history.pushState({}, "", "/contact");
      setCurrentPage(page);
      setRenderedPage("Contact");
      setTransitionPhase("idle");
      setPendingPage(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (page === "FAQs") {
      window.history.pushState({}, "", "/faqs");
      setCurrentPage(page);
      setRenderedPage(page);
      setTransitionPhase("idle");
      setPendingPage(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (page === "Legal") {
      window.history.pushState({}, "", `/legal${hash ? `#${hash}` : ""}`);
      setCurrentPage(page);
      setRenderedPage(page);
      setTransitionPhase("idle");
      setPendingPage(null);
      requestAnimationFrame(() => {
        if (hash) {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
      return;
    }

    if (renderedPage === "Contact" || renderedPage === "Financial Topics" || renderedPage === "Legal" || renderedPage === "FAQs") {
      window.history.pushState({}, "", "/");
    }

    const sectionMap = {
      Home: "",
      Explore: "crypto-candlestick",
      "Why invest": "crypto-candlestick",
    };

    const targetSectionId = sectionMap[page];
    if (targetSectionId) {
      const element = document.getElementById(targetSectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (page === "Home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }

    setCurrentPage(page);
    setRenderedPage("Home");
    setTransitionPhase("idle");
    setPendingPage(null);
  }

  function goToSection(id) {
    const scroll = () => {
      if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
      else document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (renderedPage !== "Home") {
      window.history.pushState({}, "", "/");
      setCurrentPage("Home");
      setRenderedPage("Home");
      setTransitionPhase("idle");
      setPendingPage(null);
      setTimeout(scroll, 150);
    } else {
      scroll();
    }
  }

  const isFinancialTopicsPage = renderedPage === "Financial Topics";
  const pageTransitionStateClass = transitionPhase === "out" ? "opacity-0 translate-y-1 scale-[0.998]" : "opacity-100 translate-y-0 scale-100";
  const pageTransitionStyle = {
    filter: transitionPhase === "out" ? "blur(1.2px)" : "blur(0px)",
  };

  return (
    <main className="min-h-screen bg-[#050816] font-body">
      <GlobalStyles />
      <MarketTicker coins={coins} live={live} />
      <Navbar currentPage={currentPage} setPage={setPage} goToSection={goToSection} />
      <div
        className={`transform-gpu will-change-transform transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${pageTransitionStateClass}`}
        style={pageTransitionStyle}
      >
        {renderedPage === "Contact" ? <ContactPage /> : renderedPage === "Legal" ? <LegalPage /> : renderedPage === "FAQs" ? <FaqsPage /> : isFinancialTopicsPage ? <FinancialTopicsPage /> : <HomePage setPage={setPage} />}
      </div>
      <Footer setPage={setPage} />
    </main>
  );
}
