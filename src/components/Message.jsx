import { auth } from "../firebase/config";

const Message = ({ data }) => {
  // oturumu açık olan kullanıcının id'si mesajı atan id'sine eşit ise > sadece mesaj içerriğini bas
  if (auth.currentUser?.uid === data.author.id) {
    return <p className="msg-user">{data.text}</p>;
  }

  // eşiit değilse > kullanıcı bilgis + mesaj içeriğini bas
  return (
    <div className="msg-other">
      <div className="user-info">
        <img src={data.author.photo} />
        <span>{data.author.name}</span>
      </div>

      <p className="msg-text">{data.text}</p>
    </div>
  );
};

export default Message;
