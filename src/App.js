import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Menu from './Components/Pages/UserPages/Menu/Menu';
import HomeContent from './Components/HomeContent/HomeContent'
import Contact from './Components/Pages/UserPages/Contact/Contact';
import Terms from './Components/Pages/UserPages/Terms/Terms';
import ForgetPass from './Components/AdminComponents/ForgetPass/ForgetPass';
import Login from './Components/AdminComponents/Login/Login';
import AdminLayout from './Components/AdminLayout/AdminLayout';
import Dashboard from './Components/Pages/AdminPages/Dashboard/Dashboard';
import Feedback from './Components/Pages/AdminPages/Feedback/Feedback';
import Orders from './Components/Pages/AdminPages/Orders/Orders';
import SubManagement from './Components/Pages/AdminPages/SubManagement/SubManagement';
import Cart from './Components/Pages/UserPages/Cart/Cart';
import PlaceOrder from './Components/Pages/UserPages/PlaceOrder/PlaceOrder';
import DeliveryLayout from './Components/DeliveryLayout/DeliveryLayout';
import DeliveryLogin from './Components/DeliveryComponent/DeliveryLogin/DeliveryLogin';
import RefundPolicy from './Components/Pages/UserPages/RefundPolicy/RefundPolicy';
import Works from './Components/Pages/UserPages/Works/Works';
import FAQSection from './Components/Pages/UserPages/FAQSection/FAQSection';
import AboutSection from './Components/Pages/UserPages/AboutSection/AboutSection';
import DeliveryForgetPass from './Components/DeliveryComponent/DeliveryForgetPass/DeliveryForgetPass'
import DailyMenu from './Components/Pages/UserPages/Subscription/DailyMenu/DailyMenu';
import BasicPlan from './Components/Pages/UserPages/Subscription/BasicPlan/BasicPlan';
import StandardPlan from './Components/Pages/UserPages/Subscription/StandardPlan/StandardPlan';
import PremiumPlan from './Components/Pages/UserPages/Subscription/PremiumPlan/PremiumPlan';
import SubscriptionPlans from './Components/Pages/UserPages/Subscription/SubscriptionPlans/SubscriptionPlans';
import Breakfast from './Components/Pages/UserPages/Breakfast/Breakfast';
import Lunch from './Components/Pages/UserPages/Lunch/Lunch';
import Dinner from './Components/Pages/UserPages/Dinner/Dinner';
import AdminUsers from './Components/Pages/AdminPages/AdminUsers/AdminUsers';
import 'bootstrap/dist/css/bootstrap.min.css';
import TiffinService from './Components/Pages/AdminPages/Tiffin/TiffinService';
function App({ setShowLogin }) {

  return (
    <Routes>
      <Route path="/" element={<Layout setShowLogin={setShowLogin} />}>
        <Route index element={<HomeContent />} />
        <Route path="/menu" element={<Menu />} />
        <Route path='/contactus' element={<Contact />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/refundpolicy' element={<RefundPolicy />} />
        <Route path='/works' element={<Works />} />
        <Route path='/faqsection' element={<FAQSection />} />
        <Route path='/about' element={<AboutSection />} />
        <Route path='/dailymenu' element={<DailyMenu/>}/>
        <Route path='/weeklyplan' element={<BasicPlan/>}/>
        <Route path='/monthlyplan' element={<StandardPlan/>}/>
        <Route path='/quarterlyplan' element={<PremiumPlan/>}/>
        <Route path='/subscriptionplan' element={<SubscriptionPlans/>}/>
        <Route path='/breakfast' element={<Breakfast/>}/>
        <Route path='/lunch' element={<Lunch/>}/>
        <Route path='/dinner' element={<Dinner/>}/>
      </Route>
      <Route path='/admin/login' element={<Login />} />
      <Route path='/admin/forgetpass' element={<ForgetPass />} />
      <Route element={<AdminLayout />}>
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/feedback' element={<Feedback />} />
        <Route path='/admin/orders' element={<Orders />} />
        <Route path='/admin/user' element={<AdminUsers />} />
        <Route path='/admin/tiffin' element={<TiffinService />} />
        <Route path='/admin/submanagement' element={<SubManagement />} />
      </Route>
      <Route path='/delivery/login' element={<DeliveryLogin />} />
      <Route path='/delivery/forgetpass' element={<DeliveryForgetPass />} />
      <Route element={<DeliveryLayout />}>

      </Route>
    </Routes>
  );
}

export default App;
