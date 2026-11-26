# BCA PESU Study Hub

Course material, revision resources, and a Semester 5 study site for the BCA programme.

## Repository layout

```text
SEM 3/                         Semester 3 course material
SEM 4/                         Semester 4 course material
SEM 5/                         Deployable Semester 5 study site
  index.html                   Course library entry point
  [course].html                Individual course pages
  study.html                   Focused notes, questions, and cheat-sheet reader
  content/<course>/isa-<assessment>/      Study material, organised by unit
  pdfs/<COURSE>/               Original course PDFs
  assets/                      Course artwork and visual assets
  *.css, *.js                  Shared site styling and behaviour
.github/workflows/             GitHub Pages deployment workflow
```

## Semester 5 site

Open `SEM 5/index.html` with a local web server, such as VS Code Live Server. The reader fetches content files, so opening pages directly from the filesystem may prevent notes from loading.

The site currently provides course pages for Artificial Intelligence, Blockchain dApp Development, Cloud Technologies, Digital Marketing, Software Testing & Automation, and Gaming. AI, STA, BLC, and CT include interactive MCQ practice with skipping and result totals. CT, Blockchain, and STA Units 3 and 4 include Markdown-backed notes, questions, cheat sheets, and the original PDFs. STA Unit 3 has eight section pages and 32 MCQs; Unit 4 has seven sections and 28 MCQs. Both STA quizzes use 25% easy and 75% tough questions, with focused scenarios and answer explanations. Unit 3 also has a separate Written practice page containing the supplied short-answer and programming questions. Blockchain Unit 3 uses concise, challenging MCQs with focused reasoning and short code examples. Unit 4 retains the supplied MCQs. Study links open in the same tab, and the reader links back to the selected subject/unit.

### EL Playground

Open `SEM 5/playground.html` or choose **EL > Open playground** on the Blockchain course page. The playground loads 28 Unit 3 Solidity exercises and both Unit 4 DApps directly from their notes, with downloadable source files. Unit 4 includes the complete Solidity, HTML, CSS, and JavaScript examples. The earlier Unit 2 lab remains linked.

Each exercise has its own temporary local state, caller selection, public function/getter controls, constructor inputs, and event log. These are explicit teaching models, not Solidity compilation or an EVM: they do not use MetaMask, send transactions, model gas, or execute edited source. Amounts use integer precision; payable call value is labelled in wei. Failed calls restore state and events. Reloading clears simulations.

Run the model checks with `node tests/playground.test.cjs`.

### Adding study material

1. Put a unit's reader files in `SEM 5/content/<course>/isa-<assessment>/unit-<number>/`.
2. Use `notes.md`, `questions.md`, and `cheat-sheet.md` for Markdown-backed units. Reader URLs retain `.html` for compatibility; these units do not require duplicate HTML files.
3. To enable another unit, update the course unit/PDF configuration in `SEM 5/course.js` and `markdownUnits` in `SEM 5/study.js`. ISA 1 notes/questions use module pagination; CT and Blockchain Units 3 and 4 and STA Unit 4 use seven section pages; STA Unit 3 uses eight. The CT questions files contain only questions; separate `answers.md` files supply their interactive quizzes. Blockchain Units 3 and 4 retain their supplied combined question banks and answer keys. MCQ banks require four labelled options and an answer key.
4. Put original documents in `SEM 5/pdfs/<COURSE>/` and update the PDF filename in `SEM 5/course.js` if needed.

## Deployment

Pushing changes under `SEM 5/` to `main` runs the GitHub Pages workflow in `.github/workflows/semester5-pages.yml`. It publishes the contents of `SEM 5/` as the site.

## Contributing

Keep filenames descriptive, place material in the matching semester/course/unit folder, and avoid replacing existing resources unless the update is intentional. This repository is for educational use; source material remains the property of its respective authors and institutions.
