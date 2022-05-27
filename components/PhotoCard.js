import React from 'react'
import Image from "next/image";
import styles from "../styles/Photo.module.css";

const PhotoCard = (props) => {
    const item = props.item
    const del = props.del
    // const update = props.update
  return (
    <>
      <div className={styles.figure}>
                  <h3>{item.Heading1}</h3>
                  <Image
                    width={350}
                    height={250}
                    className={styles.img_photo}
                    src={item.src}
                    alt={item.Desc}
                    title={item.title}
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
                        {/* <button className='action' onClick={() => update(item.id)}>Update</button> */}
                    </div>
                  </figcaption>
                </div>  
    </>
  )
}

export default PhotoCard