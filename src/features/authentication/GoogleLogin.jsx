import { useState } from "react";
import supabase from "../../services/supabase";

import styled from "styled-components";
import { useSettings } from "../../context/SettingsContext";
import SpinnerMini from "../../ui/SpinnerMini";

const GoogleIcon = styled.img`
  width: 50%;
  cursor: pointer;
  align-self: center;
`;

function GoogleLogin() {
  const [loading, setLoading] = useState(false);
  const { darkMode } = useSettings();
  const src = darkMode ? "google-dark.png" : "google-light.png";

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: `${window.location.origin}/loading`,
        // redirectTo: window.location.origin, // 로그인 완료 후 돌아올 URL
      },
    });

    if (error) {
      console.error("Google 로그인 에러:", error.message);
      setLoading(false);
    }
  };

  if (loading) return <SpinnerMini></SpinnerMini>;

  return (
    <GoogleIcon src={src} alt="google login icon" onClick={handleGoogleLogin} />
  );
}

export default GoogleLogin;
