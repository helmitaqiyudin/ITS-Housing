import { type Role } from '@prisma/client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import * as React from 'react';
import { ImSpinner8 } from 'react-icons/im';

export interface WithAuthProps {
  user: Role;
}

const HOME_ROUTE = {
  admin: '/admin',
  user: '/user',
};

enum RouteRole {
  /**
   * For authentication pages
   * @example /login /register
   */
  auth,
  /**
   * Optional authentication
   * It doesn't push to login page if user is not authenticated
   */
  optional,
  /**
   * For all authenticated user
   * will push to login if user is not authenticated
   */
  all,
}

/**
 * Add role-based access control to a component
 *
 * @see https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/
 * @see https://github.com/mxthevs/nextjs-auth/blob/main/src/components/withAuth.tsx
 */
export default function withAuth<T extends WithAuthProps = WithAuthProps>(
  Component: React.ComponentType<T>,
  routeRole: keyof typeof RouteRole,
  allowedRole: keyof typeof Role | 'all' = 'all',
) {
  const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
    const router = useRouter();
    const { query } = router;

    //#region  //*=========== STORE ===========
     const { data: sessionData, status } = useSession();
     console.log(sessionData);
      console.log(status);
    //#endregion  //*======== STORE ===========

    const checkAuth = React.useCallback(() => {
      if (status === 'unauthenticated') {
        void signOut();
        return;
      }
    }, [status]);

    React.useEffect(() => {
      // run checkAuth every page visit
      checkAuth();

      // run checkAuth every focus changes
      window.addEventListener('focus', checkAuth);
      return () => {
        window.removeEventListener('focus', checkAuth);
      };
    }, [checkAuth]);

    React.useEffect(() => {
      if (status !== 'loading') {
        if (status === 'authenticated' && sessionData) {
          // // Prevent authenticated user from accessing auth or other role pages
          // if (routeRole === 'auth') {
          //   if (query?.redirect) {
          //     void router.replace(query.redirect as string);
          //   } else {
          //     void router.replace(HOME_ROUTE);
          //   }
          // }
          if (sessionData.user.role !== allowedRole) {
            sessionData.user.role && void router.replace(HOME_ROUTE[sessionData.user.role]);
          }
        } else {
          // Prevent unauthenticated user from accessing protected pages
          if (routeRole !== 'auth' && routeRole !== 'optional') {
            void signIn();
          }
        }
      }
    }, [status, sessionData, query, router]);

    if (
      // If unauthenticated user want to access protected pages
      (status === 'loading' || status === 'unauthenticated' ) &&
      // auth pages and optional pages are allowed to access without login
      routeRole !== 'auth' &&
      routeRole !== 'optional'
    ) {
      return (
        <div className='flex min-h-screen flex-col items-center justify-center text-gray-800'>
          <ImSpinner8 className='mb-4 animate-spin text-4xl' />
          <p>Loading...</p>
        </div>
      );
    }

    return <Component {...(props as T)} user={sessionData && sessionData.user} />;
  };

  return ComponentWithAuth;
}