import { useEffect, useRef } from "react";

const VoiceChat = () => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnection = useRef(null);
    const signalingSocket = useRef(null);

    useEffect(() => {
        // Configurar WebSocket para señalización
        signalingSocket.current = new WebSocket("ws://localhost:5005/voice-signal");

        signalingSocket.current.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "offer") {
                await handleOffer(message);
            } else if (message.type === "answer") {
                await handleAnswer(message);
            } else if (message.type === "candidate") {
                await handleCandidate(message);
            }
        };

        // Configurar WebRTC
        const config = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
        peerConnection.current = new RTCPeerConnection(config);

        // Manejar candidatos ICE
        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
                signalingSocket.current.send(JSON.stringify({
                    type: "candidate",
                    candidate: event.candidate,
                }));
            }
        };

        // Manejar stream remoto
        peerConnection.current.ontrack = (event) => {
            remoteVideoRef.current.srcObject = event.streams[0];
        };

        // Obtener stream local
        navigator.mediaDevices.getUserMedia({ video: false, audio: true })
            .then((stream) => {
                localVideoRef.current.srcObject = stream;
                stream.getTracks().forEach((track) => {
                    peerConnection.current.addTrack(track, stream);
                });
            });

        return () => {
            signalingSocket.current.close();
            peerConnection.current.close();
        };
    }, []);

    const handleOffer = async (offer) => {
        await peerConnection.current.setRemoteDescription(offer);
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        signalingSocket.current.send(JSON.stringify({
            type: "answer",
            answer: answer,
        }));
    };

    const handleAnswer = async (answer) => {
        await peerConnection.current.setRemoteDescription(answer);
    };

    const handleCandidate = async (candidate) => {
        await peerConnection.current.addIceCandidate(candidate);
    };

    const startCall = async () => {
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        signalingSocket.current.send(JSON.stringify({
            type: "offer",
            offer: offer,
        }));
    };

    return (
        <div>
            <video ref={localVideoRef} autoPlay muted />
            <video ref={remoteVideoRef} autoPlay />
            <button onClick={startCall}>Iniciar Llamada</button>
        </div>
    );
};

export default VoiceChat; 