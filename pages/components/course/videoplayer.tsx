import React from 'react';
import ReactPlayer from 'react-player';

interface VideoProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoProps> = ({ videoUrl }) => {
  return (
    <div>
      <ReactPlayer url={videoUrl} controls={true} />
    </div>
  );
};

export default VideoPlayer;