import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbBeer } from 'react-icons/tb';
import Context from '../context/Context';
import Header from '../components/Header';
import { requestGet, setToken, requestPost } from '../services/requests';
import CheckoutTable from '../components/CheckoutTable';
import '../css/checkout.css';

export default function Checkout() {
  const navigate = useNavigate();

  const { getToLocal } = useContext(Context);
  const [data, setData] = useState({
    sellerId: '',
    deliveryAddress: '',
    deliveryNumber: '',
    totalPrice: '',
    products: [],
  });
  const [sellers, setSellers] = useState([]);

  const getSellers = async () => {
    try {
      const list = await requestGet('/seller');
      setSellers(list);
      setData({ ...data, sellerId: list[0]?.id });
      return list;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = ({ target: { value, name } }) => {
    if (name === 'deliveryNumber') {
      setData({ ...data, [name]: Number(value) });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  useEffect(() => {
    getSellers();
    const { token } = getToLocal('user');
    setToken(token);
  }, []);

  const sendDataToDB = async () => {
    try {
      const totalPrice = getToLocal('totalPrice');
      const products = getToLocal('cartDrinks')
        .map(({ id, quantity }) => ({ productId: id, quantity: Number(quantity) }));
      const { id } = await requestPost('/customer/orders', {
        ...data,
        totalPrice: Number(totalPrice.replace(',', '.')),
        products });
      navigate(`/customer/orders/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="container-checkout">
      <Header />
      <section className="container-section-checkout">
        <section className="section-checkout">
          <h1 className="title-checkout">Finalizar Pedido</h1>
          <CheckoutTable />
        </section>
      </section>
      <section className="container-section-checkout section-checkout">
        <h1 className="title-checkout">Detalhes e Endereço para Entrega</h1>
        <div className="delivery-container">

          <label htmlFor="sellerName" className="label-input-checkout">
            P. Vendedora Responsável:
            <select
              className="input-checkout select-checkout"
              data-testid="customer_checkout__select-seller"
              onChange={ handleChange }
              name="sellerId"
            >
              { sellers.map((seller) => (
                <option
                  key={ seller.id }
                  id={ seller.id }
                  value={ seller.id }
                >
                  { seller.name }
                </option>))}

            </select>
          </label>
          <label htmlFor="deliveryAddress" className="label-input-checkout">
            Endereço
            <input
              className="input-checkout"
              type="text"
              name="deliveryAddress"
              placeholder="Digite seu endereço"
              data-testid="customer_checkout__input-address"
              value={ data.deliveryAddress }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="deliveryNumber" className="label-input-checkout">
            Número
            <input
              className="input-checkout"
              type="number"
              name="deliveryNumber"
              data-testid="customer_checkout__input-address-number"
              value={ data.deliveryNumber }
              onChange={ handleChange }
            />
          </label>
          <button
            className="btn-finish"
            type="button"
            data-testid="customer_checkout__button-submit-order"
            onClick={ () => sendDataToDB() }
          >
            Finalizar pedido
            <TbBeer className="icon-checkout" />
          </button>
        </div>
      </section>
    </main>
  );
}
