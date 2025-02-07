import Link from 'next/link'; 
import Image from 'next/image';

export default function Toast({ isToast, message, url, urlText, active, icon }: { isToast: boolean, message: string, url: string, urlText: string, active: boolean, icon: string }) {
    if (!isToast) return null;
    return (
        <>
            <div className={'fixed bottom-0 left-0 right-0 w-full min-w-[300px] h-[150px] animate-slide-up-fade text-center'}>
                <div className='inline-block'>
                    <div className={`flex justify-between item-center max-w-fit min-w-[360px] rounded-[8px] p-[16px] ${active ? 'bg-[#4998E9]' : 'bg-[#565656]'}`}>
                        <div className='flex items-center gap-2 text-white text-sm font-semibold text-left'>
                            <Image src={icon} alt='icon' width={18} height={18}/>
                            {message}
                        </div>
                        <Link href={url} className='text-white text-sm font-semibold underline'>
                            <span>{urlText}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}