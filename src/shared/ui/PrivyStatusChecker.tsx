"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";

export default function PrivyStatusChecker() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  useEffect(() => {
    // Expose Privy status to global window object for console access
    if (typeof window !== 'undefined') {
      (window as any).privyStatus = () => {
        console.log('=== PRIVY STATUS ===');
        console.log('Ready:', ready);
        console.log('Authenticated:', authenticated);
        console.log('User:', user);
        console.log('===================');
        return {
          ready,
          authenticated,
          user,
          login,
          logout
        };
      };

      (window as any).privyLogin = login;
      (window as any).privyLogout = logout;
      
      console.log('Privy console functions available:');
      console.log('- privyStatus() - Check current status');
      console.log('- privyLogin() - Trigger login');
      console.log('- privyLogout() - Trigger logout');
    }
  }, [ready, authenticated, user, login, logout]);

  // This component renders nothing visible
  return null;
} 