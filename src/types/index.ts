export interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

export interface Store {
  id: string;
  code: string;
  name: string;
  area: string;
  status: 'active' | 'inactive';
  postcode: string;
  created_at: string;
}

export interface Product {
  id: string;
  barcode: string;
  name: string;
  category: string;
  supplier: string;
  created_at: string;
}

export interface Supplier {
  id: string;
  postcode: string;
  name: string;
  store_count: number;
  last_supplied: string;
  created_at: string;
}

export interface Report {
  id: string;
  supplier_name: string;
  report_data: any;
  created_at: string;
}