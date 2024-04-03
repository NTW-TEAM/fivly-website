import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { toast } from 'react-toastify';
 

export function middleware(request: NextRequest) {

    // handle logout
    if (request.nextUrl.pathname === "/auth/logout") {

        const response = NextResponse.redirect(new URL('/auth/signin', request.url))
        response.cookies.delete('auth_token');
        
        toast.success("Déconnexion réussie");

        return response;
    }

    // return NextResponse.redirect(new URL('/', request.url))
}

