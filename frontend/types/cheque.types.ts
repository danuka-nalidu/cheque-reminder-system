export type ChequeType = 'incoming' | 'outgoing';

export type ChequeStatus = 'pending' | 'overdue' | 'settled';

export interface Cheque {
  id: string;
  type: ChequeType;
  amount: number;
  bankName: string;
  settlementDate: Date;
  status: ChequeStatus;
  dateCreated: Date;
  chequeNumber?: string;
  payeePayer?: string;
  notes?: string;
}

export interface ChequeFormData {
  type: ChequeType;
  amount: string;
  bankName: string;
  settlementDate: Date;
  chequeNumber?: string;
  payeePayer?: string;
  notes?: string;
}

export type FilterType = 'all' | 'incoming' | 'outgoing' | 'pending' | 'overdue' | 'settled';
