import React from 'react'
import Barra from './Barra'
import Head from 'next/head'
import Login from './Barra'

const Layout = ({children,tituloPagina}) => {
  return (
    <div>
        
        <Head>
            <title>Consultorio - {tituloPagina}</title>
        </Head>

       
        
        
        <Barra >
          {children}
        </Barra> 
       
        
        
        
    </div>
  )
}

export default Layout