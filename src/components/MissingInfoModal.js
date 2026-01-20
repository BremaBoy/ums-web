import React, { useState } from 'react';
import { IoWarning } from 'react-icons/io5';
import { Colors, Shadows } from '../theme';
import { supabase } from '../lib/supabase';

const MissingInfoModal = ({ isOpen, missingFields, onSave, onClose }) => {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = isDark ? Colors.dark : Colors.light;

    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Get current user
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('No user found');

            // Update profile (use upsert to handle missing rows)
            const { error } = await supabase
                .from('profiles')
                .upsert({ 
                    id: user.id,
                    ...formData,
                    updated_at: new Date()
                });

            if (error) throw error;

            alert('Profile updated successfully!');
            onSave(formData);
        } catch (error) {
            console.error(error);
            alert('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const getLabel = (field) => {
        if (field === 'phone_number') return 'Phone Number';
        if (field === 'level') return 'Level';
        return field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    const styles = {
        overlay: {
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1000,
        },
        modal: {
            width: '90%', maxWidth: '400px',
            backgroundColor: theme.background,
            borderRadius: '24px',
            padding: '24px',
            boxShadow: Shadows.medium,
            position: 'relative',
        },
        header: {
            textAlign: 'center',
            marginBottom: '20px',
        },
        title: {
            fontSize: '20px', fontWeight: '800', color: theme.text,
            marginBottom: '8px',
        },
        subtitle: {
            fontSize: '14px', color: theme.textSecondary,
        },
        field: {
            marginBottom: '16px',
        },
        label: {
            display: 'block', fontSize: '14px', fontWeight: '600',
            marginBottom: '8px', color: theme.text,
        },
        input: {
            width: '100%', height: '48px',
            padding: '0 16px',
            borderRadius: '12px',
            border: `1px solid ${theme.border}`,
            backgroundColor: theme.card,
            color: theme.text,
            fontSize: '16px',
            outline: 'none',
        },
        saveBtn: {
            width: '100%', height: '50px',
            borderRadius: '12px',
            backgroundColor: theme.primary,
            color: '#FFF',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            fontSize: '16px', fontWeight: '700',
            border: 'none', cursor: 'pointer',
            marginTop: '10px',
        },
        icon: {
            fontSize: '48px', color: theme.warning, marginBottom: '16px',
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <IoWarning style={styles.icon} />
                    <h2 style={styles.title}>Update Required</h2>
                    <p style={styles.subtitle}>Please update your profile information to continue.</p>
                </div>

                {missingFields.map(field => (
                    <div key={field} style={styles.field}>
                        <label style={styles.label}>{getLabel(field)}</label>
                        <input
                            style={styles.input}
                            placeholder={`Enter ${getLabel(field)}`}
                            onChange={(e) => handleChange(field, e.target.value)}
                        />
                    </div>
                ))}

                <button 
                    style={{...styles.saveBtn, opacity: loading ? 0.7 : 1}}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save & Continue'}
                </button>
            </div>
        </div>
    );
};

export default MissingInfoModal;
