/* Anapurna Manufactures — production-ready interaction layer */

const products = [
  // WHITE MATERIAL / F-S — based on supplied product chart
  ...['36"','45"','54"','72"'].flatMap(size => [80,100,150,250,400,500].map(gauge => ({material:'White (F/S)',brand:'Polar White',size,gauge,colours:['White'],logo:'polar-white'}))),
  ...['54"','72"'].flatMap(size => [150,250,500].map(gauge => ({material:'White (F/S)',brand:'Captain',size,gauge,colours:['Off White'],logo:'captain'}))),
  {material:'White (F/S)',brand:'Bharosha',size:'54"',gauge:150,colours:['Off White'],logo:'bharosha'},
  {material:'White (F/S)',brand:'Bharosha',size:'54"',gauge:250,colours:['Off White'],logo:'bharosha'},
  {material:'White (F/S)',brand:'Bharosha',size:'54"',gauge:500,colours:['Off White'],logo:'bharosha'},
  {material:'White (F/S)',brand:'Bharosha',size:'72"',gauge:150,colours:['Off White'],logo:'bharosha'},
  {material:'White (F/S)',brand:'Bharosha',size:'72"',gauge:250,colours:['Off White'],logo:'bharosha'},
  ...['54"','72"'].flatMap(size => [150,250].map(gauge => ({material:'White (F/S)',brand:'Sisa',size,gauge,colours:['Milky White'],logo:'sisa'}))),

  // BLACK MATERIAL
  ...['54"','72"'].flatMap(size => [250,500,800].map(gauge => ({material:'Black',brand:'Indian',size,gauge,colours:['Black'],logo:'indian'}))),
  ...['36"','45"'].flatMap(size => [500,800].map(gauge => ({material:'Black',brand:'Mili',size,gauge,colours:['Black'],logo:'mili'}))),
  ...['54"','72"'].flatMap(size => [250,500,800].map(gauge => ({material:'Black',brand:'Mili',size,gauge,colours:['Black','Black / Silver'],logo:'mili'}))),
  ...['36"','45"'].flatMap(size => [500,800].map(gauge => ({material:'Black',brand:'Polar White',size,gauge,colours:['Black'],logo:'polar-white'}))),
  ...['54"','72"'].flatMap(size => [250,500,800].map(gauge => ({material:'Black',brand:'Polar White',size,gauge,colours:['Black'],logo:'polar-white'}))),
  ...[500,800].map(gauge => ({material:'Black',brand:'Captain',size:'54"',gauge,colours:['Black'],logo:'captain'})),
  ...['36"','45"','54"','72"'].flatMap(size => [500,800].map(gauge => ({material:'Black',brand:'Black Panther',size,gauge,colours:['Black'],logo:'black-panther'}))),

  // NYLON MATERIAL — retain both Visa and Sisa entries from the original supplied PRD/chart set
  ...['36"','45"'].flatMap(size => [80,100].map(gauge => ({material:'Nylon',brand:'Indian',size,gauge,colours:['Green','Blue'],logo:'indian'}))),
  ...[100,250].map(gauge => ({material:'Nylon',brand:'Indian',size:'54"',gauge,colours:['Green','Blue'],logo:'indian'})),
  ...['36"','45"'].flatMap(size => [100,150].map(gauge => ({material:'Nylon',brand:'Green Earth',size,gauge,colours:['Green'],logo:'green-earth'}))),
  ...[100,250].map(gauge => ({material:'Nylon',brand:'Green Earth',size:'54"',gauge,colours:['Green'],logo:'green-earth'})),
  ...['36"','45"','54"'].flatMap(size => [100,150,250].map(gauge => ({material:'Nylon',brand:'Visa',size,gauge,colours:['Green'],logo:'visa-sisa'}))),
  ...[100,250].map(gauge => ({material:'Nylon',brand:'Sisa',size:'54"',gauge,colours:['Green'],logo:'sisa'})),

  // FANCY COLOUR — supplied chart shows Indian + Polar White
  ...[{brand:'Indian',logo:'indian'},{brand:'Polar White',logo:'polar-white'}].flatMap(({brand,logo}) => [
    {size:'36"',gauges:[200,400]}, {size:'45"',gauges:[300]}, {size:'54"',gauges:[400]}
  ].flatMap(({size,gauges}) => gauges.map(gauge => ({material:'Fancy Colour',brand,size,gauge,colours:['Red','Green (K.P)','Blue','Pink','Yellow'],logo})))),

  // PATTA CHAK — supplied chart
  ...['54"'].flatMap(size => [300,400].map(gauge=>({material:'Patta Chak',brand:'India',size,gauge,colours:['K.P (green)','Blue','Red','Pink','Yellow'],logo:'indian'}))),
  ...['54"','72"'].flatMap(size => [300,400].map(gauge=>({material:'Patta Chak',brand:'Polar White',size,gauge,colours:['K.P (green)','Blue','Red','Pink','Yellow'],logo:'polar-white'}))),
  ...[{brand:'Varsa',logo:'varasa',size:'54"',gauge:300},{brand:'Varsa',logo:'varasa',size:'36"',gauge:250},
     {brand:'Sisa',logo:'sisa',size:'54"',gauge:300},{brand:'Sisa',logo:'sisa',size:'36"',gauge:250}]
    .map(p=>({...p,material:'Patta Chak',colours:['K.P (green)','Blue','Red','Pink','Yellow']}))
];

const materials = [
  {name:'White (F/S)', image:'assets/material-white-card.jpg', desc:'White sheet range'},
  {name:'Black', image:'assets/material-black-card.jpg', desc:'Black material range'},
  {name:'Nylon', image:'assets/material-nylon-card.jpg', desc:'Nylon sheet range'},
  {name:'Fancy Colour', image:'assets/material-fancy-card.jpg', desc:'Colour sheet range'},
  {name:'Patta Chak', image:'assets/material-patta-card.jpg', desc:'Patta Chak colour range'}
];

const steps = [
  {key:'material',label:'Material',title:'Choose a material'},
  {key:'brand',label:'Brand',title:'Choose a brand'},
  {key:'size',label:'Size',title:'Choose a width'},
  {key:'gauge',label:'Gauge',title:'Choose the gauge'},
  {key:'colour',label:'Colour',title:'Choose a colour'}
];

const state = { index:0, selection:{material:null,brand:null,size:null,gauge:null,colour:null} };
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const configModal = $('#config-modal');
const stepContent = $('#step-content');

function resetFrom(key){
  const idx = steps.findIndex(s=>s.key===key);
  for(let i=idx+1;i<steps.length;i++) state.selection[steps[i].key]=null;
}

function matchesBefore(product, key){
  for(const step of steps){
    if(step.key===key) break;
    const value = state.selection[step.key];
    if(value===null) continue;
    if(step.key==='gauge') { if(product.gauge !== Number(value)) return false; }
    else if(step.key==='colour') { if(!product.colours.includes(value)) return false; }
    else if(product[step.key] !== value) return false;
  }
  return true;
}

function filteredFor(key){ return products.filter(p=>matchesBefore(p,key)); }

function available(key){
  if(key==='material') return materials.filter(m=>products.some(p=>p.material===m.name)).map(m=>m.name);
  const list = filteredFor(key);
  if(key==='gauge') return [...new Set(list.map(p=>p.gauge))].sort((a,b)=>a-b);
  if(key==='colour') return [...new Set(list.flatMap(p=>p.colours))];
  return [...new Set(list.map(p=>p[key]))];
}

function brandsForMaterial(){
  return [...new Map(filteredFor('brand').map(p=>[p.brand,p.logo])).entries()]
    .map(([name,logo])=>({name,logo}));
}

function isValidSelection(key,value){ return available(key).some(v=>String(v)===String(value)); }

function sanitizeSelection(){
  for(const step of steps){
    const value = state.selection[step.key];
    if(value!==null && !isValidSelection(step.key,value)){
      state.selection[step.key]=null;
      resetFrom(step.key);
    }
  }
}

function renderProgress(){
  $('#progress-desktop').innerHTML = steps.map((s,i)=>
    `<div class="progress-step ${i===state.index?'active':''} ${i<state.index?'done':''}">
      <span class="progress-dot">${i<state.index?'✓':String(i+1).padStart(2,'0')}</span><span>${s.label}</span>
    </div>`).join('');
  $('#mobile-progress').style.setProperty('--progress',`${((state.index+1)/steps.length)*100}%`);
}

function renderSummary(){
  const labels={material:'Material',brand:'Brand',size:'Width',gauge:'Gauge',colour:'Colour'};
  const vals=steps.filter(s=>state.selection[s.key]!==null);
  $('#mini-summary').innerHTML=vals.length
    ? vals.map(s=>`<div><span>${labels[s.key]}</span><strong>${state.selection[s.key]}${s.key==='gauge'?' micron':''}</strong></div>`).join('')
    : '<div><span>YOUR CONFIGURATION</span><strong>Nothing selected yet</strong></div>';
}

function colorSwatch(name){
  const n=name.toLowerCase();
  if(n.includes('black')) return '#171b1a';
  if(n.includes('red')) return '#cf3a2f';
  if(n.includes('blue')) return '#1e5bb7';
  if(n.includes('pink')) return '#e96b9b';
  if(n.includes('yellow')) return '#e7bc20';
  if(n.includes('green')||n.includes('k.p')) return '#168b55';
  if(n.includes('milky')) return '#f2f3ec';
  if(n.includes('off')) return '#ece7d7';
  return '#dfe4e0';
}

function optionButton({value,label,sub,image,selected=false,kind='choice'}){
  const safeValue = String(value).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return `<button type="button" class="${kind==='visual'?'visual-option':'choice-option'} ${selected?'selected':''}" data-value="${safeValue}" aria-pressed="${selected}">
    ${image?`<img src="${image}" alt="" loading="lazy">`:''}
    <span><strong>${label}</strong>${sub?`<small>${sub}</small>`:''}</span><i aria-hidden="true">✓</i>
  </button>`;
}

function renderOptions(step){
  const key=step.key;
  const opts=available(key);
  if(!opts.length){
    return `<div class="empty-options"><strong>No options available for this selection.</strong><p>Go back one step and choose another option.</p><button type="button" class="button button-light" data-empty-back>← Go back</button></div>`;
  }
  if(key==='material') return `<div class="visual-options material-options">${materials.map(m=>optionButton({value:m.name,label:m.name,sub:m.desc,image:m.image,selected:state.selection.material===m.name,kind:'visual'})).join('')}</div>`;
  if(key==='brand') return `<div class="visual-options brand-options">${brandsForMaterial().map(b=>optionButton({value:b.name,label:b.name,sub:'Available for this material',image:`assets/logos/${b.logo}.jpg`,selected:state.selection.brand===b.name,kind:'visual'})).join('')}</div>`;
  if(key==='colour') return `<div class="choice-grid colour-options">${opts.map(v=>`<button type="button" class="choice-option ${state.selection.colour===v?'selected':''}" data-value="${String(v).replace(/"/g,'&quot;')}" aria-pressed="${state.selection.colour===v}"><span class="swatch" style="--swatch:${colorSwatch(v)}"></span><strong>${v}</strong><i aria-hidden="true">✓</i></button>`).join('')}</div>`;
  return `<div class="choice-grid">${opts.map(v=>optionButton({value:v,label:key==='gauge'?`${v} micron`:v,sub:key==='size'?'Sheet width':key==='gauge'?'Sheet thickness':'Available option',selected:String(state.selection[key])===String(v)})).join('')}</div>`;
}

function renderPreview(){
  const el=$('#step-preview');
  const s=state.selection;
  const material=materials.find(m=>m.name===s.material);
  const brand=brandsForMaterial().find(b=>b.name===s.brand);
  const image=material?.image || 'assets/material-white-card.jpg';
  const logo=brand?.logo ? `assets/logos/${brand.logo}.jpg` : null;
  const title=s.material || 'Choose a material';
  const detail=s.brand ? `${s.brand}${s.size?` · ${s.size}`:''}${s.gauge?` · ${s.gauge} micron`:''}` : 'Start with a material';
  el.innerHTML=`<div class="preview-kicker">CURRENT SELECTION</div><div class="preview-media"><img src="${image}" alt="${title}"></div>${logo?`<div class="preview-brand"><img src="${logo}" alt="${s.brand} logo"><div><span>BRAND</span><strong>${s.brand}</strong></div></div>`:''}<div class="preview-copy"><span>${title}</span><strong>${detail}</strong></div><div class="preview-line"></div><p>Only valid combinations continue to the next step.</p>`;
}

function bindStepEvents(){
  stepContent.onclick = event => {
    const emptyBack=event.target.closest('[data-empty-back]');
    if(emptyBack){ if(state.index>0){state.index--;state.selection[steps[state.index+1].key]=null;resetFrom(steps[state.index].key);renderAll();} return; }
    const btn=event.target.closest('[data-value]');
    if(!btn) return;
    const step=steps[state.index];
    const raw=btn.dataset.value;
    const value=step.key==='gauge' ? Number(raw) : raw;
    if(!isValidSelection(step.key,value)) return;
    state.selection[step.key]=value;
    resetFrom(step.key);
    renderAll();
    // Keep desktop explicit. On mobile advance only after the selected state has painted.
    if(window.matchMedia('(max-width:820px)').matches){
      if(state.index===steps.length-1){
        if(productValid()) openQuote();
      } else {
        window.setTimeout(()=>{
          if(state.selection[step.key]!==value) return;
          if(state.index<steps.length-1){state.index++;renderAll();focusFirstOption();}
        },260);
      }
    } else {
      focusFirstOption();
    }
  };
}

function focusFirstOption(){ requestAnimationFrame(()=>stepContent.querySelector('[data-value]')?.focus({preventScroll:true})); }

function renderStep(){
  sanitizeSelection();
  const step=steps[state.index];
  $('#step-kicker').textContent=`STEP ${String(state.index+1).padStart(2,'0')} OF ${steps.length}`;
  $('#config-title').textContent=step.title;
  stepContent.innerHTML=renderOptions(step);
  renderPreview();
  updateControls();
  if(window.gsap && stepContent.querySelectorAll('[data-value]').length){
    gsap.fromTo(stepContent.querySelectorAll('[data-value]'),{y:12,opacity:0},{y:0,opacity:1,duration:.34,stagger:.035,ease:'power2.out',clearProps:'transform'});
    gsap.fromTo('#step-preview',{x:10,opacity:.7},{x:0,opacity:1,duration:.35,ease:'power2.out',clearProps:'transform'});
  }
}

function updateControls(){
  const current=steps[state.index].key;
  const has=state.selection[current]!==null && isValidSelection(current,state.selection[current]);
  $('#config-back').disabled=state.index===0;
  $('#config-next').disabled=!has;
  $('#config-next').innerHTML=state.index===steps.length-1?'Enquire on WhatsApp <span>↗</span>':'Continue <span>→</span>';
}

function renderAll(){renderProgress();renderSummary();renderStep();}

function openConfig(preselect=null){
  document.body.classList.add('modal-open');
  configModal.classList.add('open');
  configModal.setAttribute('aria-hidden','false');
  state.index=0;
  state.selection={material:null,brand:null,size:null,gauge:null,colour:null};
  if(preselect && isValidSelection('material',preselect)) state.selection.material=preselect;
  renderAll();
}
function closeConfig(){configModal.classList.remove('open');configModal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');}
function productValid(){const s=state.selection;return products.some(p=>p.material===s.material&&p.brand===s.brand&&p.size===s.size&&p.gauge===Number(s.gauge)&&p.colours.includes(s.colour));}

const WHATSAPP_NUMBER = '919903603052';

function buildWhatsAppMessage(){
  const s = state.selection;
  return [
    'Hello Anapurna Manufactures,',
    '',
    'I am enquiring about the following polythene sheet requirement:',
    '',
    `Material: ${s.material || '—'}`,
    `Brand: ${s.brand || '—'}`,
    `Width: ${s.size || '—'}`,
    `Gauge: ${s.gauge ? `${s.gauge} micron` : '—'}`,
    `Colour: ${s.colour || '—'}`,
    '',
    'Please share the quotation, availability and next steps. Thank you.'
  ].join('\n');
}

function openQuote(){
  if(!productValid()) return;
  const message = encodeURIComponent(buildWhatsAppMessage());
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}


$$('[data-open-config]').forEach(el=>el.addEventListener('click',()=>openConfig()));
$$('[data-close-config]').forEach(el=>el.addEventListener('click',closeConfig));
$$('.product-card').forEach(card=>card.addEventListener('click',()=>openConfig(card.dataset.category)));
$('#config-back').addEventListener('click',()=>{if(state.index>0){state.selection[steps[state.index].key]=null;state.index--;renderAll();}});
$('#config-next').addEventListener('click',event=>{
  event.preventDefault();
  const current=steps[state.index].key;
  if(state.selection[current]===null || !isValidSelection(current,state.selection[current])) return;
  if(state.index<steps.length-1){state.index++;renderAll();focusFirstOption();}
  else if(productValid()) openQuote();
});

const menu=$('#mobile-menu');
$('.menu-toggle').addEventListener('click',()=>{const open=menu.classList.toggle('open');$('.menu-toggle').setAttribute('aria-expanded',String(open));});
$$('#mobile-menu a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');$('.menu-toggle').setAttribute('aria-expanded','false');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeConfig();});

bindStepEvents();

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12});
$$('.reveal,.reveal-left,.reveal-right,.reveal-stagger').forEach(el=>observer.observe(el));

renderAll();

function initMotion(){
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loader=document.querySelector('#page-loader');
  
  if(reduce || !window.gsap || !window.ScrollTrigger){
    if(loader) loader.style.display = 'none';
    return;
  }
  
  gsap.registerPlugin(ScrollTrigger);
  document.body.classList.add('motion-ready');
  const ease='power3.out';
  
  // Progress counter and branded loader animation
  const progressObj = { val: 0 };
  const percentEl = document.querySelector('#loader-percent');
  const statusEl = document.querySelector('#loader-status');
  const loaderFill = document.querySelector('#loader-fill');
  
  const loadTl = gsap.timeline({
    defaults: { ease: 'power2.out' },
    onComplete: () => {
      if(loader){
        loader.style.display = 'none';
        loader.setAttribute('aria-hidden', 'true');
      }
      document.body.classList.add('page-loaded');
    }
  });

  loadTl
    .fromTo('.loader-logo-card', { autoAlpha: 0, y: 18, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.4)' })
    .to(progressObj, {
      val: 100,
      duration: 0.95,
      ease: 'power1.inOut',
      onUpdate: () => {
        const p = Math.round(progressObj.val);
        if(percentEl) percentEl.textContent = `${p}%`;
        if(loaderFill) loaderFill.style.width = `${p}%`;
        if(statusEl){
          if(p < 30) statusEl.textContent = 'INITIALIZING SPECIFICATIONS';
          else if(p < 68) statusEl.textContent = 'LOADING PRODUCT RANGE';
          else if(p < 96) statusEl.textContent = 'PREPARING WHOLESALE OUTLETS';
          else statusEl.textContent = 'READY';
        }
      }
    }, '-=0.1')
    .to(loader, {
      autoAlpha: 0,
      yPercent: -100,
      duration: 0.7,
      ease: 'power3.inOut'
    }, '+=0.05');

  // Hero elements entrance synced right after loader lifts
  gsap.fromTo('.site-header', { y: -45, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.85, delay: 0.8, ease });
  gsap.fromTo('.hero-copy > *', { y: 44, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.85, stagger: 0.12, delay: 0.95, ease, clearProps: 'transform,opacity,visibility' });
  gsap.fromTo('.hero-backdrop', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2, delay: 0.7, ease: 'power2.out' });
  gsap.fromTo('.hero-backdrop > img', { scale: 1.14 }, { scale: 1.04, duration: 2.4, delay: 0.7, ease: 'power3.out', clearProps: 'transform' });
  gsap.fromTo('.hero-backdrop-tint', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2, delay: 0.8, ease: 'power2.out' });
  gsap.fromTo('.hero-float-left', { x: -45, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8, delay: 1.3, ease, clearProps: 'transform,opacity,visibility' });
  gsap.fromTo('.hero-float-right', { x: 45, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8, delay: 1.4, ease, clearProps: 'transform,opacity,visibility' });
  gsap.fromTo('.hero-scroll-cue', { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, delay: 1.55, ease, clearProps: 'transform,opacity,visibility' });
  
  // Parallax on hero image
  gsap.to('.hero-backdrop > img', { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.hero-overlay', start: 'top top', end: 'bottom top', scrub: 1.2 } });

  // Reading scroll progress indicator at top of page
  const progressBar = document.querySelector('#scroll-progress');
  if(progressBar){
    gsap.to(progressBar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.15
      }
    });
  }

  // Trust grid indicators
  gsap.fromTo('.trust-grid > div', { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.1, ease, scrollTrigger: { trigger: '.trust-strip', start: 'top 90%', once: true }, clearProps: 'transform,opacity,visibility' });

  // Section reveals
  gsap.utils.toArray('.section-heading, .story-copy, .authenticity-grid > div:first-child, .configure-callout, .stores-note, .cta-content, .footer-top').forEach(el=>{
    gsap.fromTo(el, { y: 42, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease, scrollTrigger: { trigger: el, start: 'top 88%', once: true }, clearProps: 'transform,opacity,visibility' });
  });

  gsap.utils.toArray('.story-media, .catalogue-frame').forEach((el, i)=>{
    gsap.fromTo(el, { x: i % 2 ? 45 : -45, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.05, ease, scrollTrigger: { trigger: el, start: 'top 88%', once: true }, clearProps: 'transform,opacity,visibility' });
  });

  gsap.utils.toArray('.product-grid, .application-grid, .process-grid, .store-grid, .why-grid').forEach(grid=>{
    const cards = Array.from(grid.children).filter(el => el.matches('.product-card,.application-card,.process-item,.store-card,.why-grid > div'));
    if(!cards.length) return;
    gsap.fromTo(cards, { y: 48, autoAlpha: 0, scale: 0.97 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.75, stagger: 0.1, ease, scrollTrigger: { trigger: grid, start: 'top 85%', once: true }, clearProps: 'transform,opacity,visibility' });
  });

  gsap.utils.toArray('.product-card, .store-card, .application-card').forEach(card=>{
    if(window.matchMedia('(hover:hover) and (pointer:fine)').matches){
      const image = card.querySelector('img');
      card.addEventListener('mouseenter', ()=>{
        gsap.to(card, { y: -6, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
        if(image) gsap.to(image, { scale: 1.065, duration: 0.55, ease, overwrite: 'auto' });
      });
      card.addEventListener('mouseleave', ()=>{
        gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
        if(image) gsap.to(image, { scale: 1, duration: 0.55, ease, overwrite: 'auto' });
      });
    }
  });

  gsap.utils.toArray('.story-media img, .catalogue-frame img, .cta-media img').forEach(img=>{
    gsap.fromTo(img, { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: img.closest('figure,section') || img, start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
  });

  gsap.utils.toArray('.process-line').forEach(line => gsap.fromTo(line, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: line, start: 'top 85%', once: true }, clearProps: 'transform' }));
  gsap.utils.toArray('.eyebrow .rule').forEach(rule => gsap.fromTo(rule, { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 0.8, ease, scrollTrigger: { trigger: rule, start: 'top 94%', once: true }, clearProps: 'transform' }));

  gsap.utils.toArray('.button').forEach(button=>{
    if(!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    button.addEventListener('mouseenter', () => gsap.to(button, { scale: 1.03, duration: 0.22, ease: 'power2.out', overwrite: 'auto' }));
    button.addEventListener('mouseleave', () => gsap.to(button, { scale: 1, duration: 0.22, ease: 'power2.out', overwrite: 'auto' }));
  });

  const originalOpenConfig = openConfig;
  openConfig = function(preselect = null){
    originalOpenConfig(preselect);
    gsap.fromTo('.config-shell', { y: 24, autoAlpha: 0.6, scale: 0.985 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.48, ease, clearProps: 'transform,opacity,visibility' });
  };

  ScrollTrigger.refresh();
}
initMotion();
