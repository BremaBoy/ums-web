import React, { useState } from 'react';
import { IoChevronDown, IoChevronUp, IoMailOutline, IoCallOutline, IoChatbubblesOutline, IoSend } from 'react-icons/io5';
import LayoutComponent from '../components/Layout';
import { Colors, Shadows, Layout } from '../theme';

const HelpSupport = () => {
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = isDark ? Colors.dark : Colors.light;
  const [openFaq, setOpenFaq] = useState(null);

  const FAQS = [
      { id: 1, question: 'How do I reset my portal password?', answer: 'Go to the Profile page and click on "Change Password". Follow the prompts to securely update your credentials.' },
      { id: 2, question: 'Why is my course registration not reflecting?', answer: 'Course registration updates may take up to 24 hours to reflect on your dashboard. If it persists, contact the ICT center.' },
      { id: 3, question: 'Can I pay my tuition fees in installments?', answer: 'Yes, the university allows a 60-40 installment payment plan. Check the Payments section for more details.' },
      { id: 4, question: 'Where can I find my exam timetable?', answer: 'The exam timetable is usually published on the "Classes" page 2 weeks before the examination period.' },
  ];

  const toggleFaq = (id) => {
      setOpenFaq(openFaq === id ? null : id);
  };

  const styles = {
    header: { marginBottom: '32px' },
    title: { fontSize: '32px', fontWeight: '800', color: theme.text, margin: 0 },
    subtitle: { fontSize: '16px', color: theme.textSecondary, marginTop: '4px' },
    sectionTitle: { fontSize: '20px', fontWeight: '700', color: theme.text, marginBottom: '20px' },
    
    faqContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '40px',
    },
    faqItem: {
        borderRadius: '16px',
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.card,
        overflow: 'hidden',
    },
    faqHeader: {
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        color: theme.text,
    },
    faqContent: {
        padding: '0 20px 20px 20px',
        color: theme.textSecondary,
        fontSize: '14px',
        lineHeight: '1.6',
    },

    contactGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px',
    },
    contactCard: {
        padding: '24px',
        borderRadius: '20px',
        backgroundColor: theme.card,
        border: `1px solid ${theme.border}`,
        boxShadow: Shadows.small,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '12px',
    },
    iconBox: {
        width: '50px',
        height: '50px',
        borderRadius: '25px',
        backgroundColor: `${theme.primary}15`,
        color: theme.primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        marginBottom: '8px',
    },

    formCard: {
        padding: '32px',
        borderRadius: '24px',
        backgroundColor: theme.card,
        border: `1px solid ${theme.border}`,
    },
    inputGroup: { marginBottom: '20px' },
    label: { display: 'block', fontSize: '14px', fontWeight: '600', color: theme.text, marginBottom: '8px' },
    input: {
        width: '100%',
        padding: '16px',
        borderRadius: '12px',
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.background,
        color: theme.text,
        fontSize: '15px',
        outline: 'none',
    },
    textarea: {
        width: '100%',
        padding: '16px',
        borderRadius: '12px',
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.background,
        color: theme.text,
        fontSize: '15px',
        outline: 'none',
        minHeight: '120px',
        resize: 'vertical',
    },
    submitBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        width: '100%',
        padding: '16px',
        borderRadius: '12px',
        backgroundColor: theme.primary,
        color: '#FFF',
        fontSize: '16px',
        fontWeight: '700',
        border: 'none',
        cursor: 'pointer',
    },
  };

  return (
    <LayoutComponent>
      <div style={styles.header}>
        <h1 style={styles.title}>Help & Support</h1>
        <p style={styles.subtitle}>Frequently asked questions and direct support channels.</p>
      </div>

      <div style={styles.contactGrid}>
          <div style={styles.contactCard}>
              <div style={styles.iconBox}><IoMailOutline /></div>
              <h3 style={{ margin: 0, color: theme.text }}>Email Support</h3>
              <p style={{ margin: 0, color: theme.textSecondary, fontSize: '14px' }}>support@lasu.edu.ng</p>
          </div>
          <div style={styles.contactCard}>
              <div style={styles.iconBox}><IoCallOutline /></div>
              <h3 style={{ margin: 0, color: theme.text }}>Helpline</h3>
              <p style={{ margin: 0, color: theme.textSecondary, fontSize: '14px' }}>+234 800 527 8864</p>
          </div>
          <div style={styles.contactCard}>
              <div style={styles.iconBox}><IoChatbubblesOutline /></div>
              <h3 style={{ margin: 0, color: theme.text }}>Live Chat</h3>
              <p style={{ margin: 0, color: theme.textSecondary, fontSize: '14px' }}>Available 8am - 4pm</p>
          </div>
      </div>

      <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
      <div style={styles.faqContainer}>
          {FAQS.map(faq => (
              <div key={faq.id} style={styles.faqItem}>
                  <div style={styles.faqHeader} onClick={() => toggleFaq(faq.id)}>
                      {faq.question}
                      {openFaq === faq.id ? <IoChevronUp /> : <IoChevronDown />}
                  </div>
                  {openFaq === faq.id && (
                      <div style={styles.faqContent}>
                          {faq.answer}
                      </div>
                  )}
              </div>
          ))}
      </div>

      <h2 style={styles.sectionTitle}>Send us a Message</h2>
      <div style={styles.formCard}>
          <div style={styles.inputGroup}>
              <label style={styles.label}>Subject</label>
              <input type="text" placeholder="What is this regarding?" style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
              <label style={styles.label}>Message</label>
              <textarea placeholder="Describe your issue in detail..." style={styles.textarea} />
          </div>
          <button style={styles.submitBtn} onClick={() => alert('Message Sent!')}>
              Send Message
              <IoSend />
          </button>
      </div>

    </LayoutComponent>
  );
};

export default HelpSupport;
