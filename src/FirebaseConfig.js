import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore"
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
};

export const app = initializeApp(firebaseConfig);
//Init Service
const db = getFirestore();
export const colRef = collection(db, 'orders');
const userRef = collection(db, 'users');
const adrRef = collection(db, 'address');
export const sellerRef = collection(db, 'sellers');
// Define a function to fetch orders data asynchronously
export const fetchOrders = async () => {
  try {
    const snapshot = await getDocs(colRef);
    let orders = [];
    snapshot.docs.forEach((doc) => {
      orders.push({ ...doc.data(), id: doc.id });
    });
    return orders;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export const fetchUsers = async () => {
  try {
    const snapshot = await getDocs(userRef);
    let users = [];
    snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
    return users;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export const fetchAddresses = async () => {
  try {
    const snapshot = await getDocs(adrRef);
    let addresses = [];
    snapshot.docs.forEach((doc) => {
      addresses.push({ ...doc.data(), id: doc.id });
    });
    return addresses;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export const fetchSellers = async () => {
  try {
    const snapshot = await getDocs(sellerRef);
    let sellers = [];
    snapshot.docs.forEach((doc) => {
      sellers.push({ ...doc.data(), id: doc.id });
    });
    return sellers;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};
