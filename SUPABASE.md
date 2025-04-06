# POLICY

## avatar policy

CREATE POLICY "public select"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "insert owner's avatar only"
ON storage.objects FOR INSERT
WITH CHECK (
bucket_id = 'avatars' AND
(storage.foldername(name))[1] = auth.uid()::text
);

## posts policy

CREATE POLICY "select_all_posts"
ON posts
FOR SELECT
USING (true);

CREATE POLICY "insert_own_or_admin_post"
ON posts
FOR INSERT
WITH CHECK (
user_id = auth.uid() OR public.is_admin()
);

CREATE POLICY "update_own_or_admin_post"
ON posts
FOR UPDATE
USING (
user_id = auth.uid() OR public.is_admin()
)
WITH CHECK (
user_id = auth.uid() OR public.is_admin()
);

CREATE POLICY "delete_own_or_admin_post"
ON posts
FOR DELETE
USING (
user_id = auth.uid() OR public.is_admin()
);
