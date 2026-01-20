import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMegaphone } from 'react-icons/io5';
import HeaderCard from '../components/HeaderCard';
import DashboardCard from '../components/DashboardCard';
import LayoutComponent from '../components/Layout';
import { Colors, Layout } from '../theme';
import { supabase } from '../lib/supabase';
import MissingInfoModal from '../components/MissingInfoModal';
import LoadingSpinner from '../components/LoadingSpinner';

const REQUIRED_FIELDS = ['phone_number', 'level'];

const Dashboard = () => {
    const navigate = useNavigate();
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = isDark ? Colors.dark : Colors.light;

    const [user, setUser] = useState(null);
    const [announcements, setAnnouncements] = useState([]);
    const [overview] = useState({ courses: 0, attendance: 85, gpa: 4.25 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // 1. Get current user
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    navigate('/login');
                    return;
                }

                // 2. Fetch profile
                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error) throw error;

                if (profile) {
                    setUser({
                        firstName: profile.first_name,
                        lastName: profile.last_name,
                        role: profile.role,
                        matric: profile.matric_no || profile.staff_id,
                        level: profile.level,
                        phone_number: profile.phone_number
                    });
                }

                // Mock announcements (keep as mock for now or fetch if table exists)
                setAnnouncements([
                    { id: '1', title: 'Welcome to Semester', content: 'Classes start on Monday.', created_at: new Date().toISOString() },
                    { id: '2', title: 'Exam Schedule', content: 'Draft timetable released.', created_at: new Date().toISOString() },
                ]);

            } catch (error) {
                console.error('Error loading dashboard:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [navigate]);

    // --- Missing Info Logic ---
    const [missingFields, setMissingFields] = useState([]);
    const [showMissingModal, setShowMissingModal] = useState(false);

    useEffect(() => {
        if (user) {
            const missing = [];
            REQUIRED_FIELDS.forEach(field => {
                if (field === 'level' && user.role !== 'Student') return;
                
                // Check if field is missing (undefined, null, or empty string)
                if (!user[field] && user[field] !== 0) {
                    missing.push(field); 
                }
            });

            if (missing.length > 0) {
                setMissingFields(missing);
                setShowMissingModal(true);
            }
        }
    }, [user]);

    const handleMissingInfoSave = (newData) => {
        setUser(prev => ({ ...prev, ...newData }));
        setShowMissingModal(false);
    };
    // --------------------------



    const styles = {
        header: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
        },
        welcomeBox: {},
        userName: {
            fontSize: '24px',
            fontWeight: '800',
            color: theme.text,
            margin: 0,
        },
        userMeta: {
            fontSize: '14px',
            color: theme.textSecondary,
            marginTop: '4px',
        },
        semesterBadge: {
           padding: '8px 16px',
           borderRadius: '8px',
           backgroundColor: theme.secondary,
           color: theme.primary,
           fontWeight: '700',
           fontSize: '14px',
           boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        },
        section: {
            marginBottom: '32px',
        },
        sectionTitle: {
            fontSize: '20px',
            fontWeight: '700',
            color: theme.text,
            marginBottom: '16px',
        },
        classCard: {
            padding: '24px',
            borderRadius: '20px',
            backgroundColor: theme.primary,
            color: '#FFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
             // Minimal gradient effect assumption
             background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primary}dd 100%)`,
        },
        classInfo: {},
        classTime: {
            fontSize: '14px',
            fontWeight: '600',
            opacity: 0.9,
            marginBottom: '4px',
            display: 'block',
        },
        classTitle: {
            fontSize: '24px',
            fontWeight: '800',
            marginBottom: '4px',
            display: 'block',
        },
        classVenue: {
             fontSize: '15px',
             fontWeight: '500',
             opacity: 0.9,
        },
        markBtn: {
            padding: '12px 24px',
            borderRadius: '12px',
            backgroundColor: '#FFF',
            color: '#000',
            fontWeight: '700',
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
        },
        statsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            marginBottom: '32px',
        },
        progressContainer: {
            height: '6px',
            backgroundColor: 'rgba(0,0,0,0.05)',
            borderRadius: '3px',
            marginBottom: '8px',
            overflow: 'hidden',
            marginTop: 'auto',
        },
        progressBar: {
            height: '100%',
            backgroundColor: theme.success,
            width: '85%',
        },
        statText: {
            fontSize: '13px',
            fontWeight: '600',
            color: theme.textSecondary,
        },
        gpaText: {
            fontSize: '28px',
            fontWeight: '900',
            color: theme.text,
            lineHeight: 1,
        },
        actionsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
        },
        notices: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
        },
        noticeCard: {
            display: 'flex',
            padding: '16px',
            borderRadius: Layout.borderRadius,
            border: `1px solid ${theme.border}`,
            backgroundColor: theme.card,
            alignItems: 'center',
            gap: '16px',
        },
        noticeIcon: {
             width: '40px',
             height: '40px',
             borderRadius: '20px',
             backgroundColor: `${theme.primary}15`,
             color: theme.primary,
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center',
             fontSize: '20px',
             flexShrink: 0,
        },
        noticeContent: {
            flex: 1,
        },
        noticeTitle: {
             fontSize: '15px',
             fontWeight: '700',
             color: theme.text,
             margin: 0,
             marginBottom: '2px',
        },
        noticeDesc: {
            fontSize: '13px',
            color: theme.textSecondary,
            margin: 0,
        }
    };

    if (loading) {
        return <LoadingSpinner fullScreen />;
    }

    return (
        <LayoutComponent>
            <div style={styles.header}>
                <div style={styles.welcomeBox}>
                    <h1 style={styles.userName}>Hello, {user?.firstName}</h1>
                    <p style={styles.userMeta}>{user?.matric} • {user?.level}</p>
                </div>
                <div style={styles.semesterBadge}>
                    2nd Semester
                </div>
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Today's Classes</h2>
                <div style={styles.classCard}>
                    <div style={styles.classInfo}>
                        <span style={styles.classTime}>10:00 AM - 12:00 PM</span>
                        <span style={styles.classTitle}>CSC 401 - Artificial Intelligence</span>
                        <span style={styles.classVenue}>Block B, Room 201</span>
                    </div>
                    <button style={styles.markBtn} onClick={() => alert('Attendance Marked!')}>
                        Mark Attendance
                    </button>
                </div>
            </div>

            <div style={styles.statsGrid}>
                 <HeaderCard
                    title="Attendance"
                    icon="IoCheckmarkCircle"
                    color={theme.success}
                    subtitle={
                        <div>
                             <div style={styles.progressContainer}>
                                <div style={styles.progressBar} />
                             </div>
                             <span style={styles.statText}>85% Present</span>
                        </div>
                    }
                 />
                 <HeaderCard
                    title="Results"
                    icon="IoMedal"
                    color="#FF9500"
                    subtitle={
                        <div>
                             <div style={styles.gpaText}>{overview.gpa}</div>
                             <span style={styles.statText}>CGPA</span>
                        </div>
                    }
                 />
            </div>

            <div style={styles.section}>
                 <h2 style={styles.sectionTitle}>Quick Actions</h2>
                 <div style={styles.actionsGrid}>
                     <DashboardCard 
                        icon="IoBook"
                        title="Lecture Notes"
                        subtitle="4 New uploads"
                        color="#E91E63"
                        onClick={() => navigate('/materials')}
                     />
                     <DashboardCard 
                        icon="IoCard"
                        title="Payments"
                        subtitle="Fees due soon"
                        color="#009688" 
                        onClick={() => navigate('/payments')}
                     />
                 </div>
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Notices</h2>
                <div style={styles.notices}>
                    {announcements.map(ann => (
                        <div key={ann.id} style={styles.noticeCard}>
                            <div style={styles.noticeIcon}>
                                <IoMegaphone />
                            </div>
                            <div style={styles.noticeContent}>
                                <h4 style={styles.noticeTitle}>{ann.title}</h4>
                                <p style={styles.noticeDesc}>{ann.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <MissingInfoModal 
                isOpen={showMissingModal}
                missingFields={missingFields}
                onSave={handleMissingInfoSave}
                onClose={() => setShowMissingModal(false)}
            />
        </LayoutComponent>
    );
};

export default Dashboard;
