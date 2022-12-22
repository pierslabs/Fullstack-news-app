import React, { useState } from 'react'
import { BiArchiveOut, BiTrashAlt } from 'react-icons/bi';
import { IoMdArchive } from 'react-icons/io';
import toast from 'react-hot-toast';
import Moment from 'react-moment';
import './listItem.css'

const ListItem = ({ data, getDatta, setLoading, locationArchived }) => {

  const [error, setError] = useState('');

  const archiveItem = async (id, method) => {
    try {
      setLoading(true)
      await fetch(`${process.env.REACT_APP_DB_URL}/news/${id}`, {
        method
      });
      const archivedMsg = data.archiveDate === null ? 'New Archived!' : 'New Unarchived!';
      method === 'PATCH' ? toast.success(archivedMsg) : toast.success('New Deleted!');
      setInterval(() => {
        setLoading(false)
      }, 1000)
    } catch (error) {
      setError(error)
    }
    console.log(error)
  }

  return (

    <div className="jumbotron bg-light mx-auto mt-3 p-3 rounded col-7" >
      <div className="d-flex justify-content-between align-items-center">
        < div className="col-lg-5" >
          <Moment format="LLL" withTitle >
            {data.date}
          </Moment>
        </div >

        {
          locationArchived ?
            <div className="d-flex justify-content-between align-items-center">
              < div className='archivedICon mx-2' >
                <BiArchiveOut size='25' color='rgb(26, 117, 236)' onClick={() => archiveItem(data._id, 'PATCH')} />
              </div >
              <div className='deletedIcon mx-2'>
                <BiTrashAlt size='25' color='#ce4c3b' onClick={() => archiveItem(data._id, "DELETE")} />
              </div>
            </div >
            :
            <div className="d-flex justify-content-between align-items-end">
              archive
              <IoMdArchive size='25' color='#ceac3b' onClick={() => archiveItem(data._id, "PATCH")} className='archivedICon mx-2' />
            </div>
        }
      </div >
      <div className="row mt-3">
        <h3 > {data.title}</h3>
      </div>
      <hr className="my-4" />
      <p  >{data.description}</p >
      <p>{data.content}</p>
      <div className="author">Author: {data.author}</div>
    </div >
  )
}

export default ListItem