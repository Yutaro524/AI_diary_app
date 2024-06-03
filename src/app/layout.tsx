// src/app/layout.tsx
"use client";  // クライアントコンポーネントとしてマーク

import { AuthProvider } from "@/context/auth";
import { EssayProvider } from "@/context/essay";

import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <header>My Header</header>
          <EssayProvider>
            <main>{children}</main> 
          </EssayProvider>
          
          <footer>My Footer</footer>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
