import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack, IoMailOutline, IoCheckmarkCircle } from 'react-icons/io5';
import { Colors, Layout, Shadows } from '../theme';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = isDark ? Colors.dark : Colors.light;

  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      alert('Please enter your email');
      return;
    }

    setLoading(true);
    // Mock functionality - simulate network request
    setTimeout(() => {
        setIsSent(true);
        setLoading(false);
    }, 1500);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: theme.background,
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
    },
    content: {
      maxWidth: '480px',
      width: '100%',
      margin: '0 auto',
      paddingTop: '40px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
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
      alignSelf: 'flex-start',
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
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
    inputContainer: {},
    label: {
      fontSize: '14px',
      fontWeight: '700',
      marginBottom: '8px',
      display: 'block',
      color: theme.text,
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
      width: '100%',
    },
    resetBtn: {
      height: '56px',
      borderRadius: Layout.borderRadius,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.primary,
      color: '#FFF',
      fontSize: '17px',
      fontWeight: '700',
      boxShadow: Shadows.medium,
      cursor: 'pointer',
      border: 'none',
      width: '100%',
    },
    successContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '40px',
    },
    iconSuccess: {
        width: '140px',
        height: '140px',
        borderRadius: '70px',
        backgroundColor: `${theme.success}20`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '32px',
        color: theme.success,
        fontSize: '80px',
    },
    successTitle: {
        fontSize: '28px',
        fontWeight: '800',
        marginBottom: '8px',
        color: theme.text,
        textAlign: 'center',
    },
    successSubtitle: {
        fontSize: '16px',
        color: theme.textSecondary,
        textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
            <IoArrowBack size={24} />
        </button>

        {!isSent ? (
          <>
            <div style={styles.header}>
              <h1 style={styles.title}>Reset Password</h1>
              <p style={styles.subtitle}>
                Enter your university email address and we'll send you instructions to reset your password.
              </p>
            </div>

            <div style={styles.form}>
              <div style={styles.inputContainer}>
                <label style={styles.label}>University Email</label>
                <div style={styles.inputWrapper}>
                  <IoMailOutline style={styles.inputIcon} />
                  <input
                    style={styles.input}
                    placeholder="email@lasu.edu.ng"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button 
                style={{...styles.resetBtn, opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer'}} 
                onClick={handleReset}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Instructions'}
              </button>
            </div>
          </>
        ) : (
          <div style={styles.successContainer}>
            <div style={styles.iconSuccess}>
              <IoCheckmarkCircle />
            </div>
            <h1 style={styles.successTitle}>Check Your Email</h1>
            <p style={styles.successSubtitle}>
              We've sent password reset instructions to {email}
            </p>
            <button 
              style={{...styles.resetBtn, marginTop: '32px'}}
              onClick={() => navigate('/login')}
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
