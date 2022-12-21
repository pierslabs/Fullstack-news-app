import React from 'react'
import { BiArchiveOut } from 'react-icons/bi'
const ListItem = ({ data, getDatta, setLoading }) => {

  const archiveItem = async (id) => {
    setLoading(true)
    await fetch(`${process.env.REACT_APP_DB_URL}/news/${id}`, {
      method: 'PATCH'
    });
    await getDatta();
    setLoading(false)
  }

  return (

    <div className="jumbotron" >
      <div className="d-flex justify-content-between">
        <h3 > {data.title}</h3>
        <BiArchiveOut size='30' color='#ceac3b' onClick={() => archiveItem(data._id)} className='archivedICon' />
      </div>

      <hr className="my-4" />
      <p  >{data.description}</p >
      <p>{data.content}</p>
      <div className="author">Author: {data.author}</div>
    </div>

  )
}

export default ListItem