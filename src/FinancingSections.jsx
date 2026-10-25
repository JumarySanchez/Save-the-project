import React, { useEffect, useRef } from "react";
import sectionsHtml from "./financingSections.html?raw";
import heroRaw from "./financingHero.html?raw";
import aboutImagePng from "../assets/p.png";
import ceoImage from "../assets/Calo.png";

import featureImg from "../assets/business-feature.jpg";
import article1 from "../assets/business-article1.jpg";
import article2 from "../assets/business-article2.jpg";
import logoImg from "../public/Calo_purple_logo.png";
import article3 from "../assets/business-article3.jpg";

const sectionsWithImages = sectionsHtml
  .replace("__FEATURE_IMG__", featureImg)
  .replace(/__ARTICLE1_IMG__/g, article1)
  .replace(/__ARTICLE2_IMG__/g, article2)
  .replace(/__ARTICLE3_IMG__/g, article3)
  .replace("__CEO_IMG__", ceoImage)
  .replace(/__LOGO_IMG__/g, logoImg);

const heroHtml = heroRaw;
export const AGENCY_BG = aboutImagePng;
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
.calo-fin .c-sky i:nth-child(3){top:44%;left:78%;width:150px;animation-delay:3s;animation-duration:8s}
.calo-fin .c-sky i:nth-child(4){top:14%;left:35%;width:140px;animation-delay:7s;animation-duration:10s}
.calo-fin .c-sky i:nth-child(5){top:58%;left:96%;width:130px;animation-delay:2s;animation-duration:11s}
.calo-fin .c-sky i:nth-child(6){top:6%;left:88%;width:110px;animation-delay:10s;animation-duration:7s}
.calo-fin .c-sky i:nth-child(7){top:36%;left:55%;width:160px;animation-delay:4s;animation-duration:13s}
.calo-fin .c-sky i:nth-child(8){top:70%;left:70%;width:120px;animation-delay:8s;animation-duration:9s}
.calo-fin .c-sky i:nth-child(9){top:20%;left:18%;width:150px;animation-delay:12s;animation-duration:12s}
@keyframes caloFinTw{0%{opacity:.3}100%{opacity:1}}
@keyframes caloFinSh{0%{opacity:0;transform:rotate(-35deg) translateX(0)}2%{opacity:1}10%{opacity:1}13%,100%{opacity:0;transform:rotate(-35deg) translateX(-860px)}}
@media (prefers-reduced-motion:reduce){.calo-fin .c-sky i{display:none}.calo-fin .c-sky::before,.calo-fin .c-sky::after{animation:none}}
@media (max-width:760px){
  .calo-fin footer{padding-left:20px!important;padding-right:20px!important}
  .calo-fin section{padding-left:20px!important;padding-right:20px!important}
  .calo-fin [style*="font-size:60px"],.calo-fin [style*="font-size:56px"],.calo-fin [style*="font-size:72px"],.calo-fin [style*="font-size:52px"]{font-size:36px!important}
  .calo-fin [style*="font-size:48px"],.calo-fin [style*="font-size:44px"]{font-size:32px!important}
  .calo-fin [style*="height:620px"]{height:260px!important;border-radius:72px 0 56px 0!important}
  .calo-fin [style*="margin-bottom:36px"]{margin-bottom:24px!important}
  .calo-fin [style*="gap:72px"]{gap:28px!important}
  .calo-fin [style*="grid-column:span 2"]{grid-column:auto!important}
  .calo-fin section{padding-top:64px!important;padding-bottom:64px!important}
  .calo-fin [style*="padding:36px"]{padding:20px!important}
  .calo-fin [style*="padding:28px"]{padding:20px!important}
  .calo-fin [style*="padding:18px 56px"],.calo-fin [style*="padding:16px 40px"]{padding-left:32px!important;padding-right:32px!important}
  .calo-fin [style*="height:480px"],.calo-fin [style*="height:420px"]{height:300px!important}
  .calo-fin [style*="gap:48px"],.calo-fin [style*="gap:40px"]{gap:28px!important}
  .calo-fin [style*="font-size:34px"],.calo-fin [style*="font-size:32px"]{font-size:26px!important}
  .calo-fin img,.calo-fin input,.calo-fin select,.calo-fin textarea{max-width:100%}
  .calo-fin{overflow-x:hidden}
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
