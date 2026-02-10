const uploadArea = document.querySelector("#uploadArea");
const fileInput = document.querySelector("#fileInput");
const browseBtn = document.querySelector("#browseBtn");

const progressArea = document.querySelector("#progressArea");
const fileNameLabel = document.querySelector("#fileName");
const fileSizeLabel = document.querySelector("#fileSize");
const progressBar = document.querySelector("#progressBar");
const statusText = document.querySelector("#statusText");

const uploadedImageView = document.querySelector("#uploadedImageView");
const uploadedImagePreview = document.querySelector("#uploadedImagePreview");
const removeBtn = document.querySelector("#removeBtn");



browseBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", function () {
    let file = this.files[0];
    uploadFile(file);
});

uploadArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    uploadArea.classList.add("active");
    uploadArea.querySelector("h3").innerText = "Release to Upload";
});

uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("active");
    uploadArea.querySelector("h3").innerText = "Drag & Drop Files Here";
});

uploadArea.addEventListener("drop", (event) => {
    event.preventDefault();
    uploadArea.classList.remove("active");
    uploadArea.querySelector("h3").innerText = "Drag & Drop Files Here";
    let file = event.dataTransfer.files[0];
    uploadFile(file);
});


function uploadFile(file) {
    if (file) {
        let fileType = file.type;
        let validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

        if (validExtensions.includes(fileType)) {

            progressArea.style.display = "block";
            fileNameLabel.innerText = file.name;
            let size = file.size / 1024;
            fileSizeLabel.innerText = size > 1024 ? (size / 1024).toFixed(2) + ' MB' : size.toFixed(2) + ' KB';


            const reader = new FileReader();
            reader.onload = function (e) {
                const imageSrc = e.target.result;


                let progress = 0;
                progressBar.style.width = "0%";

                let interval = setInterval(() => {
                    progress += 10;
                    progressBar.style.width = progress + "%";
                    statusText.innerText = `Uploading... ${progress}%`;

                    if (progress >= 100) {
                        clearInterval(interval);


                        uploadArea.style.display = "none";
                        progressArea.style.display = "none";


                        uploadedImageView.style.display = "flex";
                        uploadedImagePreview.src = imageSrc;
                    }
                }, 100);
            }
            reader.readAsDataURL(file);

        } else {
            alert("This is not an Image File!");
        }
    }
}


removeBtn.addEventListener("click", () => {

    uploadedImagePreview.src = "";


    uploadedImageView.style.display = "none";


    progressBar.style.width = "0%";
    statusText.innerText = "Uploading...";


    uploadArea.style.display = "flex";


    fileInput.value = "";
});