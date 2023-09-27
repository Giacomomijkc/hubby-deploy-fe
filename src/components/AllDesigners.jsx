import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDesigners } from '../redux/designersSlice';
import SingleDesigner from './SingleDesigner';

const AllDesigners = () => {

    const dispatch = useDispatch();
    const designers = useSelector((state) => state.designers.designers);
    console.log(designers)

    useEffect(() => {;
        dispatch(fetchDesigners())
    }, [dispatch]);

  return (
    <>
    <div className='d-flex flex-column flex-wrap justify-content-center align-items-center'>
    {designers &&
    designers.map((designer) => {
        return (
            <SingleDesigner designer={designer} key={designer._id} />
        );
        })
    }
    </div>
    </>
  )
}

export default AllDesigners