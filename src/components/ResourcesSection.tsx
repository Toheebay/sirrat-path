import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  CheckCircle, 
  Clock,
  Download,
  Play,
  FileText,
  MapPin,
  Calendar,
  Users,
  Heart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HajjGuideContent from "./HajjGuideContent";

const ResourcesSection = () => {
  const [completedGuides, setCompletedGuides] = useState<number[]>([]);
  const [currentGuide, setCurrentGuide] = useState<string | null>(null);
  const { toast } = useToast();

  const guides = [
    {
      id: 1,
      title: "First-time Pilgrim's Complete Guide",
      description: "Everything you need to know for your first Hajj journey",
      duration: "15 min read",
      category: "Essential",
      difficulty: "Beginner",
      sections: 8,
      type: "first-time" as const
    },
    {
      id: 2,
      title: "Hajj Rituals Step-by-Step",
      description: "Detailed explanation of each Hajj ritual and its significance",
      duration: "25 min read",
      category: "Spiritual",
      difficulty: "Intermediate",
      sections: 12,
      type: "rituals" as const
    },
    {
      id: 3,
      title: "What to Pack for Hajj",
      description: "Complete packing checklist for your sacred journey",
      duration: "10 min read",
      category: "Practical",
      difficulty: "Beginner",
      sections: 5,
      type: "packing" as const
    },
    {
      id: 4,
      title: "Health & Safety Guidelines",
      description: "Important health tips and safety measures during Hajj",
      duration: "20 min read",
      category: "Health",
      difficulty: "Intermediate",
      sections: 9,
      type: "health" as const
    }
  ];

  const prayers = [
    { time: "Fajr", arabic: "الفجر", timing: "05:30 AM", status: "completed" },
    { time: "Dhuhr", arabic: "الظهر", timing: "12:45 PM", status: "completed" },
    { time: "Asr", arabic: "العصر", timing: "04:20 PM", status: "upcoming" },
    { time: "Maghrib", arabic: "المغرب", timing: "06:55 PM", status: "upcoming" },
    { time: "Isha", arabic: "العشاء", timing: "08:30 PM", status: "upcoming" }
  ];

  const checklist = [
    { category: "Documents", items: [
      { name: "International Passport", completed: true },
      { name: "Visa Application", completed: true },
      { name: "Vaccination Certificates", completed: false },
      { name: "Travel Insurance", completed: false }
    ]},
    { category: "Clothing", items: [
      { name: "Ihram Clothing (Men)", completed: false },
      { name: "Modest Clothing", completed: true },
      { name: "Comfortable Walking Shoes", completed: false },
      { name: "Head Covering (Women)", completed: true }
    ]},
    { category: "Essentials", items: [
      { name: "Prayer Mat", completed: false },
      { name: "Qur'an/Prayer Book", completed: true },
      { name: "First Aid Kit", completed: false },
      { name: "Phone Charger", completed: true }
    ]}
  ];

  const hajjSteps = [
    {
      step: 1,
      name: "Ihram",
      arabic: "الإحرام",
      description: "Enter the sacred state of pilgrimage",
      location: "Miqat boundaries",
      duration: "Before entering Mecca"
    },
    {
      step: 2,
      name: "Tawaf",
      arabic: "الطواف",
      description: "Circumambulate the Kaaba seven times",
      location: "Masjid al-Haram",
      duration: "30-60 minutes"
    },
    {
      step: 3,
      name: "Sa'i",
      arabic: "السعي",
      description: "Walk between Safa and Marwah hills",
      location: "Between Safa and Marwah",
      duration: "45-90 minutes"
    },
    {
      step: 4,
      name: "Mina",
      arabic: "منى",
      description: "Stay overnight in Mina",
      location: "Mina valley",
      duration: "8th day of Dhul Hijjah"
    },
    {
      step: 5,
      name: "Arafat",
      arabic: "عرفات",
      description: "The most important day of Hajj",
      location: "Mount Arafat",
      duration: "9th day of Dhul Hijjah"
    },
    {
      step: 6,
      name: "Muzdalifah",
      arabic: "المزدلفة",  
      description: "Collect pebbles and rest",
      location: "Between Arafat and Mina",
      duration: "Night of 9th-10th Dhul Hijjah"
    }
  ];

  const toggleGuideCompletion = (guideId: number) => {
    setCompletedGuides(prev => 
      prev.includes(guideId) 
        ? prev.filter(id => id !== guideId)
        : [...prev, guideId]
    );
  };

  const startReading = (guideType: string) => {
    setCurrentGuide(guideType);
  };

  const handleDownload = (guideTitle: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${guideTitle} as PDF...`,
    });
    
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${guideTitle.replace(/\s+/g, '_')}.pdf`;
    link.click();
  };

  const completionPercentage = (completedGuides.length / guides.length) * 100;

  if (currentGuide) {
    const guide = guides.find(g => g.type === currentGuide);
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => setCurrentGuide(null)}
            className="mb-4"
          >
            ← Back to Resources
          </Button>
        </div>
        <HajjGuideContent 
          guideType={currentGuide as any} 
          onDownload={() => handleDownload(guide?.title || 'Guide')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-indigo-100 text-indigo-800">
          📚 Hajj Resources
        </Badge>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Educational Resources</h1>
        <p className="text-gray-600">Everything you need to know for a successful Hajj journey</p>
      </div>

      {/* Progress Overview */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>Learning Progress</span>
          </CardTitle>
          <CardDescription>
            {completedGuides.length} of {guides.length} guides completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={completionPercentage} className="h-3 mb-4" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{completedGuides.length} guides completed</span>
            <span>{Math.round(completionPercentage)}% progress</span>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="guides" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="guides">Study Guides</TabsTrigger>
          <TabsTrigger value="prayers">Prayer Times</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
          <TabsTrigger value="hajj-steps">Hajj Steps</TabsTrigger>
          <TabsTrigger value="resources">Downloads</TabsTrigger>
        </TabsList>

        <TabsContent value="guides" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {guides.map((guide) => {
              const isCompleted = completedGuides.includes(guide.id);
              
              return (
                <Card key={guide.id} className={`hover:shadow-lg transition-all duration-300 ${
                  isCompleted ? 'border-emerald-200 bg-emerald-50' : ''
                }`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <span>{guide.title}</span>
                          {isCompleted && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                        </CardTitle>
                        <CardDescription className="mt-2">{guide.description}</CardDescription>
                      </div>
                      <Badge className={`ml-2 ${
                        guide.category === 'Essential' ? 'bg-red-100 text-red-800' :
                        guide.category === 'Spiritual' ? 'bg-purple-100 text-purple-800' :
                        guide.category === 'Practical' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {guide.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{guide.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText className="w-4 h-4" />
                          <span>{guide.sections} sections</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {guide.difficulty}
                      </Badge>
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => {
                          startReading(guide.type);
                          toggleGuideCompletion(guide.id);
                        }}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Reading
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleDownload(guide.title)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="prayers" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <span>Today's Prayer Times</span>
                </CardTitle>
                <CardDescription>Mecca local time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prayers.map((prayer, index) => (
                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                      prayer.status === 'completed' ? 'bg-emerald-50 border border-emerald-200' :
                      prayer.status === 'current' ? 'bg-orange-50 border border-orange-200' :
                      'bg-gray-50 border border-gray-200'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          prayer.status === 'completed' ? 'bg-emerald-600' :
                          prayer.status === 'current' ? 'bg-orange-600' :
                          'bg-gray-400'
                        }`}>
                          {prayer.status === 'completed' ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : (
                            <Clock className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{prayer.time}</h4>
                          <p className="text-sm text-gray-600 font-arabic">{prayer.arabic}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{prayer.timing}</p>
                        <Badge className={
                          prayer.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                          prayer.status === 'current' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {prayer.status === 'completed' ? '✓ Prayed' :
                           prayer.status === 'current' ? '⏰ Current' : '📅 Upcoming'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-800">🕌 Spiritual Reminders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg border border-emerald-200">
                    <h4 className="font-medium text-emerald-800 mb-2">Daily Dhikr</h4>
                    <p className="text-sm text-emerald-700">
                      "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير"
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">Preparation Dua</h4>
                    <p className="text-sm text-blue-700">
                      Make dua for a successful and accepted Hajj journey
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-800 mb-2">Intention (Niyyah)</h4>
                    <p className="text-sm text-purple-700">
                      Keep your intention pure and focused on pleasing Allah
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            {checklist.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                  <CardDescription>
                    {category.items.filter(item => item.completed).length} of {category.items.length} completed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          item.completed 
                            ? 'bg-emerald-600 border-emerald-600' 
                            : 'border-gray-300'
                        }`}>
                          {item.completed && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <span className={`text-sm ${
                          item.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                        }`}>
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-emerald-800 mb-2">
                  📋 Complete Checklist Available
                </h3>
                <p className="text-emerald-700 mb-4">
                  Download our comprehensive Hajj preparation checklist
                </p>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download Full Checklist
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hajj-steps" className="space-y-4">
          <div className="space-y-6">
            {hajjSteps.map((step, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {step.step}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{step.name}</h3>
                        <span className="text-lg text-gray-600 font-arabic">{step.arabic}</span>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{step.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-emerald-600" />
                          <span><strong>Location:</strong> {step.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span><strong>Duration:</strong> {step.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      <BookOpen className="w-4 h-4 mr-1" />
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>📄 Documents & Forms</CardTitle>
                <CardDescription>Important documents for your journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Hajj Application Form", size: "2.1 MB", type: "PDF" },
                  { name: "Vaccination Requirements", size: "1.5 MB", type: "PDF" },
                  { name: "Travel Insurance Guide", size: "800 KB", type: "PDF" },
                  { name: "Emergency Contacts List", size: "450 KB", type: "PDF" }
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-sm">{doc.name}</h4>
                        <p className="text-xs text-gray-600">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📱 Mobile Apps</CardTitle>
                <CardDescription>Helpful apps for your Hajj journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Hajj & Umrah Guide", description: "Complete guide with GPS", rating: "4.8" },
                  { name: "Prayer Times & Qibla", description: "Accurate prayer times", rating: "4.9" },
                  { name: "Hajj Manasik", description: "Step-by-step rituals", rating: "4.7" },
                  { name: "Holy Quran Audio", description: "Quran with translations", rating: "4.9" }
                ].map((app, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">📱</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{app.name}</h4>
                        <p className="text-xs text-gray-600">{app.description} • ⭐ {app.rating}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Install
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResourcesSection;
