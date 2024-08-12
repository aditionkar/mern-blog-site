import React from 'react'
import ReactQuill from "react-quill";
  
function Editor({value, onChange}) {

    const modules = {
        toolbar: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
          ["link", "image", "video"],
          ["clean"],
        ]
      };
      

  return (
    <div>
        <ReactQuill
        value={value}
        theme={'snow'}
        onChange={onChange}
        modules={modules}/>
    </div>
  )
}

export default Editor