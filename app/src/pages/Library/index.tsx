import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../store/Auth/AuthState';

const Library: React.FC = () => {
    const navigate = useNavigate();
    const { tokenConfig } = useContext(AuthContext);

    const [campaigns, setCampaigns] = useState([]);
    const [adventures, setAdventures] = useState([]);

    console.log(campaigns, adventures)

    useEffect(() => {
        async function getCampaigns() {
            try {
                const res = await fetch('/api/campaigns/?adventures=1', {
                    method: 'get',
                    ...tokenConfig,
                });
                const json = await res.json();
                setCampaigns(json.campaigns);
                setAdventures(json.adventures);
                // dispatch({ type: LOGIN_SUCCESS, payload: json });
            } catch (err) {
                // dispatch({ type: LOGIN_FAIL });
                console.log(err)
            }
        }
        getCampaigns();
    }, [setCampaigns,
        setAdventures])
    return (
        <div>
            <h1>Library</h1>

        </div>
    )
}

export default Library;