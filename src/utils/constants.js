import { MdOutlineImageNotSupported } from "react-icons/md";

export const PAGE_SIZE = 10;
export const IMG_PATH = "https://image.tmdb.org/t/p/w500";
export const DEFAULT_IMAGE =
  "https://placehold.co/500x750?text=No+Image&font=roboto";
export const NO_IMAGE = { MdOutlineImageNotSupported };
export const TMDB_KEY = "6f52a18ef9e4a14fe66d34b01664b30a";

export const TMDB_SEARCH_URL = "https://api.themoviedb.org/3/search";
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_TREND_URL = "https://api.themoviedb.org/3/trending";

export const POST_CATEGORY_OPTIONS = [
  { value: "general", label: "일반" },
  { value: "q&a", label: "질문" },
  { value: "error", label: "오류" },
  { value: "request", label: "요청" },
];
export const POST_TYPE_OPTIONS = [
  { value: "general", label: "일반" },
  { value: "notice", label: "공지" },
  { value: "vote", label: "투표" },
];
export const SELECT_OPTIONS = [{ value: "0", label: "0" }];

export const statusToTagName = {
  notice: "red",
  general: "grey",
  "checked-in": "green",
  "checked-out": "silver",
};

export const getPostCategoryOptions = (intl) => [
  {
    value: "general",
    label: intl.formatMessage({
      id: "post.category.general",
      defaultMessage: "일반",
    }),
  },
  {
    value: "q&a",
    label: intl.formatMessage({
      id: "post.category.q&a",
      defaultMessage: "질문",
    }),
  },
  {
    value: "error",
    label: intl.formatMessage({
      id: "post.category.error",
      defaultMessage: "오류",
    }),
  },
  {
    value: "request",
    label: intl.formatMessage({
      id: "post.category.request",
      defaultMessage: "요청",
    }),
  },
];

export const getPostTypeOptions = (intl) => [
  {
    value: "general",
    label: intl.formatMessage({
      id: "post.type.general",
      defaultMessage: "일반",
    }),
  },
  {
    value: "notice",
    label: intl.formatMessage({
      id: "post.type.notice",
      defaultMessage: "notice",
    }),
  },
  {
    value: "vote",
    label: intl.formatMessage({
      id: "post.type.vote",
      defaultMessage: "vote",
    }),
  },
];
