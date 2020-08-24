import React, { useContext } from 'react';
import Switch from 'react-switch';
import { Container } from './styles';
import { ThemeContext } from 'styled-components';
import { shade } from 'polished';

interface Props {
    toggleTheme(): void;
}

const Footer: React.FC<Props> = ({ toggleTheme }) => {
    const { colors, title } = useContext(ThemeContext);
    return (
        <Container>
            Aboleth
        </Container>
    )
}

export default Footer;