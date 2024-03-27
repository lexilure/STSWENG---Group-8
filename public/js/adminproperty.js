document.getElementById("imageUpload").addEventListener("change", function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        var img = document.getElementById("previewImage");
        img.src = e.target.result;
        img.style.display = "block";
    };

    reader.readAsDataURL(file);
});