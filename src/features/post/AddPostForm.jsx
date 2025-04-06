import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import {
  getPostCategoryOptions,
  getPostTypeOptions,
} from "../../utils/constants";
import { useUser } from "../authentication/useUser";
import TiptapEditor from "./TiptapEditor";
import { submitPost, useCreatePost } from "./useCreatePost";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

function AddPostForm() {
  const navigate = useNavigate();
  const [editorContent, setEditorContent] = useState("");
  const { createPost } = useCreatePost();
  const { user: currentUser } = useUser();
  const isManager = currentUser?.isManager;
  const { control, register, handleSubmit, reset, setValue, formState } =
    useForm({
      defaultValues: {
        category: "general",
        type: "general",
        title: "",
        content: "",
      },
    });

  const { errors } = formState;

  const intl = useIntl();
  const categoryOptions = getPostCategoryOptions(intl);
  const typeOptions = getPostTypeOptions(intl);

  // quill to react-form
  useEffect(() => {
    setValue("content", editorContent);
  }, [editorContent, setValue]);

  useEffect(() => {
    register("content", { required: "Content is required" });
  }, [register]);

  const onSubmit = (data) => {
    submitPost({ ...data, userId: currentUser?.id, action: createPost }, () => {
      reset();
      setEditorContent("");
      navigate("/posts");
    });
  };

  function onError(errors) {
    console.log(errors);
  }
  // const submitable =
  // watchedTitle.trim() !== "" && !isContentEmpty(watchedContent);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow
          label={<FormattedMessage id="post.type" />}
          error={errors?.type?.message}
        >
          <Select
            id="type"
            options={typeOptions}
            type="white"
            disabled={!currentUser?.isMaster}
            {...register("type", {
              required: "This field is required",
            })}
          />
        </FormRow>
        <FormRow
          label={<FormattedMessage id="post.category" />}
          error={errors?.category?.message}
        >
          <Select
            id="category"
            options={categoryOptions}
            type="white"
            // disabled={!currentUser?.isMaster}
            {...register("category", {
              required: "This field is required",
            })}
          />
        </FormRow>
        <FormRow
          orientation="vertical"
          label={<FormattedMessage id="post.title" />}
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
          label={<FormattedMessage id="post.content" />}
          error={errors?.content?.message}
        >
          <Controller
            name="content"
            control={control}
            rules={{ required: "Content is required" }}
            render={({ field }) => (
              <TiptapEditor
                id="content"
                modelValue={field.value}
                onChange={field.onChange}
              ></TiptapEditor>
            )}
          />
        </FormRow>

        <FormRow hasButton>
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
          <Button>
            <FormattedMessage id="button.submit" />
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default AddPostForm;
