import React from 'react'
import Editor from '../Editor';
import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";

function EditPost() {

  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect,setRedirect] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/post/'+id)
    .then(response => {
        response.json().then(postInfo => {
            setTitle(postInfo.title);
            setContent(postInfo.content);
            setSummary(postInfo.setSummary);
        });
    });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const response = await fetch('http://localhost:4000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if(response.ok){
        setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }

  return (
    <form onSubmit={updatePost}>
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
        Update post
      </button>
    </form>
  )
}

export default EditPost
