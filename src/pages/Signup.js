import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack, IoPersonOutline, IoCardOutline, IoMailOutline, IoLockClosedOutline } from 'react-icons/io5';
import RoleButton from '../components/RoleButton';
import { Colors, Layout, Shadows } from '../theme';
import { supabase } from '../lib/supabase';

const Signup = () => {
    const navigate = useNavigate();
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = isDark ? Colors.dark : Colors.light;

    const [role, setRole] = useState('Student');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [id, setId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [level, setLevel] = useState('100'); // Default level
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!firstName || !lastName || !id || !email || !password) {
            alert('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            // 1. Sign up with Supabase Auth (Pass metadata for the Trigger)
            const { data: { user, session }, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        first_name: firstName,
                        last_name: lastName,
                        role: role,
                        [role === 'Student' ? 'matric_no' : 'staff_id']: id,
                        phone_number: phoneNumber,
                        level: role === 'Student' ? level : null,
                    }
                }
            });

            if (signUpError) throw signUpError;
            if (!user) throw new Error('No user created');

            // 2. Profile creation is now handled by the Database Trigger

            // 3. Check session for auto-login (if email verification is disabled)
            if (session) {
                alert('Account created successfully!');
                navigate('/dashboard');
            } else {
                alert('Account created! Please check your email to verify.');
                navigate('/login');
            }

        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        container: {
            minHeight: '100vh',
            backgroundColor: theme.background,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '20px',
        },
        content: {
            maxWidth: '480px',
            width: '100%',
            margin: '0 auto',
            paddingTop: '20px',
        },
        backBtn: {
            marginBottom: '20px',
            background: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            color: theme.text,
            border: 'none',
        },
        header: {
            marginBottom: '32px',
        },
        title: {
            fontSize: '28px',
            fontWeight: '800',
            marginBottom: '8px',
            color: theme.text,
        },
        subtitle: {
            fontSize: '16px',
            lineHeight: '1.5',
            color: theme.textSecondary,
        },
        roleSelector: {
            marginBottom: '24px',
        },
        label: {
            fontSize: '14px',
            fontWeight: '700',
            marginBottom: '8px',
            display: 'block',
            color: theme.text,
        },
        roleButtons: {
            display: 'flex',
            gap: '12px',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
        },
        nameRow: {
            display: 'flex',
            gap: '12px',
        },
        inputContainer: {
            flex: 1,
        },
        inputWrapper: {
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            height: '56px',
            borderRadius: Layout.borderRadius,
            border: `1px solid ${theme.border}`,
            backgroundColor: theme.card,
        },
        inputIcon: {
            marginRight: '12px',
            fontSize: '20px',
            color: theme.icon,
        },
        input: {
            flex: 1,
            border: 'none',
            background: 'transparent',
            fontSize: '16px',
            fontWeight: '500',
            color: theme.text,
            outline: 'none',
            height: '100%',
            width: '100%', // Ensure it takes full width of container
        },
        signupBtn: {
            height: '56px',
            borderRadius: Layout.borderRadius,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10px',
            backgroundColor: theme.primary,
            color: '#FFF',
            fontSize: '18px',
            fontWeight: '700',
            boxShadow: Shadows.medium,
            cursor: 'pointer',
             border: 'none',
        },
        footer: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '32px',
            paddingBottom: '40px',
            gap: '5px',
        },
        footerText: {
            fontSize: '15px',
            color: theme.textSecondary,
        },
        loginLink: {
            fontSize: '15px',
            fontWeight: '700',
            color: theme.primary,
            background: 'none',
            padding: 0,
            border: 'none',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <button style={styles.backBtn} onClick={() => navigate(-1)}>
                    <IoArrowBack size={24} />
                </button>

                <div style={styles.header}>
                    <img src="/assets/lasu-logo.png" alt="LASU Logo" style={{ height: '80px', width: '80px', margin: '0 auto 16px', display: 'block' }} />
                    <h1 style={styles.title}>Create Account</h1>
                    <p style={styles.subtitle}>Join the LASU Smart Campus community</p>
                </div>

                <div style={styles.roleSelector}>
                    <span style={styles.label}>Joining as:</span>
                    <div style={styles.roleButtons}>
                        <RoleButton title="Student" active={role === 'Student'} onClick={() => setRole('Student')} />
                        <RoleButton title="Staff" active={role === 'Staff'} onClick={() => setRole('Staff')} />
                    </div>
                </div>

                <div style={styles.form}>
                    <div style={styles.nameRow}>
                        <div style={styles.inputContainer}>
                            <label style={styles.label}>First Name</label>
                            <div style={styles.inputWrapper}>
                                <IoPersonOutline style={styles.inputIcon} />
                                <input
                                    style={styles.input}
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div style={styles.inputContainer}>
                            <label style={styles.label}>Last Name</label>
                            <div style={styles.inputWrapper}>
                                <input
                                    style={styles.input}
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={styles.inputContainer}>
                        <label style={styles.label}>{role === 'Student' ? 'Matric Number' : 'Staff ID'}</label>
                        <div style={styles.inputWrapper}>
                            <IoCardOutline style={styles.inputIcon} />
                            <input
                                style={styles.input}
                                placeholder={`Enter ${role === 'Student' ? 'Matric Number' : 'Staff ID'}`}
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </div>
                    </div>

                    <div style={styles.inputContainer}>
                        <label style={styles.label}>Phone Number</label>
                        <div style={styles.inputWrapper}>
                            <IoPersonOutline style={styles.inputIcon} />
                            <input
                                style={styles.input}
                                placeholder="08012345678"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </div>

                    {role === 'Student' && (
                        <div style={styles.inputContainer}>
                            <label style={styles.label}>Level</label>
                            <div style={styles.inputWrapper}>
                                <IoPersonOutline style={styles.inputIcon} />
                                <select
                                    style={{...styles.input, background: isDark ? theme.card : 'transparent'}}
                                    value={level}
                                    onChange={(e) => setLevel(e.target.value)}
                                >
                                    <option value="100">100 Level</option>
                                    <option value="200">200 Level</option>
                                    <option value="300">300 Level</option>
                                    <option value="400">400 Level</option>
                                    <option value="500">500 Level</option>
                                </select>
                            </div>
                        </div>
                    )}

                    <div style={styles.inputContainer}>
                        <label style={styles.label}>University Email</label>
                        <div style={styles.inputWrapper}>
                            <IoMailOutline style={styles.inputIcon} />
                            <input
                                style={styles.input}
                                type="email"
                                placeholder="email@lasu.edu.ng"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div style={styles.inputContainer}>
                        <label style={styles.label}>Password</label>
                        <div style={styles.inputWrapper}>
                            <IoLockClosedOutline style={styles.inputIcon} />
                            <input
                                style={styles.input}
                                type="password"
                                placeholder="Create Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button 
                        style={{...styles.signupBtn, opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer'}} 
                        onClick={handleSignup}
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </div>

                <div style={styles.footer}>
                    <span style={styles.footerText}>Already have an account?</span>
                    <button style={styles.loginLink} onClick={() => navigate('/login')}>
                         Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
