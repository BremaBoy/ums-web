import React from 'react';
import { Colors,Layout, Shadows } from '../theme';
import * as Ionicons from 'react-icons/io5';

const DashboardCard = ({ icon, title, subtitle, color, onClick }) => {
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = isDark ? Colors.dark : Colors.light;

  const IconComponent = Ionicons[icon] || Ionicons.IoHelpCircle;

  const styles = {
    card: {
      flex: 1,
      padding: '16px',
      borderRadius: Layout.borderRadius,
      border: `1px solid ${theme.border}`,
      backgroundColor: theme.card,
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      cursor: 'pointer',
      boxShadow: Shadows.small,
      position: 'relative',
    },
    iconContainer: {
      width: '44px',
      height: '44px',
      borderRadius: '12px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: `${color}20`,
      color: color,
      fontSize: '28px',
      flexShrink: 0,
    },
    content: {
      flex: 1,
      minWidth: 0, // Truncate text
    },
    title: {
      fontSize: '15px',
      fontWeight: '700',
      color: theme.text,
      margin: 0,
      marginBottom: '2px',
    },
    subtitle: {
      fontSize: '12px',
      color: theme.textSecondary,
      margin: 0,
      opacity: 0.8,
    },
    arrow: {
      color: theme.icon,
      fontSize: '20px',
      alignSelf: 'center',
    },
  };

  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.iconContainer}>
        <IconComponent />
      </div>
      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.subtitle}>{subtitle}</p>
      </div>
       <Ionicons.IoChevronForward style={styles.arrow} />
    </div>
  );
};

export default DashboardCard;
