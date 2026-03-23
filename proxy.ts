import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const readOnlyMethods = new Set(["GET", "HEAD", "OPTIONS"]);

export function proxy(request: NextRequest) {
  if (!readOnlyMethods.has(request.method)) {
    return NextResponse.json(
      { message: "This blog is in read-only mode for visitors." },
      { status: 405 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};