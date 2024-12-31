import React, { useEffect, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VoiceChatScreen = ({ route, navigation }) => {
    const { channelId } = route.params;
    const localStreamRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const wsRef = useRef(null);

    useEffect(() => {
        const initWebSocket = async () => {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                navigation.navigate('Login');
                return;
            }

            wsRef.current = new WebSocket(`ws://localhost:5005/voice-signal?token=${token}`);

            wsRef.current.onmessage = async (event) => {
                const message = JSON.parse(event.data);
                if (message.type === 'offer') {
                    await handleOffer(message.offer);
                } else if (message.type === 'answer') {
                    await handleAnswer(message.answer);
                } else if (message.type === 'candidate') {
                    await handleCandidate(message.candidate);
                }
            };
        };

        initWebSocket();
    }, []);

    useEffect(() => {
        const initWebRTC = async () => {
            // Obtener el stream local
            localStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Configurar la conexión peer
            peerConnectionRef.current = new RTCPeerConnection();

            // Añadir el stream local a la conexión peer
            localStreamRef.current.getTracks().forEach((track) => {
                peerConnectionRef.current.addTrack(track, localStreamRef.current);
            });

            // Manejar candidatos ICE
            peerConnectionRef.current.onicecandidate = (event) => {
                if (event.candidate) {
                    wsRef.current.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
                }
            };

            // Manejar el stream remoto
            peerConnectionRef.current.ontrack = (event) => {
                // Aquí puedes manejar el stream remoto (por ejemplo, reproducirlo)
            };
        };

        initWebRTC();

        return () => {
            if (peerConnectionRef.current) {
                peerConnectionRef.current.close();
            }
            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, [channelId]);

    const handleOffer = async (offer) => {
        await peerConnectionRef.current.setRemoteDescription(offer);
        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);
        wsRef.current.send(JSON.stringify({ type: 'answer', answer }));
    };

    const handleAnswer = async (answer) => {
        await peerConnectionRef.current.setRemoteDescription(answer);
    };

    const handleCandidate = async (candidate) => {
        await peerConnectionRef.current.addIceCandidate(candidate);
    };

    const startCall = async () => {
        // Crear una oferta
        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);

        // Enviar la oferta al otro peer
        wsRef.current.send(JSON.stringify({ type: 'offer', offer }));
    };

    return (
        <View>
            <Text>Canal de Voz: {channelId}</Text>
            <Button title="Iniciar Llamada" onPress={startCall} />
        </View>
    );
};

export default VoiceChatScreen; 