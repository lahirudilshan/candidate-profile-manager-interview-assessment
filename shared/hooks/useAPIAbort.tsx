import { useEffect, useMemo, useRef } from 'react';

const useAPIAbort = () => {
    const abortControllerRef = useRef<AbortController>();

    useEffect(() => {
        console.log('called');

        return () => {
            console.log('API abort:', abortControllerRef.current);
            abortControllerRef.current?.abort();
        };
    }, []);

    return useMemo(() => {
        if (!abortControllerRef.current) {
            abortControllerRef.current = new AbortController();
        }
        return abortControllerRef.current.signal;
    }, []);
};

export default useAPIAbort;
