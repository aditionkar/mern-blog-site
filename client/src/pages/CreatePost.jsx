import React from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from 'react-router-dom';  // Ensure this is correctly imported
import Editor from "../Editor";


function CreatePost() {

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);

    if (files && files[0]) {
      data.set('file', files[0]);
    } else {
      console.error("No file selected");
      return;  // Exit if no file is selected
    }

    try {
      const response = await fetch('http://localhost:4000/post', {
        method: 'POST',
        body: data,
        credentials: 'include',
      });
      
      console.log('Response:', response);  // Debugging line
      const responseBody = await response.json();
      console.log('Response Body:', responseBody);  // Debugging line

      if (response.ok) {
        console.log('Post created successfully');
        setRedirect(true);
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error during post creation:', error);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <form onSubmit={createNewPost}>
      <input
        className='w-full border-2 border-gray-400 h-10 p-4 rounded'
        type="title"
        placeholder={'Title'}
        value={title}
        onChange={ev => setTitle(ev.target.value)} />
      <input
        className='w-full border-2 border-gray-400 mt-6 h-10 p-4 rounded'
        type="summary"
        placeholder={'Summary'}
        value={summary}
        onChange={ev => setSummary(ev.target.value)} />
      <input
        className='mt-4'
        type="file"
        onChange={ev => setFiles(ev.target.files)} />
               
      <Editor value={content} onChange={setContent} />
        
      <button className='mt-6 cursor-pointer w-full block bg-gray-700 border-0 text-white rounded p-2'>
        Create new post
      </button>
    </form>
  )
}

export default CreatePost;