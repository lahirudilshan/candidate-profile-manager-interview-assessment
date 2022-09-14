import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export function WithSSRAuthorizeCheck(serverSideProps: GetServerSideProps) {
    return async (context: GetServerSidePropsContext) => {
        const user = await getSession(context)

        if (!user?.user) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        }

        // Continue on to call `getServerSideProps` logic
        return await serverSideProps(context);
    }
}