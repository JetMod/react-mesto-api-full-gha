import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function HomePage ({ userEmail, ...props }) {
   return (
    <>
      <Header userEmail={userEmail} />
      <Main
        {...props}/>
      <Footer />
    </>
   )
}

export default HomePage;