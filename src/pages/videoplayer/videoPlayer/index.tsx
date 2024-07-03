import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

// Define the types for subtitle objects
type Subtitle = {
  Id: string;
  RecognitionStatus: string;
  DisplayText: string;
  Offset: number;
  Duration: number;
  Channel: number;
};

interface VideoPlayerProps {
  videoUrl: string;
  subtitles: Subtitle[];
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, subtitles }) => {
  const playerRef = useRef<ReactPlayer>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSubtitle, setCurrentSubtitle] = useState('');

  const handleProgress = (state: { playedSeconds: number }) => {
    setCurrentTime(state.playedSeconds * 10000000); // Convert to milliseconds
  };

  useEffect(() => {
    const subtitle = subtitles.find(
      (sub) =>
        currentTime >= sub.Offset && currentTime <= sub.Offset + sub.Duration
    );
    if (subtitle) {
      setCurrentSubtitle(subtitle.DisplayText);
    } else {
      setCurrentSubtitle('');
    }
  }, [currentTime, subtitles]);

  return (
    <div className="react-player">
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        controls
        onProgress={handleProgress}
      />
      <div
        style={{
          marginTop: '10px',
          fontSize: '16px',
          color: '#fff',
          backgroundColor: '#000',
          padding: '5px',
        }}
      >
        {currentSubtitle ? currentSubtitle : '---'}
      </div>
    </div>
  );
};

export default VideoPlayer;
