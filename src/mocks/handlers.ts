import { http, HttpResponse } from "msw";

type UserInfo = {
  id: string;
  password: string;
  name: string;
  phone: string;
  email: string;
  birthday: string;
};

type LoginInfo = {
  id: string;
  password: string;
};

export const handlers = [
  http.post("/signup", async ({ request }) => {
    const newPost = (await request.json()) as UserInfo;
    const users = JSON.parse(localStorage.getItem("userInfo") || "[]");

    // 중복 아이디 체크
    const isDuplicate = users.some(
      (user: { id: string }) => user.id === newPost.id
    );
    if (isDuplicate) {
      return HttpResponse.json(
        { message: "이미 존재하는 아이디입니다." },
        { status: 409 }
      );
    }

    // 새로운 회원 추가
    users.push(newPost);
    localStorage.setItem("userInfo", JSON.stringify(users));

    return HttpResponse.json(newPost, { status: 200 });
  }),

  http.post("/signin", async ({ request }) => {
    const loginInfo = (await request.json()) as LoginInfo;
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      try {
        const parsedUserInfo: UserInfo = JSON.parse(userInfo);
        const { id, password } = loginInfo;

        if (id == parsedUserInfo.id && password == parsedUserInfo.password) {
          return HttpResponse.json<UserInfo>(parsedUserInfo, { status: 200 });
        } else {
          return HttpResponse.json(
            { message: "Invalid credentials" },
            { status: 401 }
          );
        }
      } catch (error) {
        return HttpResponse.json(
          { message: "Internal Server Error" },
          { status: 500 }
        );
      }
    } else {
      return HttpResponse.json({ message: "User not found" }, { status: 404 });
    }
  }),
];
