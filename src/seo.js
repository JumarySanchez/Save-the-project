import { INFO_PAGES } from "./infoPages.js";
import { faqGroups } from "./faqContent.js";

export const SITE_URL = "https://calocapital.io";
export const SITE_NAME = "CaloCapital";
export const SITE_DESCRIPTION =
  "Independent insurance agency in Nashville, Tennessee, helping families and business owners with life insurance, fixed annuities and retirement income.";
export const SITE_ADDRESS = "159 4th Avenue North, Suite 200, Nashville, TN 37219";
export const SITE_PHONE = "917-400-9543";
export const SITE_EMAIL = "marc@calocapital.io";
export const FOUNDER = "Marc J. Calo, Licensed Insurance Agent, NPN 17700283";

export const LICENSED_STATES = [
  "Alabama", "Connecticut", "Florida", "Georgia", "Idaho", "Kentucky", "Maryland", "Nebraska", "Nevada", "New Jersey",
  "New York (resident)", "North Carolina", "Ohio", "Pennsylvania", "South Carolina", "Tennessee", "Texas", "Utah",
  "Virginia", "Washington", "Wyoming",
];

export const DISCLOSURE =
  "CaloCapital is an independent insurance agency. Insurance products are offered through Marc J. Calo, Licensed Insurance Agent, NPN 17700283, licensed in AL, CT, FL, GA, ID, KY, MD, NE, NV, NJ, NY, NC, OH, PA, SC, TN, TX, UT, VA, WA and WY. CaloCapital is not a broker-dealer or registered investment adviser.";

export const SERVICE_PAGES = [
  ["Life Insurance", "/life-insurance"],
  ["Fixed Annuities", "/fixed-annuities"],
  ["Business Owner Coverage", "/business-owner-coverage"],
  ["Digital Asset Services", "/digital-asset-services"],
];

const BASE_ROUTES = {
  "/": { title: "CaloCapital | Independent Insurance Agency in Nashville, Tennessee", description: SITE_DESCRIPTION },
  "/contact": { title: "Contact CaloCapital | Nashville, Tennessee", description: `Contact CaloCapital at ${SITE_ADDRESS}. Call ${SITE_PHONE} or email ${SITE_EMAIL}.` },
  "/faqs": { title: "Frequently Asked Questions | CaloCapital", description: "Answers to common questions about CaloCapital, insurance, financing and how we work." },
  "/legal": { title: "Legal and Disclosures | CaloCapital", description: "CaloCapital privacy policy, terms and conditions, and disclosures." },
  "/financial-topics": { title: "The Four C's and Financial Topics | CaloCapital", description: "How CaloCapital looks at the whole picture: cash, crypto, commodities and companies, before recommending any insurance." },
};

export function getRoutePaths() {
  return [...Object.keys(BASE_ROUTES), ...Object.keys(INFO_PAGES)];
}

export function getRouteMeta(path) {
  if (BASE_ROUTES[path]) return BASE_ROUTES[path];
  const page = INFO_PAGES[path];
  if (page) return { title: `${page.title} | ${SITE_NAME}`, description: page.intro };
  return BASE_ROUTES["/"];
}

export function buildAgencySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": `${SITE_URL}/#agency`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/Calo_purple_logo.png`,
    image: `${SITE_URL}/Calo_purple_logo.png`,
    description: SITE_DESCRIPTION,
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "159 4th Avenue North, Suite 200",
      addressLocality: "Nashville",
      addressRegion: "TN",
      postalCode: "37219",
      addressCountry: "US",
    },
    founder: {
      "@type": "Person",
      name: "Marc J. Calo",
      jobTitle: "Licensed Insurance Agent",
      identifier: "NPN 17700283",
    },
    areaServed: LICENSED_STATES.map((name) => ({ "@type": "State", name: name.replace(" (resident)", "") })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "CaloCapital services",
      itemListElement: SERVICE_PAGES.map(([name, path]) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name, url: `${SITE_URL}${path}` },
      })),
    },
    sameAs: [
      "https://www.facebook.com/CaloCapital/",
      "https://www.linkedin.com/company/calocapital/",
      "https://x.com/Marc_J_Calo",
      "https://www.instagram.com/calocapital/",
    ],
  };
}

export function buildFaqSchema() {
  const entries = faqGroups.flatMap((group) => group.items || group.faqs || group.questions || []);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function getRouteSchemas(path) {
  const schemas = [];
  if (path === "/") schemas.push(buildAgencySchema());
  if (path === "/faqs") schemas.push(buildFaqSchema());
  return schemas;
}
