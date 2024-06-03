import ClientEssayDetail from './ClientEssayDetail';
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Firestore の初期化ファイルをインポート

// export async function generateStaticParams() {
//   const essaysSnapshot = await getDocs(collection(db, 'essays'));
//   const paths = essaysSnapshot.docs.map(doc => ({
//     id: doc.id
//   }));

//   return paths;
// }

export default function Page({ params }: { params: { id: string } }) {
  return <ClientEssayDetail id={params.id} />;
}
