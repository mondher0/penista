import { colorLogo } from "../../assets/index";

const ValideCodePage = () => {
  return (
    <div className="login">
      <div className="login-card">
        <img src={colorLogo} alt="logo" />
        <p className="titre">Panel Admin</p>
        <h2>Connectez-vous à votre panel admin</h2>
        <form>
          <div className="form-control">
            <label htmlFor="email">Adresse email</label>
            <input type="email" id="email" placeholder="Adresse email" />
          </div>
          <div className="form-control">
            <div className="labels">
              <label htmlFor="password">Mot de passe</label>
              <label htmlFor="password">Mot de passe oublié?</label>
            </div>
            <input type="password" id="password" placeholder="Mot de passe" />
          </div>
          <button className="login-btn" type="submit">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default ValideCodePage;
