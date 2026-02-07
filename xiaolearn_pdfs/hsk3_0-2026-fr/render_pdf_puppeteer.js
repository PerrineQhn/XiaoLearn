const puppeteer = require("puppeteer");
const path = require("path");

async function render() {
  const browser = await puppeteer.launch({ headless: "new" });
  try {
    const page = await browser.newPage();
    const mmToIn = (mm) => mm / 25.4;
    const a4 = { widthMm: 210, heightMm: 297 };
    await page.emulateMediaType("print");
    const args = process.argv.slice(2);
    const getArg = (name) => {
      const index = args.indexOf(`--${name}`);
      if (index === -1) return null;
      return args[index + 1] || null;
    };
    const dpi = Number(getArg("dpi")) || 300;
    const level = Number(getArg("level")) || null;
    const htmlFile = getArg("html") || (level ? `index_hsk${level}.html` : "index.html");
    const outFile = getArg("out") || (level ? `hsk${level}_3.0_2026_fr.pdf` : "hsk1_3.0_2026_fr.pdf");
    const widthPx = Math.round(mmToIn(a4.widthMm) * dpi);
    const heightPx = Math.round(mmToIn(a4.heightMm) * dpi);
    await page.setViewport({ width: widthPx, height: heightPx, deviceScaleFactor: 1 });
    const filePath = "file://" + path.resolve(__dirname, htmlFile);
    await page.goto(filePath, { waitUntil: "networkidle0" });
    await page.pdf({
      path: path.resolve(__dirname, outFile),
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" }
    });
    await page.close();
    console.log(`OK -> PDF généré (${outFile}).`);
  } finally {
    await browser.close();
  }
}

render();
