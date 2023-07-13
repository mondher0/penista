import { colorLogo } from "../../assets/index";
import useAuthContext from "../../hooks/useAuthContext";

const NewPasswordPage = () => {
  const {
    setPassword,
    setNewPassword,
    handleChangePassword,
    isLoading,
    error,
  } = useAuthContext();
  return (
    <div className="login">
      <div className="login-card">
        <img src={colorLogo} alt="logo" />
        <p className="titre">Panel Admin</p>
        <h2>Changez votre mot de passe</h2>
        <form onSubmit={handleChangePassword}>
          <div className="form-control">
            <label htmlFor="password">Nouveau mot de passe</label>
            <input
              type="password"
              id="email"
              placeholder="Nouveau mot de passe"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Réécrire le mot de passe</label>
            <input
              type="password"
              id="password"
              placeholder="Réécrire le mot de passe"
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </div>
          {error && (
            <p
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              {error}
            </p>
          )}
          <button className="login-btn" type="submit">
            {isLoading ? "Chargement..." : "Changer le mot de passe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPasswordPage;
