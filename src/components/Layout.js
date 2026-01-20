import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IoHome, IoBook, IoCard, IoMedal, IoPerson, IoLogOut } from 'react-icons/io5';
import { Colors } from '../theme';
import { supabase } from '../lib/supabase';

const LayoutComponent = ({ children }) => {
  const navigate = useNavigate();
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = isDark ? Colors.dark : Colors.light;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: IoHome },
    { name: 'Classes', path: '/classes', icon: IoBook },
    { name: 'Payments', path: '/payments', icon: IoCard },
    { name: 'Results', path: '/results', icon: IoMedal },
    { name: 'Profile', path: '/profile', icon: IoPerson },
  ];

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: theme.background,
    },
    sidebar: {
      width: '260px',
      backgroundColor: theme.card,
      borderRight: `1px solid ${theme.border}`,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      height: '100vh',
      left: 0,
      top: 0,
      zIndex: 100,
      // Hide on mobile (can add media query logic later if needed)
    },
    logo: {
      fontSize: '24px',
      fontWeight: '800',
      color: theme.primary,
      marginBottom: '40px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    logoImg: {
       height: '32px',
       width: '32px',
    },
    nav: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      flex: 1,
    },
    navItem: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      borderRadius: '12px',
      fontSize: '15px',
      fontWeight: '600',
      color: isActive ? (isDark ? '#FFF' : '#FFF') : theme.textSecondary,
      backgroundColor: isActive ? theme.primary : 'transparent',
      textDecoration: 'none',
      transition: 'all 0.2s',
      cursor: 'pointer',
    }),
    icon: {
      marginRight: '12px',
      fontSize: '20px',
    },
    main: {
      flex: 1,
      marginLeft: '260px', // Offset sidebar
      padding: '32px',
      maxWidth: '1200px', // Limit content width
      width: '100%',
    },
    logoutBtn: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      borderRadius: '12px',
      fontSize: '15px',
      fontWeight: '600',
      color: theme.error,
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      marginTop: 'auto',
    },
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          <img src="/logo.png" alt="" style={styles.logoImg} onError={(e) => e.target.style.display='none'}/>
          LASU UMS
        </div>
        <nav style={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.path}
              style={({ isActive }) => styles.navItem(isActive)}
            >
              <item.icon style={styles.icon} />
              {item.name}
            </NavLink>
          ))}
        </nav>
        <button style={styles.logoutBtn} onClick={handleLogout}>
           <IoLogOut style={styles.icon} />
           Logout
        </button>
      </div>
      <main style={styles.main}>
        {children}
      </main>
    </div>
  );
};

export default LayoutComponent;
