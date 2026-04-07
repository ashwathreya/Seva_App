const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('seva_app_design_preview.html', 'utf8');

let firstErr = null;
const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  pretendToBeVisual: true,
});

// Silence jsdom console noise but capture errors.
dom.window.console.log = () => {};
dom.window.console.error = (...args) => {
  if (!firstErr) firstErr = String(args.join(' '));
};

dom.window.addEventListener('error', (e) => {
  if (firstErr) return;
  if (e.error) firstErr = e.error.stack || e.error.message;
  else firstErr = e.message;
});

setTimeout(() => {
  const app = dom.window.document.getElementById('app');
  const logos = dom.window.document.querySelectorAll('.seva-mark');
  const logoSvgWraps = dom.window.document.querySelectorAll('.seva-mark-svg-wrap');
  const screens = dom.window.document.querySelectorAll('.screen-scroll, .phone-inner-dark, .phone-inner-light');
  const splashWord = dom.window.document.querySelectorAll('.seva-wordmark-splash');
  const splashTap = dom.window.document.querySelectorAll('div');
  const tapTextCount = dom.window.document.body && dom.window.document.body.innerHTML.includes('Tap to continue') ? 1 : 0;
  const tab = dom.window.state ? dom.window.state.tab : null;
  const hasRenderApp = typeof dom.window.renderApp === 'function';
  const inner = app ? String(app.innerHTML || '') : '';
  const childTags = app
    ? Array.from(app.children || []).map((c) => c.tagName + (c.className ? `.${c.className}` : '')).slice(0, 5)
    : [];
  const sevaMarkInHtml = inner.includes('seva-mark');
  const splashImgPresent = inner.includes('seva_logo_new.png');
  const sevaSvgCount = dom.window.document.querySelectorAll('svg[role="img"][aria-label^="Seva"]').length;
  const sevaSvgMaskCount = dom.window.document.querySelectorAll('mask[id*="-mk"]').length;
  console.log(
    JSON.stringify({
      firstErr,
      appChildren: app ? app.children.length : 0,
      innerHTMLPreview: inner.slice(0, 220),
      childTags,
      logoCount: logos.length,
      logoSvgWrapCount: logoSvgWraps.length,
      sevaMarkInHtml,
      splashImgPresent,
      sevaSvgCount,
      sevaSvgMaskCount,
      splashWordCount: splashWord.length,
      tapToContinuePresent: tapTextCount,
      screenCount: screens.length,
      sampleTab: tab,
      hasRenderApp,
    })
  );
}, 800);

// Try to trigger the app bootstrapping like the browser would.
try {
  dom.window.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
  dom.window.dispatchEvent(new dom.window.Event('load'));
  if (typeof dom.window.renderApp === 'function') dom.window.renderApp();
} catch (e) {
  // If triggering fails, we still wait for whatever runs.
}

// Also force signup splash to verify the DOM is present.
try {
  if (dom.window.state) {
    dom.window.state.tab = 'signupFlow';
    dom.window.state.signupStep = 0;
    dom.window.renderApp();
  }
} catch (e) {}

