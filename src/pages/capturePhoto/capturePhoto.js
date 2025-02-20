import React, { useRef, useEffect, useState } from "react";
import "./capturePhoto.css";

function App() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);

  useEffect(() => {
    console.log("Initializing video stream...");
    navigator.mediaDevices
      .getUserMedia({ video: { width: 600, height: 600 } })
      .then((stream) => {
        console.log("Video stream started");
        let video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.play().catch((error) => console.error("Video play failed:", error));
        } else {
          console.warn("videoRef.current is null!");
        }
      })
      .catch((err) => console.error("Error accessing camera:", err));
  }, []);

  const takePhoto = () => {
    console.log("Capture button clicked!");

    let video = videoRef.current;
    let photo = photoRef.current;

    console.log("Video element:", video);
    console.log("Canvas element:", photo);

    if (!video || !photo) {
      console.warn("Video or Photo canvas not found!");
      return;
    }

    let ctx = photo.getContext("2d");
    if (!ctx) {
      console.error("Canvas 2D context is null!");
      return;
    }

    console.log("Canvas context initialized!");

    photo.width = 300;
    photo.height = 300;

    ctx.drawImage(video, 0, 0, 300, 300);
    console.log("Photo captured successfully!");

    setHasPhoto(true);
  };

  const retakePhoto = () => {
    console.log("Retake button clicked!");
  
    let photo = photoRef.current;
    let video = videoRef.current;
  
    if (!photo || !video) {
      console.warn("Photo canvas or video not found!");
      return;
    }
  
    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);
    console.log("Photo cleared. Ready to retake.");
  
    // Show video again
    video.style.display = "block";  // Ensure video is visible
    video.play().catch((error) => console.error("Video play failed:", error));
  
    // Hide captured photo
    setHasPhoto(false);
  };
  
  

  return (
    <div className="app">
      <div className="camera-container">
        {/* Always Keep Video in the DOM */}
        <div className="camera-frame" style={{ display: hasPhoto ? "none" : "block" }}>
          <video ref={videoRef} className="video" autoPlay />
        </div>
  
        {/* Canvas for Captured Photo */}
        <canvas ref={photoRef} className="captured-photo" style={{ display: hasPhoto ? "block" : "none" }} />
  
        {/* Capture & Retake Buttons */}
        <div className="buttons">
          {!hasPhoto ? (
            <button className="capture-btn" onClick={takePhoto}>
              Capture
            </button>
          ) : (
            <>
              <button className="confirm-btn">Confirm</button>
              <button className="close-btn" onClick={retakePhoto}>
                Retake
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}  

export default App;
