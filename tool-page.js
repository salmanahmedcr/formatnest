const API_BASE = "https://api.formatnest.me";

const exchangeGroups = {
  currency: { USD: 1, EUR: 0.92, GBP: 0.78, PKR: 278, AED: 3.67, INR: 83.5, CAD: 1.37, AUD: 1.52, SAR: 3.75, JPY: 157 },
  length: { m: 1, ft: 0.3048, in: 0.0254, cm: 0.01, km: 1000, mi: 1609.344, yd: 0.9144 },
  weight: { kg: 1, lb: 0.45359237, g: 0.001, oz: 0.0283495231, ton: 1000 },
  area: { sqm: 1, sqft: 0.09290304, acre: 4046.8564224, hectare: 10000, sqkm: 1000000 },
  volume: { l: 1, ml: 0.001, gal: 3.785411784, qt: 0.946352946, cubicm: 1000 },
  speed: { kph: 0.277777778, mph: 0.44704, mps: 1, knot: 0.514444444 },
  storage: { B: 1, KB: 1024, MB: 1048576, GB: 1073741824, TB: 1099511627776 },
  power: { W: 1, kW: 1000, hp: 745.699872, btuh: 0.29307107 },
  energy: { J: 1, kJ: 1000, kWh: 3600000, cal: 4.184, kcal: 4184, BTU: 1055.05585 },
  pressure: { Pa: 1, kPa: 1000, bar: 100000, psi: 6894.757293, atm: 101325, torr: 133.322368 },
  crypto: { USD: 1, BTC: 1 / 68000, ETH: 1 / 3500, BNB: 1 / 600, SOL: 1 / 150, XRP: 1 / 0.52, DOGE: 1 / 0.13 }
};

const exchangeRoutes = {
  "currency-converter": ["currency", "USD", "PKR"],
  "meter-to-feet": ["length", "m", "ft"],
  "feet-to-meter": ["length", "ft", "m"],
  "kg-to-lbs": ["weight", "kg", "lb"],
  "area-converter": ["area", "sqm", "sqft"],
  "volume-converter": ["volume", "l", "gal"],
  "speed-converter": ["speed", "kph", "mph"],
  "data-storage-converter": ["storage", "MB", "GB"],
  "fuel-economy-converter": ["fuel", "mpg", "lp100km"],
  "cooking-measurement-converter": ["volume", "l", "ml"],
  "power-converter": ["power", "kW", "hp"],
  "energy-converter": ["energy", "kWh", "J"],
  "pressure-converter": ["pressure", "bar", "psi"],
  "crypto-price-converter": ["crypto", "BTC", "USD"]
};

const fileRoutes = {
  "png-to-jpg": { mode: "image", formats: ["jpg"], accept: "image/png" },
  "jpg-to-png": { mode: "image", formats: ["png"], accept: "image/jpeg" },
  "webp-to-jpg": { mode: "image", formats: ["jpg", "png"], accept: "image/webp" },
  "webp-to-jpg-png": { mode: "image", formats: ["jpg", "png"], accept: "image/webp" },
  "bmp-to-jpg-png": { mode: "image", formats: ["jpg", "png"], accept: "image/bmp" },
  "svg-to-png": { mode: "image", formats: ["png"], accept: "image/svg+xml,.svg" },
  "svg-to-png-jpg-webp": { mode: "image", formats: ["png", "jpg", "webp"], accept: "image/svg+xml,.svg" },
  "image-to-pdf": { mode: "pdf", formats: ["pdf"], accept: "image/png,image/jpeg,image/webp,image/bmp,image/svg+xml,.svg" },
  "images-to-pdf": { mode: "pdf", formats: ["pdf"], accept: "image/png,image/jpeg,image/webp,image/bmp,image/svg+xml,.svg" },
  "image-resize": { mode: "image", formats: ["jpg", "png", "webp"], accept: "image/png,image/jpeg,image/webp,image/bmp" },
  "image-compress": { mode: "image", formats: ["jpg", "webp"], accept: "image/png,image/jpeg,image/webp,image/bmp" },
  "image-editor": { mode: "image", formats: ["png", "jpg", "webp"], accept: "image/png,image/jpeg,image/webp,image/bmp" },
  "image-crop": { mode: "image", formats: ["png", "jpg", "webp"], accept: "image/png,image/jpeg,image/webp,image/bmp" },
  "image-eraser": { mode: "image", formats: ["png"], accept: "image/png,image/jpeg,image/webp,image/bmp" },
  "image-draw-markup": { mode: "image", formats: ["png", "jpg"], accept: "image/png,image/jpeg,image/webp,image/bmp" },
  "image-rotate-flip": { mode: "image", formats: ["png", "jpg"], accept: "image/png,image/jpeg,image/webp,image/bmp" },
  "image-brightness-contrast": { mode: "image", formats: ["png", "jpg", "webp"], accept: "image/png,image/jpeg,image/webp,image/bmp" },
  "json-to-csv": { mode: "data", formats: ["csv"], accept: ".json,application/json" },
  "csv-to-json": { mode: "data", formats: ["json"], accept: ".csv,text/csv" },
  "xml-to-json": { mode: "data", formats: ["json"], accept: ".xml,text/xml,application/xml" },
  "json-to-xml": { mode: "data", formats: ["xml"], accept: ".json,application/json" },
  "txt-to-html": { mode: "text", formats: ["html"], accept: ".txt,text/plain" },
  "html-to-txt": { mode: "text", formats: ["txt"], accept: ".html,text/html" },
  "markdown-to-html": { mode: "text", formats: ["html"], accept: ".md,text/markdown,text/plain" },
  "base64-encode-decode": { mode: "text", formats: ["base64", "txt"], accept: ".txt,text/plain" }
};

const backendRoutes = {
  "word-to-pdf": "word-to-pdf",
  "pdf-to-word": "pdf-to-word",
  "pdf-compress": "pdf-compress",
  "pdf-merge": "pdf-merge",
  "pdf-split": "pdf-split",
  "pdf-to-jpg-png": "pdf-to-png",
  "mp4-to-mp3": "mp4-to-mp3",
  "mov-mkv-avi-to-mp4": "video-to-mp4",
  "video-to-gif": "video-to-gif",
  "mp3-wav-m4a-flac": "audio-to-mp3",
  "files-to-zip": "files-to-zip",
  "zip-rar-7z-extract": "archive-extract",
  "image-ocr": "image-ocr",
  "epub-mobi-pdf-ebooks": "ebook-convert"
};

const backendAccepts = {
  "pdf-to-word": ".pdf,application/pdf",
  "word-to-pdf": ".doc,.docx,.odt,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "pdf-compress": ".pdf,application/pdf",
  "pdf-merge": ".pdf,application/pdf",
  "pdf-split": ".pdf,application/pdf",
  "pdf-to-jpg-png": ".pdf,application/pdf",
  "mp4-to-mp3": ".mp4,video/mp4",
  "mov-mkv-avi-to-mp4": ".mov,.mkv,.avi,.webm,video/*",
  "video-to-gif": ".mp4,.mov,.mkv,.avi,.webm,video/*",
  "mp3-wav-m4a-flac": ".mp3,.wav,.m4a,.flac,audio/*",
  "files-to-zip": "*",
  "zip-rar-7z-extract": ".zip,.rar,.7z,application/zip",
  "image-ocr": "image/png,image/jpeg,image/webp,image/bmp",
  "epub-mobi-pdf-ebooks": ".epub,.mobi,.pdf,application/epub+zip,application/pdf"
};

const backendFormats = {
  "pdf-to-word": ["docx"],
  "word-to-pdf": ["pdf"],
  "pdf-compress": ["pdf"],
  "pdf-merge": ["pdf"],
  "pdf-split": ["zip"],
  "pdf-to-jpg-png": ["zip"],
  "mp4-to-mp3": ["mp3"],
  "mov-mkv-avi-to-mp4": ["mp4"],
  "video-to-gif": ["gif"],
  "mp3-wav-m4a-flac": ["mp3"],
  "files-to-zip": ["zip"],
  "zip-rar-7z-extract": ["zip"],
  "image-ocr": ["txt"],
  "epub-mobi-pdf-ebooks": ["pdf", "epub", "mobi"]
};

const multiFileRoutes = new Set(["pdf-merge", "files-to-zip"]);

const $ = (selector) => document.querySelector(selector);
const panel = $("#exactTool");
const slug = panel?.dataset.tool;
const title = panel?.dataset.title || "FormatNest tool";

function authToken() {
  return localStorage.getItem("formatnest_token");
}

function setStatus(message) {
  const status = $("#toolStatus");
  if (status) status.textContent = message;
}

function setupFileTool(config) {
  const input = $("#toolFile");
  const format = $("#toolFormat");
  const quality = $("#toolQuality");
  const width = $("#toolWidth");
  const download = $("#toolDownload");
  const uploadLabel = input?.closest(".exact-upload");
  if (!input || !format || !download) {
    return setStatus("This tool page is missing its upload controls. Refresh the page in a moment.");
  }
  input.accept = config.accept;
  format.innerHTML = config.formats.map((item) => `<option value="${item}">${item.toUpperCase()}</option>`).join("");
  updateSelectedFile(input, uploadLabel, download);
  input.addEventListener("change", () => updateSelectedFile(input, uploadLabel, download));

  $("#exactToolForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const file = input.files?.[0];
    if (!file) return setStatus("Upload a file first.");
    try {
      setStatus("Converting...");
      let result;
      if (config.mode === "image") result = await convertImage(file, format.value, Number(quality.value) / 100, Number(width.value) || null);
      if (config.mode === "pdf") result = await convertImageToPdf(file, Number(quality.value) / 100, Number(width.value) || null);
      if (config.mode === "text") result = await convertText(file, format.value);
      if (config.mode === "data") result = await convertData(file, format.value);
      download.href = URL.createObjectURL(result.blob);
      download.download = result.name;
      download.classList.remove("disabled");
      setStatus(`Ready: ${result.name}`);
    } catch (error) {
      setStatus(error.message || "Conversion failed.");
    }
  });
}

function setupBackendTool(toolKey) {
  const input = $("#toolFile");
  const format = $("#toolFormat");
  const download = $("#toolDownload");
  const uploadLabel = input?.closest(".exact-upload");
  if (!input || !download) {
    return setStatus("This server-powered tool page is missing its upload controls. Refresh the page in a moment.");
  }
  input.accept = backendAccepts[slug] || "";
  input.multiple = multiFileRoutes.has(slug);
  if (format && backendFormats[slug]) {
    format.innerHTML = backendFormats[slug].map((item) => `<option value="${item}">${item.toUpperCase()}</option>`).join("");
  }
  updateSelectedFile(input, uploadLabel, download);
  input.addEventListener("change", () => updateSelectedFile(input, uploadLabel, download));
  $("#exactToolForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const selected = [...(input.files || [])];
    if (!selected.length) return setStatus(multiFileRoutes.has(slug) ? "Upload one or more files first." : "Upload a file first.");
    if (slug === "pdf-merge" && selected.length < 2) return setStatus("Upload at least two PDF files to merge.");
    try {
      setStatus("Uploading to conversion worker...");
      const data = new FormData();
      data.append("tool", toolKey);
      if (format?.value) data.append("output_format", format.value);
      if (multiFileRoutes.has(slug)) selected.forEach((file) => data.append("files", file));
      else data.append("file", selected[0]);
      const token = authToken();
      const response = await fetch(`${API_BASE}/convert`, {
        method: "POST",
        headers: authHeaders(token),
        body: data
      });
      const job = await response.json();
      if (!response.ok) throw new Error(job.detail || "Backend conversion is not available for this tool yet.");
      const created = job.job || job;
      setStatus(created.status === "complete" || created.status === "done" ? "Finishing download..." : "Processing...");
      const finished = created.status === "complete" || created.status === "done" ? created : await pollJob(created.id || created.job_id);
      download.href = finished.download_url || `${API_BASE}/download/${finished.id || finished.job_id}`;
      download.download = finished.output_name || "formatnest-output";
      download.classList.remove("disabled");
      setStatus("Ready to download.");
    } catch (error) {
      setStatus(error.message || "Server conversion failed.");
    }
  });
}

function updateSelectedFile(input, uploadLabel, download) {
  const files = [...(input?.files || [])];
  const file = files[0];
  const strong = uploadLabel?.querySelector("strong");
  const small = uploadLabel?.querySelector("small");
  if (download) {
    download.classList.add("disabled");
    download.removeAttribute("href");
  }
  if (!file) {
    uploadLabel?.classList.remove("has-file");
    if (strong) strong.textContent = "Upload file";
    if (small) small.textContent = "Drag and drop or choose a file from your device.";
    return;
  }
  uploadLabel?.classList.add("has-file");
  if (strong) strong.textContent = files.length > 1 ? `${files.length} files selected` : file.name;
  if (small) {
    const totalSize = files.reduce((sum, item) => sum + item.size, 0);
    const names = files.slice(0, 3).map((item) => item.name).join(", ");
    small.textContent = `${formatBytes(totalSize)} selected: ${names}${files.length > 3 ? `, +${files.length - 3} more` : ""}. Click Convert when ready.`;
  }
  setStatus(files.length > 1 ? `Selected ${files.length} files.` : `Selected: ${file.name}`);
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  return `${(bytes / 1024 ** index).toFixed(index ? 1 : 0)} ${units[index]}`;
}

async function pollJob(jobId) {
  for (let i = 0; i < 30; i += 1) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const token = authToken();
    const response = await fetch(`${API_BASE}/jobs/${jobId}`, {
      headers: authHeaders(token)
    });
    const payload = await response.json();
    const job = payload.job || payload;
    if (job.status === "done" || job.status === "complete") return job;
    if (job.status === "failed") throw new Error(job.error || "Conversion failed.");
  }
  throw new Error("The conversion is still processing. Try again in a moment.");
}

function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function setupExchangeTool(route) {
  const [groupKey, defaultFrom, defaultTo] = route;
  const group = exchangeGroups[groupKey];
  const from = $("#exchangeFrom");
  const to = $("#exchangeTo");
  const amount = $("#exchangeAmount");
  const result = $("#exchangeResult");
  const options = Object.keys(group).map((unit) => `<option value="${unit}">${unit}</option>`).join("");
  from.innerHTML = options;
  to.innerHTML = options;
  from.value = defaultFrom;
  to.value = defaultTo;
  const update = () => {
    const value = Number(amount.value) || 0;
    let converted;
    if (slug === "celsius-to-fahrenheit") converted = value * 9 / 5 + 32;
    else converted = value * group[from.value] / group[to.value];
    result.textContent = `${formatNumber(value)} ${from.value} = ${formatNumber(converted)} ${to.value}`;
  };
  $("#exactToolForm").addEventListener("submit", (event) => {
    event.preventDefault();
    update();
  });
  [from, to, amount].forEach((el) => el.addEventListener("input", update));
  update();
}

function setupSpecialTool() {
  const amount = $("#exchangeAmount");
  const result = $("#exchangeResult");
  $("#exactToolForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const value = Number(amount.value) || 0;
    if (slug === "celsius-to-fahrenheit") result.textContent = `${formatNumber(value)} C = ${formatNumber(value * 9 / 5 + 32)} F`;
    else if (slug === "age-calculator") result.textContent = `${formatNumber(value)} years = about ${formatNumber(value * 12)} months`;
    else if (slug === "loan-emi-calculator") result.textContent = `Estimated monthly payment: ${formatNumber(value / 12)}`;
    else if (slug === "percentage-calculator") result.textContent = `10% of ${formatNumber(value)} = ${formatNumber(value * 0.1)}`;
    else if (slug === "screen-dpi-calculator") result.textContent = "Use width, height, and screen size to calculate PPI.";
    else if (slug === "time-zone-converter") result.textContent = "Select times and zones to compare local time.";
  });
}

async function convertImage(file, output, quality, maxWidth) {
  const image = await loadImage(file);
  const scale = maxWidth ? Math.min(1, maxWidth / image.width) : 1;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  const mime = output === "jpg" ? "image/jpeg" : `image/${output}`;
  const blob = await canvasToBlob(canvas, mime, quality);
  return { blob, name: rename(file.name, output) };
}

async function convertImageToPdf(file, quality, maxWidth) {
  const image = await loadImage(file);
  const scale = maxWidth ? Math.min(1, maxWidth / image.width) : 1;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(image.width * scale);
  canvas.height = Math.round(image.height * scale);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  const jpg = await canvasToBlob(canvas, "image/jpeg", quality);
  return { blob: await jpegToPdf(jpg, canvas.width, canvas.height), name: rename(file.name, "pdf") };
}

async function convertText(file, output) {
  const text = await file.text();
  if (output === "base64") return makeTextBlob(btoa(unescape(encodeURIComponent(text))), file.name, "txt");
  if (output === "html") return makeTextBlob(`<!doctype html><html><body><pre>${escapeHtml(text)}</pre></body></html>`, file.name, "html", "text/html");
  return makeTextBlob(text, file.name, "txt");
}

async function convertData(file, output) {
  const text = await file.text();
  const lower = file.name.toLowerCase();
  let data = lower.endsWith(".csv") ? csvToJson(text) : lower.endsWith(".xml") ? xmlToJson(text) : JSON.parse(text);
  if (output === "json") return makeTextBlob(JSON.stringify(data, null, 2), file.name, "json", "application/json");
  if (output === "csv") return makeTextBlob(jsonToCsv(Array.isArray(data) ? data : [data]), file.name, "csv", "text/csv");
  return makeTextBlob(jsonToXml(data), file.name, "xml", "application/xml");
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = URL.createObjectURL(file);
  });
}

function canvasToBlob(canvas, mime, quality) {
  return new Promise((resolve) => canvas.toBlob(resolve, mime, quality));
}

async function jpegToPdf(jpegBlob, width, height) {
  const bytes = new Uint8Array(await jpegBlob.arrayBuffer());
  const encoder = new TextEncoder();
  const stream = `q\n${width} 0 0 ${height} 0 0 cm\n/Im0 Do\nQ`;
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`,
    { head: `<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${bytes.length} >>\nstream\n`, data: bytes, tail: "\nendstream" },
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`
  ];
  const parts = [];
  const offsets = [0];
  let cursor = 0;
  const push = (text) => {
    const chunk = encoder.encode(text);
    parts.push(chunk);
    cursor += chunk.byteLength;
  };
  push("%PDF-1.4\n");
  objects.forEach((obj, i) => {
    offsets.push(cursor);
    push(`${i + 1} 0 obj\n`);
    if (typeof obj === "string") push(obj);
    else {
      push(obj.head);
      parts.push(obj.data);
      cursor += obj.data.byteLength;
      push(obj.tail);
    }
    push("\nendobj\n");
  });
  const xref = cursor;
  push(`xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`);
  offsets.slice(1).forEach((offset) => push(`${String(offset).padStart(10, "0")} 00000 n \n`));
  push(`trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);
  return new Blob(parts, { type: "application/pdf" });
}

function csvToJson(csv) {
  const lines = csv.trim().split(/\r?\n/).map((line) => line.split(","));
  const headers = lines.shift() || [];
  return lines.map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] || ""])));
}

function jsonToCsv(rows) {
  const headers = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
  return [headers.join(","), ...rows.map((row) => headers.map((header) => JSON.stringify(row[header] || "")).join(","))].join("\n");
}

function xmlToJson(xml) {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  const walk = (node) => node.children.length ? Object.fromEntries([...node.children].map((child) => [child.nodeName, walk(child)])) : node.textContent.trim();
  return { [doc.documentElement.nodeName]: walk(doc.documentElement) };
}

function jsonToXml(value, root = "root") {
  if (Array.isArray(value)) return value.map((item) => jsonToXml(item, "item")).join("");
  if (value && typeof value === "object") return `<${root}>${Object.entries(value).map(([key, child]) => jsonToXml(child, key.replace(/[^a-z0-9_-]/gi, "_"))).join("")}</${root}>`;
  return `<${root}>${escapeHtml(String(value ?? ""))}</${root}>`;
}

function makeTextBlob(text, originalName, ext, type = "text/plain") {
  return { blob: new Blob([text], { type }), name: rename(originalName, ext) };
}

function rename(filename, extension) {
  return `${filename.replace(/\.[^.]+$/, "")}.${extension}`;
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

function formatNumber(value) {
  return Number(value).toLocaleString(undefined, { maximumFractionDigits: 6 });
}

if (panel) {
  if (fileRoutes[slug]) setupFileTool(fileRoutes[slug]);
  else if (exchangeRoutes[slug]) setupExchangeTool(exchangeRoutes[slug]);
  else if (["celsius-to-fahrenheit", "time-zone-converter", "age-calculator", "loan-emi-calculator", "percentage-calculator", "screen-dpi-calculator"].includes(slug)) setupSpecialTool();
  else if (backendRoutes[slug]) setupBackendTool(backendRoutes[slug]);
  else setStatus(`${title} is ready. Upload a file to begin.`);
}
