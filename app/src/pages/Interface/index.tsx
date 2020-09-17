import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import './style.css'
import pc_3 from '../../assets/images/pcs/pc-3.png';
import pc_4 from '../../assets/images/pcs/pc-4.png';
import pc_5 from '../../assets/images/pcs/pc-5.png';
import pc_6 from '../../assets/images/pcs/pc-6.png';
import pc_7 from '../../assets/images/pcs/pc-7.png';
import HealthBar from "../../components/HealthBar/HealthBar";

const Interface: React.FC = () => {
    const { userId, pcId } = useParams();
    const [pc, setPc] = useState<any>({ hp: 100, maxHp: 100 });

    useEffect(() => {
        const socket = io(process.env.REACT_APP_API_URL || 'localhost:3800'
        );
        socket.emit('getPcData', { userId, pcId }, (data: any) => {
            setPc(data || {});
        })
        socket.on('updateHP', (data: any) => {
            if (pcId == data.id) {
                setPc(data);
            }
        })
    }, [])

    const percentage = (pc.hp * 100) / (pc.maxHp);
    let image = <img src={pc_3} alt="" />
    switch (pcId) {
        case '3':
            break;
        case '4':
            image = <img src={pc_4} alt="" />
            break;
        case '5':
            image = <img src={pc_5} alt="" />
            break;
        case '6':
            image = <img src={pc_6} alt="" />
            break;
        case '7':
            image = <img src={pc_7} alt="" />
            break;
        default: break;
    }

    const navigate = useNavigate();
    return (
        <div className="ui-wrapper">
            <div className="img-wrapper">
                {image}
            </div>
            <div className="hp-wrapper">
                <HealthBar percentage={percentage} width={400} height={40} />
            </div>
            {/* <p>HP: {pc.hp}</p>
            <p>MaxHp: {pc.maxHp}</p> */}
        </div>
    )
}

export default Interface;