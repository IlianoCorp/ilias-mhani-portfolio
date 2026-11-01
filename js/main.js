/* Shared behaviour; no dependencies, fetch calls or build step required. */
(() => {
  const root = document.documentElement;
  const dictionary = window.portfolioTranslations;
  let language = 'en';
  try { language = localStorage.getItem('portfolio-language') === 'fr' ? 'fr' : 'en'; } catch (_) {}
  const queryLanguage = new URLSearchParams(location.search).get('lang');
  if (queryLanguage === 'en' || queryLanguage === 'fr') language = queryLanguage;
  const originalTitle = document.title;
  function setLanguage(next) {
    language = next;
    root.lang = next;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const text = dictionary[next][element.dataset.i18n];
      if (typeof text === 'string') element.textContent = text;
    });
    document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === next)));
    document.querySelector('#main-nav').setAttribute('aria-label', next === 'fr' ? 'Navigation principale' : 'Main navigation');
    const title = document.querySelector('h1');
    document.title = next === 'en' ? originalTitle : `${title.textContent} — Mhani Ilias | ENSEEIHT`;
    document.querySelector('meta[name="description"]').content = document.querySelector('.page-heading p').textContent;
    try { localStorage.setItem('portfolio-language', next); } catch (_) {}
    // Keep the current URL in sync so refresh preserves an explicit switch too.
    const currentUrl = new URL(location.href);
    currentUrl.searchParams.set('lang', next);
    try { history.replaceState(history.state, '', currentUrl.href); } catch (_) {}
    // A URL fallback also preserves the choice in storage-restricted previews.
    document.querySelectorAll('a[href]').forEach(link => {
      const url = new URL(link.getAttribute('href'), location.href);
      if (url.origin === location.origin && /\.html$/.test(url.pathname)) {
        url.searchParams.set('lang', next);
        const relative = link.getAttribute('href').split('?')[0].split('#')[0];
        link.setAttribute('href', relative + '?' + url.searchParams.toString() + url.hash);
      }
    });
  }
  document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
  const menu = document.querySelector('.menu-toggle');
  function closeMenu() { menu.setAttribute('aria-expanded', 'false'); document.querySelector('.sidebar').classList.remove('menu-open'); }
  menu.addEventListener('click', () => {
    const expanded = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(expanded));
    document.querySelector('.sidebar').classList.toggle('menu-open', expanded);
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
  document.querySelectorAll('[data-year]').forEach(element => element.textContent = new Date().getFullYear());
  setLanguage(language);
  /* Back means the previous portfolio page in this tab. Direct visits and new
     tabs use the ordinary homepage href. The saved state also survives reloads. */
  const backLink = document.querySelector('[data-project-back]');
  if (backLink) {
    let internalReferrer = false;
    try {
      const previous = new URL(document.referrer);
      const portfolioRoot = new URL('../', new URL('.', location.href));
      const relative = previous.pathname.slice(portfolioRoot.pathname.length);
      internalReferrer = previous.origin === location.origin &&
        previous.pathname.startsWith(portfolioRoot.pathname) &&
        (relative === '' || /^(index|engineering|mobility|sustainability|activities|career)\.html$/.test(relative) || /^projects\/(abs|guessing-game|ebay-clone)\.html$/.test(relative));
    } catch (_) {}
    let canReturn = history.length > 1 && internalReferrer;
    // The Navigation API provides an additional exact previous-entry check
    // where supported; its empty new-tab history always takes the fallback.
    if (window.navigation && typeof window.navigation.entries === 'function') {
      const entries = window.navigation.entries();
      const currentIndex = entries.findIndex(entry => entry.key === window.navigation.currentEntry?.key);
      if (currentIndex === 0) canReturn = false;
    }
    if (history.state && history.state.portfolioProjectReturn === true && history.length > 1) canReturn = true;
    if (canReturn) {
      try { history.replaceState({ ...history.state, portfolioProjectReturn: true }, '', location.href); } catch (_) {}
    }
    backLink.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (canReturn && history.length > 1) {
        event.preventDefault();
        window.history.back();
      }
      // Otherwise let the relative homepage link work normally, including EN/FR.
    });
  }
  /* Set only paths to real, approved assets. Relative to the website root.
     Never add an academic solution generated by AI or a confidential document. */
  const assets = window.portfolioAssets || { profile: 'assets/images/profile.png', cvEn: 'assets/documents/cv-ilias-mhani-en.pdf', cvFr: 'assets/documents/cv-ilias-mhani-fr.pdf', pitch: '', github: '' };
  const base = new URL('../', document.querySelector('script[src$="js/main.js"]').src);
  if (assets.profile) {
    document.querySelectorAll('[data-asset="profile"] img').forEach(image => {
      const path = new URL(assets.profile, base).href;
      if (image.src !== path) image.src = path;
    });
  }
  ['en','fr'].forEach(lang => {
    const asset = assets[lang === 'en' ? 'cvEn' : 'cvFr'];
    if (!asset) return;
    document.querySelectorAll(`a[data-asset="cv-${lang}"]`).forEach(link => {
      link.href = new URL(asset, base).href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });
  });
  if (assets.pitch) document.querySelectorAll('[data-asset="pitch"]').forEach(el => {
    const video = document.createElement('video'); video.controls = true; video.preload = 'metadata'; video.src = new URL(assets.pitch, base).href; video.setAttribute('aria-label','Elevator pitch / Présentation personnelle'); el.replaceChildren(video);
  });
  if (assets.github) {
    const link = document.createElement('a'); link.href = assets.github; link.textContent = 'GitHub ↗'; link.className = 'social-link'; link.target = '_blank'; link.rel = 'noopener noreferrer'; document.querySelector('.sidebar-bottom').prepend(link);
  }
})();
