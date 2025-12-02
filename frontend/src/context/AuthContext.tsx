import React, { createContext, useContext } from 'react';
import { useStackApp, useUser } from '@stackframe/react';

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
    login: (token: string) => void; // Kept for backward compatibility, but Neon Auth handles this
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const stackApp = useStackApp();
    const stackUser = useUser();
    const loading = stackUser === undefined; // undefined means loading

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

    const login = (token: string) => {
        // Neon Auth handles login automatically, but we keep this for backward compatibility
        // Token is stored automatically by Neon Auth
        console.log('Login handled by Neon Auth');
    };

    const logout = async () => {
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
