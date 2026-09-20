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
  content/<course>/isa-1/      Study material, organised by unit
  pdfs/<COURSE>/               Original course PDFs
  assets/                      Course artwork and visual assets
  *.css, *.js                  Shared site styling and behaviour
.github/workflows/             GitHub Pages deployment workflow
```

## Semester 5 site

Open `SEM 5/index.html` with a local web server, such as VS Code Live Server. The reader fetches content files, so opening pages directly from the filesystem may prevent notes from loading.

The site currently provides course pages for Artificial Intelligence, Blockchain dApp Development, Cloud Technologies, Digital Marketing, Software Testing & Automation, and Gaming. AI Unit 1 also includes Markdown-backed notes, questions, a cheat sheet, and an interactive MCQ quiz.

### Adding study material

1. Put a unit's reader files in `SEM 5/content/<course>/isa-1/unit-<number>/`.
2. Keep the filenames `notes.html`, `questions.html`, and `cheat-sheet.html` so course links continue to work.
3. For AI Unit 1, the matching `.md` files are the source used by the enhanced reader.
4. Put original documents in `SEM 5/pdfs/<COURSE>/` and update the PDF filename in `SEM 5/course.js` if needed.

## Deployment

Pushing changes under `SEM 5/` to `main` runs the GitHub Pages workflow in `.github/workflows/semester5-pages.yml`. It publishes the contents of `SEM 5/` as the site.

## Contributing

Keep filenames descriptive, place material in the matching semester/course/unit folder, and avoid replacing existing resources unless the update is intentional. This repository is for educational use; source material remains the property of its respective authors and institutions.
