import { useEffect } from "react";
import { auth, db } from "../firebase/config";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useState } from "react";
import Message from "../components/Message";

const ChatPage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState([]);
  // mesaj gönderme fonksiyonu
  const sendMessage = async (e) => {
    e.preventDefault();

    // koleksiyonun refaransını alma
    const messagesCol = collection(db, "messages");

    // kolleksiyona  yeni döküman eklle
    await addDoc(messagesCol, {
      text: e.target[0].value,
      room,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });

    // formu sıfırlama işlemi
    e.target.reset();
  };

  // mevcut odadan gönderilen mesajları anlık olarak alır
  useEffect(() => {
    // kolleksiyonun refaransını al
    const messagesCol = collection(db, "messages");

    // sorgu ayarları oluşurma
    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    // mesajlar kolleksiyonundaki verleri al
    //* anlık olaarak bir koleksiyondaki değişimleri izler(silme,ekleme)
    //* kolleksiyon her değiştiğinde verdiiğimiz fpnksiyon ile kolleksiyondaki bütün dökümanlara erişiriz.
    onSnapshot(q, (snapshot) => {
      // veileri geçici olarak tutulacağı boş bir dizi oluştur
      const tempMsg = [];
      // dökümanları dön ve verilere eriş
      snapshot.docs.forEach((doc) => {
        tempMsg.push(doc.data());
      });
      // mesajları state aktar
      setMessages(tempMsg);
    });
  }, []);

  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>

      <main>
        {messages.map((data, i) => (
          <Message data={data} key={i} />
        ))}
      </main>

      <form onSubmit={sendMessage}>
        <input type="text" required placeholder="Mesajınızı Yazınız" />
        <button>Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
