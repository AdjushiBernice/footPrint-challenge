"use client"

import React from "react"
import { WifiOff, ErrorOutline, Refresh } from "@mui/icons-material"
import { Button, Card, CardContent, Typography } from "@mui/material"

interface ErrorDisplayProps {
  error: string | null
  onRetry?: () => void
  variant?: "default" | "network" | "inline"
  className?: string
}

export function ErrorDisplay({ error, onRetry, variant = "default", className }: ErrorDisplayProps) {
  if (!error) return null

  const isNetworkError = error.toLowerCase().includes("network") || error.toLowerCase().includes("fetch")

  if (variant === "inline") {
    return (
      <div className={`flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg ${className}`}>
        <ErrorOutline className="w-4 h-4 text-red-500 flex-shrink-0" />
        <Typography variant="body2" className="text-sm text-red-700 flex-1">
          {error}
        </Typography>
        {onRetry && (
          <Button
            size="small"
            variant="outlined"
            onClick={onRetry}
            sx={{
              borderColor: "red",
              color: "red",
              "&:hover": { backgroundColor: "#fce4e4" },
            }}
          >
            <Refresh sx={{ fontSize: 16, marginRight: 1 }} />
            Retry
          </Button>
        )}
      </div>
    )
  }

  return (
    <Card sx={{ border: "1px solid #f44336", backgroundColor: "#fbe9e7", margin: 2 }}>
      <CardContent sx={{ textAlign: "center", padding: 4 }}>
        {isNetworkError ? (
          <WifiOff sx={{ fontSize: 48, color: "#f44336", marginBottom: 2 }} />
        ) : (
          <ErrorOutline sx={{ fontSize: 48, color: "#f44336", marginBottom: 2 }} />
        )}

        <Typography variant="h6" sx={{ fontWeight: 600, color: "#d32f2f", marginBottom: 1 }}>
          {isNetworkError ? "Connection Error" : "Error"}
        </Typography>

        <Typography variant="body2" sx={{ color: "#d32f2f", marginBottom: 2 }}>
          {error}
        </Typography>

        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outlined"
            sx={{
              borderColor: "#f44336",
              color: "#f44336",
              "&:hover": { backgroundColor: "#fce4e4" },
            }}
          >
            <Refresh sx={{ fontSize: 20, marginRight: 1 }} />
            {isNetworkError ? "Reconnect" : "Try Again"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export function NetworkStatus() {
  const [isOnline, setIsOnline] = React.useState(true)

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white p-2 text-center text-sm">
      <div className="flex items-center justify-center gap-2">
        <WifiOff sx={{ fontSize: 20 }} />
        You are currently offline. Some features may not work properly.
      </div>
    </div>
  )
}
