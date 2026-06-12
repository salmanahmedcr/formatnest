# FormatNest

FormatNest is a static universal file-conversion website. It runs the MVP tools directly in the browser, so supported files do not leave the user's computer.

## Run locally

Open `index.html` in a browser.

Optional local server:

```powershell
cd "C:\Users\Salman Ahmed\Documents\Codex\2026-06-10\i-want-to-create-a-website\outputs\universal-converter"
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Working tools included

- PNG/JPG/WEBP/BMP to JPG/PNG/WEBP
- SVG to PNG/JPG/WEBP
- Image resize
- Image compression quality control
- Image editor workspace
- Image crop
- Manual eraser brush
- Draw/markup brush
- Rotate left/right
- Flip horizontal
- Brightness, contrast, and saturation adjustments
- Image to PDF
- TXT/HTML/Markdown conversion
- Base64 text output
- JSON to CSV/XML
- CSV to JSON/XML
- XML to JSON/CSV
- Searchable catalog for 70+ planned conversion routes
- Create account and login UI for account-based usage
- Live backend authentication connected to `https://api.formatnest.me`
- Backend-backed quota recording for logged-in users
- Stripe checkout flow through `checkout.html` and the backend `/billing/create-checkout` endpoint
- 50 free conversions per browser/user account in the static MVP
- Pricing section with a $25/month unlimited plan
- Currency converter
- Meter to feet and feet to meter
- Weight, temperature, area, volume, speed, and data storage converters
- Time zone converter
- Age calculator
- Loan EMI calculator
- Percentage calculator
- Fuel economy converter
- Cooking measurement converter
- Power, energy, and pressure converters
- Screen DPI calculator
- Crypto price converter with fallback demo prices
- SEO landing pages for high-intent tools
- Category-led homepage with PDF, image, document, media, exchanger, and OCR groups
- Rich tool pages with upload CTAs, how-to steps, FAQ, privacy notes, and related tools
- Exact embedded tool panels on every individual tool page
- Direct homepage and dropdown links to separate tool URLs
- Hover dropdown navigation, embedded tool pages, and a lightweight custom desktop cursor
- Account dashboard with login state, plan, quota, and activity
- Workflow shortcuts for multi-step conversion jobs
- Privacy, Terms, and Contact pages
- `robots.txt` and `sitemap.xml`

## SEO pages included

Every tool in the catalog has an indexable HTML page in `/tools/`, and each page has a title, description, canonical URL, one H1, an exact embedded tool panel, FAQ content, related links, and crawlable body content. The included `sitemap.xml` lists the tool pages for search engine discovery.

High-value exchanger pages include currency converter, meter to feet, feet to meter, KG to LBS, Celsius to Fahrenheit, area converter, volume converter, speed converter, data storage converter, time zone converter, age calculator, EMI calculator, percentage calculator, fuel economy, cooking measurements, power, energy, pressure, screen DPI, and crypto price converter.

## Backend tools to add next

For PDF-to-DOCX, DOCX-to-PDF, OCR, audio, video, archives, and advanced ebook/design formats, add a backend worker service.

Recommended production stack:

- Frontend: this static site or React/Next.js
- API: Node.js/Express or Python FastAPI
- Queue: Redis + BullMQ or Celery
- Storage: S3/R2-compatible temporary object storage
- Document engine: LibreOffice headless
- PDF engine: Ghostscript, qpdf, Poppler
- Media engine: FFmpeg
- OCR engine: Tesseract
- Image engine: Sharp or ImageMagick
- Ebook engine: Calibre

## Production safety checklist

- Enforce login, quota, and subscription access on the backend
- Replace local demo accounts with real authentication before launch
- Configure Stripe for the $25/month unlimited plan before charging users
- Set `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, and `STRIPE_WEBHOOK_SECRET` on the backend server
- Add the Stripe webhook URL: `https://api.formatnest.me/billing/webhook`
- Store users and subscription status in a database
- Validate MIME type and file extension
- Set strict file-size limits per tool
- Run conversion jobs outside the web process
- Delete uploaded and converted files automatically
- Rate-limit anonymous users
- Scan risky uploads before processing
- Use expiring signed download URLs
- Log conversion failures without storing private files
