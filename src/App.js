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
import { useSelector } from 'react-redux';
import AdminHeader from './admin/components/AdminHeader';
import AdminHome from './admin/screens/AdminHome';
import AllOrders from './admin/screens/AllOrders';
import AllUsers from './admin/screens/AllUsers';
import Login from './screens/Login';

function App() {
  const userInfo = useSelector(state => state.counter.userInfo);
  return (
    <>{userInfo && userInfo.email === process.env.REACT_APP_ADMIN_EMAIL ? (
      <Router>
        <div>
          <AdminHeader />
          <Routes>
            <Route exact path="/admin" element={<AdminHome />} />
            <Route exact path="/allorders" element={<AllOrders />} />
            <Route exact path="/allusers" element={<AllUsers />} />
          </Routes>
        </div>
      </Router>
    ) : (
      <Router>
        <div>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signup" element={<Login />} />
            <Route exact path="/searchresult" element={<SearchResult />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/wishlist" element={<WishList />} />
            <Route exact path="/productdetail" element={<ProductDetail />} />
            <Route exact path="/products" element={<Product />} />
            <Route exact path="/orders" element={<Orders />} />
            <Route exact path="/offers" element={<Offers />} />
            <Route exact path="/addresses" element={<UserAddresses />} />
            <Route exact path="/paymenttest" element={<PaymentTest />} />

          </Routes>
          <Footer />
        </div>

      </Router>
    )}
    </>
  );
}

export default App;
