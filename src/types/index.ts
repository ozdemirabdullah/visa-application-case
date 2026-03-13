export type StageStatus = 'completed' | 'current' | 'pending';
export type DocumentStatus = 'uploaded' | 'missing' | 'revision_requested';
export type RelatedAppStatus = 'approved' | 'rejected' | 'pending';
export type Channel = 'email' | 'sms';
export type DocLoadState = 'loading' | 'success' | 'error';

export interface Stage {
  key: string;
  label: string;
  status: StageStatus;
  completedDate?: string;
}

export interface Application {
  id: string;
  type: string;
  currentStage: string;
  stages: Stage[];
  appointmentDate: string;
}

export interface RelatedApplication {
  id: string;
  type: string;
  period: string;
  status: RelatedAppStatus;
}

export interface Traveler {
  name: string;
  initials: string;
  applicationLabel: string;
  passportNumber: string;
  traveler_id: string;
  email: string;
  phone: string;
  relatedApplications: RelatedApplication[];
}

export interface Document {
  id: string;
  name: string;
  status: DocumentStatus;
  uploadedDate: string | null;
  revisionNote?: string;
}

export interface InternalNote {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface CommunicationEntry {
  id: string;
  channel: Channel;
  subject: string;
  sentAt: string;
}

export interface ApplicationData {
  application: Application;
  traveler: Traveler;
  documents: Document[];
  internalNotes: InternalNote[];
  communicationLog: CommunicationEntry[];
}
