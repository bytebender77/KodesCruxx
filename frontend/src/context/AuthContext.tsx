import React, { createContext, useContext, useEffect, useState } from 'react';
import { useStackApp, useUser } from '@stackframe/react';

const API_BASE_URL = (import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://kodescruxx-backend-gnlc.onrender.com' : 'http://localhost:8000')).replace(/\/$/, '');

interface User {
    id: string;
    email: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    is_active?: boolean;
    is_verified?: boolean;
    auth_provider?: string;
}

interface AuthContextType {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const stackApp = useStackApp();
    const stackUser = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const loading = stackUser === undefined || isLoading;

    // Convert Neon Auth user to our User interface
    const user: User | null = stackUser ? {
        id: stackUser.id,
        email: stackUser.primaryEmail || '',
        first_name: stackUser.displayName?.split(' ')[0] || '',
        last_name: stackUser.displayName?.split(' ').slice(1).join(' ') || '',
        is_active: true,
        is_verified: stackUser.primaryEmailVerified || false,
        auth_provider: 'neon',
    } : null;

    // Sync Stack Auth user with backend and get JWT token
    useEffect(() => {
        const syncWithBackend = async () => {
            if (!stackUser || !stackUser.primaryEmail) {
                setIsLoading(false);
                return;
            }

            // Check if we already have a token
            const existingToken = localStorage.getItem('token');
            if (existingToken) {
                setIsLoading(false);
                return;
            }

            try {
                // Get Stack Auth access token
                const authJson = await stackApp.getAuthJson();
                const stackAuthToken = authJson?.accessToken;
                console.log('Stack Auth token retrieved:', stackAuthToken ? 'Yes' : 'No');

                // Try to sync with backend to get backend JWT
                const response = await fetch(`${API_BASE_URL}/auth/sync-stack-user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: stackUser.primaryEmail,
                        stack_user_id: stackUser.id,
                        display_name: stackUser.displayName || '',
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.access_token) {
                        localStorage.setItem('token', data.access_token);
                        console.log('Backend JWT stored successfully');
                    }
                } else {
                    console.error('Backend sync failed:', response.status, await response.text());
                    // Fallback: use Stack Auth token directly
                    if (stackAuthToken) {
                        localStorage.setItem('token', stackAuthToken);
                        console.log('Using Stack Auth token as fallback');
                    }
                }
            } catch (error) {
                console.error('Failed to sync with backend:', error);
                // Try to get and use Stack Auth token as fallback
                try {
                    const authJson = await stackApp.getAuthJson();
                    const stackAuthToken = authJson?.accessToken;
                    if (stackAuthToken) {
                        localStorage.setItem('token', stackAuthToken);
                        console.log('Stack Auth token stored as fallback');
                    }
                } catch (tokenError) {
                    console.error('Failed to get Stack Auth token:', tokenError);
                }
            } finally {
                setIsLoading(false);
            }
        };

        syncWithBackend();
    }, [stackUser, stackApp]);

    const login = (token: string) => {
        localStorage.setItem('token', token);
    };

    const logout = async () => {
        localStorage.removeItem('token');
        await stackApp.signOut();
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated: !!user,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
