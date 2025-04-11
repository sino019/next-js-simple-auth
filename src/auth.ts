import { Session } from "inspector/promises";
import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: ({ email, password }) =>{
        console.log(email,password);
        const user = {email:"cycy", role : "superadmin"};
        return user;
      }
    }),
  ],
  pages:{
    signIn:"/login"
  },
  callbacks:{
    async jwt({token,user}){
        if (user) {
            token.role = user.role;
        }
        return token;
    },
    async session({token,session}){
        if (token) {
            session.user.role = token.role as string;
        }
        return session;
    },
  },

  cookies:{
    sessionToken:{
        name:"mytoken",
        options:{
            maxAge:60 * 60 * 24,
        },
    },
  },

secret: process.env.AUTH_SECRET,
});
