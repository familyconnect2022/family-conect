import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
    return (
        <div>
            <Link href='/' passHref={true}>
                <div className='flex justify-center cursor-pointer items-center gap-2 select-none '>
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
    )
}
