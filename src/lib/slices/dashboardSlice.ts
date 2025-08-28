import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type {
  DashboardState,
  Card,
  Transaction,
  WeeklyActivity,
  ExpenseCategory,
  QuickTransferUser,
  BalanceHistoryPoint,
} from "../types"

// Mock API calls - replace with real API endpoints
export const fetchDashboardData = createAsyncThunk("dashboard/fetchData", async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    cards: [
      {
        id: "1",
        type: "visa" as const,
        balance: 5756,
        cardNumber: "3778 **** **** 1234",
        validThru: "12/22",
        cardHolder: "Eddy Cusuma",
        isActive: true,
      },
      {
        id: "2",
        type: "mastercard" as const,
        balance: 5756,
        cardNumber: "3778 **** **** 1234",
        validThru: "12/22",
        cardHolder: "Eddy Cusuma",
        isActive: false,
      },
    ] as Card[],
    transactions: [
      {
        id: "1",
        type: "deposit" as const,
        amount: 850,
        description: "Deposit from my Card",
        date: "28 January 2021",
        color: "text-green-500",
      },
      {
        id: "2",
        type: "withdrawal" as const,
        amount: -850,
        description: "Deposit Paypal",
        date: "25 January 2021",
        color: "text-blue-500",
      },
      {
        id: "3",
        type: "transfer" as const,
        amount: -850,
        description: "Jemi Wilson",
        date: "21 January 2021",
        color: "text-red-500",
      },
    ] as Transaction[],
    weeklyActivity: [
      { day: "Sat", deposit: 480, withdraw: 320 },
      { day: "Sun", deposit: 350, withdraw: 280 },
      { day: "Mon", deposit: 320, withdraw: 180 },
      { day: "Tue", deposit: 480, withdraw: 350 },
      { day: "Wed", deposit: 200, withdraw: 400 },
      { day: "Thu", deposit: 380, withdraw: 320 },
      { day: "Fri", deposit: 420, withdraw: 380 },
    ] as WeeklyActivity[],
    expenseStatistics: [
      { name: "Entertainment", percentage: 30, amount: 1500, color: "#1f77b4" },
      { name: "Bill Expense", percentage: 15, amount: 750, color: "#ff7f0e" },
      { name: "Investment", percentage: 20, amount: 1000, color: "#2ca02c" },
      { name: "Others", percentage: 35, amount: 1750, color: "#d62728" },
    ] as ExpenseCategory[],
    quickTransferUsers: [
      { id: "1", name: "Livia Bator", role: "CEO", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "2", name: "Randy Press", role: "Director", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "3", name: "Workman", role: "Designer", avatar: "/placeholder.svg?height=40&width=40" },
    ] as QuickTransferUser[],
    balanceHistory: [
      { month: "Jul", balance: 200 },
      { month: "Aug", balance: 400 },
      { month: "Sep", balance: 600 },
      { month: "Oct", balance: 500 },
      { month: "Nov", balance: 700 },
      { month: "Dec", balance: 400 },
      { month: "Jan", balance: 750 },
    ] as BalanceHistoryPoint[],
  }
})

const initialState: DashboardState = {
  cards: [],
  transactions: [],
  weeklyActivity: [],
  expenseStatistics: [],
  quickTransferUsers: [],
  balanceHistory: [],
  isLoading: false,
  error: null,
}

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    updateCardBalance: (state, action: PayloadAction<{ cardId: string; balance: number }>) => {
      const card = state.cards.find((c) => c.id === action.payload.cardId)
      if (card) {
        card.balance = action.payload.balance
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false
        state.cards = action.payload.cards
        state.transactions = action.payload.transactions
        state.weeklyActivity = action.payload.weeklyActivity
        state.expenseStatistics = action.payload.expenseStatistics
        state.quickTransferUsers = action.payload.quickTransferUsers
        state.balanceHistory = action.payload.balanceHistory
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch dashboard data"
      })
  },
})

export const { clearError, updateCardBalance } = dashboardSlice.actions
export default dashboardSlice.reducer
