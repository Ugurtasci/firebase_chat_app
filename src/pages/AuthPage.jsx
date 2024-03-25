import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";

const AuthPage = ({ setIsAuth }) => {
  //giriş butununa tıklanısa
  const handleClick = () => {
    signInWithPopup(auth, provider)
      // başarıyla giriş yapılırsa çalışır
      .then((data) => {
        console.log(data.user);

        // kullanıcının yetkisini true ile çek
        setIsAuth(true);

        // kullanıcı bilgilerini local'de sakla
        localStorage.setItem("token", data.user.refreshToken);
      });
  };
  return (
    <div className="container">
      <div className="auth">
        <h1>Chat Odası</h1>
        <p>Dvam Etmek İçin Giriş Yapın</p>
        <button onClick={handleClick}>
          <img src="/logo.png" />
          <span>Google İle Gir</span>
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
