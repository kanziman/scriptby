import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createPostApi, uploadImage } from "../../services/apiPost";
import { extractFirstImage, resizeImage } from "../../utils/helpers";

export function useCreatePost() {
  const queryClient = useQueryClient();

  const { mutate: createPost, isPending: isCreating } = useMutation({
    mutationFn: createPostApi,
    onSuccess: () => {
      toast.success("New post successfully created");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createPost, isCreating };
}

export async function submitPost(
  { id, title, content, category, type, userId, action },
  onSuccessCallback
) {
  // Quill 콘텐츠에서 첫 번째 이미지 URL 추출
  const originalImageUrl = extractFirstImage(content);

  // 이미지가 있으면 resizeImage로 리사이즈하여 thumb 데이터 생성
  const thumb = originalImageUrl ? await resizeImage(originalImageUrl) : null;
  const thumbUrl = await uploadImage(thumb, true);

  action(
    {
      id,
      title,
      content,
      category,
      type,
      user_id: userId,
      thumb: thumbUrl,
    },
    {
      onSuccess: onSuccessCallback,
    }
  );
}
