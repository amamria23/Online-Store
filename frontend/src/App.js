import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from './pages/route';
import Home from './pages/home/home';
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/ProductDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="product-details/:id" element={<ProductDetails />} />
      <Route path="*" element={<NotFound />} />
      
    </Route>
  )
);



function App() {
  return (
    
    
    <RouterProvider router={router} />

  );
}

export default App;
