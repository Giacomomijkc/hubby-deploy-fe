import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDesignerById } from '../redux/designersSlice';
import { Link } from 'react-router-dom';

const DesignerInfo = ({ designerId }) => {
  const dispatch = useDispatch();
  const designer = useSelector((state) => state.designers.singleDesigner);
  console.log(designer)

  useEffect(() => {
    dispatch(fetchDesignerById(designerId));
  }, [dispatch, designerId]);

  return (
    <div className='d-flex justify-content-between align-items-center'>
      <Link className='links' to={`/designers/${designer?._id}`}>
        <div>
              <img className='user-avatar' src={designer?.avatar} alt="designer img" />
          </div> 
          <div>
              <span className='user-nickname'>{designer ? designer.nickname : 'Loading...'}</span>  
          </div> 
      </Link>
    </div>
  );
};

export default DesignerInfo;