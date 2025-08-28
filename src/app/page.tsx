"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { MyCards } from "@/components/dashboard/my-cards"; // MyCards component will now accept data as props
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { QuickTransfer } from "@/components/dashboard/quick-transfer";
import { WeeklyActivity } from "@/components/dashboard/weekly-activity";
import { ExpenseStatistics } from "@/components/dashboard/expense-statistics";
import { BalanceHistory } from "@/components/dashboard/balance-history";
import { DashboardSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorDisplay } from "@/components/ui/error-display";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { fetchCards } from "@/lib/api"; // Import the fetch function for cards
import {Card as CardType} from "@/lib/types"
export default function HomePage() {
  const dispatch = useAppDispatch();
  const [cards, setCards] = useState<CardType[]>([]); // Define the type as CardType[]
  const { isLoading, error } = useAppSelector((state) => state.dashboard);

  // Fetch the cards data directly in the HomePage
  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        const data = await fetchCards(); // Fetch the cards data
        setCards(data); // Store the fetched cards in state
      } catch (err) {
        console.error("Failed to fetch cards", err);
      }
    };

    fetchCardsData(); // Fetch the cards when the component mounts
  }, []);

  // Handle retry if there was an error
  const handleRetry = () => {
    // If you don't have `fetchDashboardData`, you can just remove this
    // dispatch(fetchDashboardData());
  };

  // Handle loading and error states
  if (error && !isLoading) {
    return (
      <DashboardLayout>
        <ErrorDisplay error={error} onRetry={handleRetry} className="mt-8" />
      </DashboardLayout>
    );
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Main content grid for cards and recent transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="lg:col-span-2">
            {/* Pass the fetched cards to the MyCards component */}
            <MyCards cards={cards} />
          </div>
          <div className="lg:col-span-1">
            <RecentTransactions /> {/* Display recent transactions on the side */}
          </div>
        </div>

        {/* Other content sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeeklyActivity />
          <div className="space-y-6">
            <ExpenseStatistics />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <QuickTransfer />
          <BalanceHistory />
        </div>
      </div>
    </DashboardLayout>
  );
}
