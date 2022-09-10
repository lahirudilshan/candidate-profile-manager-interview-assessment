import { useEffect, useMemo, useRef } from 'react';

const useAPIAbort = () => {
    const abortControllerRef = useRef<AbortController>();

    useEffect(() => {
        return () => {
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
