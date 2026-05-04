import React, { Component, type ReactNode } from "react";
import "./errorBoundary.css"

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean,
  errorInfo: string
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    errorInfo: "",
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorInfo: error.message,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("error:", error)
    console.error("error info:", errorInfo.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="message">
          <h1>Something went wrong</h1>
          <p>{this.state.errorInfo}</p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary