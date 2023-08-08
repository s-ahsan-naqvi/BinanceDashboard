import React from 'react'
import SideNav from './SideNav'

const Layout = () => {
  return (
    <div className='h-screen w-full flex flex-row '>
      <SideNav />
      <div className='bg-[#ef5555] flex-1 text-[#ba4040] border-1 border-dashed overflow-y-scroll'>
        <section className='h-screen w-full bg-lime-400 p-6 font-extrabold text-2xl'>
            Section 1
        </section>
        <section className='h-screen w-full bg-purple-400 p-6 font-extrabold text-2xl'>
            Section 2
        </section>
        <section className='h-screen w-full bg-orange-400 p-6 font-extrabold text-2xl'>
            Section 3
        </section>

      </div>
    </div>
  )
}

export default Layout