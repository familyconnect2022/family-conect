import {Layout} from 'antd'
import {useCallback, useState} from 'react'
import HeaderComponent from './Header'
import Navbar from './Navbar'

export default function LayoutComponents({children}) {
    const {Content, Sider, Header} = Layout
    const [isCollapsed, setIsCollapsed] = useState(true)
    const handleCollapsed = () => setIsCollapsed(!isCollapsed)
    const ComponentContent = useCallback(() => {
        return (
            <Content className='w-full h-full min-h-screen max-w-7xl m-auto bg-red-100'>
                {children}
            </Content>
        )
    }, [])

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
            <Layout className=' w-full'>
                <Header className='bg-green-100 z-20 px-5 lg:px-12'>
                    <HeaderComponent
                        handleCollapsed={handleCollapsed}
                        isCollapsed={isCollapsed}
                    />
                </Header>
                <ComponentContent />
            </Layout>
        </Layout>
    )
}
