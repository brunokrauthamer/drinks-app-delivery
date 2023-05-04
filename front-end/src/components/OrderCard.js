import PropTypes from 'prop-types';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Context from '../context/Context';
import { requestGet } from '../services/requests';

export default function OrderCard({ order }) {
  const { formatDate, saveToLocal, getToLocal } = useContext(Context);
  const [testId, setTestId] = useState('customer');
  const { id, status, saleDate, totalPrice } = order;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== '/customer/orders') setTestId('seller');
  }, []);

  const setCssColor = () => {
    if (status === 'Pendente') {
      return 'status-order-grey';
    }
    if (status === 'Preparando') {
      return 'status-order-yellow';
    }
    if (status === 'Em Trânsito') {
      return 'status-order-red';
    }
    return 'status-order-green';
  };

  return (
    <button
      className="card-orders"
      type="button"
      onClick={ async () => {
        try {
          const { role } = getToLocal('user');
          const { products } = await requestGet(`/${role}/orders/${id}`);
          saveToLocal('cartDrinks', products);
          navigate(`${id}`);
        } catch (error) {
          console.log(error);
        }
      } }
    >

      <div
        className="order-number"
        data-testid={ `${testId}_orders__element-order-id-${id}` }
      >
        {`Pedido ${id}` }
      </div>
      <div
        className={ `status-order ${setCssColor()}` }
        data-testid={ `${testId}_orders__element-delivery-status-${id}` }
      >
        {status}
      </div>

      <div className="container-phone-price">
        <div
          data-testid={ `${testId}_orders__element-order-date-${id}` }
          className="date-order"
        >
          { formatDate(saleDate)}
        </div>
        <div
          className="price-order"
          data-testid={ `${testId}_orders__element-card-price-${id}` }
        >
          {totalPrice.toString().replace('.', ',')}
        </div>
      </div>
    </button>

  );
}

OrderCard.propTypes = {
  saleDate: PropTypes.string,
  id: PropTypes.number,
  status: PropTypes.string,
  totalPrice: PropTypes.number,
}.isRequired;
