import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useIntl } from "react-intl";
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
import ReactEditor from "./ReactEditor";
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
          // orientation="vertical"
          label="TYPE"
          error={errors?.category?.message}
        >
          <Select
            id="type"
            options={typeOptions}
            type="white"
            disabled={!isManager}
            {...register("type", {
              required: "This field is required",
            })}
          />
        </FormRow>
        <FormRow
          // orientation="vertical"
          label="CATEGORY"
          error={errors?.category?.message}
        >
          <Select
            id="category"
            options={categoryOptions}
            type="white"
            // disabled={!isMaster}
            {...register("category", {
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
          <Controller
            name="content"
            control={control}
            rules={{ required: "Content is required" }}
            render={({ field }) => (
              <ReactEditor
                value={field.value}
                onChange={field.onChange}
                // 나머지 props
              />
            )}
          />
          {/* <ReactEditor
            id="content"
            value={editorContent}
            onChange={setEditorContent}
            style={{ width: "100%", height: "400px" }}
          /> */}
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
            Cancel
          </Button>
          <Button>저장</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default AddPostForm;
