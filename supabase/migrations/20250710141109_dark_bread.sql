/*
  # Insert Sample Data for Flakes Company

  1. Sample Data
    - 100 stores with various details
    - 100 products across different categories
    - 10 suppliers with store relationships
    - 10 sample reports

  2. Data Distribution
    - Stores across different areas and postcodes
    - Products from various categories and suppliers
    - Suppliers with realistic store counts and dates
*/

-- Insert 100 sample stores
INSERT INTO stores (code, name, area, status, postcode) VALUES
('ST001', 'Flakes Downtown', 'Central District', 'active', 'CD001'),
('ST002', 'Flakes Mall Plaza', 'Shopping Center', 'active', 'SC002'),
('ST003', 'Flakes Riverside', 'Riverside Area', 'active', 'RA003'),
('ST004', 'Flakes Heights', 'Mountain View', 'active', 'MV004'),
('ST005', 'Flakes Express', 'Airport Zone', 'inactive', 'AZ005'),
('ST006', 'Flakes Corner', 'Suburban Area', 'active', 'SA006'),
('ST007', 'Flakes Metro', 'Metro Station', 'active', 'MS007'),
('ST008', 'Flakes Park', 'Park District', 'active', 'PD008'),
('ST009', 'Flakes Beach', 'Coastal Area', 'active', 'CA009'),
('ST010', 'Flakes Valley', 'Valley Region', 'active', 'VR010'),
('ST011', 'Flakes North', 'North District', 'active', 'ND011'),
('ST012', 'Flakes South', 'South District', 'active', 'SD012'),
('ST013', 'Flakes East', 'East District', 'active', 'ED013'),
('ST014', 'Flakes West', 'West District', 'active', 'WD014'),
('ST015', 'Flakes Central', 'City Center', 'active', 'CC015'),
('ST016', 'Flakes Garden', 'Garden District', 'active', 'GD016'),
('ST017', 'Flakes Harbor', 'Harbor Area', 'active', 'HA017'),
('ST018', 'Flakes Hill', 'Hill Station', 'active', 'HS018'),
('ST019', 'Flakes Lake', 'Lake District', 'active', 'LD019'),
('ST020', 'Flakes Forest', 'Forest Area', 'active', 'FA020'),
('ST021', 'Flakes University', 'University District', 'active', 'UD021'),
('ST022', 'Flakes Hospital', 'Medical District', 'active', 'MD022'),
('ST023', 'Flakes Stadium', 'Sports Complex', 'active', 'SP023'),
('ST024', 'Flakes Theater', 'Arts District', 'active', 'AD024'),
('ST025', 'Flakes Market', 'Market Square', 'active', 'MQ025'),
('ST026', 'Flakes Bridge', 'Bridge Area', 'active', 'BA026'),
('ST027', 'Flakes Tower', 'Business District', 'active', 'BD027'),
('ST028', 'Flakes Square', 'Town Square', 'active', 'TS028'),
('ST029', 'Flakes Junction', 'Transport Hub', 'active', 'TH029'),
('ST030', 'Flakes Outlet', 'Outlet Mall', 'active', 'OM030'),
('ST031', 'Flakes Premium', 'Premium District', 'active', 'PD031'),
('ST032', 'Flakes Classic', 'Historic District', 'active', 'HD032'),
('ST033', 'Flakes Modern', 'Modern Complex', 'active', 'MC033'),
('ST034', 'Flakes Elite', 'Elite Area', 'active', 'EA034'),
('ST035', 'Flakes Grand', 'Grand Avenue', 'active', 'GA035'),
('ST036', 'Flakes Royal', 'Royal District', 'active', 'RD036'),
('ST037', 'Flakes Crown', 'Crown Plaza', 'active', 'CP037'),
('ST038', 'Flakes Star', 'Star Complex', 'active', 'SC038'),
('ST039', 'Flakes Diamond', 'Diamond District', 'active', 'DD039'),
('ST040', 'Flakes Gold', 'Gold Coast', 'active', 'GC040'),
('ST041', 'Flakes Silver', 'Silver Heights', 'active', 'SH041'),
('ST042', 'Flakes Platinum', 'Platinum Plaza', 'active', 'PP042'),
('ST043', 'Flakes Crystal', 'Crystal Bay', 'active', 'CB043'),
('ST044', 'Flakes Pearl', 'Pearl Harbor', 'active', 'PH044'),
('ST045', 'Flakes Ruby', 'Ruby Ridge', 'active', 'RR045'),
('ST046', 'Flakes Emerald', 'Emerald City', 'active', 'EC046'),
('ST047', 'Flakes Sapphire', 'Sapphire Springs', 'active', 'SS047'),
('ST048', 'Flakes Opal', 'Opal Gardens', 'active', 'OG048'),
('ST049', 'Flakes Jade', 'Jade Valley', 'active', 'JV049'),
('ST050', 'Flakes Amber', 'Amber Hills', 'active', 'AH050'),
('ST051', 'Flakes Coral', 'Coral Reef', 'active', 'CR051'),
('ST052', 'Flakes Ivory', 'Ivory Tower', 'active', 'IT052'),
('ST053', 'Flakes Onyx', 'Onyx Plaza', 'active', 'OP053'),
('ST054', 'Flakes Quartz', 'Quartz Quarter', 'active', 'QQ054'),
('ST055', 'Flakes Marble', 'Marble Manor', 'active', 'MM055'),
('ST056', 'Flakes Granite', 'Granite Grove', 'active', 'GG056'),
('ST057', 'Flakes Slate', 'Slate Street', 'active', 'SS057'),
('ST058', 'Flakes Limestone', 'Limestone Lane', 'active', 'LL058'),
('ST059', 'Flakes Sandstone', 'Sandstone Square', 'active', 'SS059'),
('ST060', 'Flakes Cobalt', 'Cobalt Corner', 'active', 'CC060'),
('ST061', 'Flakes Copper', 'Copper Creek', 'active', 'CC061'),
('ST062', 'Flakes Bronze', 'Bronze Boulevard', 'active', 'BB062'),
('ST063', 'Flakes Steel', 'Steel Street', 'active', 'SS063'),
('ST064', 'Flakes Iron', 'Iron Island', 'active', 'II064'),
('ST065', 'Flakes Aluminum', 'Aluminum Alley', 'active', 'AA065'),
('ST066', 'Flakes Titanium', 'Titanium Terrace', 'active', 'TT066'),
('ST067', 'Flakes Chrome', 'Chrome Circle', 'active', 'CC067'),
('ST068', 'Flakes Nickel', 'Nickel Neighborhood', 'active', 'NN068'),
('ST069', 'Flakes Zinc', 'Zinc Zone', 'active', 'ZZ069'),
('ST070', 'Flakes Lead', 'Lead Lane', 'active', 'LL070'),
('ST071', 'Flakes Tin', 'Tin Town', 'active', 'TT071'),
('ST072', 'Flakes Mercury', 'Mercury Mile', 'active', 'MM072'),
('ST073', 'Flakes Magnesium', 'Magnesium Mall', 'active', 'MM073'),
('ST074', 'Flakes Calcium', 'Calcium Court', 'active', 'CC074'),
('ST075', 'Flakes Sodium', 'Sodium Square', 'active', 'SS075'),
('ST076', 'Flakes Potassium', 'Potassium Park', 'active', 'PP076'),
('ST077', 'Flakes Lithium', 'Lithium Lane', 'active', 'LL077'),
('ST078', 'Flakes Beryllium', 'Beryllium Boulevard', 'active', 'BB078'),
('ST079', 'Flakes Boron', 'Boron Beach', 'active', 'BB079'),
('ST080', 'Flakes Carbon', 'Carbon Center', 'active', 'CC080'),
('ST081', 'Flakes Nitrogen', 'Nitrogen North', 'active', 'NN081'),
('ST082', 'Flakes Oxygen', 'Oxygen Oaks', 'active', 'OO082'),
('ST083', 'Flakes Fluorine', 'Fluorine Falls', 'active', 'FF083'),
('ST084', 'Flakes Neon', 'Neon Nights', 'active', 'NN084'),
('ST085', 'Flakes Helium', 'Helium Heights', 'active', 'HH085'),
('ST086', 'Flakes Hydrogen', 'Hydrogen Harbor', 'active', 'HH086'),
('ST087', 'Flakes Argon', 'Argon Avenue', 'active', 'AA087'),
('ST088', 'Flakes Krypton', 'Krypton Keep', 'active', 'KK088'),
('ST089', 'Flakes Xenon', 'Xenon Xing', 'active', 'XX089'),
('ST090', 'Flakes Radon', 'Radon Ridge', 'active', 'RR090'),
('ST091', 'Flakes Cesium', 'Cesium City', 'active', 'CC091'),
('ST092', 'Flakes Francium', 'Francium Fields', 'active', 'FF092'),
('ST093', 'Flakes Radium', 'Radium Road', 'active', 'RR093'),
('ST094', 'Flakes Actinium', 'Actinium Acres', 'active', 'AA094'),
('ST095', 'Flakes Thorium', 'Thorium Thicket', 'active', 'TT095'),
('ST096', 'Flakes Uranium', 'Uranium Union', 'active', 'UU096'),
('ST097', 'Flakes Neptunium', 'Neptunium Nook', 'active', 'NN097'),
('ST098', 'Flakes Plutonium', 'Plutonium Plaza', 'active', 'PP098'),
('ST099', 'Flakes Americium', 'Americium Avenue', 'active', 'AA099'),
('ST100', 'Flakes Curium', 'Curium Court', 'active', 'CC100');

-- Insert 100 sample products
INSERT INTO products (barcode, name, category, supplier) VALUES
('BC001', 'Chocolate Flakes Original', 'Breakfast Cereals', 'Morning Foods Ltd'),
('BC002', 'Honey Nut Flakes', 'Breakfast Cereals', 'Morning Foods Ltd'),
('BC003', 'Strawberry Flakes', 'Breakfast Cereals', 'Berry Suppliers Inc'),
('BC004', 'Banana Flakes', 'Breakfast Cereals', 'Tropical Foods Co'),
('BC005', 'Vanilla Flakes', 'Breakfast Cereals', 'Morning Foods Ltd'),
('BC006', 'Cinnamon Flakes', 'Breakfast Cereals', 'Spice World Ltd'),
('BC007', 'Almond Flakes', 'Breakfast Cereals', 'Nut Suppliers Inc'),
('BC008', 'Coconut Flakes', 'Breakfast Cereals', 'Tropical Foods Co'),
('BC009', 'Blueberry Flakes', 'Breakfast Cereals', 'Berry Suppliers Inc'),
('BC010', 'Apple Cinnamon Flakes', 'Breakfast Cereals', 'Orchard Fresh Ltd'),
('BC011', 'Protein Power Flakes', 'Health Foods', 'Fitness Foods Co'),
('BC012', 'Organic Wheat Flakes', 'Health Foods', 'Green Valley Organic'),
('BC013', 'Gluten-Free Flakes', 'Health Foods', 'Special Diet Foods'),
('BC014', 'Fiber Rich Flakes', 'Health Foods', 'Healthy Choice Ltd'),
('BC015', 'Low Sugar Flakes', 'Health Foods', 'Diet Solutions Inc'),
('BC016', 'Vitamin Enriched Flakes', 'Health Foods', 'Nutrition Plus Co'),
('BC017', 'Whole Grain Flakes', 'Health Foods', 'Grain Masters Ltd'),
('BC018', 'Quinoa Flakes', 'Health Foods', 'Super Grains Inc'),
('BC019', 'Chia Seed Flakes', 'Health Foods', 'Seed Specialists Co'),
('BC020', 'Flax Seed Flakes', 'Health Foods', 'Omega Foods Ltd'),
('BC021', 'Chocolate Chip Cookies', 'Snacks', 'Sweet Treats Inc'),
('BC022', 'Granola Bars', 'Snacks', 'Energy Bar Co'),
('BC023', 'Trail Mix', 'Snacks', 'Adventure Foods Ltd'),
('BC024', 'Dried Fruit Mix', 'Snacks', 'Fruit Delight Co'),
('BC025', 'Nuts & Seeds Mix', 'Snacks', 'Nut Suppliers Inc'),
('BC026', 'Yogurt Covered Raisins', 'Snacks', 'Dairy Delights Ltd'),
('BC027', 'Chocolate Covered Almonds', 'Snacks', 'Confection Masters'),
('BC028', 'Honey Roasted Peanuts', 'Snacks', 'Roasted Nut Co'),
('BC029', 'Caramel Popcorn', 'Snacks', 'Popcorn Palace Ltd'),
('BC030', 'Cheese Crackers', 'Snacks', 'Cracker Company Inc'),
('BC031', 'Whole Milk', 'Dairy', 'Fresh Dairy Co'),
('BC032', 'Skim Milk', 'Dairy', 'Fresh Dairy Co'),
('BC033', 'Almond Milk', 'Dairy', 'Plant Based Foods'),
('BC034', 'Soy Milk', 'Dairy', 'Plant Based Foods'),
('BC035', 'Greek Yogurt', 'Dairy', 'Mediterranean Foods'),
('BC036', 'Cottage Cheese', 'Dairy', 'Fresh Dairy Co'),
('BC037', 'Cheddar Cheese', 'Dairy', 'Artisan Cheese Co'),
('BC038', 'Mozzarella Cheese', 'Dairy', 'Italian Foods Ltd'),
('BC039', 'Cream Cheese', 'Dairy', 'Fresh Dairy Co'),
('BC040', 'Butter', 'Dairy', 'Farm Fresh Dairy'),
('BC041', 'Orange Juice', 'Beverages', 'Citrus Fresh Ltd'),
('BC042', 'Apple Juice', 'Beverages', 'Orchard Fresh Ltd'),
('BC043', 'Cranberry Juice', 'Beverages', 'Berry Suppliers Inc'),
('BC044', 'Grape Juice', 'Beverages', 'Vineyard Products'),
('BC045', 'Tomato Juice', 'Beverages', 'Garden Fresh Co'),
('BC046', 'Green Tea', 'Beverages', 'Tea Masters Ltd'),
('BC047', 'Black Coffee', 'Beverages', 'Coffee Roasters Inc'),
('BC048', 'Herbal Tea', 'Beverages', 'Natural Herbs Co'),
('BC049', 'Energy Drink', 'Beverages', 'Power Drinks Ltd'),
('BC050', 'Sports Drink', 'Beverages', 'Athletic Nutrition'),
('BC051', 'White Bread', 'Bakery', 'Daily Bread Co'),
('BC052', 'Whole Wheat Bread', 'Bakery', 'Healthy Bakery Ltd'),
('BC053', 'Sourdough Bread', 'Bakery', 'Artisan Bakery Co'),
('BC054', 'Rye Bread', 'Bakery', 'European Bakery'),
('BC055', 'Bagels', 'Bakery', 'Morning Bakery Inc'),
('BC056', 'Croissants', 'Bakery', 'French Bakery Ltd'),
('BC057', 'Muffins', 'Bakery', 'Sweet Bakery Co'),
('BC058', 'Danish Pastry', 'Bakery', 'European Bakery'),
('BC059', 'Donuts', 'Bakery', 'Donut Delights Inc'),
('BC060', 'Cinnamon Rolls', 'Bakery', 'Sweet Bakery Co'),
('BC061', 'Fresh Apples', 'Fruits', 'Orchard Fresh Ltd'),
('BC062', 'Fresh Bananas', 'Fruits', 'Tropical Foods Co'),
('BC063', 'Fresh Oranges', 'Fruits', 'Citrus Fresh Ltd'),
('BC064', 'Fresh Strawberries', 'Fruits', 'Berry Suppliers Inc'),
('BC065', 'Fresh Grapes', 'Fruits', 'Vineyard Products'),
('BC066', 'Fresh Pineapple', 'Fruits', 'Tropical Foods Co'),
('BC067', 'Fresh Mango', 'Fruits', 'Exotic Fruits Ltd'),
('BC068', 'Fresh Kiwi', 'Fruits', 'Exotic Fruits Ltd'),
('BC069', 'Fresh Peaches', 'Fruits', 'Stone Fruit Co'),
('BC070', 'Fresh Pears', 'Fruits', 'Orchard Fresh Ltd'),
('BC071', 'Fresh Carrots', 'Vegetables', 'Garden Fresh Co'),
('BC072', 'Fresh Broccoli', 'Vegetables', 'Green Vegetables Ltd'),
('BC073', 'Fresh Spinach', 'Vegetables', 'Leafy Greens Co'),
('BC074', 'Fresh Tomatoes', 'Vegetables', 'Garden Fresh Co'),
('BC075', 'Fresh Lettuce', 'Vegetables', 'Salad Greens Inc'),
('BC076', 'Fresh Cucumbers', 'Vegetables', 'Garden Fresh Co'),
('BC077', 'Fresh Bell Peppers', 'Vegetables', 'Pepper Growers Ltd'),
('BC078', 'Fresh Onions', 'Vegetables', 'Root Vegetables Co'),
('BC079', 'Fresh Potatoes', 'Vegetables', 'Potato Farmers Inc'),
('BC080', 'Fresh Garlic', 'Vegetables', 'Herb & Spice Co'),
('BC081', 'Chicken Breast', 'Meat', 'Premium Poultry Ltd'),
('BC082', 'Ground Beef', 'Meat', 'Quality Beef Co'),
('BC083', 'Pork Chops', 'Meat', 'Farm Fresh Pork'),
('BC084', 'Salmon Fillet', 'Seafood', 'Ocean Fresh Ltd'),
('BC085', 'Tuna Steaks', 'Seafood', 'Deep Sea Catch'),
('BC086', 'Shrimp', 'Seafood', 'Coastal Seafood Co'),
('BC087', 'Cod Fillet', 'Seafood', 'Northern Waters Ltd'),
('BC088', 'Crab Legs', 'Seafood', 'Shellfish Specialists'),
('BC089', 'Lobster Tail', 'Seafood', 'Luxury Seafood Co'),
('BC090', 'Scallops', 'Seafood', 'Premium Shellfish'),
('BC091', 'Frozen Pizza', 'Frozen Foods', 'Quick Meal Solutions'),
('BC092', 'Ice Cream', 'Frozen Foods', 'Frozen Delights Ltd'),
('BC093', 'Frozen Vegetables', 'Frozen Foods', 'Freeze Fresh Co'),
('BC094', 'Frozen Berries', 'Frozen Foods', 'Berry Freeze Ltd'),
('BC095', 'Frozen Waffles', 'Frozen Foods', 'Breakfast Solutions'),
('BC096', 'Frozen Yogurt', 'Frozen Foods', 'Healthy Frozen Co'),
('BC097', 'Frozen Dinner', 'Frozen Foods', 'Complete Meals Inc'),
('BC098', 'Frozen Fish Sticks', 'Frozen Foods', 'Kid Friendly Foods'),
('BC099', 'Frozen French Fries', 'Frozen Foods', 'Potato Products Ltd'),
('BC100', 'Frozen Chicken Nuggets', 'Frozen Foods', 'Family Favorites Co');

-- Insert 10 sample suppliers
INSERT INTO suppliers (postcode, name, store_count, last_supplied) VALUES
('SP001', 'Morning Foods Ltd', 15, '2024-01-15'),
('SP002', 'Berry Suppliers Inc', 12, '2024-01-10'),
('SP003', 'Tropical Foods Co', 8, '2024-01-20'),
('SP004', 'Fresh Dairy Co', 20, '2024-01-18'),
('SP005', 'Garden Fresh Co', 18, '2024-01-12'),
('SP006', 'Orchard Fresh Ltd', 10, '2024-01-22'),
('SP007', 'Ocean Fresh Ltd', 6, '2024-01-08'),
('SP008', 'Quality Beef Co', 14, '2024-01-25'),
('SP009', 'Artisan Bakery Co', 9, '2024-01-14'),
('SP010', 'Frozen Delights Ltd', 11, '2024-01-16');

-- Insert 10 sample reports
INSERT INTO reports (supplier_name, report_data) VALUES
('Store Performance Report', '{"type": "store_performance", "total_stores": 100, "active_stores": 99, "inactive_stores": 1, "top_performing_areas": ["Central District", "Shopping Center", "Metro Station"]}'),
('Product Analysis Report', '{"type": "product_analysis", "total_products": 100, "categories": {"Breakfast Cereals": 20, "Health Foods": 10, "Snacks": 10, "Dairy": 10, "Beverages": 10, "Bakery": 10, "Fruits": 10, "Vegetables": 10, "Meat": 3, "Seafood": 7}}'),
('Supplier Summary Report', '{"type": "supplier_summary", "total_suppliers": 10, "average_store_count": 12.3, "most_recent_supply": "2024-01-25", "top_suppliers": ["Fresh Dairy Co", "Garden Fresh Co", "Morning Foods Ltd"]}'),
('Monthly Sales Report', '{"type": "monthly_sales", "month": "January 2024", "total_revenue": 2500000, "growth_percentage": 12.5, "best_selling_category": "Breakfast Cereals"}'),
('Inventory Status Report', '{"type": "inventory_status", "total_items": 100, "low_stock_items": 5, "out_of_stock_items": 0, "overstocked_items": 3}'),
('Customer Satisfaction Report', '{"type": "customer_satisfaction", "average_rating": 4.7, "total_reviews": 1250, "satisfaction_rate": 94.2, "improvement_areas": ["Delivery Speed", "Product Variety"]}'),
('Regional Performance Report', '{"type": "regional_performance", "best_region": "Central District", "worst_region": "Airport Zone", "growth_regions": ["Metro Station", "Park District"]}'),
('Seasonal Trends Report', '{"type": "seasonal_trends", "season": "Winter 2024", "trending_products": ["Hot Beverages", "Comfort Foods"], "declining_products": ["Cold Beverages", "Ice Cream"]}'),
('Supply Chain Report', '{"type": "supply_chain", "delivery_performance": 96.8, "average_delivery_time": "2.3 days", "supplier_reliability": 98.5, "cost_efficiency": 87.2}'),
('Financial Summary Report', '{"type": "financial_summary", "quarter": "Q1 2024", "profit_margin": 18.5, "operating_costs": 2100000, "net_profit": 485000, "roi": 23.1}');