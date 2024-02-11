import MainNavbar from "../components/navbar/navbar";
import PresentationModel from "../components/presentation/presentationmodel";
import TitleAndParagraph from "../components/title/titleAndParagraph";
import TwoColumnHero from "../components/feature-cards/featurecards";
import Footer from "../components/footer/footer";
import img1 from "../assets/satistaction.png";
import img2 from "../assets/tracking_3273399.png";
import img3 from "../assets/revenue.png";
import img4 from "../assets/process.png";



const Home = () => {
const newtitle = "Get Started with Dealer Data Tracker";
const newparagraph = "Find out how to use Dealer Data Tracker";
const featuresTtle = "Features";
const featuresP = "Find out the advantages of using Dealer Data Tracker";
const rowContents = [
    {
      title: "Title 1",
      paragraph: "Paragraph 1",
      imgSrc: img1
    },
    {
      title: "Title 2",
      paragraph: "Paragraph 2",
      imgSrc: img2
    },
    {
      title: "Title 3",
      paragraph: "Paragraph 3",
      imgSrc: img3
    },
    {
      title: "Title 4",
      paragraph: "Paragraph 4",
      imgSrc: img4
    }
  ];
const numRows = 5;
  return (
    <main>
      <MainNavbar />
          <div className="hero my-5 p-5"  >
        <PresentationModel  title={newtitle} paragraph={newparagraph} />
    </div>
    <div className="hero-container mt-5 p-5" id = "features">
    <TitleAndParagraph title={featuresTtle} paragraph={featuresP}  />
    <TwoColumnHero numRows={numRows} rowContents={rowContents} />
    </div>
    <Footer />
    </main>
  );
};

export default Home;
