import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import DiscoverWorldPage from "@/pages/DiscoverWorldPage";
import VisaBooking from "@/pages/VisaBooking";
import HotelsBooking from "@/pages/HotelsBooking";
import AboutUsPage from "@/pages/AboutUsPage";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/discover-world" component={DiscoverWorldPage} />
      <Route path="/visa-booking" component={VisaBooking} />
      <Route path="/hotels-booking" component={HotelsBooking} />
      <Route path="/about-us" component={AboutUsPage} />
      <Route path="/groups-booking" component={NotFound} />
      <Route path="/tickets-booking" component={NotFound} />
      <Route path="/driving-license" component={NotFound} />
      <Route path="/health-insurance" component={NotFound} />
      <Route path="/transfer-services" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Reset scroll behavior
    document.documentElement.style.scrollBehavior = 'auto';
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
