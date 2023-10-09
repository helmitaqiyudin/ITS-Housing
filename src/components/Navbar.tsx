import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export const Navbar = ({ children }: { children: React.ReactNode }) => {
  const { data: sessionData } = useSession();
  const [opened, setOpened] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <div className="text-2xl font-bold text-white">TPRN</div>
          </Link>
          <div className="flex items-center">
            
          </div>
        </div>
      </nav>
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};
