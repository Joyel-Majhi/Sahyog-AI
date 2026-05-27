import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Search, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Calendar,
  User,
  MapPin
} from "lucide-react";

const Tracking = () => {
  const [applicationId, setApplicationId] = useState("");
  const [trackingResults, setTrackingResults] = useState<any[]>([]);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement tracking functionality with Supabase
    // Mock data for demonstration
    const mockResults = [
      {
        id: "APP001",
        type: "PAN Card Application",
        status: "In Progress",
        submittedDate: "2024-01-10",
        estimatedCompletion: "2024-01-25",
        currentStage: "Document Verification",
        progress: 60,
        statusColor: "bg-blue-500"
      },
      {
        id: "SCH001", 
        type: "PM-KISAN Scheme",
        status: "Approved",
        submittedDate: "2023-12-15",
        estimatedCompletion: "2024-01-15",
        currentStage: "Payment Processing",
        progress: 100,
        statusColor: "bg-green-500"
      }
    ];
    
    setTrackingResults(mockResults);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FileText className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const recentApplications = [
    {
      id: "APP001",
      type: "PAN Card Application",
      status: "In Progress",
      date: "2024-01-10",
      progress: 60
    },
    {
      id: "SCH001",
      type: "PM-KISAN Scheme Application",
      status: "Approved",
      date: "2023-12-15",
      progress: 100
    },
    {
      id: "SRV001", 
      type: "Passport Application",
      status: "Document Verification",
      date: "2024-01-08",
      progress: 45
    },
    {
      id: "CMP001",
      type: "Service Complaint",
      status: "Under Review",
      date: "2024-01-05",
      progress: 30
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Application</h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Track the status of your scheme applications, service requests, and complaints
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tracking Form */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  Track Your Application
                </CardTitle>
                <CardDescription>
                  Enter your application ID or reference number to track status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6 bg-accent/10 border-accent">
                  <AlertDescription className="text-accent-foreground">
                    <strong>Note:</strong> Application tracking requires Supabase integration to store and retrieve application data.
                  </AlertDescription>
                </Alert>

                <form onSubmit={handleTrack} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="applicationId">Application ID / Reference Number</Label>
                    <div className="flex gap-2">
                      <Input
                        id="applicationId"
                        value={applicationId}
                        onChange={(e) => setApplicationId(e.target.value)}
                        placeholder="Enter your application ID (e.g., APP001, SCH001)"
                        className="flex-1"
                        required
                      />
                      <Button type="submit">
                        <Search className="w-4 h-4 mr-2" />
                        Track
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Tracking Results */}
            {trackingResults.length > 0 && (
              <div className="space-y-6">
                {trackingResults.map((result) => (
                  <Card key={result.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center">
                            {getStatusIcon(result.status)}
                            <span className="ml-2">{result.type}</span>
                          </CardTitle>
                          <CardDescription>Application ID: {result.id}</CardDescription>
                        </div>
                        <Badge 
                          variant={result.status === 'Approved' ? 'default' : 'secondary'}
                          className="flex items-center gap-1"
                        >
                          <div className={`w-2 h-2 rounded-full ${result.statusColor}`}></div>
                          {result.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Progress Bar */}
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{result.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${result.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Application Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">Submitted</div>
                              <div className="text-muted-foreground">{result.submittedDate}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">Expected Completion</div>
                              <div className="text-muted-foreground">{result.estimatedCompletion}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">Current Stage</div>
                              <div className="text-muted-foreground">{result.currentStage}</div>
                            </div>
                          </div>
                        </div>

                        {/* Timeline (simplified) */}
                        <div className="border-t border-border pt-4">
                          <h4 className="font-medium mb-3">Application Timeline</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3 text-sm">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span>Application Submitted</span>
                              <span className="text-muted-foreground ml-auto">{result.submittedDate}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                              <div className={`w-2 h-2 rounded-full ${result.progress >= 50 ? 'bg-green-500' : 'bg-muted'}`}></div>
                              <span>Document Verification</span>
                              <span className="text-muted-foreground ml-auto">
                                {result.progress >= 50 ? 'Completed' : 'In Progress'}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                              <div className={`w-2 h-2 rounded-full ${result.progress >= 100 ? 'bg-green-500' : 'bg-muted'}`}></div>
                              <span>Final Processing</span>
                              <span className="text-muted-foreground ml-auto">
                                {result.progress >= 100 ? 'Completed' : 'Pending'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Recent Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="border border-border rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-sm">{app.type}</h4>
                          <p className="text-xs text-muted-foreground">ID: {app.id}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {app.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>Progress: {app.progress}%</span>
                        <span>{app.date}</span>
                      </div>
                      
                      <div className="w-full bg-muted rounded-full h-1">
                        <div 
                          className="bg-primary h-1 rounded-full"
                          style={{ width: `${app.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Apply for New Service
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Update Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  Find Service Centers
                </Button>
              </CardContent>
            </Card>

            {/* Help Section */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  If you're having trouble tracking your application, contact our support team.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;