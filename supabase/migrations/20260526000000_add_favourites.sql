ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS favourites_data JSONB DEFAULT '[]'::jsonb;
