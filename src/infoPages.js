const product = (title, intro, how, fit, consider) => ({
  eyebrow: "Financing",
  title,
  intro,
  sections: [
    { heading: "How it works", body: how },
    { heading: "Who it's typically for", list: fit },
    { heading: "Things to consider", list: consider },
  ],
  related: ["/financing", "/faqs", "/contact"],
});

const industry = (title, intro, uses, considerations, products) => ({
  eyebrow: "Industries",
  title,
  intro,
  sections: [
    { heading: "Common ways businesses use capital", list: uses },
    { heading: "What lenders often look at", list: considerations },
    { heading: "Products to explore", links: products },
  ],
  related: ["/financing", "/faqs", "/contact"],
});

const productLinks = {
  sba: ["SBA Loans", "/financing/sba-loans"],
  term: ["Term Loans", "/financing/term-loans"],
  loc: ["Line of Credit", "/financing/line-of-credit"],
  equip: ["Equipment Financing", "/financing/equipment-financing"],
  rbf: ["Revenue-Based Financing", "/financing/revenue-based-financing"],
  btc: ["Bitcoin-Backed Loans", "/financing/bitcoin-backed-loans"],
};

export const INFO_PAGES = {
  "/financing": {
    eyebrow: "Financing",
    title: "Financing types",
    intro: "Different goals call for different capital. Here is a plain-language overview of the options we help you compare.",
    sections: [
      { heading: "Explore each option", links: Object.values(productLinks) },
      {
        heading: "Not sure where to start?",
        body: [
          "Use the qualify calculator on the home page for an estimate of which products may fit your profile, or talk with our team. Estimates are for illustration only and are not an offer or approval.",
        ],
      },
    ],
    related: ["/faqs", "/contact"],
  },
  "/financing/sba-loans": product(
    "SBA Loans",
    "Loans partially guaranteed by the U.S. Small Business Administration, offered through participating lenders, often with longer terms and competitive rates.",
    [
      "A participating lender makes the loan and the SBA guarantees a portion of it, which can make lenders more comfortable approving qualified small businesses.",
      "Funds are commonly used for working capital, expansion, refinancing eligible debt, or purchasing equipment or real estate.",
    ],
    ["Established businesses with solid credit and documented revenue", "Owners who can wait longer for a decision in exchange for longer terms", "Businesses planning larger, longer-term investments"],
    ["The application typically requires more documentation and takes longer than other products", "Eligibility, rates and terms are set by the SBA and the lender", "Collateral or a personal guarantee may be required"]
  ),
  "/financing/term-loans": product(
    "Term Loans",
    "A lump sum of capital repaid in regular installments over a set period.",
    [
      "You receive the full amount up front and repay it, plus interest and any fees, on a fixed schedule.",
      "Term loans suit one-time needs with a clear purpose, such as an expansion, a renovation or a large purchase.",
    ],
    ["Businesses with steady revenue and a defined use of funds", "Owners who prefer predictable payments", "Companies with some operating history"],
    ["Total cost depends on the rate, term and fees, so compare the full cost of each offer", "Missed payments can affect your credit and your business", "Lenders may ask for collateral or a personal guarantee"]
  ),
  "/financing/line-of-credit": product(
    "Line of Credit",
    "Flexible, revolving access to capital you draw on only when you need it.",
    [
      "You are approved for a limit and can borrow, repay and borrow again within that limit.",
      "Interest is usually charged only on the amount you draw, which helps smooth out seasonal swings and cover short-term gaps.",
    ],
    ["Businesses with uneven cash flow or seasonal demand", "Owners who want a safety net for unexpected costs", "Companies that need frequent, smaller amounts of capital"],
    ["Rates are often variable", "Some lines carry maintenance, draw or renewal fees", "Limits can be reviewed or reduced by the lender"]
  ),
  "/financing/equipment-financing": product(
    "Equipment Financing",
    "Financing used to buy or lease the equipment your business runs on, with the equipment typically serving as the collateral.",
    [
      "The lender funds the purchase and you repay over a term that is often matched to the equipment's useful life.",
      "Because the equipment secures the financing, lenders may be more flexible on other requirements.",
    ],
    ["Trucking, construction, healthcare, restaurant and similar equipment-heavy businesses", "Owners who want to preserve cash for other needs", "Businesses replacing or upgrading machinery and vehicles"],
    ["The equipment may be repossessed if payments are missed", "Equipment can lose value faster than the loan balance falls", "Ask about tax treatment with your accountant"]
  ),
  "/financing/revenue-based-financing": product(
    "Revenue-Based Financing",
    "Capital repaid as a share of your revenue, so payments rise and fall with your sales.",
    [
      "You receive funds up front and repay through a percentage of daily or monthly revenue until the agreed amount is repaid.",
      "It can be faster to obtain than traditional loans and may rely more on revenue than on credit history.",
    ],
    ["Businesses with consistent card or online sales", "Owners who need speed and flexibility", "Companies that may not yet meet traditional loan requirements"],
    ["It can cost more than traditional loans, so review the total repayment amount", "Frequent repayments can strain cash flow", "Read the agreement carefully before you sign"]
  ),
  "/financing/bitcoin-backed-loans": {
    eyebrow: "Financing",
    title: "Bitcoin-Backed Loans",
    intro: "Borrow against your Bitcoin without selling it. Loan terms, collateral requirements and risks vary by provider.",
    sections: [
      {
        heading: "How it works",
        body: [
          "You pledge Bitcoin as collateral and receive a loan in cash or stablecoins. The loan amount is a percentage of your collateral's value, known as the loan-to-value ratio.",
          "If you repay as agreed, your collateral is returned. Holding rather than selling may be of interest to some owners for planning reasons.",
        ],
      },
      {
        heading: "Who it's typically for",
        list: ["Bitcoin holders who want liquidity without selling", "Business owners who want to fund operations or growth", "Borrowers who are comfortable with the risks of a volatile asset"],
      },
      {
        heading: "Important risks",
        list: [
          "Bitcoin's price can change quickly. If the value of your collateral falls, you may be asked to add collateral or repay part of the loan, and the collateral may be liquidated.",
          "Providers differ in how they custody and protect collateral. Understand who holds your assets and under what terms.",
          "Tax treatment can vary. Consult a qualified tax professional.",
          "This page is educational and is not investment, tax or legal advice.",
        ],
      },
    ],
    related: ["/financing", "/faqs", "/contact"],
  },
  "/industries/construction": industry(
    "Construction",
    "Project timing, equipment and payroll can create gaps between spending and getting paid.",
    ["Covering payroll and materials between project payments", "Buying or financing heavy equipment and vehicles", "Bonding and project start-up costs"],
    ["Contracts and backlog", "Time in business and revenue history", "Credit profile and existing obligations"],
    [productLinks.loc, productLinks.equip, productLinks.sba]
  ),
  "/industries/healthcare": industry(
    "Healthcare",
    "Practices and care providers often need capital for equipment, space and staffing.",
    ["Purchasing diagnostic and clinical equipment", "Opening or expanding a practice", "Managing cash flow while waiting on insurance reimbursements"],
    ["Practice history and licensing", "Revenue and payer mix", "Credit profile and existing obligations"],
    [productLinks.equip, productLinks.term, productLinks.sba]
  ),
  "/industries/retail": industry(
    "Retail",
    "Seasonal demand and inventory cycles make flexible working capital valuable.",
    ["Stocking inventory ahead of busy seasons", "Opening or renovating locations", "Investing in e-commerce and marketing"],
    ["Sales consistency and seasonality", "Inventory and margins", "Credit profile and time in business"],
    [productLinks.loc, productLinks.rbf, productLinks.term]
  ),
  "/industries/restaurants": industry(
    "Restaurants",
    "Kitchens, build-outs and day-to-day costs add up quickly.",
    ["Buying kitchen and point-of-sale equipment", "Renovating or opening a location", "Covering slow periods and rising food costs"],
    ["Daily and monthly sales", "Time in business and lease terms", "Credit profile and existing obligations"],
    [productLinks.equip, productLinks.loc, productLinks.rbf]
  ),
  "/industries/trucking": industry(
    "Trucking",
    "Vehicles, fuel and delayed customer payments put pressure on cash flow.",
    ["Financing trucks and trailers", "Covering fuel, repairs and insurance", "Bridging the wait for invoice payments"],
    ["Operating history and contracts", "Revenue and equipment condition", "Credit profile and existing obligations"],
    [productLinks.equip, productLinks.loc, productLinks.term]
  ),
  "/industries/crypto-web3": industry(
    "Crypto & Web3",
    "Digital-asset businesses and holders often find traditional lenders cautious. We help you understand the options and the risks.",
    ["Funding operations and growth without selling digital assets", "Borrowing against Bitcoin holdings", "Managing working capital for a digital-asset business"],
    ["Business structure and compliance posture", "Collateral type, custody and loan-to-value", "Revenue and credit profile"],
    [productLinks.btc, productLinks.term, productLinks.loc]
  ),
  "/accessibility": {
    eyebrow: "Calo Capital",
    title: "Accessibility",
    intro: "We want everyone to be able to use this website.",
    sections: [
      {
        heading: "Our commitment",
        body: [
          "We aim to make our website usable for people with a wide range of abilities, including keyboard navigation, readable contrast and descriptive labels.",
          "We are continually improving. If something on our site is hard to use, please tell us and we will work to fix it or provide the information another way.",
        ],
      },
      {
        heading: "Contact us",
        body: ["Email protection@calocapital.io or call (650) 658-6822 and tell us which page you were using and what difficulty you ran into."],
      },
    ],
    related: ["/contact", "/faqs"],
  },
  "/sitemap": {
    eyebrow: "Calo Capital",
    title: "Sitemap",
    intro: "Every page of the site in one place.",
    sections: [
      {
        heading: "Main pages",
        links: [["Home", "/"], ["Financial Topics", "/financial-topics"], ["FAQs", "/faqs"], ["Contact", "/contact"]],
      },
      { heading: "Financing", links: [["All financing types", "/financing"], ...Object.values(productLinks)] },
      {
        heading: "Industries",
        links: [
          ["Construction", "/industries/construction"],
          ["Healthcare", "/industries/healthcare"],
          ["Retail", "/industries/retail"],
          ["Restaurants", "/industries/restaurants"],
          ["Trucking", "/industries/trucking"],
          ["Crypto & Web3", "/industries/crypto-web3"],
        ],
      },
      { heading: "Legal", links: [["Privacy Policy", "/legal#privacy-policy"], ["Terms & Conditions", "/legal#terms"], ["Accessibility", "/accessibility"]] },
    ],
    related: ["/contact"],
  },
};

export const INFO_RELATED_LABELS = {
  "/financing": "All financing types",
  "/faqs": "FAQs",
  "/contact": "Contact us",
};
