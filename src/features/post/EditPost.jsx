import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import {
  POST_CATEGORY_OPTIONS,
  POST_TYPE_OPTIONS,
} from "../../utils/constants";
import { useUser } from "../authentication/useUser";
import TiptapEditor from "./TiptapEditor";
import { submitPost } from "./useCreatePost";
import { usePost } from "./usePost"; // 커스텀 훅으로 해당 post 데이터를 가져온다고 가정
import { useUpdatePost } from "./useUpdatePost"; // 업데이트 기능을 제공하는 커스텀 훅

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

function EditPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [editorContent, setEditorContent] = useState("");
  const { updatePost } = useUpdatePost();
  const { user: currentUser } = useUser();
  const isMaster = currentUser?.isMaster;

  const { register, handleSubmit, reset, setValue, watch, formState } = useForm(
    {
      defaultValues: {
        category: "general",
        type: "general",
        title: "",
        content: "",
      },
    }
  );
  const { errors } = formState;
  const watchedTitle = watch("title");
  const watchedContent = watch("content");

  // 기존 게시글 데이터 불러오기
  const { post, isLoading } = usePost(postId);

  // 게시글 데이터가 로드되면 form의 기본값과 에디터 콘텐츠를 업데이트
  useEffect(() => {
    if (post) {
      reset({
        category: post.category,
        type: post.type,
        title: post.title,
        content: post.content,
      });
      setEditorContent(post.content);
    }
  }, [post, reset]);

  // ReactEditor의 값이 변경되면 "content" 필드 업데이트
  useEffect(() => {
    setValue("content", editorContent);
  }, [editorContent, setValue]);

  useEffect(() => {
    register("content", { required: "Content is required" });
  }, [register]);

  // onSubmit 함수는 수정된 데이터를 updatePost를 통해 업데이트하며, 성공 시 onSuccessCallback을 호출합니다.
  const onSubmit = (data) => {
    submitPost(
      { ...data, id: postId, user_id: currentUser?.id, action: updatePost },
      () => {
        reset();
        setEditorContent("");
        navigate(`/posts`, { replace: true });
      }
    );
  };

  function onError(errors) {
    console.log(errors);
  }

  const submitable = watchedTitle !== "" && watchedContent !== "";

  if (isLoading) return <div>Loading...</div>;

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="CATEGORY" error={errors?.category?.message}>
        <Select
          id="category"
          options={POST_CATEGORY_OPTIONS}
          type="white"
          disabled={!isMaster}
          {...register("category", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="TYPE" error={errors?.type?.message}>
        <Select
          id="type"
          options={POST_TYPE_OPTIONS}
          type="white"
          disabled={!isMaster}
          {...register("type", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        orientation="vertical"
        label="TITLE"
        error={errors?.title?.message}
      >
        <Input
          id="title"
          type="text"
          placeholder="제목을 입력하세요"
          {...register("title", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        orientation="vertical"
        label="CONTENT"
        error={errors?.content?.message}
      >
        <TiptapEditor
          id="content"
          modelValue={editorContent}
          onChange={setEditorContent}
        ></TiptapEditor>
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => {
            reset();
            setEditorContent("");
          }}
        >
          <FormattedMessage id="button.cancel" />
        </Button>
        <Button disabled={!submitable}>
          <FormattedMessage id="button.submit" />
        </Button>
      </FormRow>
    </Form>
  );
}

export default EditPost;
