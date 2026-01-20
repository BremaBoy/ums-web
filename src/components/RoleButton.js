import React from 'react';
import { Colors, Layout, Shadows } from '../theme';

const RoleButton = ({ title, active, onClick }) => {
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = isDark ? Colors.dark : Colors.light;

  const styles = {
    button: {
      flex: 1,
      padding: '12px 0',
      borderRadius: Layout.borderRadius,
      border: `1px solid ${active ? (isDark ? theme.primary : theme.primary) : theme.border}`,
      backgroundColor: active ? theme.primary : theme.card,
      color: active ? '#FFF' : theme.text,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      boxShadow: Shadows.small,
      transition: 'all 0.2s',
      fontSize: '14px',
    }
  };

  return (
    <div style={styles.button} onClick={onClick}>
      {title}
    </div>
  );
};

export default RoleButton;
