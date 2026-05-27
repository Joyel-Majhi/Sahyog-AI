import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  FileText, 
  Car, 
  Shield, 
  Phone,
  MapPin
} from "lucide-react";

const Services = () => {
  const services = [
    {
      id: "pan-card",
      title: "PAN Card Application",
      description: "Apply for new PAN card or make corrections to existing PAN card details",
      icon: CreditCard,
      category: "Income Tax",
      processingTime: "15-20 days",
      fees: "₹107 (Indian address), ₹989 (Foreign address)",
      status: "Available",
      color: "text-government-blue"
    },
    {
      id: "aadhaar",
      title: "Aadhaar Enrollment & Updates",
      description: "New Aadhaar enrollment, biometric updates, and demographic corrections",
      icon: Shield,
      category: "Identity",
      processingTime: "90 days",
      fees: "Free for new enrollment, ₹50 for updates",
      status: "Available",
      color: "text-government-green"
    },
    {
      id: "passport",
      title: "Passport Services",
      description: "Apply for new passport, renewal, or additional booklet for travel abroad",
      icon: FileText,
      category: "Travel Document",
      processingTime: "30 days (normal), 7 days (tatkal)",
      fees: "₹1,500 (36 pages), ₹2,000 (60 pages)",
      status: "Available",
      color: "text-government-saffron"
    },
    {
      id: "driving-license",
      title: "Driving License",
      description: "Apply for learner's license, permanent license, or license renewal",
      icon: Car,
      category: "Transport",
      processingTime: "7-15 days",
      fees: "₹200 (Learner's), ₹500 (Permanent)",
      status: "Available",
      color: "text-destructive"
    },
    {
      id: "voter-id",
      title: "Voter ID Registration",
      description: "New voter registration, corrections in voter details, or transfer of constituency",
      icon: Shield,
      category: "Electoral",
      processingTime: "30 days",
      fees: "Free of cost",
      status: "Available",
      color: "text-primary"
    },
    {
      id: "mobile-connection",
      title: "Mobile Connection",
      description: "New mobile connection, port mobile number, or update KYC details",
      icon: Phone,
      category: "Telecom",
      processingTime: "Same day",
      fees: "As per operator charges",
      status: "Available",
      color: "text-government-blue"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Government Services</h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Access essential government services online - from PAN card to passport applications
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-card">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <service.icon className={`w-6 h-6 ${service.color}`} />
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {service.category}
                        </Badge>
                        <Badge 
                          variant={service.status === 'Available' ? 'default' : 'secondary'}
                          className="ml-2"
                        >
                          {service.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                  
                  <div className="space-y-2 mb-6 text-sm">
                    <div>
                      <span className="font-medium text-foreground">Processing Time:</span>
                      <span className="text-muted-foreground ml-1">{service.processingTime}</span>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Fees:</span>
                      <span className="text-muted-foreground ml-1">{service.fees}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/services/${service.id}/apply`} className="flex-1">
                      <Button className="w-full" size="sm">
                        Apply Now
                      </Button>
                    </Link>
                    <Link to={`/services/${service.id}`}>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Service Centers Near You</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find the nearest government service centers for document verification and biometric services
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Find Service Centers
            </Button>
            <Link to="/tracking">
              <Button>
                Track Your Applications
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;