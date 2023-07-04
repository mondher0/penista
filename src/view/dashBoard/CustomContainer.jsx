import "./CustomContainer.css";
import { tShirt } from "../../assets/index";

const CustomContainer = () => {
  return (
    <div className="custom-container">
      <img src={tShirt} />
      <div className="desc">
        <p className="name">T-Shirt</p>
        <p className="cmd">4098 Commandes</p>
      </div>
    </div>
  );
};

export default CustomContainer;
