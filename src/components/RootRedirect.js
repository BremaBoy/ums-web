import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import LoadingSpinner from './LoadingSpinner';

const RootRedirect = () => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setAuthenticated(!!session);
            setLoading(false);
        };
        checkAuth();
    }, []);

    if (loading) {
        return <LoadingSpinner fullScreen />;
    }

    return authenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

export default RootRedirect;
