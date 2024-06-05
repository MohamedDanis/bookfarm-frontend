import React from 'react'
import img404 from '@/assets/imgs/404pic.svg'

const NotFoundPage = () => {
  return (
    <section className="block h-screen w-full">
  <div className="px-5 md:px-10 h-full flex justify-center items-center w-full">
    <div className="mx-auto w-full max-w-7xl h-full">
      <div className="h-full">
        <div className="grid items-center  grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-20 h-full">
          <div className="">
            <h1 className="font-bold mb-4 text-4xl md:text-6xl">Page Not Found </h1>
            <div className=" mb-6 md:mb-10 lg:mb-12">
              <p className="text-[#636262] text-sm sm:text-xl">It seems like you've wandered off the path. This page doesn't exist.</p>
            </div>
            <a href="/" className="inline-block cursor-pointer items-center bg-black px-6 py-3 text-center font-semibold text-white">Back Home</a>
          </div>
          <div className="">
            <img src={img404} alt="" width={200} height={400} className="mx-auto inline-block h-full w-full max-w-[640px] object-cover"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default NotFoundPage