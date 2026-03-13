import { Mail, Phone, ExternalLink } from 'lucide-react';
import type { Traveler } from '../types';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from '@/hooks/useTranslation';

interface AppointmentCountdownProps {
  appointmentDate: string;
}

function AppointmentCountdown({ appointmentDate }: AppointmentCountdownProps) {
  const { t } = useTranslation();
  const now = new Date();
  const target = new Date(appointmentDate);
  const diffMs = target.getTime() - now.getTime();
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const dateStr = target.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const timeStr = target.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="appointment-box">
      <div className="appointment-label">{t('sidebar.appointmentDate')}</div>
      <div className="appointment-countdown">
        <div className="countdown-unit">
          <span className="countdown-value">{String(days).padStart(2, '0')}</span>
          <span className="countdown-unit-label">{t('sidebar.countdownDays')}</span>
        </div>
        <span className="countdown-sep">:</span>
        <div className="countdown-unit">
          <span className="countdown-value">{String(hours).padStart(2, '0')}</span>
          <span className="countdown-unit-label">{t('sidebar.countdownHours')}</span>
        </div>
        <span className="countdown-sep">:</span>
        <div className="countdown-unit">
          <span className="countdown-value">{String(minutes).padStart(2, '0')}</span>
          <span className="countdown-unit-label">{t('sidebar.countdownMin')}</span>
        </div>
      </div>
      <div className="appointment-datetime">{dateStr} | {timeStr}</div>
    </div>
  );
}

interface TravelerSidebarProps {
  traveler: Traveler;
  appointmentDate: string;
}

export default function TravelerSidebar({ traveler, appointmentDate }: TravelerSidebarProps) {
  const { t } = useTranslation();

  function getStatusVariant(status: string): 'success' | 'destructive' | 'muted' {
    if (status === 'approved') return 'success';
    if (status === 'rejected') return 'destructive';
    return 'muted';
  }

  function getStatusLabel(status: string) {
    if (status === 'approved') return t('status.approved');
    if (status === 'rejected') return t('status.rejected');
    return t('status.pending');
  }

  return (
    <aside className="traveler-sidebar">
      <div className="traveler-header">
        <div className="traveler-avatar">{traveler.initials}</div>
        <div>
          <div className="traveler-name">{traveler.name}</div>
          <div className="traveler-app-label">{traveler.applicationLabel}</div>
        </div>
      </div>

      <AppointmentCountdown appointmentDate={appointmentDate} />

      <div className="traveler-details">
        <div className="detail-row">
          <span className="detail-label">{t('sidebar.labelId')}</span>
          <span className="detail-value">{traveler.traveler_id}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">{t('sidebar.labelPassport')}</span>
          <span className="detail-value">{traveler.passportNumber}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">{t('sidebar.labelApplicationType')}</span>
          <span className="detail-value">{traveler.applicationLabel}</span>
        </div>
      </div>

      <Separator className="my-3" />

      <div className="contact-section">
        <div className="detail-label mb-2">{t('sidebar.labelContact')}</div>
        <div className="contact-row">
          <Mail size={14} className="contact-icon" />
          <span className="contact-value">{traveler.email}</span>
        </div>
        <div className="contact-row">
          <Phone size={14} className="contact-icon" />
          <span className="contact-value">{traveler.phone}</span>
        </div>
        <button className="view-profile-btn">
          {t('sidebar.viewFullProfile')} <ExternalLink size={12} />
        </button>
      </div>

      <Separator className="my-3" />

      <div className="related-apps-section">
        <div className="detail-label mb-2">{t('sidebar.relatedApplications')}</div>
        <div className="related-apps-list">
          {traveler.relatedApplications.map((app, i) => (
            <div key={`${app.id}-${i}`} className="related-app-row">
              <div className="related-app-info">
                <div className="related-app-id">{app.id}</div>
                <div className="related-app-type">{app.type}</div>
                <div className="related-app-period">{app.period}</div>
              </div>
              <Badge variant={getStatusVariant(app.status)} className="border-transparent">{getStatusLabel(app.status)}</Badge>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
