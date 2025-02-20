import React, { useRef, useEffect, useState } from "react";
import "./capturePhoto.css";
import ThankYouMessage from "../ThankYouMessage/ThankYouMessage";

function App({ user }) {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 600, height: 600 } })
      .then((stream) => {
        let video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.play().catch((error) => console.error("Video play failed:", error));
        }
      })
      .catch((err) => console.error("Error accessing camera:", err));
  }, []);

  const takePhoto = () => {
    let video = videoRef.current;
    let photo = photoRef.current;

    if (!video || !photo) return;

    let ctx = photo.getContext("2d");
    if (!ctx) return;

    photo.width = 300;
    photo.height = 300;

    ctx.drawImage(video, 0, 0, 300, 300);
    setHasPhoto(true);
  };
  if (showThankYou) {
    return <ThankYouMessage />; // ✅ Show ThankYouMsg instead of camera UI
  }
  
  const retakePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
  };

  const confirmPhoto = async () => {
    if (!user?.user_id) {
      alert("User ID is missing!");
      return;
    }

    setIsUploading(true);
    
    let photo = photoRef.current;
    if (!photo) {
      alert("No photo found!");
      setIsUploading(false);
      return;
    }

    // Convert canvas to Blob
    photo.toBlob(async (blob) => {
      if (!blob) {
        alert("Failed to capture photo.");
        setIsUploading(false);
        return;
      }

      let formData = new FormData();
      formData.append("user_id", user.user_id);
      formData.append("last_signin", new Date().toISOString()); // Example timestamp
      formData.append("sign In", true);
      formData.append("profile_pic", blob, "profile.jpg");

      try {
        let response = await fetch("https://snap-capture-backend.vercel.app/upload_profile_pic", {
          method: "POST",
          body: formData,
        });

        let result = await response.json();
        if (response.status === 200) {
          setShowThankYou(true); // ✅ Show ThankYouMsg after success
         
          alert("Profile picture uploaded successfully!");
        } else {
          alert(result.error || "Failed to upload profile picture.");
        }
      } catch (error) {
        console.error("Upload failed:", error);
        alert("Error uploading profile picture.");
      }

      setIsUploading(false);
    }, "image/jpeg");
  };

  return (
    <div className="app">
      <div className="camera-container">
        <div className="camera-frame" style={{ display: hasPhoto ? "none" : "block" }}>
          <video ref={videoRef} className="video" autoPlay />
        </div>

        <canvas ref={photoRef} className="captured-photo" style={{ display: hasPhoto ? "block" : "none" }} />

        <div className="buttons">
          {!hasPhoto ? (
            <button className="capture-btn" onClick={takePhoto}>Capture</button>
          ) : (
            <>
              <button className="confirm-btn" onClick={confirmPhoto} disabled={isUploading}>
                {isUploading ? "Uploading..." : "Confirm"}
              </button>
              <button className="close-btn" onClick={retakePhoto}>Retake</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
