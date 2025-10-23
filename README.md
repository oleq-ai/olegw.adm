# OleqGW Admin Dashboard

[![Deploy Production](https://github.com/oleq-gaming/oleqgw.adm/actions/workflows/deploy.yml/badge.svg)](https://github.com/oleq-gaming/oleqgw.adm/actions/workflows/deploy.yml)

A modern, comprehensive gaming platform administration dashboard built with Next.js 15, React 19, and TypeScript.

## Features

- 🎮 **Gaming Platform Management** - Complete player and game management
- 📊 **Advanced Analytics** - Real-time dashboard with interactive charts
- 👥 **User Management** - Role-based access control and user administration
- 💰 **Transaction Tracking** - Comprehensive financial monitoring
- 🎯 **Promotions & Marketing** - Campaign management tools
- 📈 **Leaderboards** - Player ranking and competition tracking
- 🔒 **Security** - JWT authentication and permission-based access
- 🎨 **Modern UI** - Beautiful, responsive design with dark/light themes

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI**: React 19, TypeScript, Tailwind CSS
- **Components**: Radix UI, Lucide React
- **Charts**: Recharts
- **State Management**: TanStack Query
- **Authentication**: JWT with Jose
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom design system

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (private)/         # Protected routes
│   └── (public)/          # Public routes
├── components/            # Reusable UI components
├── lib/                   # Business logic and services
├── hooks/                 # Custom React hooks
├── data/                  # Static data and constants
└── styles/               # Global styles and themes
```

## License

Private - All rights reserved.
