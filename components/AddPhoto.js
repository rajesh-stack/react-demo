import Link from 'next/link'
import {useForm} from 'react-hook-form'
import { dataStateContext } from "../pages/index";
import { useContext, useEffect } from "react";

const initialFormData = {
    src:'',
    Desc:'',
    Heading1:'',
    Heading2:''
}
const AddPhoto = () => {
const context = useContext(dataStateContext);
const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm({ defaultValues: initialFormData });
useEffect(() => {
  reset({src:'',  Desc:'',  Heading1:'',  Heading2:''})
}, [isSubmitSuccessful])
  return <>
    <form className="survey-form" style={{width:'30%'}}  onSubmit={handleSubmit(context.onSubmit)}>
        <h2>Add Photo</h2>
         
        <br/>
          <div className="inputwrap col">
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <label  id="name-label">Image Link</label>
            <Link  href="https://pixabay.com/photos/search/pets/">
             <a target="_blank" style={{textDecoration:'none', textAl0ign:'center'}}>Get Photo Links</a>
            </Link>
            </div>
            <input onChange={context.handleChange}
              className={`mt8 ${errors.src ? 'is-invalid' : ''}`}
              type="text"
              name="src"
              {...register("src", {required: true, pattern: /^(https?):\/\/(cdn.pixabay.com\/)/gm })}
              placeholder="Enter Image Link (exp:https://cdn.pixabay.com/)"
            />
             <span>{errors.src?.type === 'required' && "src is required"}
            {errors.src?.type === 'pattern' && "Only accepts pixabay.com URLs"}</span>
       
          </div>
          <div className="inputwrap col">
            <label  id="email-label">Heading 1</label>
            <input onChange={context.handleChange}
              className={`mt8 ${errors.Heading1 ? 'is-invalid' : ''}`}
              type="text"
              name="Heading1"
              {...register("Heading1", {required: true, maxLength: 100})} 
              placeholder="Enter Heading1"
            />
            <span>{errors.Heading1?.type === 'required' && "Heading1 is required"}</span>
          </div>
          <div className="inputwrap col">
            <label  id="email-label">Heading 2</label>
            <input  onChange={context.handleChange}
              className={`mt8 ${errors.Heading2 ? 'is-invalid' : ''}`}
              type="text"
              name="Heading2"
              {...register("Heading2", {maxLength: 100})} 
              placeholder="Enter Heading2"
            />
            <span>{errors.Heading2?.type === 'required' && "Heading2 is required"}</span>
          </div>
          <div className="inputwrap col">
            <label  id="email-label">Description</label>
            <textarea onChange={context.handleChange}
              className={`mt8 ${errors.Desc ? 'is-invalid' : ''}`}
              cols="30"
              rows="4"
              name="Desc"
              {...register("Desc", {required: true})} 
              placeholder="Enter Description"
            />
            <span>{errors.Desc?.type === 'required' && "Description is required"}</span>
          </div>
          <button type="submit" id="submit" className="submit">Submit</button>
        </form> </>;
};

export default AddPhoto;
