-- Drop the user_roles table since admin system was removed
DROP TABLE IF EXISTS public.user_roles CASCADE;

-- Drop the app_role enum type
DROP TYPE IF EXISTS public.app_role CASCADE;

-- Drop the has_role function
DROP FUNCTION IF EXISTS public.has_role CASCADE;