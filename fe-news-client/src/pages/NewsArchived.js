/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useState } from 'react'
import ListItem from '../components/list-item/ListItem';
import DotLoader from "react-spinners/DotLoader";
import { Toaster } from 'react-hot-toast';

const NewsArchived = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  const locationSpliter = window.location.href.split('/');
  const isLocationArchived = locationSpliter.includes('news-archived');

  const getData = () => {
    try {
      fetch(`${process.env.REACT_APP_DB_URL}/news`)
        .then(res => res.json())
        .then(data => {
          setNews(
            data.filter(item => item.archiveDate !== null)
          )
        })
      setInterval(() => {
        setLoading(false)
      }, 1000)
    } catch (error) {
      setError(error)
    }
    console.log(error)
  }

  useEffect(() => {
    getData();
  }, [loading])

  return (
    <div className="conatiner" >

      {
        loading ?
          <div className="loader-container">
            <DotLoader
              color='#66d2e6'
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
              speedMultiplier={1}
            />
          </div>
          :
          news.map(item => (
            <ListItem key={item._id} data={item} getData={getData} setLoading={setLoading} locationArchived={isLocationArchived} />
          ))
      }
      <Toaster />
      {news <= 0 ? <h1 className='text-center text-light mt-5'>You have no archived news.</h1> : null}
    </div >
  )
}

export default NewsArchived;