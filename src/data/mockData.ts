import type { ApplicationData } from '../types';

export const mockData: ApplicationData = {
  application: {
    id: '#7418',
    type: 'Schengen Italy',
    currentStage: 'appointment_booking',
    stages: [
      { key: 'document_collection', label: 'Document Collection', status: 'completed', completedDate: '2026-02-20' },
      { key: 'appointment_booking', label: 'Appointment Booking', status: 'current' },
      { key: 'submission', label: 'Submission', status: 'pending' },
      { key: 'processing', label: 'Processing', status: 'pending' },
      { key: 'decision', label: 'Decision', status: 'pending' },
    ],
    appointmentDate: '2026-03-08T10:30:00Z',
  },
  traveler: {
    name: 'Phoebe Buffay',
    initials: 'PB',
    applicationLabel: 'Schengen Italy',
    passportNumber: 'P87654321',
    traveler_id: '#12345',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    relatedApplications: [
      { id: '#68234', type: 'UK Business Visa', period: 'Oct 2025', status: 'approved' },
      { id: '#25647', type: 'Schengen Tourist', period: 'March 2025', status: 'approved' },
      { id: '#25647', type: 'Schengen Tourist', period: 'March 2025', status: 'rejected' },
    ],
  },
  documents: [
    { id: 'doc_1', name: 'Passport', status: 'uploaded', uploadedDate: '2026-02-08' },
    { id: 'doc_2', name: 'Photo Biometric', status: 'missing', uploadedDate: null },
    { id: 'doc_3', name: 'Bank Statement', status: 'revision_requested', uploadedDate: '2026-02-28', revisionNote: 'Bank statement must cover the last 6 months. Current document only covers 3 months.' },
    { id: 'doc_4', name: 'Travel Insurance', status: 'uploaded', uploadedDate: '2026-02-08' },
    { id: 'doc_5', name: 'Hotel Reservation', status: 'missing', uploadedDate: null },
    { id: 'doc_6', name: 'Flight Itinerary', status: 'uploaded', uploadedDate: '2026-02-08' },
    { id: 'doc_7', name: 'Letter of Intent', status: 'uploaded', uploadedDate: '2026-02-08' },
  ],
  internalNotes: [
    { id: 'note_1', author: 'Monica Geller', content: 'Called traveler to follow up on missing documents. Will submit by Fev.', createdAt: '2026-03-06T14:00:00Z' },
    { id: 'note_2', author: 'Joey Tribbiani', content: 'Bank Statement revision requested.', createdAt: '2026-03-03T09:00:00Z' },
  ],
  communicationLog: [
    { id: 'comm_1', channel: 'email', subject: 'Document Request - Bank State...', sentAt: '2026-03-05T10:00:00Z' },
    { id: 'comm_2', channel: 'sms', subject: 'Appointment reminder - Feb15, 10:...', sentAt: '2026-03-04T09:00:00Z' },
    { id: 'comm_3', channel: 'email', subject: 'Document Request - Bank State...', sentAt: '2026-03-03T11:00:00Z' },
    { id: 'comm_4', channel: 'email', subject: 'Document Request - Bank State...', sentAt: '2026-03-02T14:00:00Z' },
    { id: 'comm_5', channel: 'email', subject: 'Document Request - Bank State...', sentAt: '2026-03-01T16:00:00Z' },
    { id: 'comm_6', channel: 'email', subject: 'Document Request - Bank State...', sentAt: '2026-02-28T10:00:00Z' },
  ],
};
