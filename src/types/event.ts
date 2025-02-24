export interface EventPrice {
  id: string;
  event_name: string;
  price_amount: number;
  currency: string;
  is_active: boolean;
  ticket_description: string;
  valid_until: string;
}

export interface EventCohort {
  id: string;
  event_type: string;
  cohort_name: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export interface UserEventAccess {
  id: string;
  cohort_id: string;
  status: 'registered' | 'attended' | 'graduated';
  attendance_date: string | null;
}

export interface EventContentModule {
  id: string;
  event_type: string;
  title: string;
  description: string | null;
  icon: string;
  link: string;
  sequence_order: number;
  required_status: string[];
}
