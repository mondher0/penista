import "../utilisateurs/DemandeAbonnementTable.css";

const ExpectationsTable = () => {
  return (
    <>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID Expectation</th>
            <th>Date du match</th>
            <th>Nom adversaire</th>
            <th>Utilisateur</th>
            <th>Etat</th>
            <th>Real Madrid</th>
            <th>Adversaire</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>12-12-2022</td>
            <td>Liverpool</td>
            <td>
              <div className="user-details">
                <img src="https://picsum.photos/200" alt="user" />
                <div className="user-info">
                  <p>Utilisateur 1</p>
                  <span>mondher@gmail.com</span>
                </div>
              </div>
            </td>
            <td>Victoire</td>
            <td>2</td>
            <td>0</td>
          </tr>
          <tr>
            <td>1</td>
            <td>12-12-2022</td>
            <td>Liverpool</td>
            <td>
              <div className="user-details">
                <img src="https://picsum.photos/200" alt="user" />
                <div className="user-info">
                  <p>Utilisateur 1</p>
                  <span>mondher@gmail.com</span>
                </div>
              </div>
            </td>
            <td>Victoire</td>
            <td>2</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ExpectationsTable;
