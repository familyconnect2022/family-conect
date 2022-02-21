import {CloseOutlined, MenuOutlined} from '@ant-design/icons'
import Logo from './Logo'
export default function HeaderComponent({handleCollapsed, isCollapsed}) {
    return (
        <div className='flex justify-between items-center w-full'>
            <Logo />
            <div
                className='
                    p-3 border bg-white 
                    rounded-sm shadow-md cursor-pointer
                    flex justify-center items-center lg:hidden
                '
                onClick={handleCollapsed}
            >
                {isCollapsed ? <MenuOutlined /> : <CloseOutlined />}
            </div>
        </div>
    )
}
