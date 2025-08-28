"use client"

import type React from "react"
import { useEffect } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { useAppSelector, useAppDispatch } from "@/lib/store"
import { fetchUserProfile } from "@/lib/slices/userSlice"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { NetworkStatus } from "@/components/ui/error-display"
import { ToastProvider } from "@/components/ui/toast"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const dispatch = useAppDispatch()
  const { sidebarOpen } = useAppSelector((state) => state.ui)

  useEffect(() => {
    dispatch(fetchUserProfile())
  }, [dispatch])

  return (
    <ToastProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50">
          <NetworkStatus />
          <Sidebar />

          {/* Main content area */}
          <div className={cn("transition-all duration-300 ease-in-out", sidebarOpen ? "ml-64" : "ml-0")}>
            <Header />

            {/* Page content */}
            <main className="p-6">
              <ErrorBoundary>{children}</ErrorBoundary>
            </main>
          </div>

          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => dispatch({ type: "ui/toggleSidebar" })}
            />
          )}
        </div>
      </ErrorBoundary>
    </ToastProvider>
  )
}
