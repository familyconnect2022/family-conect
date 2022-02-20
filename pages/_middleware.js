import {getCookie} from 'cookies-next'
import {NextResponse} from 'next/server'

export async function middleware(req) {
    const user = getCookie('user', {req})
    const listIgnories = ['/auth', '/api', 'family-logo.png']

    const funcCheckIsIgnore = (path) => {
        if (!listIgnories || listIgnories.length === 0) {
            return true
        } else {
            return listIgnories.some((x) => {
                return path.includes(x)
            })
        }
    }

    const isIgnore = funcCheckIsIgnore(req.url)
    console.log(req.url, isIgnore)

    if (user || isIgnore) {
        return NextResponse.next()
    } else {
        return NextResponse.redirect('/auth/login')
    }
}
