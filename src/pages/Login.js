import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCardOutline, IoLockClosedOutline } from 'react-icons/io5';
import RoleButton from '../components/RoleButton';
import { Colors, Layout, Shadows } from '../theme';

import { supabase } from '../lib/supabase';

const Login = () => {
  const navigate = useNavigate();
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = isDark ? Colors.dark : Colors.light;

  const [role, setRole] = useState('Student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard');
      }
    });
  }, [navigate]);

  const handleLogin = async () => {
    if (!identifier || !password) {
      alert(`Please enter your ${getIdLabel()} and password`);
      return;
    }

    setLoading(true);
    try {
      // 1. Lookup email
      const { data: email, error: lookupError } = await supabase
        .rpc('get_email_by_identity', { identity_input: identifier });

      if (lookupError) throw lookupError;
      if (!email) {
        alert('User not found. Please check your ID.');
        return;
      }

      // 2. Sign in
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      navigate('/dashboard');

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getIdLabel = () => {
    if (role === 'Student') return 'Matric Number';
    return 'Staff ID';
  };

  const getPlaceholder = () => {
    if (role === 'Student') return 'e.g. 170591001';
    return 'e.g. STF/001';
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
      maxWidth: '480px', // Mobile-like width
      width: '100%',
      margin: '0 auto',
    },
    header: {
      marginBottom: '40px',
      textAlign: 'center',
    },
    logo: {
      height: '100px',
      width: '100px',
      margin: '0 auto 20px',
      display: 'block',
    },
    welcomeText: {
      fontSize: '28px',
      fontWeight: '800',
      marginBottom: '8px',
      color: theme.text,
    },
    subtitle: {
      fontSize: '16px',
      lineHeight: '1.5',
      color: theme.text,
      opacity: 0.6,
    },
    roleSelector: {
      marginBottom: '24px',
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '8px',
      display: 'block',
      color: theme.text,
    },
    roleButtons: {
      display: 'flex',
      gap: '10px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    inputContainer: {},
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
      borderRadius: '8px', // Inner radius
      border: 'none',
      background: 'transparent',
      fontSize: '16px',
      fontWeight: '500',
      color: theme.text,
      outline: 'none',
      height: '100%',
    },
    forgotBtn: {
      alignSelf: 'flex-end',
      background: 'none',
      padding: 0,
    },
    forgotText: {
      fontWeight: '600',
      color: theme.primary,
      fontSize: '14px',
    },
    loginBtn: {
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
      transition: 'opacity 0.2s',
    },
    footer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '40px',
      gap: '5px',
    },
    footerText: {
      fontSize: '15px',
      color: theme.textSecondary,
    },
    signUpText: {
      fontSize: '15px',
      fontWeight: '700',
      color: theme.primary,
      background: 'none',
      padding: 0,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
            {/* Placeholder for logo - assuming it's in public/assets or similar, check usage in mobile */}
           <img src="/assets/lasu-logo.png" alt="LASU Logo" style={styles.logo} onError={(e) => { e.target.style.display = 'none'; }}/> 
          <h1 style={styles.welcomeText}>Welcome Back!</h1>
          <p style={styles.subtitle}>Sign in to continue to LASU Smart Campus</p>
        </div>

        <div style={styles.roleSelector}>
          <span style={styles.label}>Login as:</span>
          <div style={styles.roleButtons}>
            <RoleButton title="Student" active={role === 'Student'} onClick={() => setRole('Student')} />
            <RoleButton title="Staff" active={role === 'Staff'} onClick={() => setRole('Staff')} />
          </div>
        </div>

        <div style={styles.form}>
          <div style={styles.inputContainer}>
            <label style={styles.label}>{getIdLabel()}</label>
            <div style={styles.inputWrapper}>
              <IoCardOutline style={styles.inputIcon} />
              <input
                style={styles.input}
                placeholder={getPlaceholder()}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
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
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button style={styles.forgotBtn} onClick={() => navigate('/forgot-password')}>
            <span style={styles.forgotText}>Forgot Password?</span>
          </button>

          <button 
            style={{...styles.loginBtn, opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer'}} 
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <div style={styles.footer}>
          <span style={styles.footerText}>New user?</span>
          <button style={styles.signUpText} onClick={() => navigate('/signup')}>
             Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
