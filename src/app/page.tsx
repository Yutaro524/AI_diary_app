// src/app/page.tsx
"use client";  // クライアントコンポーネントとしてマーク

import { useAuth } from "@/context/auth";
import { login, logout } from "@/lib/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // useRouterをnext/navigationからインポート

export default function Home() {
  const user = useAuth();
  const [waiting, setWaiting] = useState<boolean>(false);
  const router = useRouter(); // useRouterの初期化

  useEffect(() => {
    if (user) {
      // ユーザーがログインしている場合はユーザーごとのトップページに遷移
      router.push(`/dashboard`);
    }
  }, [user, router]);

  const signIn = () => {
    setWaiting(true);

    login()
      .catch((error) => {
        console.error(error?.code);
      })
      .finally(() => {
        setWaiting(false);
      });
  };

  return (
    <div>
      {user === null && !waiting && <button onClick={signIn}>ログイン</button>}
      {user && <button onClick={logout}>ログアウト</button>}
    </div>
  );
}
