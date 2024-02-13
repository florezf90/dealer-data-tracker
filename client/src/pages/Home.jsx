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
      title: "Accurate Records",
      paragraph: "Accurately track your dealers depending on what metrics you want to keep track of!",
      imgSrc: img1,
    },
    {
      title: "Progress and Inmprovement",
      paragraph: "Track dealer progress over time to see who's improving",
      imgSrc: img2,
    },
    {
      title: "Money!",
      paragraph: "Make the right adjustments for who you r top dealers are based on earnings!",
      imgSrc: img3,
    },
    {
      title: "Customize Metrics",
      paragraph: "Customize metrics for your pokerhouse based on your business needs. Fully customizable stats, and categories",
      imgSrc: img4,
    },
  ];
  const numRows = 5;
  return (
    <main>
      <MainNavbar />
      <div className="hero my-5 p-5">
        <PresentationModel title={newtitle} paragraph={newparagraph} />
      </div>
      <div className="hero-container mt-5 p-5" id="features">
        <TitleAndParagraph
          title={featuresTtle}
          paragraph={featuresP}
          paragraphpadding="150px"
        />
        <TwoColumnHero numRows={numRows} rowContents={rowContents} />
      </div>
      <Footer />
    </main>
  );
};

export default Home;
