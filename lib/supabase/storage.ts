import { supabase, getCurrentUserId } from './client';

export async function uploadBackGround(file: File, bucket = 'builder'): Promise<string> {
  const folder = await getCurrentUserId();
  const ext = file.name.split('.').pop();
  const path = `${folder}/backgrounds/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { cacheControl: '3600', upsert: false });

  if (error) throw new Error(`Upload échoué : ${error.message}`);

  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

export async function deleteBackGround(filename: string, bucket = 'builder'): Promise<void> {
  const folder = await getCurrentUserId();
  const { error } = await supabase.storage.from(bucket).remove([`${folder}/backgrounds/${filename}`]);
  if (error) throw new Error(`Suppression échouée : ${error.message}`);
}

export async function listBackGround(bucket = 'builder'): Promise<{ name: string; url: string }[]> {
  const folder = await getCurrentUserId();
  const { data, error } = await supabase.storage.from(bucket).list(`${folder}/backgrounds`, {
    sortBy: { column: 'created_at', order: 'desc' },
  });

  if (error) throw new Error(`Lecture échouée : ${error.message}`);

  return (data ?? []).map((file) => ({
    name: file.name,
    url: supabase.storage.from(bucket).getPublicUrl(`${folder}/images/${file.name}`).data.publicUrl,
  }));
}
