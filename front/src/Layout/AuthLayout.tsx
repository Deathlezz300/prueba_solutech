import Head from 'next/head'
import React,{FC} from 'react'

interface props{
    children:JSX.Element | JSX.Element[],
    title:string,
    description:string
}

export const AuthLayout:FC<props> = ({children,title,description}) => {
  return (
    <>
        <Head>
            <title>{title}</title>
            <meta property='og:description' content={description}/>
        </Head>
        <main>
            {children}
        </main>
    </>
  )
}
