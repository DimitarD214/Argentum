-- Migration: Remove n8n webhook and add native Next.js webhook

-- 1. Drop the old n8n trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS trigger_n8n_onboarding();

-- 2. Create the new native webhook function
CREATE OR REPLACE FUNCTION trigger_native_onboarding()
RETURNS TRIGGER AS $$
BEGIN
  -- POST the newly created user record to our Next.js backend
  PERFORM net.http_post(
    url := 'https://your-nextjs-app.com/api/webhooks/onboarding', -- TODO: Replace with your production Vercel/Next.js URL
    body := jsonb_build_object('record', row_to_json(NEW)),
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer YOUR_SECRET_KEY"}'::jsonb -- TODO: Replace with your secure token
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Re-create the trigger to use the new function
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION trigger_native_onboarding();
