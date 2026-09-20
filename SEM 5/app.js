const selectAll = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function selectTab(tab, tabs, panels) {
  tabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-selected', active);
    item.tabIndex = active ? 0 : -1;
  });
  panels.forEach((panel) => { panel.hidden = panel.id !== tab.getAttribute('aria-controls'); });
}

function wireTabs(tabSelector, panelSelector, parent = document) {
  const tabs = selectAll(tabSelector, parent);
  const panels = selectAll(panelSelector, parent);
  tabs.forEach((tab, index) => {
    const activate = (target) => selectTab(target, tabs, panels);
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      const target = event.key === 'Home' ? tabs[0] : event.key === 'End' ? tabs.at(-1) : tabs[(index + direction + tabs.length) % tabs.length];
      target.focus();
      activate(target);
    });
  });
}

wireTabs('.view-tab', '.view-panel');
selectAll('.study-course').forEach((course) => wireTabs('.unit-tab', '.unit-panel', course));

selectAll('.unit-panel .note-card').forEach((card) => {
  card.removeAttribute('aria-busy');
  card.innerHTML = '<p class="note-label">Study reader</p><h4>Open a section in a new tab</h4><p>Select Notes, Questions, or Cheat Sheet above to read it in the focused study view.</p>';
});

selectAll('.subtab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const readerUrl = new URL('study.html', window.location.href);
    readerUrl.searchParams.set('content', tab.dataset.content);
    window.open(readerUrl, '_blank', 'noopener');
  });
});

const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  const light = document.body.classList.toggle('light');
  themeToggle.querySelector('.theme-symbol').textContent = light ? '☾' : '☼';
  themeToggle.setAttribute('aria-label', light ? 'Use dark theme' : 'Use light theme');
  themeToggle.setAttribute('aria-pressed', String(light));
});
