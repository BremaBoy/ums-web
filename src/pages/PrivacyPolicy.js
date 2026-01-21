import React from 'react';
import { IoShieldCheckmarkOutline, IoLockClosedOutline, IoDocumentTextOutline } from 'react-icons/io5';
import LayoutComponent from '../components/Layout';
import { Colors, Shadows } from '../theme';

const PrivacyPolicy = () => {
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = isDark ? Colors.dark : Colors.light;

  const styles = {
    header: { marginBottom: '32px' },
    title: { fontSize: '32px', fontWeight: '800', color: theme.text, margin: 0 },
    subtitle: { fontSize: '16px', color: theme.textSecondary, marginTop: '4px' },
    
    contentCard: {
        padding: '40px',
        borderRadius: '24px',
        backgroundColor: theme.card,
        border: `1px solid ${theme.border}`,
        boxShadow: Shadows.small,
        color: theme.text,
        lineHeight: '1.8',
    },
    section: { marginBottom: '32px' },
    sectionHeading: { fontSize: '20px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' },
    paragraph: { marginBottom: '16px', fontSize: '15px', color: theme.textSecondary },
    list: { paddingLeft: '20px', fontSize: '15px', color: theme.textSecondary },
    listItem: { marginBottom: '8px' },
    
    highlightBox: {
        padding: '24px',
        borderRadius: '16px',
        backgroundColor: `${theme.primary}10`,
        border: `1px solid ${theme.primary}30`,
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
        marginBottom: '32px',
    },
  };

  return (
    <LayoutComponent>
      <div style={styles.header}>
        <h1 style={styles.title}>Privacy Policy</h1>
        <p style={styles.subtitle}>Last updated: January 2026</p>
      </div>

      <div style={styles.contentCard}>
        
        <div style={styles.highlightBox}>
            <IoShieldCheckmarkOutline size={32} color={theme.primary} />
            <div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Your Data is Secure</h3>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
                    LASU UMS is committed to protecting your personal information. We utilize industry-standard encryption protocols to ensure your data remains confidential and secure.
                </p>
            </div>
        </div>

        <div style={styles.section}>
            <div style={styles.sectionHeading}>
                <IoDocumentTextOutline />
                1. Information We Collect
            </div>
            <p style={styles.paragraph}>
                We collect information that is necessary for the provision of our educational services. This includes but is not limited to:
            </p>
            <ul style={styles.list}>
                <li style={styles.listItem}>Personal Identification (Name, Matric Number, DOB)</li>
                <li style={styles.listItem}>Contact Information (Email, Phone Number, Address)</li>
                <li style={styles.listItem}>Academic Records (Courses, Grades, Attendance)</li>
                <li style={styles.listItem}>Financial Records (Tuition Payments, Dues)</li>
            </ul>
        </div>

        <div style={styles.section}>
            <div style={styles.sectionHeading}>
                <IoLockClosedOutline />
                2. How We Use Your Information
            </div>
            <p style={styles.paragraph}>
                The information collected is used solely for:
            </p>
            <ul style={styles.list}>
                <li style={styles.listItem}>Managing your academic profile and progress.</li>
                <li style={styles.listItem}>Processing payments and financial records.</li>
                <li style={styles.listItem}>Communicating important university announcements.</li>
                <li style={styles.listItem}>Generating official transcripts and reports.</li>
            </ul>
        </div>

        <div style={styles.section}>
            <div style={styles.sectionHeading}>3. Data Sharing & Disclosure</div>
            <p style={styles.paragraph}>
                We do not sell or rent your personal data to third parties. Data may be shared with unauthorized university departments and regulatory bodies (e.g., NUC) only when required for compliance and academic verification.
            </p>
        </div>

      </div>
    </LayoutComponent>
  );
};

export default PrivacyPolicy;
