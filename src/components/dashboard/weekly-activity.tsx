"use client"

import { Card, CardContent, CardHeader,  } from "@mui/material"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { useAppSelector } from "@/lib/store"
import { LoadingSkeleton } from "../ui/loading-skeleton"
import { useEffect, useState } from "react"
import { fetchWeeklyActivity } from "@/lib/api"
import {WeeklyActivity as WeeklyActivityType} from "../../lib/types"
export function WeeklyActivity() {
  const [weeklyActivity, setWeeklyActivity] = useState<WeeklyActivityType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeeklyActivity(); // Fetch transactions data
        setWeeklyActivity(data); // Store data in state
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
      <div className="space-y-4 px-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Weekly Activity</h2>
          {/* <LoadingSkeleton className="h-4 w-16" /> */}
        </div>
        <Card>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
        </CardContent>
      </Card>
      </div>
      
    )
  }

  return (
    <div className="space-y-4 px-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Weekly Activity</h2>
          {/* <LoadingSkeleton className="h-4 w-16" /> */}
        </div>

    <Card>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyActivity} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
              <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
              <Bar dataKey="deposit" fill="#3b82f6" name="Deposit" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="withdraw" fill="#1f2937" name="Withdraw" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  

    </div>
  )
}
