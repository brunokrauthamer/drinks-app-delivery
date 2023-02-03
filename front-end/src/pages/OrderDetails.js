import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Headers from '../components/Header';
import Context from '../context/Context';
import CheckoutTable from '../components/CheckoutTable';
import { requestGet, setToken, requestPut } from '../services/requests';
import '../css/detailsOrder.css';

export default function Orders() {
  const { getToLocal, formatDate } = useContext(Context);
  const [role, setRole] = useState('customer');
  const [sale, setSale] = useState({});
  const { id } = useParams();

  const getSaleById = async () => {
    const saleById = await requestGet(`/${role}/orders/${id}`);
    setSale(saleById);
  };

  const updateStatus = async ({ target: { name } }) => {
    try {
      let newStatus = 'Em Trânsito';
      if (name === 'preparing') {
        newStatus = 'Preparando';
      }
      if (name === 'delivered') {
        newStatus = 'Entregue';
      }
      await requestPut(`${role}/orders/${id}`, { status: newStatus });
      setSale(await requestGet(`/${role}/orders/${id}`));
    } catch (error) {
      console.log(error);
    }
  };
  const dataTestId = 'customer_order_details__element-order-details-label-seller-name';
  useEffect(() => {
    const localUser = getToLocal('user');
    setRole(localUser.role);
    setToken(localUser.token);
    getSaleById();
  }, []);

  return (
    <div className="container-checkout">
      <Headers />
      <div>
        <div className=" section-checkout section-details">
          <h1 className="title-checkout">Detalhe do Pedido</h1>
          <div className="container-data-delivery">
            <p
              className="title-data-delivery title-orderDetails"
              data-testid={
                `${role}_order_details__element-order-details-label-order-id`
              }
            >
              { `PEDIDO ${sale.id}` }
            </p>

            <p
              data-testid={ dataTestId }
              className="title-data-delivery"
            >
              { `P.Vend: ${sale.sellerName ? sale.sellerName : ''}` }
            </p>

            <p
              data-testid={
                `${role}_order_details__element-order-details-label-order-date`
              }
              className="title-data-delivery"
            >
              { `Data: ${formatDate(sale.saleDate)}` }
            </p>
            <p
              data-testid={
                `${role}_order_details__element-order-details-label-delivery-status`
              }
              className="title-data-delivery title-data-delivery-btn"
            >
              { sale.status }
            </p>
            { role === 'customer' ? (
              <button
                className="btn-order-details"
                type="button"
                data-testid="customer_order_details__button-delivery-check"
                disabled={ sale.status !== 'Em Trânsito' }
                name="delivered"
                onClick={ (event) => updateStatus(event) }
              >
                MARCAR COMO ENTREGUE
              </button>
            ) : (
              <div>
                <button
                  className="btn-order-details-preparing"
                  type="button"
                  data-testid="seller_order_details__button-preparing-check"
                  disabled={ sale.status !== 'Pendente' }
                  name="preparing"
                  onClick={ (event) => updateStatus(event) }
                >
                  PREPARAR PEDIDO

                </button>
                <button
                  className="btn-order-details-dispatch"
                  type="button"
                  data-testid="seller_order_details__button-dispatch-check"
                  name="dispatch"
                  disabled={ sale.status !== 'Preparando' }
                  onClick={ (event) => updateStatus(event) }
                >
                  SAIU PRA ENTREGA

                </button>
              </div>
            )}
          </div>
          <CheckoutTable />

        </div>
      </div>
    </div>
  );
}
