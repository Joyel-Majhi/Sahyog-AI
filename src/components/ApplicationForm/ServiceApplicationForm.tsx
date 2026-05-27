import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileText, Upload, CheckCircle, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/supabaseClient";

const ServiceApplicationForm = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    dateOfBirth: "",
    gender: "",
    mobileNumber: "",
    emailAddress: "",
    currentAddress: "",
    district: "",
    state: "",
    applicationType: "",
    passportType: "",
    pages: "",
    urgency: "normal",
    licenseType: "",
    vehicleClass: "",
    paymentMode: "",
    agreeTerms: false,
    declarationTruth: false,
  });

  const serviceDetails = {
    "pan-card": {
      title: "PAN Card Application",
      description: "Apply for new PAN card or make corrections",
      fee: "₹107 (Indian) / ₹989 (Foreign)",
      processingTime: "15-20 days",
      documents: ["Proof of Identity", "Proof of Address", "Proof of Date of Birth", "Passport Size Photo"],
      specificFields: ["applicationType"],
    },
    "aadhaar": {
      title: "Aadhaar Enrollment/Update",
      description: "New Aadhaar enrollment or biometric updates",
      fee: "Free (New) / ₹50 (Update)",
      processingTime: "90 days",
      documents: ["Proof of Identity", "Proof of Address", "Proof of Date of Birth"],
      specificFields: ["applicationType"],
    },
    "passport": {
      title: "Passport Application",
      description: "Apply for new passport or renewal",
      fee: "₹1,500 (36 pages) / ₹2,000 (60 pages)",
      processingTime: "30 days (Normal) / 7 days (Tatkal)",
      documents: ["Birth Certificate", "Address Proof", "Identity Proof", "Passport Size Photo"],
      specificFields: ["passportType", "pages", "urgency"],
    },
    "driving-license": {
      title: "Driving License Application",
      description: "Apply for learner's or permanent driving license",
      fee: "₹200 (Learner's) / ₹500 (Permanent)",
      processingTime: "7-15 days",
      documents: ["Age Proof", "Address Proof", "Medical Certificate", "Passport Size Photo"],
      specificFields: ["licenseType", "vehicleClass"],
    },
    "voter-id": {
      title: "Voter ID Registration",
      description: "New voter registration or corrections",
      fee: "Free of cost",
      processingTime: "30 days",
      documents: ["Age Proof", "Address Proof", "Passport Size Photo"],
      specificFields: ["applicationType"],
    },
    "mobile-connection": {
      title: "Mobile Connection",
      description: "New connection or port number",
      fee: "As per operator",
      processingTime: "Same day",
      documents: ["Identity Proof", "Address Proof", "Passport Size Photo"],
      specificFields: ["applicationType"],
    },
  };

  const currentService = serviceDetails[serviceId as keyof typeof serviceDetails] || serviceDetails["pan-card"];

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeTerms || !formData.declarationTruth) {
      toast({
        title: "Error",
        description: "Please accept all declarations to proceed",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      application_type: formData.applicationType,
      full_name: formData.fullName,
      father_name: formData.fatherName,
      date_of_birth: formData.dateOfBirth,
      gender: formData.gender,
      mobile_number: formData.mobileNumber,
      email: formData.emailAddress,
      current_address: formData.currentAddress,
      district: formData.district,
      state: formData.state,
      fee: currentService.fee,
      payment_mode: formData.paymentMode,
      status: "submitted",
      processing_days: parseInt(currentService.processingTime.match(/\d+/)?.[0] || "0"),
      declaration_accepted: true,
    };

    const { data, error } = await supabase.from("services_app").insert([payload]).select();

    if (error) {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Application Submitted Successfully!",
      description: `Your ${currentService.title} application has been submitted. Reference ID: ${data?.[0]?.application_id}`,
    });

    setTimeout(() => navigate("/tracking"), 2000);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-8">
          <Button variant="outline" onClick={() => navigate("/services")} className="mb-4">
            ← Back to Services
          </Button>

          <Card className="bg-gradient-hero text-primary-foreground">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <CreditCard className="w-6 h-6 mr-3" />
                {currentService.title}
              </CardTitle>
              <CardDescription className="text-primary-foreground/90">
                {currentService.description}
              </CardDescription>
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-primary-foreground/80">
                <span>Fee: {currentService.fee}</span>
                <span>Processing: {currentService.processingTime}</span>
              </div>
            </CardHeader>
          </Card>
        </div>

        <Alert className="mb-8 bg-accent/10 border-accent">
          <AlertDescription className="text-accent-foreground">
            <strong>Important:</strong> Please ensure all fields are filled correctly before submitting.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* CONDITIONAL FIELDS */}
          {currentService.specificFields.includes("applicationType") && (
            <Card>
              <CardHeader>
                <CardTitle>Application Type</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={formData.applicationType} onValueChange={(value) => updateFormData("applicationType", value)}>
                  {serviceId === "pan-card" && (
                    <>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="new" id="new" />
                        <Label htmlFor="new">New PAN Card</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="correction" id="correction" />
                        <Label htmlFor="correction">Correction in PAN Card</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="duplicate" id="duplicate" />
                        <Label htmlFor="duplicate">Duplicate PAN Card</Label>
                      </div>
                    </>
                  )}
                  {serviceId === "aadhaar" && (
                    <>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="new" id="new" />
                        <Label htmlFor="new">New Aadhaar Enrollment</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="update" id="update" />
                        <Label htmlFor="update">Update Demographic Data</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="biometric" id="biometric" />
                        <Label htmlFor="biometric">Update Biometric Data</Label>
                      </div>
                    </>
                  )}
                </RadioGroup>
              </CardContent>
            </Card>
          )}

          {/* PERSONAL DETAILS */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Details</CardTitle>
              <CardDescription>Please provide information as per official documents</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" value={formData.fullName} onChange={(e) => updateFormData("fullName", e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherName">Father's Name *</Label>
                <Input id="fatherName" value={formData.fatherName} onChange={(e) => updateFormData("fatherName", e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={(e) => updateFormData("dateOfBirth", e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* CONTACT INFORMATION */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mobileNumber">Mobile Number *</Label>
                <Input id="mobileNumber" value={formData.mobileNumber} onChange={(e) => updateFormData("mobileNumber", e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailAddress">Email Address *</Label>
                <Input id="emailAddress" type="email" value={formData.emailAddress} onChange={(e) => updateFormData("emailAddress", e.target.value)} required />
              </div>
            </CardContent>
          </Card>

          {/* ADDRESS */}
          <Card>
            <CardHeader>
              <CardTitle>Address Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="district">District *</Label>
                  <Input id="district" value={formData.district} onChange={(e) => updateFormData("district", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Select value={formData.state} onValueChange={(value) => updateFormData("state", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                      <SelectItem value="bihar">Bihar</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="gujarat">Gujarat</SelectItem>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="punjab">Punjab</SelectItem>
                      <SelectItem value="rajasthan">Rajasthan</SelectItem>
                      <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentAddress">Current Address *</Label>
                <Textarea id="currentAddress" value={formData.currentAddress} onChange={(e) => updateFormData("currentAddress", e.target.value)} required />
              </div>
            </CardContent>
          </Card>

          {/* PAYMENT */}
          <Card>
            <CardHeader>
              <CardTitle>Fee Payment</CardTitle>
              <CardDescription>Service Fee: {currentService.fee}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label>Payment Mode</Label>
                <RadioGroup value={formData.paymentMode} onValueChange={(value) => updateFormData("paymentMode", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online">Online Payment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="challan" id="challan" />
                    <Label htmlFor="challan">Bank Challan</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* DECLARATION */}
          <Card>
            <CardHeader>
              <CardTitle>Declarations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="agreeTerms" checked={formData.agreeTerms} onCheckedChange={(checked) => updateFormData("agreeTerms", !!checked)} />
                <Label htmlFor="agreeTerms" className="text-sm">
                  I agree to the terms and conditions and understand that providing false information may lead to rejection of application.
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="declarationTruth" checked={formData.declarationTruth} onCheckedChange={(checked) => updateFormData("declarationTruth", !!checked)} />
                <Label htmlFor="declarationTruth" className="text-sm">
                  I hereby declare that the information provided above is true to the best of my knowledge and belief.
                </Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center pt-6">
            <Button type="submit" size="lg" className="px-12">
              Submit Application & Pay Fee
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceApplicationForm;
