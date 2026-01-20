import React, { useState } from 'react';
import { IoPersonOutline, IoTimeOutline, IoLocationOutline, IoVideocam, IoCalendarOutline } from 'react-icons/io5';
import LayoutComponent from '../components/Layout';
import { Colors, Layout, Shadows } from '../theme';

const Classes = () => {
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = isDark ? Colors.dark : Colors.light;
  const [selectedDay, setSelectedDay] = useState('Mon');

  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const CLASSES_DATA = [
      {
        id: '1',
        code: 'CSC 401',
        title: 'Software Engineering II',
        lecturer: 'Dr. Afolabi',
        time: '08:00 AM - 10:00 AM',
        venue: 'FST Lecture Theater',
        day: 'Mon',
        isActive: true,
      },
      {
        id: '2',
        code: 'CSC 403',
        title: 'Computer Networks',
        lecturer: 'Prof. Adeboye',
        time: '11:00 AM - 01:00 PM',
        venue: 'Room 05, CS Dept',
        day: 'Mon',
        isActive: false,
      },
      {
        id: '3',
        code: 'GST 411',
        title: 'Entrepreneurship',
        lecturer: 'Engr. Benson',
        time: '02:00 PM - 04:00 PM',
        venue: 'Main Auditorium',
        day: 'Tue',
        isActive: false,
      },
  ];

  const filteredClasses = CLASSES_DATA.filter(c => c.day === selectedDay);

  const styles = {
    header: {
      marginBottom: '20px',
    },
    title: {
      fontSize: '28px',
      fontWeight: '800',
      color: theme.text,
      margin: 0,
    },
    subtitle: {
      fontSize: '14px',
      color: theme.textSecondary,
      marginTop: '4px',
    },
    daysScroll: {
      marginBottom: '20px',
      overflowX: 'auto',
      paddingBottom: '10px',
    },
    daysContainer: {
      display: 'flex',
      gap: '12px',
    },
    dayBtn: (active) => ({
      padding: '12px 20px',
      borderRadius: '20px',
      border: `1px solid ${theme.border}`,
      backgroundColor: active ? theme.primary : theme.card,
      color: active ? '#FFF' : theme.text,
      cursor: 'pointer',
      minWidth: '70px',
      textAlign: 'center',
      fontWeight: '700',
      fontSize: '14px',
      transition: 'all 0.2s',
    }),
    listContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    classCard: {
      borderRadius: Layout.borderRadius,
      padding: '20px',
      border: `1px solid ${theme.border}`,
      backgroundColor: theme.card,
      boxShadow: Shadows.small,
    },
    classHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
    },
    codeBadge: {
      padding: '4px 10px',
      borderRadius: '8px',
      backgroundColor: `${theme.primary}20`,
      color: theme.primary,
      fontSize: '12px',
      fontWeight: '800',
    },
    liveBadge: {
      padding: '2px 8px',
      borderRadius: '4px',
      backgroundColor: theme.success,
      color: '#FFF',
      fontSize: '10px',
      fontWeight: '900',
    },
    classTitle: {
      fontSize: '18px',
      fontWeight: '700',
      color: theme.text,
      marginBottom: '16px',
    },
    detailRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '8px',
      color: theme.text,
      opacity: 0.8,
      fontSize: '14px',
      fontWeight: '500',
    },
    joinBtn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      height: '48px',
      borderRadius: '12px',
      marginTop: '20px',
      backgroundColor: theme.primary,
      color: '#FFF',
      fontSize: '15px',
      fontWeight: '700',
      border: 'none',
      cursor: 'pointer',
      width: '100%',
    },
    emptyState: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '100px',
      gap: '16px',
      color: theme.icon,
    },
  };

  return (
    <LayoutComponent>
      <div style={styles.header}>
        <h1 style={styles.title}>Timetable</h1>
        <p style={styles.subtitle}>Your weekly academic schedule</p>
      </div>

      <div style={styles.daysScroll}>
        <div style={styles.daysContainer}>
          {DAYS.map(day => (
            <button
              key={day}
              style={styles.dayBtn(selectedDay === day)}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.listContent}>
        {filteredClasses.length > 0 ? (
          filteredClasses.map(item => (
            <div key={item.id} style={styles.classCard}>
              <div style={styles.classHeader}>
                <span style={styles.codeBadge}>{item.code}</span>
                {item.isActive && (
                  <span style={styles.liveBadge}>LIVE</span>
                )}
              </div>
              
              <h3 style={styles.classTitle}>{item.title}</h3>
              
              <div style={styles.detailRow}>
                <IoPersonOutline />
                <span>{item.lecturer}</span>
              </div>
              
              <div style={styles.detailRow}>
                <IoTimeOutline />
                <span>{item.time}</span>
              </div>

              <div style={styles.detailRow}>
                <IoLocationOutline />
                <span>{item.venue}</span>
              </div>

              {item.isActive && (
                <button style={styles.joinBtn}>
                  Join Online Class
                  <IoVideocam />
                </button>
              )}
            </div>
          ))
        ) : (
          <div style={styles.emptyState}>
             <IoCalendarOutline size={64} style={{ opacity: 0.3 }} />
             <p>No classes scheduled for this day</p>
          </div>
        )}
      </div>
    </LayoutComponent>
  );
};

export default Classes;
