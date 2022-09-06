import NextAuth, { Account, User } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios'

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    secret: process.env.SECRET,
    callbacks: {
        async signIn({ user }) {
            try {
                const isExistingUser = await axios.post(`${process.env.NEXTAUTH_URL}/api/auth/fetch`, {
                    email: user.email
                });

                if (isExistingUser.data && !isExistingUser.data.success) {
                    const save = await axios.post(`${process.env.NEXTAUTH_URL}/api/auth/create`, {
                        name: user.name,
                        profilePicture: user.image,
                        email: user.email,
                        profileURL: user.email?.split('@')[0]
                    });
                }
            } catch (error) {
                console.log('error', error);
                return false
            }

            return true
        },
    }
});

