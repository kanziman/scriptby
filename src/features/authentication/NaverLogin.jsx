// import { useEffect } from "react";

// const NaverLogin = () => {
//   useEffect(() => {
//     // 네이버 로그인 스크립트 동적 로드
//     const script = document.createElement("script");
//     script.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js";
//     script.async = true;
//     document.body.appendChild(script);

//     script.onload = () => {
//       if (window.naver) {
//         // 네이버 로그인 초기화
//         const clientId = import.meta.env.VITE_NAVER_KEY;
//         const callbackUrl = "http://localhost:5173/callback";

//         const naverLogin = new window.naver.LoginWithNaverId({
//           clientId: clientId,
//           callbackUrl: callbackUrl,
//           isPopup: false, // 팝업 사용 여부 (false이면 리다이렉트 방식)
//           loginButton: { color: "green", type: 1, height: 40 }, // 버튼 스타일 옵션
//         });
//         naverLogin.init();
//       }
//     };

//     // 컴포넌트 언마운트 시 스크립트 제거
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     // 네이버 로그인 버튼이 렌더링 될 요소 (SDK가 이 div 내부에 버튼을 삽입)
//     <div id="naverIdLogin" />
//   );
// };

// export default NaverLogin;
