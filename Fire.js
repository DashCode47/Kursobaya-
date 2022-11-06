import firebase from "firebase/app";
import "firebase/auth";

class Fire {
  constructor() {
    this.init();
    this.checkAuth();
  }

  init = () => {
    if (!firebase.app.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDBs-nZQdA1FJPH0Enaz1IDoo1xaNC1cAc",
        authDomain: "chatapp-3ad95.firebaseapp.com",
        projectId: "chatapp-3ad95",
        storageBucket: "chatapp-3ad95.appspot.com",
        messagingSenderId: "717965597757",
        appId: "1:717965597757:web:23536179a9b89704c29e54",
      });
    }
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnnonymously();
      }
    });
  };

  send = (messages) => {
    messages.forEach((item) => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValuer.TIMESTAMP,
        user: item.user,
      };
      this.db.push(message);
    });
  };

  parse = (message) => {
    const { user, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
      user,
    };
  };
  get = (callback) => {
    this.db.on("child_added", (snapshot) => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database().ref("messages");
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

export default new Fire();
