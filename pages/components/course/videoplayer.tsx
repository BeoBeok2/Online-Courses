import React from 'react';
import ReactPlayer from 'react-player';
import Styles from '@/styles/coursesdetail.module.css';

interface VideoProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoProps> = ({ videoUrl }) => {
  return (
    <div >
      <ReactPlayer  id={Styles.video_modal} style={{ height: '400px', width: '700px' }} url={videoUrl} controls={true} />
    </div>
  );
};

export default VideoPlayer;