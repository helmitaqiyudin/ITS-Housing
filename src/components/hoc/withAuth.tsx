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
    const { data: sessionData, status } = useSession();

    // Local state to determine if it's the first render
    const [firstRender, setFirstRender] = React.useState(true);

    React.useEffect(() => {
      if (status !== 'loading') {
        setFirstRender(false);
      }
    }, [status]);

    React.useEffect(() => {
      // If it's not the first render and the status is 'unauthenticated', sign in
      if (!firstRender && status === 'unauthenticated' && routeRole !== 'auth' && routeRole !== 'optional') {
        void signIn();
        return;
      }

      if (status === 'authenticated' && sessionData) {
        if (sessionData.user.role !== allowedRole) {
          sessionData.user.role && void router.replace(HOME_ROUTE[sessionData.user.role]);
        }
      }
    }, [status, sessionData, firstRender, router]);

    if (status === 'loading' || (firstRender && status === 'unauthenticated')) {
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