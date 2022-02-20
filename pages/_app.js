import {Layout} from 'antd'
import {useState} from 'react'
import HeaderComponent from '../components/Header'
import Navbar from '../components/Navbar'
import '../styles/globals.css'

function MyApp({Component, pageProps}) {
    const {Content, Sider, Header} = Layout
    const [isCollapsed, setIsCollapsed] = useState(true)
    const handleCollapsed = () => setIsCollapsed(!isCollapsed)
    return (
        <Layout className='min-h-screen'>
            <Sider
                collapsedWidth={0}
                collapsed={isCollapsed}
                width='100vw'
                className='fixed z-10 top-0 left-0 bottom-0 bg-white pt-[64px] lg:hidden'
            >
                <Navbar />
            </Sider>
            <Layout className=' w-full bg-red-100'>
                <Header className='bg-green-100 z-20 px-5 lg:px-12'>
                    <HeaderComponent
                        handleCollapsed={handleCollapsed}
                        isCollapsed={isCollapsed}
                    />
                </Header>
                <Content className='w-full h-full min-h-screen max-w-7xl m-auto '>
                    <Component {...pageProps} />
                </Content>
            </Layout>
        </Layout>
    )
}

export default MyApp
