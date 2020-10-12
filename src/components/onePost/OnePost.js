import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import background from './img/mvmllgp2cuk11.png';
import './OnePost.scss';

const OnePost = (props) => {
    const [post, setPost] = useState({});

    useEffect(() => {
        axios.get("posts/" + props.match.params.id)
            .then((resp) => {
                setPost(resp.data)
            })
    }, [])
    return (
        <div className="onePost">
            <div className="left">
                <div className="top">Post</div>
                <h1>{post.title}</h1>
                <div className="text">
                    <h2>{post.body}</h2>
                </div>
            </div>
            <div className="right">
                <img src={background} />
            </div>
        </div>
    );
}

export default withRouter(OnePost);
