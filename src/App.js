import { BrowserRouter as Router, Routes, Route, Switch, Link } from 'react-router-dom';
import Home from './screens/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductDetail from './screens/ProductDetail';
import Cart from './screens/Cart';
import Product from './components/Product';
import WishList from './screens/WishList';
import SignUp from './screens/SignUp';
import PaymentTest from './screens/PaymentTest';
import SearchResult from './screens/SearchResult';
import Orders from './screens/Orders';
import Offers from './screens/Offers';
import UserAddresses from './screens/UserAddresses';

function App() {
  
  return (
    <>
      <Router>
        <div>
          <Header />         
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/searchresult" element={<SearchResult />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/wishlist" element={<WishList />} />
            <Route exact path="/productdetail" element={<ProductDetail />} />
            <Route path="/products" element={<Product />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/addresses" element={<UserAddresses />} />
            <Route path="/paymenttest" element={<PaymentTest />} />
            
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
