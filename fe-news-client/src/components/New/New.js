import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import DotLoader from "react-spinners/DotLoader";
import './new.css';

const New = () => {
  const navigate = useNavigate();

  const { register, reset, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await fetch(`${process.env.REACT_APP_DB_URL}/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      toast.success('Successfully created!');
      reset()
      setLoading(false)
      setTimeout(() => {
        navigate('/')
      }, 1000)
    } catch (error) {
      toast.error('!Error');
    }
  }

  return (
    <div>
      <Toaster />
      {loading ?
        <div className="loader-container">
          <DotLoader
            color='#66d2e6'
            loading={loading}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
            speedMultiplier={1.2}
          />
        </div>
        :
        <div id="form" className='card mx-auto mb-3 mt-5'>
          <div className="card-header text-dark">
            <h4>Create a new</h4>
          </div>
          <div className="card-body text-start p-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="">Title</label>
                <input type="text" className="form-control" id='title' name='title' required {...register('title')} />
              </div>
              <div className="mb-3">
                <label htmlFor="">Description</label>
                <input type="text" className="form-control" id='title' name='title' required  {...register('description')} />
              </div>
              <div className="mb-3">
                <label htmlFor="">Content</label>
                <input type="text" className="form-control" id='title' name='title' required rows='6' cols='20'  {...register('content')} />
              </div>
              <div className="mb-3">
                <label htmlFor="">Author</label>
                <input type="text" className="form-control" id='title' name='title' required  {...register('author')} />
              </div>
              <div className="mb-3">
                <input type="submit" className='form-control btn btn-primary' id='publish' value='publish' required />
              </div>
            </form>
          </div>
        </div>
      }
    </div >
  )
}

export default New