import React from 'react';
import { Colors } from '../theme';

const LoadingSpinner = ({ fullScreen = false, size = 40, color }) => {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = isDark ? Colors.dark : Colors.light;

    const spinnerColor = color || theme.primary;

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: fullScreen ? '100vh' : 'auto',
            minHeight: fullScreen ? '100vh' : '200px',
        },
        spinner: {
            width: `${size}px`,
            height: `${size}px`,
            border: `4px solid ${spinnerColor}20`, // low opacity track
            borderTop: `4px solid ${spinnerColor}`,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
        },
    };

    return (
        <div style={styles.container}>
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
            <div style={styles.spinner} />
        </div>
    );
};

export default LoadingSpinner;
