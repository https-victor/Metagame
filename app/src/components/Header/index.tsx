import React, { useContext } from 'react';
import Switch from 'react-switch';
import { Container } from './styles';
import { ThemeContext } from 'styled-components';
import { shade } from 'polished';
import { GlobalContext } from '../../store/Global/GlobalState';

// interface Props {
//     toggleTheme(): void;
// }

// const Header: React.FC<Props> = ({ toggleTheme }) => {
const Header: React.FC = () => {
    const { colors, title } = useContext(ThemeContext);
    const { toggleTheme, theme } = useContext(GlobalContext);
    return (
        <Container>
            Metagame
            <Switch
                onChange={toggleTheme}
                checked={title === 'dark'}
                checkedIcon={false}
                uncheckedIcon={false}
                height={10}
                width={40}
                handleDiameter={20}
                offColor={shade(0.15, colors.primary)}
                onColor={colors.secondary}
            />
        </Container>
    )
}

export default Header;