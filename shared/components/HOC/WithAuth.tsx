import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { ComponentType } from 'react'
import Loader from '../Loader';

function WithAuth<T>(Component: ComponentType<T>) {
    return (HOCProps: any) => {
        const router = useRouter();
        const data = useSession();

        switch (data.status) {
            case 'loading':
                return null; // <Loader type='fullscreen' />
                break;
            case 'unauthenticated':
                if (router.asPath !== '/' && router.pathname !== '/profiles/[...slug]') router.push('/');
                return <Component {...HOCProps} session={null} />
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