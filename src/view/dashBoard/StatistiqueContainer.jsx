/* eslint-disable react/prop-types */
import './StatistiqueContainer.css'
const StatistiqueContainer = ({ title, number, img }) => {
  return (
    <div className="statistique-container">
      <div className="img-stat">
        <img src={img} alt={title} />
        <span className="title">{title}</span>
      </div>
      <span className="number">
        {number}
        {title === "Revenus" ? "DA" : null}
      </span>
    </div>
  );
};

export default StatistiqueContainer;
