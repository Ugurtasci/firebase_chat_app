const RoomPage = ({ setRoom, setIsAuth }) => {
  // form gönderilince tetiklenecek
  const handdleSubmit = (e) => {
    e.preventDefault();
    // inputtaki değerini al
    const room = e.target[0].value;

    //kullanıcının seçtiği odayı state aktar
    setRoom(room.toLowerCase());
  };
  return (
    <form onSubmit={handdleSubmit} className="room-page">
      <h1>Chat Odası</h1>

      <p>Lütfen Sohbet Odasını Seçiniz</p>
      <input type="text" placeholder="ör:liseliler" required />
      <button type="submit">Odaya Gir</button>
      <button
        onClick={() => {
          // state false çekerek çıkış yap
          setIsAuth(false);
          // localdeki kaydı kaldır
          localStorage.removeItem("token");
        }}
        type="button"
      >
        Çıkış Yap
      </button>
    </form>
  );
};

export default RoomPage;
