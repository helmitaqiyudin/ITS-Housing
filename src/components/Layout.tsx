import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, Button, Menu, MenuLabel, Burger, Transition } from "@mantine/core";
import { useDisclosure, useClickOutside } from "@mantine/hooks";
import { api } from "~/utils/api";

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

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-gray-800">
        <div className="px-5 mx-auto flex justify-between items-center h-[60px]">
          <div className="flex items-center space-x-20">
            <Link href="/">
              <div className="text-2xl font-bold text-white">TPRN</div>
            </Link>
            <div className="hidden md:flex">
              {sessionData?.user.role === "admin" && (
                <div className="flex space-x-10">
                  <Link href="/admin/manage-houses">
                    <div className="text-md text-gray-300 font-semibold hover:text-white">Rumah Negara</div>
                  </Link>
                  <Link href="/admin/manage-users">
                    <div className="text-md text-gray-300 font-semibold hover:text-white">Daftar User</div>
                  </Link>
                  <Link href="/admin/manage-requests">
                    <div className="text-md text-gray-300 font-semibold hover:text-white">Daftar Ajuan</div>
                  </Link>
                  <Link href="/admin/recap">
                    <div className="text-md text-gray-300 font-semibold hover:text-white">Rekap</div>
                  </Link>
                </div>
              )}
              {sessionData?.user.role === "user" && (
                <div className="flex space-x-10">
                  <Link href="/user/my-house">
                    <div className="text-md text-gray-300 font-semibold hover:text-white">Rumah Negara Saya</div>
                  </Link>
                  <Link href="/user/my-request">
                    <div className="text-md text-gray-300 font-semibold hover:text-white">Ajuan</div>
                  </Link>
                  <Link href="/user/recap">
                    <div className="text-md text-gray-300 font-semibold hover:text-white">Rekap</div>
                  </Link>
                </div>
              )}
            </div>
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
                    <div className="flex flex-col text-start space-y-3 py-2 px-3">
                      <Link href="/admin/manage-houses">
                        <div className="text-md text-gray-300 font-semibold hover:text-white">Rumah Negara</div>
                      </Link>
                      <Link href="/admin/manage-users">
                        <div className="text-md text-gray-300 font-semibold hover:text-white">Daftar User</div>
                      </Link>
                      <Link href="/admin/manage-requests">
                        <div className="text-md text-gray-300 font-semibold hover:text-white">Daftar Ajuan</div>
                      </Link>
                      <Link href="/admin/recap">
                        <div className="text-md text-gray-300 font-semibold hover:text-white">Rekap</div>
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
                    <div className="flex flex-col text-start space-y-3 py-2 px-3">
                      <Link href="/user/my-house">
                        <div className="text-md text-gray-300 font-semibold hover:text-white">Rumah Negara Saya</div>
                      </Link>
                      <Link href="/user/my-request">
                        <div className="text-md text-gray-300 font-semibold hover:text-white">Ajuan</div>
                      </Link>
                      <Link href="/user/recap">
                        <div className="text-md text-gray-300 font-semibold hover:text-white">Rekap</div>
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
      <main className="flex-grow pb-10">
        {children}
      </main>
      <footer className="bg-gray-800 text-white text-center py-5">
        <div className="flex justify-end gap-5 px-5">
          <p className="self-center">
            Role Switcher (for development) :
          </p>
          {sessionData?.user.role === "admin" && (
            <Button
              onClick={() => void handleRoleSwitch(Role.User)}
              className="flex text-gray-800 rounded-md text-center px-3 py-2"
            >
              Switch to User
            </Button>
          )}
          {sessionData?.user.role === "user" && (
            <Button
              onClick={() => void handleRoleSwitch(Role.Admin)}
              className="flex text-gray-800 rounded-md text-center px-3 py-2"
            >
              Switch to Admin
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
};
