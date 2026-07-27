import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import "./error-boundary.css";

interface ErrorBoundaryProps {
    readonly children: ReactNode;
}

interface ErrorBoundaryState {
    readonly hasError: boolean;
}

export class ErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // For a real application I'd log this somewhere useful.
        console.error("Unhandled rendering error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <main className="error-boundary">
                    <div className="error-boundary__content" role="alert">
                        <h1>Something went wrong</h1>
                        <p>The page could not be displayed. Reload it to try again.</p>
                        <button type="button" onClick={() => window.location.reload()}>
                            Reload page
                        </button>
                    </div>
                </main>
            );
        }

        return this.props.children;
    }
}