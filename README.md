# Gontobbo (গন্তব্য)

**AI-Powered Full-Stack Travel Platform | Intelligent Bookings | Seamless Experience**

Gontobbo is a sophisticated, production-grade **Full-Stack** travel platform built with a modern **Monorepo** architecture. It integrates cutting-edge **Generative AI** with a robust booking engine to provide a truly intelligent travel discovery and reservation experience.

---

## 🔥 Project Highlights: AI & Full-Stack

### 🤖 **AI-Driven Intelligence**

- **Context-Aware AI Chat**: Powered by **Google Gemini**, the platform features a Chat interface that understands user intent.
- **RAG (Retrieval-Augmented Generation)**: Uses vector search and semantic retrieval to provide accurate, data-driven travel recommendations and support.
- **Intelligent Discovery**: AI-generated trip suggestions and smart search filters.

### 💻 **Full-Stack Architecture**

- **Unified Monorepo**: Managed with **Turborepo** for ultra-fast builds and centralized package management.
- **Scalable Backend**: A high-performance **Express** server using **Prisma ORM** as the bridge to a PostgreSQL database.
- **Premium Mobile UI**: A cross-platform **React Native (Expo)** application featuring smooth **Moti** animations and a custom design system.

---

## 🚀 Tech Stack

### **Backend (`apps/backend`)**

- ⚡ **Node.js & Express**: Fast and minimalist web framework.
- ◮ **Prisma**: Type-safe ORM for structured data management.
- ✨ **Gemini AI**: Advanced LLM integration for the RAG-based chat system.
- 🛡️ **Zod**: Runtime schema validation for robust API endpoints.
- 📁 **Multer & Sharp**: Industrial-grade image processing and storage.

### **Mobile (`apps/mobile`)**

- ⚛️ **React Native & Expo (v51)**: Leading framework for modern mobile apps.
- 🎨 **Shopify Restyle**: Type-safe design system for scalable UI.
- 🌀 **Moti & Reanimated**: High-performance layout and micro-animations.
- 🏗️ **Redux Toolkit**: Centralized state management with RTK Query for efficient data fetching.
- 🌍 **i18next**: Deep internationalization support for global reach.

---

## 📂 Monorepo Structure

```text
.
├── apps
│   ├── backend          # Express API, Prisma Schema, Gemini RAG Logic
│   └── mobile           # React Native App (Design System, AI Chat, Bookings)
├── packages             # Shared configurations (Linting, TSConfig, Types)
└── turbo.json           # Turborepo orchestration
```

---

## 🛠 Getting Started

### **Prerequisites**

- **Node.js**: v20.13.1+
- **Yarn**: v4.x (Berry)
- **Database**: PostgreSQL

### **Installation**

1. Clone & Enter:

   ```bash
   git clone https://github.com/mahede182/gontobbo.git && cd gontobbo
   ```

2. Install all dependencies:

   ```bash
   yarn install
   ```

3. Initialize Databases:
   ```bash
   cd apps/backend && npx prisma db push
   ```

### **Running in Development**

Launch the entire ecosystem (Backend + Mobile + AI Services):

```bash
yarn dev
```

Target specific apps:

```bash
yarn dev:backend  # Start API only
yarn dev:mobile   # Start Mobile only
```

---

## 🎨 Development Guidelines

To maintain the **Premium Visuals** and **Code Quality** of Gontobbo:

1.  **Strict Theming**: Use tokens from `@/theme` only. No raw colors or spacing values.
2.  **AI Pattern**: New AI features should follow the existing RAG pattern located in `apps/backend/src/modules/ai`.
3.  **Clean Components**: One component per file. Adhere to SPIR (Single Purpose, Intelligent Routing).
4.  **Logging**: Always use `AppLogger` static methods for production-ready debugging.

---

## 🤝 Contributing & Roadmap

We are building the future of travel.

- [x] Full-stack RAG AI Chat.
- [x] Modern Hotel & Trip booking flow.
- [x] Interactive Search & Dynamic Filtering.
- [x] Unified Monorepo workflow with Turbo.
- [ ] Multi-region Flight Booking (Next).
- [ ] AI-powered Travel Itinerary Generator.

---

© 2026 [Gontobbo.co](https://www.gontobbo.co/). Every reservation is instantly confirmed.
