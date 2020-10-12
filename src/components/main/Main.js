import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import Loader from '../loader/Loader';
import Post from '../post/Post';
import axios from 'axios';
import './Main.scss';
import OnePost from '../onePost/OnePost';

const Main = (props) => {
    const [page, setPage] = useState({
        loading: false,
        error: '',
        data: null
    })
    const [data, setData] = useState([])
    const [dataLength, setDataLength] = useState(0);
    const [afterPagination, setAfterPagination] = useState(0);
    const [pagination, setPagination] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    ]);
    const [beforePagination, setBeforePagination] = useState(pagination.length);

    useEffect(() => {
        setPage({ ...page, loading: true });
        axios.get("posts/")
            .then((resp) => {
                setDataLength(resp.data.length)
                setPage({ ...page, loading: false, error: '', data: resp.data[0] })
                setData(resp.data)
            })
            .catch((error) => {
                setPage({ ...page, loading: false, error: error.message })
                console.log(error)
            })

    }, [])

    const pgClick = (id) => {
        let beforeInPag = (id + 1) * (dataLength / pagination.length)
        let afterInPag = beforeInPag - (dataLength / pagination.length)
        setAfterPagination(afterInPag);
        setBeforePagination(beforeInPag);
    }

    if (page.loading) {
        return (
            <Loader />
        )
    } else if (page.error) {
        return (
            <>
                <h1 className="error">{page.error}</h1>
                <Loader />
            </>
        )
    } else if (page.data)
        return (
            <div className="app">
                {data.map((data) => {
                    if (data.id <= beforePagination && data.id > afterPagination)
                        // return  <Post key={data.id} id={data.id} body={data.body} title={data.title} /> 
                        return <Link
                            key={data.id}
                            to={"/" + data.id}
                            className="post_link">
                            <Post id={data.id} body={data.body} title={data.title} />
                        </Link>
                })}

                <ul className="page">
                    {pagination.map((pg, id) => {
                        return <li onClick={() => { pgClick(id) }} key={id} className="page__numbers">{pg}</li>
                    })}
                </ul>
                {/* <Route exact component={Main} /> */}
            </div>
        );
    else {
        return (
            <Loader />
        )
    }
}

export default Main;
