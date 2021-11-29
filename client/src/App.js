import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-4">
        <Container>

          <Routes>
            <Route path = "/" element = {<HomeScreen />} />
            <Route path = "/product/:id" element = {<ProductScreen />} />
            <Route path = "/cart" element = {<CartScreen />} />
            <Route path = "/cart/:id" element = {<CartScreen />} />
            <Route path = "/auth" element = {<LoginScreen />} />
            <Route path = "/profile" element = {<ProfileScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
