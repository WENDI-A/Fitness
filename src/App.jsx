import Header from "./pages/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials";
import Services from "./pages/Services";
import Footer from "./pages/Footer";




function App() {
  return (
    <div className="scroll-smooth">
      <Header />
      <section id="home"><Home /></section>
      <section id="about"><About /></section> 
      <section id="services"><Services /></section>
      <section id=" testimonials"><Testimonials /></section> 
      <section id="contact"><Contact /></section>
       <section id="footer"><Footer /></section>
    </div>
  );
}

export default App;
