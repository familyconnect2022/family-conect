// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyC8CSUE5ZqnP2UqWZp10tQTjJuRbXxPdHE',
    authDomain: 'family-connect-forever-92dc4.firebaseapp.com',
    projectId: 'family-connect-forever-92dc4',
    storageBucket: 'family-connect-forever-92dc4.appspot.com',
    messagingSenderId: '434573886487',
    appId: '1:434573886487:web:53055aa3d34d53af9e8852',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
