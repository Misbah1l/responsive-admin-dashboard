# Responsive Admin Dashboard

A sleek, dark-themed, and fully responsive Admin Dashboard web application built using HTML5, Tailwind CSS, JavaScript (ES6+), and Chart.js.

## 🚀 Live Demo
- **Repository Name:** `responsive-admin-dashboard`
- **Deployment Status:** Ready for deployment on Vercel / GitHub Pages.

---

## ✨ Features

- **Responsive Sidebar & Mobile Navigation:** Seamless UI adaptation across mobile, tablet, and desktop screens with a toggleable drawer on mobile devices.
- **Interactive Data Charts:**
  - **Line Graph:** Revenue Trends dynamically updated based on timeframe selection (7 Days, 30 Days, 1 Year).
  - **Bar Chart:** Acquisition & Traffic Distribution analytics.
- **Dynamic Search & Filtering:** Live search filtering across customer names, acquisition channels, and transaction statuses.
- **Transaction Management:**
  - Add new transactions dynamically via modal input (with customer name, channel, amount, and status).
  - Full view of transaction logs and status indicators (`Completed`, `Pending`, `Failed`).
- **Authentication Modes:**
  - **Admin Mode:** Full access to add transactions, export CSV reports, download PDF analytics, and modify settings.
  - **Guest Mode:** Read-only mode protecting dashboard state from unauthorized modifications.
- **Export & Report Generation:**
  - Download transaction logs in **CSV** format.
  - Generate and download full analytics reports as **PDF** files (using `html2pdf.js`).
- **Profile Settings & Toast Notifications:** Interactive user feedback on system actions.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, Tailwind CSS (via CDN)
- **Data Visualization:** Chart.js
- **Export Utility:** `html2pdf.js`
- **Icons:** Inline SVG Icons

---

## 📂 Project Structure

```text
responsive-admin-dashboard/
├── index.html          # Main HTML structure, layout, and modals
├── assets/
│   └── js/
│       └── main.js     # Dashboard logic, Chart.js setup, search, and state management
└── README.md           # Project documentation
🚀 Getting Started Locally
Clone the repository:

Bash
git clone [https://github.com/YOUR_GITHUB_USERNAME/responsive-admin-dashboard.git](https://github.com/YOUR_GITHUB_USERNAME/responsive-admin-dashboard.git)
Navigate into the project folder:

Bash
cd responsive-admin-dashboard
Run locally:

Open index.html directly in your browser.

Or use VS Code extension like Live Server (Go Live) to launch local development server.

📝 Usage Guide
Timeframe Switching: Click on 7 Days, 30 Days, or 1 Year buttons in the Performance Metrics section to dynamically update revenue charts.

Search: Use the header search bar to filter transactions instantly by typing names or statuses (e.g., Acme, Pending, Direct Traffic).

Add Transaction: Click + Add Transaction button in Admin mode to append new data to the live table.

Export Reports: Click Export CSV in the header or Download PDF Report inside the Analytics tab.

📄 License
This project is created for educational and presentation purposes.