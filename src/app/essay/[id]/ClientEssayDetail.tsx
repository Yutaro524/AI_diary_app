"use client";  // クライアントコンポーネントとしてマーク

import { useRouter } from "next/navigation"; // next/navigation を使用
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Essay } from "@/types/essay";

export default function ClientEssayDetail({ id }: { id: string }) {
  const router = useRouter();
  const [essay, setEssay] = useState<Essay | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchEssay = async () => {
      try {
        const docRef = doc(db, `users/${user.id}/essays`, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setEssay({ id: docSnap.id, ...docSnap.data() } as Essay);
        } else {
          router.push('/404');
        }
      } catch (error) {
        console.error("エッセイの取得中にエラーが発生しました: ", error);
        alert("エッセイの取得中にエラーが発生しました");
      } finally {
        setLoading(false);
      }
    };

    fetchEssay();
  }, [id, router, user]);

  if (loading) {
    return <p>読み込み中...</p>;
  }

  if (!essay) {
    return <p>エッセイが見つかりません。</p>;
  }

  return (
    <div>
      <h1>{essay.title}</h1>
      <h2>自分</h2>
      <p>{essay.content}</p>
      <h2>AI</h2>
      <p>{essay.changed_content}</p>
      <button onClick={() => router.push('/dashboard')}>戻る</button>
    </div>
  );
}
