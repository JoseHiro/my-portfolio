(() => {
const base=new URL('.',document.currentScript.src),asset=name=>new URL('../img/apps/'+name,base).href,link=slug=>new URL('apps/'+slug+'.html',base).href;
const grid=document.querySelector('.work-grid');grid.querySelector('[data-sample]')?.remove();
const tiles=[...IOS_PROJECTS].reverse().map(p=>{const a=document.createElement('a');a.className='work-tile ios-tile';a.dataset.kind='ios';a.href=link(p.slug);a.innerHTML=(p.cover?`<img src="${asset(p.cover)}" alt="${p.name}">`:'<div class="placeholder">歴</div>')+`<b>${p.name} ↗</b><span></span>`;grid.prepend(a);return [a,p]});
const ios=document.querySelector('#ios');ios.querySelector('h2').innerHTML='Mi Ciudadita<span class="serif" style="display:block;font-size:.7em">A tiny city.<br>A daily delight.</span>';
ios.querySelector('.art').innerHTML=`<a href="${link('mi-ciudadita')}" class="real-phone"><img src="${asset('mi-ciudadita-1.webp')}" alt="Mi Ciudadita — Today"></a>`;
const cta=ios.querySelector('[data-sample]'),newCta=document.createElement('a');newCta.className=cta.className;newCta.href=link('mi-ciudadita');cta.replaceWith(newCta);
document.querySelector('.icon-one').innerHTML=`<img src="${asset('mi-ciudadita-icon.webp')}" alt="Mi Ciudadita">`;
const two=document.querySelector('.icon-two');two.innerHTML=`<img src="${asset('peekpaw-icon.webp')}" alt="Peekpaw">`;two.onclick=()=>location.href=link('peekpaw');two.setAttribute('aria-label','Peekpaw');
const three=document.querySelector('.icon-three');three.innerHTML=`<img src="${asset('cuotify-icon.webp')}" alt="Cuotify">`;three.onclick=()=>location.href=link('cuotify');three.setAttribute('aria-label','Cuotify');
function translate(){const en=document.documentElement.lang==='en';tiles.forEach(([a,p])=>a.querySelector('span').textContent='iOS · '+p.status[en?1:0]);ios.querySelector('.copy').textContent=IOS_PROJECTS[0].description[en?1:0];newCta.textContent=en?'Explore the UI screens ↗':'UI画面を詳しく見る ↗';document.querySelector('.collection-note').textContent=en?'Five iOS projects. Open a project to explore its story, screenshots and artwork.':'5つのiOS作品。各作品の詳細ページで、紹介・UI画面・アートワークを見られます。'}
translate();window.addEventListener('portfolio-language',translate);
})();
