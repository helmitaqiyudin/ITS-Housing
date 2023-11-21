import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, Button, Menu, MenuLabel, Burger, Transition } from "@mantine/core";
import { useDisclosure, useClickOutside } from "@mantine/hooks";
import { api } from "~/utils/api";
import { LayoutDashboard, Home, Users, ListChecks, Book } from "lucide-react";
import { useRouter } from "next/router";

enum Role {
  Admin = "admin",
  User = "user"
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: sessionData } = useSession();
  const [opened, { toggle }] = useDisclosure();
  const ref = useClickOutside(() => {
    if (opened) {
      toggle();
    }
  });



  // for development purpose only, remove this and footer later
  const switchRoleMutation = api.user.switchRole.useMutation();
  const id = sessionData?.user.id;

  const handleRoleSwitch = async (role: Role) => {
    try {
      await switchRoleMutation.mutateAsync({ id: id ?? "", role: role });
      window.location.reload();
    } catch (error) {
      console.error('Role switch failed:', error);
    }
  };

  const useCurrentPath = () => {
    const router = useRouter();
    return router.pathname;
  };


  const SidebarLink = ({ href, label, icon }: { href: string, label: string, icon: React.ReactNode }) => {
    const currentPath = useCurrentPath();

    return (
      <Link href={href}>
        <div
          className={`text-sm font-medium p-2 rounded-lg flex items-center gap-2 ${currentPath === href ? "bg-white text-slate-700 drop-shadow-md" : "text-slate-700 hover:bg-gray-200"
            }`}
        >
          {icon}{label}
        </div>
      </Link>
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-[hsla(0,0%,100%,.85)] fixed w-full z-10 drop-shadow-md backdrop-blur-[5px]">
        <div className="px-5 mx-auto flex justify-between items-center h-[60px]">
          <div className="flex items-center space-x-20">
            <Link href="/">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-cyan-500 bg-clip-text text-transparent">TPRN</div>
            </Link>
          </div>

          <div ref={ref}>
            {sessionData ? (
              <div className="md:hidden">
                <Burger opened={opened} onClick={toggle} color="indigo" />
              </div>
            ) : (
              <div className="md:hidden items-center">
                <Button
                  color="indigo"
                  variant="outline"
                  onClick={() => void signIn()}
                  className="px-4 py-2 rounded-md"
                >
                  Sign In
                </Button>
              </div>
            )}
            <Transition transition="scale-y" mounted={opened} >
              {(transitionStyle) => (
                <div className={`absolute top-14 left-0 py-2 w-full bg-gray-800 md:hidden ${opened ? "block" : "hidden"}`} style={{ ...transitionStyle, zIndex: 100 }}>
                  {sessionData?.user.role === "admin" && (
                    <div className="flex flex-col text-start space-y-5 py-2 px-3">
                      <Link href="/admin">
                        <div className="text-sm text-white font-medium ">Dashboard</div>
                      </Link>
                      <Link href="/admin/manage-houses">
                        <div className="text-sm text-white font-medium ">Rumah Negara</div>
                      </Link>
                      <Link href="/admin/manage-users">
                        <div className="text-sm text-white font-medium ">Daftar User</div>
                      </Link>
                      <Link href="/admin/manage-requests">
                        <div className="text-sm text-white font-medium ">Daftar Ajuan</div>
                      </Link>
                      <Link href="/admin/recap">
                        <div className="text-sm text-white font-medium ">Rekap</div>
                      </Link>
                      <Button
                        onClick={() => void signOut()}
                        className="flex text-gray-800 rounded-md text-center px-3 py-2"
                      >
                        Sign Out
                      </Button>
                    </div>
                  )}
                  {sessionData?.user.role === "user" && (
                    <div className="flex flex-col text-start space-y-5 py-2 px-3">
                      <Link href="/user">
                        <div className="text-sm text-white font-medium ">Dashboard</div>
                      </Link>
                      <Link href="/user/my-house">
                        <div className="text-sm text-white font-medium ">Rumah Negara Saya</div>
                      </Link>
                      <Link href="/user/my-request">
                        <div className="text-sm text-white font-medium ">Ajuan</div>
                      </Link>
                      <Link href="/user/recap">
                        <div className="text-sm text-white font-medium ">Rekap</div>
                      </Link>
                      <Button
                        onClick={() => void signOut()}
                        className="flex text-gray-800 rounded-md text-center px-3 py-2"
                      >
                        Sign Out
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Transition>
          </div>
          <div className="hidden md:flex items-center">
            {sessionData ? (
              <div className="flex items-center">
                <Menu withArrow shadow="md">
                  <Menu.Target>
                    <Avatar
                      size="md"
                      radius="xl"
                      src={sessionData.user.image}
                      className="cursor-pointer"
                    />
                  </Menu.Target>
                  <Menu.Dropdown className="text-center">
                    <MenuLabel className="text-gray-800 px-3 py-2">
                      Hi, {sessionData.user.name}
                    </MenuLabel>
                    <Menu.Item onClick={() => void signOut()} className="text-gray-800 px-3 py-2 hover:bg-slate-200">
                      <div className="text-center">
                        Sign Out
                      </div>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
            ) : (
              <Button
                color="indigo"
                variant="outline"
                onClick={() => void signIn()}
                className="px-4 py-2 rounded-md"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>
      <main className="flex-grow pt-16 bg-[#f0f2f5]">
        <div className="md:flex">
          <div className="hidden md:flex md:w-[20%]">
            <div className="hidden md:flex w-full p-5">
              {sessionData?.user.role === "admin" && (
                <div className="flex flex-col space-y-5 w-[70%]">
                  <SidebarLink href="/admin" label="Dashboard" icon={<LayoutDashboard />} />
                  <SidebarLink href="/admin/manage-houses" label="Rumah Negara" icon={<Home />} />
                  <SidebarLink href="/admin/manage-users" label="Daftar User" icon={<Users />} />
                  <SidebarLink href="/admin/manage-requests" label="Daftar Ajuan" icon={<ListChecks />} />
                  <SidebarLink href="/admin/recap" label="Rekap" icon={<Book />} />
                </div>
              )}
              {sessionData?.user.role === "user" && (
                <div className="flex flex-col space-y-5 w-[70%]">
                  <SidebarLink href="/user" label="Dashboard" icon={<LayoutDashboard />} />
                  <SidebarLink href="/user/my-house" label="Rumah Negara Saya" icon={<Home />} />
                  <SidebarLink href="/user/my-request" label="Ajuan" icon={<ListChecks />} />
                  <SidebarLink href="/user/recap" label="Rekap" icon={<Book />} />
                </div>
              )}
            </div>
          </div>
          <div className="w-full ">
            {children}
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-center py-3">
        <div className="flex justify-end gap-5 px-5">
          <p className="self-center text-white">
            Role Switcher (for development) :
          </p>
          {sessionData?.user.role === "admin" && (
            <Button
              onClick={() => void handleRoleSwitch(Role.User)}
              className="flex text-white rounded-md text-center px-3 py-2"
            >
              Switch to User
            </Button>
          )}
          {sessionData?.user.role === "user" && (
            <Button
              onClick={() => void handleRoleSwitch(Role.Admin)}
              className="flex text-white rounded-md text-center px-3 py-2"
            >
              Switch to Admin
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
};
