import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';
import Post from './components/post/Post';

const App = () => {
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

        //////////////////////////////////////////////////////////////////////
        // Bu hissede Dataya null gelir
        setPage({ ...page, loading: false, error: '', data: resp.data[0] })
        setData(resp.data)
        console.log(page.data);
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
      <div className="container-loader">
        <div className="loader1">
          <span></span>
        </div>
        <div className="loader2">
          <span></span>
        </div>
      </div>
    )
  } else if (page.error) {
    return (
      <>
        <h1 className="error">{page.error}</h1>
        <div className="container-loader">
          <div className="loader1">
            <span></span>
          </div>
          <div className="loader2">
            <span></span>
          </div>
        </div>
      </>
    )
  } else if (data)
    return (
      <div className="app">
        {data.map((data) => {
          if (data.id <= beforePagination && data.id > afterPagination)
            return <Post key={data.id} id={data.id} body={data.body} title={data.title} />
        })}

        <ul className="page">
          {pagination.map((pg, id) => {
            return <li onClick={() => { pgClick(id) }} key={id} className="page__numbers">{pg}</li>
          })}
        </ul>
      </div>
    );
}

export default App;
