import MainNavbar from "../components/navbar/navbar";
import TitleAndParagraph from "../components/title/titleAndParagraph";
import Footer from "../components/footer/footer";
import ContactForm from "../components/contactForm/contactForm";
 


const ContactUs = () => {
    return (
        <main>
        <MainNavbar/>
        <TitleAndParagraph title="Contact Us" paragraph="Get in touch with us to learn more about our services and how we can help you." />
                <ContactForm/>
         <Footer/>
        </main> 
    )
}

export default ContactUs