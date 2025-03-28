document.getElementById("uploadBtn").addEventListener("click", () => {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("업로드할 HTML 파일을 선택하세요!");
        return;
    }

    const formData = new FormData();
    formData.append("htmlFile", file);

    fetch("/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("status").innerText = "업로드 완료!";
            document.getElementById("installBtn").disabled = false;
        } else {
            document.getElementById("status").innerText = "업로드 실패!";
        }
    })
    .catch(error => console.error("Error:", error));
});

document.getElementById("installBtn").addEventListener("click", () => {
    fetch("/install")
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.open("http://localhost:3000/uploads/" + data.filename, "_blank");
        }
    })
    .catch(error => console.error("Error:", error));
});
