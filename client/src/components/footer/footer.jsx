import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <Container>
        <p className="text-muted text-center">&copy; 
         <a href="https://github.com/florezf90/dealer-data-tracker" target="_blank" rel="noopener noreferrer">
            2024 Github | 
            </a>    
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
