-- Migration: Add cart_data to profiles for cross-device syncing

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS cart_data JSONB DEFAULT '[]'::jsonb;
