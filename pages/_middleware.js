import {getCookie} from 'cookies-next'
import {NextResponse} from 'next/server'

export async function middleware(req) {
    const user = getCookie('user', {req})

    if (user) {
        NextResponse.next()
    } else {
        NextResponse.redirect('/auth/login')
    }
}
