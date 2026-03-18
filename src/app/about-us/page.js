import images from '@/assets'
import Breadcrumb from '@/components/BreadCrumb/BreadCrumb'
import Image from 'next/image'
import React from 'react'

function AboutUS() {
  return (
    <div >

      <header className='relative w-full max-md:h-[300px]'>
        <Image src={images.AboutHeader} alt="About" className="w-full max-md:h-full" />


        <div className='absolute bottom-10 left-20 max-md:left-5 max-md:bottom-7'>
          <h2 className='text-6xl max-md:text-3xl font-semibold text-white'>About US</h2>
          <Breadcrumb />

        </div>
      </header>


      <div className='app__container flex max-md:flex-col max-md:items-center max-md:gap-4 max-md:pb-8 mt-10'>
        <div className='w-2/3 relative max-md:w-full'>
          <h2 className='text-4xl max-md:text-3xl font-medium text-[#10797C] leading-12 max-md:hidden'>Founded with a <br /> vision to simplify <br /> international trade</h2>

          <h2 className='text-4xl max-md:text-3xl text-center font-medium text-[#10797C] leading-10 md:hidden'>Founded with a vision to simplify  international trade</h2>
        </div>


        <div className='w-full flex flex-col gap-4'>
          <p className='grey-variant text-xl w-[85%] max-md:w-full'>
            Yiwu ZENTREX is a trusted brand committed to serving the needs of global buyers. Founded with a vision to simplify international trade, Yiwu ZENTREX has evolved to meet the ever-changing demands of the global market. With a strong foundation built on expertise, trust, and innovation, we empower businesses by providing high-quality products that drive efficiency and growth.
          </p>


          <p className='grey-variant text-xl w-[85%] max-md:w-full'>
            At ZENTREX , we engineer products that meet the highest industry standards. From cutting-edge technology to strict quality control, we ensure that every product is designed for maximum reliability and longevity. Our commitment to research and development allows us to continuously introduce innovative products that cater to evolving market needs.
          </p>


          <p className='grey-variant text-xl w-[85%] max-md:w-full'>
            With a strong presence of ZENTREX brand products across different nations, we leverage our on-ground knowledge to offer even customized solutions that address specific business requirements. Whether it’s industry-specific product development or bulk supply, our expertise enables us to meet the unique demands of our clients efficiently.
          </p>


          <p className='grey-variant text-xl w-[85%] max-md:w-full'>
            Our core industries include Automobile, Agriculture, and Hardware & Tools.
          </p>


        </div>

      </div>



      <div className='bg-[#F4F3F3] mt-20'>


        <div className='app__container gap-20 flex max-md:flex-col max-md:items-center max-md:gap-4 pt-14 pb-10 max-md:pb-8'>

          <div className='relative max-md:w-full '>
            <Image src={images.About} alt="About Header" className="" />
          </div>

          <div className='flex w-full justify-center items-center gap-4'>

            <h2 className='text-5xl max-md:text-4xl mt-2 font-medium text-[#10797C] leading-12 max-md:text-center '>Our Vision</h2>

            <div  className='h-[50%]  w-[2px] bg-[#10797C]'/>

            <p className='grey-variant text-xl  max-md:text-center mt-4 capitalize max-md:w-full w-[45%]'>Creating Benchmark across the Globe in  Delivering Value with Versatility.</p>

          </div>

        </div>
      </div>


    </div>
  )
}

export default AboutUS



const Team = () => {
  return (

    <div className='mt-20 bg-[#F4F3F3]'>

      <div className='app__container pt-10 pb-10 flex max-md:flex-col gap-5 max-md:items-center max-md:gap-4 max-md:pb-8'>

        <div className='w-2/3 relative max-md:w-full h-[280px] max-md:h-full flex flex-col justify-end'>
          <p className='grey-variant text-xl w-[85%] max-md:w-full max-md:hidden'>All of these possible <br /> thanks to </p>
          {/* Mobile */}
          <p className='grey-variant text-xl w-[85%] max-md:w-full md:hidden max-md:text-center'>All of these possible thanks to </p>

          <h2 className='text-5xl max-md:text-4xl mt-2 font-medium text-[#10797C] leading-12 max-md:text-center '>Our Team</h2>
        </div>


        <div className='w-full flex  max-md:flex-col max-md:justify-center max-md:items-center gap-4'>

          <div className='bg-[#D9D9D9] w-[250px] h-[280px]'></div>

          <div className='bg-[#D9D9D9] w-[250px] h-[270px]'></div>

          <div className='bg-[#D9D9D9] w-[250px] h-[260px]'></div>

        </div>

      </div>

    </div>
  )
}