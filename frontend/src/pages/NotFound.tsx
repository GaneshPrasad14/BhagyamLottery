import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-background py-16">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
          <span className="text-4xl font-serif font-bold text-primary">404</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-foreground mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button variant="gold" size="lg" asChild>
          <Link to="/" className="gap-2">
            <Home className="w-4 h-4" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
