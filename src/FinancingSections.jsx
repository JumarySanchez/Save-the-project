import React, { useEffect, useRef } from "react";
import sectionsHtml from "./financingSections.html?raw";
import heroRaw from "./financingHero.html?raw";
import aboutImagePng from "../assets/p.png";

import step1 from "../assets/business-step1.jpg";
import step2 from "../assets/business-step2.jpg";
import step3 from "../assets/business-step3.jpg";
import step4 from "../assets/business-step4.jpg";
import step5 from "../assets/business-step5.jpg";
import featureImg from "../assets/business-feature.jpg";
import article1 from "../assets/business-article1.jpg";
import article2 from "../assets/business-article2.jpg";
import article3 from "../assets/business-article3.jpg";

const stepImgs = JSON.stringify([step1, step2, step3, step4, step5]).replace(/"/g, "&quot;");
const sectionsWithImages = sectionsHtml
  .replace("__STEP_IMGS__", stepImgs)
  .replace("__FEATURE_IMG__", featureImg)
  .replace(/__ARTICLE1_IMG__/g, article1)
  .replace(/__ARTICLE2_IMG__/g, article2)
  .replace(/__ARTICLE3_IMG__/g, article3);

const heroHtml = heroRaw.replace("__ABOUT_IMG__", aboutImagePng);
import { initFinancingSections } from "./financingSections.js";

const css = `
.calo-fin{font-family:'Montserrat',sans-serif;color:#F4F7FB;background:#050816;line-height:1.55}
.calo-fin *{box-sizing:border-box}
.calo-fin a{color:inherit;text-decoration:none}
.calo-fin a:hover{color:#C6B8FF}
.calo-fin [style*="rgba(26,35,64"]{backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.calo-fin .c-sky{position:absolute;inset:0;overflow:hidden;pointer-events:none;background:linear-gradient(118deg,transparent 34%,rgba(109,94,245,.10) 46%,rgba(198,184,255,.06) 52%,transparent 66%)}
.calo-fin .c-sky::before,.calo-fin .c-sky::after{content:"";position:absolute;inset:0;background-repeat:no-repeat;background-image:radial-gradient(1.5px 1.5px at 12% 22%,#fff,transparent),radial-gradient(1px 1px at 28% 61%,#c6b8ff,transparent),radial-gradient(2px 2px at 47% 14%,#fff,transparent),radial-gradient(1px 1px at 63% 48%,#fff,transparent),radial-gradient(1.5px 1.5px at 81% 71%,#c6b8ff,transparent),radial-gradient(1px 1px at 92% 18%,#fff,transparent);animation:caloFinTw 6s ease-in-out infinite alternate}
.calo-fin .c-sky::after{animation-duration:9s;animation-delay:-3s}
.calo-fin .c-sky i{position:absolute;display:block;height:1.5px;width:170px;opacity:0;border-radius:2px;background:linear-gradient(90deg,#fff,rgba(198,184,255,.55) 30%,rgba(155,124,255,0));transform:rotate(-35deg);animation:caloFinSh 12s linear infinite}
.calo-fin .c-sky i:nth-child(1){top:8%;left:62%;animation-delay:1s;animation-duration:9s}
.calo-fin .c-sky i:nth-child(2){top:26%;left:92%;width:120px;animation-delay:5s;animation-duration:14s}
@keyframes caloFinTw{0%{opacity:.3}100%{opacity:1}}
@keyframes caloFinSh{0%{opacity:0;transform:rotate(-35deg) translateX(0)}2%{opacity:1}10%{opacity:1}13%,100%{opacity:0;transform:rotate(-35deg) translateX(-860px)}}
@media (prefers-reduced-motion:reduce){.calo-fin .c-sky i{display:none}.calo-fin .c-sky::before,.calo-fin .c-sky::after{animation:none}}
@media (max-width:760px){
  .calo-fin footer{padding-left:20px!important;padding-right:20px!important}
  .calo-fin section{padding-left:20px!important;padding-right:20px!important}
  .calo-fin [style*="font-size:60px"],.calo-fin [style*="font-size:56px"],.calo-fin [style*="font-size:72px"],.calo-fin [style*="font-size:52px"]{font-size:36px!important}
  .calo-fin [style*="font-size:48px"],.calo-fin [style*="font-size:44px"]{font-size:32px!important}
  .calo-fin [style*="height:620px"]{height:380px!important}
  .calo-fin [style*="grid-column:span 2"]{grid-column:auto!important}
}
`;

export default function FinancingSections({ hero = false, onNavigate }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const initialized = new WeakSet();
    const init = () => {
      const first = root.firstElementChild;
      if (!first || initialized.has(first)) return;
      initialized.add(first);
      try {
        initFinancingSections(root);
      } catch (error) {
        console.error("FinancingSections init failed", error);
      }
    };

    init();
    const observer = new MutationObserver(init);
    observer.observe(root, { childList: true });
    return () => observer.disconnect();
  }, []);

  function handleClick(event) {
    const anchor = event.target.closest && event.target.closest("a");
    if (!anchor || !ref.current?.contains(anchor)) return;

    const share = anchor.dataset.share;
    if (share) {
      event.preventDefault();
      const url = encodeURIComponent(window.location.href);
      const targets = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        x: `https://twitter.com/intent/tweet?url=${url}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      };
      if (share === "copy") navigator.clipboard?.writeText(window.location.href);
      else window.open(targets[share], "_blank", "noopener,noreferrer");
      return;
    }

    const href = anchor.getAttribute("href") || "";
    const isInternal = href.startsWith("#") || (href.startsWith("/") && !href.startsWith("//"));
    if (!isInternal || !onNavigate || event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    onNavigate(href);
  }

  return (
    <>
      <style>{css}</style>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className="calo-fin" ref={ref} onClick={handleClick} dangerouslySetInnerHTML={{ __html: hero ? heroHtml : sectionsWithImages }} />
    </>
  );
}
