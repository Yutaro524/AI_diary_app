// src/app/essay/[id]/page.tsx

import ClientEssayDetail from './ClientEssayDetail';

export default function EssayDetail({ params }: { params: { id: string } }) {
  return <ClientEssayDetail id={params.id} />;
}
