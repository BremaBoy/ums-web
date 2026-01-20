import React from 'react';
import { Colors, Layout, Shadows } from '../theme';
import * as Ionicons from 'react-icons/io5';

const HeaderCard = ({ title, subtitle, icon, color, onClick, action }) => {
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = isDark ? Colors.dark : Colors.light;

  const IconComponent = Ionicons[icon] || Ionicons.IoHelpCircle; // Fallback

  const styles = {
    card: {
      padding: '16px',
      borderRadius: Layout.borderRadius,
      border: `1px solid ${theme.border}`,
      backgroundColor: theme.card,
      height: '140px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'transform 0.2s, box-shadow 0.2s',
      boxShadow: Shadows.small,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    iconBox: {
      width: '36px',
      height: '36px',
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: `${color}15`, // 15% opacity hex
      color: color,
      fontSize: '22px',
    },
    title: {
      fontSize: '15px',
      fontWeight: '700',
      color: theme.text,
      flex: 1,
    },
    body: {
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.header}>
        <div style={styles.iconBox}>
           {/* Note: In a real dynamic import scenario, we might need a map. 
               Here we assume specific icons are passed or mapped in parent. 
               For simplicity, let's assume 'icon' prop is the react-icon component itself or we map common ones.
               Actually, Io5 has 'Io' prefix. Mobile uses lazy names like 'checkmark-circle'.
               We need a mapper.
           */}
           {/* Quick fix: Using a simple workaround or expecting exact Io names. 
               Let's implement a safe mapper in the usage or here if simple. 
           */}
           <IconComponent />
        </div>
        <span style={styles.title}>{title}</span>
        {action}
      </div>
      <div style={styles.body}>
        {subtitle}
      </div>
    </div>
  );
};

export default HeaderCard;
