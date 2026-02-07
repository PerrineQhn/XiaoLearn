# HSK 3.0 — PDF vocabulaire (FR)

Ce dossier génère des PDFs type "liste HSK" avec pinyin et traduction française.

## Générer un niveau

1) Générer le HTML :

```
node build_hsk1_pdf.js --level 1
```

Options utiles :
- `--level 1..5`
- `--rows 8` (lignes par page)
- `--out index.html` (nom du HTML)
- `--accent #9b2335` (couleur par niveau)

2) Installer Puppeteer (si besoin) :

```
npm i puppeteer
```

3) Générer le PDF :

```
node render_pdf_puppeteer.js --level 1
```

Sortie : `hsk1_3.0_2026_fr.pdf`

## Générer tous les niveaux (1 → 5)

```
node build_hsk1_pdf.js --all
node render_pdf_puppeteer.js --level 1
node render_pdf_puppeteer.js --level 2
node render_pdf_puppeteer.js --level 3
node render_pdf_puppeteer.js --level 4
node render_pdf_puppeteer.js --level 5
```

## Grilles d'ecriture (HSK 3.0)

Ce flux genere des grilles d'ecriture avec progression des traits.
Source officielle HSK 3.0: `xiaolearn_anki/hsk_hanzi_writing_all.tsv`.
Traductions FR: `xiaolearn_anki/anki_mandarin_myway.tsv` + fallback CFDICT (`xiaolearn_reference/cfdict/cfdict.u8`).

1) Generer le HTML :

```
node build_hsk30_writing_pdf.js --level 1
```

Options utiles :
- `--level 1..9` (mappe vers les groupes 1-2, 3, 4, 5, 6, 7-9)
- `--group 1-2|3|4|5|6|7-9` (prioritaire sur --level)
- `--all` (genere tous les groupes)
- `--rows 7` (lignes par page)
- `--rows-first 6` (lignes sur la premiere page, pour laisser la note)
- `--progress 10` (maximum de cases de progression, adaptee au nombre de traits)
- `--progress-min 1` (minimum de cases de progression)
- `--out index_writing.html` (nom du HTML)
- `--accent #9b2335` (couleur)

2) Generer le PDF :

```
node render_pdf_puppeteer.js --html index_writing.html --out hsk1_3.0_2026_fr_writing.pdf
```
