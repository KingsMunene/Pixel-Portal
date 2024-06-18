


// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCcEntZ6KlsUHzPDJnlhNN82hb3-I5p7hs",
    authDomain: "pixelportal-7b117.firebaseapp.com",
    projectId: "pixelportal-7b117",
    storageBucket: "pixelportal-7b117.appspot.com",
    messagingSenderId: "331269724419",
    appId: "1:331269724419:web:721994cc2d21a8e7113136",
    measurementId: "G-57CYXQR9NJ"
};


const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');

if(bar){
    bar.addEventListener('click', (e)=>{
        nav.classList.add('active');
    })
}



const input = document.getElementById('image-upload');
input.addEventListener('change', (event) => {
    const files = event.target.files;
    const printImages = [];

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        const imageData = event.target.result;
        const imageSize = file.size; // in bytes
        const imageType = file.type; // e.g. "image/jpeg"

        const printImage = {
            name: file.name,
            printSize: 1, // default print size
            copies: 1, // default number of copies
            imageData: imageData,
            imageSize: imageSize,
            imageType: imageType
        };

        console.log(files.length);
    };
    reader.readAsDataURL(file);

    //   for (let i = 0; i < files.length; i++) {
    //     const file = files[i];
    //     const reader = new FileReader();
    //     reader.onload = (event) => {
    //       const imageData = event.target.result;
    //       const imageSize = file.size; // in bytes
    //       const imageType = file.type; // e.g. "image/jpeg"

    //       const printImage = {
    //         name: file.name,
    //         printSize: 1, // default print size
    //         copies: 1, // default number of copies
    //         imageData: imageData,
    //         imageSize: imageSize,
    //         imageType: imageType
    //       };

    //       printImages.push(printImage);
    //     };
    //     reader.readAsDataURL(file);
    //   }

    // Do something with the printImages array, e.g. display the images
});