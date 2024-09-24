import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions: AuthOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string;
        }),
    ],
    callbacks:{
        async jwt({token, account}){
            if (acount){
                token.id = account.providerAccountId
                token.accessToken = account.access_token
            }
            return token
        },
        async session({session, token}){
            session.user.userId = token.id;
            session.user.accessToken= token.accessToken
            return session;
        },
        async redirect({url, baseUrl}){
            return url.startsWith(baseUrl)
            ? url 
            : `$(baseUrl)/protected/client`;
        }
    }

}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST};