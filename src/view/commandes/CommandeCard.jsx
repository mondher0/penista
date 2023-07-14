/* eslint-disable react/prop-types */
import { baseUrl } from "../../utils/constants";
import "./CommandeCard.css";
const CommandeCard = ({ price, title, quantity, img }) => {
  const quantityArray = [];

  for (const key in quantity) {
    // eslint-disable-next-line no-prototype-builtins
    if (quantity.hasOwnProperty(key)) {
      quantityArray.push({ value: key, quantity: quantity[key] });
    }
  }
  return (
    <div className="commande-card">
      <img src={`${baseUrl}static${img}`} alt="commande" />
      <div className="commande-card-content">
        <p>{title}</p>
        <p>{price}DA</p>
        <div className="quan">
          {quantityArray.map((item) => (
            <>
              <div className="span">
                <span>{item.value}:</span>
                <span>{item.quantity}</span>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandeCard;
