"use client";

import { Card, CardContent } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useAppSelector } from "@/lib/store";
import {fetchExpenseStats} from "@/lib/api"
import { useEffect, useState } from "react";
import { ExpenseCategory as ExpenseCategoryType } from "@/lib/types";
export function ExpenseStatistics() {
  const [expenseStatistics, setExpenseStatistics] = useState<ExpenseCategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchExpenseStats(); // Fetch transactions data
        setExpenseStatistics(data); // Store data in state
      } catch (err) {
        setError("Failed to load transactions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Fetch data on component mount
  }, []);

  
  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4 px-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Expense Statistics</h2>
        </div>
        <Card>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Custom label to display both percentage and category name inside the pie segment
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5; // Positioning in between inner and outer radius
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Position the labels inside each segment
    return (
      <g>
        {/* Category name inside the segment */}
        <text
          x={x}
          y={y - 10} // Adjust vertical positioning
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={12}
          fontWeight="bold"
        >
          {expenseStatistics[index].name}
        </text>
        {/* Percentage inside the segment */}
        <text
          x={x}
          y={y + 10} // Adjust vertical positioning
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={12}
          fontWeight="bold"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </g>
    );
  };

  return (
    <div className="space-y-4 px-4 pt-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Expense Statistics</h2>
      </div>
      <Card>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                {/* Pie Chart component */}
                <Pie
                  data={expenseStatistics}
                  cx="50%"  // Horizontal center of the pie chart
                  cy="50%"  // Vertical center of the pie chart
                  labelLine={false}  // Disable lines to labels
                  label={renderCustomLabel}  // Custom label for category and percentage
                  outerRadius={90}  // Size of the pie chart
                  fill="#343C6A"
                  dataKey="percentage"  // Percentage data
                  paddingAngle={5}  // Space between pie sections
                >
                  {expenseStatistics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
