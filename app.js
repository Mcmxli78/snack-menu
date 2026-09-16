const icons={
all:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
food:'<path d="M4 3v5c0 3 6 3 6 0V3M7 3v18M20 21V3c-5 2-5 9 0 10"/>',
beverages:'<path d="M9 3h6v4l3 4v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8l3-4V3Z"/><path d="M9 6h6M6 13h12M6 17h12"/>',
shisha:'<path d="M8 3h8l-2 4h-4L8 3ZM12 7v8M7 11h10M9 15h6l2 5c-3 2-7 2-10 0l2-5ZM15 13c7-4 8 6 4 5M19 18v-3M11 1c0-1 2-1 2-2"/>',
call:'<path d="m6 3 3 5-2 2c2 3 4 5 7 7l2-2 5 3c-1 4-4 4-7 2C8 17 4 13 2 7 1 4 3 2 6 3Z"/>',
chat:'<path d="M21 11.5a9 9 0 0 1-13 8L3 21l1.5-5a9 9 0 1 1 16.5-4.5Z"/><path d="m9 7-1 2c1 3 3 5 6 6l2-1-2-2-1 1-2-2 1-1-3-3Z"/>'
};
function icon(name){return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+icons[name]+'</svg>'}
const buttons=[...document.querySelectorAll('.category')],sections=[...document.querySelectorAll('.menu-view')],viewName=document.querySelector('#view-name'),labels={all:'All menu',food:'Food',beverages:'Beverages',shisha:'Shisha'},reduce=matchMedia('(prefers-reduced-motion: reduce)');
buttons.forEach(button=>{button.querySelector('.category-icon').innerHTML=icon(button.dataset.filter)});
document.querySelectorAll('.contact-card a').forEach(a=>a.insertAdjacentHTML('afterbegin',icon(a.classList.contains('whatsapp')?'chat':'call')));
document.querySelector('.shisha-panel .panel-title').insertAdjacentHTML('afterbegin','<div class="shisha-emblem">'+icon('shisha')+'</div>');
function showCategory(filter,scroll=false){
  if(!labels[filter])filter='all';
  buttons.forEach(button=>{const selected=button.dataset.filter===filter;button.classList.toggle('active',selected);button.setAttribute('aria-pressed',String(selected))});
  sections.forEach(section=>{const visible=filter==='all'||section.dataset.section===filter;section.hidden=!visible;section.classList.toggle('active',visible);if(visible&&!reduce.matches)section.animate([{opacity:0,transform:'translateY(8px)',filter:'blur(3px)'},{opacity:1,transform:'none',filter:'blur(0)'}],{duration:380,easing:'cubic-bezier(.22,1,.36,1)'})});
  viewName.textContent=labels[filter];
  if(scroll){history.pushState(null,'','#'+filter);document.querySelector('.view-title').scrollIntoView({behavior:reduce.matches?'instant':'smooth',block:'start'})}
}
buttons.forEach(button=>button.addEventListener('click',()=>showCategory(button.dataset.filter,true)));
addEventListener('hashchange',()=>{if(labels[location.hash.slice(1)])showCategory(location.hash.slice(1))});
showCategory(location.hash.slice(1)||'all');
document.querySelector('#year').textContent=new Date().getFullYear();
