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

const REVIEWED = "October 11, 2026";
const AUTHOR = "Marc J. Calo, Licensed Insurance Agent, NPN 17700283";

const DIGITAL_ASSET_DISCLOSURE =
  "Digital assets are volatile and can lose value. Digital assets held in custody are not FDIC- or SIPC-insured. Borrowing against digital assets carries liquidation risk. CaloCapital does not provide investment advice or recommend any digital asset, and is not a broker-dealer or registered investment adviser. Services are subject to eligibility, identity verification and state availability.";

export const INFO_PAGES = {
  "/life-insurance": {
    eyebrow: "Insurance",
    title: "Life Insurance",
    intro: "CaloCapital is an independent insurance agency in Nashville, Tennessee, helping families and business owners with life insurance.",
    author: AUTHOR,
    reviewed: REVIEWED,
    sections: [
      {
        heading: "How we approach life insurance",
        body: ["Before we recommend any insurance, we look at what a family or business already has, in four areas, and ask how each one is protected and passed on."],
      },
      {
        heading: "Where life insurance can fit",
        list: [
          "Cash value life insurance, where guarantees can help with the money you need to stay reachable and stable",
          "Coverage that gives your heirs or your lender cash, so a bitcoin-backed loan or estate costs don't force a sale at the wrong time",
          "Key person coverage and buy-sell funding for business owners",
        ],
      },
    ],
    related: ["/fixed-annuities", "/business-owner-coverage", "/contact"],
  },
  "/fixed-annuities": {
    eyebrow: "Insurance",
    title: "Fixed Annuities",
    intro: "CaloCapital is an independent insurance agency in Nashville, Tennessee, helping families and business owners with fixed annuities and retirement income.",
    author: AUTHOR,
    reviewed: REVIEWED,
    sections: [
      {
        heading: "How we approach fixed annuities",
        body: ["Before we recommend any insurance, we look at what a family or business already has, in four areas, and ask how each one is protected and passed on."],
      },
      {
        heading: "Where fixed annuities can fit",
        body: ["For the money you need to stay reachable and stable, we look at where guarantees can help, such as cash value life insurance and fixed annuities."],
      },
    ],
    related: ["/life-insurance", "/business-owner-coverage", "/contact"],
  },
  "/business-owner-coverage": {
    eyebrow: "Insurance",
    title: "Business Owner Coverage",
    intro: "CaloCapital is an independent insurance agency in Nashville, Tennessee, helping business owners protect the company they own or lead.",
    author: AUTHOR,
    reviewed: REVIEWED,
    sections: [
      {
        heading: "What we look at",
        body: ["We look at what happens to your business if a key person dies or a partner leaves."],
      },
      {
        heading: "Coverage and planning",
        list: ["Key person coverage", "Buy-sell funding", "Succession planning"],
      },
    ],
    related: ["/life-insurance", "/fixed-annuities", "/contact"],
  },
  "/digital-asset-services": {
    eyebrow: "Digital assets",
    title: "Digital Asset Services",
    intro: "CaloCapital helps individuals, families and business owners hold, use and pass on digital assets with institutional-grade infrastructure, without the seed-phrase risk of self-custody.",
    author: AUTHOR,
    reviewed: REVIEWED,
    cta: { label: "Join the waitlist", href: "/contact#waitlist" },
    sections: [
      { heading: "Institutional custody", body: ["Your assets are held with a qualified custodian in a dedicated account under CaloCapital's institutional platform, with multi-approval security controls and recoverable access."] },
      { heading: "Funding and transfers", body: ["Fund your account by wire, ACH or a linked bank account, and move assets in or out from existing wallets and exchanges."] },
      { heading: "Buy and sell", body: ["Purchase or sell bitcoin and ether, including scheduled recurring purchases, executed through institutional trading access. CaloCapital executes your instructions and does not recommend what or when to buy."] },
      { heading: "Staking access", body: ["Stake eligible assets through the platform. Rewards vary by network, are not guaranteed, and can involve lock-up periods."] },
      { heading: "Borrowing against your bitcoin", body: ["Access cash without selling your holdings, through a loan secured by your digital assets. Rates, loan-to-value limits and terms are set by the lender, and a drop in value can trigger a margin call or liquidation."] },
      { heading: "Inheritance and access planning", body: ["Make sure your family can reach your digital assets if something happens to you. We coordinate account access, beneficiary instructions and your estate attorney."] },
      { heading: "Life insurance for digital asset holders", body: ["Coverage that gives your heirs or your lender cash, so a bitcoin-backed loan or estate costs don't force a sale at the wrong time."] },
      { heading: "For businesses: treasury custody infrastructure", body: ["Institutional custody for company-held digital assets, with approval workflows, user permissions and account reporting for owners and finance teams."] },
    ],
    note: DIGITAL_ASSET_DISCLOSURE,
    related: ["/life-insurance", "/contact"],
  },
  "/about": {
    eyebrow: "About",
    title: "About CaloCapital",
    intro: "CaloCapital is an independent insurance agency in Nashville, Tennessee, helping families and business owners with life insurance, fixed annuities and retirement income.",
    author: AUTHOR,
    reviewed: REVIEWED,
    sections: [
      { heading: "Founder", body: ["Marc J. Calo, Licensed Insurance Agent, NPN 17700283."] },
      { heading: "Licensed states", body: ["Alabama, Connecticut, Florida, Georgia, Idaho, Kentucky, Maryland, Nebraska, Nevada, New Jersey, New York (resident), North Carolina, Ohio, Pennsylvania, South Carolina, Tennessee, Texas, Utah, Virginia, Washington, Wyoming."] },
      { heading: "Office", body: ["159 4th Avenue North, Suite 200, Nashville, TN 37219. Phone 917-400-9543. Email marc@calocapital.io."] },
    ],
    related: ["/life-insurance", "/fixed-annuities", "/contact"],
  },
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
    eyebrow: "CaloCapital",
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
        body: ["Email marc@calocapital.io or call 917-400-9543 and tell us which page you were using and what difficulty you ran into."],
      },
    ],
    related: ["/contact", "/faqs"],
  },
  "/articles/business-funding": {
    eyebrow: "Category: Business funding",
    title: "What Could Your Business Become With the Right Funding?",
    intro: "Big business moves often begin with a clear idea, and the capital to help bring it to life. Whether your next step is expanding, purchasing equipment, managing cash flow, or pursuing a new opportunity, the right funding may help you move forward. Before you choose a path, take time to understand your options so your financing decision aligns with your business goals.",
    readTime: "Estimated reading time: 3–4 minutes.",
    sections: [
      {
        heading: "Understanding Your Business Funding Options",
        body: ["One funding choice can open one door, and the right fit depends on what your business needs next. Here are common financing options to explore."],
        items: [
          { heading: "Business Term Loans", body: "Need a defined amount for a defined purpose? Receive a lump sum and repay it over an agreed period. These loans may help finance expansion, inventory, equipment, or major business expenses." },
          { heading: "Business Lines of Credit", body: "Looking for flexibility? Access funds up to an approved limit as needed. A line of credit can help manage cash flow fluctuations and unexpected expenses." },
          { heading: "SBA Loans", body: "For eligible small businesses, SBA-backed loans offered through participating lenders may support working capital, equipment, real estate, and other approved needs." },
          { heading: "Equipment Financing", body: "When the right tools can move your business forward, equipment financing can help fund machinery, vehicles, technology, and other business equipment without necessarily paying the entire cost upfront." },
          { heading: "Invoice Financing", body: "Waiting on customer payments? Access funds based on eligible unpaid invoices to help manage cash flow while you wait." },
          { heading: "Working Capital Financing", body: "Keep day-to-day operations moving with financing that may help cover payroll, supplies, inventory, and other operating costs." },
        ],
        note: "Availability, eligibility, and terms vary by lender and financing product.",
      },
      {
        heading: "How to Choose the Right Funding",
        body: ["Ready to narrow the field? Before you pursue financing, ask these five questions:"],
        list: [
          ["What's your goal?", "Start with the outcome you want the funds to accomplish."],
          ["How much do you need?", "Build a clear cost estimate and avoid borrowing more than necessary."],
          ["How soon do you need it?", "Plan around application and funding timelines, which can vary."],
          ["Can you manage repayment?", "Look closely at your revenue, expenses, and existing debt."],
          ["What will it cost?", "Compare interest, fees, repayment schedules, and other conditions."],
        ],
        after: ["The best fit should support today's priorities without losing sight of your long-term financial plans."],
      },
      {
        heading: "Turn Your Business Goals Into Action",
        body: [
          "Good funding decisions begin before an application. Gather your financial records, map out exactly how you'll use the funds, and set realistic expectations for growth and repayment.",
          "Whether you're planning to expand operations, invest in equipment, or strengthen cash flow, a clear view of your options can help you move forward with greater confidence and make a more informed decision.",
        ],
      },
      {
        heading: "What could your business unlock with the right funding?",
        body: ["Ready to explore what may fit? Visit the CaloCapital Funding Portal and take the next step toward your business goals."],
        links: [["CaloCapital Funding Portal", "https://app.calocapital.io/#/debt"]],
        button: true,
      },
    ],
    note: "Disclaimer: This article is for informational purposes only. It does not constitute financial advice or guarantee funding approval. Financing terms and eligibility depend on the lender, financing product, and applicant qualifications.",
    related: ["/financing", "/contact", "/faqs"],
  },
  "/sitemap": {
    eyebrow: "CaloCapital",
    title: "Sitemap",
    intro: "Every page of the site in one place.",
    sections: [
      {
        heading: "Main pages",
        links: [["Home", "/"], ["About", "/about"], ["Life Insurance", "/life-insurance"], ["Fixed Annuities", "/fixed-annuities"], ["Business Owner Coverage", "/business-owner-coverage"], ["Digital Asset Services", "/digital-asset-services"], ["FAQs", "/faqs"], ["Contact", "/contact"]],
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
  "/life-insurance": "Life insurance",
  "/fixed-annuities": "Fixed annuities",
  "/business-owner-coverage": "Business owner coverage",
};
