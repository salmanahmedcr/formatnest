const toolCatalog = [
  ["Currency Converter", "Convert USD, EUR, GBP, PKR, AED, INR, CAD, AUD, and more.", "browser"],
  ["Meter to Feet", "Convert meters into feet instantly.", "browser"],
  ["Feet to Meter", "Convert feet into meters instantly.", "browser"],
  ["KG to LBS", "Convert kilograms into pounds.", "browser"],
  ["Celsius to Fahrenheit", "Convert temperature between Celsius, Fahrenheit, and Kelvin.", "browser"],
  ["Area Converter", "Convert square meters, square feet, acres, and hectares.", "browser"],
  ["Volume Converter", "Convert liters, gallons, milliliters, and cubic meters.", "browser"],
  ["Speed Converter", "Convert km/h, mph, meters per second, and knots.", "browser"],
  ["Data Storage Converter", "Convert KB, MB, GB, TB, and bytes.", "browser"],
  ["Time Zone Converter", "Convert times across major world time zones.", "browser"],
  ["Age Calculator", "Calculate exact age from a birth date.", "browser"],
  ["Loan EMI Calculator", "Estimate monthly loan payments.", "browser"],
  ["Percentage Calculator", "Calculate percentages quickly.", "browser"],
  ["Fuel Economy Converter", "Convert MPG, km/L, and L/100km.", "browser"],
  ["Cooking Measurement Converter", "Convert cups, tablespoons, teaspoons, milliliters, and liters.", "browser"],
  ["Power Converter", "Convert watts, kilowatts, horsepower, and BTU per hour.", "browser"],
  ["Energy Converter", "Convert joules, kilowatt-hours, calories, and BTU.", "browser"],
  ["Pressure Converter", "Convert pascal, bar, psi, atm, and torr.", "browser"],
  ["Screen DPI Calculator", "Calculate screen PPI from resolution and diagonal size.", "browser"],
  ["Crypto Price Converter", "Convert BTC, ETH, BNB, SOL, XRP, DOGE, and USD using fallback prices.", "browser"],
  ["PDF to Word", "Editable DOCX export using a backend LibreOffice/OCR engine.", "server"],
  ["Word to PDF", "Convert DOC/DOCX files to clean PDFs.", "server"],
  ["PDF Compress", "Reduce PDF size with Ghostscript or qpdf.", "server"],
  ["PDF Merge", "Combine multiple PDFs into one document.", "server"],
  ["PDF Split", "Extract pages or ranges from a PDF.", "server"],
  ["PDF to JPG/PNG", "Render pages into image files.", "server"],
  ["Images to PDF", "Create a PDF from JPG, PNG, WEBP, BMP, or SVG files.", "browser"],
  ["PNG to JPG", "Convert image format locally.", "browser"],
  ["JPG to PNG", "Convert image format locally.", "browser"],
  ["WEBP to JPG/PNG", "Convert modern web images locally.", "browser"],
  ["BMP to JPG/PNG", "Convert bitmap images locally.", "browser"],
  ["SVG to PNG/JPG/WEBP", "Rasterize vector graphics locally.", "browser"],
  ["Image Resize", "Resize before download.", "browser"],
  ["Image Compress", "Control JPG/WEBP quality.", "browser"],
  ["Image Editor", "Crop, erase, draw, rotate, flip, resize, and adjust filters locally.", "browser"],
  ["Image Crop", "Crop an image by percentage controls in the browser.", "browser"],
  ["Image Eraser", "Erase unwanted areas manually with a brush.", "browser"],
  ["Image Draw/Markup", "Draw quick highlights or annotations over an image.", "browser"],
  ["Image Rotate/Flip", "Rotate left, rotate right, or flip horizontally.", "browser"],
  ["Image Brightness/Contrast", "Adjust brightness, contrast, and saturation.", "browser"],
  ["MP4 to MP3", "Extract audio with FFmpeg.", "server"],
  ["MOV/MKV/AVI to MP4", "Normalize video formats with FFmpeg.", "server"],
  ["Video to GIF", "Create GIF previews from video clips.", "server"],
  ["MP3/WAV/M4A/FLAC", "Convert audio files with FFmpeg.", "server"],
  ["ZIP/RAR/7Z Extract", "Unpack archives safely on a backend worker.", "server"],
  ["Files to ZIP", "Bundle selected files into a ZIP archive.", "server"],
  ["CSV to JSON", "Convert spreadsheet data locally.", "browser"],
  ["JSON to CSV", "Flatten arrays of objects locally.", "browser"],
  ["XML to JSON", "Parse XML into JSON locally.", "browser"],
  ["JSON to XML", "Convert JSON objects into XML locally.", "browser"],
  ["TXT to HTML", "Wrap plain text as readable HTML.", "browser"],
  ["HTML to TXT", "Strip markup into readable text.", "browser"],
  ["Markdown to HTML", "Convert basic Markdown syntax locally.", "browser"],
  ["Base64 Encode/Decode", "Transform text payloads locally.", "browser"],
  ["Image OCR", "Extract text from screenshots using Tesseract.", "server"],
  ["EPUB/MOBI/PDF ebooks", "Convert ebook formats using Calibre.", "server"]
];

const FREE_LIMIT = 50;
const API_BASE = "https://api.formatnest.me";
const exchangeGroups = {
  currency: {
    label: "Currency",
    note: "Currency uses live rates when available, with a local fallback for demo use.",
    units: {
      USD: { label: "US Dollar", rate: 1 },
      EUR: { label: "Euro", rate: 0.92 },
      GBP: { label: "British Pound", rate: 0.78 },
      PKR: { label: "Pakistani Rupee", rate: 278 },
      AED: { label: "UAE Dirham", rate: 3.67 },
      INR: { label: "Indian Rupee", rate: 83.5 },
      CAD: { label: "Canadian Dollar", rate: 1.37 },
      AUD: { label: "Australian Dollar", rate: 1.52 },
      SAR: { label: "Saudi Riyal", rate: 3.75 },
      JPY: { label: "Japanese Yen", rate: 157 }
    }
  },
  length: {
    label: "Length",
    note: "Length conversions work fully offline.",
    units: {
      m: { label: "Meter", factor: 1 },
      ft: { label: "Foot", factor: 0.3048 },
      in: { label: "Inch", factor: 0.0254 },
      cm: { label: "Centimeter", factor: 0.01 },
      km: { label: "Kilometer", factor: 1000 },
      mi: { label: "Mile", factor: 1609.344 },
      yd: { label: "Yard", factor: 0.9144 }
    }
  },
  weight: {
    label: "Weight",
    note: "Weight conversions work fully offline.",
    units: {
      kg: { label: "Kilogram", factor: 1 },
      lb: { label: "Pound", factor: 0.45359237 },
      g: { label: "Gram", factor: 0.001 },
      oz: { label: "Ounce", factor: 0.0283495231 },
      ton: { label: "Metric ton", factor: 1000 }
    }
  },
  temperature: {
    label: "Temperature",
    note: "Temperature conversions work fully offline.",
    units: {
      c: { label: "Celsius" },
      f: { label: "Fahrenheit" },
      k: { label: "Kelvin" }
    }
  },
  area: {
    label: "Area",
    note: "Area conversions work fully offline.",
    units: {
      sqm: { label: "Square meter", factor: 1 },
      sqft: { label: "Square foot", factor: 0.09290304 },
      acre: { label: "Acre", factor: 4046.8564224 },
      hectare: { label: "Hectare", factor: 10000 },
      sqkm: { label: "Square kilometer", factor: 1000000 }
    }
  },
  volume: {
    label: "Volume",
    note: "Volume conversions work fully offline.",
    units: {
      l: { label: "Liter", factor: 1 },
      ml: { label: "Milliliter", factor: 0.001 },
      gal: { label: "US gallon", factor: 3.785411784 },
      qt: { label: "US quart", factor: 0.946352946 },
      cubicm: { label: "Cubic meter", factor: 1000 }
    }
  },
  speed: {
    label: "Speed",
    note: "Speed conversions work fully offline.",
    units: {
      kph: { label: "Kilometer/hour", factor: 0.277777778 },
      mph: { label: "Mile/hour", factor: 0.44704 },
      mps: { label: "Meter/second", factor: 1 },
      knot: { label: "Knot", factor: 0.514444444 }
    }
  },
  storage: {
    label: "Data storage",
    note: "Storage conversions use binary units.",
    units: {
      B: { label: "Byte", factor: 1 },
      KB: { label: "Kilobyte", factor: 1024 },
      MB: { label: "Megabyte", factor: 1024 ** 2 },
      GB: { label: "Gigabyte", factor: 1024 ** 3 },
      TB: { label: "Terabyte", factor: 1024 ** 4 }
    }
  },
  fuel: {
    label: "Fuel economy",
    note: "Fuel economy conversions work fully offline.",
    units: {
      mpg: { label: "Miles/gallon", toLp100km: (v) => 235.214583 / v, fromLp100km: (v) => 235.214583 / v },
      kml: { label: "Kilometers/liter", toLp100km: (v) => 100 / v, fromLp100km: (v) => 100 / v },
      lp100km: { label: "Liters/100km", toLp100km: (v) => v, fromLp100km: (v) => v }
    }
  },
  cooking: {
    label: "Cooking",
    note: "Cooking volume conversions work fully offline.",
    units: {
      cup: { label: "US cup", factor: 236.5882365 },
      tbsp: { label: "Tablespoon", factor: 14.7867648 },
      tsp: { label: "Teaspoon", factor: 4.92892159 },
      floz: { label: "Fluid ounce", factor: 29.5735296 },
      ml: { label: "Milliliter", factor: 1 },
      l: { label: "Liter", factor: 1000 }
    }
  },
  power: {
    label: "Power",
    note: "Power conversions work fully offline.",
    units: {
      W: { label: "Watt", factor: 1 },
      kW: { label: "Kilowatt", factor: 1000 },
      hp: { label: "Horsepower", factor: 745.699872 },
      btuh: { label: "BTU/hour", factor: 0.29307107 }
    }
  },
  energy: {
    label: "Energy",
    note: "Energy conversions work fully offline.",
    units: {
      J: { label: "Joule", factor: 1 },
      kJ: { label: "Kilojoule", factor: 1000 },
      kWh: { label: "Kilowatt-hour", factor: 3600000 },
      cal: { label: "Calorie", factor: 4.184 },
      kcal: { label: "Kilocalorie", factor: 4184 },
      BTU: { label: "BTU", factor: 1055.05585 }
    }
  },
  pressure: {
    label: "Pressure",
    note: "Pressure conversions work fully offline.",
    units: {
      Pa: { label: "Pascal", factor: 1 },
      kPa: { label: "Kilopascal", factor: 1000 },
      bar: { label: "Bar", factor: 100000 },
      psi: { label: "PSI", factor: 6894.757293 },
      atm: { label: "Atmosphere", factor: 101325 },
      torr: { label: "Torr", factor: 133.322368 }
    }
  },
  crypto: {
    label: "Crypto",
    note: "Using fallback demo crypto prices. Connect a market API for production-grade rates.",
    units: {
      USD: { label: "US Dollar", rate: 1 },
      BTC: { label: "Bitcoin", rate: 1 / 68000 },
      ETH: { label: "Ethereum", rate: 1 / 3500 },
      BNB: { label: "BNB", rate: 1 / 600 },
      SOL: { label: "Solana", rate: 1 / 150 },
      XRP: { label: "XRP", rate: 1 / 0.52 },
      DOGE: { label: "Dogecoin", rate: 1 / 0.13 }
    }
  }
};
const toolRoutes = {
  "currency-converter": { exchange: "currency", from: "USD", to: "PKR", title: "Currency Converter" },
  "meter-to-feet": { exchange: "length", from: "m", to: "ft", title: "Meter to Feet" },
  "feet-to-meter": { exchange: "length", from: "ft", to: "m", title: "Feet to Meter" },
  "kg-to-lbs": { exchange: "weight", from: "kg", to: "lb", title: "KG to LBS" },
  "celsius-to-fahrenheit": { exchange: "temperature", from: "c", to: "f", title: "Celsius to Fahrenheit" },
  "area-converter": { exchange: "area", from: "sqm", to: "sqft", title: "Area Converter" },
  "volume-converter": { exchange: "volume", from: "l", to: "gal", title: "Volume Converter" },
  "speed-converter": { exchange: "speed", from: "kph", to: "mph", title: "Speed Converter" },
  "data-storage-converter": { exchange: "storage", from: "MB", to: "GB", title: "Data Storage Converter" },
  "time-zone-converter": { special: "timezone", title: "Time Zone Converter" },
  "age-calculator": { special: "age", title: "Age Calculator" },
  "loan-emi-calculator": { special: "loan", title: "Loan EMI Calculator" },
  "percentage-calculator": { special: "percent", title: "Percentage Calculator" },
  "fuel-economy-converter": { exchange: "fuel", from: "mpg", to: "lp100km", title: "Fuel Economy Converter" },
  "cooking-measurement-converter": { exchange: "cooking", from: "cup", to: "ml", title: "Cooking Measurement Converter" },
  "power-converter": { exchange: "power", from: "kW", to: "hp", title: "Power Converter" },
  "energy-converter": { exchange: "energy", from: "kWh", to: "J", title: "Energy Converter" },
  "pressure-converter": { exchange: "pressure", from: "bar", to: "psi", title: "Pressure Converter" },
  "screen-dpi-calculator": { special: "dpi", title: "Screen DPI Calculator" },
  "crypto-price-converter": { exchange: "crypto", from: "BTC", to: "USD", title: "Crypto Price Converter" },
  "png-to-jpg": { mode: "image", format: "jpg", title: "PNG to JPG" },
  "jpg-to-png": { mode: "image", format: "png", title: "JPG to PNG" },
  "webp-to-jpg": { mode: "image", format: "jpg", title: "WEBP to JPG" },
  "bmp-to-png": { mode: "image", format: "png", title: "BMP to PNG" },
  "svg-to-png": { mode: "svg", format: "png", title: "SVG to PNG" },
  "image-to-pdf": { mode: "pdf", format: "pdf", title: "Image to PDF" },
  "image-editor": { mode: "edit", format: "png", title: "Image Editor" },
  "image-crop": { mode: "edit", format: "png", title: "Image Crop" },
  "image-eraser": { mode: "edit", format: "png", title: "Image Eraser" },
  "json-to-csv": { mode: "data", format: "csv", title: "JSON to CSV" },
  "csv-to-json": { mode: "data", format: "json", title: "CSV to JSON" },
  "xml-to-json": { mode: "data", format: "json", title: "XML to JSON" },
  "json-to-xml": { mode: "data", format: "xml", title: "JSON to XML" },
  "txt-to-html": { mode: "text", format: "html", title: "TXT to HTML" },
  "html-to-txt": { mode: "text", format: "txt", title: "HTML to TXT" },
  "markdown-to-html": { mode: "text", format: "html", title: "Markdown to HTML" },
  "base64-encode": { mode: "text", format: "base64", title: "Base64 Encode" },
  "base64-encode-decode": { mode: "text", format: "base64", title: "Base64 Encode" }
};
const seoPageSlugs = new Set(toolCatalog.map(([name]) => slugify(name)).concat([
  "image-to-pdf",
  "png-to-jpg",
  "jpg-to-png",
  "webp-to-jpg",
  "svg-to-png",
  "image-to-pdf",
  "image-editor",
  "image-crop",
  "image-eraser",
  "json-to-csv",
  "csv-to-json",
  "xml-to-json",
  "txt-to-html",
  "markdown-to-html"
]));

const modes = {
  image: {
    accept: "image/png,image/jpeg,image/webp,image/bmp",
    hint: "PNG, JPG, WEBP, BMP",
    formats: ["jpg", "png", "webp"],
    quality: true,
    width: true
  },
  edit: {
    accept: "image/png,image/jpeg,image/webp,image/bmp",
    hint: "PNG, JPG, WEBP, BMP",
    formats: ["png", "jpg", "webp"],
    quality: true,
    width: false
  },
  svg: {
    accept: "image/svg+xml,.svg",
    hint: "SVG",
    formats: ["png", "jpg", "webp"],
    quality: true,
    width: true
  },
  pdf: {
    accept: "image/png,image/jpeg,image/webp,image/bmp,image/svg+xml,.svg",
    hint: "One image file: PNG, JPG, WEBP, BMP, SVG",
    formats: ["pdf"],
    quality: true,
    width: true
  },
  text: {
    accept: ".txt,.md,.html,text/plain,text/markdown,text/html",
    hint: "TXT, Markdown, HTML",
    formats: ["txt", "html", "md", "base64"],
    quality: false,
    width: false
  },
  data: {
    accept: ".json,.csv,.xml,application/json,text/csv,text/xml,application/xml",
    hint: "JSON, CSV, XML",
    formats: ["json", "csv", "xml"],
    quality: false,
    width: false
  }
};

let currentMode = "image";
let currentFile = null;
let outputUrl = null;
let editorCanvas = null;
let editorCtx = null;
let editorOriginal = null;
let editorTool = "move";
let drawing = false;
let lastPoint = null;

const $ = (selector) => document.querySelector(selector);
const toolGrid = $("#toolGrid");
const toolSearch = $("#toolSearch");
const fileInput = $("#fileInput");
const dropzone = $("#dropzone");
const outputFormat = $("#outputFormat");
const quality = $("#quality");
const maxWidth = $("#maxWidth");
const qualityWrap = $("#qualityWrap");
const widthWrap = $("#widthWrap");
const preview = $("#preview");
const inputMeta = $("#inputMeta");
const outputMeta = $("#outputMeta");
const statusText = $("#statusText");
const downloadLink = $("#downloadLink");
const acceptHint = $("#acceptHint");
const editorControls = $("#editorControls");
const brushSize = $("#brushSize");
const drawColor = $("#drawColor");
const brightness = $("#brightness");
const contrast = $("#contrast");
const saturation = $("#saturation");
const cropX = $("#cropX");
const cropY = $("#cropY");
const cropW = $("#cropW");
const cropH = $("#cropH");
const convertBtn = $("#convertBtn");
const quotaText = $("#quotaText");
const authModal = $("#authModal");
const authEmail = $("#authEmail");
const authState = $("#authState");
const openAuth = $("#openAuth");
const openSignup = $("#openSignup");
const loginMode = $("#loginMode");
const signupMode = $("#signupMode");
const authTitle = $("#authTitle");
const nameWrap = $("#nameWrap");
const authName = $("#authName");
const authForm = $("#authForm");
const upgradeBtn = $("#upgradeBtn");
const freePlanBtn = $("#freePlanBtn");
const exchangeType = $("#exchangeType");
const exchangeFrom = $("#exchangeFrom");
const exchangeTo = $("#exchangeTo");
const exchangeAmount = $("#exchangeAmount");
const exchangeResult = $("#exchangeResult");
const exchangeNote = $("#exchangeNote");
const timeZones = ["UTC", "Asia/Karachi", "Asia/Dubai", "Asia/Kolkata", "Europe/London", "Europe/Paris", "America/New_York", "America/Los_Angeles", "Asia/Tokyo", "Australia/Sydney"];

function renderCatalog(filter = "") {
  const normalized = filter.trim().toLowerCase();
  toolGrid.innerHTML = "";
  toolCatalog
    .filter(([name, desc]) => `${name} ${desc}`.toLowerCase().includes(normalized))
    .forEach(([name, desc, type]) => {
      const card = document.createElement("a");
      card.className = "tool-card";
      const slug = slugify(name);
      card.href = seoPageSlugs.has(slug) ? `./tools/${slug}.html` : `./index.html#execution`;
      card.innerHTML = `<h3>${name}</h3><p>${desc}</p><span class="tag ${type === "server" ? "server" : ""}">${type === "server" ? "Backend engine" : "Works now"}</span>`;
      toolGrid.appendChild(card);
    });
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function setMode(mode) {
  currentMode = mode;
  const config = modes[mode];
  document.querySelectorAll(".tool-option").forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });
  fileInput.accept = config.accept;
  acceptHint.textContent = config.hint;
  outputFormat.innerHTML = config.formats.map((format) => `<option value="${format}">${format.toUpperCase()}</option>`).join("");
  qualityWrap.style.display = config.quality ? "grid" : "none";
  widthWrap.style.display = config.width ? "grid" : "none";
  editorControls.hidden = mode !== "edit";
  convertBtn.textContent = mode === "edit" ? "Export edited image" : "Convert";
  resetResult();
  if (currentFile) {
    updatePreview(currentFile);
  }
}

function selectTool(slug) {
  const route = toolRoutes[slug];
  if (!route) return;
  if (route.exchange) {
    selectExchange(route.exchange, route.from, route.to);
    document.title = `${route.title} Online - FormatNest`;
    document.querySelector("#exchangers").scrollIntoView({ behavior: "smooth" });
    return;
  }
  if (route.special) {
    selectSpecial(route.special);
    document.title = `${route.title} Online - FormatNest`;
    document.querySelector("#exchangers").scrollIntoView({ behavior: "smooth" });
    return;
  }
  setMode(route.mode);
  if (route.format) outputFormat.value = route.format;
  document.title = `${route.title} Online - FormatNest`;
  statusText.textContent = `${route.title} is ready`;
}

function setupExchangers() {
  exchangeType.innerHTML = Object.entries(exchangeGroups)
    .map(([key, group]) => `<option value="${key}">${group.label}</option>`)
    .join("");
  selectExchange("length", "m", "ft");
  loadLiveCurrencyRates();
}

function selectExchange(type, from, to) {
  exchangeType.value = type;
  const group = exchangeGroups[type];
  const options = Object.entries(group.units)
    .map(([key, unit]) => `<option value="${key}">${unit.label}</option>`)
    .join("");
  exchangeFrom.innerHTML = options;
  exchangeTo.innerHTML = options;
  exchangeFrom.value = from || Object.keys(group.units)[0];
  exchangeTo.value = to || Object.keys(group.units)[1] || Object.keys(group.units)[0];
  updateExchange();
}

function convertExchangeValue(amount, type, from, to) {
  if (type === "temperature") return convertTemperature(amount, from, to);
  const group = exchangeGroups[type];
  if (type === "fuel") {
    const lPer100Km = group.units[from].toLp100km(amount);
    return group.units[to].fromLp100km(lPer100Km);
  }
  if (type === "currency") {
    const usdValue = amount / group.units[from].rate;
    return usdValue * group.units[to].rate;
  }
  if (type === "crypto") {
    const usdValue = amount / group.units[from].rate;
    return usdValue * group.units[to].rate;
  }
  return amount * group.units[from].factor / group.units[to].factor;
}

function convertTemperature(amount, from, to) {
  let celsius = amount;
  if (from === "f") celsius = (amount - 32) * 5 / 9;
  if (from === "k") celsius = amount - 273.15;
  if (to === "f") return celsius * 9 / 5 + 32;
  if (to === "k") return celsius + 273.15;
  return celsius;
}

function updateExchange() {
  const type = exchangeType.value;
  const from = exchangeFrom.value;
  const to = exchangeTo.value;
  const amount = Number(exchangeAmount.value) || 0;
  const result = convertExchangeValue(amount, type, from, to);
  const fromLabel = exchangeGroups[type].units[from].label;
  const toLabel = exchangeGroups[type].units[to].label;
  exchangeResult.textContent = `${formatNumber(amount)} ${fromLabel} = ${formatNumber(result)} ${toLabel}`;
  exchangeNote.textContent = exchangeGroups[type].note;
}

function formatNumber(value) {
  return Number(value).toLocaleString(undefined, { maximumFractionDigits: 6 });
}

async function loadLiveCurrencyRates() {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD", { cache: "no-store" });
    if (!response.ok) throw new Error("Currency API unavailable");
    const data = await response.json();
    Object.keys(exchangeGroups.currency.units).forEach((code) => {
      if (data.rates?.[code]) exchangeGroups.currency.units[code].rate = data.rates[code];
    });
    if (exchangeType.value === "currency") {
      exchangeGroups.currency.note = `Live currency rates loaded for ${data.time_last_update_utc || "today"}.`;
      updateExchange();
    }
  } catch {
    exchangeGroups.currency.note = "Using fallback demo rates. Connect a currency API key for production-grade exchange rates.";
    if (exchangeType.value === "currency") updateExchange();
  }
}

function setupSpecialCalculators() {
  const zoneOptions = timeZones.map((zone) => `<option value="${zone}">${zone}</option>`).join("");
  $("#tzFrom").innerHTML = zoneOptions;
  $("#tzTo").innerHTML = zoneOptions;
  $("#tzFrom").value = "Asia/Karachi";
  $("#tzTo").value = "UTC";
  $("#tzTime").value = new Date().toISOString().slice(0, 16);
  document.querySelectorAll("[data-special]").forEach((button) => {
    button.addEventListener("click", () => selectSpecial(button.dataset.special));
  });
  ["#tzTime", "#tzFrom", "#tzTo"].forEach((selector) => $(selector).addEventListener("input", updateTimeZone));
  $("#birthDate").addEventListener("input", updateAge);
  ["#loanAmount", "#loanRate", "#loanMonths"].forEach((selector) => $(selector).addEventListener("input", updateLoan));
  ["#percentValue", "#percentTotal"].forEach((selector) => $(selector).addEventListener("input", updatePercent));
  ["#screenWidth", "#screenHeight", "#screenDiagonal"].forEach((selector) => $(selector).addEventListener("input", updateDpi));
  updateTimeZone();
  updateLoan();
  updatePercent();
  updateDpi();
}

function selectSpecial(key) {
  document.querySelectorAll("[data-special]").forEach((button) => button.classList.toggle("active", button.dataset.special === key));
  document.querySelectorAll("[data-special-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.specialPanel === key));
}

function updateTimeZone() {
  const input = $("#tzTime").value;
  if (!input) {
    $("#tzResult").textContent = "Choose a time to convert.";
    return;
  }
  const date = new Date(input);
  $("#tzResult").textContent = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: $("#tzTo").value
  }).format(date);
}

function updateAge() {
  const value = $("#birthDate").value;
  if (!value) {
    $("#ageResult").textContent = "Enter a birth date.";
    return;
  }
  const birth = new Date(`${value}T00:00:00`);
  const today = new Date();
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  $("#ageResult").textContent = `${years} years, ${months} months, ${days} days`;
}

function updateLoan() {
  const principal = Number($("#loanAmount").value) || 0;
  const monthlyRate = (Number($("#loanRate").value) || 0) / 100 / 12;
  const months = Number($("#loanMonths").value) || 1;
  const payment = monthlyRate ? principal * monthlyRate * (1 + monthlyRate) ** months / ((1 + monthlyRate) ** months - 1) : principal / months;
  $("#loanResult").textContent = `$${formatNumber(payment)} per month`;
}

function updatePercent() {
  const value = Number($("#percentValue").value) || 0;
  const total = Number($("#percentTotal").value) || 0;
  const result = total ? value / total * 100 : 0;
  $("#percentResult").textContent = `${formatNumber(value)} is ${formatNumber(result)}% of ${formatNumber(total)}`;
}

function updateDpi() {
  const width = Number($("#screenWidth").value) || 0;
  const height = Number($("#screenHeight").value) || 0;
  const diagonal = Number($("#screenDiagonal").value) || 1;
  const ppi = Math.sqrt(width ** 2 + height ** 2) / diagonal;
  $("#dpiResult").textContent = `${formatNumber(ppi)} PPI`;
}

function resetResult() {
  if (outputUrl) URL.revokeObjectURL(outputUrl);
  outputUrl = null;
  downloadLink.removeAttribute("href");
  downloadLink.classList.add("disabled");
  outputMeta.textContent = "Waiting";
  statusText.textContent = "Ready";
}

function formatBytes(bytes) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index ? 1 : 0)} ${units[index]}`;
}

function setFile(file) {
  currentFile = file;
  inputMeta.textContent = `${file.name} · ${formatBytes(file.size)}`;
  resetResult();
  updatePreview(file);
}

async function updatePreview(file) {
  preview.classList.remove("empty");
  preview.classList.remove("editor-stage");
  if (currentMode === "edit") {
    await loadEditor(file);
    return;
  }
  if (currentMode === "image" || currentMode === "svg" || currentMode === "pdf") {
    const url = URL.createObjectURL(file);
    preview.innerHTML = `<img src="${url}" alt="Selected file preview" />`;
    return;
  }
  const text = await file.text();
  preview.innerHTML = `<pre>${escapeHtml(text.slice(0, 7000))}${text.length > 7000 ? "\n\nPreview truncated." : ""}</pre>`;
}

async function loadEditor(file) {
  const image = await loadImage(file);
  const maxCanvasSide = 1800;
  const scale = Math.min(1, maxCanvasSide / Math.max(image.width, image.height));
  editorCanvas = document.createElement("canvas");
  editorCanvas.width = Math.round(image.width * scale);
  editorCanvas.height = Math.round(image.height * scale);
  editorCtx = editorCanvas.getContext("2d", { willReadFrequently: true });
  editorCtx.drawImage(image, 0, 0, editorCanvas.width, editorCanvas.height);
  editorOriginal = editorCtx.getImageData(0, 0, editorCanvas.width, editorCanvas.height);
  preview.innerHTML = "";
  preview.classList.add("editor-stage");
  preview.appendChild(editorCanvas);
  resetEditorInputs();
  bindEditorCanvas();
  statusText.textContent = "Editor ready";
}

function resetEditorInputs() {
  brightness.value = 100;
  contrast.value = 100;
  saturation.value = 100;
  cropX.value = 0;
  cropY.value = 0;
  cropW.value = 100;
  cropH.value = 100;
  setEditorTool("move");
}

function bindEditorCanvas() {
  editorCanvas.onpointerdown = beginEditStroke;
  editorCanvas.onpointermove = continueEditStroke;
  window.onpointerup = endEditStroke;
}

function canvasPoint(event) {
  const rect = editorCanvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * (editorCanvas.width / rect.width),
    y: (event.clientY - rect.top) * (editorCanvas.height / rect.height)
  };
}

function beginEditStroke(event) {
  if (!["erase", "draw"].includes(editorTool)) return;
  event.preventDefault();
  drawing = true;
  lastPoint = canvasPoint(event);
  paintEditorStroke(lastPoint, lastPoint);
}

function continueEditStroke(event) {
  if (!drawing || !["erase", "draw"].includes(editorTool)) return;
  event.preventDefault();
  const point = canvasPoint(event);
  paintEditorStroke(lastPoint, point);
  lastPoint = point;
}

function endEditStroke() {
  drawing = false;
  lastPoint = null;
}

function paintEditorStroke(from, to) {
  editorCtx.save();
  editorCtx.lineCap = "round";
  editorCtx.lineJoin = "round";
  editorCtx.lineWidth = Number(brushSize.value);
  if (editorTool === "erase") {
    editorCtx.globalCompositeOperation = "destination-out";
  } else {
    editorCtx.globalCompositeOperation = "source-over";
    editorCtx.strokeStyle = drawColor.value;
  }
  editorCtx.beginPath();
  editorCtx.moveTo(from.x, from.y);
  editorCtx.lineTo(to.x, to.y);
  editorCtx.stroke();
  editorCtx.restore();
  statusText.textContent = editorTool === "erase" ? "Erased area" : "Drawn on image";
}

function setEditorTool(tool) {
  editorTool = tool;
  document.querySelectorAll("[data-editor-tool]").forEach((button) => {
    button.classList.toggle("active", button.dataset.editorTool === tool);
  });
  if (editorCanvas) {
    editorCanvas.style.cursor = tool === "move" ? "default" : "crosshair";
  }
}

function rotateEditor(direction) {
  if (!editorCanvas) return;
  const oldCanvas = editorCanvas;
  const rotated = document.createElement("canvas");
  rotated.width = oldCanvas.height;
  rotated.height = oldCanvas.width;
  const ctx = rotated.getContext("2d");
  ctx.translate(rotated.width / 2, rotated.height / 2);
  ctx.rotate(direction * Math.PI / 2);
  ctx.drawImage(oldCanvas, -oldCanvas.width / 2, -oldCanvas.height / 2);
  replaceEditorCanvas(rotated);
  statusText.textContent = direction < 0 ? "Rotated left" : "Rotated right";
}

function flipEditor() {
  if (!editorCanvas) return;
  const flipped = document.createElement("canvas");
  flipped.width = editorCanvas.width;
  flipped.height = editorCanvas.height;
  const ctx = flipped.getContext("2d");
  ctx.translate(flipped.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(editorCanvas, 0, 0);
  replaceEditorCanvas(flipped);
  statusText.textContent = "Flipped image";
}

function replaceEditorCanvas(nextCanvas) {
  editorCanvas.replaceWith(nextCanvas);
  editorCanvas = nextCanvas;
  editorCtx = editorCanvas.getContext("2d", { willReadFrequently: true });
  editorOriginal = editorCtx.getImageData(0, 0, editorCanvas.width, editorCanvas.height);
  bindEditorCanvas();
}

function resetEditor() {
  if (!currentFile) return;
  loadEditor(currentFile);
}

function applyCropToEditor() {
  if (!editorCanvas) return;
  const x = clamp(Number(cropX.value), 0, 95) / 100 * editorCanvas.width;
  const y = clamp(Number(cropY.value), 0, 95) / 100 * editorCanvas.height;
  const width = clamp(Number(cropW.value), 5, 100) / 100 * editorCanvas.width;
  const height = clamp(Number(cropH.value), 5, 100) / 100 * editorCanvas.height;
  const safeWidth = Math.min(width, editorCanvas.width - x);
  const safeHeight = Math.min(height, editorCanvas.height - y);
  const cropped = document.createElement("canvas");
  cropped.width = Math.max(1, Math.round(safeWidth));
  cropped.height = Math.max(1, Math.round(safeHeight));
  cropped.getContext("2d").drawImage(editorCanvas, x, y, safeWidth, safeHeight, 0, 0, cropped.width, cropped.height);
  replaceEditorCanvas(cropped);
  cropX.value = 0;
  cropY.value = 0;
  cropW.value = 100;
  cropH.value = 100;
  statusText.textContent = "Cropped image";
}

function applyFiltersToEditor() {
  if (!editorCanvas) return;
  const filtered = document.createElement("canvas");
  filtered.width = editorCanvas.width;
  filtered.height = editorCanvas.height;
  const ctx = filtered.getContext("2d");
  ctx.filter = `brightness(${brightness.value}%) contrast(${contrast.value}%) saturate(${saturation.value}%)`;
  ctx.drawImage(editorCanvas, 0, 0);
  replaceEditorCanvas(filtered);
  brightness.value = 100;
  contrast.value = 100;
  saturation.value = 100;
  statusText.textContent = "Applied filters";
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

async function convertImageLike(toPdf = false) {
  const image = await loadImage(currentFile);
  const max = Number(maxWidth.value) || image.width;
  const scale = Math.min(1, max / image.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(image.width * scale);
  canvas.height = Math.round(image.height * scale);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  if (toPdf) {
    const jpeg = await canvasToBlob(canvas, "image/jpeg", Number(quality.value) / 100);
    const blob = await imageJpegToPdf(jpeg, canvas.width, canvas.height);
    return { blob, name: rename(currentFile.name, "pdf") };
  }

  const format = outputFormat.value;
  const mime = format === "jpg" ? "image/jpeg" : `image/${format}`;
  const blob = await canvasToBlob(canvas, mime, Number(quality.value) / 100);
  return { blob, name: rename(currentFile.name, format) };
}

async function exportEditedImage() {
  if (!editorCanvas) throw new Error("Choose an image to edit first.");
  const format = outputFormat.value;
  const mime = format === "jpg" ? "image/jpeg" : `image/${format}`;
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = editorCanvas.width;
  exportCanvas.height = editorCanvas.height;
  const ctx = exportCanvas.getContext("2d");
  if (format === "jpg") {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
  }
  ctx.drawImage(editorCanvas, 0, 0);
  const blob = await canvasToBlob(exportCanvas, mime, Number(quality.value) / 100);
  return { blob, name: rename(currentFile.name, format) };
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = URL.createObjectURL(file);
  });
}

function canvasToBlob(canvas, mime, qualityValue) {
  return new Promise((resolve) => canvas.toBlob(resolve, mime, qualityValue));
}

async function imageJpegToPdf(jpegBlob, width, height) {
  const bytes = new Uint8Array(await jpegBlob.arrayBuffer());
  const encoder = new TextEncoder();
  const objects = [];
  const add = (body) => objects.push(body);
  add("<< /Type /Catalog /Pages 2 0 R >>");
  add("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
  add(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`);
  add({
    head: `<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${bytes.length} >>\nstream\n`,
    data: bytes,
    tail: "\nendstream"
  });
  const stream = `q\n${width} 0 0 ${height} 0 0 cm\n/Im0 Do\nQ`;
  add(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
  const parts = [];
  let cursor = 0;
  const pushText = (text) => {
    const chunk = encoder.encode(text);
    parts.push(chunk);
    cursor += chunk.byteLength;
  };
  pushText("%PDF-1.4\n");
  const offsets = [0];
  objects.forEach((body, index) => {
    offsets.push(cursor);
    pushText(`${index + 1} 0 obj\n`);
    if (typeof body === "string") {
      pushText(body);
    } else {
      pushText(body.head);
      parts.push(body.data);
      cursor += body.data.byteLength;
      pushText(body.tail);
    }
    pushText("\nendobj\n");
  });
  const xref = cursor;
  pushText(`xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`);
  offsets.slice(1).forEach((offset) => {
    pushText(`${String(offset).padStart(10, "0")} 00000 n \n`);
  });
  pushText(`trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);
  return new Blob(parts, { type: "application/pdf" });
}

async function convertText() {
  const text = await currentFile.text();
  const format = outputFormat.value;
  if (format === "base64") {
    return makeTextBlob(btoa(unescape(encodeURIComponent(text))), "txt");
  }
  if (format === "html") {
    const source = currentFile.name.toLowerCase().endsWith(".md") ? markdownToHtml(text) : `<pre>${escapeHtml(text)}</pre>`;
    return makeTextBlob(`<!doctype html><html><body>${source}</body></html>`, "html", "text/html");
  }
  if (format === "md") {
    return makeTextBlob(htmlToText(text), "md", "text/markdown");
  }
  return makeTextBlob(htmlToText(text), "txt");
}

async function convertData() {
  const text = await currentFile.text();
  const target = outputFormat.value;
  const name = currentFile.name.toLowerCase();
  let data;
  if (name.endsWith(".csv")) data = csvToJson(text);
  else if (name.endsWith(".xml")) data = xmlToJson(text);
  else data = JSON.parse(text);

  if (target === "json") {
    return makeTextBlob(JSON.stringify(data, null, 2), "json", "application/json");
  }
  if (target === "csv") {
    const rows = Array.isArray(data) ? data : [data];
    return makeTextBlob(jsonToCsv(rows), "csv", "text/csv");
  }
  return makeTextBlob(jsonToXml(data), "xml", "application/xml");
}

function makeTextBlob(text, ext, type = "text/plain") {
  return { blob: new Blob([text], { type }), name: rename(currentFile.name, ext) };
}

function markdownToHtml(markdown) {
  return escapeHtml(markdown)
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/^(.+)$/gm, "<p>$1</p>");
}

function htmlToText(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || html;
}

function csvToJson(csv) {
  const rows = parseCsv(csv);
  const headers = rows.shift() || [];
  return rows.filter((row) => row.some(Boolean)).map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] || ""])));
}

function parseCsv(csv) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < csv.length; index += 1) {
    const char = csv[index];
    const next = csv[index + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  row.push(cell);
  rows.push(row);
  return rows;
}

function jsonToCsv(rows) {
  const headers = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
  const escape = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  return [headers.map(escape).join(","), ...rows.map((row) => headers.map((header) => escape(row[header])).join(","))].join("\n");
}

function xmlToJson(xml) {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  if (doc.querySelector("parsererror")) throw new Error("Invalid XML file.");
  const walk = (node) => {
    const children = Array.from(node.children);
    if (!children.length) return node.textContent.trim();
    return Object.fromEntries(children.map((child) => [child.nodeName, walk(child)]));
  };
  return { [doc.documentElement.nodeName]: walk(doc.documentElement) };
}

function jsonToXml(value, root = "root") {
  if (Array.isArray(value)) {
    return value.map((item) => jsonToXml(item, "item")).join("");
  }
  if (value && typeof value === "object") {
    return `<${root}>${Object.entries(value).map(([key, child]) => jsonToXml(child, cleanXmlName(key))).join("")}</${root}>`;
  }
  return `<${root}>${escapeHtml(String(value ?? ""))}</${root}>`;
}

function cleanXmlName(name) {
  return String(name).replace(/[^a-zA-Z0-9_-]/g, "_") || "item";
}

function rename(filename, extension) {
  return `${filename.replace(/\.[^.]+$/, "")}.${extension}`;
}

async function convert(event) {
  event.preventDefault();
  if (!currentFile) {
    statusText.textContent = "Choose a file first.";
    return;
  }
  if (!(await canConvert())) {
    statusText.textContent = "Free limit reached. Upgrade for unlimited conversions.";
    document.querySelector("#pricing").scrollIntoView({ behavior: "smooth" });
    return;
  }
  try {
    statusText.textContent = "Converting...";
    let result;
    if (currentMode === "image" || currentMode === "svg") result = await convertImageLike(false);
    if (currentMode === "edit") result = await exportEditedImage();
    if (currentMode === "pdf") result = await convertImageLike(true);
    if (currentMode === "text") result = await convertText();
    if (currentMode === "data") result = await convertData();
    outputUrl = URL.createObjectURL(result.blob);
    downloadLink.href = outputUrl;
    downloadLink.download = result.name;
    downloadLink.classList.remove("disabled");
    outputMeta.textContent = `${result.name} · ${formatBytes(result.blob.size)}`;
    await recordConversion();
    statusText.textContent = "Complete";
  } catch (error) {
    statusText.textContent = error.message || "Conversion failed.";
  }
}

function currentUser() {
  return JSON.parse(localStorage.getItem("convertdesk_user") || "null");
}

function authToken() {
  return localStorage.getItem("formatnest_token");
}

function saveSession(data) {
  localStorage.setItem("formatnest_token", data.token);
  localStorage.setItem("convertdesk_user", JSON.stringify(data.user));
}

function clearSession() {
  localStorage.removeItem("formatnest_token");
  localStorage.removeItem("convertdesk_user");
}

async function apiRequest(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };
  const token = authToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.detail || "Request failed");
  }
  return data;
}

function userKey() {
  const user = currentUser();
  return user?.email || "guest";
}

function isProUser() {
  return currentUser()?.plan === "pro";
}

function conversionCounts() {
  return JSON.parse(localStorage.getItem("convertdesk_counts") || "{}");
}

function usedConversions() {
  return conversionCounts()[userKey()] || 0;
}

async function canConvert() {
  const user = currentUser();
  if (user && authToken()) {
    return user.plan === "pro" || user.conversions_left === "unlimited" || Number(user.conversions_left) > 0;
  }
  return isProUser() || usedConversions() < FREE_LIMIT;
}

async function recordConversion() {
  if (authToken()) {
    const data = await apiRequest("/usage/record", { method: "POST", body: "{}" });
    localStorage.setItem("convertdesk_user", JSON.stringify(data.user));
    updateAccountUi();
    return;
  }
  if (isProUser()) {
    updateAccountUi();
    return;
  }
  const counts = conversionCounts();
  counts[userKey()] = usedConversions() + 1;
  localStorage.setItem("convertdesk_counts", JSON.stringify(counts));
  updateAccountUi();
}

function updateAccountUi() {
  const user = currentUser();
  const used = usedConversions();
  if (user) {
    openAuth.textContent = user.plan === "pro" ? "Unlimited account" : user.email;
    openSignup.textContent = "Account";
  } else {
    openAuth.textContent = "Log in";
    openSignup.textContent = "Create account";
  }
  if (user?.conversions_left !== undefined) {
    quotaText.textContent = user.conversions_left === "unlimited"
      ? "Unlimited conversions"
      : `${user.conversions_left} of ${FREE_LIMIT} free conversions left`;
  } else {
    quotaText.textContent = isProUser() ? "Unlimited conversions" : `${Math.max(0, FREE_LIMIT - used)} of ${FREE_LIMIT} free conversions left`;
  }
}

function setAuthMode(mode) {
  const signup = mode === "signup";
  authTitle.textContent = signup ? "Create your free account" : "Log in to track your free conversions";
  $("#loginBtn").textContent = signup ? "Create account" : "Log in";
  nameWrap.hidden = !signup;
  loginMode.classList.toggle("active", !signup);
  signupMode.classList.toggle("active", signup);
  authForm.dataset.mode = mode;
  authState.textContent = signup
    ? "Create a free account with 50 conversions."
    : "Log in to sync quota with the live backend.";
}

async function createAccount(name, email, password) {
  const data = await apiRequest("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password })
  });
  saveSession(data);
  updateAccountUi();
}

async function login(email, password) {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
  saveSession(data);
  updateAccountUi();
}

function upgradeToPro() {
  const user = currentUser() || { email: "demo@convertdesk.local" };
  localStorage.setItem("convertdesk_user", JSON.stringify({ name: user.name, email: user.email, plan: "pro" }));
  authState.textContent = "Unlimited access is active in this static demo.";
  updateAccountUi();
}

async function restoreSession() {
  if (!authToken()) {
    updateAccountUi();
    return;
  }
  try {
    const data = await apiRequest("/me");
    localStorage.setItem("convertdesk_user", JSON.stringify(data.user));
  } catch {
    clearSession();
  }
  updateAccountUi();
}

toolSearch.addEventListener("input", (event) => renderCatalog(event.target.value));
document.querySelectorAll(".tool-option").forEach((button) => button.addEventListener("click", () => setMode(button.dataset.mode)));
document.querySelectorAll("[data-editor-tool]").forEach((button) => button.addEventListener("click", () => setEditorTool(button.dataset.editorTool)));
$("#rotateLeft").addEventListener("click", () => rotateEditor(-1));
$("#rotateRight").addEventListener("click", () => rotateEditor(1));
$("#flipHorizontal").addEventListener("click", flipEditor);
$("#resetEditor").addEventListener("click", resetEditor);
$("#applyCrop").addEventListener("click", applyCropToEditor);
$("#applyFilters").addEventListener("click", applyFiltersToEditor);
fileInput.addEventListener("change", (event) => event.target.files[0] && setFile(event.target.files[0]));
dropzone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropzone.classList.add("dragover");
});
dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
dropzone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropzone.classList.remove("dragover");
  if (event.dataTransfer.files[0]) setFile(event.dataTransfer.files[0]);
});
$("#converterForm").addEventListener("submit", convert);
openAuth.addEventListener("click", () => {
  setAuthMode("login");
  authModal.showModal();
});
openSignup.addEventListener("click", () => {
  setAuthMode("signup");
  authModal.showModal();
});
$("#closeAuth").addEventListener("click", () => authModal.close());
loginMode.addEventListener("click", () => setAuthMode("login"));
signupMode.addEventListener("click", () => setAuthMode("signup"));
authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const email = authEmail.value.trim().toLowerCase();
    const password = $("#authPassword").value;
    if (authForm.dataset.mode === "signup") {
      await createAccount(authName.value.trim(), email, password);
    } else {
      await login(email, password);
    }
    authModal.close();
  } catch (error) {
    authState.textContent = error.message;
  }
});
upgradeBtn.addEventListener("click", upgradeToPro);
freePlanBtn.addEventListener("click", () => {
  if (!currentUser()) {
    setAuthMode("signup");
    authModal.showModal();
  }
  updateAccountUi();
});
exchangeType.addEventListener("change", () => selectExchange(exchangeType.value));
exchangeFrom.addEventListener("change", updateExchange);
exchangeTo.addEventListener("change", updateExchange);
exchangeAmount.addEventListener("input", updateExchange);

renderCatalog();
setMode("image");
setupExchangers();
setupSpecialCalculators();
selectTool(new URLSearchParams(location.search).get("tool"));
restoreSession();
