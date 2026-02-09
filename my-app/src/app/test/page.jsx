"use client"
import React, { useContext,useEffect } from 'react'
import { ThemeContext } from '../components/ThemeProvider'


const page = () => {
    let {theme,toggleTheme}=useContext(ThemeContext)
useEffect(()=>{
    localStorage.setItem('theme',theme)
  },[theme])
  return (
    <div className={theme=="dark"?`bg-purple-400`:"bg-white"}>
      {theme}
      <button onClick={toggleTheme} className='bg-blue-400 text-white'>Toggle</button>
    </div>
  )
}

export default page
