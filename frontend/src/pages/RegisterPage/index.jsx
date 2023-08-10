import React from "react";

export default function RegisterPage() {
  return (
    // flex-col 자식요소 수직 , max-w-[400px] 최대 너비 제한   m-auto 좌우 여백을 자동으로 설정
    <div>
      <section className="flex flex-col justify-center mt-20 max-w-[400px] m-auto">
        <div className="p-6  bg-white rounded-md shadow-md">
          <h1 className="text-3xl font-semibold text-center">회원가입</h1>
          <form className="mt-6">
            <div>
              <label //입력 요소와 텍스트를 연결하는 데 사용 되는 label 태그
                htmlFor="email" //htmlFor 속성은 레이블이 연결된 입력 요소의 ID를 지정
                className="text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 mt-2 border bg-white rounded-md" //px 외부 여백 py 내부 여백 상하좌우
              ></input>
            </div>
            <div>
              <label
                htmlFor="name"
                className="text-sm font-semibold text-gray-800"
              >
                Name
              </label>
              <input
                type="text"
                id="email"
                className="w-full px-4 py-2 mt-2 border bg-white rounded-md"
              ></input>
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                id="pasword"
                className="w-full px-4 py-2 mt-2 border bg-white rounded-md"
              ></input>
            </div>

            <div className="mt-6">
              <button
                type="submit" //duration hover시 색상 애니이션 지속시간
                className="w-full px-4 py-2 text-white duration-200 bg-black  hover:bg-gray-700 "
              >
                회원가입
              </button>
            </div>
            <p className="mt-8 text-xs font-light text-center text-gray-700">
              아이디가 있다면?{" "}
              <a href="/login" className="font-medium hover:underline">
                로그인
              </a>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
