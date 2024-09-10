
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import AdminLogin from "./screen/admin/AdminLogin";
import { DashBoard } from "./screen/admin/AdminDashBoard";
import Home from "./screen/userInterface/Home";
import Cart from "./component/userinterface/Cart";
import ProductPicture from "./component/userinterface/ProductPicture";
import ProductInformation from "./component/userinterface/ProductInformation";
import ProductPage from "./component/userinterface/ProductPage";
import SigninPage from "./screen/userInterface/SigninPage"

import DeliveryAddress from "./component/userinterface/DeliveryAddress";
import ShowCart from "./component/userinterface/ShowCart";
import AddAddress from "./component/userinterface/AddAddress"
import CheckOrder from "./component/userinterface/CheckOrders";
import FilterPage from "./screen/userInterface/FilterPage"
import EditAddress from "./component/userinterface/EditAddress";
import BuyProduct from "./screen/userInterface/BuyProduct";
import OrderSummary from "./component/userinterface/OrderSummary";
import PriceDetails from "./component/userinterface/PriceDetails";
import PlusMinusComponent from "./component/userinterface/PlusMinusComponent";
function App() {
  return (
    <div >
     <Router>
      <Routes>
       
        <Route element={<AdminLogin />} path={'/adminlogin'}></Route>
        <Route element={<DashBoard />} path={'/dashboard/*'}></Route>
        <Route element={< Home />} path={'/home'}></Route>
      
        <Route element={< Cart/>} path={'/cart'}></Route>
        <Route element={<ProductPicture/>} path={'/productpicture'}></Route>
        <Route element={<ProductInformation  />} path={'/productinformation'}></Route>
        <Route element={<ProductPage/>} path={'/productpage'}></Route>
        <Route element={<ShowCart/>} path={'/showcart'}></Route>


        

        <Route element={<SigninPage />} path={'/signin'}></Route>
        
        
        <Route element={<DeliveryAddress/>} path={'/delivery'}></Route>
        <Route element={<AddAddress />} path={'/address'}></Route>
     
        <Route element={< CheckOrder/>} path={'/order'}></Route>
        <Route element={< FilterPage/>} path={`/filterpage/${'*'}`}></Route>
        <Route element={< EditAddress/>} path={'/editaddress'}></Route>
        <Route element={< BuyProduct/>} path={'/buy'}></Route>
        <Route element={< PlusMinusComponent/>} path={'/plus'}></Route>

        {/* <Route element={< OrderSummary/>} path={'/summary'}></Route>
        <Route element={< PriceDetails/>} path={'/price'}></Route> */}






        
      </Routes>
     </Router>
    </div>
  );
}

export default App;
