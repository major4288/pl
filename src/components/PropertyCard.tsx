import { Property } from "@/types/property";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: string) => {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Link to={`/property/${encodeURIComponent(property.PropertyName)}`}>
      <Card className="group overflow-hidden border-border bg-gradient-to-b from-card to-card/50 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 animate-fade-in">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={property.ImageURL}
            alt={property.PropertyName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <Badge variant="secondary" className="bg-background/95 backdrop-blur-sm">
              {property.Type}
            </Badge>
            <Badge 
              variant={property.Status === "Available" ? "default" : "secondary"}
              className="bg-background/95 backdrop-blur-sm"
            >
              {property.Status}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-accent-foreground transition-colors">
            {property.PropertyName}
          </h3>
          <div className="flex items-center text-muted-foreground mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.Location}</span>
          </div>
          <p className="text-2xl font-bold text-primary">
            ₹{formatPrice(property.Price)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};
