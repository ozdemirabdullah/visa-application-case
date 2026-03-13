import { Check } from 'lucide-react';
import type { Stage } from '../types';
import { useTranslation } from '@/hooks/useTranslation';

interface StageProgressBarProps {
  stages: Stage[];
}

export default function StageProgressBar({ stages }: StageProgressBarProps) {
  const { t } = useTranslation();
  return (
    <div className="stage-progress-bar">
      {stages.map((stage, index) => (
        <div key={stage.key} className="stage-item">
          {index > 0 && (
            <div
              className={`stage-connector ${
                stage.status === 'completed' || stage.status === 'current'
                  ? 'stage-connector--active'
                  : 'stage-connector--inactive'
              }`}
            />
          )}

          <div className="stage-node-wrapper">
            <div
              className={`stage-circle ${
                stage.status === 'completed'
                  ? 'stage-circle--completed'
                  : stage.status === 'current'
                  ? 'stage-circle--current'
                  : 'stage-circle--pending'
              }`}
            >
              {stage.status === 'completed' && (
                <Check size={14} strokeWidth={3} className="text-white" />
              )}
              {stage.status === 'current' && (
                <div className="stage-circle-inner" />
              )}
            </div>
            <div className="stage-label-group">
              <span
                className={`stage-label ${
                  stage.status === 'current'
                    ? 'stage-label--current'
                    : stage.status === 'completed'
                    ? 'stage-label--completed'
                    : 'stage-label--pending'
                }`}
              >
                {stage.label}
              </span>
              {stage.status === 'current' && (
                <span className="stage-sublabel">{t('stages.currentStageLabel')}</span>
              )}
              {stage.status === 'completed' && stage.completedDate && (
                <span className="stage-sublabel">
                  {new Date(stage.completedDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  }).toUpperCase()}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
