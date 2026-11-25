const pg = ELPlayground;
const el = (id) => document.getElementById(`pg-${id}`);
const escapeText = (text) => String(text).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const sessions = new Map();
let examples = [], current, unit = new URLSearchParams(location.search).get('unit') === '3' ? 3 : 4;
const account = () => pg.accounts[el('account').value];
const functions = () => pg.methods(current.code);
const constructorArgs = () => pg.argsFor(current.code.match(/constructor\s*\(([^)]*)\)/)?.[1] || '');
const field = (arg) => `<label>${escapeText(arg.name)} <small>${escapeText(arg.type)}</small>${arg.type === 'bool' ? '<select data-arg><option value="true">true</option><option value="false">false</option></select>' : `<input data-arg type="text" ${arg.type.startsWith('uint') ? 'inputmode="numeric"' : ''} placeholder="${arg.type === 'address' ? 'A, B, C, D or 0x…' : escapeText(arg.type)}" ${arg.type === 'string' ? '' : 'required'}>`}</label>`;
function status(text, error = false) {
  el('status').textContent = text;
  el('status').dataset.error = String(error);
}
function inspect() {
  const session = sessions.get(current.id);
  el('owner').textContent = session ? `Deployed by account ${Object.keys(pg.accounts).find((key) => pg.accounts[key] === session.owner)}` : 'Not deployed';
  el('block').textContent = session ? `${session.blocks} successful simulated block${session.blocks === 1 ? '' : 's'}. Reads do not add a block.` : 'Deploy to begin. No gas or wallet balances are modelled.';
  el('state').textContent = session ? pg.stringify(session.state) : '{}';
  el('events').replaceChildren();
  if (!session?.events.length) {
    const item = document.createElement('li'); item.textContent = 'No events emitted.'; el('events').append(item);
  } else for (const event of session.events) {
    const item = document.createElement('li'); item.textContent = `Block ${event.block} · ${event.name}(${pg.stringify(event.values).replace(/\n\s*/g, ' ')})`; el('events').append(item);
  }
  el('deploy').hidden = Boolean(session);
  el('functions').hidden = !session;
}
function showSource() {
  el('code').textContent = current.files[Number(el('file').value) || 0].code;
  el('copy-status').textContent = '';
}
function showExample(id) {
  current = examples.find((example) => example.id === id);
  el('example').value = id;
  const url = new URL(location.href); url.searchParams.set('unit', unit); url.searchParams.set('example', id); history.replaceState(null, '', url);
  el('title').textContent = current.title;
  el('notes').href = `study.html?content=content/blc/isa-2/unit-${unit}/notes.html&topic=${current.section}`;
  el('file').innerHTML = current.files.map((file, index) => `<option value="${index}">${escapeText(file.name)}</option>`).join('');
  el('constructor').innerHTML = constructorArgs().map(field).join('');
  el('functions').innerHTML = functions().map((method, index) => `<form class="pg-function" data-method="${index}"><h3>${escapeText(method.name)}()</h3>${method.args.map(field).join('')}${method.payable ? '<label>Simulated value (wei)<input data-value inputmode="numeric" value="0" required></label><p>Only this field represents simulated Ether. An amount argument in other examples is an accounting value.</p>' : ''}<button class="button ${method.readOnly ? 'button-secondary' : 'button-primary'}" type="submit">${method.readOnly ? 'Read' : 'Write'}</button><output class="pg-result" aria-live="polite"></output></form>`).join('');
  showSource(); inspect();
  status(sessions.has(id) ? 'Resumed this exercise. Its state is preserved until reset or reload.' : 'Choose the deployer account, fill any constructor values, then deploy.');
}
function chooseUnit(nextUnit) {
  unit = nextUnit;
  for (const button of document.querySelectorAll('[data-unit]')) {
    const active = Number(button.dataset.unit) === unit;
    button.classList.toggle('is-active', active); button.setAttribute('aria-pressed', String(active));
  }
  el('example').innerHTML = [6, 7].map((section) => `<optgroup label="${section === 6 ? 'Section 6 · Basic practicals' : 'Section 7 · Integrated practicals'}">${examples.filter((example) => example.unit === unit && example.section === section).map((example) => `<option value="${example.id}">${escapeText(example.title)}</option>`).join('')}</optgroup>`).join('');
  const requested = new URLSearchParams(location.search).get('example');
  showExample(examples.find((example) => example.unit === unit && example.id === requested)?.id || examples.find((example) => example.unit === unit).id);
}
el('deploy').addEventListener('submit', (event) => {
  event.preventDefault();
  try {
    const args = [...el('constructor').querySelectorAll('[data-arg]')].map((input, index) => pg.inputValue(input.value, constructorArgs()[index].type));
    sessions.set(current.id, pg.deploy(current, account(), args)); inspect();
    status('Simulation deployed. Try a read, then a write; switch accounts to test permissions.');
  } catch (error) { status(error.message, true); }
});
el('functions').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target, method = functions()[Number(form.dataset.method)];
  try {
    const args = [...form.querySelectorAll('[data-arg]')].map((input, index) => pg.inputValue(input.value, method.args[index].type));
    const value = form.querySelector('[data-value]');
    const result = pg.call(sessions.get(current.id), method, args, account(), value ? pg.inputValue(value.value, 'uint256') : 0n);
    status(result.ok ? `${method.readOnly ? 'Read result' : 'Transaction completed'}: ${typeof result.result === 'string' ? result.result : pg.stringify(result.result)}` : `Reverted: ${result.result}\nNo state changes or events from this call were retained.`, !result.ok);
    form.querySelector('.pg-result').textContent = el('status').textContent;
    inspect();
  } catch (error) { status(error.message, true); form.querySelector('.pg-result').textContent = error.message; }
});
el('reset').addEventListener('click', () => { sessions.delete(current.id); showExample(current.id); status('Exercise reset. Deploy again for fresh state.'); });
el('account').addEventListener('change', () => status(`Caller changed to account ${el('account').value}. Deployer permissions and stored records are unchanged.`));
el('example').addEventListener('change', () => showExample(el('example').value));
el('file').addEventListener('change', showSource);
document.querySelectorAll('[data-unit]').forEach((button) => button.addEventListener('click', () => chooseUnit(Number(button.dataset.unit))));
el('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(el('code').textContent); el('copy-status').textContent = 'File copied.'; }
  catch { el('copy-status').textContent = 'Copy is unavailable. Use Download file or select the source text.'; }
});
el('download').addEventListener('click', () => {
  const file = current.files[Number(el('file').value) || 0];
  const url = URL.createObjectURL(new Blob([file.code + '\n'], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = file.name; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
});
document.querySelector('.theme-toggle').addEventListener('click', (event) => {
  const light = document.body.classList.toggle('light'); const button = event.currentTarget;
  button.textContent = light ? '☾' : '☼'; button.setAttribute('aria-pressed', String(light)); button.setAttribute('aria-label', light ? 'Use dark theme' : 'Use light theme');
});
Promise.all([3, 4].map(async (number) => {
  const response = await fetch(`content/blc/isa-2/unit-${number}/notes.md`);
  if (!response.ok) throw new Error(`Unit ${number} practicals could not be loaded. Reload to retry.`);
  return pg.catalog(await response.text(), number);
})).then((units) => {
  examples = units.flat();
  el('loading').hidden = true; el('workspace').hidden = false;
  chooseUnit(unit);
}).catch((error) => { el('loading').textContent = error.message; });
