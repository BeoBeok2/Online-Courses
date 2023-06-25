import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import host from '@/pages/api/host';
interface VideoUploadProps {
  lessonIndex: number;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ lessonIndex }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [cancelToken, setCancelToken] = useState<CancelTokenSource | null>(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      let formData = new FormData();
      formData.append('file', file);
      formData.append('folder', "video")

      if (cancelToken) {
        cancelToken.cancel('Upload canceled by user');
      }

      const newCancelToken = axios.CancelToken.source();
      setCancelToken(newCancelToken);
      setIsUploading(true);
      setUploadProgress(0);
      setShowCancelButton(true);
      let accessToken: string | null = null;
      if (typeof window !== 'undefined') {
        accessToken = localStorage.getItem('accessToken');
    }
      const config: AxiosRequestConfig = {
        method: 'POST',
        url: `${host}/file/asset`, // Example API endpoint
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / (progressEvent.total ?? 0)) * 100);
          setUploadProgress(progress);
        },
        cancelToken: newCancelToken.token,
      };

      try {
        const res: AxiosResponse = await axios(config);
        console.log(res);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Upload canceled');
        } else {
          console.log(err);
        }
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
        setShowCancelButton(false);
      }
    }
  };

  const handleCancelUpload = () => {
    if (cancelToken) {
      cancelToken.cancel('Upload canceled by user');
    }
  };

  const handleResetInput = () => {
    setFileInputKey(Date.now());
  };

  const handleFileInputClick = () => {
    // Resetting the value of the file input allows selecting the same file again
    const fileInput = document.getElementById(`lessonVideo${lessonIndex}`) as HTMLInputElement;
    fileInput.value = '';
  };

  return (
    <div>
      <label htmlFor={`lessonVideo${lessonIndex}`}>Upload video:</label>
      <input
        type="file"
        id={`lessonVideo${lessonIndex}`}
        name="lessonVideo[]"
        required
        key={fileInputKey}
        onClick={handleFileInputClick}
        onChange={handleVideoUpload}
        accept="video/*"
      />
      {isUploading && (
        <div>
          <progress value={uploadProgress} max={100} />
          {showCancelButton && <button onClick={handleCancelUpload}>Cancel</button>}
        </div>
      )}
      {!isUploading && showCancelButton && <button onClick={handleResetInput}>Upload Another Video</button>}
    </div>
  );
};

export default VideoUpload;
