import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = () => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (session) {
                const lastSignIn = new Date(session.user.last_sign_in_at).getTime();
                const now = new Date().getTime();
                const hoursSinceLogin = (now - lastSignIn) / (1000 * 60 * 60);

                if (hoursSinceLogin > 24) {
                    await supabase.auth.signOut();
                    setAuthenticated(false);
                    setLoading(false);
                    return;
                }
            }

            setAuthenticated(!!session);
            setLoading(false);
        };
        
        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setAuthenticated(!!session);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return <LoadingSpinner fullScreen />;
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
