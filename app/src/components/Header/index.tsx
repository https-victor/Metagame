import React from 'react';
import { useLocation } from 'react-router-dom';
const Header: React.FC = () => {
    const location = useLocation();
    if (location.pathname.split("/").filter(item => item)[0] === "interface") {
        return <></>;
    } else {
        return (
            <div>
                Metagame
            </div>
        )

    }
}

export default Header;