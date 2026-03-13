import { Mail } from 'lucide-react';
import type { CommunicationEntry } from '../types';
import { useTranslation } from '@/hooks/useTranslation';

interface CommunicationLogProps {
  log: CommunicationEntry[];
}

function ChannelIcon({ channel }: { channel: CommunicationEntry['channel'] }) {
  if (channel === 'email') {
    return (
      <div className="comm-icon comm-icon--email">
        <Mail size={12} />
      </div>
    );
  }
  return (
    <div className="comm-icon comm-icon--sms">
      <Mail size={12} />
    </div>
  );
}

export default function CommunicationLog({ log }: CommunicationLogProps) {
  const { t } = useTranslation();

  function channelLabel(channel: CommunicationEntry['channel']): string {
    return channel === 'email' ? t('communications.emailSent') : t('communications.smsSent');
  }

  return (
    <div className="comm-log">
      <div className="comm-log-header">
        <h2 className="section-title">{t('communications.title')}</h2>
        <p className="section-subtitle">{t('communications.subtitle')}</p>
      </div>
      <div className="comm-list">
        {log.map((entry) => (
          <div key={entry.id} className="comm-row">
            <ChannelIcon channel={entry.channel} />
            <div className="comm-info">
              <div className="comm-channel-label">{channelLabel(entry.channel)}</div>
              <div className="comm-subject">{entry.subject}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
