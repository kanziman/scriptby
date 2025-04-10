import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { QueryProvider } from "./context/QueryContext";
import { SettingsProvider } from "./context/SettingsContext";
import { SidebarProvider } from "./context/SidebarContext";
import LocationLogger from "./features/logger/LocationLogger";
import Account from "./pages/Account";
import AddPostPage from "./pages/AddPostPage";
import AddScriptPage from "./pages/AddScriptPage";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import LoadingPage from "./pages/Callback";
import Checkin from "./pages/Checkin";
import ConvertPage from "./pages/ConvertPage";
import DashboardPage from "./pages/DashboardPage";
import FindPage from "./pages/Find";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import PostPage from "./pages/PostPage";
import PostsPage from "./pages/PostsPage";
import ScriptPage from "./pages/ScriptPage";
import ScriptsAllPage from "./pages/ScriptsAllPage";
import SignUp from "./pages/SignUp";
import TrendDetailPage from "./pages/TrendDetailPage";
import Users from "./pages/Users";
import supabase from "./services/supabase";
import GlobalStyles from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 10,
    },
  },
});

function App() {
  useEffect(() => {
    // 페이지 로드 시 세션 체크
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        // 세션 저장 또는 상태 업데이트 작업
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <BrowserRouter>
      <SettingsProvider>
        <SidebarProvider>
          <QueryProvider>
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} />

              <GlobalStyles />
              <LocationLogger />
              <ThemeProvider theme={theme}>
                <Routes>
                  <Route element={<AppLayout />}>
                    <Route
                      index
                      element={<Navigate replace to="dashboard" />}
                    />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="bookings" element={<Bookings />} />
                    <Route path="bookings/:bookingId" element={<Booking />} />
                    <Route path="checkin/:bookingId" element={<Checkin />} />
                    <Route path="cabins" element={<Cabins />} />
                    {/* <Route path="scripts" element={<Scripts />} /> */}

                    {/* <Route
                    path="scripts/shows/:showId"
                    element={<ScriptsPage />}
                  /> */}

                    {/* ALL */}
                    <Route path="find" element={<FindPage />} />
                    <Route path="posts" element={<PostsPage />} />
                    <Route path="posts/:postId" element={<PostPage />} />
                    <Route path="scripts" element={<ScriptsAllPage />} />
                    <Route path="scripts/:scriptId" element={<ScriptPage />} />
                    {/* <Route path="settings" element={<Settings />} /> */}
                    <Route
                      path="/trend/movie/:trendId"
                      element={<TrendDetailPage />}
                    />
                    <Route
                      path="/trend/tv/:trendId"
                      element={<TrendDetailPage />}
                    />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="loading" element={<LoadingPage />} />

                    {/*  PROTECTED */}
                    <Route
                      element={<ProtectedRoute requiredPlay={["tutor"]} />}
                    >
                      <Route path="script/add" element={<AddScriptPage />} />
                      <Route
                        path="scripts/:action/:scriptId"
                        element={<AddScriptPage />}
                      />
                      {/* <Route
                      path="scripts/:action/:scriptId"
                      element={<AddScriptPage />}
                    /> */}
                    </Route>

                    <Route
                      element={<ProtectedRoute requiredRole={["master"]} />}
                    >
                      <Route path="users" element={<Users />} />
                      <Route path="convert" element={<ConvertPage />} />
                    </Route>

                    <Route element={<ProtectedRoute />}>
                      <Route path="post/add" element={<AddPostPage />} />
                      <Route path="account" element={<Account />} />
                      <Route
                        path="posts/:action/:postId"
                        element={<PostPage />}
                      />
                    </Route>
                  </Route>

                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </ThemeProvider>

              <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                  success: {
                    duration: 3000,
                  },
                  error: {
                    duration: 5000,
                  },
                  style: {
                    fontSize: "16px",
                    maxWidth: "500px",
                    padding: "16px 24px",
                    backgroundColor: "var(--color-grey-0)",
                    color: "var(--color-grey-700)",
                  },
                }}
              />
            </QueryClientProvider>
          </QueryProvider>
        </SidebarProvider>
      </SettingsProvider>
    </BrowserRouter>
  );
}

export default App;
