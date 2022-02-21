import {Layout} from 'antd'
import {useState} from 'react'
import HeaderComponent from '../components/Header'
import Navbar from '../components/Navbar'
import '../styles/globals.css'

function MyApp({Component, pageProps}) {
    const {Content, Sider, Header, Footer} = Layout
    const [isCollapsed, setIsCollapsed] = useState(true)
    const handleCollapsed = () => setIsCollapsed(!isCollapsed)
    return (
        <Layout className='min-h-screen'>
            <Sider
                collapsedWidth={0}
                collapsed={isCollapsed}
                width='100vw'
                className='fixed inset-0 z-10 bg-white pt-[64px] lg:hidden'
            >
                <Navbar />
            </Sider>
            <Layout className=' w-full bg-red-50'>
                <Header className='bg-green-100 z-20 px-5 lg:px-12'>
                    <HeaderComponent
                        handleCollapsed={handleCollapsed}
                        isCollapsed={isCollapsed}
                    />
                </Header>
                <Content className='w-full h-full max-w-7xl m-auto '>
                    <Component {...pageProps} />
                </Content>
                <Footer className='bg-red-50 h-0' />
            </Layout>
        </Layout>
    )
}

export default MyApp
