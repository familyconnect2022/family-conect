import {getCookie} from 'cookies-next'

export default function Home() {
    return <div className='h-full w-full'>Home Page</div>
}

export function getServerSideProps({req}) {
    const user = getCookie('user', {req})
    if (user) {
        return {
            props: {
                user: user.name,
            },
        }
    } else {
        return {
            redirect: {
                destination: '/auth/login',
            },
        }
    }
}
