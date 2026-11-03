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
    intro: "CaloCapital is an independent insurance agency in Nashville, Tennessee, helping individuals, families and business owners explore life insurance, retirement savings and annuity options, digital-asset services, business funding and debt consolidation.",
    author: AUTHOR,
    reviewed: REVIEWED,
    sections: [
      { heading: "How we help", body: ["We help people understand available options and connect with providers where appropriate. Services may include life insurance, fixed annuities and retirement income planning, digital-asset services, business funding and debt-consolidation financing. Product availability, eligibility and terms vary. We are not a lender or registered investment adviser, and information on this site is educational rather than individualized investment advice."] },
      { heading: "Your information", body: ["Some forms on this site ask for personal or business information so we can respond to your request. We do not sell your personal information. See our Privacy Policy for details about what we collect, how we use it and when information may be shared to provide a service you request."] },
      { heading: "Founder", body: ["Marc J. Calo, Licensed Insurance Agent, NPN 17700283."] },
      { heading: "Licensed states", body: ["Alabama, Connecticut, Florida, Georgia, Idaho, Kentucky, Maryland, Nebraska, Nevada, New Jersey, New York (resident), North Carolina, Ohio, Pennsylvania, South Carolina, Tennessee, Texas, Utah, Virginia, Washington, Wyoming."] },
      { heading: "Office", body: ["159 4th Avenue North, Suite 200, Nashville, TN 37219. Phone 917-400-9543. Email questions@calocapital.io."] },
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
        body: ["Email questions@calocapital.io or call 917-400-9543 and tell us which page you were using and what difficulty you ran into."],
      },
    ],
    related: ["/contact", "/faqs"],
  },
  "/articles/life-insurance-family-protection": {
    eyebrow: "Calo Library · Life insurance",
    title: "What happens to my family when I pass away?",
    intro: "Life insurance can replace money a household depends on, but a policy only helps if its amount, duration, ownership and beneficiary details match the people and bills it is meant to protect.",
    readTime: "5-minute read · Reviewed November 3, 2026.",
    sections: [
      {
        heading: "Start with the bills and responsibilities that would remain",
        body: [
          "List the people who rely on your income and the expenses they would still face: housing, utilities, food, childcare, education, debts and funeral costs. Then subtract resources that could realistically be used, such as savings, other household income and existing coverage. This is a planning worksheet, not a formula that determines the right policy for everyone.",
          "Consider how long support is needed. A young family may need income replacement for many years; someone with grown children and little debt may have different needs. Revisit the estimate after major changes such as a new child, home purchase, divorce, job change or retirement.",
        ],
      },
      {
        heading: "Term and cash-value policies solve different problems",
        body: [
          "Term insurance covers a specified period. It is often used when a need has an expected end date, such as years until children are financially independent or a mortgage is substantially paid down. Coverage may end at the term date; renewal can cost more, and not every policy allows renewal.",
          "Cash-value policies, including whole, universal and variable life, combine a death benefit with a policy value and can be designed to remain in force longer. They are more complex: premiums, guarantees, expenses, surrender charges, investment risk and the effect of loans or withdrawals depend on the contract. Ask for a clear explanation of guaranteed values versus non-guaranteed illustrations, and what happens if premiums or performance differ from assumptions.",
        ],
      },
      {
        heading: "Check work coverage and beneficiary records",
        body: [
          "Workplace life coverage may be useful, but check whether it ends when employment ends, whether it can be converted or continued, what the new premium would be and whether the amount follows you to another job. Get the answers from the plan documents rather than assuming coverage is portable.",
          "A policy generally pays the named beneficiary under its terms. Review names, contact details and contingent beneficiaries after life changes; a will does not necessarily update a policy's beneficiary designation. Coordinate the documents with qualified legal advice where needed.",
        ],
      },
      {
        heading: "Before buying, compare the policy—not just the premium",
        list: [
          ["Ask what is guaranteed.", "Request the premium schedule, term end date, renewal or conversion rights, exclusions, and circumstances that could change costs or benefits."],
          ["Understand the application.", "Answer health and lifestyle questions accurately. Ask what information the insurer will verify and what happens if a material answer is incomplete."],
          ["Plan for missed payments.", "Find the grace period, reinstatement rules and any effect of a lapse. A lower initial premium may not tell you what coverage costs later."],
          ["Verify the company and agent.", "Use your state insurance department or the NAIC consumer resources to check licensing and ask questions before signing."],
        ],
      },
      {
        heading: "If you are helping settle an estate",
        body: ["Keep insurer names, policy numbers and agent contact information somewhere a trusted person can find them. If a family member has died and a policy is missing, the NAIC's free Life Insurance Policy Locator can help a beneficiary request a search."],
      },
    ],
    sources: [
      ["NAIC: Life Insurance consumer guide", "https://content.naic.org/consumer/life-insurance.htm"],
      ["NAIC: Life Insurance Buyer's Guide (PDF)", "https://content.naic.org/sites/default/files/publication-lig-lp-consumer-life.pdf"],
      ["NAIC: Life Insurance Policy Locator", "https://content.naic.org/article/learn-how-use-naic-life-insurance-policy-locator"],
    ],
    note: "General education only, not a recommendation to buy or replace coverage. Policy terms, state rules and individual needs differ. Review the actual contract with a properly licensed insurance professional.",
    related: ["/life-insurance", "/contact", "/faqs"],
  },
  "/articles/medical-costs": {
    eyebrow: "Calo Library · Protecting your family",
    title: "What if a health crisis became your family's financial crisis?",
    intro: "Health insurance can reduce financial risk, but it does not make every bill predictable. Knowing how deductibles, network rules, claim reviews and assistance programs work can help you spot a problem before it grows.",
    readTime: "5-minute read · Reviewed November 3, 2026.",
    sections: [
      {
        heading: "An out-of-pocket maximum is not a cap on every health expense",
        body: [
          "For covered care, a plan's deductible, copayments and coinsurance generally count toward its in-network annual out-of-pocket limit. Premiums do not count. Neither do services the plan does not cover, and out-of-network charges may be treated differently. Check your own plan document for the applicable limits and exceptions.",
          "That means a household can hit its plan limit and still owe premiums, non-covered care, some out-of-network costs or other bills. A plan's Summary of Benefits and Coverage is a useful comparison document; the policy or plan contract controls the details.",
        ],
      },
      {
        heading: "Know when federal surprise-billing protections may help",
        body: [
          "The No Surprises Act protects many people with private health coverage from certain unexpected out-of-network bills, including emergency services and some care from out-of-network clinicians at in-network facilities. Protections have specific conditions and exceptions; they do not erase every out-of-network bill or every medical debt.",
          "If a bill seems to involve a surprise out-of-network charge, compare it with your plan's explanation of benefits and contact the insurer and provider. CMS explains covered situations and how to ask questions or submit a complaint.",
        ],
      },
      {
        heading: "When a bill arrives, verify before paying or ignoring it",
        list: [
          ["Match the paperwork.", "Compare the provider's bill with the explanation of benefits. Check dates, services, insurer payments and patient responsibility; an explanation of benefits is not itself a bill."],
          ["Request an itemized statement.", "Ask the provider to explain unfamiliar charges, duplicate entries or care you do not recognize. Contact the insurer about a claim that appears processed incorrectly."],
          ["Ask about help early.", "Ask the provider's billing office about a payment plan, discounts or financial assistance. Tax-exempt hospitals must maintain a written financial assistance policy, but eligibility and the application process depend on that policy."],
          ["Keep records and deadlines.", "Save bills, claim decisions, call dates and names. If a debt collector contacts you, request and review the debt information and dispute errors promptly using the instructions in the notice."],
        ],
      },
      {
        heading: "Prepare before care when you have time",
        body: [
          "For planned care, confirm that the facility and clinicians are in-network, ask the insurer how the service is covered, and request a written estimate from the provider. Network status can change, so confirm close to the appointment. If you are uninsured or choose not to use insurance, federal rules may give you a right to a good-faith estimate for scheduled care.",
          "Keep your insurer's member-services number and plan ID accessible. In an emergency, do not delay necessary care to investigate billing; check protections and paperwork afterward.",
        ],
      },
    ],
    sources: [
      ["CFPB: What to know about surprise medical bills and the No Surprises Act", "https://www.consumerfinance.gov/ask-cfpb/what-is-a-surprise-medical-bill-and-what-should-i-know-about-the-no-surprises-act-en-2123/"],
      ["HealthCare.gov: Out-of-pocket maximum", "https://www.healthcare.gov/glossary/out-of-pocket-maximum-limit/"],
      ["CMS: Know your rights against surprise medical bills", "https://www.cms.gov/medical-bill-rights"],
      ["IRS: Hospital financial assistance policies", "https://www.irs.gov/charities-non-profits/financial-assistance-policy-and-emergency-medical-care-policy-section-501r4"],
      ["CFPB: Debt collection—understand your rights", "https://www.consumerfinance.gov/consumer-tools/debt-collection/"],
    ],
    note: "This article is general education, not medical, insurance, tax or legal advice. Coverage and billing rights depend on the plan, service, provider and circumstances. Contact your insurer, provider or a qualified adviser about your situation.",
    related: ["/life-insurance", "/contact", "/faqs"],
  },
  "/articles/emergency-fund": {
    eyebrow: "Calo Library · Retirement and the future",
    title: "Could you cover six months of life if income stopped tomorrow?",
    intro: "An emergency reserve can keep a car repair, medical bill or income interruption from immediately becoming expensive debt. Six months is a familiar rule of thumb—not a universal requirement or a number that fits every household.",
    readTime: "4-minute read · Reviewed November 3, 2026.",
    sections: [
      {
        heading: "Choose a target based on your real risks",
        body: [
          "The CFPB recommends thinking about the unexpected expenses you have faced and your own situation. Start by adding essential monthly costs—housing, utilities, food, transport, insurance and minimum debt payments. Choose a first milestone you can reach, then build toward a larger reserve if your budget allows.",
          "A useful goal may depend on how steady your income is, how many people rely on it, the deductibles you would have to cover, access to paid leave, other household income and how quickly you could replace a job. A freelancer with variable income may choose a different target from a dual-income household with secure benefits.",
          "For illustration only: if essential expenses are $2,600 a month, one month of expenses is $2,600 and six months is $15,600. This arithmetic is not a recommended target; use your own budget and circumstances.",
        ],
      },
      {
        heading: "Keep it accessible and separate",
        body: [
          "An emergency fund is money for unplanned needs, not money invested for long-term growth. A separate, readily accessible bank or credit-union savings account can make the purpose clear and avoid having to sell investments at a bad time. Understand withdrawal access, account fees and whether deposits are insured; investment products are not the same as insured deposits.",
          "Decide what qualifies before a stressful moment: an urgent repair, medical expense or temporary loss of income may qualify, while a planned trip or routine bill belongs in the regular budget. If you use the reserve, set a manageable plan to rebuild it.",
        ],
      },
      {
        heading: "Build the habit in small, repeatable steps",
        list: [
          ["Automate what is sustainable.", "A small transfer each payday can help make saving consistent. Adjust the amount if it causes overdrafts or prevents you from covering essentials."],
          ["Use irregular money intentionally.", "If a refund, bonus or extra shift arrives, consider directing a portion to the reserve after urgent bills and needs are covered."],
          ["Watch cash-flow timing.", "If bills arrive before income, tracking due dates and asking creditors about changing due dates may make it easier to save."],
          ["Avoid treating retirement savings as the first line of defense.", "Retirement withdrawals can have tax or plan consequences. Review the account rules and seek qualified tax or plan advice before taking money out."],
        ],
      },
      {
        heading: "The point is resilience, not a perfect balance",
        body: ["Savings of any size can make a shock easier to manage. Keep the goal flexible as your household, income and expenses change; then revisit the target at least when a major life change occurs."],
      },
    ],
    sources: [
      ["CFPB: An essential guide to building an emergency fund", "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/"],
      ["FDIC: Deposit insurance", "https://www.fdic.gov/resources/deposit-insurance/"],
    ],
    note: "This article is general education, not individualized financial, investment, tax or legal advice. Consider your cash flow, debt, benefits and personal circumstances when setting savings goals.",
    related: ["/fixed-annuities", "/contact", "/faqs"],
  },
  "/articles/home-affordability": {
    eyebrow: "Calo Library · Your home",
    title: "Can you really afford the home you're dreaming of?",
    intro: "A mortgage preapproval is not the same as a comfortable home budget. The payment shown in an advertisement may leave out taxes, insurance, fees, repairs and other costs that shape what homeownership actually takes each month.",
    readTime: "5-minute read · Reviewed November 3, 2026.",
    sections: [
      {
        heading: "Budget for the total monthly cost, not just principal and interest",
        body: [
          "The CFPB's homebuying guidance says a total monthly home payment can include principal, interest, property taxes, homeowners insurance, mortgage insurance, supplemental insurance such as flood coverage, and homeowners-association fees. Some costs—especially taxes and insurance—can rise over time.",
          "Add utilities, maintenance, repairs and commuting changes to your household budget. These costs may not appear in the lender's quoted mortgage payment. A home that fits only if nothing breaks or costs stay flat may leave too little room for savings and other goals.",
        ],
      },
      {
        heading: "Cash needed at closing is more than the down payment",
        body: [
          "Plan for closing costs, moving, immediate repairs and furnishings as well as the down payment. The CFPB says closing costs commonly range from 2% to 5% of the purchase price, excluding the down payment; the actual amount varies by loan, lender, property and location. Keep a cushion for emergencies rather than automatically using every available dollar to close.",
          "A smaller down payment can mean mortgage insurance or other loan costs, depending on the program. Ask the lender what applies to your particular loan and whether costs can change later.",
        ],
      },
      {
        heading: "Compare offers using the Loan Estimate",
        list: [
          ["Request Loan Estimates from multiple lenders.", "Compare the same loan type and features, including rate, APR, total monthly payment, lender costs, cash to close and whether the rate is adjustable or locked."],
          ["Read the whole estimate.", "Principal and interest are not the full housing payment. Check taxes, insurance, mortgage insurance, escrow and any fees; ask the lender to explain differences."],
          ["Recheck before closing.", "Review the Closing Disclosure against the Loan Estimate and ask about changes you do not understand before signing."],
          ["Protect your closing funds.", "Mortgage-closing scams can impersonate real estate professionals and change wire instructions. Independently confirm payment instructions using a known, trusted phone number—not a number in a last-minute email."],
        ],
      },
      {
        heading: "Stress-test the choice",
        body: [
          "Try the budget with a higher utility bill, an insurance renewal increase, a repair and a temporary income interruption. Consider whether you can still pay other obligations and keep a reserve. A lender's approval is based on underwriting criteria; it does not decide what payment feels sustainable for your household.",
          "Before committing, review the property, insurance availability, flood or other local hazards, HOA rules and any planned repairs. For legal or tax questions, consult an appropriately qualified local professional.",
        ],
      },
    ],
    sources: [
      ["CFPB: Figure out how much you want to spend", "https://www.consumerfinance.gov/owning-a-home/prepare/figure-out-how-much-you-want-to-spend/"],
      ["CFPB: Loan Estimate explainer", "https://www.consumerfinance.gov/owning-a-home/loan-estimate/"],
      ["CFPB: Beware of mortgage closing scams", "https://www.consumerfinance.gov/owning-a-home/beware-mortgage-closing-scams/"],
    ],
    note: "This article is general education, not mortgage, investment, tax or legal advice. Loan terms, insurance costs, taxes and buyer obligations vary by lender, property, location and borrower.",
    related: ["/financing", "/contact", "/faqs"],
  },
  "/articles/business-funding": {
    eyebrow: "Calo Library · Business funding",
    title: "What should a business know before taking on funding?",
    intro: "Borrowing can help a business act on a sound opportunity—or add a fixed payment to cash flow that is already tight. Start with the use of funds, compare the full repayment obligation, and understand who is responsible if the business cannot pay.",
    readTime: "5-minute read · Reviewed November 3, 2026.",
    sections: [
      {
        heading: "Match the financing structure to the need",
        body: ["Write down exactly what the money will pay for, when the business needs it, and how the funds are expected to help cash flow. A defined, one-time purchase may call for a different structure than recurring working-capital swings. Do not borrow on an assumption that revenue will grow unless you can test what repayment looks like if the growth is late or smaller than expected."],
        items: [
          { heading: "Term loan", body: "A lump sum repaid on an agreed schedule may suit a one-time project or purchase. Check payment amount, term, rate type, fees and whether early repayment costs extra." },
          { heading: "Line of credit", body: "A revolving limit can provide access to funds as needed, but confirm draw fees, renewal conditions, variable rates, minimum payments and whether the facility can be reduced or not renewed." },
          { heading: "SBA 7(a) loan", body: "The SBA 7(a) program guarantees a portion of eligible loans made by participating lenders; the borrower applies to and repays the lender, not the SBA. SBA lists working capital, equipment, real estate and certain debt refinancing among permitted uses. Eligibility and terms apply." },
          { heading: "Equipment or invoice-based financing", body: "These structures may tie financing to equipment or receivables. Understand what collateral is pledged, whether the lender can collect directly from customers, and what happens if the equipment or invoices do not generate expected cash." },
        ],
        note: "Names and legal structures vary across providers. Read the actual agreement; a product label alone does not establish its cost or protections.",
      },
      {
        heading: "Calculate the total cost and payment pattern",
        body: ["Do not compare offers using only the advertised rate or the amount deposited into the business account. Request a written schedule showing every payment, fee and due date, and calculate the total dollars the business will repay."],
        list: [
          ["Compare like with like.", "Check the amount received, interest or factor rate, origination and broker fees, payment frequency, term, and total repayment. Ask how any quoted APR is calculated and what it excludes."],
          ["Stress-test cash flow.", "Model payments against a slow month, delayed customer invoices, seasonal changes, payroll, taxes and existing debt—not just an optimistic sales forecast."],
          ["Check rate and payment changes.", "For variable-rate financing, ask what index and margin apply, how often the rate can change, and whether payment amount or term may change."],
          ["Read the default terms.", "Ask about late fees, prepayment penalties, collateral, personal guarantees, cross-default clauses and the lender's remedies if the business misses payments."],
        ],
      },
      {
        heading: "Prepare before you apply—and verify the offer",
        list: [
          ["Gather reliable records.", "Recent business bank statements, tax returns, profit-and-loss statements, balance sheets, accounts receivable/payable and debt schedules help you assess the application and repayment plan."],
          ["Ask more than one provider.", "Compare written offers with the same funding amount and purpose. SBA Lender Match can connect eligible small businesses with participating lenders; a match is not an approval or a promise of funding."],
          ["Confirm who is lending.", "Verify the lender and any broker independently. Be wary of guaranteed approval, pressure to sign immediately, vague total costs or demands for an upfront fee to release a promised loan."],
          ["Get expert review where needed.", "An accountant can help stress-test business cash flow; an attorney can explain guarantees, liens and contract terms. Do this before signing, not after a payment problem."],
        ],
      },
      {
        heading: "Understand what an SBA guarantee does—and does not do",
        body: [
          "An SBA guarantee is a credit enhancement for a lender under program rules; it is not a grant, automatic approval, or a promise that an owner has no personal obligation. The business still repays the loan under its agreement, and owners may be asked to provide guarantees or collateral depending on the program and transaction.",
          "For 7(a) loans, the SBA currently describes a maximum loan amount of $5 million, but actual eligibility, amount, interest, collateral and repayment terms depend on the program rules and lender underwriting. Confirm current details directly with SBA and the participating lender before making a decision.",
        ],
      },
    ],
    sources: [
      ["SBA: 7(a) loans—uses, eligibility and application", "https://www.sba.gov/loans/7a-loans/"],
      ["SBA: Lender Match", "https://www.sba.gov/loans/lender-match/"],
    ],
    note: "This article is general education, not financial, tax or legal advice, and not an offer or approval of financing. Loan availability, eligibility, guarantees and terms depend on the lender, program, business and executed agreement.",
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
        heading: "Calo Library",
        links: [
          ["Life insurance and family protection", "/articles/life-insurance-family-protection"],
          ["Medical costs and family finances", "/articles/medical-costs"],
          ["Emergency savings", "/articles/emergency-fund"],
          ["Home affordability", "/articles/home-affordability"],
          ["Business funding", "/articles/business-funding"],
        ],
      },
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
