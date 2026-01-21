import React, { useState } from 'react';
import { IoDownloadOutline, IoStatsChart, IoTrendingUp, IoTrendingDown, IoChevronDown, IoChevronUp, IoSchoolOutline } from 'react-icons/io5';
import LayoutComponent from '../components/Layout';
import { Colors, Layout, Shadows } from '../theme';

const Results = () => {
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = isDark ? Colors.dark : Colors.light;

  const [expandedSemester, setExpandedSemester] = useState('harmattan-2024');

  const SEMESTER_DATA = [
    {
        id: 'harmattan-2024',
        title: '2024/2025 Harmattan Semester',
        gpa: '4.50',
        tup: '16', // Total Units Passed
        status: 'Good Standing',
        courses: [
            { code: 'CSC 401', title: 'Software Engineering II', units: 3, score: 75, grade: 'A', points: 15 },
            { code: 'CSC 403', title: 'Computer Networks', units: 3, score: 68, grade: 'B', points: 12 },
            { code: 'CSC 405', title: 'Artificial Intelligence', units: 3, score: 82, grade: 'A', points: 15 },
            { code: 'CSC 407', title: 'Database Management II', units: 2, score: 71, grade: 'A', points: 10 },
            { code: 'GST 411', title: 'Entrepreneurship', units: 2, score: 64, grade: 'B', points: 8 },
            { code: 'MTH 304', title: 'Numerical Analysis', units: 3, score: 58, grade: 'C', points: 9 },
        ]
    },
    {
        id: 'rain-2023',
        title: '2023/2024 Rain Semester',
        gpa: '4.18',
        tup: '18',
        status: 'Good Standing',
        courses: [
             { code: 'CSC 302', title: 'Operating Systems', units: 3, score: 70, grade: 'A', points: 15 },
             { code: 'CSC 304', title: 'Automata Theory', units: 3, score: 62, grade: 'B', points: 12 },
             // ... more data
        ]
    }
  ];

  const StatCard = ({ label, value, icon: Icon, color, trend }) => (
      <div style={{
          flex: 1,
          padding: '24px',
          borderRadius: Layout.borderRadius,
          backgroundColor: theme.card,
          border: `1px solid ${theme.border}`,
          boxShadow: Shadows.small,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          position: 'relative',
          overflow: 'hidden',
      }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <span style={{ fontSize: '13px', fontWeight: '600', color: theme.textSecondary, textTransform: 'uppercase' }}>{label}</span>
             <div style={{ 
                 width: '32px', height: '32px', borderRadius: '16px', 
                 backgroundColor: `${color}15`, color: color,
                 display: 'flex', justifyContent: 'center', alignItems: 'center'
             }}>
                 <Icon size={18} />
             </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              <span style={{ fontSize: '32px', fontWeight: '800', color: theme.text, lineHeight: 1 }}>{value}</span>
              {trend && (
                  <span style={{ 
                      fontSize: '12px', fontWeight: '700', 
                      color: trend === 'up' ? theme.success : theme.error,
                      display: 'flex', alignItems: 'center', marginBottom: '4px'
                  }}>
                      {trend === 'up' ? <IoTrendingUp /> : <IoTrendingDown />}
                      {trend === 'up' ? '+0.15' : '-0.05'}
                  </span>
              )}
          </div>
          {/* Decorative background circle */}
          <div style={{
              position: 'absolute', right: '-20px', bottom: '-20px',
              width: '100px', height: '100px', borderRadius: '50%',
              backgroundColor: color, opacity: 0.05,
          }} />
      </div>
  );

  const styles = {
    header: { marginBottom: '32px' },
    title: { fontSize: '32px', fontWeight: '800', color: theme.text, margin: 0 },
    subtitle: { fontSize: '16px', color: theme.textSecondary, fontWeight: '500', marginTop: '4px' },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '40px',
    },
    semesterCard: {
        marginBottom: '20px',
        borderRadius: Layout.borderRadius,
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.card,
        overflow: 'hidden',
        boxShadow: Shadows.small,
    },
    semesterHeader: (isOpen) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px',
        cursor: 'pointer',
        backgroundColor: isOpen ? (isDark ? `${theme.primary}10` : `${theme.primary}05`) : 'transparent',
        transition: 'background-color 0.2s',
    }),
    semesterTitle: { fontSize: '16px', fontWeight: '700', color: theme.text },
    semesterMeta: { display: 'flex', gap: '16px', alignItems: 'center' },
    gpaBadge: {
        padding: '6px 12px',
        borderRadius: '8px',
        backgroundColor: theme.primary,
        color: '#FFF',
        fontWeight: '800',
        fontSize: '14px',
    },
    tableContainer: {
        borderTop: `1px solid ${theme.border}`,
        display: expandedSemester ? 'block' : 'none',
        padding: '8px 0',
    },
    tableHeader: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
        padding: '12px 24px',
        borderBottom: `1px solid ${theme.border}`,
        color: theme.textSecondary,
        fontSize: '12px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    tableRow: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
        padding: '16px 24px',
        borderBottom: `1px solid ${theme.border}`,
        alignItems: 'center',
        fontSize: '14px',
        color: theme.text,
        transition: 'background-color 0.1s',
    },
    gradeBadge: (grade) => {
        let color = theme.success;
        if (grade === 'C') color = theme.warning;
        if (grade === 'F') color = theme.error;
        return {
            fontWeight: '800',
            color: color,
        };
    },
    courseTitle: { fontSize: '12px', color: theme.textSecondary, display: 'block' },
    courseCode: { fontWeight: '700', display: 'block' },
    
    downloadBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        height: '52px',
        borderRadius: '16px',
        border: `2px solid ${theme.primary}`,
        backgroundColor: 'transparent',
        color: theme.primary,
        fontWeight: '700',
        fontSize: '15px',
        marginTop: '32px',
        width: '100%',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
  };

  return (
    <LayoutComponent>
      <div style={styles.header}>
        <h1 style={styles.title}>Academic Results</h1>
        <p style={styles.subtitle}>Track your comprehensive academic performance</p>
      </div>

      <div style={styles.statsGrid}>
        <StatCard label="CGPA" value="4.25" icon={IoSchoolOutline} color={theme.accent} trend="up" />
        <StatCard label="Total Units" value="84" icon={IoStatsChart} color={theme.primary} />
        <StatCard label="Best Grade" value="A" icon={IoTrendingUp} color={theme.success} />
      </div>

      <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: theme.text, marginBottom: '16px' }}>Semester Breakdown</h2>
          
          {SEMESTER_DATA.map(sem => {
              const isOpen = expandedSemester === sem.id;
              return (
                <div key={sem.id} style={styles.semesterCard}>
                    <div 
                        style={styles.semesterHeader(isOpen)} 
                        onClick={() => setExpandedSemester(isOpen ? null : sem.id)}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '24px', height: '24px', borderRadius: '12px',
                                backgroundColor: isDark ? '#FFF' : theme.text, 
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                color: isDark ? theme.text : '#FFF'
                            }}>
                                {isOpen ? <IoChevronUp size={14} /> : <IoChevronDown size={14} />}
                            </div>
                            <span style={styles.semesterTitle}>{sem.title}</span>
                        </div>
                        <div style={styles.semesterMeta}>
                            <span style={{ fontSize: '13px', color: theme.textSecondary, fontWeight: '600' }}>
                                {sem.tup} Units
                            </span>
                            <span style={styles.gpaBadge}>{sem.gpa}</span>
                        </div>
                    </div>

                    {isOpen && (
                        <div style={styles.tableContainer}>
                            <div style={styles.tableHeader}>
                                <div>Course</div>
                                <div style={{ textAlign: 'center' }}>Unit</div>
                                <div style={{ textAlign: 'center' }}>Score</div>
                                <div style={{ textAlign: 'center' }}>Grade</div>
                                <div style={{ textAlign: 'right' }}>Points</div>
                            </div>
                            {sem.courses.map((course, idx) => (
                                <div 
                                    key={idx} 
                                    style={{
                                        ...styles.tableRow,
                                        borderBottom: idx === sem.courses.length - 1 ? 'none' : `1px solid ${theme.border}`
                                    }}
                                >
                                    <div>
                                        <span style={styles.courseCode}>{course.code}</span>
                                        <span style={styles.courseTitle}>{course.title}</span>
                                    </div>
                                    <div style={{ textAlign: 'center', fontWeight: '600' }}>{course.units}</div>
                                    <div style={{ textAlign: 'center', fontWeight: '600' }}>{course.score}</div>
                                    <div style={{ textAlign: 'center', ...styles.gradeBadge(course.grade) }}>{course.grade}</div>
                                    <div style={{ textAlign: 'right', fontWeight: '700' }}>{course.points}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
              );
          })}
      </div>

      <button 
          style={styles.downloadBtn}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${theme.primary}10`}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <IoDownloadOutline size={20} />
        Download Official Transcript (PDF)
      </button>

    </LayoutComponent>
  );
};

export default Results;
