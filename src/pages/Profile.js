import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    IoPerson, IoCamera, IoMailOutline, IoCallOutline, IoCalendarOutline, 
    IoNotificationsOutline, IoMoonOutline, IoLanguageOutline, 
    IoHelpBuoyOutline, IoShieldCheckmarkOutline, IoInformationCircleOutline, 
    IoLogOutOutline, IoChevronForward 
} from 'react-icons/io5';
import LayoutComponent from '../components/Layout';
import { Colors, Layout, Shadows } from '../theme';
import { supabase } from '../lib/supabase';

const Profile = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const theme = isDark ? Colors.dark : Colors.light;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/login');
                return;
            }

            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();
            
                if (profile) {
                setUser({
                    id: profile.matric_no || profile.staff_id,
                    firstName: profile.first_name,
                    lastName: profile.last_name,
                    email: user.email,
                    role: profile.role,
                    phone_number: profile.phone_number,
                    level: profile.level
                });
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    };
    loadUser();
  }, [navigate]);

  const SettingItem = ({ icon: Icon, title, value, type = 'link', color = theme.text, onClick }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        borderBottom: `1px solid ${theme.border}`,
        cursor: type === 'switch' ? 'default' : 'pointer',
    }} onClick={onClick}>
       <div style={{
           width: '40px', height: '40px', borderRadius: '12px',
           backgroundColor: `${color}15`, color: color,
           display: 'flex', justifyContent: 'center', alignItems: 'center',
           marginRight: '16px',
           fontSize: '20px',
       }}>
         <Icon />
       </div>
       <div style={{ flex: 1, fontSize: '15px', fontWeight: '600', color: theme.text }}>
         {title}
       </div>
       
       {type === 'link' && <IoChevronForward size={18} color={theme.icon} />}
       
       {type === 'switch' && (
           <div style={{
               width: '40px', height: '24px', borderRadius: '12px',
               backgroundColor: isDark ? theme.primary : theme.border,
               position: 'relative',
               cursor: 'pointer',
           }} onClick={() => setIsDark(!isDark)}>
               <div style={{
                   width: '20px', height: '20px', borderRadius: '10px',
                   backgroundColor: '#FFF',
                   position: 'absolute',
                   top: '2px',
                   left: isDark ? '18px' : '2px',
                   transition: 'left 0.2s',
               }} />
           </div>
       )}

       {type === 'text' && (
           <span style={{ color: theme.textSecondary, fontWeight: '700' }}>{value}</span>
       )}
    </div>
  );

  const styles = {
    profileHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 20px',
        borderRadius: '0 0 32px 32px',
        backgroundColor: theme.primary,
        color: '#FFF',
        marginBottom: '24px',
        marginTop: '-32px', // Counteract layout padding if generic
        marginLeft: '-32px',
        marginRight: '-32px',
        boxShadow: Shadows.medium,
    },
    avatarContainer: { position: 'relative', marginBottom: '16px' },
    avatar: {
        width: '100px', height: '100px', borderRadius: '50px',
        backgroundColor: theme.secondary,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        border: '4px solid rgba(255,255,255,0.2)',
        color: theme.primary,
        fontSize: '50px',
    },
    editBtn: {
        position: 'absolute', bottom: 0, right: 0,
        width: '32px', height: '32px', borderRadius: '16px',
        backgroundColor: theme.accent,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        border: '3px solid #FFF',
        color: '#FFF',
        fontSize: '16px',
        cursor: 'pointer',
    },
    userName: { fontSize: '22px', fontWeight: '800', marginBottom: '4px' },
    userMeta: { fontSize: '14px', fontWeight: '500', opacity: 0.8 },
    section: { marginBottom: '24px' },
    sectionTitle: { fontSize: '16px', fontWeight: '700', marginBottom: '12px', marginLeft: '4px', color: theme.text },
    card: {
        borderRadius: Layout.borderRadius,
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.card,
        overflow: 'hidden',
    },
    logoutBtn: {
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
        height: '56px', borderRadius: Layout.borderRadius,
        border: `1px solid ${theme.error}`,
        backgroundColor: 'transparent',
        marginTop: '10px', marginBottom: '20px',
        color: theme.error,
        fontWeight: '700',
        fontSize: '16px',
        cursor: 'pointer',
        width: '100%',
    },
    version: { textAlign: 'center', fontSize: '12px', opacity: 0.5, color: theme.icon },
  };

  return (
    <LayoutComponent>
      {/* Note: LayoutComponent adds padding, so we might need to adjust styles or genericize Layout to allow full width headers. 
          For now simple negation margins used in style.
      */}
      <div style={styles.profileHeader}>
         <div style={styles.avatarContainer}>
            <div style={styles.avatar}><IoPerson /></div>
            <div style={styles.editBtn}><IoCamera /></div>
         </div>
         <div style={styles.userName}>{user ? `${user.firstName} ${user.lastName}` : 'Loading...'}</div>
         <div style={styles.userMeta}>{user ? `${user.id} | ${user.role}` : 'LASU Smart Campus'}</div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Personal Information</div>
        <div style={styles.card}>
            <SettingItem icon={IoMailOutline} title="Email" value={user ? user.email : '...'} type="text" />
            <SettingItem icon={IoCallOutline} title="Phone" value={user?.phone_number || 'Not Set'} type="text" />
            {user?.role === 'Student' && (
                <SettingItem icon={IoCalendarOutline} title="Level" value={user?.level || 'Not Set'} type="text" />
            )}
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>App Settings</div>
        <div style={styles.card}>
            <SettingItem icon={IoNotificationsOutline} title="Push Notifications" color="#4CAF50" />
            <SettingItem icon={IoMoonOutline} title="Dark Mode" type="switch" color="#2196F3" />
            <SettingItem icon={IoLanguageOutline} title="Language" value="English" type="text" color="#9C27B0" />
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Support & Legal</div>
        <div style={styles.card}>
            <SettingItem icon={IoHelpBuoyOutline} title="Help & Support" color="#FF9800" onClick={() => navigate('/help-support')} />
            <SettingItem icon={IoShieldCheckmarkOutline} title="Privacy Policy" color="#607D8B" onClick={() => navigate('/privacy-policy')} />
            <SettingItem icon={IoInformationCircleOutline} title="About App" color="#795548" onClick={() => alert('LASU UMS v1.0.4')} />
        </div>
      </div>

      <button style={styles.logoutBtn} onClick={async () => {
          await supabase.auth.signOut();
          navigate('/login');
      }}>
        <IoLogOutOutline size={20} />
        Log Out
      </button>

      <div style={styles.version}>v1.0.4 - LASU Smart Campus</div>

    </LayoutComponent>
  );
};

export default Profile;
