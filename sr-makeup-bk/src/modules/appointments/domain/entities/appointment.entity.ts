export type AppointmentStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface AppointmentProps {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  notes?: string | null;
  status: AppointmentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class AppointmentEntity {
  constructor(private readonly props: AppointmentProps) {}

  get id(): string {
    return this.props.id;
  }

  get clientName(): string {
    return this.props.clientName;
  }

  get clientEmail(): string {
    return this.props.clientEmail;
  }

  get clientPhone(): string {
    return this.props.clientPhone;
  }

  get serviceId(): string {
    return this.props.serviceId;
  }

  get date(): string {
    return this.props.date;
  }

  get time(): string {
    return this.props.time;
  }

  get notes(): string | null | undefined {
    return this.props.notes;
  }

  get status(): AppointmentStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  confirm(): void {
    this.props.status = 'CONFIRMED';
    this.props.updatedAt = new Date();
  }

  cancel(): void {
    this.props.status = 'CANCELLED';
    this.props.updatedAt = new Date();
  }

  complete(): void {
    this.props.status = 'COMPLETED';
    this.props.updatedAt = new Date();
  }

  toJSON(): AppointmentProps {
    return { ...this.props };
  }
}

