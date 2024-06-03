// src/app/dashboard/page.tsx
"use client"; // クライアントコンポーネントとしてマーク

import { useAuth } from "@/context/auth";
import { useEssays } from "@/context/essay";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation"; // useRouterをnext/navigationからインポート
import Link from 'next/link';

export default function Dashboard() {
  const user = useAuth();
  const router = useRouter();
  const { essays } = useEssays();

  if (!user) {
    router.push('/');
    return null;
  }

  return (
    <div>
      <h1>ユーザーごとのトップページ</h1>
      <p>こんにちは、{user.name}さん！</p>
      <button onClick={() => router.push('/writing')}>エッセイを書く</button>
      <button onClick={logout}>ログアウト</button>
      <h2>あなたのエッセイ一覧</h2>
      <ul>
        {essays.map((essay) => (
          <li key={essay.id}>
            <Link href={`/essay/${essay.id}`}>
              {essay.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
