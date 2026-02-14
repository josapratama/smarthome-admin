"use client";

import { UserSidebar } from "./UserSidebar";
import { UserTopbar } from "./UserTopbar";

export function UserLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <UserSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <UserTopbar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
