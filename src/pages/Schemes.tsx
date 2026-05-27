import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Users, 
  Heart, 
  GraduationCap, 
  Home, 
  Briefcase,
  Banknote,
  Shield,
  Baby
} from "lucide-react";

const Schemes = () => {
  const schemes = [
    {
      id: "pm-kisan",
      title: "PM-KISAN Samman Nidhi",
      description: "Financial assistance of ₹6,000 per year to farmer families owning cultivable land up to 2 hectares",
      icon: Briefcase,
      category: "Agriculture",
      eligibility: "Small & Marginal Farmers",
      benefits: "₹6,000/year in 3 installments",
      status: "Active",
      color: "text-government-green"
    },
    {
      id: "ayushman-bharat",
      title: "Ayushman Bharat - PMJAY",
      description: "Health insurance coverage up to ₹5 lakhs per family per year for secondary and tertiary care",
      icon: Heart,
      category: "Healthcare",
      eligibility: "Eligible families as per SECC 2011",
      benefits: "₹5 lakh health insurance",
      status: "Active",
      color: "text-destructive"
    },
    {
      id: "jan-dhan",
      title: "Pradhan Mantri Jan Dhan Yojana",
      description: "Financial inclusion program to provide banking services to all households",
      icon: Banknote,
      category: "Financial Inclusion",
      eligibility: "All Indian Citizens",
      benefits: "Zero balance bank account",
      status: "Active",
      color: "text-government-blue"
    },
    {
      id: "sukanya-samriddhi",
      title: "Sukanya Samriddhi Yojana",
      description: "Small deposit scheme for girl child with attractive interest rates",
      icon: Baby,
      category: "Girl Child Welfare",
      eligibility: "Parents with girl child (0-10 years)",
      benefits: "High interest savings",
      status: "Active",
      color: "text-government-saffron"
    },
    {
      id: "pmay-gramin",
      title: "PM Awaas Yojana - Gramin",
      description: "Providing pucca house with basic amenities to all houseless and inadequate housing families",
      icon: Home,
      category: "Housing",
      eligibility: "Rural houseless families",
      benefits: "₹1.2-3 lakh housing assistance",
      status: "Active",
      color: "text-government-green"
    },
    {
      id: "bpl-scholarship",
      title: "Post Matric Scholarship for SC Students",
      description: "Financial assistance to Scheduled Caste students for higher education",
      icon: GraduationCap,
      category: "Education",
      eligibility: "SC students pursuing higher education",
      benefits: "Educational expenses coverage",
      status: "Active",
      color: "text-primary"
    },
    {
      id: "atal-pension",
      title: "Atal Pension Yojana",
      description: "Guaranteed pension scheme for organized and unorganized sector workers",
      icon: Shield,
      category: "Pension",
      eligibility: "Indian citizens aged 18-40",
      benefits: "₹1,000-5,000 monthly pension",
      status: "Active",
      color: "text-government-blue"
    },
    {
      id: "kaushal-vikas",
      title: "Pradhan Mantri Kaushal Vikas Yojana",
      description: "Skill development scheme to enable youth to take up industry-relevant skill training",
      icon: Users,
      category: "Skill Development",
      eligibility: "Youth aged 18-35",
      benefits: "Free skill training & certification",
      status: "Active",
      color: "text-government-saffron"
    },
    {
      id: "mudra-yojana",
      title: "Pradhan Mantri MUDRA Yojana",
      description: "Micro-finance scheme to provide loans up to ₹10 lakh for non-corporate, non-farm activities",
      icon: Briefcase,
      category: "Micro Finance",
      eligibility: "Micro entrepreneurs",
      benefits: "Loans up to ₹10 lakh",
      status: "Active",
      color: "text-government-green"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Government Schemes</h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Explore and apply for various government schemes designed to benefit citizens across different sectors
            </p>
          </div>
        </div>
      </section>

      {/* Schemes Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schemes.map((scheme) => (
              <Card key={scheme.id} className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-card">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <scheme.icon className={`w-6 h-6 ${scheme.color}`} />
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {scheme.category}
                        </Badge>
                        <Badge 
                          variant={scheme.status === 'Active' ? 'default' : 'secondary'}
                          className="ml-2"
                        >
                          {scheme.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{scheme.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 text-sm leading-relaxed">
                    {scheme.description}
                  </CardDescription>
                  
                  <div className="space-y-2 mb-6 text-sm">
                    <div>
                      <span className="font-medium text-foreground">Eligibility:</span>
                      <span className="text-muted-foreground ml-1">{scheme.eligibility}</span>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Benefits:</span>
                      <span className="text-muted-foreground ml-1">{scheme.benefits}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/schemes/${scheme.id}/apply`} className="flex-1">
                      <Button className="w-full" size="sm">
                        Apply Now
                      </Button>
                    </Link>
                    <Link to={`/schemes/${scheme.id}`}>
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            If you need assistance with any scheme application or have questions about eligibility criteria, 
            our support team is here to help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tracking">
              <Button variant="outline">
                Track Your Applications
              </Button>
            </Link>
            <Link to="/contact">
              <Button>
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Schemes;