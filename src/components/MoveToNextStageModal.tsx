import { ChevronRight } from 'lucide-react';
import type { Stage } from '../types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

interface MoveToNextStageModalProps {
  currentStage: Stage;
  nextStage: Stage;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function MoveToNextStageModal({
  currentStage,
  nextStage,
  onConfirm,
  onCancel,
}: MoveToNextStageModalProps) {
  const { t } = useTranslation();

  return (
    <Dialog open onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-[420px]">
        <DialogHeader>
          <DialogTitle>{t('moveStageModal.title')}</DialogTitle>
        </DialogHeader>
        <div className="modal-stage-body py-0">
          <p className="modal-stage-question">
            {t('moveStageModal.question', {
              current: currentStage.label,
              next: nextStage.label,
            })}
          </p>
          <div className="modal-stage-preview mt-4">
            <span className="modal-stage-chip modal-stage-chip--current">{currentStage.label}</span>
            <ChevronRight size={16} className="modal-stage-arrow" />
            <span className="modal-stage-chip modal-stage-chip--next">{nextStage.label}</span>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={onCancel}>{t('moveStageModal.cancel')}</Button>
          <Button onClick={onConfirm}>{t('moveStageModal.confirm')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
