import React from 'react'
import './../App.css';

import { VideoItem } from './VideoItem'

const VideoList = ({videoList}: any) => {
    return (
        <div className="videoList">
            <h2>
                Lista de Videos
            </h2>
            {videoList.map((item: any, index: number) => {
                if(index !== 0) {
                    return <VideoItem videoItem={item} index={index}/>
                }
                return null
            })}
        </div>
    )
}
  
export { VideoList }