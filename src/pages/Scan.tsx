import * as React from "react";
import styled from "styled-components";
import Colors from '../Colors';
import ArrowBack from '@material-ui/icons/ArrowBack';
import {Link} from 'react-router-dom';
import 'firebase/firestore';
import apiKey from '../private/cloudVisionKey.js';
import fetch from 'node-fetch';
//import { Script } from "vm";

const Background = styled.div`
  background-color: ${Colors.DarkBackground};
  height: 100%;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
`
const Video = styled.video`
    border-radius: 10px;
    display: ${({videoVisible}: {videoVisible: boolean}) => videoVisible ? 'block' : 'none'}
`

const Canvas = styled.canvas`
    border-radius: 10px;
    display: ${({canvasVisible}: {canvasVisible: boolean}) => canvasVisible ? 'black' : 'none'}
`

const CaptureBtn = styled.button`
    width: 50px;
    height: 50px;
    padding: 5px;
    background-color: ${Colors.LightGreen};
    border: ${Colors.LightRed} 3px solid;
    border-radius: 50%;
`
const BackLink = styled(Link)`
    align-self: flex-start;
    margin: 10px;
`;

class GroupsList extends React.Component {
    state = {
        pictureTaken: false
    }

    public componentDidMount() {
        var constraints = {
            audio: false,
            video: {
                width: window.innerHeight * 0.45,
                height: window.innerHeight * 0.8
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

        (document.querySelector('#capture') || new HTMLVideoElement).addEventListener('click', (event) => {
            if (video && !this.state.pictureTaken) {
                canvas.width = video.clientWidth;
                canvas.height = video.clientHeight;
                var context = canvas.getContext('2d') || new CanvasRenderingContext2D();
                context.drawImage(video, 0, 0);
                var dt = canvas.toDataURL('image/jpeg');
                this.setState({pictureTaken: true});
                fetch('https://vision.googleapis.com/v1/images:annotate?key=' + apiKey, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        "requests": [
                            {
                                "image": {
                                    "content": dt.replace("data:image/jpeg;base64,", "")
                                },
                                "features": {
                                    "type":"TEXT_DETECTION"
                                }
                            }
                        ]
                    })
                })
                .then(res => res.json())
                .then(json => console.log(json))
                .catch(e => console.log(e));
            }
        });
    }

    public render() {
        return (
            <Background>
                <BackLink to="/GroupsList"><ArrowBack style={{ fill: 'white', height: "50px", width: "50px" }}/></BackLink>
                <Video autoPlay className="video" videoVisible={!this.state.pictureTaken}/>
                <Canvas canvasVisible={this.state.pictureTaken}/><br />
                <CaptureBtn id="capture" />
            </Background>
        );
    }
}

export default GroupsList;