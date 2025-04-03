import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  &, &.light-mode {
  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;
  --color-green-100: #dcfce7;
  --color-green-700: #15803d;
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(255, 255, 255, 0.1);
  --backdrop-100: rgba(0, 0, 0,0.3);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
  

  --image-grayscale: 0;
  --image-opacity: 100%;

  --font-xs:1rem;
  --font-s:1.2rem;
  --font-m:1.4rem;
  --font-l:1.6rem;
  --font-xl:1.8rem;
  --font-xxl:2rem;
  --font-xxxl:2.4rem;

    /* 59em BELOW 944px (Tablets) */
    @media (max-width: 59em) {

      /* h3{
        font-size: 1.4rem;
      } */
    }


  }
  
  &.dark-mode {
    --color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;

--color-blue-100: #075985;
--color-blue-700: #e0f2fe;
--color-green-100: #166534;
--color-green-700: #dcfce7;
--color-yellow-100: #854d0e;
--color-yellow-700: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-indigo-100: #3730a3;
--color-indigo-700: #e0e7ff;

--color-red-100: #fee2e2;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--backdrop-color: rgba(0, 0, 0, 0.3);
--backdrop-100: rgba(255, 255, 255,0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
  }
  
  /* Indigo */
  --color-secondary-50: #eef2ff;
  --color-secondary-100: #e0e7ff;
  --color-secondary-200: #c7d2fe;
  --color-secondary-500: #6366f1;
  --color-secondary-600: #4f46e5;
  --color-secondary-700: #4338ca;
  --color-secondary-800: #3730a3;
  --color-secondary-900: #312e81;

  /*  */
  
  --color-brand-10: #edfbf3;
  --color-brand-30: #e9faf0;
  --color-brand-50: #e6f9ee;
  --color-brand-100: #cdf4dd;
  --color-brand-200: #b4eecc;
  --color-brand-200: #9be9bb;
  --color-brand-300: #83e3aa;
  --color-brand-400: #6add99;
  --color-brand-500: #51d888;
  --color-brand-600: #38d277;
  --color-brand-700: #06c755;
  --color-brand-800: #059f44;
  --color-brand-900: #047733;
  

  --color-tertiary-50:  #fff9e5; 
  --color-tertiary-100: #fff3cc;
  --color-tertiary-200: #ffecb2;
  --color-tertiary-300: #ffe699;
  --color-tertiary-400: #ffdf80;
  --color-tertiary-500: #FEE500; 
  --color-tertiary-600: #e6cf00;
  --color-tertiary-700: #cca800;
  --color-tertiary-800: #b38a00;
  --color-tertiary-900: #996d00; 

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;


}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  /* font-family: "Poppins", sans-serif; */
  /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
  Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; */

  /* font-family: "Poppins",'Sono', sans-serif; */
  font-family: "Poppins", "Sono", "Noto Sans KR", "Noto Sans JP", sans-serif;

  color: var(--color-grey-700);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;

}


input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
  
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

/* swiper navigation */
.swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 20px;       /* 아이콘 크기 조절 */
    /* color: #ddd; */
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: var(--color-brand);
    &:after {
      font-size: 1.8rem;
      font-weight: bold;
    }
    background-color: rgba(255, 255, 255, 0.5);
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  .swiper-wrapper {
    padding-bottom: 1rem;
  }
`;

export default GlobalStyles;

/*
FOR DARK MODE

--color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;

--color-blue-100: #075985;
--color-blue-700: #e0f2fe;
--color-green-100: #166534;
--color-green-700: #dcfce7;
--color-yellow-100: #854d0e;
--color-yellow-700: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-indigo-100: #3730a3;
--color-indigo-700: #e0e7ff;

--color-red-100: #fee2e2;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
*/
