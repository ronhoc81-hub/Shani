
const PHONE='972524365346', EMAIL='Shani.b.sh@gmail.com';
const wa=t=>`https://wa.me/${PHONE}?text=${encodeURIComponent(t)}`;
document.querySelectorAll('.wa-link').forEach(a=>{a.href=wa('היי שני, הגעתי מהאתר ואשמח לתאם שיחת היכרות 🙂');a.target='_blank';a.rel='noopener'});
document.getElementById('y').textContent=new Date().getFullYear();
const nav=document.getElementById('nav');addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40),{passive:true});
const f=document.getElementById('lead');
if(f)f.addEventListener('submit',e=>{
  e.preventDefault();
  const d=new FormData(f), name=d.get('name').trim(), phone=d.get('phone').trim(), err=document.getElementById('err');
  if(!name||!phone){err.textContent='נא למלא שם וטלפון';f.querySelector(name?'#p':'#n').focus();return}
  if(!document.getElementById('ok').checked){err.textContent='יש לאשר את מדיניות הפרטיות';document.getElementById('ok').focus();return}
  err.textContent='';
  const msg=`היי שני, אשמח לתיאום שיחת היכרות.\nשם: ${name}\nטלפון: ${phone}\nתחום: ${d.get('topic')}`;
  if(e.submitter&&e.submitter.dataset.via==='wa') window.open(wa(msg),'_blank');
  else location.href=`mailto:${EMAIL}?subject=${encodeURIComponent('פנייה מהאתר – '+name)}&body=${encodeURIComponent(msg)}`;
});
// accessibility toolbar
const H=document.documentElement,btn=document.getElementById('a11yBtn'),pnl=document.getElementById('a11yPanel');
let saved=[];try{saved=JSON.parse(localStorage.getItem('a11y')||'[]')}catch(e){}
const sync=()=>{pnl.querySelectorAll('[data-c]').forEach(b=>b.setAttribute('aria-pressed',H.classList.contains(b.dataset.c)));try{localStorage.setItem('a11y',JSON.stringify([...pnl.querySelectorAll('[aria-pressed=true]')].map(b=>b.dataset.c)))}catch(e){}};
saved.forEach(c=>H.classList.add(c));sync();
btn.onclick=()=>{const o=pnl.classList.toggle('open');btn.setAttribute('aria-expanded',o);if(o)pnl.querySelector('button').focus()};
pnl.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{const c=b.dataset.c,on=b.getAttribute('aria-pressed')!=='true';if(c.startsWith('fs'))H.classList.remove('fs1','fs2');H.classList.toggle(c,on);sync()});
document.getElementById('a11yReset').onclick=()=>{pnl.querySelectorAll('[data-c]').forEach(b=>H.classList.remove(b.dataset.c));sync()};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&pnl.classList.contains('open')){pnl.classList.remove('open');btn.setAttribute('aria-expanded',false);btn.focus()}});
// reveal
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.1});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
