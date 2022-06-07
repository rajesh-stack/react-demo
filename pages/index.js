import Head from "next/head";
import styles from "../styles/Home.module.css";
import { PhotoGallery } from "../components/PhotoGallery";
import AddPhoto from "../components/AddPhoto";
import { useEffect, useState, createContext } from "react";
import {useForm} from 'react-hook-form'

// import axios from "axios";
import { httpHelper } from "../helper/httpHelper"
import axios from "axios";

export const dataStateContext = createContext({
  data: [],
  searchInput: "",
  filteredData: "",
  formData:"",
  isUpdate:null,
  setIsUpdate:() => {},
  setFormValues:() => {},
  errors:() => {},
  reset:() => {},
  register:() => {}, 
  setValue:() => {}, 
  handleSubmit:() => {},
  getData: () => {},
  addData: () => {},
  deletePost: () => {},
  editPost: () => {},
  searchItems: () => {},
  handleChange: () => {},
});
const initialFormData = {
  src:'',
  Desc:'',
  Heading1:'',
  Heading2:''
}
export default function Home() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [formData, setFormData] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const { register, setValue, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm({ defaultValues: initialFormData });
  const url = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    getData();
  }, []);
  
  const getData = () => {
		axios
			.get(url)
			.then(response => {
				setData(response.data)
			})
			.catch(err => console.log(err))
	}
  
  const addData = (formData) => {
    axios.post(url, formData).then(() => {
      getData();
    });
  };

  const deletePost = (id) => {
		axios
			.delete(`${url}/${id}`)
			.then(response => {
        alert("Post deleted!");
        getData()
      })
			.catch(err => console.log(err))
	}

  const editPost = (id, data) => {
    axios.put(`${url}/${id}`, data).then(() => {
      getData();
    });
    alert("Post Updated!");
    // console.log('API data', id, data)
  };

  const setFormValues = (data) => {
    setValue({
      ...data,
      [data.key]: data.value
    })
    console.log(formData)
    // setValue("id", id.id);
    // setValue("src", id.src);
    // setValue("Desc", id.Desc);
    // setValue("Heading1", id.Heading1);
    // setValue("Heading2", id.Heading2);
    setIsUpdate(true)
  }

  // const getData = () => {
  //   axios.get(baseURL).then((response) => {
  //     setData(response.data);
  //   });
  // };
  // const deletePost = (id) => {
  //   axios.delete(`${baseURL}/${id}`).then(() => {
  //     alert("Post deleted!");
  //     getData();
  //   });
    
  // };
  //   const addData = (formData) => {
  //     const createPost = () => {
  //       axios.post(baseURL, formData)
  //       .then(() => {
  //         getData();
  //       });
  //     }
  //   createPost()
  // }
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
            isUpdate,
            reset,
            setIsUpdate,
            register, setValue, handleSubmit, errors,
            setFormValues,
            getData,
            deletePost,
            editPost,
            searchItems,
            addData,
            handleChange
          }}
          >
          <PhotoGallery />
          <AddPhoto />
        </dataStateContext.Provider>
      </main>
    </div>
  );
}
