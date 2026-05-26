-- Migration: Add secure n8n onboarding trigger
-- Note: Requires pg_net extension to be enabled in Supabase

CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE OR REPLACE FUNCTION trigger_n8n_onboarding()
RETURNS TRIGGER AS $$
BEGIN
  -- We perform an HTTP POST securely from the database
  PERFORM net.http_post(
    url := 'https://your-n8n-domain.com/webhook/onboarding', -- TODO: User must replace this URL
    body := jsonb_build_object('user_id', NEW.id, 'email', NEW.email),
    headers := '{"Content-Type": "application/json"}'::jsonb
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION trigger_n8n_onboarding();
