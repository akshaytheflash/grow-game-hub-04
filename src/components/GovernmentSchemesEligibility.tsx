import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { 
  Trophy, 
  Gift, 
  CheckCircle, 
  IndianRupee,
  Leaf,
  TestTube,
  Sprout,
  Clock,
  MapPin,
  FileText,
  Users,
  Calendar,
  Phone,
  ExternalLink
} from "lucide-react";

interface GovernmentSchemesEligibilityProps {
  credits: number;
}

const GovernmentSchemesEligibility = ({ credits }: GovernmentSchemesEligibilityProps) => {
  const { toast } = useToast();
  const [selectedScheme, setSelectedScheme] = useState<any>(null);
  
  if (credits < 100) return null;

  const handleApplyScheme = (schemeName: string) => {
    toast({
      title: "Application Submitted",
      description: `Your application for ${schemeName} has been submitted successfully. You will receive updates on your registered mobile number.`,
    });
  };

  const handleApplyAll = () => {
    toast({
      title: "Applications Started",
      description: "Bulk application process initiated. You will be contacted by agricultural department within 7 working days.",
    });
  };

  const schemes = [
    {
      name: "Pradhan Mantri Kisan Samman Nidhi",
      icon: IndianRupee,
      feature: "Direct income support of ₹6,000/year per farmer",
      discount: "Full benefit",
      color: "text-green-600",
      details: {
        description: "PM-KISAN is a Central Sector scheme providing direct income support to farmer families across the country to supplement their financial needs for procuring various inputs related to agriculture and allied activities.",
        eligibility: [
          "Small and marginal farmer families (upto 2 hectares)",
          "Farmer families eligible under state land records",
          "Must have valid Aadhaar card",
          "Bank account should be linked with Aadhaar"
        ],
        benefits: [
          "₹6,000 per year in three equal installments of ₹2,000",
          "Direct transfer to bank account",
          "No application fee required",
          "Automatic renewal if eligible"
        ],
        documents: [
          "Aadhaar Card",
          "Bank Account Details",
          "Land ownership documents",
          "Mobile Number"
        ],
        applicationProcess: "Visit nearest Common Service Center (CSC) or apply online through PM-KISAN portal",
        processingTime: "15-30 days after verification",
        helpline: "155261"
      }
    },
    {
      name: "Soil Health Card Scheme", 
      icon: TestTube,
      feature: "Free soil testing and recommendations for balanced fertilizer use",
      discount: "100% free service",
      color: "text-blue-600",
      details: {
        description: "The Soil Health Card Scheme aims to issue soil health cards to farmers which will carry crop-wise recommendations of nutrients and fertilizers required for individual farms.",
        eligibility: [
          "All farmers with agricultural land",
          "Land should be registered in farmer's name",
          "Both small and large farmers eligible",
          "Cooperative societies also eligible"
        ],
        benefits: [
          "Free soil testing every 3 years",
          "Customized fertilizer recommendations",
          "Increase crop productivity by 8-10%",
          "Reduce fertilizer costs by 10-20%"
        ],
        documents: [
          "Land ownership documents",
          "Aadhaar Card",
          "Address proof",
          "Mobile number"
        ],
        applicationProcess: "Contact local agriculture extension officer or visit district collector office",
        processingTime: "Soil sample collection within 7 days, results in 15 days",
        helpline: "1800-180-1551"
      }
    },
    {
      name: "Fertilizer Subsidy Scheme",
      icon: Sprout,
      feature: "Government subsidized fertilizers at reduced rates",
      discount: "Up to 20% discount",
      color: "text-purple-600",
      details: {
        description: "The fertilizer subsidy scheme ensures that farmers get fertilizers at subsidized rates. The government bears the cost difference between the market price and subsidized price.",
        eligibility: [
          "All farmers with valid documents",
          "Must have soil health card",
          "Land ownership or lease documents required",
          "Aadhaar linking mandatory"
        ],
        benefits: [
          "Urea at ₹266.50 per bag (50kg)",
          "DAP at subsidized rates",
          "Complex fertilizers at reduced prices",
          "Direct transfer of subsidy to company accounts"
        ],
        documents: [
          "Aadhaar Card",
          "Land documents",
          "Soil Health Card",
          "Bank account details"
        ],
        applicationProcess: "Purchase from authorized fertilizer dealers with valid documents",
        processingTime: "Immediate at point of sale",
        helpline: "1800-116-001"
      }
    },
    {
      name: "National Mission for Sustainable Agriculture",
      icon: Leaf,
      feature: "Support for sustainable farming practices and organic methods",
      discount: "Up to 15% discount",
      color: "text-emerald-600",
      details: {
        description: "NMSA aims to make agriculture more productive, sustainable, profitable and climate resilient by promoting location specific integrated farming systems.",
        eligibility: [
          "Individual farmers",
          "Farmer Producer Organizations (FPOs)",
          "Self Help Groups",
          "Cooperative societies"
        ],
        benefits: [
          "Subsidy on organic inputs",
          "Training on sustainable practices",
          "Financial assistance for organic certification",
          "Support for integrated farming systems"
        ],
        documents: [
          "Aadhaar Card",
          "Land records",
          "Bank account details",
          "Group registration (for FPOs/SHGs)"
        ],
        applicationProcess: "Apply through District Collector or State Agriculture Department",
        processingTime: "30-45 days",
        helpline: "011-23388911"
      }
    },
    {
      name: "Pradhan Mantri Fasal Bima Yojana",
      icon: Trophy,
      feature: "Crop insurance coverage for protection against natural calamities",
      discount: "Premium subsidy up to 2%",
      color: "text-orange-600",
      details: {
        description: "PMFBY provides insurance coverage and financial support to farmers in the event of failure of any of the notified crop as a result of natural calamities, pests & diseases.",
        eligibility: [
          "All farmers growing notified crops",
          "Both loanee and non-loanee farmers",
          "Tenant farmers with valid agreements",
          "Sharecroppers with proper documents"
        ],
        benefits: [
          "Premium: 2% for Kharif, 1.5% for Rabi crops",
          "Coverage against natural calamities",
          "Quick settlement of claims",
          "Use of technology for claim assessment"
        ],
        documents: [
          "Aadhaar Card",
          "Land ownership documents",
          "Bank account details",
          "Sowing certificate"
        ],
        applicationProcess: "Apply through banks, CSCs, or insurance company offices",
        processingTime: "Claims settled within 2 months",
        helpline: "14447"
      }
    },
    {
      name: "National Seeds Corporation Subsidy",
      icon: Sprout,
      feature: "High quality certified seeds at subsidized rates",
      discount: "Up to 25% discount",
      color: "text-green-700",
      details: {
        description: "NSC provides high quality certified seeds of various crops at subsidized rates to increase agricultural productivity and ensure food security.",
        eligibility: [
          "All farmers",
          "Farmer Producer Organizations",
          "State Seed Corporations",
          "Cooperative societies"
        ],
        benefits: [
          "25% subsidy on certified seeds",
          "High yielding variety seeds",
          "Quality assurance guarantee",
          "Technical support for seed production"
        ],
        documents: [
          "Farmer registration certificate",
          "Aadhaar Card",
          "Land documents",
          "Previous purchase receipts"
        ],
        applicationProcess: "Contact NSC regional offices or authorized dealers",
        processingTime: "7-15 days for order processing",
        helpline: "011-25843222"
      }
    },
    {
      name: "Kisan Credit Card Scheme",
      icon: IndianRupee,
      feature: "Easy credit access for seeds, fertilizers and other farming inputs",
      discount: "Interest subsidy up to 3%",
      color: "text-blue-700",
      details: {
        description: "KCC provides farmers with timely access to credit for their cultivation and other needs at a reasonable rate of interest.",
        eligibility: [
          "All farmers - individual/joint borrowers",
          "Tenant farmers, oral lessees",
          "SHGs of farmers",
          "Farmers with allied activities"
        ],
        benefits: [
          "Interest subsidy up to 3%",
          "Credit limit based on scale of finance",
          "Flexibility in drawl and repayment",
          "Insurance coverage included"
        ],
        documents: [
          "Application form with photograph",
          "Identity proof (Aadhaar)",
          "Address proof",
          "Land ownership documents"
        ],
        applicationProcess: "Visit nearest bank branch or apply online through bank websites",
        processingTime: "15-30 days",
        helpline: "1800-180-1551"
      }
    },
    {
      name: "Paramparagat Krishi Vikas Yojana",
      icon: Leaf,
      feature: "Promotion of organic farming with certified organic seeds",
      discount: "₹50,000/hectare support",
      color: "text-green-800",
      details: {
        description: "PKVY is an elaborate component of Soil Health Management (SHM) of National Mission of Sustainable Agriculture (NMSA) to promote organic farming.",
        eligibility: [
          "Groups of farmers (minimum 50)",
          "Individual farmers with min 5 hectares",
          "Farmer Producer Organizations",
          "Registered farmer groups"
        ],
        benefits: [
          "₹50,000 per hectare for 3 years",
          "Organic seed support",
          "Certification assistance",
          "Market linkage support"
        ],
        documents: [
          "Group formation certificate",
          "Land documents",
          "Aadhaar Cards of all members",
          "Bank account details"
        ],
        applicationProcess: "Form groups and apply through District Collector office",
        processingTime: "45-60 days",
        helpline: "011-23388911"
      }
    },
    {
      name: "National Food Security Mission",
      icon: Gift,
      feature: "Quality seeds and fertilizers for rice, wheat and pulses",
      discount: "Up to 50% subsidy",
      color: "text-amber-600",
      details: {
        description: "NFSM aims to increase production and productivity of rice, wheat, pulses, nutri-cereals and commercial crops in a sustainable manner.",
        eligibility: [
          "Farmers in mission districts",
          "Individual and group farmers",
          "Farmer Producer Organizations",
          "Self Help Groups"
        ],
        benefits: [
          "50% subsidy on seeds and fertilizers",
          "Free distribution of pulse seeds",
          "Technical support and training",
          "Farm mechanization support"
        ],
        documents: [
          "Aadhaar Card",
          "Land ownership documents",
          "Bank account details",
          "Caste certificate (if applicable)"
        ],
        applicationProcess: "Apply through Block Development Office or Agriculture Department",
        processingTime: "21-30 days",
        helpline: "011-23381300"
      }
    }
  ];

  return (
    <Card className="border-none shadow-natural bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <Trophy className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <span className="text-green-700 dark:text-green-300">Congratulations!</span>
              <Badge className="ml-2 bg-green-100 text-green-800 border-green-300">
                <Gift className="h-3 w-3 mr-1" />
                Schemes Unlocked
              </Badge>
            </div>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
            🎉 You have earned {credits} credit points!
          </h3>
          <p className="text-green-600 dark:text-green-400">
            You are now eligible for government schemes on seeds and fertilizers.
            Take advantage of these benefits to enhance your farming success!
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-foreground flex items-center">
            <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
            Available Government Schemes:
          </h4>
          
          {schemes.map((scheme, index) => {
            const IconComponent = scheme.icon;
            return (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div 
                    className="flex items-start space-x-3 p-4 rounded-lg bg-card border border-border hover:border-green-300 hover:bg-green-50 dark:hover:bg-green-950/20 transition-all cursor-pointer transform hover:scale-[1.02]"
                  >
                    <div className="p-2 rounded-lg bg-muted/50">
                      <IconComponent className={`h-4 w-4 ${scheme.color}`} />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-foreground mb-1">{scheme.name}</h5>
                      <p className="text-sm text-muted-foreground mb-2">{scheme.feature}</p>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                        {scheme.discount}
                      </Badge>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-muted/50">
                        <IconComponent className={`h-6 w-6 ${scheme.color}`} />
                      </div>
                      <div>
                        <span>{scheme.name}</span>
                        <Badge className="ml-2 bg-green-100 text-green-800">
                          {scheme.discount}
                        </Badge>
                      </div>
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-blue-600" />
                        Scheme Description
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {scheme.details.description}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Eligibility */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Users className="h-4 w-4 mr-2 text-green-600" />
                          Eligibility Criteria
                        </h4>
                        <ul className="space-y-2">
                          {scheme.details.eligibility.map((criteria, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{criteria}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Gift className="h-4 w-4 mr-2 text-orange-600" />
                          Key Benefits
                        </h4>
                        <ul className="space-y-2">
                          {scheme.details.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start">
                              <Trophy className="h-4 w-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Documents & Process */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-purple-600" />
                          Required Documents
                        </h4>
                        <ul className="space-y-2">
                          {scheme.details.documents.map((doc, idx) => (
                            <li key={idx} className="flex items-center">
                              <div className="h-2 w-2 bg-purple-600 rounded-full mr-3"></div>
                              <span className="text-sm text-muted-foreground">{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                            Application Process
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {scheme.details.applicationProcess}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-muted/50 p-3 rounded-lg">
                            <div className="flex items-center mb-2">
                              <Clock className="h-4 w-4 text-blue-600 mr-2" />
                              <span className="font-medium text-sm">Processing Time</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {scheme.details.processingTime}
                            </p>
                          </div>

                          <div className="bg-muted/50 p-3 rounded-lg">
                            <div className="flex items-center mb-2">
                              <Phone className="h-4 w-4 text-green-600 mr-2" />
                              <span className="font-medium text-sm">Helpline</span>
                            </div>
                            <p className="text-xs text-muted-foreground font-mono">
                              {scheme.details.helpline}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <div className="flex justify-center pt-4 border-t">
                      <Button 
                        onClick={() => handleApplyScheme(scheme.name)}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
                        size="lg"
                      >
                        <Gift className="h-4 w-4 mr-2" />
                        Apply for This Scheme
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>

        <div className="pt-2">
          <Button 
            onClick={handleApplyAll}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            <Gift className="h-4 w-4 mr-2" />
            Apply for All Eligible Schemes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GovernmentSchemesEligibility;