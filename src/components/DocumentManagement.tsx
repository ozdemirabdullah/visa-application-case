import { useState } from 'react';
import { Eye, Upload, FileText, MoreVertical, AlertCircle, RotateCcw } from 'lucide-react';
import type { Document, DocLoadState } from '../types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useTranslation } from '@/hooks/useTranslation';

function DocumentStatusBadge({ status }: { status: Document['status'] }) {
  const { t } = useTranslation();
  if (status === 'uploaded') {
    return <Badge variant="success">{t('documents.statusUploaded')}</Badge>;
  }
  if (status === 'missing') {
    return <Badge variant="muted">{t('documents.statusMissing')}</Badge>;
  }
  return <Badge variant="warning">{t('documents.statusRevisionRequested')}</Badge>;
}

function DocumentSkeleton() {
  return (
    <div className="doc-skeleton">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="doc-skeleton-item">
          <div className="skeleton-line skeleton-line--short" />
          <div className="skeleton-line skeleton-line--title" />
          <div className="skeleton-line skeleton-line--meta" />
        </div>
      ))}
    </div>
  );
}

interface DocumentRowProps {
  doc: Document;
  onViewNote: (doc: Document) => void;
}

function DocumentRow({ doc, onViewNote }: DocumentRowProps) {
  const { t } = useTranslation();
  const uploadedLabel = doc.uploadedDate
    ? t('documents.uploadedOn', {
        date: new Date(doc.uploadedDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      })
    : t('documents.notUploadedYet');

  return (
    <div className="doc-row">
      <div className="doc-row-main">
        <DocumentStatusBadge status={doc.status} />
        <div className="doc-row-name">{doc.name}</div>
        <div className="doc-row-meta">{uploadedLabel}</div>
      </div>
      <div className="doc-row-actions">
        {doc.status === 'uploaded' && (
          <Button variant="outline" size="sm" className="doc-action-btn">
            <Eye size={14} />
            {t('documents.actionViewDoc')}
          </Button>
        )}
        {doc.status === 'missing' && (
          <Button size="sm" className="doc-action-btn doc-action-btn--dark">
            <Upload size={14} />
            {t('documents.actionUpload')}
          </Button>
        )}
        {doc.status === 'revision_requested' && (
          <>
            <Button variant="outline" size="sm" className="doc-action-btn" onClick={() => onViewNote(doc)}>
              <FileText size={14} />
              {t('documents.actionViewNote')}
            </Button>
            <Button variant="outline" size="sm" className="doc-action-btn">
              <Eye size={14} />
              {t('documents.actionViewDoc')}
            </Button>
          </>
        )}
        <Button variant="ghost" size="icon" className="doc-more-btn">
          <MoreVertical size={16} />
        </Button>
      </div>
    </div>
  );
}

interface RevisionNoteModalProps {
  doc: Document;
  onClose: () => void;
}

function RevisionNoteModal({ doc, onClose }: RevisionNoteModalProps) {
  const { t } = useTranslation();
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t('documents.revisionNoteTitle', { name: doc.name })}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground leading-relaxed">{doc.revisionNote}</p>
        <DialogFooter>
          <Button onClick={onClose}>{t('documents.revisionNoteClose')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface DocumentManagementProps {
  documents: Document[];
  loadState: DocLoadState;
  onRetry: () => void;
}

export default function DocumentManagement({ documents, loadState, onRetry }: DocumentManagementProps) {
  const [noteDoc, setNoteDoc] = useState<Document | null>(null);
  const { t } = useTranslation();

  return (
    <div className="doc-management">
      <div className="doc-management-header">
        <h2 className="section-title">{t('documents.title')}</h2>
        <p className="section-subtitle">{t('documents.subtitle')}</p>
      </div>

      {loadState === 'loading' && <DocumentSkeleton />}

      {loadState === 'error' && (
        <div className="doc-error-state">
          <AlertCircle size={32} className="doc-error-icon" />
          <p className="doc-error-message">{t('documents.loadingError')}</p>
          <Button variant="outline" onClick={onRetry} className="gap-2">
            <RotateCcw size={14} />
            {t('documents.retry')}
          </Button>
        </div>
      )}

      {loadState === 'success' && (
        <div className="doc-list">
          {documents.map((doc) => (
            <DocumentRow key={doc.id} doc={doc} onViewNote={(d) => setNoteDoc(d)} />
          ))}
        </div>
      )}

      {noteDoc && <RevisionNoteModal doc={noteDoc} onClose={() => setNoteDoc(null)} />}
    </div>
  );
}
