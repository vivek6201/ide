import React from 'react'
import { ModeToggle } from './ui/ModeToggler'

export default function Navbar() {
  return (
    <div className='h-16 dark:bg-neutral-900 bg-gray-200 px-5 md:px-10 flex justify-between items-center'>
        <p className='text-xl font-bold'>CodersHub Compiler</p>
        <ModeToggle/>
    </div>
  )
}
