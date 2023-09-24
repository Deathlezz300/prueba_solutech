import React,{FC} from 'react'
import styles from '../styles/styles.module.css'

interface props{
  width:string,
  height:string
}

export const Loader:FC<props> = ({width,height}) => {
  return (
    <span className={`${styles.loader} ${width} ${height}`}></span>
  )
}
