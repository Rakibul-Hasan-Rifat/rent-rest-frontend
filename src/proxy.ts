import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import jwt, { JwtPayload } from "jsonwebtoken";

const AUTH_ROUTEs = ["/auth/login", "/auth/register",]
const RESTRICTED_ROUTEs = {
  "/dashboard": ["ADMIN", "LANDLORD", "TENANT"],
  "/admin": ["ADMIN"],
  "/landlord": ["LANDLORD"],
  "/TENANT": ["TENANT"],
  // "/": [""]
}

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  // console.log("proxy", request.nextUrl)
  // return NextResponse.redirect(new URL('/', request.url))
  // return  ""

  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access-token")?.value;

  if (AUTH_ROUTEs.includes(pathname)) {
    if (!accessToken) return NextResponse.next()

      try {
        const decoded = jwt.verify(accessToken as string, process.env.JWT_ACCESS_SECRET as jwt.Secret) as jwt.JwtPayload
        
        return decoded.role ? NextResponse.redirect(new URL("/properties", )) : NextResponse.next()
        
      } catch (error) {
        console.log(error)
        NextResponse.next();
      }
  }

  const arrayOfPrivateRoutes = Object.entries(RESTRICTED_ROUTEs)
  const privateRoutes = arrayOfPrivateRoutes.find(array => array[0] === pathname || pathname.startsWith(array[0]))?.[1]

  if (!privateRoutes) {
    return NextResponse.next();
  }
  console.log();
  

  // if (AUTH_ROUTEs.includes(pathname))
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: '/((?!api|_next/static|_next/image|.*\\.png$).*)',
}