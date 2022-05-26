import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router'
import Link from 'next/link'
import {useForm} from 'react-hook-form'

const initialFormData = {
    src:"https://cdn.pixabay.com/photo/2019/07/31/19/21/hare-4375952__340.jpg",
    Desc:"",
    Heading1:"",
    Heading2:"",
}
const AddPhoto = () => {
//
const { register, handleSubmit, formState: { errors } } = useForm();
const onSubmit = formData => {
    const createPost = () => {
      axios.post(baseURL, formData)
      .then(response => response.data.id);
    }
    createPost()
  console.log(formData);
}
console.log(errors);
//
const [formData, setFormData] = useState(initialFormData);
const router = useRouter()

  const baseURL = "http://localhost:3004/photos";
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
 
  
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   // console.log(formData);
  //   const createPost = () => {
  //     axios.post(baseURL, formData)
  //     .then(response => response.data.id);
  //   }
  //   createPost()
  //   // router.push('/')
  // };
  return <>
    <form className="survey-form" style={{width:'30%'}}  onSubmit={handleSubmit(onSubmit)}>
        <h2>Add Photo</h2>
         
        <br/>
          <div className="inputwrap col">
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <label  id="name-label">Image Link</label>
            <Link  href="https://pixabay.com/photos/search/pets/">
             <a target="_blank" style={{textDecoration:'none', textAl0ign:'center'}}>Get Photo Links</a>
            </Link>
            </div>
            <input onChange={handleChange}
              className="mt8"
              type="text"
              name="src"
              {...register("src", {required: true, pattern: /^(https?):\/\/(cdn.pixabay.com\/)/gm })}
              placeholder="Enter Image Link (exp:https://cdn.pixabay.com/)"
            />
            {errors.src?.type === 'required' && "src is required"}
            {errors.src?.type === 'pattern' && "Only accepts pixabay.com URLs"}
       
          </div>
          <div className="inputwrap col">
            <label  id="email-label">Heading 1</label>
            <input onChange={handleChange}
              className="mt8"
              type="text"
              name="Heading1"
              {...register("Heading1", {required: true, maxLength: 100})} 
              placeholder="Enter Heading1"
            />
            {errors.Heading1?.type === 'required' && "Heading1 is required"}
          </div>
          <div className="inputwrap col">
            <label  id="email-label">Heading 2</label>
            <input  onChange={handleChange}
              className="mt8"
              type="text"
              name="Heading2"
              {...register("Heading2", {maxLength: 100})} 
              placeholder="Enter Heading2"
            />
            {errors.Heading2?.type === 'required' && "Heading2 is required"}
          </div>
          <div className="inputwrap col">
            <label  id="email-label">Description</label>
            <textarea onChange={handleChange}
              className="mt8"
              cols="30"
              rows="7"
              name="Desc"
              {...register("Desc", {required: true})} 
              placeholder="Enter Description"
            />
            {errors.Desc?.type === 'required' && "Description is required"}
          </div>
          <button type="submit" id="submit" className="submit">Submit</button>
        </form> </>;
};

export default AddPhoto;
