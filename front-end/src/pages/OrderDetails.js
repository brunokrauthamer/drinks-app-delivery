import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Headers from '../components/Header';
import Context from '../context/Context';
import CheckoutTable from '../components/CheckoutTable';
import { requestGet, setToken } from '../services/requests';

export default function Orders() {
  const { getToLocal, formatDate } = useContext(Context);
  const testId = 'customer_order_details__element-order-details-label-delivery-status';
  const [role, setRole] = useState('customer');
  const [sale, setSale] = useState({});
  const { id } = useParams();

  const getSaleById = async ({ token }) => {
    setToken(token);
    console.log(token);
    const saleById = await requestGet(`/customer/orders/${id}`);
    setSale(saleById);
    // saveToLocal('cartDrinks', saleById.products);
  };

  useEffect(() => {
    const localUser = getToLocal('user');
    setRole(localUser.role);
    getSaleById(localUser);
  }, []);

  return (
    <div>
      <div>
        <Headers />
        <h1>Detalhe do Pedido</h1>
        <div>
          <p data-testid="customer_order_details__element-order-details-label-order-id">
            { `PEDIDO ${sale.deliveryNumber}` }
          </p>
          <p
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            { `P.Vend: ${sale.sellerName}` }
          </p>
          <p
            data-testid={
              `${role}_order_details__element-order-details-label-order-date`
            }
          >
            { formatDate(sale.saleDate) }
          </p>
          <p
            data-testid={ testId }
          >
            { sale.status }
          </p>
          { role === 'customer' ? (
            <button
              type="button"
              data-testeid="customer_order_details__button-delivery-check"
            >
              MARCAR COMO ENTREGUE
            </button>
          ) : (
            <div>
              <button type="button">PREPARAR PEDIDO</button>
              <button type="button">SAIU PRA ENTREGA</button>
            </div>
          )}
          <CheckoutTable />
        </div>
      </div>
    </div>
  );
}
