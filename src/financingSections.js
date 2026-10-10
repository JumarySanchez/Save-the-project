export function initFinancingSections(root) {
  [].forEach.call(root.querySelectorAll('form[action*="formsubmit.co"]'),function(f){
    var st=f.querySelector('[role=status]');
    f.addEventListener('submit',function(e){
      e.preventDefault();
      if(st)st.textContent='Sending...';
      fetch(f.action.replace('formsubmit.co/','formsubmit.co/ajax/'),{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}})
        .then(function(r){return r.json()})
        .then(function(d){if(String(d.success)!=='true')throw new Error('fail'); f.reset(); if(st)st.textContent='Thank you! Your submission has been received. We will be in touch soon.'})
        .catch(function(){if(st)st.textContent='Something went wrong. Please email protection@calocapital.io or call (650) 658-6822.'});
    });
  });
(function(){
  var q=root.querySelector('#'+'qualify'); if(!q) return;
  // option buttons: one selected per group
  var groups=q.querySelectorAll('div[style*="grid-template-columns:1fr 1fr"]');
  var SEL,OPT;
  groups.forEach(function(g){g.querySelectorAll('button').forEach(function(b){
    if(b.style.cssText.indexOf('rgb(155, 124, 255)')>-1||b.style.cssText.indexOf('#9b7cff')>-1){SEL=SEL||b.style.cssText}else{OPT=OPT||b.style.cssText}})});
  groups.forEach(function(g){g.addEventListener('click',function(e){
    var b=e.target.closest('button'); if(!b) return;
    g.querySelectorAll('button').forEach(function(x){x.style.cssText=OPT; x.setAttribute('aria-pressed','false')});
    b.style.cssText=SEL; b.setAttribute('aria-pressed','true');
  })});
  // sliders <-> text inputs
  var rev=root.querySelector('#'+'q1'), cs=root.querySelector('#'+'q2');
  var ranges=q.querySelectorAll('input[type=range]'), rr=ranges[0], cr=ranges[1];
  rr.addEventListener('input',function(){rev.value=String(rr.value*1000)});
  rev.addEventListener('input',function(){var n=parseInt(rev.value.replace(/\D/g,''),10)||0; rr.value=Math.min(100,Math.round(n/1000))});
  cr.addEventListener('input',function(){cs.value=cr.value});
  cs.addEventListener('input',function(){var n=parseInt(cs.value,10)||300; cr.value=Math.max(300,Math.min(850,n))});
  // initial selection state + reset + calculate
  var DEFAULTS=[2,1];
  function setGroup(g,idx){g.querySelectorAll('button').forEach(function(x,i){
    x.style.cssText=i===idx?SEL:OPT; x.setAttribute('aria-pressed',i===idx?'true':'false')})}
  groups.forEach(function(g,gi){setGroup(g,DEFAULTS[gi])});
  function picked(g){var bs=[].slice.call(g.querySelectorAll('button'));
    for(var i=0;i<bs.length;i++){if(bs[i].getAttribute('aria-pressed')==='true')return i}return 0}
  var ind=root.querySelector('#'+'q3');
  var btns=q.querySelectorAll('button'), reset=null, calc=null;
  btns.forEach(function(b){var t=b.textContent.trim();
    if(t==='Reset calculator')reset=b; if(t==='Calculate')calc=b});
  var out=document.createElement('div');
  out.setAttribute('role','status'); out.setAttribute('aria-live','polite');
  out.style.cssText='display:none;margin-top:32px;padding:28px;border-radius:18px;border:1px solid rgba(155,124,255,.45);background:rgba(109,94,245,.14)';
  calc.parentNode.parentNode.appendChild(out);
  function money(n){return '$'+Math.round(n).toLocaleString('en-US')}
  function show(html){out.innerHTML=html; out.style.display='block'}
  if(calc)calc.addEventListener('click',function(){
    var revenue=parseInt(rev.value.replace(/\D/g,''),10)||0;
    var score=parseInt(cs.value,10);
    if(!score||score<300||score>850){show('<strong>Enter a credit score between 300 and 850.</strong>');return}
    if(!revenue){show('<strong>Enter your monthly revenue.</strong>');return}
    if(ind.selectedIndex===0){show('<strong>Please select your industry.</strong>');return}
    var months=[0,6,12,36][picked(groups[0])];
    var crypto=ind.value.indexOf('Crypto')===0;
    // Typical market benchmarks, not Calo Capital or lender-specific criteria.
    var P=[
      {n:'SBA 7(a) loan',s:680,m:24,r:10000,lo:2,hi:6,note:'Lowest rates and longest terms, slowest to fund.'},
      {n:'Term loan',s:620,m:12,r:10000,lo:1,hi:4,note:'Fixed payments over 1 to 5 years.'},
      {n:'Business line of credit',s:600,m:6,r:8000,lo:0.5,hi:3,note:'Draw only what you need, repay and reuse.'},
      {n:'Equipment financing',s:580,m:12,r:10000,lo:1,hi:5,note:'The equipment is the collateral.'},
      {n:'Revenue-based financing / MCA',s:500,m:6,r:10000,lo:0.5,hi:1.5,note:'Fast funding, highest cost.'}
    ];
    var rows='',fit=0;
    P.forEach(function(x){
      var miss=[];
      if(score<x.s)miss.push('credit score '+x.s+'+');
      if(months<x.m)miss.push(x.m>=12?(x.m/12)+'+ yr in business':x.m+'+ mo in business');
      if(revenue<x.r)miss.push(money(x.r)+'+/mo revenue');
      var ok=miss.length===0, near=miss.length===1;
      if(ok&&x.n.indexOf('SBA')===0&&crypto){ok=false;near=true;miss=['many SBA lenders restrict crypto businesses']}
      if(ok)fit++;
      var tag=ok?'<span style="color:#9B7CFF;font-weight:700">Likely fit</span>':near?'<span style="color:#B7C0D8;font-weight:700">Close</span>':'<span style="color:#7C86A8;font-weight:700">Not yet</span>';
      var detail=ok?'Estimated '+money(revenue*x.lo)+' to '+money(revenue*x.hi)+'. '+x.note:(near?'Short on: ':'Short on: ')+miss.join(', ')+'.';
      rows+='<div style="display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:14px 0;border-top:1px solid rgba(183,192,216,.18)"><div style="flex:1 1 260px"><div style="color:#fff;font-weight:600">'+x.n+'</div><div style="font-size:14px;color:#B7C0D8">'+detail+'</div></div><div>'+tag+'</div></div>';
    });
    show('<div style="font-size:13px;letter-spacing:.18em;text-transform:uppercase;font-weight:700;color:#c6b8ff">Your estimated results</div>'+
      '<div style="margin:10px 0 14px;font-family:\'Cormorant Garamond\',serif;font-size:32px;font-weight:700;color:#fff">'+(fit?fit+' of '+P.length+' financing types may fit':'No financing types match yet')+'</div>'+rows+
      '<div style="margin-top:16px;font-size:12px;color:#B7C0D8">Estimate only, based on typical market benchmarks (credit score, time in business, monthly revenue). Not an offer, approval or commitment to lend. Actual eligibility, amounts and terms vary by lender and require a full application.</div>');
  });
  if(reset)reset.addEventListener('click',function(){
    rev.value='35000'; rr.value=35; cs.value='600'; cr.value=600;
    ind.selectedIndex=0;
    groups.forEach(function(g,gi){setGroup(g,DEFAULTS[gi])});
    out.style.display='none'; out.innerHTML='';
  });
})();
(function(){
  var tabs=[].slice.call(root.querySelectorAll('[role=tab][data-step]'));
  var num=root.querySelector('#'+'step-num'),title=root.querySelector('#'+'step-title'),
      desc=root.querySelector('#'+'step-desc'),photo=root.querySelector('#'+'step-photo'),
      prev=root.querySelector('#'+'step-prev'),next=root.querySelector('#'+'step-next');
  if(tabs.length<2||!num||!title||!desc) return;
  var STEPS=[
    {d:'Tell us about your business and get prequalified',p:'[PHOTO: calm, cinematic image of a business owner at work]'},
    {d:'Complete one short application. Tell us about your business once, and we share it with our lender network.',p:'[PHOTO: owner completing the application on a laptop]'},
    {d:'Compare your offers. A Calo specialist walks you through each one, side by side, in plain words.',p:'[PHOTO: owner reviewing offers with a specialist]'},
    {d:'Choose the offer that fits, then upload your documents from any device.',p:'[PHOTO: owner uploading documents on a phone]'},
    {d:'Review and sign. Your lender sends the funds, and we are here if you have questions.',p:'[PHOTO: owner opening their business for the day]'}
  ];
  var cur=0, box=title.parentNode.parentNode;
  title.parentNode.setAttribute('aria-live','polite');
  function paint(){
    tabs.forEach(function(t,i){
      var on=i===cur;
      t.setAttribute('aria-selected',on?'true':'false');
      t.tabIndex=on?0:-1;
      t.style.color=on?'#fff':'#B7C0D8';
      t.style.borderBottomColor=on?'#9b7cff':'transparent';
    });
    num.textContent=String(cur+1);
    title.textContent='Step '+(cur+1);
    desc.textContent=STEPS[cur].d;
    if(photo) photo.textContent=STEPS[cur].p;
    prev.disabled=cur===0; next.disabled=cur===STEPS.length-1;
    prev.style.opacity=prev.disabled?'.3':'1'; next.style.opacity=next.disabled?'.3':'1';
    prev.style.cursor=prev.disabled?'default':'pointer'; next.style.cursor=next.disabled?'default':'pointer';
  }
  function go(i){
    if(i<0||i>=STEPS.length||i===cur) return;
    cur=i; box.style.transition='opacity .18s'; box.style.opacity='0';
    setTimeout(function(){paint(); box.style.opacity='1'},160);
  }
  tabs.forEach(function(t,i){
    t.addEventListener('click',function(){go(i)});
    t.addEventListener('keydown',function(e){
      if(e.key==='ArrowRight'){go(Math.min(i+1,STEPS.length-1)); tabs[Math.min(i+1,STEPS.length-1)].focus()}
      if(e.key==='ArrowLeft'){go(Math.max(i-1,0)); tabs[Math.max(i-1,0)].focus()}
    });
  });
  prev.addEventListener('click',function(){go(cur-1)});
  next.addEventListener('click',function(){go(cur+1)});
  paint();
})();
}
