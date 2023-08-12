import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./layout/NavBar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Footer from "./layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "./store/thunkFunctions";
import ProtectedPage from "./pages/ProtectedPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotAuthRoutes from "./components/NotAuthRoutes";
import HistoryPage from "./pages/HistoryPage";
import CartPage from "./pages/CartPage";
import DetailProductPage from "./pages/DetailProductPage";
import UploadProductPage from "./pages/UploadProductPage";
function Layout() {
  return (
    <div className="flex flex-col justify-between h-screen ">
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover // hover시 멈춤
        autoClose={1500} //1.5초간 지속
      />
      <Navbar />
      <main className="mb-auto w-10/12 max-w-4xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user?.isAuth); // 전체 state 를 가져오기
  const { pathname } = useLocation();

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser()); //thucnk 함수 이름은 authUser
    }
  }, [isAuth, pathname, dispatch]); // 권한이 바뀌거나 or url경로가 바뀌거나

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*로그인과 상관없이 갈 수 있는 경로 */}
        <Route index element={<LandingPage />} />

        {/* 로그인한 사람만 갈 수 있는 경로 */}
        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path="/protected" element={<ProtectedPage />} />
          <Route path="/product/upload" element={<UploadProductPage />} />
          <Route path="/product/:productId" element={<DetailProductPage />} />
          <Route path="/user/cart" element={<CartPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Route>

        {/* 로그인한 사람은 갈 수 없는 경로 */}
        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
