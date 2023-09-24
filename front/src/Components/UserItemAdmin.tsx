import React,{FC} from 'react'

interface props{
    nombre:string,
    total:number,
    width:string
}

export const UserItemAdmin:FC<props> = ({nombre,total,width}) => {
  return (
    <div className={`${width} px-4 py-2 bg-white shadow-sm rounded-lg flex justify-between`}>
        <p className='font-poppin font-semibold'>{nombre}</p>
        <p className='font-poppin font-semibold'>${total ? total.toFixed(2) : ''}</p>
    </div>
  )
}
