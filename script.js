/* Sem dependências: funciona também abrindo index.html no computador. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu');
  menuButton.hidden = false;
  function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-open'); }
  menuButton.addEventListener('click', function () {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  });
  menu.addEventListener('click', function (event) {
    const link = event.target.closest('a');
    if (!link) return;
    closeMenu();
    if (window.matchMedia('(max-width: 980px)').matches) {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) { target.tabIndex = -1; target.focus({preventScroll:true}); }
    }
  });
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) { closeMenu(); menuButton.focus(); }
  });
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }
  function externalLink(url, label) {
    const link = el('a', 'text-link', label + ' →');
    link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
    return link;
  }
  const german = document.documentElement.lang === 'de';
  const t = (pt,de) => german ? de : pt;
  const content = window.CONTEUDO || {publicacoes:[], videos:[]};
  const list = document.getElementById('publication-list');
  function renderPublications(filter) {
    list.replaceChildren();
    const items = content.publicacoes.filter(p => filter === 'todos' || p.grupo === filter);
    items.forEach(function (p) {
      const card = el('article', 'publication');
      const top = el('div', 'pub-top');
      top.append(el('span','pub-group',p.grupo === 'projeto' ? t('VÍNCULO DIRETO AO APQ','DIREKTER APQ-BEZUG') : t('AGENDA DE PESQUISA','FORSCHUNGSAGENDA')));
      top.append(el('span','',p.tipo + ' · ' + p.idioma)); card.append(top);
      const title=el('h3','',p.titulo); if(p.idioma==='Inglês' || p.idioma==='Englisch')title.lang='en';card.append(title);
      card.append(el('p','pub-authors',p.autores), el('p','pub-venue',p.veiculo + ' · ' + p.ano + (p.detalhes ? ' · ' + p.detalhes : '')));
      if(p.doi)card.append(el('p','pub-doi','DOI: '+p.doi));
      if(p.nota)card.append(el('p','pub-note',p.nota));
      if(/^https:\/\//.test(p.url))card.append(externalLink(p.url,t('Acessar publicação','Publikation öffnen')));
      list.append(card);
    });
    document.getElementById('publication-count').textContent=items.length+t(' publicações exibidas',' Publikationen angezeigt');
  }
  if(content.publicacoes.length) {
    renderPublications('todos');
    const filters=document.getElementById('publication-filters'); filters.hidden=false;
    filters.addEventListener('click',function(event){
      const button=event.target.closest('button[data-filter]');if(!button)return;
      filters.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      renderPublications(button.dataset.filter);
    });
  }
  /* Aceita URLs watch, youtu.be, shorts, live e embed. Não executa HTML vindo dos dados. */
  function youtubeId(input) {
    if (!input) return null;
    try {
      const url=new URL(input);
      if(url.protocol!=='https:' && url.protocol!=='http:')return null;
      const host=url.hostname.toLowerCase().replace(/^www\./,'').replace(/^m\./,'');
      let id=null;
      if(host==='youtu.be')id=url.pathname.split('/')[1];
      if(host==='youtube.com' || host==='youtube-nocookie.com'){
        id=url.searchParams.get('v');
        if(!id && /^\/(embed|shorts|live)\//.test(url.pathname))id=url.pathname.split('/')[2];
      }
      return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    } catch(error) {return null;}
  }
  function player(video) {
    const id=youtubeId(video.url);if(!id)return null;
    const container=el('div','video-embed');const frame=el('div','player');const iframe=el('iframe');
    iframe.src='https://www.youtube-nocookie.com/embed/'+id+(german?'?hl=de&cc_lang_pref=de&cc_load_policy=1':'');
    iframe.title=video.titulo;iframe.loading='lazy';iframe.referrerPolicy='strict-origin-when-cross-origin';
    iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen=true;frame.append(iframe);container.append(frame);
    const caption=el('p','video-caption',video.titulo);caption.append(externalLink('https://www.youtube.com/watch?v='+id,t('Assistir no YouTube','Auf YouTube ansehen')));container.append(caption);
    return container;
  }
  const first=content.videos[0];
  if(first){const featured=player(first);if(featured)document.getElementById('featured-player').replaceChildren(featured);}
  const library=document.getElementById('video-library');
  if(content.videos.length){
    library.replaceChildren();
    content.videos.forEach(function(video,index){
      const article=el('article','video-description');const id=youtubeId(video.url);
      article.append(el('span','tag',id?t('VÍDEO · YOUTUBE','VIDEO · YOUTUBE'):t('EM PREPARAÇÃO','IN VORBEREITUNG')),el('h3','',video.titulo),el('p','',video.descricao));
      if(video.data)article.append(el('p','small',video.data));
      if(index===0){const link=el('a','text-link',t('Ver vídeo na página inicial ↑','Zum Video auf der Startseite ↑'));link.href='#video-principal';article.append(link);}
      else{const embed=player(video);if(embed)article.append(embed);}
      library.append(article);
    });
  }
  // Realça a seção em leitura sem alterar a navegação nativa por âncoras.
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){
      if(!entry.isIntersecting)return;
      menu.querySelectorAll('a').forEach(function(a){if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
    });},{rootMargin:'-15% 0px -65% 0px',threshold:0});
    menu.querySelectorAll('a').forEach(function(a){const section=document.querySelector(a.hash);if(section)observer.observe(section);});
  }
})();
