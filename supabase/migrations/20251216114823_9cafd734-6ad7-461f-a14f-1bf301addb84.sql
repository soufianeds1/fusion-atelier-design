-- Drop existing restrictive INSERT policy
DROP POLICY IF EXISTS "Anyone can create reservations" ON public.reservations;

-- Create proper PERMISSIVE INSERT policy (PERMISSIVE is default)
CREATE POLICY "Anyone can create reservations"
ON public.reservations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);