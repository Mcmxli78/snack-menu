const icons={
all:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
food:'<circle cx="12.5" cy="12" r="5"/><path d="M7 4a9 9 0 0 1 12 1M7 20a9 9 0 0 0 12-1M2 3v5c0 2 4 2 4 0V3M4 3v5M3 11v10h2V11M22 3c-3 1-3 5-3 9h2v9h1V3Z"/>',
beverages:'<path d="m5 8 2 13h10l2-13H5Zm1 4h12M2 2l7 1 1 4M11 10l2 9"/><rect x="8" y="14" width="2" height="2" rx=".4" transform="rotate(20 9 15)"/><rect x="14" y="13" width="2" height="2" rx=".4" transform="rotate(-20 15 14)"/><rect x="10" y="18" width="2" height="2" rx=".4"/>',
shisha:'<path d="M10 2h4l-1 3h-2l-1-3ZM8 6h8c-1 2-3 2-3 4 2 2 1 3 0 5v1c1 2 3 4 2 5H9c-1-1 1-3 2-5v-1c-1-2-2-3 0-5 0-2-2-2-3-4Z" fill="currentColor"/><path d="M10 16C3 13 2 8 5 9c2 0 3 3 4 4M15 19c8 3 3 4-10 3" stroke="#e7ac7d"/><path d="M3 22h3"/>',
call:'<path d="m6 3 3 5-2 2c2 3 4 5 7 7l2-2 5 3c-1 4-4 4-7 2C8 17 4 13 2 7 1 4 3 2 6 3Z"/>',
chat:'<path d="M21 11.5a9 9 0 0 1-13 8L3 21l1.5-5a9 9 0 1 1 16.5-4.5Z"/><path d="m9 7-1 2c1 3 3 5 6 6l2-1-2-2-1 1-2-2 1-1-3-3Z"/>'
};
function icon(name){return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+icons[name]+'</svg>'}
const buttons=[...document.querySelectorAll('.category')],sections=[...document.querySelectorAll('.menu-view')],viewName=document.querySelector('#view-name'),labels={all:'All menu',food:'Food',beverages:'Beverages',shisha:'Shisha'},reduce=matchMedia('(prefers-reduced-motion: reduce)');
buttons.forEach(button=>{button.querySelector('.category-icon').innerHTML=icon(button.dataset.filter)});
document.querySelectorAll('.contact-card a').forEach(a=>a.insertAdjacentHTML('afterbegin',icon(a.classList.contains('whatsapp')?'chat':'call')));
document.querySelector('.shisha-panel .panel-title')?.insertAdjacentHTML('afterbegin','<div class="shisha-emblem">'+icon('shisha')+'</div>');
function showCategory(filter,scroll=false){
  if(!labels[filter])filter='all';
  buttons.forEach(button=>{const selected=button.dataset.filter===filter;button.classList.toggle('active',selected);button.setAttribute('aria-pressed',String(selected))});
  sections.forEach(section=>{const visible=filter==='all'||section.dataset.section===filter;section.hidden=!visible;section.classList.toggle('active',visible);if(visible&&!reduce.matches)section.animate([{opacity:0,transform:'translateY(8px)',filter:'blur(3px)'},{opacity:1,transform:'none',filter:'blur(0)'}],{duration:380,easing:'cubic-bezier(.22,1,.36,1)'})});
  viewName.textContent=labels[filter];
  if(scroll){history.pushState(null,'','#'+filter);document.querySelector('.view-title').scrollIntoView({behavior:reduce.matches?'instant':'smooth',block:'start'})}
}
buttons.forEach(button=>button.addEventListener('click',()=>showCategory(button.dataset.filter,true)));
addEventListener('hashchange',()=>{if(viewName&&labels[location.hash.slice(1)])showCategory(location.hash.slice(1))});
if(viewName)showCategory(location.hash.slice(1)||'all');
const year=document.querySelector('#year');if(year)year.textContent=new Date().getFullYear();
