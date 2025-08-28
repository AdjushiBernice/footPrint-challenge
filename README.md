# Financial Dashboard

A modern, responsive financial dashboard built with React, Next.js, TypeScript, TailwindCSS, Material UI, React Query, and Zustand.

## Features

- **Dashboard Overview**: Credit cards display, recent transactions, weekly activity charts, expense statistics, quick transfer, and balance history
- **Profile Settings**: Complete user profile management with form validation
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop breakpoints
- **TypeScript**: Strict typing throughout the application
- **State Management**: Zustand for global state management
- **Data Fetching**: React Query with Axios for efficient data fetching and caching
- **Modern UI**: TailwindCSS with Material UI components and custom design system
- **Interactive Elements**: Form submissions, user selection, and real-time updates

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS v4 + Custom Design Tokens
- **UI Components**: Radix UI primitives with custom styling
- **Charts**: Recharts for data visualization
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query + Axios
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd financial-dashboard
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/                    # Next.js App Router
│   ├── api/               # API routes for mock data
│   ├── settings/          # Settings page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Dashboard overview
│   └── providers.tsx     # App providers
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── sidebar.tsx       # Navigation sidebar
│   ├── header.tsx        # Top header
│   ├── my-cards.tsx      # Credit cards display
│   ├── recent-transactions.tsx
│   ├── weekly-activity.tsx
│   ├── expense-statistics.tsx
│   ├── quick-transfer.tsx
│   ├── balance-history.tsx
│   └── profile-settings.tsx
├── lib/                   # Utilities and configurations
│   ├── types.ts          # TypeScript type definitions
│   ├── api.ts            # API functions and mock data
│   ├── store.ts          # Zustand store
│   └── utils.ts          # Utility functions
└── public/               # Static assets
\`\`\`

## Features Implemented

### Global Loading/Error Handling
- React Query for data fetching with loading states
- Global error handling with toast notifications
- Skeleton loading components

### Styling & Responsiveness
- TailwindCSS utility classes with custom design system
- Material UI components integration
- Fully responsive design (mobile, tablet, desktop)
- Consistent spacing, typography, and color hierarchy

### TypeScript & Component Structure
- Strict typing throughout (no `any` types)
- Clean, scalable file/folder structure
- Reusable, self-contained components
- Proper interface definitions

### State Management
- Zustand for app-wide state management
- User session and app state handling
- Efficient state updates and persistence

### Interactive Features
- Profile form submission with validation
- Quick transfer functionality
- User selection and amount input
- Real-time form updates

### API Routes
- Next.js API routes for mock data endpoints
- RESTful API design with proper HTTP methods
- Simulated network delays for realistic testing

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Design System

The application uses a custom design system with semantic color tokens:
- Primary: Cyan-800 (#164e63) for trust and professionalism
- Secondary: Emerald-600 (#10b981) for success and growth
- Neutrals: Various grays and whites for content hierarchy
- Charts: Coordinated color palette for data visualization

## Deployment

The application is ready for deployment on Vercel, Netlify, or similar platforms. Build the project and deploy the `out` directory.

## License

This project is for assessment purposes. All rights retained by the author.
