import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const Complaints = () => {
  const [complaintData, setComplaintData] = useState({
    category: "",
    subject: "",
    description: "",
    department: "",
    location: "",
    contactNumber: "",
    email: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement complaint submission with Supabase
    console.log("Complaint submitted:", complaintData);
  };

  const updateComplaintData = (field: string, value: string) => {
    setComplaintData(prev => ({ ...prev, [field]: value }));
  };

  const recentComplaints = [
    {
      id: "CMP001",
      subject: "Delay in PAN card processing",
      category: "Service Delay",
      status: "Under Review",
      date: "2024-01-15",
      location: "Delhi",
      statusColor: "bg-yellow-500"
    },
    {
      id: "CMP002",
      subject: "Corruption in license office",
      category: "Corruption",
      status: "Resolved",
      date: "2024-01-10",
      location: "Mumbai",
      statusColor: "bg-green-500"
    },
    {
      id: "CMP003",
      subject: "Poor service at Aadhaar center",
      category: "Service Quality",
      status: "In Progress",
      date: "2024-01-08",
      location: "Bangalore",
      statusColor: "bg-blue-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Complaint Box</h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Report service delays, corruption, or provide feedback to improve government services
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Complaint Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  File a Complaint
                </CardTitle>
                <CardDescription>
                  Help us improve government services by reporting issues or providing feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6 bg-accent/10 border-accent">
                  <AlertDescription className="text-accent-foreground">
                    <strong>Note:</strong> Complaint submission requires Supabase integration for data storage and tracking.
                  </AlertDescription>
                </Alert>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Complaint Category</Label>
                      <Select value={complaintData.category} onValueChange={(value) => updateComplaintData("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="service-delay">Service Delay</SelectItem>
                          <SelectItem value="corruption">Corruption</SelectItem>
                          <SelectItem value="service-quality">Poor Service Quality</SelectItem>
                          <SelectItem value="technical-issue">Technical Issue</SelectItem>
                          <SelectItem value="misinformation">Misinformation</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select value={complaintData.department} onValueChange={(value) => updateComplaintData("department", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="income-tax">Income Tax Department</SelectItem>
                          <SelectItem value="uidai">UIDAI (Aadhaar)</SelectItem>
                          <SelectItem value="passport">Passport Office</SelectItem>
                          <SelectItem value="transport">Transport Department</SelectItem>
                          <SelectItem value="electoral">Election Commission</SelectItem>
                          <SelectItem value="telecom">Telecom Department</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={complaintData.subject}
                      onChange={(e) => updateComplaintData("subject", e.target.value)}
                      placeholder="Brief subject of your complaint"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea
                      id="description"
                      value={complaintData.description}
                      onChange={(e) => updateComplaintData("description", e.target.value)}
                      placeholder="Provide detailed information about your complaint..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={complaintData.location}
                        onChange={(e) => updateComplaintData("location", e.target.value)}
                        placeholder="City, State"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactNumber">Contact Number</Label>
                      <Input
                        id="contactNumber"
                        type="tel"
                        value={complaintData.contactNumber}
                        onChange={(e) => updateComplaintData("contactNumber", e.target.value)}
                        placeholder="Your phone number"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={complaintData.email}
                      onChange={(e) => updateComplaintData("email", e.target.value)}
                      placeholder="Your email address"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Complaint
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Recent Complaints */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Recent Complaints
                </CardTitle>
                <CardDescription>
                  Track the status of recent complaints filed by citizens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentComplaints.map((complaint) => (
                    <div key={complaint.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-sm">{complaint.subject}</h4>
                          <p className="text-xs text-muted-foreground">ID: {complaint.id}</p>
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${complaint.statusColor}`}></div>
                          {complaint.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            {complaint.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {complaint.date}
                          </span>
                        </div>
                        <span>{complaint.location}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-medium mb-3">Complaint Statistics</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">127</div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">23</div>
                      <div className="text-xs text-muted-foreground">Pending</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">104</div>
                      <div className="text-xs text-muted-foreground">Resolved</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;