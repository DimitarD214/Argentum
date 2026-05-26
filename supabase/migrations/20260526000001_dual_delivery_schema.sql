-- Phase 1: Add default delivery preferences to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS default_delivery_method VARCHAR(20) CHECK (default_delivery_method IN ('box_now', 'home_delivery')),
ADD COLUMN IF NOT EXISTS default_boxnow_locker_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS default_shipping_address JSONB;

-- Ensure orders columns exist
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS delivery_method VARCHAR(20) CHECK (delivery_method IN ('box_now', 'home_delivery')),
ADD COLUMN IF NOT EXISTS boxnow_locker_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS shipping_address JSONB;
