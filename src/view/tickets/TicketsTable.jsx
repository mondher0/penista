import "../utilisateurs/DemandeAbonnementTable.css";

const TicketsTable = () => {
  return (
    <>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID Tiquet</th>
            <th>Date du match</th>
            <th>Heure du match</th>
            <th>Equipe adverse</th>
            <th>Utilisateur</th>
            <th>Numéro</th>
            <th>Prix</th>
            <th>Tiquet</th>
            <th>Date de résérvation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>12-12-2022</td>
            <td>11:00</td>
            <td>Leicester</td>
            <td>
              <div className="user-details">
                <img src="https://picsum.photos/200" alt="user" />
                <div className="user-info">
                  <p>Utilisateur 1</p>
                  <span>mondher@gmail.com</span>
                </div>
              </div>
            </td>
            <td>0558604705</td>
            <td>12200 DA</td>
            <td>2</td>
            <td>11-02-2023</td>
          </tr>
          <tr>
            <td>1</td>
            <td>12-12-2022</td>
            <td>11:00</td>
            <td>Leicester</td>
            <td>
              <div className="user-details">
                <img src="https://picsum.photos/200" alt="user" />
                <div className="user-info">
                  <p>Utilisateur 1</p>
                  <span>mondher@gmail.com</span>
                </div>
              </div>
            </td>
            <td>0558604705</td>
            <td>12200 DA</td>
            <td>2</td>
            <td>11-02-2023</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TicketsTable;
