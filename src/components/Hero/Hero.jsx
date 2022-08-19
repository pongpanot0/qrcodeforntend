import React from 'react'
import {Link} from 'react-router-dom';
import {Button,Container,MainHeading} from '../globarStyles'
import {HeroVideo,HeroSection,HeroText,ButtonWrapper,HeroButton} from './Herostyles'
import video from '../test.mp4'
function Hero() {
  return (
    <HeroSection>
        <HeroVideo src='https://images.unsplash.com/photo-1660674033326-9b857d88bf59?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80'/>
        <Container>
            <MainHeading>You data is Secure</MainHeading>
            <HeroText>
                we provide the best security
            </HeroText>
            <ButtonWrapper>
                <Link to="/users/login">
                    <Button>Login</Button>
                </Link>
                <HeroButton>FineMore</HeroButton>
            </ButtonWrapper>
        </Container>
    </HeroSection>
  )
}

export default Hero