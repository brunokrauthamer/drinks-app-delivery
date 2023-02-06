import PropTypes from 'prop-types';
import React from 'react';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { requestDelete } from '../services/requests';

export default function RegistrationTable({ users }) {
  const deleteUser = async (id) => {
    await requestDelete('/admin', { id });
  };

  return (
    <table className="table-checkout table-registration">
      <thead className="line-checkout">
        <tr className="line-title">
          <th className="line-checkout">Item</th>
          <th className="line-checkout">Nome</th>
          <th className="line-checkout">Email</th>
          <th className="line-checkout">Tipo</th>
          <th className="line-checkout">Excluir</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map(({ id, name, email, role }, index) => (

            <tr key={ id }>
              <td
                className="line-checkout"
                data-testid={
                  `admin_manage__element-user-table-item-number-${index}`
                }
              >
                { index + 1 }

              </td>
              <td
                className="line-checkout"
                data-testid={ `admin_manage__element-user-table-name-${index}` }
              >
                { name }

              </td>
              <td
                className="line-checkout"
              >

                <p
                  data-testid={
                    `admin_manage__element-user-table-email-${index}`
                  }
                >
                  {email}
                </p>

              </td>
              <td
                className="line-checkout"
                data-testid={
                  `admin_manage__element-user-table-role-${index}`
                }
              >
                {role}

              </td>
              <td className="line-checkout">
                <button
                  type="button"
                  data-testid={
                    `admin_manage__element-user-table-remove-${index}`
                  }
                  onClick={ () => deleteUser(id) }
                  className="btn-remove"
                >
                  Excluir
                  <MdOutlineDeleteForever className="icon-delete" />
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

RegistrationTable.propTypes = {
  users: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};
