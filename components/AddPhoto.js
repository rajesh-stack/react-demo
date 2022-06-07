import Link from 'next/link'
import { dataStateContext } from "../pages/index";
import { useContext } from "react";


const AddPhoto = () => {
const context = useContext(dataStateContext);
  return <>
    <form className="survey-form" style={{width:'30%'}}  onSubmit={context.handleSubmit((formData) => {
      // console.log('form data', formData)
      if (context.isUpdate) {
        context.editPost(formData.id, formData);
        context.setIsUpdate(false)
       
      } else {
        context.addData(formData)
      }
      context.reset();
    })}>
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
              className={`mt8 ${context.errors.src ? 'is-invalid' : ''}`}
              type="text"
              name="src"
              {...context.register("src", {required: true, pattern: /^(https?):\/\/(cdn.pixabay.com\/)/gm })}
              placeholder="Enter Image Link (exp:https://cdn.pixabay.com/)"
            />
             <span>{context.errors.src?.type === 'required' && "src is required"}
            {context.errors.src?.type === 'pattern' && "Only accepts pixabay.com URLs"}</span>
       
          </div>
          <div className="inputwrap col">
            <label  id="email-label">Heading 1</label>
            <input onChange={context.handleChange}
              className={`mt8 ${context.errors.Heading1 ? 'is-invalid' : ''}`}
              type="text"
              name="Heading1"
              {...context.register("Heading1", {required: true, maxLength: 100})} 
              placeholder="Enter Heading1"
            />
            <span>{context.errors.Heading1?.type === 'required' && "Heading1 is required"}</span>
          </div>
          <div className="inputwrap col">
            <label  id="email-label">Heading 2</label>
            <input  onChange={context.handleChange}
              className={`mt8 ${context.errors.Heading2 ? 'is-invalid' : ''}`}
              type="text"
              name="Heading2"
              {...context.register("Heading2", {maxLength: 100})} 
              placeholder="Enter Heading2"
            />
            <span>{context.errors.Heading2?.type === 'required' && "Heading2 is required"}</span>
          </div>
          <div className="inputwrap col">
            <label  id="email-label">Description</label>
            <textarea onChange={context.handleChange}
              className={`mt8 ${context.errors.Desc ? 'is-invalid' : ''}`}
              cols="30"
              rows="4"
              name="Desc"
              {...context.register("Desc", {required: true})} 
              placeholder="Enter Description"
            />
            <span>{context.errors.Desc?.type === 'required' && "Description is required"}</span>
          </div>
          {context.isUpdate?
          <button type="submit" id="submit" className="submit">Update</button> :
          <button type="submit" id="submit" className="submit">Submit</button>}
          </form> </>;
};

export default AddPhoto;
