import axios from "axios";
import type {
  UserProfile,
  Card,
  Transaction,
  WeeklyActivity,
  ExpenseCategory,
  QuickTransferUser,
  BalanceHistoryPoint,
} from "./types";

const api = axios.create({
  baseURL: process.env.NODE_ENV === "production"
    ? "https://footprint-challenge-api.onrender.com"
    : "http://localhost:3001",
  timeout: 5000,
});

export const fetchUser = async (): Promise<UserProfile> => {
  const response = await api.get("/UserProfile");
  return response.data;
};

export const fetchCards = async (): Promise<Card[]> => {
  const response = await api.get("/Card");
  return response.data;
};

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get("/Transaction");
  return response.data;
};

export const fetchWeeklyActivity = async (): Promise<WeeklyActivity[]> => {
  const response = await api.get("/WeeklyActivity");
  return response.data;
};

export const fetchExpenseStats = async (): Promise<ExpenseCategory[]> => {
  const response = await api.get("/ExpenseCategory");
  return response.data;
};

export const fetchQuickTransferUsers = async (): Promise<QuickTransferUser[]> => {
  const response = await api.get("/QuickTransferUser");
  return response.data;
};

export const fetchBalanceHistory = async (): Promise<BalanceHistoryPoint[]> => {
  const response = await api.get("/BalanceHistoryPoint");
  return response.data;
};

export const updateUser = async (userData: Partial<UserProfile>): Promise<UserProfile> => {
  const response = await api.put("/UserProfile", userData);
  return response.data;
};
