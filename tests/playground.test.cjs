const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const pg = require('../SEM 5/playground-engine.js');
const examples = [3, 4].flatMap((unit) => pg.catalog(fs.readFileSync(path.join(__dirname, `../SEM 5/content/blc/isa-2/unit-${unit}/notes.md`), 'utf8'), unit));
const { A, B, C } = pg.accounts;
assert.equal(examples.length, 30);
assert.equal(new Set(examples.map((example) => example.id)).size, 30);
for (const example of examples) {
  assert(pg.methods(example.code).length > 0, example.id);
  if (example.unit === 4) assert.deepEqual(example.files.map((file) => file.name), [`${example.contractName}.sol`, 'index.html', 'style.css', 'app.js']);
}
const seen = new Set();
function exercise(id, ctor = []) {
  seen.add(id);
  const example = examples.find((item) => item.id === id);
  const session = pg.deploy(example, A, ctor);
  return {
    session,
    run(name, args = [], caller = A, value = 0n, ok = true) {
      const method = pg.methods(example.code).find((item) => item.name === name);
      assert(method, `${id}: missing ${name}`);
      const before = structuredClone(session), result = pg.call(session, method, args, caller, value);
      assert.equal(result.ok, ok, `${id}.${name}: ${result.result}`);
      if (!ok) { assert.deepEqual(session.state, before.state); assert.deepEqual(session.events, before.events); assert.equal(session.blocks, before.blocks); }
      if (ok && method.readOnly) { assert.deepEqual(session.state, before.state); assert.equal(session.blocks, before.blocks); }
      return result.result;
    },
  };
}
assert.equal(exercise('3-6-1').run('name'), 'Rahul');
assert.equal(exercise('3-6-2').run('add'), 30n);
let x = exercise('3-6-3'); x.run('setMarks', [40n]); assert.equal(x.run('getResult'), 'Pass');
assert.equal(exercise('3-6-4').run('checkEligibility', [17n]), 'Not Eligible to Vote');
assert.equal(exercise('3-6-5').run('getGrade', [74n]), 'C');
assert.equal(exercise('3-6-6').run('getRegisteredUser', [], B), B);
x = exercise('3-6-7'); assert.equal(x.run('getBlockNumber'), 1n); assert(x.run('getBlockTimestamp') > 0n);
x = exercise('3-6-8'); x.run('registerStudent', ['Ada', 20n, true]); assert.equal(x.run('getStudent').name, 'Ada');
x = exercise('3-6-9'); x.run('addStudent', [1n, 'Ada']); assert.equal(x.run('students', [1n]), 'Ada'); assert.equal(x.run('getStudent', [2n]), '');
x = exercise('3-6-10'); x.run('addAttendance', [false]); assert.equal(x.run('getAttendance', [0n]), false); x.run('attendance', [1n], A, 0n, false);
assert.equal(exercise('3-6-11').run('calculateSum'), 55n);
x = exercise('3-6-12'); assert.equal(x.run('calculate', [0n]), 1n); assert.equal(x.run('calculate', [5n]), 120n); x.run('calculate', [58n], A, 0n, false);
assert.equal(exercise('3-6-13').run('calculate'), 30n);
assert.equal(exercise('3-6-14').run('findFive'), 5n);
x = exercise('3-6-15'); assert.equal(x.run('externalDivide', [9n, 2n]), 4n); x.run('externalDivide', [1n, 0n], A, 0n, false); assert.equal(x.run('calculate'), 20n); x.run('publicAdd', [pg.MAX, 1n], A, 0n, false);
x = exercise('3-6-16'); x.run('deposit', [], A, 3n * 10n ** 18n); assert.equal(x.run('getBalance'), 3n * 10n ** 18n);
x = exercise('3-6-17'); x.run('updateValue', [42n]); x.run('updateValue', [99n], B, 0n, false); assert.equal(x.run('value'), 42n);
x = exercise('3-6-18'); x.run('setMarks', [100n]); x.run('setMarks', [101n], A, 0n, false); assert.equal(x.run('marks'), 100n);
x = exercise('3-6-19'); x.run('registerStudent', ['Ada', 20n]); x.run('registerStudent', ['Other', 30n], B, 0n, false); assert.deepEqual(x.run('getStudent'), ['Ada', 20n]);
x = exercise('3-6-20'); x.run('setCandidates', ['One', 'Two']); x.run('vote', [3n], B, 0n, false); x.run('vote', [2n], B); x.run('vote', [1n], B, 0n, false); assert.deepEqual(x.run('getVotes'), [0n, 1n]);
x = exercise('3-7-1'); assert.equal(x.run('getStudent', [5n]).id, 0n); x.run('registerStudent', [5n, 'Ada', 'BCA']); x.run('registerStudent', [5n, 'Other', 'BCA'], A, 0n, false); assert.equal(x.session.events.length, 1);
x = exercise('3-7-2', ['Ada', 1000n]); x.run('deposit', [25n]); x.run('updateName', ['Ada B']); assert.deepEqual(x.run('getAccountDetails'), ['Ada B', 1025n, 2n]); x.run('createTemporaryMessage', [20n]); assert.equal(x.session.state.balance, 1025n);
x = exercise('3-7-3'); x.run('addStudent', ['Ada', 75n]); x.run('updateMarks', [0n, 90n]); assert.equal(x.run('getStudentCopy', [0n]).marks, 90n); assert.equal(x.run('getTotalMarks'), 90n); x.run('updateMarks', [0n, 101n], A, 0n, false);
x = exercise('3-7-4'); x.run('addStudent', [1n, 'Ada', 'BCA']); assert.equal(x.run('searchByName', ['Nobody']), 'Nobody'); x.run('getStudent', [2n], A, 0n, false);
x = exercise('3-7-5'); x.run('deposit', [1000n]); x.run('withdraw', [300n]); x.run('transferBalance', [B, 200n]); x.run('withdraw', [800n], A, 0n, false); assert.equal(x.run('balances', [A]), 500n); assert.equal(x.run('balances', [B]), 200n); assert.equal(x.session.events.length, 2);
x = exercise('3-7-6'); x.run('deposit', [1000n]); x.run('withdraw', [300n]); assert.equal(x.run('verifyBalance'), true); x.run('deposit', [pg.MAX], A, 0n, false); assert.equal(x.session.events.length, 2);
x = exercise('3-7-7'); x.run('registerVoter', [17n], A, 0n, false); x.run('registerVoter', [18n]); x.run('checkEligibility'); x.run('registerVoter', [20n], A, 0n, false); assert.equal(x.session.events.length, 2);
x = exercise('3-7-8'); x.run('addBook', [1n, 'Book', 2n]); x.run('addBook', [2n, 'Other', 1n], B, 0n, false); x.run('issueBook', [1n], B); x.run('issueBook', [1n], C); x.run('issueBook', [1n], A, 0n, false); x.run('returnBook', [1n], B); x.run('returnBook', [1n], B, 0n, false); assert.equal(x.run('getBook', [1n]).availableCopies, 1n); assert.equal(x.run('getBook', [999n]).exists, false); assert.equal(x.session.events.length, 4);
x = exercise('4-6'); assert.equal(x.run('getMessage'), 'Hello Blockchain Students!'); x.run('setMessage', [''], B); assert.equal(x.run('getMessage'), '');
x = exercise('4-7'); const largeId = 9007199254740993n; x.run('registerStudent', [largeId, 'Ada', 'BCA']); x.run('registerStudent', [2n, 'Ada', 'MCA']); assert.equal(x.run('getMyRegistration'), 2n); assert.equal(x.run('getStudentCount'), 2n); x.run('updateStudent', [largeId, 'Other', 'BCA'], B, 0n, false); x.run('updateStudent', [largeId, 'Ada B', 'BCA']); assert.equal(x.run('getStudent', [largeId]).name, 'Ada B'); assert.equal(x.run('getStudentCount'), 2n); assert.equal(x.session.events.length, 3);
assert.equal(seen.size, 30);
assert.equal(pg.inputValue('9007199254740993', 'uint256'), 9007199254740993n);
assert.throws(() => pg.inputValue('-1', 'uint'));
assert.throws(() => pg.inputValue(String(pg.MAX + 1n), 'uint256'));
assert.throws(() => pg.inputValue('256', 'uint8'));
assert.equal(pg.inputValue('B', 'address'), B);
console.log('PASS: all 30 practicals; getters, state, caller permissions, revert rollback, events, uint256 precision, code files and source selection.');
