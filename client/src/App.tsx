import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import AllAudiobooks from "@/pages/all-audiobooks";
import AllVideos from "@/pages/all-videos";
import Checkout from "@/pages/checkout";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useEffect } from "react";
import LocationPopup from "./components/location-popup";
import CartDrawer from "./components/cart-drawer";
import { CartProvider } from "./providers/cart-provider";

// Import pages
import CartPage from "@/pages/cart-page";
import AllScripts from "@/pages/all-scripts";
import AllGuides from "@/pages/all-guides";
import TermsOfService from "@/pages/terms-of-service";
import PrivacyPolicy from "@/pages/privacy-policy";
import RefundPolicy from "@/pages/refund-policy";
import CookiePolicy from "@/pages/cookie-policy";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/audiobooks" component={AllAudiobooks} />
      <Route path="/videos" component={AllVideos} />
      <Route path="/scripts" component={AllScripts} />
      <Route path="/guides" component={AllGuides} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/cart" component={CartPage} />
      <Route path="/terms" component={TermsOfService} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/refunds" component={RefundPolicy} />
      <Route path="/cookies" component={CookiePolicy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Set page title
    document.title = "Audio Motívate - Transforma Tu Vida";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Audiolibros y contenido motivacional para elevar tu mente y alcanzar tu máximo potencial. Transforma tu vida con Audio Motívate.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Audiolibros y contenido motivacional para elevar tu mente y alcanzar tu máximo potencial. Transforma tu vida con Audio Motívate.';
      document.head.appendChild(meta);
    }

    // Set Open Graph tags
    const ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', 'Audio Motívate - Transforma Tu Vida');
    document.head.appendChild(ogTitle);

    const ogDescription = document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.setAttribute('content', 'Audiolibros y contenido motivacional para elevar tu mente y alcanzar tu máximo potencial.');
    document.head.appendChild(ogDescription);

    const ogType = document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.setAttribute('content', 'website');
    document.head.appendChild(ogType);

    // Cleanup function
    return () => {
      document.head.removeChild(ogTitle);
      document.head.removeChild(ogDescription);
      document.head.removeChild(ogType);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Header />
        <Router />
        <Footer />
        <LocationPopup />
        <CartDrawer />
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;