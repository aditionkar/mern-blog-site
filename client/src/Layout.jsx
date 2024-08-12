import React from 'react';
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main className="container mx-auto p-4">
      <Header />
      <Outlet />
    </main>
  );
}
