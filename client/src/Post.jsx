import React from 'react';
import { formatISO9075 } from "date-fns";
import {Link} from "react-router-dom";

function Post({ _id, title, summary, cover, content, createdAt, author }) {
  return (
    <div className="grid gap-5 mb-8 border-2 rounded-md border-gray-600 p-10" style={{ gridTemplateColumns: "0.9fr 1.1fr" }}>
      <div>
        <Link to={`/post/${_id}`}>
        <img 
          src={'http://localhost:4000/' + cover} 
          alt="cover image" 
          className="w-[600px] h-[350]"
        />
        </Link> 
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
        <h2 className="text-4xl font-bold no-underline text-inherit">{title}</h2>
        </Link>
        <p className="my-6 text-gray-500 text-base font-bold flex gap-2">
          <a className="text-gray-800">{author?.username || 'Unknown Author'}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="leading-relaxed">
          {summary}
        </p>
      </div>
    </div>
  );
}

export default Post;
