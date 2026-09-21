const params = new URLSearchParams(window.location.search);
const contentParam = params.get('content') || '';
const validContentPath = /^content\/[a-z0-9-]+\/isa-1\/unit-[0-9]+\/(notes|questions|cheat-sheet)\.html$/;
const readerCard = document.querySelector('#reader-card');
const readerPagination = document.querySelector('#reader-pagination');
const readerTopicPagination = document.querySelector('#reader-topic-pagination');
const readerNavigation = document.querySelector('#reader-navigation');
const typeNames = { notes: 'Notes', questions: 'Questions', 'cheat-sheet': 'Cheat Sheet' };
const markdownUnits = new Set(['ai/unit-1', 'ai/unit-2', 'sta/unit-1', 'sta/unit-2']);
const courseNames = { ai: 'Artificial Intelligence', blc: 'Blockchain dApp Development', ct: 'Cloud Technologies', dm: 'Digital Marketing', sta: 'Software Testing & Automation', gaming: 'Gaming' };
const siteNav = document.querySelector('.nav');
siteNav.innerHTML = '<a class="icon-button" href="index.html" aria-label="Home"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></svg></a><button class="icon-button theme-toggle" type="button" aria-pressed="false" aria-label="Use light theme"><span class="theme-symbol" aria-hidden="true">☼</span></button>';
siteNav.className = 'icon-nav container';
siteNav.closest('header').className = 'icon-header';

function readerUrl(content, topic) {
  const url = new URL('study.html', window.location.href);
  url.searchParams.set('content', content);
  if (topic) url.searchParams.set('topic', topic);
  return url;
}

function escapeHtml(text) {
  const element = document.createElement('div');
  element.textContent = text;
  return element.innerHTML;
}

function formatStudyContent(source, type) {
  const template = document.createElement('template');
  template.innerHTML = source;
  if (template.content.querySelector('h1, h2, h3, ul, ol, table, pre, details, .callout, .formula')) return source;
  const label = template.content.querySelector('.note-label');
  const output = document.createElement('div');
  output.className = 'study-content';
  if (label) output.append(label.cloneNode(true));
  label?.remove();
  template.content.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
    if (/pending/i.test(heading.textContent)) heading.remove();
  });
  const lines = template.content.textContent.replace(/\r/g, '').split('\n').map((line) => line.replace(/\s+$/, '')).filter((line) => line.trim());
  let block = [];
  const appendBlock = (linesToRender) => {
    if (!linesToRender.length) return;
    const diagramAt = linesToRender.findIndex((line) => /[\u2500-\u257f↓↑]/.test(line));
    if (diagramAt >= 0) {
      const diagramStart = diagramAt > 0 && linesToRender[diagramAt - 1].trim().length < 32 ? diagramAt - 1 : diagramAt;
      const diagramEnd = Math.min(diagramAt + 4, linesToRender.length - 1);
      appendBlock(linesToRender.slice(0, diagramStart));
      const diagram = document.createElement('pre');
      diagram.className = 'diagram';
      diagram.textContent = linesToRender.slice(diagramStart, diagramEnd + 1).join('\n');
      output.append(diagram);
      appendBlock(linesToRender.slice(diagramEnd + 1));
      return;
    }
    const cleanLines = linesToRender.map((line) => line.trim());
    if (type === 'Notes' && cleanLines.length > 1) {
      const list = document.createElement('ul');
      list.className = 'fact-list';
      cleanLines.forEach((line) => {
        const item = document.createElement('li');
        item.textContent = line;
        list.append(item);
      });
      output.append(list);
      return;
    }
    const paragraph = document.createElement('p');
    paragraph.className = 'raw-block';
    paragraph.textContent = cleanLines.join('\n');
    output.append(paragraph);
  };
  const flushBlock = () => {
    if (!block.length) return;
    appendBlock(block);
    block = [];
  };
  const headingLevel = (line) => {
    if (/^UNIT\s+\d+\s*[—-]/i.test(line)) return 'h1';
    if (/^MODULE\s+\d+\s*[—-]/i.test(line)) return 'h2';
    if (/^\d+\.\d+\s/.test(line)) return 'h3';
    if (type === 'Cheat Sheet' && /^\d+\.\s+[A-Z]/.test(line)) return 'h2';
    if (type === 'Questions' && /^(4-Mark Descriptive|1-Mark MCQs|2-Mark MCQs|Descriptive|MCQs:|MODULE \d+ — ANSWER KEY)$/i.test(line)) return 'h3';
    if (type === 'Questions' && /^Q\d+\s/.test(line)) return 'h4';
    return null;
  };
  lines.forEach((line) => {
    const level = headingLevel(line.trim());
    if (!level) return block.push(line);
    flushBlock();
    const heading = document.createElement(level);
    heading.textContent = line;
    output.append(heading);
  });
  flushBlock();
  return output.innerHTML;
}

function formatQuestionContent(source) {
  const template = document.createElement('template');
  template.innerHTML = source;
  const label = template.content.querySelector('.note-label')?.textContent.trim() || 'Questions';
  const lines = template.content.textContent.replace(/\r/g, '').split('\n').map((line) => line.trim()).filter(Boolean);
  const moduleTitle = lines.find((line) => /^MODULE\s+\d+\s*[—-]\s*QUESTIONS/i.test(line)) || 'Questions';
  const answerKeyAt = lines.findIndex((line) => /ANSWER KEY$/i.test(line));
  const questionLines = answerKeyAt < 0 ? lines : lines.slice(0, answerKeyAt);
  const questionSections = [
    { title: '4-Mark Descriptive', aliases: ['4-Mark Descriptive', '4-Mark Questions'] },
    { title: '2-Mark MCQs', aliases: ['2-Mark MCQs'] },
    { title: '1-Mark MCQs', aliases: ['1-Mark MCQs'] },
  ];
  const sectionStarts = questionSections.map(({ title, aliases }) => ({ title, index: questionLines.findIndex((line) => aliases.includes(line)) })).filter(({ index }) => index >= 0);
  const output = document.createElement('div');
  output.className = 'study-content question-content';
  output.innerHTML = `<p class="note-label">${escapeHtml(label)}</p><h1>${escapeHtml(moduleTitle)}</h1>`;
  const displayNumbers = new Map();
  let nextQuestionNumber = 1;
  const questionMarkup = (sectionLines) => {
    const starts = sectionLines.map((line, index) => ({ line, index })).filter(({ line }) => /^Q\d+\b/.test(line));
    if (!starts.length) return `<p class="raw-block">${escapeHtml(sectionLines.join('\n'))}</p>`;
    return starts.map(({ line, index }, questionIndex) => {
      const end = starts[questionIndex + 1]?.index ?? sectionLines.length;
      const sourceNumber = line.match(/^Q(\d+)/)?.[1];
      const displayNumber = nextQuestionNumber++;
      if (sourceNumber) displayNumbers.set(sourceNumber, displayNumber);
      const displayLine = line.replace(/^Q\d+\b/, `Q${displayNumber}`);
      return `<h4>${escapeHtml(displayLine)}</h4><p class="raw-block">${escapeHtml(sectionLines.slice(index + 1, end).join('\n'))}</p>`;
    }).join('');
  };
  sectionStarts.forEach(({ title, index }, sectionIndex) => {
    const end = sectionStarts.map(({ index: next }) => next).sort((a, b) => a - b).find((next) => next > index) ?? questionLines.length;
    output.innerHTML += `<section class="question-group"><h2>${escapeHtml(title)}</h2>${questionMarkup(questionLines.slice(index + 1, end))}</section>`;
  });
  if (answerKeyAt >= 0) {
    const answerText = lines.slice(answerKeyAt + 1).join('\n').replace(/\bQ(\d+)\b/g, (reference, sourceNumber) => displayNumbers.has(sourceNumber) ? `Q${displayNumbers.get(sourceNumber)}` : reference);
    output.innerHTML += `<section class="answer-key"><h2>Answer Key</h2><p class="raw-block">${escapeHtml(answerText)}</p></section>`;
  }
  return output.innerHTML;
}

function parseUnitQuiz(source) {
  const lines = source.replace(/\r/g, '').split('\n').map((line) => line.trim()).filter(Boolean);
  const starts = lines.map((line, index) => ({ line, index, match: line.match(/^MODULE\s+(\d+)\s*(?:[-—]|â€”)+\s*QUESTIONS/i) })).filter(({ match }) => match);
  return starts.flatMap(({ index: start }, moduleIndex) => {
    const end = starts[moduleIndex + 1]?.index ?? lines.length;
    const block = lines.slice(start, end);
    const answerKeyAt = block.findIndex((line) => /ANSWER KEY$/i.test(line));
    const questionLines = block.slice(0, answerKeyAt < 0 ? block.length : answerKeyAt);
    const answerLines = answerKeyAt < 0 ? [] : block.slice(answerKeyAt + 1);
    const answers = new Map(answerLines.flatMap((line) => line.replace(/\*/g, '').split(';')).map((line) => {
      const match = line.match(/^Q(\d+)\s*[—-]\s*([A-D])(?:[.\s]|$)/i);
      const tableMatch = line.match(/\|\s*(\d+)\s*\|\s*([A-D])\s*\|/i);
      return match ? [match[1], match[2].toUpperCase()] : tableMatch ? [tableMatch[1], tableMatch[2].toUpperCase()] : null;
    }).filter(Boolean));
    const questionStarts = questionLines.map((line, index) => ({ line, index, match: line.match(/^Q(\d+)\.?\s*(?:\[[^\]]+\])?\s*(.*)$/) })).filter(({ match }) => match && Number(match[1]) >= 3);
    return questionStarts.map(({ index, match }, questionIndex) => {
      const endIndex = questionStarts[questionIndex + 1]?.index ?? questionLines.length;
      const options = questionLines.slice(index + 1, endIndex).map((line) => line.match(/^([A-D])\.\s*(.+)$/i)).filter(Boolean).map(([, key, text]) => ({ key: key.toUpperCase(), text }));
      const markHeading = questionLines.slice(0, index).reverse().find((line) => /^([12])-Mark MCQs$/i.test(line));
      const marks = markHeading?.match(/^([12])-Mark/i)?.[1];
      return answers.has(match[1]) && options.length === 4 && marks ? { prompt: match[2], options, answer: answers.get(match[1]), marks } : null;
    }).filter(Boolean);
  });
}

function addUnitQuiz(source, unitName) {
  const sourceQuestions = parseUnitQuiz(source);
  if (!sourceQuestions.length) return;
  const shuffleQuestions = () => {
    const shuffled = [...sourceQuestions];
    for (let current = shuffled.length - 1; current > 0; current -= 1) {
      const random = Math.floor(Math.random() * (current + 1));
      [shuffled[current], shuffled[random]] = [shuffled[random], shuffled[current]];
    }
    return shuffled;
  };
  let questions = shuffleQuestions();
  const quiz = document.createElement('section');
  quiz.className = 'quiz-card';
  readerCard.before(quiz);
  const totalMarks = sourceQuestions.reduce((sum, { marks }) => sum + Number(marks), 0);
  let index = 0;
  let score = 0;
  let marksEarned = 0;
  const renderStart = () => {
    quiz.innerHTML = `<p class="note-label">${unitName} interactive quiz</p><h2>Test your MCQs</h2><p>${questions.length} questions drawn from this unit's 1-mark and 2-mark MCQs. Get immediate feedback after every answer.</p><button class="button button-primary" type="button">Start quiz</button>`;
    quiz.querySelector('button').addEventListener('click', renderQuestion);
  };
  const renderQuestion = () => {
    const question = questions[index];
    quiz.innerHTML = `<p class="note-label">Question ${index + 1} of ${questions.length}</p><p class="quiz-mark">${question.marks}-mark MCQ</p><h2>${escapeHtml(question.prompt)}</h2><div class="quiz-options">${question.options.map(({ key, text }) => `<button class="quiz-option" type="button" data-answer="${key}"><strong>${key}</strong><span>${escapeHtml(text)}</span></button>`).join('')}</div><p class="quiz-feedback" aria-live="polite"></p>`;
    quiz.querySelectorAll('.quiz-option').forEach((option) => option.addEventListener('click', () => {
      if (quiz.dataset.answered) return;
      quiz.dataset.answered = 'true';
      const selected = option.dataset.answer;
      const correct = selected === question.answer;
      if (correct) { score += 1; marksEarned += Number(question.marks); }
      quiz.querySelectorAll('.quiz-option').forEach((button) => {
        button.disabled = true;
        if (button.dataset.answer === question.answer) button.classList.add('is-correct');
        if (button === option && !correct) button.classList.add('is-wrong');
      });
      const feedback = quiz.querySelector('.quiz-feedback');
      feedback.textContent = correct ? 'Correct!' : `Not quite — the correct answer is ${question.answer}.`;
      feedback.classList.add(correct ? 'is-correct' : 'is-wrong');
      const next = document.createElement('button');
      next.className = 'button button-primary';
      next.type = 'button';
      next.textContent = index + 1 === questions.length ? 'See result' : 'Next question';
      next.addEventListener('click', () => {
        quiz.dataset.answered = '';
        index += 1;
        if (index === questions.length) {
          const percent = Math.round((marksEarned / totalMarks) * 100);
          quiz.innerHTML = `<p class="note-label">Quiz complete</p><h2>Total score: ${marksEarned} / ${totalMarks} marks</h2><p class="quiz-percent">${percent}%</p><p>You answered ${score} of ${questions.length} question${questions.length === 1 ? '' : 's'} correctly.</p><button class="button button-secondary" type="button">Try again</button>`;
          quiz.querySelector('button').addEventListener('click', () => { questions = shuffleQuestions(); index = 0; score = 0; marksEarned = 0; renderQuestion(); });
          return;
        }
        renderQuestion();
      });
      quiz.append(next);
    }));
  };
  renderStart();
}

function markdownInline(value) {
  let text = escapeHtml(value.trim().replace(/\\([=*+<>.])/g, '$1'));
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return text;
}

function renderMarkdown(markdown, label) {
  const lines = markdown.replace(/\r/g, '').split('\n');
  const output = [`<div class="study-content markdown-content"><p class="note-label">${escapeHtml(label)}</p>`];
  const isTableLine = (line) => /^\s*\|/.test(line);
  const isTableSeparator = (line) => /^\s*\|\s*:?-{3,}/.test(line);
  const isDiagramLine = (line) => /[\u2500-\u257f↓↑]/.test(line);
  const tableCells = (line) => line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim());
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();
    if (!trimmed || /^#{1,6}$/.test(trimmed)) { index += 1; continue; }
    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = Math.min(4, heading[1].length + 1);
      output.push(`<h${level}>${markdownInline(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }
    if (/^---+$/.test(trimmed)) { output.push('<hr>'); index += 1; continue; }
    if (isTableLine(line) && isTableSeparator(lines[index + 1] || '')) {
      const headers = tableCells(line);
      index += 2;
      const rows = [];
      while (index < lines.length && isTableLine(lines[index])) { rows.push(tableCells(lines[index])); index += 1; }
      output.push(`<table><thead><tr>${headers.map((cell) => `<th>${markdownInline(cell)}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${headers.map((_, cellIndex) => `<td>${markdownInline(row[cellIndex] || '')}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
      continue;
    }
    if (/^>\s?/.test(trimmed)) {
      const quote = [];
      while (index < lines.length && /^>\s?/.test(lines[index].trim())) { quote.push(lines[index].trim().replace(/^>\s?/, '')); index += 1; }
      output.push(`<blockquote><p>${quote.map(markdownInline).join('<br>')}</p></blockquote>`);
      continue;
    }
    if (/^\*\s+/.test(trimmed)) {
      const items = [];
      while (index < lines.length && /^\*\s+/.test(lines[index].trim())) { items.push(lines[index].trim().replace(/^\*\s+/, '')); index += 1; }
      output.push(`<ul>${items.map((item) => `<li>${markdownInline(item)}</li>`).join('')}</ul>`);
      continue;
    }
    if (/^\d+\\?\.\s+/.test(trimmed)) {
      const items = [];
      while (index < lines.length && /^\d+\\?\.\s+/.test(lines[index].trim())) { items.push(lines[index].trim().replace(/^\d+\\?\.\s+/, '')); index += 1; }
      output.push(`<ol>${items.map((item) => `<li>${markdownInline(item)}</li>`).join('')}</ol>`);
      continue;
    }
    if (isDiagramLine(line) || isDiagramLine(lines[index + 1] || '')) {
      const diagram = [];
      while (index < lines.length && lines[index].trim()) { diagram.push(lines[index].replace(/\s+$/, '')); index += 1; }
      output.push(`<pre class="diagram">${escapeHtml(diagram.join('\n'))}</pre>`);
      continue;
    }
    const paragraph = [];
    while (index < lines.length) {
      const current = lines[index];
      const currentTrimmed = current.trim();
      if (!currentTrimmed || /^(#{1,6})\s+/.test(current) || /^---+$/.test(currentTrimmed) || /^>\s?/.test(currentTrimmed) || /^\*\s+/.test(currentTrimmed) || /^\d+\\?\.\s+/.test(currentTrimmed) || (isTableLine(current) && isTableSeparator(lines[index + 1] || '')) || isDiagramLine(current) || isDiagramLine(lines[index + 1] || '')) break;
      paragraph.push(currentTrimmed);
      index += 1;
    }
    output.push(`<p>${paragraph.map(markdownInline).join('<br>')}</p>`);
  }
  output.push('</div>');
  return output.join('');
}

function extractMarkdownModule(markdown, moduleNumber) {
  const lines = markdown.replace(/\r/g, '').split('\n');
  const starts = lines.map((line, index) => ({ index, match: line.match(/^#{1,6}\s+(?:\*\*)?MODULE\s+(\d+)\s*(?:[-—]|â€”)/i) })).filter(({ match }) => match);
  const startIndex = starts.findIndex(({ match }) => Number(match[1]) === moduleNumber);
  if (startIndex < 0) throw new Error(`Module ${moduleNumber} is not available in this study file.`);
  return lines.slice(starts[startIndex].index, starts[startIndex + 1]?.index).join('\n');
}

function markdownToQuestionText(markdown) {
  return markdown
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*/g, '')
    .replace(/\\([=*+<>.\[\]])/g, '$1')
    .replace(/\s{2,}$/gm, '');
}

function extractModule(source, moduleNumber, type) {
  const template = document.createElement('template');
  template.innerHTML = source;
  const lines = template.content.textContent.replace(/\r/g, '').split('\n').map((line) => line.trim()).filter(Boolean);
  const modulePattern = type === 'Questions' ? /^MODULE\s+[1-7]\s*[—-]\s*QUESTIONS/i : /^MODULE\s+[1-7]\s*[—-]/i;
  const starts = lines.map((line, index) => ({ line, index })).filter(({ line }) => modulePattern.test(line));
  const startPattern = type === 'Questions' ? new RegExp(`^MODULE\\s+${moduleNumber}\\s*[—-]\\s*QUESTIONS`, 'i') : new RegExp(`^MODULE\\s+${moduleNumber}\\s*[—-]`, 'i');
  const startIndex = starts.findIndex(({ line }) => startPattern.test(line));
  if (startIndex < 0) throw new Error(`Module ${moduleNumber} is not available in this study file.`);
  const start = starts[startIndex].index;
  const end = starts[startIndex + 1]?.index ?? lines.length;
  const unitLabel = template.content.querySelector('.note-label')?.textContent.trim() || 'Study material';
  return `<p class="note-label">${escapeHtml(`${unitLabel} / Module ${moduleNumber}`)}</p><p>${escapeHtml(lines.slice(start, end).join('\n'))}</p>`;
}

function renderNavigation(basePath, type, topic, modular) {
  const types = ['notes', 'questions', 'cheat-sheet'];
  const typeIndex = types.indexOf(type);
  const typeNavigation = document.querySelector('#reader-pagination');
  typeNavigation.innerHTML = types.map((item, index) => {
    const nextTopic = item === 'cheat-sheet' ? null : topic;
    return `<a class="${item === type ? 'is-active' : ''}" ${item === type ? 'aria-current="page"' : ''} href="${readerUrl(`${basePath}${item}.html`, nextTopic)}"><span>${index + 1}</span>${typeNames[item]}</a>`;
  }).join('');
  const topicNavigation = document.querySelector('#reader-topic-pagination');
  const navigation = document.querySelector('#reader-navigation');
  if (modular) {
    topicNavigation.hidden = false;
    topicNavigation.innerHTML = Array.from({ length: 7 }, (_, index) => `<a class="${index + 1 === topic ? 'is-active' : ''}" ${index + 1 === topic ? 'aria-current="page"' : ''} href="${readerUrl(`${basePath}${type}.html`, index + 1)}">${index + 1}</a>`).join('');
    const previous = topic > 1 ? `<a class="button button-secondary" href="${readerUrl(`${basePath}${type}.html`, topic - 1)}">← Previous module</a>` : '<span class="button button-secondary is-disabled" aria-disabled="true">← Previous module</span>';
    const next = topic < 7 ? `<a class="button button-primary" href="${readerUrl(`${basePath}${type}.html`, topic + 1)}">Next module →</a>` : '<span class="button button-primary is-disabled" aria-disabled="true">Next module →</span>';
    navigation.innerHTML = `${previous}<span class="page-count">Module ${topic} of 7</span>${next}`;
    return;
  }
  topicNavigation.hidden = true;
  const previous = typeIndex > 0 ? `<a class="button button-secondary" href="${readerUrl(`${basePath}${types[typeIndex - 1]}.html`)}">← Previous</a>` : '<span class="button button-secondary is-disabled" aria-disabled="true">← Previous</span>';
  const next = typeIndex < types.length - 1 ? `<a class="button button-primary" href="${readerUrl(`${basePath}${types[typeIndex + 1]}.html`)}">Next →</a>` : '<span class="button button-primary is-disabled" aria-disabled="true">Next →</span>';
  navigation.innerHTML = `${previous}<span class="page-count">Section ${typeIndex + 1} of ${types.length}</span>${next}`;
}

async function loadReader() {
  if (!validContentPath.test(contentParam)) throw new Error('Invalid study-material location.');
  const [, course, unit, type] = contentParam.match(/^content\/([a-z0-9-]+)\/isa-1\/(unit-[0-9]+)\/(notes|questions|cheat-sheet)\.html$/);
  const unitName = unit.replace('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
  const title = `${courseNames[course]} — ${unitName}`;
  const markdownBacked = markdownUnits.has(`${course}/${unit}`);
  const modular = markdownBacked && (type === 'notes' || type === 'questions');
  const topic = modular ? Math.min(7, Math.max(1, Number.parseInt(params.get('topic'), 10) || 1)) : null;
  document.title = `${typeNames[type]} | ${title}`;
  document.querySelector('#reader-title').textContent = modular ? `Module ${topic} — ${typeNames[type]}` : typeNames[type];
  document.querySelector('#reader-kicker').textContent = title;
  document.querySelector('#reader-crumb').textContent = title;
  document.querySelector('#reader-status').textContent = modular ? `Module ${topic} of 7` : `${typeNames[type]} · ${unitName}`;
  const basePath = contentParam.slice(0, contentParam.lastIndexOf('/') + 1);
  renderNavigation(basePath, type, topic, modular);
  let source;
  let markdown = false;
  if (markdownBacked) {
    const markdownResponse = await fetch(contentParam.replace(/\.html$/, '.md'));
    if (markdownResponse.ok) {
      source = await markdownResponse.text();
      markdown = true;
    }
  }
  if (!source) {
    const response = await fetch(contentParam);
    if (!response.ok) throw new Error('The requested study file could not be opened.');
    source = await response.text();
  }
  const visibleSource = markdown && modular ? extractMarkdownModule(source, topic) : modular ? extractModule(source, topic, typeNames[type]) : source;
  const quizEnabled = markdownBacked && type === 'questions';
  const quizMode = quizEnabled && params.get('quiz') === '1';
  const questionSource = markdown && quizEnabled ? markdownToQuestionText(visibleSource) : visibleSource;
  const quizSource = markdown && quizEnabled ? markdownToQuestionText(source) : source;
  readerCard.hidden = quizMode;
  readerPagination.hidden = quizMode;
  readerTopicPagination.hidden = quizMode || !modular;
  readerNavigation.hidden = quizMode;
  if (quizMode) {
    document.body.classList.add('quiz-mode');
    document.querySelector('#reader-title').textContent = `${unitName} MCQ Quiz`;
    document.querySelector('#reader-status').textContent = 'Interactive quiz';
    readerCard.innerHTML = '';
    addUnitQuiz(quizSource, unitName);
  } else {
    readerCard.innerHTML = quizEnabled ? formatQuestionContent(questionSource) : markdown ? renderMarkdown(visibleSource, `${unitName} ${typeNames[type]}`) : formatStudyContent(visibleSource, typeNames[type]);
  }
  readerCard.setAttribute('aria-busy', 'false');
}

loadReader().catch((error) => {
  document.querySelector('#reader-title').textContent = 'Study material unavailable';
  document.querySelector('#reader-status').textContent = 'Unavailable';
  readerCard.innerHTML = `<p class="note-label">Unable to open</p><h4>${error.message}</h4><p>Return to the Semester 5 course page and select a valid study section.</p>`;
  readerCard.setAttribute('aria-busy', 'false');
});

const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  const light = document.body.classList.toggle('light');
  themeToggle.querySelector('.theme-symbol').textContent = light ? '☾' : '☼';
  themeToggle.setAttribute('aria-label', light ? 'Use dark theme' : 'Use light theme');
  themeToggle.setAttribute('aria-pressed', String(light));
});
