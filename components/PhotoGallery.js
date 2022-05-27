import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Photo.module.css";
import PhotoCard from "./PhotoCard";

export const PhotoGallery = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const baseURL = "https://photogallery-data.herokuapp.com/photos";
  useEffect(() => {
    createPost()
  }, [data, filteredData]);

  const createPost = () => {
    axios.get(baseURL).then((response) => {
      setData(response.data);
    });
  }
  const deletePost = (id) => {
    axios.delete(`${baseURL}/${id}`).then(() => {
         alert("Post deleted!");
        });
  }
  // const updatePost = (id) => {
  //   let item = data[id]
  //   setData()
  //   // axios.put(`${baseURL}/${id}`, {body}).then(() => {
  //   //     alert("Post Updated!");
  //   //   });
  // }

  // //   console.log(data);

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
          ? filteredData.map((item) => {
              return (
                <PhotoCard item={item} key={item.id} del={deletePost}/>
              );
            })
          : data.map((item, index) => {
              return (
                <PhotoCard item={item} key={item.id} del={deletePost}/>
              );
            })}
      </div>
      {/* <AddPhoto/> */}
      </div>
    </>
  );
};
