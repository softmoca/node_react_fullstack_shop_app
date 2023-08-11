import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../store/thunkFunctions";

const routes = [
  { to: "/login", name: "로그인", auth: false },
  { to: "/register", name: "회원가입", auth: false },
  // 로그인과 회원가입은 다른 페이지로 옮기 지만 로그아웃은 다른 작업
  { to: "", name: "로그아웃", auth: true },
];

export default function NavItem(mobile) {
  const isAuth = useSelector((state) => state.user?.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login");
    });
  };

  return (
    <ul
      className={`text-md justify-center w-full flex gap-4 ${
        mobile && "flex-col bg-gray-900 h-full"
      } items-center`}
    >
      {routes.map(({ to, name, auth }) => {
        if (isAuth !== auth) return null; // 안보여 준다

        if (name === "로그아웃") {
          return (
            <li
              key={name}
              className="py-2 text-center border-b-4 cursor-pointer"
            >
              <Link onClick={handleLogout}>{name}</Link>
            </li>
          );
        } else {
          return (
            <li
              key={name}
              className="py-2 text-center border-b-4 cursor-pointer"
            >
              <Link to={to}>{name}</Link>
            </li>
          );
        }
      })}
    </ul>
  );
}