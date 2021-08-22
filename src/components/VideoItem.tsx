import React from 'react'
import './../App.css';

import Button from "@material-ui/core/Button";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';



export default function VideoItem({videoItem, index}: any) {

    const handleRemoveVideo = () => {
        console.log('REMOVE', videoItem, index)
    };

    const handlePlayVideo = () => {
        console.log('PLAY', videoItem, index)
    };

    const regex = /(?<=watch\?v=)(.*$)/gm;
    let videoId: any
    let videoIdAux = regex.exec(videoItem);

    if(videoIdAux && videoIdAux.length > 1) {
        videoId = videoIdAux[0]
    } else {
        videoId = videoIdAux
    }
    const videoImageUrl = "https://img.youtube.com/vi/" + videoId + "/default.jpg"

    return (
        <div className="videoItem" style={{ 
            backgroundImage: `url(${videoImageUrl})` 
          }}>
            <div className="videoItemButton">
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={handleRemoveVideo}>
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<PlayCircleOutlineIcon/>}
                    onClick={handlePlayVideo}>
                </Button>
            </div>
        </div>
    )
}
  
export { VideoItem }