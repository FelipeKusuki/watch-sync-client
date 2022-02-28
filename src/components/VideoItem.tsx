import React from 'react'
import './../App.css';

import { Button, Text } from '@nextui-org/react';
import { Delete, Play } from 'react-iconly';



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
        <div className="videoItem" onClick={handlePlayVideo}>
            <div className="videoItemBackground" style={{ 
                backgroundImage: `url(${videoImageUrl})` 
            }}>
                <div className="videoItemButton">
                    <Button
                        auto
                        size="xs"
                        color="error"
                        icon={<Delete filled />}
                        onClick={handleRemoveVideo}
                    >
                    </Button>
                </div>
            </div>
            <div className="videoItemDescription">
                <Text size="100%" color="success">
                    Daniel do Titulo
                </Text>
                <Text size={12}>
                    Daniel da Descrição
                </Text>
            </div>
        </div>
    )
}
  
export { VideoItem }