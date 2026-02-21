export interface RecordItem {
  id: number;
  filename?: string;
  cid: string;
  hash: string;
  patientId: number;
  createdAt?: string;
}

export interface PermissionRequest {
  id: number;
  doctorId: number;
  recordId: number;
  status: 'PENDING' | 'GRANTED' | 'REVOKED';
}
