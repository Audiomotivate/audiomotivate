import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/home";
import NotFound from "./pages/not-found";
import AllAudiobooks from "./pages/all-audiobooks";
import AllVideos from "./pages/all-videos";
import Checkout from "./pages/checkout";
import Header from "./components/header";
import Footer from "./components/footer";
import { useEffect, lazy, Suspense } from "react";
import LocationPopup from "./components/location-popup";
import CartDrawer from "./components/cart-drawer";
import { CartProvider } from "./providers/cart-provider";

const CartPage = lazy(() => import('./pages/cart-page'));
const AllScripts = lazy(() => import('./pages/all-scripts'));
const AllGuides = lazy(() => import('./pages/all-guides'));
const TermsOfService = lazy(() => import('./pages/terms-of-service'));
const PrivacyPolicy = lazy(() => import('./pages/privacy-policy'));
const RefundPolicy = lazy(() => import('./pages/refund-policy'));
const CookiePolicy = lazy(() => import('./pages/cookie-policy'));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/audiobooks" component={AllAudiobooks} />
      <Route path="/videos" component={AllVideos} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/cart">
        <Suspense fallback={<div>Cargando...</div>}>
          <CartPage />
        </Suspense>
      </Route>
      <Route path="/scripts">
        <Suspense fallback={<div>Cargando...</div>}>
          <AllScripts />
        </Suspense>
      </Route>
      <Route path="/guides">
        <Suspense fallback={<div>Cargando...</div>}>
          <AllGuides />
        </Suspense>
      </Route>
      <Route path="/terms">
        <Suspense fallback={<div>Cargando...</div>}>
          <TermsOfService />
        </Suspense>
      </Route>
      <Route path="/privacy">
        <Suspense fallback={<div>Cargando...</div>}>
          <PrivacyPolicy />
        </Suspense>
      </Route>
      <Route path="/refund">
        <Suspense fallback={<div>Cargando...</div>}>
          <RefundPolicy />
        </Suspense>
      </Route>
      <Route path="/cookies">
        <Suspense fallback={<div>Cargando...</div>}>
          <CookiePolicy />
        </Suspense>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <Router />
          <Footer />
          <LocationPopup />
          <CartDrawer />
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
