-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Admins can delete reservations" ON public.reservations;
DROP POLICY IF EXISTS "Admins can update reservations" ON public.reservations;
DROP POLICY IF EXISTS "Admins can view all reservations" ON public.reservations;
DROP POLICY IF EXISTS "Anyone can create reservations" ON public.reservations;

-- Create proper permissive policies
-- INSERT: Anyone can create reservations (public form)
CREATE POLICY "Anyone can create reservations"
ON public.reservations
FOR INSERT
TO public
WITH CHECK (true);

-- SELECT: Only admins can view reservations (protects PII)
CREATE POLICY "Admins can view all reservations"
ON public.reservations
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- UPDATE: Only admins can update reservations
CREATE POLICY "Admins can update reservations"
ON public.reservations
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- DELETE: Only admins can delete reservations
CREATE POLICY "Admins can delete reservations"
ON public.reservations
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));