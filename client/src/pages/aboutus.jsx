/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import MainNavbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import TitleAndParagraph from '../components/title/titleAndParagraph';

const AboutUs = () => {
const aboutustitle = "Main mision";
const paragraphintro = "description of what we aim to by creating this app"

    return (
        <main>
            <MainNavbar />
            <TitleAndParagraph title={aboutustitle} paragraph={paragraphintro}/>
            <Footer />
        </main>
    )
}

export default AboutUs