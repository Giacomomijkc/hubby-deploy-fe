import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDesignerDeals, startDeal, endDeal, deleteDeal } from '../redux/dealsSlice';
import { getDesignerInvoices, downloadInvoicePDF } from '../redux/invoicesSlice';
import { fetchClients } from '../redux/clientsSlice';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import CreateInvoiceForm from './CreateInvoiceForm';
import './SingleDealDesignerDashboard.css';

const SingleDealDesignerDashboard = ({ designerId }) => {
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
    const designerDeals = useSelector((state) => state.deals.designerDeals)
    const clients = useSelector((state) => state.clients.clients)
    const designerInvoices = useSelector((state) => state.invoices.designerInvoices)
    
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
    

    useEffect(() => {
        dispatch(fetchDesignerDeals(designerId));
        dispatch(fetchClients());
        dispatch(getDesignerInvoices(designerId))
    }, [dispatch, designerId]);

    console.log(clients)

    const handleStartDeal = async (dealId) => {
      await dispatch(startDeal(dealId));
      await dispatch(fetchDesignerDeals(designerId));
      console.log('lanciato fetchDesignerDeals')
      await dispatch(fetchClients());
      console.log('lanciato fetchClients')
    }

    const handleEndDeal = async (dealId) => {
      await dispatch(endDeal(dealId));
      await dispatch(fetchDesignerDeals(designerId));
      console.log('lanciato fetchDesignerDeals')
      await dispatch(fetchClients());
      console.log('lanciato fetchClients')
    }

    const handleDeleteDeal = async (dealId) => {
      await dispatch(deleteDeal(dealId));
      await dispatch(fetchDesignerDeals(designerId));
      console.log('lanciato fetchDesignerDeals')
      await dispatch(fetchClients());
      console.log('lanciato fetchClients')
    }

    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [selectedDealId, setSelectedDealId] = useState(null);

    
  return (
    <>
{designerDeals && 
designerDeals.map((designerDeal) => {
  const client = clients?.find(c => c._id === designerDeal.client);
  const hasAssociatedInvoice = designerInvoices.find(invoice => invoice.deal === designerDeal._id);
  console.log(hasAssociatedInvoice)
  return (
    <div className='d-flex flex-column my-5 mx-2 deal' style={{ width: '350px' }} key={designerDeal._id}>
      {client && (
        <div className='d-flex justify-content-between align-items-center'>
          <Link className='links' to={`/clients/${client._id}`}>
            <div>
              <img className='user-avatar' src={client.avatar} alt="client img" />
            </div> 
            <div>
              <span className='user-nickname'>{client.company}</span>  
            </div> 
          </Link>
        </div>
      )}
      <div className='d-flex justify-content-center align-items-center'>
        <div className='mt-2'>
          <span className='info'>{designerDeal.description}</span>
        </div>
      </div>
      <div className='d-flex justify-content-center align-items-center'>
        <div className='mt-2'>
          <span className='tags'>                  
          {designerDeal.tags?.map((tag, index) => (
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
          <span className=''>Reworks included: {designerDeal.rework_limit}</span>
        </div>
      </div>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='mt-2'>
        <span className='amount'>{designerDeal.timing.timing_value} {designerDeal.timing.timing_unit}</span>
        </div>
        <div className='mt-2'>
          <span className='amount'>{designerDeal.amount.amount_value} {designerDeal.amount.amount_unit}</span>
        </div>
      </div>
      <div>
      {designerDeal.status === 'accepted' && (
          <div className='d-flex justify-content-center align-items-center mt-2'>
            <span className='accepted-status'>Accepted on: {designerDeal.updatedAt.slice(0, 10)}</span>
          </div>
        )}

        {designerDeal.status === 'offered' && (
          <div className='d-flex justify-content-center align-items-center mt-2'>
            <span className='accepted-status'>Offered on: {designerDeal.updatedAt.slice(0, 10)}</span>
          </div>
        )}

        {designerDeal.status === 'denied' && (
          <div className='d-flex justify-content-center align-items-center mt-2'>
            <span className='accepted-status'>Denied on: {designerDeal.updatedAt.slice(0, 10)}</span>
          </div>
        )}

        {designerDeal.status === 'in progress' && (
          <div className='d-flex justify-content-center align-items-center mt-2'>
            <span className='accepted-status'>In progress on: {designerDeal.updatedAt.slice(0, 10)}</span>
          </div>
        )}

        {designerDeal.status === 'completed' && (
          <div className='d-flex justify-content-center align-items-center mt-2'>
            <span className='accepted-status'>Completed on: {designerDeal.updatedAt.slice(0, 10)}</span>
          </div>
        )}
      </div>
              <div className='d-flex justify-content-between align-items-center mt-3'>
          <div>
            {designerDeal.status === 'offered' && (
              <span className='status-text'>Waiting for Client Action</span>
            )}
            {designerDeal.status === 'accepted' && (
              <>
              <div className='d-flex justify-content-center align-itmes-center'>
              <Button className='edit-deal-buttons mx-2' onClick={() => handleStartDeal(designerDeal._id)}>Start</Button>
              </div>
              </>
            )}
            {designerDeal.status === 'denied' && (
            <>
            <div className='d-flex justify-content-center align-itmes-center'>
            <Button className='edit-deal-buttons mx-2' onClick={() => handleDeleteDeal(designerDeal._id)}>Delete</Button>
            </div>
            </>
            )}
            {designerDeal.status === 'in progress' && (
              <>
              <div className='d-flex justify-content-center align-itmes-center'>
              <Button className='edit-deal-buttons mx-2' onClick={() => handleEndDeal(designerDeal._id)}>End</Button>
              </div>
              </>
            )}
            {designerDeal.status === 'completed' && !hasAssociatedInvoice && (
              <>
              <div className='d-flex justify-content-center align-itmes-center'>
                  <Button className='edit-deal-buttons mx-2' onClick={() => {
                setSelectedDealId(designerDeal._id);
                setShowInvoiceModal(true);
              }}>Invoice</Button>
              </div>
              <CreateInvoiceForm
                show={showInvoiceModal}
                onClose={() => setShowInvoiceModal(false)}
                dealId={selectedDealId}
              />
              </>
            )}
            {designerDeal.status === 'completed' && hasAssociatedInvoice && (
              <div className='d-flex justify-content-center align-items-center'>
      <Button className='edit-deal-buttons mx-2' onClick={() => {
      console.log('Invoice ID:', hasAssociatedInvoice._id); // Aggiungi questo log
      handleDownloadInvoice(hasAssociatedInvoice._id);
    }}>
      See Inv
    </Button>
              </div>
            )}
          </div>
          <div>
            <span className={`${getStatusClass(designerDeal.status)}`}>{designerDeal.status.toUpperCase()}</span>
          </div>
        </div>
    </div>
  );
})}
  </>
  )
}



export default SingleDealDesignerDashboard