import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./layout/NavBar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Footer from "./layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*로그인과 상관없이 갈 수 있는 경로 */}
        <Route index element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
