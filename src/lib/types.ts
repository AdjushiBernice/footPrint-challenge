export interface Card {
    id: string
    type: "visa" | "mastercard"
    balance: number
    cardNumber: string
    validThru: string
    cardHolder: string
    isActive: boolean
  }
  
  export interface Transaction {
    id: string
    type: "deposit" | "withdrawal" | "transfer"
    amount: number
    description: string
    date: string
    color: string
  }
  
  export interface WeeklyActivity {
    day: string
    deposit: number
    withdraw: number
  }
  
  export interface ExpenseCategory {
    name: string
    percentage: number
    amount: number
    color: string
  }
  
  export interface QuickTransferUser {
    id: string
    name: string
    role: string
    avatar: string
  }
  
  export interface BalanceHistoryPoint {
    month: string
    balance: number
  }
  
  export interface UserProfile {
    id: string
    name: string
    username: string
    email: string
    dateOfBirth: string
    presentAddress: string
    permanentAddress: string
    city: string
    postalCode: string
    country: string
    avatar: string
  }
  
  export interface DashboardState {
    cards: Card[]
    transactions: Transaction[]
    weeklyActivity: WeeklyActivity[]
    expenseStatistics: ExpenseCategory[]
    quickTransferUsers: QuickTransferUser[]
    balanceHistory: BalanceHistoryPoint[]
    isLoading: boolean
    error: string | null
  }
  
  export interface UserState {
    profile: UserProfile | null
    isLoading: boolean
    error: string | null
  }
  
  export interface UIState {
    sidebarOpen: boolean
    currentPage: string
    theme: "light" | "dark"
    isLoading: boolean
    error: string | null
  }
  