import React, { useRef, useEffect, useState } from "react";
import "./capturePhoto.css";

function App() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 },
      })
      .then((stream) => {
        let video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.onloadedmetadata = () => {
            video.play().catch((error) => console.error("Video play failed:", error));
          };
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);
    let video = videoRef.current;
    let photo = photoRef.current;

    if (!video || !photo) return;

    photo.width = width;
    photo.height = height;
    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);

    // Hide video and show captured photo
    video.style.display = "none";
    setHasPhoto(true);
  };

  const retakePhoto = () => {
    let photo = photoRef.current;
    let video = videoRef.current;
    if (!photo || !video) return;

    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);

    // Show video again for retake
    video.style.display = "block";
    setHasPhoto(false);
  };

  useEffect(() => {
    getVideo();
  }, []);

  return (
    <div className="App">
      <div className="Camera">
        <video ref={videoRef} />
        {!hasPhoto && <button onClick={takePhoto}>SNAP!</button>}
      </div>
      <div className={"result " + (hasPhoto ? "hasPhoto" : "")}>
        <canvas ref={photoRef}></canvas>
        {hasPhoto && <button onClick={retakePhoto}>Retake</button>}
      </div>
    </div>
  );
}

export default App;
