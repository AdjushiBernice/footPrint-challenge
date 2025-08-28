"use client";

import { Card, CardContent, CardHeader } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchTransactions } from "@/lib/api"; // Import fetch function
import { Transaction as TransactionType } from "@/lib/types"; // Import Transaction type
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Static imports for icons (make sure these paths are correct)
import creditCardsIcon from "../../../public /cardIcon.svg";  
import paypalIcon from "../../../public /paypalIcon.svg";  
import transactionIcon from "../../../public /transactionIcon.svg";  

export function RecentTransactions() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTransactions(); // Fetch transactions data
        setTransactions(data); // Store data in state
      } catch (err) {
        setError("Failed to load transactions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Fetch data on component mount
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4 px-4 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
          <LoadingSkeleton className="h-4 w-16" />
        </div>
        <Card className="h-full w-full flex flex-col">
          <CardContent className="flex flex-col justify-between">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 mb-2">
                <div className="bg-gray-200 rounded-full animate-pulse" />
                <div className="space-y-1">
                  <div className="h-3 bg-gray-200 rounded animate-pulse" />
                  <div className="h-2 bg-gray-200 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4 px-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
          <LoadingSkeleton className="h-4 w-16" />
        </div>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4 pt-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
      </div>
      <Card className="h-full w-full flex flex-col">
        <CardContent className="flex flex-col justify-between">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors mb-2"
            >
              {/* Circle with background color */}
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-lg",
                  transaction.type === "deposit" ? "bg-[#FFF5D9]" : "",  
                  transaction.type === "withdrawal" ? "bg-[#E7EDFF]" : "",  
                  transaction.type === "transfer" ? "bg-[#DCFAF8]" : ""   
                )}
              >
                {/* Display the icon */}
                <Image
                  src={
                    transaction.type === "deposit"
                      ? creditCardsIcon
                      : transaction.type === "withdrawal"
                      ? paypalIcon
                      : transactionIcon
                  }
                  alt="icon"
                  width={24}
                  height={24}
                />
              </div>

              <div className="flex-1">
                <p className="font-medium text-gray-900">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>

              <div
                className={cn(
                  "font-medium",
                  transaction.amount > 0 ? "text-green-600" : "text-red-600"
                )}
              >
                {transaction.amount > 0 ? "+" : "-"}${Math.abs(transaction.amount)}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
