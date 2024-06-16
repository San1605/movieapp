import React from 'react'
import Navbar from './Navbar'

type LayoutProps = {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    
    return (
        <div className='h-screen w-screen overflow-hidden flex flex-col'>
            <Navbar/>
            <div className='h-[calc(100%_-_60px)] w-full'>
                {children}
            </div>
        </div>
    )
}
export default Layout
