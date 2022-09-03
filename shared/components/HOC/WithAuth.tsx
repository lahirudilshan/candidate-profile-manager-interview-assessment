import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { ComponentType } from 'react'

function WithAuth<T>(Component: ComponentType<T>) {
    return (HOCProps: Omit<T, 'session'>) => {
        const router = useRouter();
        const data = useSession();

        switch (data.status) {
            case 'loading':
                return <div>Loading</div>
                break;
            case 'unauthenticated':
                if (router.asPath !== '/') router.push('/');
                return <Component {...HOCProps} session={data.data} />
                break;
            case 'authenticated':
                return <Component {...HOCProps} session={data.data} />
                break;
            default:
                return <div>Something wrong</div>
                break;
        }
    }
}

export default WithAuth