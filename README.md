# Anapurna Manufactures Website — Revised

This version keeps the original industrial/editorial direction but simplifies the UX for a practical B2B audience.

## What changed
- Responsive desktop/tablet/mobile layouts.
- Reworked image cropping so supplied factory photography is not awkwardly cut.
- Product cards now use the supplied catalogue sheets.
- Product selector now uses extracted brand/logo images from the supplied catalogue sheets.
- Selector options are strictly dependent on earlier choices and only valid combinations are shown.
- Mobile selector uses a full-screen one-step flow with internal scrolling so options are not clipped.
- Added subtle scroll-reveal and stagger animations with reduced-motion support.
- Simplified copy and navigation.
- Updated product data to reflect the supplied catalogue sheets, including Mili, India/Varasa and the corrected widths/gauges.
- Quote form carries the exact selected configuration.

## Run
Open `index.html` directly or deploy the folder to a static host such as Vercel/Netlify.

## Backend
The quote form currently demonstrates the frontend flow and logs a payload in the browser console. Connect the submit handler to `POST /api/quote-request`, Supabase, an email service or your CRM when backend credentials are available.

## Retail & Wholesale Locations
- Radha Krishna Co — Shop 1, 161 N. S Road, Kolkata-07
- Radha Gobinda Co — Shop 2 / Wholesale Outlet, 137 N. S Road, Kolkata-01
- WhatsApp: +91 99036 03052
