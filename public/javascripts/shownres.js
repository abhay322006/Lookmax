function resultpage(){
    window.location.href="/result"
}

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });

        const video = document.getElementById("camera");
        video.srcObject = stream;

    } catch (error) {
        alert("Camera access denied or not available");
        console.error(error);
    }
}

window.onload = startCamera;