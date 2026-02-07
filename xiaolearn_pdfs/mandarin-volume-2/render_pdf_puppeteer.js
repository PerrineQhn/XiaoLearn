const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const http = require("http");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

function createStaticServer(rootDir) {
  return http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    const safePath = urlPath === "/" ? "/index.html" : urlPath;
    const filePath = path.join(rootDir, safePath);
    if (!filePath.startsWith(rootDir)) {
      res.statusCode = 403;
      res.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end("Not found");
        return;
      }
      const ext = path.extname(filePath);
      res.setHeader("Content-Type", MIME_TYPES[ext] || "application/octet-stream");
      res.end(data);
    });
  });
}

async function renderOne(browser, baseUrl, htmlFile, outFile) {
  const page = await browser.newPage();
  await page.emulateMediaType("print");
  const url = `${baseUrl}/${htmlFile}`;
  await page.goto(url, { waitUntil: "networkidle0" });

  await page.pdf({
    path: path.resolve(__dirname, outFile),
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" }
  });

  await page.close();
}

async function fileExists(filePath) {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch {
    return false;
  }
}

(async () => {
  const rootDir = __dirname;
  const server = createStaticServer(rootDir);
  const browser = await puppeteer.launch({ headless: "new" });
  try {
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    const { port } = server.address();
    const baseUrl = `http://127.0.0.1:${port}`;

    await renderOne(browser, baseUrl, "index.html", "mandarin_volume2_dictionary.pdf");

    const workbookPath = path.join(rootDir, "workbook.html");
    if (await fileExists(workbookPath)) {
      await renderOne(browser, baseUrl, "workbook.html", "mandarin_volume2_workbook.pdf");
    } else {
      console.warn("workbook.html introuvable -> workbook PDF ignoré.");
    }

    console.log("OK -> PDFs générés.");
  } finally {
    await browser.close();
    server.close();
  }
})();
