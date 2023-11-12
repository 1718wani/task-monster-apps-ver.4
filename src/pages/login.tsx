import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { NextPage } from "next";
import axios from "axios";
import { useCookies } from "react-cookie";
import { string } from "zod";

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
          <button onClick={() => signIn( )}>
            ログイン
          </button>
        </div>
      )}
    </>
  );
};

export default Login;
