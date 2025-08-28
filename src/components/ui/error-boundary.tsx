"use client"

import React from "react"
import { ErrorOutline, Refresh } from "@mui/icons-material"
import { Button, Card, CardContent, Typography } from "@mui/material"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error, resetError }: { error?: Error; resetError: () => void }) {
  return (
    <Card sx={{ maxWidth: 400, margin: "0 auto", border: "1px solid #f44336", backgroundColor: "#fbe9e7" }}>
      <CardContent sx={{ textAlign: "center", padding: 4 }}>
        <ErrorOutline sx={{ fontSize: 48, color: "#f44336", marginBottom: 2 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#d32f2f", marginBottom: 1 }}>
          Something went wrong
        </Typography>
        <Typography variant="body2" sx={{ color: "#d32f2f", marginBottom: 2 }}>
          {error?.message || "An unexpected error occurred. Please try again."}
        </Typography>
        <Button
          onClick={resetError}
          variant="outlined"
          sx={{
            borderColor: "#f44336",
            color: "#f44336",
            "&:hover": { backgroundColor: "#ffebee" },
          }}
        >
          <Refresh sx={{ fontSize: 20, marginRight: 1 }} />
          Try Again
        </Button>
      </CardContent>
    </Card>
  )
}
