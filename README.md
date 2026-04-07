# Financial Dashboard

A responsive and interactive **Finance Dashboard** built using **React, Vite, Tailwind CSS, and Framer Motion**.

This project helps users track their financial activity through summary cards, transaction management, visual insights, and role-based UI simulation.

---

## Features

* **Dashboard Overview**

  * Total Balance
  * Total Income
  * Total Expenses

* **Visual Insights**

  * Balance trend chart
  * Spending breakdown
  * Financial insights section

* **Transactions Section**

  * Transaction list with details
  * Search and filtering
  * Transaction type filters

* **Role-Based UI**

  * Viewer mode
  * Admin mode
  * Add transaction functionality

* **Responsive Design**

  * Mobile-friendly layout
  * Clean card-based UI
  * Dark theme styling

* **Animations**

  * Smooth transitions using Framer Motion

---

## Tech Stack

* **React**
* **Vite**
* **Tailwind CSS**
* **Framer Motion**

---

## Project Structure

```text
src/
├── components/
│   ├── ChartsSection.jsx
│   ├── Insights.jsx
│   ├── RoleSwitcher.jsx
│   ├── SummaryCards.jsx
│   └── TransactionsTable.jsx
│
├── Data/
│   └── transactions.js
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

## How to Run

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open the local development URL shown in the terminal.

---

## Future Enhancements

* Recharts integration
* Dark mode toggle
* Export transactions
* Local storage persistence
* Advanced filtering
* Monthly analytics
