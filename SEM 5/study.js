const params = new URLSearchParams(window.location.search);
const contentParam = params.get('content') || '';
const elContentPath = 'content/blc/isa-1/el/el.html';
const validContentPath = /^content\/[a-z0-9-]+\/isa-1\/unit-[0-9]+\/(notes|questions|cheat-sheet)\.html$/;
const readerCard = document.querySelector('#reader-card');
const readerPagination = document.querySelector('#reader-pagination');
const readerTopicPagination = document.querySelector('#reader-topic-pagination');
const readerNavigation = document.querySelector('#reader-navigation');
const typeNames = { notes: 'Notes', questions: 'Questions', 'cheat-sheet': 'Cheat Sheet' };
const markdownUnits = new Set(['ai/unit-1', 'ai/unit-2', 'sta/unit-1', 'sta/unit-2', 'blc/unit-1', 'blc/unit-2', 'ct/unit-1', 'ct/unit-2']);
const markdownModuleCounts = new Map([
  ['blc/unit-1', 5],
  ['blc/unit-2', 5],
  ['ct/unit-1', 9],
  ['ct/unit-2', 7],
]);
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

function parseBlcQuiz(source) {
  const lines = source.replace(/\r/g, '').split('\n').map((line) => line.trim());
  const answerKeyAt = lines.findIndex((line) => /ANSWER KEY/i.test(line));
  const questionLines = lines.slice(0, answerKeyAt < 0 ? lines.length : answerKeyAt);
  const answerLines = answerKeyAt < 0 ? [] : lines.slice(answerKeyAt + 1);
  const answers = new Map();
  let answerModule = null;
  let answerMarks = null;
  answerLines.forEach((line) => {
    const moduleMatch = line.match(/^#{1,6}\s+\*\*MODULE\s+(\d+)/i);
    if (moduleMatch) { answerModule = moduleMatch[1]; answerMarks = null; return; }
    const marksMatch = line.match(/^#{1,6}\s+\*\*(\d)-Mark/i);
    if (marksMatch) { answerMarks = marksMatch[1]; return; }
    const answerMatch = line.match(/^(\d+)\.\s+\*\*([A-D])\*\*/i);
    if (answerModule && answerMarks && answerMatch) answers.set(`${answerModule}/${answerMarks}/${answerMatch[1]}`, answerMatch[2].toUpperCase());
  });
  const sectionStarts = questionLines.map((line, index) => ({ line, index, match: line.match(/^#{1,6}\s+\*\*(\d)-MARK MCQs.*MODULE\s+(\d+)/i) })).filter(({ match }) => match);
  return sectionStarts.flatMap(({ index: start, match }, sectionIndex) => {
    const end = sectionStarts[sectionIndex + 1]?.index ?? questionLines.length;
    const marks = match[1];
    const module = match[2];
    const block = questionLines.slice(start + 1, end);
    const starts = block.map((line, index) => ({ line, index, match: line.match(/^\*\*(\d+)\\?\.\s+(.+?)\*\*:??$/) })).filter(({ match: questionMatch }) => questionMatch);
    return starts.map(({ index, match: questionMatch }, questionIndex) => {
      const next = starts[questionIndex + 1]?.index ?? block.length;
      const options = block.slice(index + 1, next).map((line) => line.match(/^([A-D])\)\s*(.+)$/i)).filter(Boolean).map(([, key, text]) => ({ key: key.toUpperCase(), text }));
      const answer = answers.get(`${module}/${marks}/${questionMatch[1]}`);
      return answer && options.length === 4 ? { prompt: questionMatch[2], options, answer, marks } : null;
    }).filter(Boolean);
  });
}

function parseUnitQuiz(source) {
  if (/^#\s+\*\*4-MARK QUESTIONS.*MODULE\s+\d+/im.test(source)) return parseBlcQuiz(source);
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

const solidityStarter = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CounterLab {
    uint256 private count;

    function increment() external {
        count += 1;
    }

    function getCount() external view returns (uint256) {
        return count;
    }
}`;

function splitElMaterial(source) {
  const unitOneAt = source.search(/^\*\*UNIT\s+\\?\-\s*1\*\*/im);
  const unitTwoAt = source.search(/^UNIT\s+\\?\-\s*2\b/im);
  if (unitOneAt < 0 || unitTwoAt < 0) return { labNotes: '', unitOne: source, unitTwo: '' };
  return {
    labNotes: source.slice(0, unitOneAt).trim(),
    unitOne: source.slice(unitOneAt, unitTwoAt).trim(),
    unitTwo: source.slice(unitTwoAt).trim(),
  };
}

function formatElUnitTwo(source) {
  const descriptions = {
    'Student Marks Contract': 'Stores and retrieves each student’s marks using the student ID as a key.',
    'Counter Contract': 'Keeps one number and lets a caller increase, decrease, or read it.',
    'Name Storage Contract': 'Saves one name on-chain and returns the currently stored name.',
    'Voting Contract': 'Tracks separate vote totals for two candidates.',
    'Student Attendance Contract': 'Records whether a student ID has been marked present.',
    'Account Balance Contract': 'Tracks a simple balance and blocks withdrawals above that balance.',
    'Product Price Contract': 'Stores a product price that can be updated and read.',
    'Employee Salary Contract': 'Stores and retrieves a salary for each employee ID.',
    'Book Library Contract': 'Tracks whether one book is available, borrowed, or returned.',
    'To-Do List Contract': 'Adds tasks to an on-chain list and reads tasks by index.',
  };
  const firstContractAt = source.search(/^###\s+(?:\*\*Codes\s*:\*\*\s+)?\*\*1\\?\.\s+/im);
  const guide = firstContractAt < 0 ? source : source.slice(0, firstContractAt);
  const codeSource = firstContractAt < 0 ? '' : source.slice(firstContractAt);
  const starts = [...codeSource.matchAll(/^###\s+(?:\*\*Codes\s*:\*\*\s+)?\*\*(\d+)\\?\.\s+(.+?)\*\*\s*$/gim)];
  const examples = starts.map((match, index) => {
    const nextAt = starts[index + 1]?.index ?? codeSource.length;
    const rawCode = codeSource.slice(match.index + match[0].length, nextAt).trim();
    const closingBrace = rawCode.lastIndexOf('\n}');
    const code = (closingBrace >= 0 ? rawCode.slice(0, closingBrace + 2) : rawCode)
      .replace(/\\([=\[\]>])/g, '$1')
      .replace(/\s{2,}$/gm, '');
    const name = match[2].trim();
    return `<section class="el-code-example"><h3>${escapeHtml(`${match[1]}. ${name}`)}</h3><p class="code-purpose"><strong>What it does:</strong> ${escapeHtml(descriptions[name] || 'Demonstrates a focused Solidity state-management task.')}</p><pre><code>${escapeHtml(code)}</code></pre></section>`;
  }).join('');
  return `${renderMarkdown(guide, 'Experiential Learning / Unit 2')}<div class="el-code-list"><h2>Solidity practice contracts</h2>${examples}</div>`;
}

function addLegacySolidityLab(labNotes = '') {
  const lab = document.createElement('section');
  lab.className = 'solidity-lab';
  lab.innerHTML = `<div class="solidity-lab__heading"><div><p class="note-label">Interactive learning sandbox</p><h2>Remix, MetaMask and Ganache workflow</h2><p>This in-site simulation is for learning. It does not access a wallet, compile Solidity, or send a real transaction.</p></div><div class="solidity-lab__links"><a class="button button-secondary" href="https://remix.ethereum.org/" target="_blank" rel="noopener">Open Remix</a><a class="button button-secondary" href="https://metamask.io/download/" target="_blank" rel="noopener">Get MetaMask</a><a class="button button-secondary" href="https://archive.trufflesuite.com/ganache/" target="_blank" rel="noopener">Get Ganache</a></div></div><ol class="solidity-lab__flow"><li><strong>Remix</strong><span>Write and compile the contract.</span></li><li><strong>MetaMask</strong><span>Connect a Ganache test account and approve transactions.</span></li><li><strong>Ganache</strong><span>Mine and inspect local blocks and transactions.</span></li></ol><div class="solidity-lab__workspace"><section><label for="solidity-editor">CounterLab.sol</label><textarea id="solidity-editor" spellcheck="false" aria-label="Solidity contract editor"></textarea><div class="solidity-lab__actions"><button class="button button-secondary" type="button" data-lab-action="compile">Compile</button><button class="button button-secondary" type="button" data-lab-action="connect">Connect MetaMask</button><button class="button button-primary" type="button" data-lab-action="deploy" disabled>Deploy to Ganache</button></div></section><section class="solidity-lab__console" aria-live="polite"><p class="note-label">Local transaction console</p><p data-lab-status>Step 1: edit the sample contract and compile it.</p><dl><div><dt>Compiler</dt><dd data-lab-compiler>Waiting</dd></div><div><dt>Wallet</dt><dd data-lab-wallet>Not connected</dd></div><div><dt>Contract</dt><dd data-lab-contract>Not deployed</dd></div><div><dt>Ganache blocks</dt><dd data-lab-blocks>0</dd></div></dl><div class="solidity-lab__contract-actions" hidden><button class="button button-secondary" type="button" data-lab-action="read">Read getCount()</button><button class="button button-primary" type="button" data-lab-action="increment">Send increment()</button></div></section></div><div class="solidity-lab__tip"><strong>What changes when you click a button?</strong> Compile checks the code shape in this simulation. Connecting represents MetaMask choosing a Ganache test account. Deploying creates a local example address and block. Calling <code>increment()</code> creates another local transaction and changes the displayed contract state.</div>`;
  readerCard.after(lab);
  const editor = lab.querySelector('#solidity-editor');
  const status = lab.querySelector('[data-lab-status]');
  const compiler = lab.querySelector('[data-lab-compiler]');
  const wallet = lab.querySelector('[data-lab-wallet]');
  const contract = lab.querySelector('[data-lab-contract]');
  const blocks = lab.querySelector('[data-lab-blocks]');
  const deploy = lab.querySelector('[data-lab-action="deploy"]');
  const contractActions = lab.querySelector('.solidity-lab__contract-actions');
  editor.value = solidityStarter;
  let compiled = false;
  let connected = false;
  let deployed = false;
  let count = 0;
  let blockCount = 0;
  const setBlocks = () => { blocks.textContent = String(blockCount); };
  lab.querySelector('[data-lab-action="compile"]').addEventListener('click', () => {
    compiled = /pragma\s+solidity/.test(editor.value) && /contract\s+\w+/.test(editor.value);
    compiler.textContent = compiled ? 'Compiled locally (simulation)' : 'Missing pragma or contract declaration';
    status.textContent = compiled ? 'Step 2: connect the simulated MetaMask account.' : 'Add both a pragma and a contract declaration, then compile again.';
    deploy.disabled = !(compiled && connected);
  });
  lab.querySelector('[data-lab-action="connect"]').addEventListener('click', () => {
    connected = true;
    wallet.textContent = 'Ganache test account: 0xA1...9C4E';
    status.textContent = compiled ? 'Step 3: deploy the compiled contract to the simulated Ganache chain.' : 'Wallet connected. Compile the contract before deployment.';
    deploy.disabled = !compiled;
  });
  deploy.addEventListener('click', () => {
    deployed = true;
    blockCount += 1;
    contract.textContent = '0xC0unt...Lab (local example)';
    setBlocks();
    contractActions.hidden = false;
    status.textContent = 'Deployment mined in local block 1. Read the initial count or send increment().';
  });
  lab.querySelector('[data-lab-action="read"]').addEventListener('click', () => {
    if (deployed) status.textContent = `getCount() returned ${count}. This view call did not create a transaction or block.`;
  });
  lab.querySelector('[data-lab-action="increment"]').addEventListener('click', () => {
    if (!deployed) return;
    count += 1;
    blockCount += 1;
    setBlocks();
    status.textContent = `increment() was approved by the simulated wallet. Local block ${blockCount} now stores count = ${count}.`;
  });
  if (labNotes) {
    const notes = document.createElement('div');
    notes.className = 'solidity-lab__notes';
    notes.innerHTML = renderMarkdown(labNotes, 'Solidity Lab / How the code works');
    lab.append(notes);
  }
  return lab;
}

function extractElContracts(source) {
  const firstContractAt = source.search(/^###\s+(?:\*\*Codes\s*:\*\*\s+)?\*\*1\\?\.\s+/im);
  if (firstContractAt < 0) return [];
  const codeSource = source.slice(firstContractAt);
  const starts = [...codeSource.matchAll(/^###\s+(?:\*\*Codes\s*:\*\*\s+)?\*\*(\d+)\\?\.\s+(.+?)\*\*\s*$/gim)];
  return starts.map((match, index) => {
    const nextAt = starts[index + 1]?.index ?? codeSource.length;
    const rawCode = codeSource.slice(match.index + match[0].length, nextAt).trim();
    const closingBrace = rawCode.lastIndexOf('\n}');
    const code = (closingBrace >= 0 ? rawCode.slice(0, closingBrace + 2) : rawCode)
      .replace(/\\([=\[\]>])/g, '$1')
      .replace(/\s{2,}$/gm, '');
    const contractName = code.match(/contract\s+(\w+)/)?.[1];
    return contractName ? { label: match[2].trim(), contractName, code } : null;
  }).filter(Boolean);
}

function parseContractFunctions(code) {
  return [...code.matchAll(/function\s+(\w+)\s*\(([^)]*)\)\s*(?:public|external)([^{};]*)/g)].map((match) => ({
    name: match[1],
    args: match[2].split(',').map((argument) => argument.trim()).filter(Boolean).map((argument, index) => {
      const [, type = 'value', name = `value${index + 1}`] = argument.match(/^(\w+)(?:\s+memory)?\s+(\w+)$/) || [];
      return { type, name };
    }),
    readOnly: /\b(view|pure)\b/.test(match[3]),
  }));
}

function addSolidityLab(labNotes = '', providedContracts = []) {
  const templates = providedContracts.length ? providedContracts : [{ label: 'Counter Lab', contractName: 'CounterLab', code: solidityStarter }];
  const lab = document.createElement('section');
  lab.className = 'solidity-lab';
  lab.innerHTML = `<div class="solidity-lab__heading"><div><p class="note-label">Interactive learning sandbox</p><h2>Remix, MetaMask and Ganache workflow</h2><p>Choose one of the ten Unit 2 examples or paste one into the editor. The filename, deploy target, and available function controls update from its contract declaration.</p></div><div class="solidity-lab__links"><a class="button button-secondary" href="https://remix.ethereum.org/" target="_blank" rel="noopener">Open Remix</a><a class="button button-secondary" href="https://metamask.io/download/" target="_blank" rel="noopener">Get MetaMask</a><a class="button button-secondary" href="https://archive.trufflesuite.com/ganache/" target="_blank" rel="noopener">Get Ganache</a></div></div><ol class="solidity-lab__flow"><li><strong>Remix</strong><span>Choose or paste a contract and compile it.</span></li><li><strong>MetaMask</strong><span>Connect a Ganache test account.</span></li><li><strong>Ganache</strong><span>Deploy and run the contract functions.</span></li></ol><div class="solidity-lab__workspace"><section><label for="solidity-template">Unit 2 practice contract</label><select id="solidity-template"><option value="">Paste your own of the 10 examples</option>${templates.map((template, index) => `<option value="${index}">${escapeHtml(template.label)}</option>`).join('')}</select><label for="solidity-editor" data-lab-filename>Contract.sol</label><textarea id="solidity-editor" spellcheck="false" aria-label="Solidity contract editor"></textarea><div class="solidity-lab__actions"><button class="button button-secondary" type="button" data-lab-action="compile">Compile</button><button class="button button-secondary" type="button" data-lab-action="connect">Connect MetaMask</button><button class="button button-primary" type="button" data-lab-action="deploy" disabled>Deploy to Ganache</button></div></section><section class="solidity-lab__console" aria-live="polite"><p class="note-label">Local transaction console</p><p data-lab-status>Step 1: choose or paste one of the Unit 2 contracts.</p><dl><div><dt>Compiler</dt><dd data-lab-compiler>Waiting</dd></div><div><dt>Wallet</dt><dd data-lab-wallet>Not connected</dd></div><div><dt>Contract</dt><dd data-lab-contract>Not deployed</dd></div><div><dt>Ganache blocks</dt><dd data-lab-blocks>0</dd></div></dl><div class="solidity-lab__contract-actions" hidden></div></section></div><div class="solidity-lab__tip"><strong>Learning simulation:</strong> the editor recognises the supplied Unit 2 contracts and simulates their state locally. Use <em>Open Remix</em> when you are ready to compile and deploy the same code with a real local Ganache node and your MetaMask test account.</div>`;
  readerCard.after(lab);
  const editor = lab.querySelector('#solidity-editor');
  const templatePicker = lab.querySelector('#solidity-template');
  const filename = lab.querySelector('[data-lab-filename]');
  const status = lab.querySelector('[data-lab-status]');
  const compiler = lab.querySelector('[data-lab-compiler]');
  const wallet = lab.querySelector('[data-lab-wallet]');
  const contract = lab.querySelector('[data-lab-contract]');
  const blocks = lab.querySelector('[data-lab-blocks]');
  const deploy = lab.querySelector('[data-lab-action="deploy"]');
  const contractActions = lab.querySelector('.solidity-lab__contract-actions');
  let contractName = '';
  let functions = [];
  let compiled = false;
  let connected = false;
  let deployed = false;
  let blockCount = 0;
  let state = {};
  const setBlocks = () => { blocks.textContent = String(blockCount); };
  const resetDeployment = () => {
    deployed = false;
    contract.textContent = 'Not deployed';
    contractActions.hidden = true;
    contractActions.innerHTML = '';
  };
  const identifyContract = () => {
    contractName = editor.value.match(/contract\s+(\w+)/)?.[1] || '';
    filename.textContent = contractName ? `${contractName}.sol` : 'Contract.sol';
    functions = parseContractFunctions(editor.value);
    compiled = false;
    compiler.textContent = 'Code changed';
    deploy.disabled = true;
    resetDeployment();
  };
  const initialState = () => ({ marks: {}, salary: {}, attendance: {}, count: 0, name: '', candidate1Votes: 0, candidate2Votes: 0, balance: 0, price: 0, bookAvailable: true, tasks: [] });
  const valueFor = (input, type) => type.startsWith('uint') || type.startsWith('int') ? Number(input.value) : input.value;
  const invoke = (functionName, args, readOnly) => {
    const key = String(args[0] ?? '');
    let response = '';
    if (contractName === 'StudentMarks') {
      if (functionName === 'setMarks') { state.marks[key] = args[1]; response = `Stored ${args[1]} marks for student ${key}.`; }
      if (functionName === 'getMarks') response = `Student ${key} has ${state.marks[key] ?? 0} marks.`;
    } else if (contractName === 'Counter') {
      if (functionName === 'increment') { state.count += 1; response = `Count is now ${state.count}.`; }
      if (functionName === 'decrement') { if (state.count === 0) return { ok: false, response: 'Transaction reverted: count cannot go below 0.' }; state.count -= 1; response = `Count is now ${state.count}.`; }
      if (functionName === 'getCount') response = `getCount() returned ${state.count}.`;
    } else if (contractName === 'NameStorage') {
      if (functionName === 'setName') { state.name = args[0]; response = `Stored name: ${state.name}.`; }
      if (functionName === 'getName') response = `getName() returned ${state.name || '(empty string)'}.`;
    } else if (contractName === 'Voting') {
      if (functionName === 'voteCandidate1') { state.candidate1Votes += 1; response = `Candidate 1 now has ${state.candidate1Votes} votes.`; }
      if (functionName === 'voteCandidate2') { state.candidate2Votes += 1; response = `Candidate 2 now has ${state.candidate2Votes} votes.`; }
      if (functionName === 'getVotes') response = `Votes: candidate 1 = ${state.candidate1Votes}, candidate 2 = ${state.candidate2Votes}.`;
    } else if (contractName === 'StudentAttendance') {
      if (functionName === 'markAttendance') { state.attendance[key] = true; response = `Marked student ${key} present.`; }
      if (functionName === 'getAttendance') response = `Student ${key} attendance: ${state.attendance[key] === true}.`;
    } else if (contractName === 'AccountBalance') {
      if (functionName === 'deposit') { state.balance += args[0]; response = `Balance is now ${state.balance}.`; }
      if (functionName === 'withdraw') { if (args[0] > state.balance) return { ok: false, response: 'Transaction reverted: Insufficient balance.' }; state.balance -= args[0]; response = `Balance is now ${state.balance}.`; }
      if (functionName === 'getBalance') response = `getBalance() returned ${state.balance}.`;
    } else if (contractName === 'ProductPrice') {
      if (functionName === 'setPrice') { state.price = args[0]; response = `Price is now ${state.price}.`; }
      if (functionName === 'getPrice') response = `getPrice() returned ${state.price}.`;
    } else if (contractName === 'EmployeeSalary') {
      if (functionName === 'setSalary') { state.salary[key] = args[1]; response = `Stored salary ${args[1]} for employee ${key}.`; }
      if (functionName === 'getSalary') response = `Employee ${key} salary: ${state.salary[key] ?? 0}.`;
    } else if (contractName === 'BookLibrary') {
      if (functionName === 'borrowBook') { if (!state.bookAvailable) return { ok: false, response: 'Transaction reverted: Book is already borrowed.' }; state.bookAvailable = false; response = 'Book is now borrowed.'; }
      if (functionName === 'returnBook') { state.bookAvailable = true; response = 'Book is available again.'; }
      if (functionName === 'checkAvailability') response = `Book available: ${state.bookAvailable}.`;
    } else if (contractName === 'TodoList') {
      if (functionName === 'addTask') { state.tasks.push(args[0]); response = `Added task ${state.tasks.length}: ${args[0]}.`; }
      if (functionName === 'getTask') response = `Task ${args[0]}: ${state.tasks[args[0]] ?? '(not found)'}.`;
      if (functionName === 'getTaskCount') response = `Task count: ${state.tasks.length}.`;
    }
    return { ok: true, response: response || `${functionName}() completed in the learning simulator.`, readOnly };
  };
  const renderFunctions = () => {
    contractActions.innerHTML = functions.map((item, index) => `<form class="solidity-lab__function" data-function-index="${index}"><strong>${escapeHtml(item.name)}()</strong>${item.args.map((arg) => `<label>${escapeHtml(arg.name)}<input data-function-arg type="${arg.type.startsWith('uint') || arg.type.startsWith('int') ? 'number' : 'text'}" placeholder="${escapeHtml(arg.type)}"></label>`).join('')}<button class="button ${item.readOnly ? 'button-secondary' : 'button-primary'}" type="submit">${item.readOnly ? 'Read' : 'Send transaction'}</button></form>`).join('') || '<p>No public or external functions were found.</p>';
    contractActions.hidden = false;
  };
  editor.addEventListener('input', identifyContract);
  templatePicker.addEventListener('change', () => {
    const template = templates[Number(templatePicker.value)];
    if (!template) return;
    editor.value = template.code;
    identifyContract();
    status.textContent = `${template.contractName}.sol loaded. Compile it to continue.`;
  });
  lab.querySelector('[data-lab-action="compile"]').addEventListener('click', () => {
    const supported = templates.some((template) => template.contractName === contractName);
    compiled = /pragma\s+solidity/.test(editor.value) && Boolean(contractName) && functions.length > 0 && supported;
    compiler.textContent = compiled ? `Compiled ${contractName}.sol (simulation)` : 'Use one of the 10 Unit 2 contracts with a pragma and public function.';
    status.textContent = compiled ? (connected ? 'Ready to deploy to the local Ganache simulation.' : 'Step 2: connect the simulated MetaMask account.') : 'The simulator recognises the ten Unit 2 practice contracts. Choose one or paste its complete code.';
    deploy.disabled = !(compiled && connected);
  });
  lab.querySelector('[data-lab-action="connect"]').addEventListener('click', () => {
    connected = true;
    wallet.textContent = 'Ganache test account: 0xA1...9C4E';
    status.textContent = compiled ? 'Wallet connected. Deploy the compiled contract.' : 'Wallet connected. Compile a Unit 2 contract before deployment.';
    deploy.disabled = !compiled;
  });
  deploy.addEventListener('click', () => {
    deployed = true;
    state = initialState();
    blockCount += 1;
    contract.textContent = `0x${contractName.slice(0, 8).padEnd(8, '0')}...local`;
    setBlocks();
    renderFunctions();
    status.textContent = `${contractName}.sol deployed in local block ${blockCount}. Choose a function below.`;
  });
  contractActions.addEventListener('submit', (event) => {
    event.preventDefault();
    const functionInfo = functions[Number(event.target.dataset.functionIndex)];
    if (!functionInfo || !deployed) return;
    const args = [...event.target.querySelectorAll('[data-function-arg]')].map((input, index) => valueFor(input, functionInfo.args[index].type));
    const result = invoke(functionInfo.name, args, functionInfo.readOnly);
    if (result.ok && !functionInfo.readOnly) { blockCount += 1; setBlocks(); }
    status.textContent = result.ok && !functionInfo.readOnly ? `${result.response} Transaction mined in local block ${blockCount}.` : result.response;
  });
  editor.value = templates[0].code;
  templatePicker.value = '0';
  identifyContract();
  if (labNotes) {
    const notes = document.createElement('div');
    notes.className = 'solidity-lab__notes';
    notes.innerHTML = renderMarkdown(labNotes, 'Solidity Lab / How the code works');
    lab.append(notes);
  }
  return lab;
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
    if (/^```/.test(trimmed)) {
      const code = [];
      index += 1;
      while (index < lines.length && !/^```/.test(lines[index].trim())) { code.push(lines[index]); index += 1; }
      if (index < lines.length) index += 1;
      output.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
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
  const isBlcQuestionFile = lines.some((line) => /^#{1,6}\s+\*\*4-MARK QUESTIONS.*MODULE\s+\d+/i.test(line));
  if (isBlcQuestionFile) {
    const startPattern = new RegExp(`^#{1,6}\\s+\\*\\*4-MARK QUESTIONS.*MODULE\\s+${moduleNumber}\\*\\*\\s*$`, 'i');
    const start = lines.findIndex((line) => startPattern.test(line));
    if (start < 0) throw new Error(`Module ${moduleNumber} is not available in this study file.`);
    const answerKeyAt = lines.findIndex((line) => /^#{1,6}\s+\*\*ANSWER KEY/i.test(line));
    const nextModuleAt = lines.slice(start + 1, answerKeyAt < 0 ? lines.length : answerKeyAt).findIndex((line) => /^#{1,6}\s+\*\*4-MARK QUESTIONS.*MODULE\s+\d+/i.test(line));
    const end = nextModuleAt < 0 ? (answerKeyAt < 0 ? lines.length : answerKeyAt) : start + 1 + nextModuleAt;
    const answerPattern = new RegExp(`^#{1,6}\\s+\\*\\*MODULE\\s+${moduleNumber}\\*\\*\\s*$`, 'i');
    const answerStart = answerKeyAt < 0 ? -1 : lines.findIndex((line, index) => index > answerKeyAt && answerPattern.test(line));
    const answerEndAt = answerStart < 0 ? -1 : lines.slice(answerStart + 1).findIndex((line) => /^#{1,6}\s+\*\*MODULE\s+\d+\*\*\s*$/i.test(line));
    const answer = answerStart < 0 ? [] : lines.slice(answerStart, answerEndAt < 0 ? lines.length : answerStart + 1 + answerEndAt);
    return [...lines.slice(start, end), ...(answer.length ? ['---', '# **ANSWER KEY**', ...answer] : [])].join('\n');
  }
  const isCtQuestionFile = lines.some((line) => /^#{2,6}\s+\*\*4-Mark Questions\*\*/i.test(line));
  if (isCtQuestionFile) {
    const starts = lines.map((line, index) => ({ line, index })).filter(({ line }) => /^#{2,6}\s+\*\*4-Mark Questions\*\*/i.test(line));
    const start = starts[moduleNumber - 1]?.index;
    if (start === undefined) throw new Error(`Module ${moduleNumber} is not available in this study file.`);
    const answerKeyAt = lines.findIndex((line) => /ANSWER KEY/i.test(line));
    const end = starts[moduleNumber]?.index ?? (answerKeyAt < 0 ? lines.length : answerKeyAt);
    const answerPattern = new RegExp(`^##\\s+\\*\\*Module\\s+${moduleNumber}\\*\\*`, 'i');
    const answerStart = answerKeyAt < 0 ? -1 : lines.findIndex((line, index) => index > answerKeyAt && answerPattern.test(line));
    const answerEndAt = answerStart < 0 ? -1 : lines.slice(answerStart + 1).findIndex((line) => /^##\s+\*\*Module\s+\d+\*\*/i.test(line));
    const answer = answerStart < 0 ? [] : lines.slice(answerStart, answerEndAt < 0 ? lines.length : answerStart + 1 + answerEndAt);
    return [`# **MODULE ${moduleNumber} — QUESTIONS**`, ...lines.slice(start, end), ...(answer.length ? ['---', '# **ANSWER KEY**', ...answer] : [])].join('\n');
  }
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

function renderNavigation(basePath, type, topic, modular, moduleCount = 7) {
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
    topicNavigation.innerHTML = Array.from({ length: moduleCount }, (_, index) => `<a class="${index + 1 === topic ? 'is-active' : ''}" ${index + 1 === topic ? 'aria-current="page"' : ''} href="${readerUrl(`${basePath}${type}.html`, index + 1)}">${index + 1}</a>`).join('');
    const previous = topic > 1 ? `<a class="button button-secondary" href="${readerUrl(`${basePath}${type}.html`, topic - 1)}">← Previous module</a>` : '<span class="button button-secondary is-disabled" aria-disabled="true">← Previous module</span>';
    const next = topic < moduleCount ? `<a class="button button-primary" href="${readerUrl(`${basePath}${type}.html`, topic + 1)}">Next module →</a>` : '<span class="button button-primary is-disabled" aria-disabled="true">Next module →</span>';
    navigation.innerHTML = `${previous}<span class="page-count">Module ${topic} of ${moduleCount}</span>${next}`;
    return;
  }
  topicNavigation.hidden = true;
  const previous = typeIndex > 0 ? `<a class="button button-secondary" href="${readerUrl(`${basePath}${types[typeIndex - 1]}.html`)}">← Previous</a>` : '<span class="button button-secondary is-disabled" aria-disabled="true">← Previous</span>';
  const next = typeIndex < types.length - 1 ? `<a class="button button-primary" href="${readerUrl(`${basePath}${types[typeIndex + 1]}.html`)}">Next →</a>` : '<span class="button button-primary is-disabled" aria-disabled="true">Next →</span>';
  navigation.innerHTML = `${previous}<span class="page-count">Section ${typeIndex + 1} of ${types.length}</span>${next}`;
}

async function loadReader() {
  const isEl = contentParam === elContentPath;
  if (!isEl && !validContentPath.test(contentParam)) throw new Error('Invalid study-material location.');
  const contentMatch = isEl ? null : contentParam.match(/^content\/([a-z0-9-]+)\/isa-1\/(unit-[0-9]+)\/(notes|questions|cheat-sheet)\.html$/);
  const [, course, unit, type] = contentMatch || [null, 'blc', 'el', 'el'];
  const unitName = isEl ? 'Experiential Learning' : unit.replace('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
  const sectionName = isEl ? 'Solidity Lab' : typeNames[type];
  const title = `${courseNames[course]} — ${unitName}`;
  const markdownBacked = isEl || markdownUnits.has(`${course}/${unit}`);
  const modular = !isEl && markdownBacked && (type === 'notes' || type === 'questions');
  const moduleCount = markdownModuleCounts.get(`${course}/${unit}`) || 7;
  const topic = modular ? Math.min(moduleCount, Math.max(1, Number.parseInt(params.get('topic'), 10) || 1)) : null;
  document.title = `${typeNames[type]} | ${title}`;
  document.querySelector('#reader-title').textContent = modular ? `Module ${topic} — ${typeNames[type]}` : typeNames[type];
  document.querySelector('#reader-kicker').textContent = title;
  document.querySelector('#reader-crumb').textContent = title;
  document.querySelector('#reader-status').textContent = modular ? `Module ${topic} of 7` : `${typeNames[type]} · ${unitName}`;
  if (modular) document.querySelector('#reader-status').textContent = `Module ${topic} of ${moduleCount}`;
  if (isEl) {
    document.title = `${sectionName} | ${courseNames[course]}`;
    document.querySelector('#reader-title').textContent = sectionName;
    document.querySelector('#reader-status').textContent = 'Hands-on guide';
  }
  const basePath = contentParam.slice(0, contentParam.lastIndexOf('/') + 1);
  if (!isEl) renderNavigation(basePath, type, topic, modular, moduleCount);
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
  const visibleSource = isEl ? source : markdown && modular ? extractMarkdownModule(source, topic) : modular ? extractModule(source, topic, typeNames[type]) : source;
  const quizEnabled = ['ai', 'sta', 'blc'].includes(course) && markdownBacked && type === 'questions';
  const quizMode = quizEnabled && params.get('quiz') === '1';
  const questionSource = markdown && quizEnabled ? markdownToQuestionText(visibleSource) : visibleSource;
  const quizSource = markdown && quizEnabled ? (course === 'blc' ? source : markdownToQuestionText(source)) : source;
  readerCard.hidden = quizMode;
  readerPagination.hidden = quizMode || isEl;
  readerTopicPagination.hidden = quizMode || !modular;
  readerNavigation.hidden = quizMode || isEl;
  if (quizMode) {
    document.body.classList.add('quiz-mode');
    document.querySelector('#reader-title').textContent = `${unitName} MCQ Quiz`;
    document.querySelector('#reader-status').textContent = 'Interactive quiz';
    readerCard.innerHTML = '';
    addUnitQuiz(quizSource, unitName);
  } else {
    const markdownQuestions = ['blc', 'ct'].includes(course) && type === 'questions';
    const readerLabel = isEl ? 'Experiential Learning / Solidity Lab' : `${unitName} ${typeNames[type]}`;
    if (isEl) {
      const { labNotes, unitOne, unitTwo } = splitElMaterial(visibleSource);
      readerCard.innerHTML = renderMarkdown(unitOne, 'Experiential Learning / Unit 1');
      const lab = addSolidityLab(labNotes, extractElContracts(unitTwo));
      if (unitTwo) {
        const unitTwoCard = document.createElement('article');
        unitTwoCard.className = 'note-card reader-card el-unit-two';
        unitTwoCard.innerHTML = formatElUnitTwo(unitTwo);
        lab.after(unitTwoCard);
      }
    } else {
      readerCard.innerHTML = quizEnabled && !markdownQuestions ? formatQuestionContent(questionSource) : markdown ? renderMarkdown(visibleSource, readerLabel) : formatStudyContent(visibleSource, typeNames[type]);
    }
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
