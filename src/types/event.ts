
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
  user_id: string;
  status: string;
  attendance_date: string | null;
  access_granted_at?: string;
  created_at?: string;
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

export interface AffiliateCode {
  id: string;
  user_id: string;
  code: string;
  created_at: string;
}

export interface AffiliateReferral {
  id: string;
  affiliate_code: string;
  product_id: string;
  order_id: string | null;
  status: string;
  created_at: string;
  completed_at: string | null;
}

export interface AffiliateCommission {
  id: string;
  affiliate_user_id: string;
  affiliate_code: string;
  order_id: string;
  product_id: string | null;
  purchase_amount: number;
  commission_amount: number;
  status: string;
  created_at: string;
  paid_at: string | null;
}
