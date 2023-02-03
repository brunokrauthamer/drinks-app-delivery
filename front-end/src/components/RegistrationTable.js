import PropTypes from 'prop-types';
import React from 'react';
import { requestDelete } from '../services/requests';

export default function RegistrationTable({ users }) {
  const deleteUser = async (id) => {
    await requestDelete('/admin', { id });
  };

  return (
    <table className="table-checkout">
      <thead className="line-checkout">
        <tr>
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
                >
                  Excluir
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
