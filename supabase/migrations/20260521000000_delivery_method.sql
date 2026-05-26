-- Migration to add delivery fields to orders
ALTER TABLE orders
ADD COLUMN delivery_method VARCHAR(20) CHECK (delivery_method IN ('box_now', 'home_delivery')),
ADD COLUMN boxnow_locker_id VARCHAR(50),
ADD COLUMN shipping_address JSONB; -- Expected format: { "street": "...", "city": "...", "zip": "..." }
