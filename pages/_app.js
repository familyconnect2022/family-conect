import '../styles/globals.css'
import LayoutComponents from '../components/Layout'

function MyApp({Component, pageProps}) {
    return (
        <LayoutComponents>
            <Component {...pageProps} />
        </LayoutComponents>
    )
}

export default MyApp
