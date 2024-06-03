"use client";  // クライアントコンポーネントとしてマーク

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { useEssays } from "@/context/essay";
import { rewriteContent } from "@/lib/azureOpenAI";

export default function Writing() {
  const router = useRouter();
  const [title, setTitle] = useState(""); // エッセイのタイトル
  const [content, setContent] = useState(""); // エッセイの内容
  const [isSaving, setIsSaving] = useState(false); // 保存中の状態
  const user = useAuth(); // 現在のユーザーを取得
  const { addEssay } = useEssays();


  // エッセイを保存する関数
  const saveEssay = async () => {
    if (!title || !content) {
      alert("タイトルと内容を入力してください");
      return;
    }

    if (!user) {
      alert("ログインしてください");
      return;
    }

    setIsSaving(true);

    try {
      const changedContent = await rewriteContent(content);
      
      await addEssay(title, content, changedContent);
      console.log("エッセイが保存されました");
      // 保存が成功したらダッシュボードに戻る
      router.push('/dashboard');
    } catch (e) {
      console.error("エッセイの保存中にエラーが発生しました: ", e);
      alert("エッセイの保存中にエラーが発生しました");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h1>エッセイを書く</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タイトル"
        disabled={isSaving}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="ここにエッセイを書いてください"
        disabled={isSaving}
      ></textarea>
      <button onClick={saveEssay} disabled={isSaving}>保存する</button>
      <button onClick={() => router.push("/dashboard")} disabled={isSaving}>戻る</button>
    </div>
  );
}
