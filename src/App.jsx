import Header from "./pages/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact ";
import Testimonials from "./pages/Testimonials";

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
