"use client";
export const HTML5VideoPlayer = ({ url }) => {
    return (
      <div className="video-player">
        <video
          controls
          src={url}
          width="100%"
          className="video-player rounded-md"
        />
      </div>
    );
  };