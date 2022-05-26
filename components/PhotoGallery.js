import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from 'next/link'
import styles from "../styles/Photo.module.css";
export const PhotoGallery = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const baseURL = "http://localhost:3004/photos";
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setData(response.data);
    });
  }, []);

  //   console.log(data);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const searchedData = data.filter((item) => {
        return Object.values(item.Heading1)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredData(searchedData);
    } else {
      setFilteredData(data);
    }
    // console.log(searchedData);
  };

    //   if (data || filteredData !== null) return "No Photos!";

  return (
    <>
    <div style={{width:'70%'}}>
    <h1>Photo Gallery</h1>
    <div style={{display:'flex', justifyContent:'center', margin:'30px 0' }}>
      <input
        placeholder="Search by Title.."
        type="text"
        className={styles.search}
        onChange={(e) => searchItems(e.target.value)}
      />
      </div>  
      <div className={`${styles.gallery} ${styles.gallery__content_flow}`}>
        {searchInput.length > 2
          ? filteredData.map((item, index) => {
              return (
                <div className={styles.figure} key={index}>
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
                  </figcaption>
                </div>
              );
            })
          : data.map((item, index) => {
              return (
                <div className={styles.figure} key={index}>
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
                  </figcaption>
                </div>
              );
            })}
      </div>
      {/* <AddPhoto/> */}
      </div>
    </>
  );
};
