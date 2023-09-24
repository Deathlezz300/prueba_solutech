import { NavBar } from '@/Components/NavBar'
import Head from 'next/head'
import React,{FC} from 'react'

interface props{
    children:JSX.Element | JSX.Element[]
    title:string,
    description:string
}

export const MainLayout:FC<props> = ({title,description,children}) => {
  return (
    <>
        <Head>
            <title>{title}</title>
            <meta property='og:description' content={description}/>
        </Head>
        <NavBar/>
        <main className='flex flex-col flex-grow'>
            {children}
        </main>
    </>
  )
}
