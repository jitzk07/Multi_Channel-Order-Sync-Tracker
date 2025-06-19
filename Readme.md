# 🧾 Multi-Channel Order Sync Tracker

This project simulates an order synchronization dashboard for a centralized warehouse receiving orders from multiple sales channels (Shopify, Amazon, Flipkart). It provides a visual and interactive interface to track the status of orders and retry failed/pending syncs manually.

---

## 📦 Features

- Sync mock orders from **Shopify**, **Amazon**, and **Flipkart**.
- Track order status: `success`, `failed`, and `pending`.
- Retry failed or pending syncs manually.
- Visual stats dashboard (histogram).
- Filter orders by:
  - Status (`failed`, `pending`, or all)
  - Channel (Shopify, Amazon, Flipkart)
- Responsive and scrollable UI with sticky table headers.

---

## 🧰 Tech Stack

- **Frontend**: React + Tailwind CSS + Recharts
- **Backend**: Node.js + Express + MongoDB
- **Database**: MongoDB
- **Libraries**: Axios, React Hot Toast, Recharts, UUID

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/jitzk07/Multi_Channel-Order-Sync-Tracker
cd backend/npm run dev
cd frontend/npm run dev

