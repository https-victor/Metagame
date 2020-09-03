import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';


const Interface: React.FC = () => {
    const { userId, pcId } = useParams();
    const [hp, setHp] = useState(100);

    useEffect(() => {
        const socket = io(process.env.REACT_APP_API_URL || 'localhost:3800'
        );
        socket.emit('getPcData', { userId, pcId }, (data: any) => {
            setHp(data.hp || 100);
        })
        socket.on('updateHP', (data: any) => {
            if (pcId == data.id) {
                setHp(data.hp);
            }
        })
    }, [])

    const navigate = useNavigate();
    return (
        <div>
            <p>Player: {userId}</p>
            <p>Playable Character: {pcId}</p>
            <p>HP: {hp}</p>
        </div>
    )
}

export default Interface;