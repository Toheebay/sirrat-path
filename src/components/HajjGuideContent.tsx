
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, BookOpen, CheckCircle } from "lucide-react";

interface HajjGuideContentProps {
  guideType: "first-time" | "packing" | "rituals" | "health";
  onDownload: () => void;
}

const HajjGuideContent = ({ guideType, onDownload }: HajjGuideContentProps) => {
  const getGuideContent = () => {
    switch (guideType) {
      case "first-time":
        return {
          title: "First-time Pilgrim's Complete Guide",
          sections: [
            {
              title: "Understanding Hajj",
              content: "Hajj is the fifth pillar of Islam, a mandatory religious duty for Muslims who are physically and financially capable. It occurs annually during the Islamic month of Dhul Hijjah."
            },
            {
              title: "When to Perform Hajj",
              content: "Hajj takes place from the 8th to 12th of Dhul Hijjah. The main rituals occur on specific days, with the Day of Arafat (9th Dhul Hijjah) being the most important."
            },
            {
              title: "Spiritual Preparation",
              content: "Begin preparing spiritually months before your journey. Increase your prayers, read the Quran, seek forgiveness, and learn about the significance of each ritual."
            },
            {
              title: "Financial Preparation",
              content: "Ensure all debts are paid, family needs are met, and you have sufficient funds for the journey and post-Hajj expenses."
            },
            {
              title: "Physical Preparation",
              content: "Hajj requires significant physical stamina. Begin a fitness routine, get necessary vaccinations, and consult your doctor about any health concerns."
            }
          ]
        };
      
      case "packing":
        return {
          title: "What to Pack for Hajj",
          sections: [
            {
              title: "Essential Documents",
              content: "Passport, visa, vaccination certificates, travel insurance, emergency contacts, and multiple copies of all documents."
            },
            {
              title: "Ihram Clothing (Men)",
              content: "Two white, unstitched cloths (Izar and Rida), white undergarments, flip-flops or sandals without straps over the feet."
            },
            {
              title: "Modest Clothing (Women)",
              content: "Loose-fitting, modest clothing covering entire body except face and hands. Comfortable hijabs, prayer dress, and appropriate footwear."
            },
            {
              title: "Personal Care Items",
              content: "Unscented soap, toothbrush, toothpaste, towels, sunscreen, moisturizer, and any prescribed medications."
            },
            {
              title: "Technology & Comfort",
              content: "Phone with international plan, portable charger, power bank, small prayer mat, Quran or prayer book, and comfortable walking shoes."
            }
          ]
        };
      
      case "rituals":
        return {
          title: "Hajj Rituals Step-by-Step",
          sections: [
            {
              title: "Day 1: Ihram and Tawaf",
              content: "Enter the state of Ihram at the Miqat, make intention for Hajj, perform Tawaf around the Kaaba seven times, and perform Sa'i between Safa and Marwah."
            },
            {
              title: "Day 2: Mina",
              content: "Travel to Mina after Fajr prayer. Spend the day in worship, prayer, and reflection. Stay overnight in Mina preparing for the Day of Arafat."
            },
            {
              title: "Day 3: Arafat (Most Important Day)",
              content: "Travel to Arafat after Fajr. Stand in supplication from noon until sunset. This is the main pillar of Hajj - if you miss this, your Hajj is invalid."
            },
            {
              title: "Day 3 Evening: Muzdalifah",
              content: "After sunset, travel to Muzdalifah. Pray Maghrib and Isha together, collect pebbles for stoning, and rest until Fajr."
            },
            {
              title: "Day 4: Ramy, Sacrifice, and Tawaf",
              content: "Stone the largest Jamarat, perform animal sacrifice (Qurbani), shave or trim hair, and perform Tawaf al-Ifadah."
            },
            {
              title: "Days 5-6: Remaining in Mina",
              content: "Continue stoning all three Jamarat daily. You may leave after the 12th if you stone before sunset, or stay until the 13th."
            }
          ]
        };
      
      case "health":
        return {
          title: "Health & Safety Guidelines",
          sections: [
            {
              title: "Required Vaccinations",
              content: "Meningitis vaccination is mandatory. Yellow fever vaccination required if coming from endemic areas. COVID-19 vaccination may be required."
            },
            {
              title: "Health Precautions",
              content: "Stay hydrated, use sunscreen, wear comfortable shoes, take breaks during walking, and avoid overexertion during rituals."
            },
            {
              title: "Food Safety",
              content: "Drink bottled water, eat at reputable restaurants, avoid street food, wash hands frequently, and be cautious with raw foods."
            },
            {
              title: "Crowd Safety",
              content: "Stay with your group, avoid peak hours when possible, don't push in crowds, follow security instructions, and have emergency contact information."
            },
            {
              title: "Medical Assistance",
              content: "Know location of nearest medical facilities, carry emergency medications, have travel insurance, and don't hesitate to seek help if unwell."
            }
          ]
        };
      
      default:
        return { title: "", sections: [] };
    }
  };

  const guide = getGuideContent();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{guide.title}</h2>
        <Badge className="mb-4 bg-emerald-100 text-emerald-800">
          Complete Guide
        </Badge>
      </div>

      <div className="space-y-4">
        {guide.sections.map((section, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>{section.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{section.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button 
          onClick={onDownload}
          className="bg-emerald-600 hover:bg-emerald-700"
          size="lg"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Complete Guide (PDF)
        </Button>
      </div>
    </div>
  );
};

export default HajjGuideContent;
