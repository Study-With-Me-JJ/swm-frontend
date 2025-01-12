
export default function Home() {
  return (
    <div className='pt-[100px] pb-[200px] max-w-screen-xl px-5 xl:px-0 mx-auto'> 
      <section className='flex flex-col gap-[100px]'>
        <article>
          <h3 className='text-left text-2xl font-semibold text-black mb-[40px]'>요즘 뜨는 스터디룸</h3>
          <div className='flex items-center gap-[20px]'>
            <div className=' '></div>
          </div>
        </article>
        <article>
          <h3 className='text-left text-2xl font-semibold text-black mb-[40px]'>곧 마감되는 스터디</h3>
          <div className='flex items-center gap-[20px]'>
            <div className=' '></div>
          </div>
        </article>
      </section>
    </div>
  );
}
