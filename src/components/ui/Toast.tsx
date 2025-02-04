export default function Toast({ isToast, message }: { isToast: boolean, message: string }) {
    if (!isToast) return null;
    return (
        <>
            <div className='fixed bottom-0 left-0 right-0 w-full min-w-[300px] h-[150px] animate-slide-up-fade text-center'>
                <div className='inline-block max-w-fit min-w-[300px] bg-black/70 text-white text-sm font-semibold rounded-[4px] px-[20px] py-[10px] text-left'>{message}</div>
            </div>
        </>
    )
}