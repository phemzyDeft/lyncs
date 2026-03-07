# LYNCS - Personal Finance Tracker

A premium, simple, and high-fidelity personal finance tracker built to help users visualize their monthly income, expenses, and budget goals with a focus on modern UX and "small delights."

## 🚀 Features

- **Dynamic Financial Dashboard**: Real-time visualization of total balance, monthly income, and monthly expenses.
- **Spending Categorization**: Smart grouping of transactions into categories (Housing, Food, Transport, Entertainment, Utilities, etc.).
- **Creative Data Visualization**: Interactive doughnut charts using Recharts to provide meaningful insights into spending patterns.
- **Budget Tracking**: Visual progress bars showing budget utilization per category with "Over Budget" alerts.
- **Seamless Transactions**: A quick-add transaction modal with real-time comma formatting for currency inputs.
- **Persistent Data**: Automatic state persistence using `localStorage`—no backend required.
- **Mobile-First Design**: Fully responsive layout including a desktop sidebar and a mobile "drawer-style" transaction modal.
- **Dynamic Greetings**: Time-aware greetings (Morning/Afternoon/Evening) and instant toast notifications for user actions.

## 🛠️ Technology Stack

- **Framework**: React 19 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 (Custom Design System)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **State Management**: Custom React Hooks

## 🧠 Design Choices

- **Dark Mode First**: I chose a deep, monochromatic dark theme (`#0a0a0b`) to create a professional, "Fintech" aesthetic that emphasizes the colorful data visualizations.
- **Glassmorphism**: Used subtle backdrop blurs and translucent borders (`glass` class) to add depth and a "premium" feel to the cards and modals.
- **Input UX**: Implemented a text-based currency input that automatically formats with commas (e.g., `1,000.00`). Numerical inputs in web forms can often be clunky; this custom implementation feels more like a dedicated finance app.
- **Responsive Drawer**: On mobile, the "Add Transaction" modal behaves like a bottom drawer—a common mobile pattern that improves one-handed reachability.

## 🚧 Challenges Faced

- **Refining the Input Masking**: Ensuring the comma-separated input handled edge cases (like multiple decimal points or non-numeric characters) while still being typed in real-time required careful state synchronization.
- **Layout Balance**: Balancing the "Clean Code" requirement with the "Premium UI" goal. I opted for a centralized `useFinanceData` hook to keep the UI components focused purely on presentation.

## 📈 Future Improvements

- **Recurring Transactions**: Ability to set transactions as "Monthly" or "Weekly" for easier budget planning.
- **Data Export**: Allow users to download their transaction history as a CSV or PDF statement.
- **Multi-Currency Support**: Support for multiple currencies with real-time exchange rates.
- **Advanced Filtering**: Search and filter transactions by date ranges or specific keywords.

## ⏱️ Time Spent
Approximately **2.5 hours** (Design, Implementation, Refinement, and Documentation).

---

## 🏃 Getting Started

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
