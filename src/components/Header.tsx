import { Link } from "react-router-dom";
import propellaLogo from "@/assets/propella-logo.png";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center">
        <Link to="/" className="flex items-center transition-opacity hover:opacity-80">
          <img src={propellaLogo} alt="Propella" className="h-8 md:h-10" />
        </Link>
      </div>
    </header>
  );
};
