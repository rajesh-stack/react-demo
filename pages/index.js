import Head from "next/head";
import styles from "../styles/Home.module.css";
import { PhotoGallery } from "../components/PhotoGallery";
import AddPhoto from "../components/AddPhoto";
import { useEffect, useState, createContext } from "react";
import axios from "axios";

export const dataStateContext = createContext({
  data: [],
  searchInput: "",
  filteredData: "",
  formData:"",
  onSubmit: () => {},
  getData: () => {},
  deletePost: () => {},
  searchItems: () => {},
  handleChange: () => {},
});

export default function Home() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [formData, setFormData] = useState("");

  const baseURL = "https://photogallery-data.herokuapp.com/photos";
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get(baseURL).then((response) => {
      setData(response.data);
    });
  };
  const deletePost = (id) => {
    axios.delete(`${baseURL}/${id}`).then(() => {
      alert("Post deleted!");
      getData();
    });
    
  };

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

  const onSubmit = (formData) => {
      const createPost = () => {
        axios.post(baseURL, formData)
        .then(() => {
          getData();
        });
      }
    createPost()
  }

  const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }; 

  return (
    <div className={styles.container}>
      <Head>
        <title>Photo Gallery</title>
        <meta name="description" content="Photo Gallery next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <dataStateContext.Provider
          value={{
            data,
            searchInput,
            filteredData,
            formData,
            getData,
            deletePost,
            searchItems,
            onSubmit,handleChange
          }}
          >
          <PhotoGallery />
          <AddPhoto />
        </dataStateContext.Provider>
      </main>
    </div>
  );
}
