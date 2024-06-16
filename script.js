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

        console.log(printImage);
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