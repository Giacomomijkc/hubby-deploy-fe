import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientDeals, acceptDeal, denyDeal } from '../redux/dealsSlice';
import { fetchDesigners } from '../redux/designersSlice';
import { getClientInvoices, downloadInvoicePDF } from '../redux/invoicesSlice';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import './SingleDealClientDashboard.css';

const SingleDealClientDashboard = ({ clientId }) => {
    const getStatusClass = (status) => {
        switch (status) {
          case 'offered':
            return 'status-yellow'; 
          case 'accepted':
            return 'status-green'; 
          case 'denied':
            return 'status-red'; 
          case 'completed':
            return 'status-purple'; 
          case 'in progress':
            return 'status-blu'; 
          default:
            return ''; 
        }
      };


    const dispatch = useDispatch();
    const clientDeals = useSelector((state) => state.deals.clientDeals)
    const designers = useSelector((state) => state.designers.designers)
    const clientInvoices = useSelector((state) => state.invoices.clientInvoices)

    useEffect(() => {
        dispatch(fetchClientDeals(clientId));
        dispatch(fetchDesigners);
        dispatch(getClientInvoices(clientId))
    }, [dispatch, clientId]);

    const handleAcceptDeal = async (dealId) => {
      await dispatch(acceptDeal(dealId));
      await dispatch(fetchClientDeals(clientId));
    }

    const handleDenyDeal = async (dealId) => {
      await dispatch(denyDeal(dealId));
      await dispatch(fetchClientDeals(clientId));
    }

    const handleDownloadInvoice = async (invoiceId) => {
      try {
        const response = await dispatch(downloadInvoicePDF(invoiceId));
        if (downloadInvoicePDF.fulfilled.match(response)) {
          const pdfURL = response.payload;  // Ottieni pdfURL dalla risposta
          window.open(pdfURL, '_blank');
        } else {
          console.error('Error downloading PDF:', response.payload);
        }
      } catch (error) {
        console.error('Error downloading PDF:', error);
      }
    };
    
  return (
    <>
        {clientDeals && clientDeals.map(clientDeal => {
          const designer = designers?.find(d => d._id === clientDeal.designer);
          const hasAssociatedInvoice = clientInvoices.find(invoice => invoice.deal === clientDeal._id);
          return (
            <div className='d-flex flex-column my-5 mx-2 deal' style={{ width: '350px' }} key={clientDeal._id}>
              {designer && (
                <div className='d-flex justify-content-between align-items-center'>
                  <Link className='links' to={`/designers/${designer._id}`}>
                    <div>
                      <img className='user-avatar' src={designer.avatar} alt="client img" />
                    </div> 
                    <div>
                      <span className='user-nickname'>{designer.nickname}</span>  
                    </div> 
                  </Link>
                </div>
            )}
        <div className='d-flex justify-content-center align-items-center'>
          <div className='mt-2 d-flex justify-content-center align-items-center'>
            <span className='info'>{clientDeal.description}</span>
          </div>
        </div>
        <div className='d-flex justify-content-center align-items-center'>
          <div className='mt-2'>
            <span className='tags'>                  
              {clientDeal.tags?.map((tag, index) => (
                <React.Fragment key={tag}>
                  {index > 0 && <span className='tag-separator'> | </span>}
                  {tag}
                </React.Fragment>
              ))}
            </span>
          </div>
        </div>
        <div className='d-flex justify-content-center align-items-center'>
          <div className='info mt-2'>
            <span className=''>Reworks included: {clientDeal.rework_limit}</span>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            <span className='amount'>{clientDeal.timing.timing_value} {clientDeal.timing.timing_unit}</span>
          </div>
          <div>
            <span className='amount'>{clientDeal.amount.amount_value} {clientDeal.amount.amount_unit}</span>
          </div>
        </div>
        <div>
          {clientDeal.status === 'accepted' && (
            <div className='d-flex justify-content-center align-items-center mt-2'>
              <span className='accepted-status'>Accepted on: {clientDeal.updatedAt.slice(0, 10)}</span>
            </div>
          )}

          {clientDeal.status === 'offered' && (
            <div className='d-flex justify-content-center align-items-center mt-2'>
              <span className='accepted-status'>Offered on: {clientDeal.updatedAt.slice(0, 10)}</span>
            </div>
          )}

          {clientDeal.status === 'denied' && (
            <div className='d-flex justify-content-center align-items-center mt-2'>
              <span className='accepted-status'>Denied on: {clientDeal.updatedAt.slice(0, 10)}</span>
            </div>
          )}

          {clientDeal.status === 'in progress' && (
            <div className='d-flex justify-content-center align-items-center mt-2'>
              <span className='accepted-status'>In progress on: {clientDeal.updatedAt.slice(0, 10)}</span>
            </div>
          )}

          {clientDeal.status === 'completed' && (
            <div className='d-flex justify-content-center align-items-center mt-2'>
              <span className='accepted-status'>Completed on: {clientDeal.updatedAt.slice(0, 10)}</span>
            </div>
          )}
        </div>
        <div className='d-flex justify-content-between align-items-center mt-3'>
          <div>
            {clientDeal.status === 'offered' && (
              <>
              <div className='d-flex justify-content-center align-itmes-center'>
              <Button className='edit-deal-buttons mx-2' onClick={() => handleAcceptDeal(clientDeal._id)}>Accept</Button>
                <Button className='edit-deal-buttons mx-2' onClick={() => handleDenyDeal(clientDeal._id)}>Deny</Button>
              </div>
              </>
            )}
            {clientDeal.status === 'accepted' && (
              <span className='status-text'>Waiting for Designer Action</span>
            )}
            {clientDeal.status === 'denied' && (
              <span className='status-text'>Waiting for Designer Action</span>
            )}
            {clientDeal.status === 'in progress' && (
              <span className='status-text'>Waiting for Designer Action</span>
            )}
            {clientDeal.status === 'completed' && !hasAssociatedInvoice && (
              <span className='status-text'>Waiting for Designer Action</span>
            )}
            {clientDeal.status === 'completed' && hasAssociatedInvoice && (
              <div className='d-flex justify-content-center align-items-center'>
                <Button className='edit-deal-buttons mx-2' onClick={() => {
                console.log('Invoice ID:', hasAssociatedInvoice._id);
                handleDownloadInvoice(hasAssociatedInvoice._id);
              }}>
                Invoice
              </Button>
              </div>
            )}
          </div>
          <div>
            <span className={`${getStatusClass(clientDeal.status)}`}>{clientDeal.status.toUpperCase()}</span>
          </div>
        </div>
      </div>
    );})}
  </>
  )
}

export default SingleDealClientDashboard