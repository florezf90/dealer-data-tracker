import MainNavbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import TitleAndParagraph from "../components/title/titleAndParagraph";
import { Image, Container } from "react-bootstrap";
import mision from "../assets/20943958.jpg";
import projectcode from "../assets/projectsrc.png";
import team from "../assets/team.png";
import github from "../assets/github.png";
import mail from "../assets/mail.png";
import linkedin from "../assets/linkedin.png";
import TwoColumnHero from "../components/feature-cards/featurecards";
import TeamPresentation from "../components/team-presentation/teamcards";

const AboutUs = () => {
  const projectinfo =
    "If you would like to know more about the technical details of the project, please click the icon.";
  const aboutustitle = "Main Mission";
  const paragraphintro = "Creating tools that solve real world problems!";
  const numRows = 1;
  const rowContents = [
    {
      title: "Our Story",
      paragraph: `Using the MERN stack and all of the coding knowlede we have gained thus far,
      we wanted to creat a functional and realistic auditing application that would be useful to any employer.`,
      imgSrc: team,
    },
  ];

  const cardData = [
    {
      imgSrc: "https://avatars.githubusercontent.com/u/102418605?v=4",
      title: "florezf90",
      items: ["Developer", "Designer", "Photographer"],
      icons: [
        {
          src: github,
          type: "socialmedia",
          url: "https://github.com/florezf90",
        },
        { src: mail, type: "mail", url: "florezf90@gmail.com" },
        {
          src: linkedin,
          type: "socialmedia",
          url: "https://www.linkedin.com/in/luis-felipe-florez-98403123a/",
        },
      ],
    },
    {
      imgSrc: "https://avatars.githubusercontent.com/u/102418605?v=4",
      title: "N-lara",
      items: ["Developer", "Designer", "Photographer"],
      icons: [
        { src: github, type: "socialmedia", url: "https://github.com/N-lara" },
        { src: mail, type: "mail", url: "n_lara01@yahoo.com" },
        {
          src: linkedin,
          type: "socialmedia",
          url: "https://www.linkedin.com/in/noah-lara-2868692a9/",
        },
      ],
    },
    {
      imgSrc: "https://avatars.githubusercontent.com/u/102418605?v=4",
      title: "Jbradu2",
      items: ["Developer", "Designer", "Photographer"],
      icons: [
        { src: github, type: "socialmedia", url: "https://github.com/Jbradu2" },
        { src: mail, type: "mail", url: "Joshua.Ry.Bradshaw@gmail.com" },
        { src: linkedin, type: "socialmedia", url: "https://www.linkedin.com/in/joshua-r-bradshaw" },
      ],
    },
  ];

  return (
    <main>
      <MainNavbar />
      <TitleAndParagraph title={aboutustitle} paragraph={paragraphintro} />
      <Container className="d-flex align-items-center justify-content-center">
        <Image
          src={mision}
          alt="mision"
          fluid
          style={{ maxWidth: "600px", marginBottom: "210px" }}
        />
      </Container>
      <TwoColumnHero numRows={numRows} rowContents={rowContents} />
      <TeamPresentation cardData={cardData} />
      <TitleAndParagraph title="Project Code" paragraph={projectinfo} />
      <Container className="d-flex align-items-center justify-content-center">
        <a href="https://github.com/florezf90/dealer-data-tracker">
          <Image
            src={projectcode}
            alt="reference"
            fluid
            style={{ maxWidth: "600px", marginBottom: "210px" }}
          />
        </a>
      </Container>
      <Footer />
    </main>
  );
};

export default AboutUs;
