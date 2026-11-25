/* Local teaching models for the supplied practicals, not a Solidity interpreter. */
const ELPlayground = (() => {
  const MAX = (1n << 256n) - 1n;
  const accounts = Object.fromEntries(['A', 'B', 'C', 'D'].map((key, i) => [key, `0x${String(i + 1).padStart(40, '0')}`]));
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  const checked = (value) => { check(value >= 0n && value <= MAX, 'Arithmetic overflow or underflow (uint256).'); return value; };
  const stringify = (value) => JSON.stringify(value, (_, item) => typeof item === 'bigint' ? item.toString() : item, 2);
  function inputValue(value, type) {
    if (/^uint(?:\d+)?$/.test(type)) {
      check(/^\d+$/.test(value.trim()), 'Enter a non-negative whole number.');
      const n = BigInt(value.trim());
      check(n <= (1n << BigInt(type.slice(4) || 256)) - 1n, `Value exceeds ${type}.`);
      return n;
    }
    if (type === 'bool') { check(['true', 'false'].includes(value), 'Select true or false.'); return value === 'true'; }
    if (type === 'address') {
      const address = accounts[value.toUpperCase()] || value;
      check(/^0x[0-9a-fA-F]{40}$/.test(address), 'Use account A–D or a 40-digit hexadecimal address.');
      return address.toLowerCase();
    }
    return value;
  }
  const argsFor = (text) => text.split(',').map((arg) => arg.trim()).filter(Boolean).map((arg, index) => {
    const parts = arg.split(/\s+/).filter((part) => !['memory', 'storage', 'calldata', 'payable'].includes(part));
    return { type: parts[0], name: parts[1] || `argument${index + 1}` };
  });
  function methods(code) {
    const source = code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
    const result = [...source.matchAll(/function\s+(\w+)\s*\(([^)]*)\)([^{};]*)\{/g)].filter((match) => /\b(public|external)\b/.test(match[3])).map((match) => ({ name: match[1], args: argsFor(match[2]), readOnly: /\b(view|pure)\b/.test(match[3]), payable: /\bpayable\b/.test(match[3]) }));
    for (const [, type, name] of source.matchAll(/^\s*(\w+)\s+public\s+(\w+)\s*(?:=|;)/gm)) result.push({ name, args: [], readOnly: true, getter: true, type });
    for (const [, type, name] of source.matchAll(/^\s*(\w+)\[\]\s+public\s+(\w+)/gm)) result.push({ name, args: [{ name: 'index', type: 'uint' }], readOnly: true, getter: true, array: true, type });
    for (const [, types, name] of source.matchAll(/^\s*mapping\((.+)\)\s+public\s+(\w+)/gm)) result.push({ name, args: [...types.matchAll(/(\w+)\s*=>/g)].map((match, i) => ({ name: `key${i + 1}`, type: match[1] })), readOnly: true, getter: true, mapping: true });
    return result;
  }
  function catalog(markdown, unit) {
    const sections = [...markdown.matchAll(/^## Section ([67])\b.*$/gm)];
    return sections.flatMap((section, sectionIndex) => {
      const body = markdown.slice(section.index, sections[sectionIndex + 1]?.index);
      if (unit === 3) {
        const programs = [...body.matchAll(/^### ([67])\.(\d+) Program \d+: (.+)$/gm)];
        return programs.map((program, index) => {
          const material = body.slice(program.index, programs[index + 1]?.index);
          const code = material.match(/```solidity\s*\n([\s\S]*?)```/)?.[1].trim();
          check(Boolean(code), `Source code missing for ${program[3]}.`);
          const contractName = code.match(/\bcontract\s+(\w+)/)[1];
          return { id: `3-${program[1]}-${program[2]}`, unit, section: Number(program[1]), title: program[3], contractName, code, files: [{ name: `${contractName}.sol`, code }] };
        });
      }
      const blocks = [...body.matchAll(/```(\w+)\s*\n([\s\S]*?)```/g)];
      const contract = blocks.find((block) => block[1] === 'solidity' && /\bcontract\s+/.test(block[2]));
      check(Boolean(contract), `Contract missing in Unit ${unit} Section ${section[1]}.`);
      const code = contract[2].trim(), contractName = code.match(/\bcontract\s+(\w+)/)[1];
      const files = [{ name: `${contractName}.sol`, code }];
      for (const [language, name] of [['html', 'index.html'], ['css', 'style.css'], ['javascript', 'app.js']]) {
        const file = blocks.find((block) => block[1] === language && (language !== 'html' || /<html/i.test(block[2])));
        if (file) files.push({ name, code: file[2].trim() });
      }
      return [{ id: `4-${section[1]}`, unit, section: Number(section[1]), title: section[1] === '6' ? 'Message DApp' : 'Student Registration DApp', contractName, code, files }];
    });
  }
  function deploy(example, caller, constructorArgs = []) {
    const owner = caller;
    let state;
    switch (example.contractName) {
      case 'StudentProfile': state = { name: 'Rahul', age: 21n, passed: true }; break;
      case 'StudentResult': case 'MarksValidation': state = { marks: 0n }; break;
      case 'StudentRecords': state = { students: {} }; break;
      case 'Attendance': state = { attendance: [] }; break;
      case 'EtherWallet': state = { totalDeposited: 0n, etherBalanceWei: 0n }; break;
      case 'AdminControl': state = { owner, value: 0n }; break;
      case 'ClassElection': state = { owner, candidate1: '', candidate2: '', votes1: 0n, votes2: 0n, hasVoted: {} }; break;
      case 'BankAccount': state = { accountHolder: constructorArgs[0] ?? '', balance: constructorArgs[1] ?? 0n, transactionCount: 0n }; break;
      case 'StudentMarksManagement': state = { students: [] }; break;
      case 'StudentSearch': state = { studentRecords: {} }; break;
      case 'ATMWithdrawal': state = { owner, balances: {} }; break;
      case 'BankBalanceVerification': state = { balance: 0n, totalDeposited: 0n, totalWithdrawn: 0n }; break;
      case 'VotingEligibility': state = example.section === 7 ? { voters: {} } : {}; break;
      case 'LibraryManagement': state = { librarian: owner, books: {}, borrowed: {} }; break;
      case 'MessageStorage': state = { message: 'Hello Blockchain Students!' }; break;
      case 'StudentRegistration':
        if (example.id === '3-6-8') state = { student: { name: '', age: 0n, passed: false } };
        else if (example.id === '3-6-19') state = { owner, studentName: '', studentAge: 0n };
        else state = example.unit === 4 ? { students: {}, isRegistered: {}, walletToStudentId: {}, studentCount: 0n } : { students: {} };
        break;
      default: state = {};
    }
    return { example, owner, state, blocks: 1, timestamp: BigInt(Math.floor(Date.now() / 1000)), events: [] };
  }
  function call(session, method, args, caller, value = 0n) {
    const snapshot = structuredClone(session.state), eventCount = session.events.length;
    try {
      check(method.payable || value === 0n, 'This function is not payable.');
      const result = invoke(session, method, args, caller, value);
      if (method.readOnly) session.state = snapshot;
      else {
        const validate = (item) => { if (typeof item === 'bigint') checked(item); else if (item && typeof item === 'object') Object.values(item).forEach(validate); };
        validate(session.state);
        session.blocks += 1;
        session.timestamp += 1n;
      }
      return { ok: true, result: result === undefined ? 'Completed' : result };
    } catch (error) {
      session.state = snapshot;
      session.events.length = eventCount;
      return { ok: false, result: error.message };
    }
  }
  function invoke(session, method, args, caller, value) {
    const { example, state: s } = session, n = method.name, [a, b, c] = args, key = String(a ?? '');
    const nonempty = (text, label = 'Name') => check(text.length > 0, `${label} cannot be empty`);
    const positive = (amount) => check(amount > 0n, 'Amount must be positive');
    const ownerOnly = () => check(caller === s.owner, 'Only owner allowed');
    const event = (name, ...values) => session.events.push({ block: session.blocks + 1, name, values });
    const studentDefault = () => ({ id: 0n, name: '', course: '', registered: false });
    const bookDefault = () => ({ id: 0n, title: '', availableCopies: 0n, exists: false });
    if (method.getter) {
      let result = s[n];
      if (method.array) { check(a < BigInt(result.length), 'Array index out of bounds'); return result[Number(a)]; }
      if (method.mapping) {
        for (const arg of args) result = result?.[String(arg)];
        if (result !== undefined) return result;
        if (['hasVoted', 'isRegistered', 'borrowed'].includes(n)) return false;
        if (n === 'students') return example.contractName === 'StudentRecords' ? '' : studentDefault();
        if (n === 'books') return bookDefault();
        if (n === 'voters') return { age: 0n, eligible: false, registered: false };
        return 0n;
      }
      check(result !== undefined, 'Getter is not available in this exercise.');
      return result;
    }
    switch (example.contractName) {
      case 'Calculator': return 30n;
      case 'StudentResult': if (n === 'setMarks') s.marks = a; else return s.marks >= 40n ? 'Pass' : 'Fail'; break;
      case 'VotingEligibility':
        if (example.section === 6) return a >= 18n ? 'Eligible to Vote' : 'Not Eligible to Vote';
        if (n === 'registerVoter') { check(a >= 18n, 'Voter must be at least 18 years old'); check(a <= 120n, 'Invalid age'); check(!s.voters[caller], 'Already registered'); s.voters[caller] = { age: a, eligible: true, registered: true }; event('VoterRegistered', caller, a); }
        if (n === 'checkEligibility') { check(s.voters[caller]?.registered, 'Voter is not registered'); check(s.voters[caller].age >= 18n, 'Not eligible to vote'); event('EligibilityChecked', caller, true); }
        if (n === 'getVoterStatus') return s.voters[caller] || { age: 0n, eligible: false, registered: false };
        break;
      case 'GradeCalculator': return a >= 90n ? 'A' : a >= 75n ? 'B' : a >= 60n ? 'C' : a >= 40n ? 'D' : 'F';
      case 'ServiceRegistration': return caller;
      case 'BlockchainMonitor': return n === 'getBlockNumber' ? BigInt(session.blocks) : session.timestamp;
      case 'StudentRegistration':
        if (example.id === '3-6-8') { if (n === 'registerStudent') s.student = { name: a, age: b, passed: c }; else return s.student; break; }
        if (example.id === '3-6-19') { if (n === 'registerStudent') { ownerOnly(); s.studentName = a; s.studentAge = b; } else return [s.studentName, s.studentAge]; break; }
        if (n === 'registerStudent') {
          positive(a); nonempty(b); nonempty(c, 'Course'); check(!s.students[key], 'Student ID already registered');
          s.students[key] = example.unit === 4 ? { id: a, name: b, course: c, registeredBy: caller } : { id: a, name: b, course: c, registered: true };
          if (example.unit === 4) { s.isRegistered[key] = true; s.walletToStudentId[caller] = a; s.studentCount += 1n; event('StudentRegistered', a, b, c, caller); }
          else event('StudentRegistered', a, caller, b, c);
        }
        if (n === 'getStudent') { if (example.unit === 4) check(s.isRegistered[key], 'Student not found'); return s.students[key] || studentDefault(); }
        if (n === 'checkRegistration') return Boolean(s.isRegistered[key]);
        if (n === 'getStudentCount') return s.studentCount;
        if (n === 'getMyRegistration') return s.walletToStudentId[caller] || 0n;
        if (n === 'updateStudent') { check(s.isRegistered[key], 'Student not found'); check(s.students[key].registeredBy === caller, 'Only the registering wallet can update'); nonempty(b); nonempty(c, 'Course'); Object.assign(s.students[key], { name: b, course: c }); event('StudentUpdated', a, b, c); }
        break;
      case 'StudentRecords': if (n === 'addStudent') s.students[key] = b; else return s.students[key] || ''; break;
      case 'Attendance': if (n === 'addAttendance') s.attendance.push(a); else { check(a < BigInt(s.attendance.length), 'Array index out of bounds'); return s.attendance[Number(a)]; } break;
      case 'SumCalculator': return 55n;
      case 'Factorial': { check(a <= 57n, 'Arithmetic overflow (factorial exceeds uint256).'); let total = 1n; for (let i = 2n; i <= a; i++) total = checked(total * i); return total; }
      case 'EvenNumberSum': return 30n;
      case 'SearchNumber': return 5n;
      case 'VisibilityDemo': if (n === 'publicAdd') return checked(a + b); if (n === 'externalDivide') { check(b !== 0n, 'Division by zero'); return a / b; } return 20n;
      case 'EtherWallet': if (n === 'deposit') { s.totalDeposited += value; s.etherBalanceWei += value; } else return s.etherBalanceWei; break;
      case 'AdminControl': ownerOnly(); s.value = a; break;
      case 'MarksValidation': check(a <= 100n, 'Marks must be between 0 and 100'); s.marks = a; break;
      case 'ClassElection':
        if (n === 'setCandidates') { ownerOnly(); s.candidate1 = a; s.candidate2 = b; }
        if (n === 'vote') { check(!s.hasVoted[caller], 'Already voted'); check(a === 1n || a === 2n, 'Invalid candidate'); s[a === 1n ? 'votes1' : 'votes2'] += 1n; s.hasVoted[caller] = true; }
        if (n === 'getVotes') return [s.votes1, s.votes2];
        break;
      case 'BankAccount':
        if (n === 'updateName') { nonempty(a); s.accountHolder = a; s.transactionCount += 1n; }
        if (n === 'deposit') { positive(a); s.balance += a; s.transactionCount += 1n; }
        if (n === 'getAccountDetails') return [s.accountHolder, s.balance, s.transactionCount];
        if (n === 'createTemporaryMessage') { checked(a + 1n); return 'Temporary deposit calculation'; }
        break;
      case 'StudentMarksManagement':
        if (n === 'addStudent') { nonempty(a); check(b <= 100n, 'Marks cannot exceed 100'); s.students.push({ name: a, marks: b }); }
        if (n === 'updateMarks') { check(a < BigInt(s.students.length), 'Invalid student index'); check(b <= 100n, 'Marks cannot exceed 100'); s.students[Number(a)].marks = b; }
        if (n === 'getStudentCopy') { check(a < BigInt(s.students.length), 'Invalid student index'); return s.students[Number(a)]; }
        if (n === 'getStudentCount') return BigInt(s.students.length);
        if (n === 'getTotalMarks') return checked(s.students.reduce((sum, student) => sum + student.marks, 0n));
        break;
      case 'StudentSearch':
        if (n === 'addStudent') { positive(a); nonempty(b); nonempty(c, 'Course'); check(!s.studentRecords[key], 'ID already exists'); s.studentRecords[key] = { id: a, name: b, course: c }; }
        if (n === 'searchByName') { nonempty(a, 'Search name'); return a; }
        if (n === 'getStudent') { check(s.studentRecords[key], 'Student not found'); return s.studentRecords[key]; }
        break;
      case 'ATMWithdrawal':
        if (n === 'deposit') { positive(a); s.balances[caller] = (s.balances[caller] || 0n) + a; event('Deposited', caller, a); }
        if (n === 'withdraw') { positive(a); check(a <= (s.balances[caller] || 0n), 'Insufficient balance'); s.balances[caller] -= a; event('Withdrawn', caller, a); }
        if (n === 'transferBalance') { check(a !== `0x${'0'.repeat(40)}`, 'Invalid recipient'); check(a !== caller, 'Cannot transfer to yourself'); positive(b); check(b <= (s.balances[caller] || 0n), 'Insufficient balance'); s.balances[caller] -= b; s.balances[a] = (s.balances[a] || 0n) + b; }
        break;
      case 'BankBalanceVerification':
        if (n === 'verifyBalance') return s.balance === s.totalDeposited - s.totalWithdrawn;
        positive(a);
        if (n === 'deposit') { s.balance += a; s.totalDeposited += a; event('DepositRecorded', a, s.balance); }
        if (n === 'withdraw') { check(a <= s.balance, 'Insufficient balance'); s.balance -= a; s.totalWithdrawn += a; event('WithdrawalRecorded', a, s.balance); }
        check(s.balance === s.totalDeposited - s.totalWithdrawn, 'Balance invariant failed');
        break;
      case 'LibraryManagement': {
        const book = s.books[key];
        if (n === 'addBook') { check(caller === s.librarian, 'Only librarian allowed'); positive(a); nonempty(b, 'Title'); positive(c); check(!book, 'Book already exists'); s.books[key] = { id: a, title: b, availableCopies: c, exists: true }; event('BookAdded', a, b, c); }
        if (n === 'issueBook') { check(book, 'Book does not exist'); check(!s.borrowed[caller]?.[key], 'Book already issued'); check(book.availableCopies > 0n, 'No copies available'); book.availableCopies -= 1n; s.borrowed[caller] ||= {}; s.borrowed[caller][key] = true; event('BookIssued', caller, a); }
        if (n === 'returnBook') { check(book, 'Book does not exist'); check(s.borrowed[caller]?.[key], 'Book not borrowed'); s.borrowed[caller][key] = false; book.availableCopies += 1n; event('BookReturned', caller, a); }
        if (n === 'getBook') return book || bookDefault();
        break;
      }
      case 'MessageStorage': if (n === 'setMessage') s.message = a; else return s.message; break;
      default: throw new Error('This function has no local teaching model. Use the source in Remix.');
    }
  }
  return { accounts, MAX, checked, stringify, inputValue, argsFor, methods, catalog, deploy, call };
})();
if (typeof module !== 'undefined') module.exports = ELPlayground;
