import MainNavbar from "../../components/navbar/navbar";
import TitleAndParagraph from "../../components/title/titleAndParagraph";
import Footer from "../../components/footer/footer";
import ContactForm from "../../components/contactForm/contactForm";
import { Container } from "react-bootstrap";
import "./index.css";
 


const ContactUs = () => {
    return (
        <main>
        <MainNavbar/>
        <Container className="contactinfo">
        <TitleAndParagraph title="Contact Us" paragraph="Get in touch with us to learn more about our services and how we can help you." />
        </Container>
        <Container className="formContainer">
        <ContactForm/>
        </Container>
         <Footer/>
        </main> 
    )
}

export default ContactUs