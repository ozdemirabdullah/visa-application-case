import { useState, useCallback, useEffect } from 'react';
import { ArrowLeft, Search, FileText, MoreVertical, ChevronRight } from 'lucide-react';
import { Toaster, toast } from 'sonner';

import { mockData } from './data/mockData';
import { fetchDocuments } from './utils/documents';
import type { Stage, Document, DocLoadState } from './types';

import StageProgressBar from './components/StageProgressBar';
import TravelerSidebar from './components/TravelerSidebar';
import DocumentManagement from './components/DocumentManagement';
import InternalNotes from './components/InternalNotes';
import CommunicationLog from './components/CommunicationLog';
import MoveToNextStageModal from './components/MoveToNextStageModal';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

import { useTranslation } from '@/hooks/useTranslation';

import './App.css';

export default function App() {
  const { t } = useTranslation();

  const [stages, setStages] = useState<Stage[]>(mockData.application.stages);
  const [showMoveModal, setShowMoveModal] = useState(false);

  const [documents, setDocuments] = useState<Document[]>([]);
  const [docLoadState, setDocLoadState] = useState<DocLoadState>('loading');

  const currentStageIndex = stages.findIndex((s) => s.status === 'current');
  const currentStage = stages[currentStageIndex];
  const nextStage = stages[currentStageIndex + 1] ?? null;
  const isLastStage = currentStageIndex === stages.length - 1;

  const loadDocuments = useCallback(() => {
    setDocLoadState('loading');
    setDocuments([]);
    fetchDocuments()
      .then((docs) => {
        setDocuments(docs);
        setDocLoadState('success');
      })
      .catch(() => {
        setDocLoadState('error');
      });
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  function handleMoveConfirm() {
    setStages((prev) =>
      prev.map((s, i) => {
        if (i < currentStageIndex) return s;
        if (i === currentStageIndex) {
          return { ...s, status: 'completed', completedDate: new Date().toISOString().split('T')[0] };
        }
        if (i === currentStageIndex + 1) {
          return { ...s, status: 'current' };
        }
        return s;
      })
    );
    setShowMoveModal(false);
    toast.success(t('toast.movedToStage', { stage: nextStage?.label ?? '' }));
  }

  return (
    <TooltipProvider>
      <div className="app-root">
        <Toaster position="bottom-right" richColors />
        <header className="navbar">
          <div className="navbar-left">
            <Button variant="ghost" size="sm" className="navbar-back">
              <ArrowLeft size={16} className="text-black" />
              <span className="text-black font-medium">{t('nav.back')}</span>
            </Button>
            <nav className="navbar-breadcrumb">
              <img src="/logo.png" alt="Logo" className="breadcrumb-logo" />
              <span className="breadcrumb-link">{t('nav.applications')}</span>
              <span className="breadcrumb-sep-slash">/</span>
              <span className="breadcrumb-current">{mockData.application.id}</span>
            </nav>
          </div>
          <div className="navbar-center">
            <div className="navbar-search">
              <Search size={14} className="search-icon" />
              <Input
                type="text"
                placeholder={t('nav.searchPlaceholder')}
                className="search-input border-0 shadow-none focus-visible:ring-0 bg-transparent h-auto p-0 text-sm"
              />
            </div>
          </div>
          <div className="navbar-right">
            <Button variant="outline" size="sm" className="btn-request-docs">
              <FileText size={14} />
              {t('nav.requestDocuments')}
            </Button>
            {isLastStage ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Button size="sm" disabled className="btn-move-stage btn-move-stage--disabled">
                      {t('nav.moveToNextStage')}
                      <ChevronRight size={14} />
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  {t('stages.finalStageTooltip')}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Button size="sm" className="btn-move-stage" onClick={() => setShowMoveModal(true)}>
                {t('nav.moveToNextStage')}
                <ChevronRight size={14} />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="navbar-more">
              <MoreVertical size={18} />
            </Button>
          </div>
        </header>

        <div className="stage-bar-wrapper">
          <StageProgressBar stages={stages} />
        </div>

        <div className="main-layout">
          <TravelerSidebar
            traveler={mockData.traveler}
            appointmentDate={mockData.application.appointmentDate}
          />

          <main className="main-content">
            <DocumentManagement
              documents={documents}
              loadState={docLoadState}
              onRetry={loadDocuments}
            />
          </main>

          <aside className="right-panel">
            <InternalNotes notes={mockData.internalNotes} />
            <div className="panel-divider" />
            <CommunicationLog log={mockData.communicationLog} />
          </aside>
        </div>

        {showMoveModal && currentStage && nextStage && (
          <MoveToNextStageModal
            currentStage={currentStage}
            nextStage={nextStage}
            onConfirm={handleMoveConfirm}
            onCancel={() => setShowMoveModal(false)}
          />
        )}
      </div>
    </TooltipProvider>
  );
}
