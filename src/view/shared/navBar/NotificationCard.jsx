import { avatar, isNotificated } from "../../../assets/index";

const NotificationCard = () => {
  return (
    <div className="notification-card">
      <div className="notification">
        <img src={isNotificated} alt="isNotificated" />
        <div className="single-not">
          <img src={avatar} alt="Avatar" />
          <div className="txt">
            <p className="not">
              Dennis Nedry a envoyé un reçu de demande d’abonnement
            </p>
            <p className="time">Hier à 09:42</p>
          </div>
        </div>
      </div>
      <div className="notification">
        <img src={isNotificated} alt="isNotificated" />
        <div className="single-not">
          <img src={avatar} alt="Avatar" />
          <div className="txt">
            <p className="not">
              Dennis Nedry a envoyé un reçu de demande d’abonnement
            </p>
            <p className="time">Hier à 09:42</p>
          </div>
        </div>
      </div>
      <div className="notification">
        <img src={isNotificated} alt="isNotificated" />
        <div className="single-not">
          <img src={avatar} alt="Avatar" />
          <div className="txt">
            <p className="not">
              Dennis Nedry a envoyé un reçu de demande d’abonnement
            </p>
            <p className="time">Hier à 09:42</p>
          </div>
        </div>
      </div>
      <div className="notification">
        <img src={isNotificated} alt="isNotificated" />
        <div className="single-not">
          <img src={avatar} alt="Avatar" />
          <div className="txt">
            <p className="not">
              Dennis Nedry a envoyé un reçu de demande d’abonnement
            </p>
            <p className="time">Hier à 09:42</p>
          </div>
        </div>
      </div>
      <div className="notification">
        <img src={isNotificated} alt="isNotificated" />
        <div className="single-not">
          <img src={avatar} alt="Avatar" />
          <div className="txt">
            <p className="not">
              Dennis Nedry a envoyé un reçu de demande d’abonnement
            </p>
            <p className="time">Hier à 09:42</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
