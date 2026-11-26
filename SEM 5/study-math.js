let studyMathEnabled = false;
let studyMathPromise;
function loadStudyMath() {
  studyMathEnabled = true;
  if (!studyMathPromise) {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'assets/vendor/katex/katex.min.css';
    document.head.append(stylesheet);
    const script = (src) => new Promise((resolve, reject) => {
      const element = document.createElement('script');
      element.src = src; element.onload = resolve;
      element.onerror = () => reject(new Error('Formula rendering could not be loaded. Reload to retry.'));
      document.head.append(element);
    });
    studyMathPromise = script('assets/vendor/katex/katex.min.js').then(() => script('assets/vendor/katex/contrib/auto-render.min.js'));
  }
  return studyMathPromise;
}
function renderStudyMath(root) {
  if (!studyMathEnabled || typeof window.renderMathInElement !== 'function') return;
  window.renderMathInElement(root, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\[', right: '\\]', display: true },
      { left: '\\(', right: '\\)', display: false },
    ],
    ignoredClasses: ['katex', 'katex-display'],
    throwOnError: false, trust: false, strict: 'ignore',
  });
}
