import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { MantineProvider, Button, Container } from "@mantine/core";
import DiscordTextGenerator from "./DiscordTextGenerator";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <Container>
          <Button component={Link} to="/" mt="md">Home</Button>
          <Button component={Link} to="/discord" mt="md" ml="sm">Discord Text Generator</Button>
          <Routes>
            <Route path="/" element={<h1>Welcome to Home</h1>} />
            <Route path="/discord" element={<DiscordTextGenerator />} />
          </Routes>
        </Container>
      </Router>
    </MantineProvider>
  );
}

export default App;


