// DATOS DE FIREBASE

const firebaseConfig = {
  apiKey: "AIzaSyDTHccv_f_5ojTRm9eluobhbIg3oliKi6w",
  authDomain: "pbc-form.firebaseapp.com",
  projectId: "pbc-form",
  storageBucket: "pbc-form.firebasestorage.app",
  messagingSenderId: "681545026484",
  appId: "1:681545026484:web:acb76363e1783d97f040e1",
  measurementId: "G-NFK9D3WZNF"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Auth 
const auth = firebase.auth();

