import React, { useEffect, useState } from 'react'
import ListItem from '../components/list-item/ListItem';
import { Toaster } from 'react-hot-toast';
import DotLoader from "react-spinners/DotLoader";


const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const locationSpliter = window.location.href.split('/');
  const isLocationArchived = locationSpliter.includes('news-archived');
  console.log(process.env.REACT_APP_DB_URL)

  const getData = () => {
    try {
      fetch(`${process.env.REACT_APP_DB_URL}/news`)
        .then(res => res.json())
        .then(data => {
          setNews(
            data.filter(item => item.archiveDate === null)
          )
        })
      setInterval(() => {
        setLoading(false)
      }, 1000)
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }

  const runSeed = async () => {
    try {
      setLoading(true)
      fetch(`${process.env.REACT_APP_DB_URL}/news/seed`)
        .then(res => res.json())
        .then(data => {
          getData()
          setNews(
            data.filter(item => item.archiveDate === null)
          )
        })
      setInterval(() => {
        setLoading(false)
      }, 1000)
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }

  useEffect(() => {
    getData();
  }, [loading])

  return (
    <div className="conatiner" >
      <div className="title d-flex justify-content-around text-light p-3">
        <h1>All Funds News</h1>
        {news.length <= 0 ? <button className='btn btn-primary' onClick={runSeed}>Run News Seed</button> : null}
      </div>
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
            <ListItem data={item} key={item._id} getData={getData} setLoading={setLoading} locationArchived={isLocationArchived} />
          ))
      }
      <Toaster />
    </div>
  )
}

export default Home