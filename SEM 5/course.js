const courseKey = document.querySelector('meta[name="course"]')?.content;
const courses = {
  ai: { code: 'AI', name: 'Artificial Intelligence', folder: 'pdfs/AI', units: 2, pdfs: ['AI Unit 1.pdf', 'Ai Unit 2.pdf'], study: true },
  sta: { code: 'STA', name: 'Software Testing & Automation', folder: 'pdfs/STA', units: 2, pdfs: ['STA Unit 1.pdf', 'STA Unit 2.pdf'], study: true },
  blc: { code: 'BLC', name: 'Blockchain dApp Development', folder: 'pdfs/BLC', units: 2, pdfs: ['U1-COMBINED.pdf', 'U2-COMBINED.pdf'], study: true },
  gaming: { code: 'GAM', name: 'Gaming', folder: 'pdfs/Gaming', units: 2, pdfs: ['Gaming Unit 1.pdf', 'Gaming Unit 2.pdf'], study: true },
  ct: { code: 'CT', name: 'Cloud Technologies', folder: 'pdfs/CT', units: 1, pdfs: ['CT Unit 1.pdf'], study: true },
  dm: { code: 'DM', name: 'Digital Marketing', folder: 'pdfs/DM', units: 2, pdfs: ['DM Unit 1.pdf', 'DM Unit 2.pdf'], study: false },
};

const course = courses[courseKey];
const courseRoot = document.querySelector('#course-content');
const encodePath = (path) => path.split('/').map(encodeURIComponent).join('/');
const siteNav = document.querySelector('.nav');
siteNav.innerHTML = '<a class="icon-button" href="index.html" aria-label="Home"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></svg></a><button class="icon-button theme-toggle" type="button" aria-pressed="false" aria-label="Use light theme"><span class="theme-symbol" aria-hidden="true">☼</span></button>';
siteNav.className = 'icon-nav container';
siteNav.closest('header').className = 'icon-header';

function wireUnitTabs() {
  const tabs = [...document.querySelectorAll('.unit-tab')];
  const panels = [...document.querySelectorAll('.unit-panel')];
  const activate = (tab) => {
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', active);
      item.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => { panel.hidden = panel.id !== tab.getAttribute('aria-controls'); });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      const next = event.key === 'Home' ? tabs[0] : event.key === 'End' ? tabs.at(-1) : tabs[(index + direction + tabs.length) % tabs.length];
      next.focus();
      activate(next);
    });
  });
}

function studyButtons(unit) {
  if (!course.study) return '<p class="coming-soon">Interactive notes coming soon. The available PDFs are below.</p>';
  const root = `content/${courseKey}/isa-1/unit-${unit}/`;
  const quizButton = ['ai', 'sta', 'blc'].includes(courseKey) && [1, 2].includes(unit) ? `<button class="subtab" type="button" data-content="${root}questions.html" data-quiz="true">Quiz</button>` : '';
  return `<div class="subtab-list" aria-label="Unit ${unit} study sections"><button class="subtab" type="button" data-content="${root}notes.html">Notes</button><button class="subtab" type="button" data-content="${root}questions.html">Questions</button><button class="subtab" type="button" data-content="${root}cheat-sheet.html">Cheat Sheet</button>${quizButton}</div><p class="reader-hint">Each section opens in a focused study-reader tab.</p>`;
}

function pdfLink(unit) {
  const file = course.pdfs[unit - 1];
  if (!file) return '';
  return `<a class="pdf-link" href="${encodePath(`${course.folder}/${file}`)}" target="_blank" rel="noopener"><span>PDF</span><strong>${course.code} Unit ${unit}</strong><small>Open document ↗</small></a>`;
}

if (!course) {
  courseRoot.innerHTML = '<h1>Course unavailable</h1><p>Return to the Semester 5 course library.</p>';
} else {
  document.title = `${course.name} | Semester 5`;
  document.querySelector('#course-crumb').textContent = course.name;
  const sections = Array.from({ length: course.units }, (_, index) => ({ key: `unit-${index + 1}`, label: `Unit ${index + 1}`, unit: index + 1 }));
  if (courseKey === 'blc') sections.push({ key: 'el', label: 'EL', title: 'Experiential Learning' });
  const tabs = sections.map((section, index) => `<button id="${section.key}-tab" class="unit-tab ${index === 0 ? 'is-active' : ''}" type="button" role="tab" aria-selected="${index === 0}" aria-controls="${section.key}-panel" ${index === 0 ? '' : 'tabindex="-1"'}>${section.label}</button>`).join('');
  const panels = sections.map((section, index) => {
    if (section.key === 'el') return `<section id="el-panel" class="unit-panel" role="tabpanel" aria-labelledby="el-tab" ${index === 0 ? '' : 'hidden'}><div class="study-intro"><div><p class="eyebrow">BLC / EL</p><h2>${section.title}</h2></div><p>Build, deploy and test Solidity contracts on a local Ganache network.</p></div><div class="subtab-list" aria-label="Experiential Learning study section"><button class="subtab" type="button" data-content="content/blc/isa-1/el/el.html">Solidity Lab</button></div><p class="reader-hint">Open the guided lab for local development and deployment examples.</p></section>`;
    return `<section id="${section.key}-panel" class="unit-panel" role="tabpanel" aria-labelledby="${section.key}-tab" ${index === 0 ? '' : 'hidden'}><div class="study-intro"><div><p class="eyebrow">${section.label}</p><h2>${course.name}</h2></div><p>Choose a study section or open the original PDF.</p></div>${studyButtons(section.unit)}<div class="pdf-grid">${pdfLink(section.unit)}</div></section>`;
  }).join('');
  courseRoot.innerHTML = `<div class="course-heading"><div><p class="eyebrow">Semester 5 / ${course.code}</p><h1>${course.name}</h1></div><a class="button button-secondary" href="index.html">← All courses</a></div><div class="unit-tabs" role="tablist" aria-label="${course.name} units">${tabs}</div>${panels}`;
  wireUnitTabs();
  document.querySelectorAll('.subtab').forEach((button) => button.addEventListener('click', () => {
    const readerUrl = new URL('study.html', window.location.href);
    readerUrl.searchParams.set('content', button.dataset.content);
    if (button.dataset.quiz) readerUrl.searchParams.set('quiz', '1');
    window.open(readerUrl, '_blank', 'noopener');
  }));
}

const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  const light = document.body.classList.toggle('light');
  themeToggle.querySelector('.theme-symbol').textContent = light ? '☾' : '☼';
  themeToggle.setAttribute('aria-label', light ? 'Use dark theme' : 'Use light theme');
  themeToggle.setAttribute('aria-pressed', String(light));
});
