import {CloseOutlined, MenuOutlined} from '@ant-design/icons'
import Image from 'next/image'
import Link from 'next/link'
export default function HeaderComponent({handleCollapsed, isCollapsed}) {
    return (
        <div className='flex justify-between items-center w-full'>
            <div className='cursor-pointer'>
                <Link href='/' passHref={true}>
                    <div className='flex justify-center items-center gap-2 select-none '>
                        <div className='w-12 h-12 relative'>
                            <Image
                                src='/family-logo.png'
                                layout='fill'
                                alt='logo'
                            />
                        </div>
                        <span className='text-[14px] font-semibold text-gray-700 italic uppercase'>
                            Family & Connect
                        </span>
                    </div>
                </Link>
            </div>
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
