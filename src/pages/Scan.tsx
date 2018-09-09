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
`
class GroupsList extends React.Component {
    public componentDidMount() {
        var constraints = {
            audio: false,
            video: {
                width: 900,
                height: 900
            }
        };
        var canvas = document.querySelector('canvas') || new HTMLCanvasElement;
        var video = document.querySelector('video') || new HTMLVideoElement;

        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            //var videoTracks = stream.getVideoTracks();
            video.srcObject = stream;
        })
            .catch(function (err) { console.log(err.name + ": " + err.message); });

        (document.querySelector('#capture') || new HTMLVideoElement).addEventListener('click', function (event) {
            if (video) {
                canvas.width = video.clientWidth;
                canvas.height = video.clientHeight;
                var context = canvas.getContext('2d') || new CanvasRenderingContext2D();
                context.drawImage(video, 0, 0);
            }
        });
    }

    public render() {
        return (
            <Background>
                <video autoPlay></video><br />
                <canvas></canvas> <br />
                <button id="capture">Capture</button>
            </Background>
        );
    }
}

export default GroupsList;