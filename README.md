# MilSymbols Rendering API 🚀

A high-performance Node.js service for generating MIL-STD-2525 / APP-6 military symbols.

## 🧱 Core Engine
This API is powered by the [milsymbol](https://github.com/spatialillusions/milsymbol) library by Fredrik Sjölund. It provides the heavy lifting for rendering MIL-STD-2525 and APP-6 compliance.

## 📖 API Documentation
The full interactive API documentation, including endpoint testing and schema details, is available at:
👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

---

## 🛠️ Quick Start

### 1. Prerequisites
- **Node.js** (v20.6 or higher)
- **npm**

### 2. Installation
```bash
npm install

```

### 3. Environment Setup

Create a `.env` file in the root directory:

```text
# --- Server Configuration ---
# The port the Icon Service will listen on
PORT=3030

# --- Security & CORS ---
# Allowed Origins: Use a single URL, '*' for public,
# or a comma-separated list for multiple specific domains.
# Example: http://localhost:3000, https://map.myapp.com
CORS_ORIGIN=*

# Allowed Headers: Comma-separated list of custom headers 
# the client is permitted to send.
CORS_ALLOWED_HEADERS=Content-Type, Authorization
```

### 4. Running the Service

**Development Mode:**

```bash
npm run dev

```

**Production Build:**

```bash
npm run build
npm start

```

---

## 🏗️ Tech Stack

* **Runtime:** Node.js (ES Modules)
* **Language:** TypeScript
* **Framework:** Express
* **Documentation:** OpenAPI 3.0 (Swagger)
* **Core Library:** [milsymbol](https://github.com/spatialillusions/milsymbol)

---

## Donations & Sponsor
Creating these libraries is my hobie. If you consider my work useful to you, please consider buying me a coffee. Your contribution keeps me motivated to created and maintain these useful libraries.
[![Sponsor](https://img.shields.io/badge/Sponsor-❤️-ff69b4?style=for-the-badge&logo=github)](https://github.com/sponsors/felipecarrillo100)

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?business=7X3JAPNBQTXZG&amount=5&no_recurring=0&item_name=NPM%2FGitHub+libraries&currency_code=USD)

[![QR](https://raw.githubusercontent.com/felipecarrillo100/bankgreen/main/QR_Code_5Euro.png)](https://www.paypal.com/donate/?business=7X3JAPNBQTXZG&amount=5&no_recurring=0&item_name=NPM%2FGitHub+libraries&currency_code=USD)

[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" name="buy-me-a-coffee" alt="Buy Me A Coffee" width="180">](https://buymeacoffee.com/felipecarrillo100)

