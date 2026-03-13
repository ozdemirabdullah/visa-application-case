import { useState, type KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import type { InternalNote } from '../types';
import { formatRelativeTime } from '../utils/documents';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from '@/hooks/useTranslation';

interface InternalNotesProps {
  notes: InternalNote[];
}

export default function InternalNotes({ notes: initialNotes }: InternalNotesProps) {
  const [notes, setNotes] = useState<InternalNote[]>(initialNotes);
  const [noteText, setNoteText] = useState('');
  const { t } = useTranslation();

  function handleAddNote() {
    const trimmed = noteText.trim();
    if (!trimmed) return;
    const newNote: InternalNote = {
      id: `note_${Date.now()}`,
      author: t('notes.authorYou'),
      content: trimmed,
      createdAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    setNoteText('');
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleAddNote();
    }
  }

  return (
    <div className="internal-notes">
      <div className="internal-notes-header">
        <h2 className="section-title">{t('notes.title')}</h2>
        <p className="section-subtitle">{t('notes.subtitle')}</p>
      </div>

      <div className="note-input-row">
        <Textarea
          className="note-textarea"
          placeholder={t('notes.placeholder')}
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <Button
          size="icon"
          className="note-submit-btn"
          onClick={handleAddNote}
          disabled={!noteText.trim()}
          title={t('notes.addNoteTitle')}
        >
          <Send size={14} />
        </Button>
      </div>

      <div className="notes-list">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="note-item-header">
              <span className="note-author">{note.author}</span>
              <span className="note-time">{formatRelativeTime(note.createdAt)}</span>
            </div>
            <p className="note-content">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
