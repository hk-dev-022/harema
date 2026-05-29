import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const isAuthenticated = request.cookies.get("portfolio_auth")?.value === "true";
	const { pathname } = request.nextUrl;
	
	if (!isAuthenticated && pathname !== "/login") {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (isAuthenticated && pathname === "/login") {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|svg|img|.*\\.png|.*\\.jpg).*)",
	],
};