import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, account }: { token: any; account: any }) {
            // Simpan Google ID token
            if (account) {
                token.idToken = account.id_token;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            session.user.idToken = token.idToken as string;
            return session;
        },
        async signIn({ user, account, profile }) {
            if (account?.provider === 'google') {
                try {
                    const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_BASE_API_URL}/users`,
                        { token: account.id_token },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );

                    if (response.status === 200 || response.status === 201) {
                        console.log('User created or already exists:', response.data);
                    } else {
                        console.error('Failed to create or check user:', response.status, response.data);
                        return false;
                    }
                } catch (error) {
                    console.error('Error during user creation/check:', error);
                    if (axios.isAxiosError(error)) {
                        console.error('Axios error details:', error.response?.data);
                    }
                    return false;
                }
            }
            return true;
        },
    },
    pages: {
        signIn: '/login',
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
