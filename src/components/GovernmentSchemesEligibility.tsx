import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Gift, 
  CheckCircle, 
  IndianRupee,
  Leaf,
  TestTube,
  Sprout
} from "lucide-react";

interface GovernmentSchemesEligibilityProps {
  credits: number;
}

const GovernmentSchemesEligibility = ({ credits }: GovernmentSchemesEligibilityProps) => {
  if (credits < 100) return null;

  const schemes = [
    {
      name: "Pradhan Mantri Kisan Samman Nidhi",
      icon: IndianRupee,
      feature: "Direct income support of ₹6,000/year per farmer",
      discount: "Full benefit",
      color: "text-green-600"
    },
    {
      name: "Soil Health Card Scheme", 
      icon: TestTube,
      feature: "Free soil testing and recommendations for balanced fertilizer use",
      discount: "100% free service",
      color: "text-blue-600"
    },
    {
      name: "Fertilizer Subsidy Scheme",
      icon: Sprout,
      feature: "Government subsidized fertilizers at reduced rates",
      discount: "Up to 20% discount",
      color: "text-purple-600"
    },
    {
      name: "National Mission for Sustainable Agriculture",
      icon: Leaf,
      feature: "Support for sustainable farming practices and organic methods",
      discount: "Up to 15% discount",
      color: "text-emerald-600"
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
              <div 
                key={index}
                className="flex items-start space-x-3 p-4 rounded-lg bg-card border border-border hover:border-green-300 transition-colors"
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
              </div>
            );
          })}
        </div>

        <div className="pt-2">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
            <Gift className="h-4 w-4 mr-2" />
            Apply for Schemes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GovernmentSchemesEligibility;