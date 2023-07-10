/* eslint-disable react/prop-types */
import "./CustomContainer.css";
import { tShirt } from "../../assets/index";
import { baseUrl } from "../../utils/constants";

const CustomContainer = ({ cmd, title, image }) => {
  return (
    <div className="custom-container">
      <img src={`${baseUrl}static${image}`} />
      <div className="desc">
        <p className="name">{title}</p>
        <p className="cmd">{cmd} Commandes</p>
      </div>
    </div>
  );
};

export default CustomContainer;
