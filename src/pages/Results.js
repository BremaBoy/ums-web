import React from 'react';
import { IoDownloadOutline, IoStatsChart } from 'react-icons/io5';
import LayoutComponent from '../components/Layout';
import { Colors, Layout, Shadows } from '../theme';

const Results = () => {
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = isDark ? Colors.dark : Colors.light;

  const ResultRow = ({ code, units, score, grade }) => (
    <div style={{
        display: 'flex',
        padding: '16px',
        borderBottom: `1px solid ${theme.border}`,
    }}>
      <div style={{ flex: 2, fontWeight: '700', color: theme.text }}>{code}</div>
      <div style={{ flex: 1, textAlign: 'center', color: theme.text }}>{units}</div>
      <div style={{ flex: 1, textAlign: 'center', color: theme.text }}>{score}</div>
      <div style={{ 
          flex: 1, 
          textAlign: 'right', 
          fontWeight: '800',
          color: grade === 'F' ? theme.error : theme.primary 
      }}>{grade}</div>
    </div>
  );

  const styles = {
    header: { marginBottom: '24px' },
    title: { fontSize: '28px', fontWeight: '800', color: theme.text, margin: 0 },
    subtitle: { fontSize: '14px', color: theme.text, opacity: 0.6, marginTop: '4px' },
    statsContainer: {
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
    },
    statCard: (bg) => ({
        flex: 1,
        padding: '20px',
        borderRadius: Layout.borderRadius,
        backgroundColor: bg,
        boxShadow: Shadows.medium,
        color: '#FFF',
    }),
    statLabel: { fontSize: '12px', fontWeight: '600', opacity: 0.8, marginBottom: '4px' },
    statValue: { fontSize: '28px', fontWeight: '800' },
    tableContainer: {
        borderRadius: Layout.borderRadius,
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.card,
        overflow: 'hidden',
        marginBottom: '20px',
    },
    tableHeader: {
        display: 'flex',
        padding: '16px',
        backgroundColor: `${theme.primary}10`,
        color: theme.primary,
        fontWeight: '800',
        fontSize: '12px',
        textTransform: 'uppercase',
    },
    downloadBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        height: '52px',
        borderRadius: Layout.borderRadius,
        border: `2px solid ${theme.primary}`,
        backgroundColor: 'transparent',
        color: theme.primary,
        fontWeight: '700',
        fontSize: '15px',
        marginBottom: '32px',
        width: '100%',
        cursor: 'pointer',
    },
    sectionTitle: { fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: theme.text },
    graphPlaceholder: {
        height: '200px',
        borderRadius: Layout.borderRadius,
        border: `1px dashed ${theme.border}`,
        backgroundColor: theme.card,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.icon,
    },
  };

  return (
    <LayoutComponent>
      <div style={styles.header}>
        <h1 style={styles.title}>Academic Results</h1>
        <p style={styles.subtitle}>2024/2025 Session | Harmattan Semester</p>
      </div>

      <div style={styles.statsContainer}>
        <div style={styles.statCard(theme.primary)}>
          <div style={styles.statLabel}>Current GPA</div>
          <div style={styles.statValue}>4.50</div>
        </div>
        <div style={styles.statCard(theme.accent)}>
          <div style={styles.statLabel}>CGPA</div>
          <div style={styles.statValue}>4.25</div>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <div style={styles.tableHeader}>
            <div style={{ flex: 2 }}>Course</div>
            <div style={{ flex: 1, textAlign: 'center' }}>Units</div>
            <div style={{ flex: 1, textAlign: 'center' }}>Score</div>
            <div style={{ flex: 1, textAlign: 'right' }}>Grade</div>
        </div>
        
        <ResultRow code="CSC 401" units="3" score="75" grade="A" />
        <ResultRow code="CSC 403" units="3" score="68" grade="B" />
        <ResultRow code="CSC 405" units="3" score="82" grade="A" />
        <ResultRow code="CSC 407" units="2" score="71" grade="A" />
        <ResultRow code="GST 411" units="2" score="64" grade="B" />
      </div>

      <button style={styles.downloadBtn}>
        <IoDownloadOutline size={20} />
        Download Result (PDF)
      </button>

      <div>
        <h2 style={styles.sectionTitle}>Performance Graph</h2>
        <div style={styles.graphPlaceholder}>
           <IoStatsChart size={48} style={{ opacity: 0.2 }} />
           <span style={{ marginTop: '10px' }}>Visualization of your GPA progress</span>
        </div>
      </div>
    </LayoutComponent>
  );
};

export default Results;
