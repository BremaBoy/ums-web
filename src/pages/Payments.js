import React from 'react';
import { IoInformationCircle, IoOpenOutline } from 'react-icons/io5';
import LayoutComponent from '../components/Layout';
import { Colors, Shadows } from '../theme';

const Payments = () => {
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = isDark ? Colors.dark : Colors.light;

  const PaymentItem = ({ title, amount, status }) => {
     const isPaid = status === 'Paid';
     const badgeBg = isPaid ? `${theme.success}20` : `${theme.warning}20`; // Hex opacity approx
     const badgeColor = isPaid ? theme.success : theme.warning;

     return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
            borderRadius: '16px',
            border: `1px solid ${theme.border}`,
            backgroundColor: theme.card,
        }}>
            <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: theme.text }}>{title}</div>
                <div style={{ fontSize: '15px', fontWeight: '800', color: theme.primary }}>₦{amount}</div>
            </div>
            <div style={{
                padding: '6px 12px',
                borderRadius: '20px',
                backgroundColor: badgeBg,
                color: badgeColor,
                fontSize: '12px',
                fontWeight: '800',
            }}>
                {status}
            </div>
        </div>
     );
  };

  const styles = {
    header: { marginBottom: '24px' },
    title: { fontSize: '28px', fontWeight: '800', color: theme.text, margin: 0 },
    subtitle: { fontSize: '14px', color: theme.textSecondary, marginTop: '4px' },
    totalCard: {
        padding: '24px',
        borderRadius: '24px',
        marginBottom: '32px',
        backgroundColor: theme.primary,
        boxShadow: Shadows.medium,
        color: '#FFF',
    },
    totalLabel: { fontSize: '14px', fontWeight: '600', opacity: 0.7, marginBottom: '4px' },
    totalValue: { fontSize: '36px', fontWeight: '900', marginBottom: '16px', lineHeight: 1 },
    sessionBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '700',
    },
    section: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' },
    sectionTitle: { fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: theme.text },
    noticeCard: {
        display: 'flex',
        padding: '16px',
        borderRadius: '16px',
        border: `1px solid ${theme.accent}`,
        backgroundColor: `${theme.accent}15`,
        gap: '12px',
        marginBottom: '24px',
        alignItems: 'center',
    },
    noticeText: { flex: 1, fontSize: '13px', lineHeight: '18px', fontWeight: '500', color: theme.text },
    webBtn: {
        height: '56px',
        borderRadius: '16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: theme.primary,
        color: '#FFF',
        fontSize: '16px',
        fontWeight: '700',
        border: 'none',
        cursor: 'pointer',
        boxShadow: Shadows.medium,
        width: '100%',
    },
  };

  return (
    <LayoutComponent>
      <div style={styles.header}>
        <h1 style={styles.title}>Payments</h1>
        <p style={styles.subtitle}>View your session financial records</p>
      </div>

      <div style={styles.totalCard}>
        <div style={styles.totalLabel}>Outstanding Balance</div>
        <div style={styles.totalValue}>₦0.00</div>
        <div style={styles.sessionBadge}>2024/2025 Session</div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Fee Breakdown</h2>
        <PaymentItem title="Tuition Fees" amount="65,000" status="Paid" />
        <PaymentItem title="Departmental Dues" amount="5,000" status="Paid" />
        <PaymentItem title="Sport Levy" amount="2,500" status="Paid" />
        <PaymentItem title="ICT Training" amount="10,000" status="Pending" />
      </div>

      <div style={styles.noticeCard}>
        <IoInformationCircle size={24} color={theme.accent} />
        <div style={styles.noticeText}>
            Payments can be processed via this web portal. Click below to proceed to the payment gateway.
        </div>
      </div>

      <button style={styles.webBtn} onClick={() => alert('Redirecting to Payment Gateway...')}>
        Proceed to Payment Gateway
        <IoOpenOutline size={20} />
      </button>
    </LayoutComponent>
  );
};

export default Payments;
