import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  CreditCard, 
  MessageSquare, 
  Map,
  Users,
  Shield,
  Zap,
  Award
} from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import Chatbot from "@/components/Chatbot"; // ✅ Import chatbot component

const Home = () => {
  const features = [
    {
      icon: FileText,
      title: "Government Schemes",
      description: "Access and apply for various government schemes and benefits",
      href: "/schemes",
      color: "text-government-blue"
    },
    {
      icon: CreditCard,
      title: "Online Services",
      description: "Get PAN, AADHAAR, and other essential government services",
      href: "/services",
      color: "text-government-green"
    },
    {
      icon: MessageSquare,
      title: "Complaint Box",
      description: "Report issues, delays, and provide feedback on services",
      href: "/complaints",
      color: "text-government-saffron"
    },
    {
      icon: Map,
      title: "HeatMAP",
      description: "Visualize complaint data and service efficiency across regions",
      href: "/heatmap",
      color: "text-destructive"
    }
  ];

  const stats = [
    { label: "Active Schemes", value: "9", icon: Award },
    { label: "Online Services", value: "6", icon: Zap },
    { label: "Registered Users", value: "10K+", icon: Users },
    { label: "Resolved Complaints", value: "95%", icon: Shield }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Welcome to <span className="text-accent">SahyogAI</span>
              </h1>
              <p className="text-xl mb-8 text-primary-foreground/90">
                Your trusted platform for government schemes, services, and citizen engagement. 
                Empowering transparency and efficiency in public service delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Get Started
                  </Button>
                </Link>
                <Link to="/schemes">
                  <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                    Explore Schemes
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src={heroBanner} 
                alt="Digital Government Services" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive digital solutions for all your government service needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-card">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <CardDescription className="mb-6">
                    {feature.description}
                  </CardDescription>
                  <Link to={feature.href}>
                    <Button className="w-full" variant="outline">
                      Access Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Join thousands of citizens who are already benefiting from our digital government services platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Create Account
              </Button>
            </Link>
            <Link to="/tracking">
              <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                Track Application
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ Floating Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Home;
