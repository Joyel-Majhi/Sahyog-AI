import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, Upload, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SchemeApplicationForm = () => {
  const { schemeId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    gender: "",
    category: "",
    mobileNumber: "",
    emailAddress: "",
    district: "",
    state: "",
    currentAddress: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    landDetails: "",
    familyMembers: "",
    annualIncome: "",
    agreeTerms: false,
    declarationTruth: false,
  });

  const [loading, setLoading] = useState(false);
 const [currentUser, setCurrentUser] = useState<User | null>(null);


  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user);
        // Auto-fill email
        setFormData((prev) => ({ ...prev, emailAddress: user.email || "" }));
      }
    };
    fetchUser();
  }, []);

  const schemeDetails = {
    "pm-kisan": {
      title: "PM-KISAN Samman Nidhi Application",
      description: "Apply for financial assistance of ₹6,000 per year for small and marginal farmers",
      requiredFields: ["landDetails"],
      documents: ["Land Records", "Aadhaar Card", "Bank Passbook", "Passport Size Photo"]
    },
    "ayushman-bharat": {
      title: "Ayushman Bharat - PMJAY Application", 
      description: "Apply for health insurance coverage up to ₹5 lakhs per family",
      requiredFields: ["familyMembers", "annualIncome"],
      documents: ["SECC 2011 Data", "Aadhaar Card", "Family Photo", "Income Certificate"]
    },
    "jan-dhan": {
      title: "PM Jan Dhan Yojana Account Opening",
      description: "Open a zero balance bank account with insurance benefits",
      requiredFields: [],
      documents: ["Aadhaar Card", "PAN Card (optional)", "Passport Size Photo"]
    }
  };

  const currentScheme = schemeDetails[schemeId as keyof typeof schemeDetails] || schemeDetails["pm-kisan"];

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeTerms || !formData.declarationTruth) {
      toast({ title: "Error", description: "Please accept all declarations", variant: "destructive" });
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("scheme_applications")
      .insert([{
        user_id: currentUser?.id,
        scheme_id: schemeId,
        full_name: formData.fullName,
        father_name: formData.fatherName,
        mother_name: formData.motherName,
        dob: formData.dateOfBirth,
        gender: formData.gender,
        category: formData.category,
        mobile: formData.mobileNumber,
        email: formData.emailAddress,
        district: formData.district,
        state: formData.state,
        current_address: formData.currentAddress,
        bank_name: formData.bankName,
        account_number: formData.accountNumber,
        ifsc: formData.ifscCode,
        land_details: formData.landDetails,
        family_members: formData.familyMembers,
        annual_income: formData.annualIncome,
        status: "submitted"
      }]);

    setLoading(false);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Application Submitted", description: `Your ${currentScheme.title} application has been submitted.` });
      navigate("/tracking");
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">{currentScheme.title}</h2>
        <p className="mb-6">{currentScheme.description}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Personal Details</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Full Name *</Label><Input value={formData.fullName} onChange={e => updateFormData("fullName", e.target.value)} required /></div>
              <div><Label>Father's Name *</Label><Input value={formData.fatherName} onChange={e => updateFormData("fatherName", e.target.value)} required /></div>
              <div><Label>Mother's Name</Label><Input value={formData.motherName} onChange={e => updateFormData("motherName", e.target.value)} /></div>
              <div><Label>Date of Birth *</Label><Input type="date" value={formData.dateOfBirth} onChange={e => updateFormData("dateOfBirth", e.target.value)} required /></div>
              <div><Label>Gender *</Label>
                <Select value={formData.gender} onValueChange={v => updateFormData("gender", v)}>
                  <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Category *</Label>
                <Select value={formData.category} onValueChange={v => updateFormData("category", v)}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="obc">OBC</SelectItem>
                    <SelectItem value="sc">SC</SelectItem>
                    <SelectItem value="st">ST</SelectItem>
                    <SelectItem value="ews">EWS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Contact & Address</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Mobile Number *</Label><Input value={formData.mobileNumber} onChange={e => updateFormData("mobileNumber", e.target.value)} required /></div>
              <div><Label>Email Address</Label><Input value={formData.emailAddress} onChange={e => updateFormData("emailAddress", e.target.value)} /></div>
              <div><Label>District *</Label><Input value={formData.district} onChange={e => updateFormData("district", e.target.value)} required /></div>
              <div><Label>State *</Label>
                <Select value={formData.state} onValueChange={v => updateFormData("state", v)}>
                  <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
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
              <div className="md:col-span-2"><Label>Current Address *</Label><Textarea value={formData.currentAddress} onChange={e => updateFormData("currentAddress", e.target.value)} required /></div>
            </CardContent>
          </Card>

          {/* Bank & Scheme fields */}
          <Card>
            <CardHeader><CardTitle>Bank & Scheme Details</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Bank Name *</Label><Input value={formData.bankName} onChange={e => updateFormData("bankName", e.target.value)} required /></div>
              <div><Label>Account Number *</Label><Input value={formData.accountNumber} onChange={e => updateFormData("accountNumber", e.target.value)} required /></div>
              <div><Label>IFSC Code *</Label><Input value={formData.ifscCode} onChange={e => updateFormData("ifscCode", e.target.value)} required /></div>
              {currentScheme.requiredFields.includes("landDetails") && <div className="md:col-span-2"><Label>Land Details *</Label><Textarea value={formData.landDetails} onChange={e => updateFormData("landDetails", e.target.value)} required /></div>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Declarations</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox checked={formData.agreeTerms} onCheckedChange={v => updateFormData("agreeTerms", !!v)} />
                <Label>I agree to terms and conditions</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox checked={formData.declarationTruth} onCheckedChange={v => updateFormData("declarationTruth", !!v)} />
                <Label>I declare the information is true</Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center pt-4">
            <Button type="submit" size="lg" disabled={loading}>{loading ? "Submitting..." : "Submit Application"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchemeApplicationForm;
