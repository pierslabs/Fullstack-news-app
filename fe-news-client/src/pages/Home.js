import React, { useEffect, useState } from 'react'
import ListItem from '../components/list-item/ListItem';
import useFetch from '../customHooks/useFetch';
import RotateLoader from "react-spinners/RotateLoader";
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = () => {
    fetch(`${process.env.REACT_APP_DB_URL}/news`)
      .then(res => res.json())
      .then(data => {
        setNews(
          data.filter(item => item.archiveDate === null)
        )
        setLoading(false)
      })
  }

  useEffect(() => {
    getData();
  }, [loading])

  return (
    <div className="conatiner" style={{ maxHeight: '100vh', height: '100vh', overflow: 'scroll' }}>

      {
        loading ?
          <RotateLoader
            color='#25c6e2'
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
            speedMultiplier={1}
          />
          :
          news.map(item => (
            <ListItem data={item} getData={getData} setLoading={setLoading} />
          ))
      }
      <Toaster />
    </div >
  )
}

export default Home