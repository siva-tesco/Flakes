/*
  # Create Flakes Company Database Schema

  1. New Tables
    - `stores`
      - `id` (uuid, primary key)
      - `code` (text, unique)
      - `name` (text)
      - `area` (text)
      - `status` (text, active/inactive)
      - `postcode` (text)
      - `created_at` (timestamp)
    - `products`
      - `id` (uuid, primary key)
      - `barcode` (text, unique)
      - `name` (text)
      - `category` (text)
      - `supplier` (text)
      - `created_at` (timestamp)
    - `suppliers`
      - `id` (uuid, primary key)
      - `postcode` (text)
      - `name` (text)
      - `store_count` (integer)
      - `last_supplied` (date)
      - `created_at` (timestamp)
    - `reports`
      - `id` (uuid, primary key)
      - `supplier_name` (text)
      - `report_data` (jsonb)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their data
*/

-- Create stores table
CREATE TABLE IF NOT EXISTS stores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  area text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  postcode text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  barcode text UNIQUE NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  supplier text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  postcode text NOT NULL,
  name text NOT NULL,
  store_count integer NOT NULL DEFAULT 0,
  last_supplied date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_name text NOT NULL,
  report_data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create policies for stores
CREATE POLICY "Users can read stores"
  ON stores
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert stores"
  ON stores
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update stores"
  ON stores
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Users can delete stores"
  ON stores
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for products
CREATE POLICY "Users can read products"
  ON products
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Users can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for suppliers
CREATE POLICY "Users can read suppliers"
  ON suppliers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert suppliers"
  ON suppliers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update suppliers"
  ON suppliers
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Users can delete suppliers"
  ON suppliers
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for reports
CREATE POLICY "Users can read reports"
  ON reports
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert reports"
  ON reports
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update reports"
  ON reports
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Users can delete reports"
  ON reports
  FOR DELETE
  TO authenticated
  USING (true);