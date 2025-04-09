import {
  differenceInDays,
  format,
  formatDistance,
  isToday,
  parseISO,
} from "date-fns";
import { franc } from "franc";
import langs from "langs";
import { languages } from "../data/IOS-639-1";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const getLanguageName = (code) => {
  const language = languages.find((lang) => lang.Code === code);
  return language ? language.EnglishName : "Unknown";
};

export const getFlag = (code) => {
  const language = languages.find((lang) => lang.Code === code);
  return language ? language.Flag : "";
};

export const extractField = (data, field) =>
  data.map((item) => item[field]).filter(Boolean);

export const transformSection = (items, originalKey, translatedKey) => {
  return items
    .filter((item) => item[originalKey] && item[translatedKey])
    .map((item, index) => ({
      index,
      original: item[originalKey],
      translated: item[translatedKey],
    }));
};

export const escapeRegExp = (string) => {
  if (!string) return;
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// export const sliceDataLeftRight = (data) => {
//   if (!data) return;
//   const half = Math.ceil(data.length / 2);
//   const lines1 = data.slice(0, half);
//   const lines2 = data.slice(half, data.length);
//   const rowCount = Math.max(lines1.length, lines2.length);

//   // {left, right}
//   const dividedData = Array.from({ length: rowCount }, (_, i) => ({
//     left: lines1[i],
//     right: lines2[i],
//   }));
//   return dividedData;
// };
export const sliceDataLeftRight = (data) => {
  if (!data) return;

  const left = [];
  const right = [];

  for (let i = 0; i < data.length; i++) {
    if (i % 2 === 0) {
      left.push(data[i]); // 짝수 인덱스
    } else {
      right.push(data[i]); // 홀수 인덱스
    }
  }

  const rowCount = Math.max(left.length, right.length);
  const dividedData = Array.from({ length: rowCount }, (_, i) => ({
    left: left[i],
    right: right[i],
  }));

  return dividedData;
};

export function extractFirstImage(content) {
  const regex = /<img[^>]+src="([^">]+)"/g;
  const match = regex.exec(content);
  return match ? match[1] : null;
}

export function resizeImage(imageUrl, maxWidth = 300, maxHeight = 200) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // CORS 이슈 방지를 위해
    img.onload = function () {
      let width = img.width;
      let height = img.height;

      // 비율 계산
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // toBlob를 사용하여 JPEG 형식의 Blob 생성 (퀄리티 0.7)
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          // File 객체로 변환 (원하는 파일명과 MIME 타입 지정)
          const file = new File([blob], "resized.jpg", { type: "image/jpeg" });
          resolve(file);
        },
        "image/jpeg",
        0.7
      );
    };

    img.onerror = (error) => reject(error);
    img.src = imageUrl;
  });
}

export function customTimeFormat(createdAt) {
  return isToday(new Date(createdAt))
    ? formatDistanceFromNow(createdAt)?.replace("minutes", "min")
    : format(new Date(createdAt), "yyyy.MM.dd(EEE)");
}

export function shortName(string) {
  if (!string) return string;
  const words = string.split(" ");
  return words.length >= 10 ? words.slice(0, 10).join(" ") + "..." : string;
}

export function toEnglishName(code) {
  const language = languages.find(
    (lang) => lang.Code.toLowerCase() === code.toLowerCase()
  );
  return language?.EnglishName;
}

export async function fetchWrapper(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${errorMessage}`
    );
  }
  return response.json();
}

export function getLangCode(query) {
  const iso6393 = franc(query, { minLength: 20 });
  let languageCode = "en-US";
  if (iso6393 !== "und") {
    const langObj = langs.where("3", iso6393);
    if (langObj && langObj["1"]) {
      languageCode = langObj["1"];
    }
  }
  return languageCode;
}

export function maskEmail(email) {
  if (!email) return "";
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  // 로컬 부분의 첫 두 글자만 보이고 나머지는 * 처리 (길이에 따라 조정 가능)
  const visibleLength = Math.min(2, local.length);
  const maskedLocal =
    local.slice(0, visibleLength) + "*".repeat(local.length - visibleLength);
  return `${maskedLocal}@${domain}`;
}

export function transform(uploadData) {
  return {
    lines: transformSection(uploadData, "original", "translated"),
    words: transformSection(uploadData, "original_words", "translated_words"),
    phrases: transformSection(
      uploadData,
      "original_phrases",
      "translated_phrases"
    ),
    idioms: transformSection(
      uploadData,
      "original_idioms",
      "translated_idioms"
    ),
  };
}

export function cleansingData(showOrMovie) {
  const id = showOrMovie?.id;
  const backdropPath = showOrMovie?.backdrop_path;
  const name = showOrMovie?.name || showOrMovie?.title;
  const originalName =
    showOrMovie?.original_name || showOrMovie?.original_title;
  const poster = showOrMovie?.poster_path || showOrMovie?.backdrop_path;
  const date = showOrMovie?.first_air_date || showOrMovie?.release_date;
  const runTime = showOrMovie?.runtime || showOrMovie?.episode_run_time?.[0];
  const numberOfSeasons = showOrMovie?.number_of_seasons;
  const numberOfEpisodes = showOrMovie?.number_of_episodes;
  const overview = showOrMovie?.overview;
  const homepage = showOrMovie?.homepage;

  const vote = showOrMovie?.vote_average?.toFixed(1);
  const genres =
    showOrMovie?.genres?.map((genre) => genre.name).join(", ") || "N/A";
  const originalLanguage =
    showOrMovie?.original_language || showOrMovie?.original_language;
  const category = showOrMovie?.category || showOrMovie?.show_category;

  const seasonNumber = showOrMovie?.season_number;
  const episodeNumber = showOrMovie?.episode_number;

  const isTv = !!(showOrMovie?.first_air_date && showOrMovie?.name);

  return {
    id,
    name,
    originalName,
    poster,
    date,
    runTime,
    genres,
    originalLanguage,
    isTv,
    vote,
    numberOfSeasons,
    numberOfEpisodes,
    overview,
    homepage,
    category,
    backdropPath,
    seasonNumber,
    episodeNumber,
  };
}
