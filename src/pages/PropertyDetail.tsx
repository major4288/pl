import { useParams, Link } from "react-router-dom";
import { useProperties } from "@/hooks/useProperties";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin, ExternalLink } from "lucide-react";
import { ParsedOverview } from "@/types/property";

const PropertyDetail = () => {
  const { name } = useParams<{ name: string }>();
  const { data: properties, isLoading } = useProperties();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  const property = properties?.find(
    (p) => p.PropertyName === name
  );

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Property not found</h1>
            <Link to="/">
              <Button variant="default">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Properties
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatPrice = (price: string) => {
    const cleanPrice = price.replace(/[₹,]/g, "").trim();
    return cleanPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const parseOverview = (overview: string): ParsedOverview => {
    const parsed: ParsedOverview = {};
    const pairs = overview.split(",");
    pairs.forEach((pair) => {
      const [key, value] = pair.split(":").map((s) => s.trim());
      if (key && value) {
        parsed[key] = value;
      }
    });
    return parsed;
  };

  const overviewData = parseOverview(property.Overview);
  const hasAffiliateLink = property.AffiliateLink && property.AffiliateLink.trim() !== "";
  const affiliateUrl = hasAffiliateLink 
    ? `${property.AffiliateLink.trim()}${property.AffiliateLink.includes('?') ? '&' : '?'}utm_source=propella`
    : "";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Properties
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-lg shadow-[var(--shadow-card)]">
              <img
                src={property.ImageURL}
                alt={property.PropertyName}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex gap-2 mb-4">
                <Badge variant="secondary">{property.Type}</Badge>
                <Badge variant={property.Status === "Available" ? "default" : "secondary"}>
                  {property.Status}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold mb-4 text-foreground">
                {property.PropertyName}
              </h1>
              <div className="flex items-center text-muted-foreground mb-6">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">{property.Address}</span>
              </div>
              <p className="text-4xl font-bold text-primary mb-6">
                ₹{formatPrice(property.Price)}
              </p>
            </div>

            <Card className="bg-gradient-to-b from-card to-card/50 border-border">
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {property.Description}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-card to-card/50 border-border">
              <CardHeader>
                <CardTitle>Property Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(overviewData).map(([key, value]) => (
                    <div key={key} className="border-b border-border pb-2">
                      <p className="text-sm text-muted-foreground">{key}</p>
                      <p className="font-semibold text-foreground">{value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {hasAffiliateLink ? (
              <a href={affiliateUrl} target="_blank" rel="noopener noreferrer" className="block">
                <Button size="lg" className="w-full h-14 text-lg">
                  Enquire Now
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
              </a>
            ) : (
              <Button size="lg" className="w-full h-14 text-lg" disabled>
                Contact Information Not Available
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
