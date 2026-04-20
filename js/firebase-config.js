// ============================================================
//  FIREBASE CONFIGURATION
// ============================================================
var firebaseConfig = {
  apiKey:            "AIzaSyA3OUGXQ8c87d0CszeioHtYNmkhY_eO4yk",
  authDomain:        "ai-crowd-8dddd.firebaseapp.com",
  databaseURL:       "https://ai-crowd-8dddd-default-rtdb.firebaseio.com",
  projectId:         "ai-crowd-8dddd",
  storageBucket:     "ai-crowd-8dddd.firebasestorage.app",
  messagingSenderId: "870805996329",
  appId:             "1:870805996329:web:378e2379f9cf6714a66d38",
  measurementId:     "G-6DLRB2TT4L"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
