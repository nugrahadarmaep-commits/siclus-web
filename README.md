# SICLUS - School Transportation Management System (Frontend)

**SICLUS** (*Sistem Informasi dan Manajemen Operasional Angkutan Sekolah*) is a web-based operational and checklist information system developed for the **Department of Transportation of Mojokerto City (*Dinas Perhubungan Kota Mojokerto*)**.

This application facilitates daily vehicle inspections, driver assignments, operational checkpoint tracking, and administrative reporting for the municipal free school transportation program.

---

## Key Modules & Features

### 1. Administrative Portal
- **Operational Dashboard**: Real-time overview of active fleets, driver attendance, and daily trip statuses.
- **Fleet & Driver Management**: Management of driver profiles, vehicle data, operational routes (*trayek*), and daily assignments.
- **Reporting & Export**: Detailed inspection and trip logs with export capabilities to Excel format (`.xlsx`).
- **Operational Schedule Control**: Configuration of daily operational cut-off times for departure and return sessions.

### 2. Driver Portal
- **Operational Checklist**: Pre-trip vehicle inspection forms covering safety equipment, fuel, and odometer readings.
- **Selfie & Identity Verification**: Photo verification at the start of assignments with automatic in-browser image compression.
- **Trip Checkpoints**: Stage tracking from garage departure, destination arrival, to garage return.
- **Trip History**: Driver access to personal operational history and profile data.

### 3. Progressive Web App (PWA)
- Installable as a standalone app on Android, iOS, and desktop browsers.
- Adaptive circular maskable icons for Android system compliance.
- Fast loading with service worker asset caching.

---

## Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **PWA Plugin**: [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
- **Data Export**: [ExcelJS](https://github.com/exceljs/exceljs) / [XLSX](https://github.com/SheetJS/sheetjs)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Version 18 or higher recommended)
- `npm` (packaged with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nugrahadarmaep-commits/siclus-web.git
   cd siclus-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the project root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

### Available Scripts

- **Development Mode**:
  ```bash
  npm run dev
  ```
  Runs the local development server at `http://localhost:5173`.

- **Production Build**:
  ```bash
  npm run build
  ```
  Bundles and optimizes production assets into the `dist/` directory, including Service Worker generation.

- **Preview Production Build**:
  ```bash
  npm run preview
  ```
  Locally previews the production build.

---

## Project Structure

```text
src/
├── assets/         # Static visual assets (logos, illustrations)
├── components/     # Reusable UI components and layouts
│   ├── common/     # Generic modals, pickers, and alerts
│   └── layout/     # Navigation bars, sidebars, and app wrappers
├── pages/          # Main application views
│   ├── admin/      # Administrator management pages
│   ├── auth/       # Authentication views (Login)
│   └── driver/     # Driver checklist and checkpoint views
├── services/       # API clients and HTTP interceptors
├── utils/          # Helpers, formatters, and export utilities
├── App.jsx         # Application routing and state providers
└── main.jsx        # Application entry point
```

---

## Organization & Acknowledgement

Developed for **Dinas Perhubungan Kota Mojokerto** (Department of Transportation of Mojokerto City) to support safe, organized, and transparent school transportation services.
