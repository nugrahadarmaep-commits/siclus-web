# SICLUS - School Integrated Check-in & Logbook Unit System (Frontend)

**SICLUS** (**S**chool **I**ntegrated **C**heck-in & **L**ogbook **U**nit **S**ystem) is a web-based operational check-in and digital logbook management application developed for the **Department of Transportation of Mojokerto City (*Dinas Perhubungan Kota Mojokerto*)**.

The application digitalizes daily driver attendance check-ins, pre-trip vehicle condition inspections, trip checkpoint logging, and administrative reporting for municipal school transportation services.

---

## Key Modules & Features

### 1. Administrative Portal
- **Real-Time Monitoring**: Live dashboard tracking active driver check-ins, operational unit statuses, and daily trip progress.
- **Unit & Driver Management**: Administration of driver profiles, vehicle inventory, operational routes (*trayek*), and session assignments.
- **Digital Logbook Review & Export**: Comprehensive inspection records, check-in timestamps, and photo verifications with export capabilities to Excel format (`.xlsx`).
- **Operational Schedule Control**: Dynamic configuration of operational cut-off times for departure and return check-ins.

### 2. Driver Portal
- **Identity Check-in & Verification**: Secure driver check-in with selfie capture and automatic in-browser image compression.
- **Vehicle Inspection Checklist**: Digital pre-trip inspection covering vehicle roadworthiness, safety equipment, fuel levels, and initial odometer readings.
- **Trip Checkpoint Logging**: Step-by-step progress logging from garage departure (*CP 1*), destination arrival (*CP 2*), to garage return (*CP 3*).
- **Logbook History**: Direct access for drivers to review past assignments and submission records.

### 3. Progressive Web App (PWA)
- Installable on mobile devices (Android/iOS) and desktop browsers for dedicated app experience.
- Compliant with modern Android adaptive and maskable circular icon standards.
- Fast service worker caching for reliable performance in transit environments.

---

## Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **PWA Integration**: [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
- **Data Export**: [ExcelJS](https://github.com/exceljs/exceljs) / [XLSX](https://github.com/SheetJS/sheetjs)
- **Toast Notifications**: [React Hot Toast](https://react-hot-toast.com/)

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
  Bundles and optimizes production assets into the `dist/` directory with Service Worker generation.

- **Preview Build**:
  ```bash
  npm run preview
  ```
  Locally previews the production build.

---

## Project Structure

```text
src/
├── assets/         # Static assets (logos, icons, fonts)
├── components/     # Reusable UI elements, navigation, and modal dialogues
│   ├── common/     # Shared components (Modals, Pickers, Alerts)
│   └── layout/     # Layout wrappers, headers, and navigation bars
├── pages/          # Application views
│   ├── admin/      # Administrative dashboard, management, and recap views
│   ├── auth/       # Authentication views (Login)
│   └── driver/     # Driver check-in, checklist, and checkpoint views
├── services/       # API clients, endpoints, and HTTP interceptors
├── utils/          # Formatting helpers, role helpers, and export utilities
├── App.jsx         # Root router and application state
└── main.jsx        # Application entry point
```

---

## Organization & Acknowledgement

Developed for the **Department of Transportation of Mojokerto City (*Dinas Perhubungan Kota Mojokerto*)** to support transparent, accountable, and digitized school transportation management.
