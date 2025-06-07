import React from "react";
import { Navigate } from "react-router";
import "./css/tokens.css"
import "./css/general.css"

interface IProtectedRouteProps {
    authToken: string;
    children: React.ReactNode;
}

export function ProtectedRoute(props: IProtectedRouteProps) {
    if (!props.authToken) {
        return <Navigate to="/login" replace />
    }
    return props.children;
}