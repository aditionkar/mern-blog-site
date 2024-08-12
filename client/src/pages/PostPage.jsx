import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatISO9075 } from 'date-fns';
import { UserContext } from '../UserContext';
import {Link} from 'react-router-dom';

function PostPage() {

    const [postInfo, setPostInfo] = useState(null);
    const { id } = useParams();
    const {userInfo} = useContext(UserContext);

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
        .then(response => response.json())
        .then(postInfo => {
            setPostInfo(postInfo);
        })
        .catch(error => {
            console.error('Error fetching post:', error);
        });
    }, [id]);

    if (!postInfo) return <p>Loading...</p>;

    return (
        <div className="post-page">
            <h1 className="text-center my-2.5 text-6xl font-bold">{postInfo.title}</h1>
            <time className="text-center block text-base text-gray-400 my-2.5">
                {formatISO9075(new Date(postInfo.createdAt))}
            </time>
            <div className="author text-center mb-5 text-[0.7rem] font-bold">
                by @{postInfo.author.username}
            </div>
            {userInfo.id === postInfo.author._id && (
                <div className="edit-row text-center mb-5">
                    <Link to={`/edit/${postInfo._id}`} className="edit-btn bg-gray-800 inline-flex items-center gap-[5px] text-white py-[15px] px-[30px] rounded-[5px] no-underline">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        Edit this post
                    </Link>
                </div>
            )}
            <div className="image max-h-[500px] flex overflow-hidden">
                <img 
                    src={`http://localhost:4000/${postInfo.cover}`} 
                    alt={postInfo.title} 
                    className="object-cover object-center w-full" 
                />
            </div>
            <div className='content leading-[1.7rem] my-8' dangerouslySetInnerHTML={{__html:postInfo.content}}/>
        </div>
    );
}

export default PostPage;
