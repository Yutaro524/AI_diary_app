"use client";

import ClientEssayDetail from './ClientEssayDetail';

export default function Page({ params }: { params: { id: string } }) {
  return <ClientEssayDetail id={params.id} />;
}
