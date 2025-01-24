// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import connectDB from "@/app/lib/db";
// import User from "../../../models/UserModel";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       allowDangerousEmailAccountLinking: true,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account }) {
//       if (account.provider === "google") {
//         try {
//           await connectDB();
          
//           // Check if user already exists
//           const existingUser = await User.findOne({ email: user.email });
          
//           if (!existingUser) {
//             // Create new user
//             const newUser = new User({
//               name: user.name,
//               email: user.email,
//               role: "user", 
//             });
//             await newUser.save();
//           }
  
//           return true; // Allow sign in
//         } catch (error) {
//           console.error("Error during sign in:", error);
//           return false; // Deny sign in
//         }
//       }
//       return true;
//     },
//   },  
//   pages: {
//     login: '/auth/login',
//     error: '/auth/error',
//   },
//   session: {
//     strategy: 'jwt',
//     maxAge: 15 * 24 * 60 * 60, // 15 days
//   },
//   jwt: {
//     secret: process.env.NEXTAUTH_SECRET,
//     encryption: true,
//     maxAge: 15 * 24 * 60 * 60, // 15 days
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   // debug: process.env.NODE_ENV === 'development',
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

// /*

// HOW TO USE NEXTAUTH IN YOUR APP:

// 1. Client-Side Usage:
//    - Import and use the useSession hook to access session data:
//      ```
//      import { useSession } from 'next-auth/react'
     
//      function Component() {
//        const { data: session, status } = useSession()
       
//        if (status === "loading") return <div>Loading...</div>
//        if (status === "unauthenticated") return <div>Please sign in</div>
       
//        return <div>Welcome {session.user.name}!</div>
//      }
//      ```

// 2. Protected API Routes:
//    - Wrap your API handlers with getServerSession:
//      ```
//      import { getServerSession } from "next-auth/next"
//      import { authOptions } from "@/app/api/auth/[...nextauth]/route"
     
//      export async function GET(req) {
//        const session = await getServerSession(authOptions)
//        if (!session) {
//          return new Response("Unauthorized", { status: 401 })
//        }
//        // Handle authorized request
//      }
//      ```

// 3. Protected Pages:
//    - Use middleware or getServerSession to protect pages:
//      ```
//      export async function getServerSideProps(context) {
//        const session = await getServerSession(context.req, context.res, authOptions)
//        if (!session) {
//          return {
//            redirect: {
//              destination: '/auth/signin',
//              permanent: false,
//            },
//          }
//        }
//        return { props: { session } }
//      }
//      ```

// 4. Sign In/Out:
//    - Use signIn() and signOut() functions:
//      ```
//      import { signIn, signOut } from 'next-auth/react'
     
//      // Sign in
//      await signIn('credentials', {
//        email: email,
//        password: password,
//        redirect: true,
//        callbackUrl: '/'
//      })
     
//      // Sign out
//      await signOut({ redirect: true, callbackUrl: '/auth/signin' })
//      ```

// TESTING THE AUTH API:

// 1. Manual Testing:
//    - Test Sign In:
//      ```
//      POST /api/auth/signin
//      Body: {
//        email: "test@example.com",
//        password: "password123"
//      }
//      ```
   
//    - Test Session:
//      ```
//      GET /api/auth/session
//      ```
   
//    - Test Sign Out:
//      ```
//      POST /api/auth/signout
//      ```

// 2. Integration Tests (Jest + Supertest):
//    ```javascript
//    import { createServer } from 'http'
//    import { apiResolver } from 'next/dist/server/api-utils'
//    import handler from './route'
   
//    describe('Auth API', () => {
//      it('should handle signin correctly', async () => {
//        const req = {
//          method: 'POST',
//          body: {
//            email: 'test@example.com',
//            password: 'password123'
//          }
//        }
//        const res = await apiResolver(req, {}, handler)
//        expect(res.status).toBe(200)
//      })
//    })
//    ```

// 3. E2E Testing (Cypress):
//    ```javascript
//    describe('Authentication', () => {
//      it('should login successfully', () => {
//        cy.visit('/auth/signin')
//        cy.get('input[name="email"]').type('test@example.com')
//        cy.get('input[name="password"]').type('password123')
//        cy.get('button[type="submit"]').click()
//        cy.url().should('eq', Cypress.config().baseUrl + '/')
//      })
//    })
//    ```

// 4. Environment Setup for Testing:
//    - Create .env.test file:
//      ```
//      NEXTAUTH_URL=http://localhost:3000
//      NEXTAUTH_SECRET=your_test_secret
//      DATABASE_URL=your_test_db_url
//      ```
//    - Use separate test database
//    - Mock external providers in test environment
// */







import { handlers } from "@/app/lib/auth" 
export const { GET, POST } = handlers