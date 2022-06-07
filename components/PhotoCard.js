import React from 'react';
import Image from "next/image";
import styles from "../styles/Photo.module.css";

const PhotoCard = (props) => {
    const item = props.item
    const del = props.del
    const edit = props.edit
  return (
    <>
      <div className={styles.figure}>
        <h3>{item.Heading1}</h3>
        <img
          width={350}
          height={250}
          src={item.src}
          alt={item.Desc}
          title={item.title}
          className={styles.img_photo}
        />
        <figcaption className={styles.header__caption}>
          <p className={`${styles.title} ${styles.title_primary}`}>
            {item.Desc}
          </p>
          <h2 className={`${styles.title} ${styles.title_secondary}`}>
            {item.Heading2}
          </h2>
          <div style={{display:'flex', justifyContent:'center'}}>
              <button className='action' onClick={() => del(item.id)}>Delete</button> 
              <button className='action' onClick={() => edit(item)}>Edit</button>
          </div>
        </figcaption>
      </div>  
    </>
  )
}

export default PhotoCard