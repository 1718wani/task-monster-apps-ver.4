import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { type NextPage } from "next";

const Login: NextPage = () => {
  const { data: session } = useSession();

  console.log(session, "sessionの値");

  return (
    <>
      {session && (
        <div>
          <h1>ようこそ, {session.user && session.user.email}</h1>
          <button onClick={() => signOut()}>ログアウト</button>
        </div>
      )}
      {!session && (
        <div>
          <p>ログインしていません</p>
          <button onClick={() => signIn()}>ログイン</button>
        </div>
      )}
    </>
  );
};

export default Login;
