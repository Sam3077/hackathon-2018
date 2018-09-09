import * as React from "react";
import styled from "styled-components";
import Colors from '../Colors';
import 'firebase/firestore';
//import { Script } from "vm";

const Background = styled.div`
  background-color: ${Colors.DarkBackground};
  height: 100%;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Video = styled.video`
    border-radius: 10px;
`

const Canvas = styled.canvas`
    height: 0px;
    width: 0px;
`

const CaptureBtn = styled.button`
    width: 50px;
    height: 50px;
    padding: 5px;
    background-color: ${Colors.LightGreen};
    border: ${Colors.LightRed} 3px solid;
    border-radius: 50%;
`
class GroupsList extends React.Component {
    public componentDidMount() {
        var constraints = {
            audio: false,
            video: {
                width: 540,
                height: 960
            }
        };
        var canvas = document.querySelector('canvas') || new HTMLCanvasElement;
        var video = document.querySelector('video') || new HTMLVideoElement;

        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            var videoTracks = stream.getVideoTracks();
            console.log('Got stream with constraints:', constraints);
            console.log('Using video device: ' + videoTracks[0].label);
            video.srcObject = stream;
        })
            .catch(function (err) { console.log(err.name + ":  " + err.message); });

        (document.querySelector('#capture') || new HTMLVideoElement).addEventListener('click', function (event) {
            if (video) {
                canvas.width = video.clientWidth;
                canvas.height = video.clientHeight;
                var context = canvas.getContext('2d') || new CanvasRenderingContext2D();
                context.drawImage(video, 0, 0);
                var dt = canvas.toDataURL('image/jpeg');
                console.log("DataURL:" + dt);
            }
        });
    }

    public render() {
        return (
            <Background>
                <Video autoPlay className="video" /><br />
                <Canvas /> <br />
                <CaptureBtn id="capture" />
            </Background>
        );
    }
}

export default GroupsList;