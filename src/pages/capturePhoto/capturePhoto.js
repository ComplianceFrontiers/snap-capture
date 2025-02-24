import React, { useRef, useEffect, useState } from "react";
import "./capturePhoto.css";
import ThankYouMessage from "../ThankYouMessage/ThankYouMessage";

function App({ user }) {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  // ✅ Ensure useEffect is always called at the top level
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

  // ✅ Added useEffect to reload the page after 1 second when showThankYou is true
  useEffect(() => {
    if (showThankYou) {
      const timer = setTimeout(() => {
        window.location.reload(); // Refresh the page after 1 second
      }, 1000);
  
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [showThankYou]); // Runs only when showThankYou changes

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
      formData.append("profile_pic", blob, "profile.jpg");

      try {
        let response = await fetch("https://snap-capture-backend.vercel.app/upload_profile_pic", {
          method: "POST",
          body: formData,
        });

        let result = await response.json();
        if (response.status === 200) {
          setShowThankYou(true); // ✅ Show ThankYouMsg after success
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

  // ✅ Ensure the ThankYouMessage is displayed correctly
  if (showThankYou) {
    return <ThankYouMessage />;
  }

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
              <button className="close-btn" onClick={retakePhoto}>Retake</button>

              <button className="confirm-btn" onClick={confirmPhoto} disabled={isUploading}>
                {isUploading ? "Uploading..." : "Confirm"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
