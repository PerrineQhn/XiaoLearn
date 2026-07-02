# Mandarin – Volume 2 (template HTML/JSON -> PDF)

## Démarrage (recommandé)
Les navigateurs bloquent souvent `fetch()` en ouvrant `index.html` en `file://`.
Lance un petit serveur local :

```bash
cd mandarin-volume-2
python3 -m http.server 8000
```

Puis ouvre :
http://localhost:8000/index.html

## Export PDF (manuel)
Dans Chrome/Edge :
- Ctrl/Cmd + P
- Destination : Enregistrer en PDF
- Format : A4
- Marges : Aucune
- Options : activer "Arrière-plans" (Background graphics)

## Export PDF (automatique, Node/Puppeteer)
```bash
cd mandarin-volume-2
npm init -y
npm i puppeteer
node render_pdf_puppeteer.js
```

## Personnalisation
- Modifie `content.json` (titres, sections, vocabulaire, notes).
- `index.html` rend le dictionnaire (pages + tableaux).
- `workbook.html` rend les pages d’entraînement (tianzige / cases).
- `styles.css` contrôle le style (couleurs, mise en page, tables).
