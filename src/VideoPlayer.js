// src/components/VideoPlayer.js
import React from 'react';
import './VideoPlayer.css'; // Import the CSS file for styling

const VideoPlayer = () => {
  return (
    <div className="video-container">
      <video className="video-player" autoPlay loop muted>
        <source src="/assets/AIdetector.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
