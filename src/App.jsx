import Header from "./Header";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact ";
import Testimonials from "./Testimonials";

function App() {
  return (
    <div className="scroll-smooth">
      <Header/>
      
      <section id="home"><Home /></section>
      <section id="about"><About /></section>
      <section id="service"><Contact /></section>
      <section id="testimonials"><Testimonials /></section>
    </div>
  );
}

export default App;
