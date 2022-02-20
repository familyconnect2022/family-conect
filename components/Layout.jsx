import {Layout} from 'antd'
import {useCallback, useState} from 'react'
import Header from './Header'
import Navbar from './Navbar'

export default function LayoutComponents({children}) {
    const {Content, Sider} = Layout
    const [isCollapsed, setIsCollapsed] = useState(true)
    const handleCollapsed = () => setIsCollapsed(!isCollapsed)
    const ComponentContent = useCallback(() => {
        return <Content className='w-full max-w-7xl m-auto'>{children}</Content>
    }, [])

    return (
        <Layout className='min-h-screen'>
            <Sider
                collapsedWidth={0}
                collapsed={isCollapsed}
                width='100vw'
                className='fixed top-0 left-0 bottom-0 bg-white pt-[64px] lg:hidden'
            >
                <Navbar />
            </Sider>
            <Layout>
                <Header
                    handleCollapsed={handleCollapsed}
                    isCollapsed={isCollapsed}
                />
                <ComponentContent />
            </Layout>
        </Layout>
    )
}
