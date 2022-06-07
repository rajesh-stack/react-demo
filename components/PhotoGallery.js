import styles from "../styles/Photo.module.css";
import PhotoCard from "./PhotoCard";
import { dataStateContext } from "../pages/index";
import { useContext, useState } from "react";


export const PhotoGallery = () => {
  const context = useContext(dataStateContext);
  return (
    <>
    <div style={{width:'70%'}}>
    <h1>Photo Gallery</h1>
    <div style={{display:'flex', justifyContent:'center', margin:'30px 0' }}>
      <input
        placeholder="Search by Title.."
        type="text"
        className={styles.search}
        onChange={(e) => context.searchItems(e.target.value)}
      />
      </div>  
      <div className={`${styles.gallery} ${styles.gallery__content_flow}`}>
        {context.searchInput.length > 2
          ? context.filteredData?.map((item) => {
              return (
                <PhotoCard item={item} key={item.id} del={context.deletePost} edit={context.setFormValues}/>
              );
            })
          : context.data?.map((item) => {
              return (
                <PhotoCard item={item} key={item.id} del={context.deletePost} edit={context.setFormValues}/>
              );
            })}
      </div>
      {/* <AddPhoto/> */}
      </div>
    </>
  );
};
