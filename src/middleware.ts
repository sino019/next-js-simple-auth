import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(request:NextRequest) {
console.log("middleware Running");

const session = await auth();
console.log("session",session);

const path = request.nextUrl.pathname;
const isPublic = path == "/login" || path == "/";

if (!session && !isPublic) {
return NextResponse.redirect(new URL("/login",
    request.url
))
}

if (session && isPublic) {
    const role = session.user.role;
    return NextResponse.redirect(new URL(`/${role}`, request.url));
}

if (session) {
    const role = session.user.role
    if (role == "admin" && path.startsWith("/superadmin")) {
    return NextResponse.redirect(new URL(`/admin`, request.url));
    }
    if (role == "superadmin" && path.startsWith("/admin")) {
    return NextResponse.redirect(new URL(`/superadmin`, request.url));
    }
}

return NextResponse.next()
}
export const config = {
    matcher: ["/","/login","/admin/:path*","/superadmin/:path*"],
};
