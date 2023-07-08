import { colorLogo } from "../../assets/index";

const NewPasswordPage = () => {
  return (
    <div className="login">
      <div className="login-card">
        <img src={colorLogo} alt="logo" />
        <p className="titre">Panel Admin</p>
        <h2>Changez votre mot de passe</h2>
        <form>
          <div className="form-control">
            <label htmlFor="password">Nouveau mot de passe</label>
            <input type="password" id="email" placeholder="Nouveau mot de passe" />
          </div>
          <div className="form-control">
            <label htmlFor="password">Réécrire le mot de passe</label>
            <input type="password" id="password" placeholder="Réécrire le mot de passe" />
          </div>
          <button className="login-btn" type="submit">
            Changez le mot de passe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPasswordPage;
