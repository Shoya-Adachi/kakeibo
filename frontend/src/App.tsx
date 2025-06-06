import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import KakeiboInputScreen from "./pages/kakeiboInputs/KakeiboInputScreen";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import Home from "./pages/home/Home";
import KakeiboListScreen from "./pages/kakeiboList/KakeiboListScreen";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Home />}></Route>
            <Route
              path={"/KakeiboInput-page"}
              element={<KakeiboInputScreen />}
            ></Route>
            <Route
              path={"/KakeiboList-page"}
              element={<KakeiboListScreen />}
            ></Route>
            {/* pathに＊を設定すると、用意されてないURLにアクセスがあったときに自動的に飛ばされるページ設定ができる */}
            {/* <Route path={'*'} element={<ErrorPage/>}></Route> */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
