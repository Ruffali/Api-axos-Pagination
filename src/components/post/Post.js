import React from 'react';
import './Post.scss';

const Post = ({id, body, title}) => {
 
  return (
    <div className="post">
        <div className="id">{id}</div>
        <div className="title">{title}</div>
        <div className="body">{body}</div>
    </div>
  );
}

export default Post;
