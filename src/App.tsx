import Nav from "@components/Nav/Nav";
import Home from "@components/Home/Home";
import About from "@components/About/About";
import Skills from "@components/Skills/Skills";
import Impact from "@components/Impact/Impact";
import Experience from "@components/Experience/Experience";
import Education from "@components/Education/Education";
import Connect from "@components/Connect/Connect";
import { useTheme } from "@/theme/useTheme";
import Awards from "@components/Awards/Awards";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
      <div className="app-container">
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Nav theme={theme} onToggleTheme={toggleTheme} />
        <main id="main-content" tabIndex={-1}>
            <Home />
            <About />
            <Skills />
            <Experience />
            <Impact />
            <Awards />
            <Education />
            <Connect />
        </main>
      </div>
  );
}

export default App;