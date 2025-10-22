import { useState, useMemo } from "react";
import { useProperties } from "@/hooks/useProperties";
import { Header } from "@/components/Header";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchBar } from "@/components/SearchBar";
import { PropertyFilters } from "@/components/PropertyFilters";

const Index = () => {
  const { data: properties, isLoading, error } = useProperties();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  const types = useMemo(() => {
    if (!properties) return [];
    return Array.from(new Set(properties.map((p) => p.Type)));
  }, [properties]);

  const statuses = useMemo(() => {
    if (!properties) return [];
    return Array.from(new Set(properties.map((p) => p.Status)));
  }, [properties]);

  const filteredAndSortedProperties = useMemo(() => {
    if (!properties) return [];

    let filtered = properties.filter((property) => {
      const matchesSearch =
        property.PropertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.Location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "all" || property.Type === selectedType;
      const matchesStatus = selectedStatus === "all" || property.Status === selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    });

    if (sortOrder !== "none") {
      filtered = [...filtered].sort((a, b) => {
        const priceA = parseInt(a.Price.replace(/,/g, ""));
        const priceB = parseInt(b.Price.replace(/,/g, ""));
        return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
      });
    }

    return filtered;
  }, [properties, searchQuery, selectedType, selectedStatus, sortOrder]);

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-destructive">
            Failed to load properties. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-r from-accent/20 to-secondary/20 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Find Your Dream Property
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover premium properties curated just for you
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <PropertyFilters
              types={types}
              statuses={statuses}
              selectedType={selectedType}
              selectedStatus={selectedStatus}
              sortOrder={sortOrder}
              onTypeChange={setSelectedType}
              onStatusChange={setSelectedStatus}
              onSortChange={setSortOrder}
            />
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Loading properties...</p>
            </div>
          ) : filteredAndSortedProperties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No properties found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProperties.map((property, index) => (
                <div
                  key={property.PropertyName}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
