import React, { useState } from 'react';
import { IoPersonOutline, IoTimeOutline, IoLocationOutline, IoVideocam, IoCalendarOutline, IoBookOutline } from 'react-icons/io5';
import LayoutComponent from '../components/Layout';
import { Colors, Layout, Shadows } from '../theme';

const Classes = () => {
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = isDark ? Colors.dark : Colors.light;
  const [selectedDay, setSelectedDay] = useState('Mon');

  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Expanded Data with more realistic details
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
        type: 'Lecture',
        color: '#2196F3',
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
        type: 'Lab',
        color: '#4CAF50',
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
        type: 'Seminar',
        color: '#FF9800',
      },
      {
        id: '4',
        code: 'CSC 405',
        title: 'Artificial Intelligence',
        lecturer: 'Dr. Mrs. Olabiyisi',
        time: '09:00 AM - 11:00 AM',
        venue: 'ICT Hall 2',
        day: 'Wed',
        isActive: false,
        type: 'Lecture',
        color: '#9C27B0',
      },
      {
        id: '5',
        code: 'CSC 407',
        title: 'Database Management II',
        lecturer: 'Mr. Adigun',
        time: '12:00 PM - 02:00 PM',
        venue: 'FST 101',
        day: 'Thu',
        isActive: false,
        type: 'Lecture',
        color: '#E91E63',
      },
      {
        id: '6',
        code: 'CSC 499',
        title: 'Final Year Project',
        lecturer: 'Supervisor',
        time: '10:00 AM - 01:00 PM',
        venue: 'Departmental Office',
        day: 'Fri',
        isActive: false,
        type: 'Meeting',
        color: '#607D8B',
      },
  ];

  const filteredClasses = CLASSES_DATA.filter(c => c.day === selectedDay);

  const styles = {
    header: {
      marginBottom: '32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    title: {
      fontSize: '32px',
      fontWeight: '800',
      color: theme.text,
      margin: 0,
    },
    subtitle: {
      fontSize: '16px',
      color: theme.textSecondary,
      fontWeight: '500',
    },
    daysScroll: {
      marginBottom: '32px',
      overflowX: 'auto',
      paddingBottom: '10px',
      // Hide scrollbar but keep functionality
      scrollbarWidth: 'none',
    },
    daysContainer: {
      display: 'flex',
      gap: '12px',
    },
    dayBtn: (active) => ({
      padding: '14px 24px',
      borderRadius: '16px',
      border: `1px solid ${active ? theme.primary : theme.border}`,
      backgroundColor: active ? theme.primary : theme.card,
      color: active ? '#FFF' : theme.textSecondary,
      cursor: 'pointer',
      minWidth: '80px',
      textAlign: 'center',
      fontWeight: active ? '700' : '600',
      fontSize: '15px',
      transition: 'all 0.3s ease',
      boxShadow: active ? Shadows.medium : 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
    }),
    listContent: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px',
    },
    classCard: {
      borderRadius: '24px',
      padding: '24px',
      border: `1px solid ${theme.border}`,
      backgroundColor: theme.card,
      boxShadow: Shadows.small,
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.2s',
      cursor: 'pointer',
    },
    classHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '16px',
    },
    codeBadge: (color) => ({
      padding: '6px 14px',
      borderRadius: '50px',
      backgroundColor: `${color}15`,
      color: color,
      fontSize: '13px',
      fontWeight: '800',
      letterSpacing: '0.5px',
    }),
    liveBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        borderRadius: '50px',
        backgroundColor: `${theme.error}15`,
        color: theme.error,
        fontSize: '12px',
        fontWeight: '800',
    },
    liveDot: {
        width: '6px',
        height: '6px',
        borderRadius: '3px',
        backgroundColor: theme.error,
        boxShadow: `0 0 8px ${theme.error}`,
    },
    classTitle: {
      fontSize: '20px',
      fontWeight: '800',
      color: theme.text,
      marginBottom: '20px',
      lineHeight: '1.4',
    },
    metaGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        marginBottom: '24px',
    },
    metaItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    metaLabel: {
        fontSize: '12px',
        color: theme.textSecondary,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    metaValue: {
        fontSize: '14px',
        color: theme.text,
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    joinBtn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      height: '52px',
      borderRadius: '16px',
      backgroundColor: theme.primary,
      color: '#FFF',
      fontSize: '15px',
      fontWeight: '700',
      border: 'none',
      cursor: 'pointer',
      width: '100%',
      boxShadow: Shadows.medium,
      transition: 'all 0.2s',
    },
    emptyState: {
      gridColumn: '1 / -1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
      gap: '20px',
      color: theme.textSecondary,
    },
  };

  return (
    <LayoutComponent>
      <div style={styles.header}>
        <h1 style={styles.title}>Academic Schedule</h1>
        <p style={styles.subtitle}>Manage your lectures, labs, and exams.</p>
      </div>

      <div style={styles.daysScroll}>
        <div style={styles.daysContainer}>
          {DAYS.map(day => (
            <button
              key={day}
              style={styles.dayBtn(selectedDay === day)}
              onClick={() => setSelectedDay(day)}
            >
              <span>{day}</span>
              {selectedDay === day && (
                  <div style={{
                      width: '4px', height: '4px', borderRadius: '2px', backgroundColor: '#FFF'
                  }}/>
              )}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.listContent}>
        {filteredClasses.length > 0 ? (
          filteredClasses.map(item => (
            <div 
                key={item.id} 
                style={styles.classCard}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = Shadows.medium;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = Shadows.small;
                }}
            >
              <div style={styles.classHeader}>
                <span style={styles.codeBadge(item.color)}>{item.code}</span>
                {item.isActive ? (
                  <div style={styles.liveBadge}>
                      <div style={styles.liveDot} />
                      LIVE
                  </div>
                ) : (
                    <span style={{ 
                        fontSize: '13px', fontWeight: '600', color: theme.textSecondary,
                        padding: '6px 12px', backgroundColor: theme.background, borderRadius: '20px'
                    }}>
                        {item.type}
                    </span>
                )}
              </div>
              
              <h3 style={styles.classTitle}>{item.title}</h3>
              
              <div style={styles.metaGrid}>
                  <div style={styles.metaItem}>
                      <span style={styles.metaLabel}>Time</span>
                      <div style={styles.metaValue}>
                          <IoTimeOutline color={item.color} />
                          {item.time}
                      </div>
                  </div>
                  <div style={styles.metaItem}>
                      <span style={styles.metaLabel}>Venue</span>
                      <div style={styles.metaValue}>
                          <IoLocationOutline color={item.color} />
                          {item.venue}
                      </div>
                  </div>
                  <div style={{ ...styles.metaItem, gridColumn: '1 / -1' }}>
                      <span style={styles.metaLabel}>Lecturer</span>
                      <div style={styles.metaValue}>
                          <IoPersonOutline color={item.color} />
                          {item.lecturer}
                      </div>
                  </div>
              </div>

              {item.isActive ? (
                <button style={styles.joinBtn}>
                  Join Online Class
                  <IoVideocam size={20} />
                </button>
              ) : (
                <button style={{
                    ...styles.joinBtn, 
                    backgroundColor: theme.background, 
                    color: theme.text,
                    border: `1px solid ${theme.border}`,
                    boxShadow: 'none'
                }}>
                    View Course Details
                    <IoBookOutline size={18} />
                </button>
              )}
            </div>
          ))
        ) : (
          <div style={styles.emptyState}>
             <div style={{
                 width: '80px', height: '80px', borderRadius: '40px',
                 backgroundColor: `${theme.primary}10`, color: theme.primary,
                 display: 'flex', justifyContent: 'center', alignItems: 'center',
                 fontSize: '32px'
             }}>
                 <IoCalendarOutline />
             </div>
             <p style={{ fontSize: '16px', fontWeight: '600' }}>No lectures scheduled for {selectedDay}.</p>
             <p style={{ fontSize: '14px', maxWidth: '300px', textAlign: 'center' }}>Enjoy your free time or catch up on your reading assignments!</p>
          </div>
        )}
      </div>
    </LayoutComponent>
  );
};

export default Classes;
