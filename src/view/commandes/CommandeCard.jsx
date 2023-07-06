import './CommandeCard.css'
const CommandeCard = () => {
  return (
    <div className="commande-card">
      <img src="https://picsum.photos/200/300" alt="commande" />
      <div className="commande-card-content">
        <p>T-Shirt</p>
        <p>30000DA</p>
        <div>
          <span>S:</span>
          <span>1</span>
        </div>
      </div>
    </div>
  );
};

export default CommandeCard;
