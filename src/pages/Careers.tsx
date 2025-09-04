import { useState } from "react";
import { 
  TrendingUp, 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  Users, 
  Star,
  ArrowRight,
  Search,
  Filter,
  Building2,
  IndianRupee,
  Clock,
  Target,
  Lightbulb
} from "lucide-react";

import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import { Label } from "@/components/ui/label.tsx";

// Mock career data
const careerPaths = [
  {
    id: "1",
    courseName: "B.Sc. Computer Science",
    stream: "Science",
    duration: "3 years",
    eligibility: "10+2 with Mathematics",
    description: "A comprehensive program covering programming, algorithms, data structures, and software development principles.",
    careerOptions: [
      {
        title: "Software Developer",
        description: "Design and develop software applications and systems",
        averageSalary: "₹4-8 LPA",
        growthProspects: "Excellent - High demand in tech industry"
      },
      {
        title: "Data Scientist",
        description: "Analyze complex data to help organizations make decisions",
        averageSalary: "₹6-12 LPA",
        growthProspects: "Outstanding - Fastest growing field"
      },
      {
        title: "Cybersecurity Analyst",
        description: "Protect organizations from digital threats and attacks",
        averageSalary: "₹5-10 LPA",
        growthProspects: "Excellent - Critical need across industries"
      }
    ],
    higherEducation: [
      {
        course: "M.Sc. Computer Science",
        eligibility: "B.Sc. with 50% minimum",
        entranceExams: ["GATE", "University Entrance Exams"]
      },
      {
        course: "MBA (IT Management)",
        eligibility: "Graduate with work experience",
        entranceExams: ["CAT", "XAT", "GMAT"]
      }
    ],
    governmentExams: ["SSC CGL", "Bank PO", "RRB NTPC", "UPSC (Computer Science Optional)"],
    skillsRequired: ["Programming", "Problem Solving", "Mathematics", "Logic", "Communication"],
    industryDemand: "high"
  },
  {
    id: "2",
    courseName: "B.Com (Bachelor of Commerce)",
    stream: "Commerce",
    duration: "3 years",
    eligibility: "10+2 from any stream",
    description: "Comprehensive business education covering accounting, finance, economics, and business management.",
    careerOptions: [
      {
        title: "Chartered Accountant",
        description: "Handle financial auditing, taxation, and business advisory",
        averageSalary: "₹6-15 LPA",
        growthProspects: "Excellent - Always in demand"
      },
      {
        title: "Financial Analyst",
        description: "Analyze financial data and market trends for investment decisions",
        averageSalary: "₹4-8 LPA",
        growthProspects: "Very Good - Growing financial sector"
      },
      {
        title: "Banking Professional",
        description: "Work in various banking roles from operations to management",
        averageSalary: "₹3-7 LPA",
        growthProspects: "Good - Stable career path"
      }
    ],
    higherEducation: [
      {
        course: "M.Com",
        eligibility: "B.Com with 50% minimum",
        entranceExams: ["University Entrance Exams", "DUET"]
      },
      {
        course: "MBA (Finance/Marketing)",
        eligibility: "Graduate with work experience",
        entranceExams: ["CAT", "XAT", "CMAT"]
      }
    ],
    governmentExams: ["Bank PO", "SSC CGL", "RBI Grade B", "UPSC (Commerce Optional)"],
    skillsRequired: ["Analytical Thinking", "Mathematics", "Communication", "Attention to Detail", "Business Acumen"],
    industryDemand: "high"
  },
  {
    id: "3",
    courseName: "B.A. English Literature",
    stream: "Arts",
    duration: "3 years",
    eligibility: "10+2 from any stream",
    description: "Study of literature, language, writing, and critical thinking across different cultures and time periods.",
    careerOptions: [
      {
        title: "Content Writer/Editor",
        description: "Create and edit content for digital media, publications, and marketing",
        averageSalary: "₹3-6 LPA",
        growthProspects: "Very Good - High demand in digital era"
      },
      {
        title: "Journalist/Reporter",
        description: "Research and report news for newspapers, magazines, or digital media",
        averageSalary: "₹3-8 LPA",
        growthProspects: "Good - Evolving media landscape"
      },
      {
        title: "Teacher/Professor",
        description: "Teach at schools, colleges, or universities",
        averageSalary: "₹3-10 LPA",
        growthProspects: "Stable - Respected profession"
      }
    ],
    higherEducation: [
      {
        course: "M.A. English",
        eligibility: "B.A. with 50% minimum",
        entranceExams: ["University Entrance Exams", "JNU Entrance"]
      },
      {
        course: "Mass Communication",
        eligibility: "Graduate from any stream",
        entranceExams: ["IIMC Entrance", "JAMIA Entrance"]
      }
    ],
    governmentExams: ["UPSC", "State PSC", "SSC CGL", "Teaching Eligibility Tests"],
    skillsRequired: ["Writing", "Communication", "Critical Thinking", "Research", "Creativity"],
    industryDemand: "medium"
  },
  {
    id: "4",
    courseName: "Diploma in Graphic Design",
    stream: "Vocational",
    duration: "1-2 years",
    eligibility: "10th/12th pass",
    description: "Practical training in visual design, digital tools, and creative problem-solving for various media.",
    careerOptions: [
      {
        title: "Graphic Designer",
        description: "Create visual content for print and digital media",
        averageSalary: "₹2-6 LPA",
        growthProspects: "Good - Growing creative industry"
      },
      {
        title: "UI/UX Designer",
        description: "Design user interfaces and experiences for apps and websites",
        averageSalary: "₹4-10 LPA",
        growthProspects: "Excellent - High tech demand"
      },
      {
        title: "Freelance Designer",
        description: "Work independently on various design projects",
        averageSalary: "₹2-8 LPA",
        growthProspects: "Variable - Depends on skills and network"
      }
    ],
    higherEducation: [
      {
        course: "Bachelor of Fine Arts",
        eligibility: "12th pass with portfolio",
        entranceExams: ["NIFT", "NID", "University Entrance"]
      },
      {
        course: "Advanced Diploma in Design",
        eligibility: "Basic diploma with portfolio",
        entranceExams: ["Portfolio Assessment", "Design Aptitude"]
      }
    ],
    governmentExams: ["Limited government opportunities", "Public sector design roles"],
    skillsRequired: ["Creativity", "Design Software", "Visual Communication", "Attention to Detail", "Trend Awareness"],
    industryDemand: "medium"
  }
];

const streams = ["All", "Science", "Commerce", "Arts", "Vocational"];
const industries = ["All", "Technology", "Finance", "Media", "Government", "Healthcare", "Education"];
const salaryRanges = ["All", "₹2-4 LPA", "₹4-6 LPA", "₹6-8 LPA", "₹8+ LPA"];

export default function Careers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStream, setSelectedStream] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedSalary, setSelectedSalary] = useState("All");
  const [selectedCareer, setSelectedCareer] = useState<typeof careerPaths[0] | null>(null);

  const filteredCareers = careerPaths.filter(career => {
    const matchesSearch = career.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         career.careerOptions.some(option => 
                           option.title.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    const matchesStream = selectedStream === "All" || career.stream === selectedStream;
    
    return matchesSearch && matchesStream;
  });

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "high": return "text-green-600 bg-green-50";
      case "medium": return "text-yellow-600 bg-yellow-50";
      case "low": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getDemandText = (demand: string) => {
    switch (demand) {
      case "high": return "High Demand";
      case "medium": return "Moderate Demand";
      case "low": return "Low Demand";
      default: return "Unknown";
    }
  };

  if (selectedCareer) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedCareer(null)}
              className="mb-4"
            >
              ← Back to Career Paths
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedCareer.courseName}
            </h1>
            <p className="text-gray-600">{selectedCareer.description}</p>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Overview */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Stream</span>
                        <p className="font-semibold">{selectedCareer.stream}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Duration</span>
                        <p className="font-semibold">{selectedCareer.duration}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Eligibility</span>
                        <p className="font-semibold">{selectedCareer.eligibility}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Industry Demand</span>
                        <Badge className={getDemandColor(selectedCareer.industryDemand)}>
                          {getDemandText(selectedCareer.industryDemand)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Career Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Career Opportunities
                  </CardTitle>
                  <CardDescription>
                    Potential career paths after completing this course
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedCareer.careerOptions.map((option, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold text-lg">{option.title}</h4>
                          <Badge variant="outline">{option.averageSalary}</Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{option.description}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-green-600">{option.growthProspects}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Higher Education Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Higher Education Pathways
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedCareer.higherEducation.map((edu, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">{edu.course}</h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Eligibility: </span>
                            <span>{edu.eligibility}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Entrance Exams: </span>
                            <span>{edu.entranceExams.join(", ")}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Government Opportunities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Government Exam Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedCareer.governmentExams.map((exam, index) => (
                      <Badge key={index} variant="secondary">{exam}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Skills Required */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Skills Required
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedCareer.skillsRequired.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Take Action</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full">
                    Find Colleges Offering This Course
                  </Button>
                  <Button variant="outline" className="w-full">
                    Download Course Brochure
                  </Button>
                  <Button variant="outline" className="w-full">
                    Talk to a Counselor
                  </Button>
                </CardContent>
              </Card>

              {/* Related Careers */}
              <Card>
                <CardHeader>
                  <CardTitle>Related Career Paths</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {careerPaths
                      .filter(career => career.stream === selectedCareer.stream && career.id !== selectedCareer.id)
                      .slice(0, 3)
                      .map(career => (
                        <button
                          key={career.id}
                          onClick={() => setSelectedCareer(career)}
                          className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <p className="font-medium text-sm">{career.courseName}</p>
                          <p className="text-xs text-gray-600">{career.stream}</p>
                        </button>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Career Path Explorer
          </h1>
          <p className="text-gray-600">
            Discover detailed career information, salary prospects, and growth opportunities for different courses
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Career Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Course or career..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-2 block">Stream</Label>
                <Select value={selectedStream} onValueChange={setSelectedStream}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {streams.map(stream => (
                      <SelectItem key={stream} value={stream}>{stream}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Industry</Label>
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Salary Range</Label>
                <Select value={selectedSalary} onValueChange={setSelectedSalary}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {salaryRanges.map(range => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {filteredCareers.length} Career Paths Found
          </h2>
          <p className="text-gray-600">
            Explore detailed information about each career path
          </p>
        </div>

        {/* Career Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredCareers.map(career => (
            <Card key={career.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{career.courseName}</CardTitle>
                    <CardDescription className="mb-3">
                      {career.description}
                    </CardDescription>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{career.stream}</Badge>
                      <Badge className={getDemandColor(career.industryDemand)}>
                        {getDemandText(career.industryDemand)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Top Career Options */}
                  <div>
                    <h4 className="font-medium mb-3 text-sm text-gray-700">
                      Top Career Opportunities
                    </h4>
                    <div className="space-y-2">
                      {career.careerOptions.slice(0, 2).map((option, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="font-medium text-sm">{option.title}</span>
                          <span className="text-xs text-gray-600">{option.averageSalary}</span>
                        </div>
                      ))}
                      {career.careerOptions.length > 2 && (
                        <div className="text-xs text-gray-600 text-center">
                          +{career.careerOptions.length - 2} more career options
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Duration:</span>
                      <p className="font-medium">{career.duration}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Eligibility:</span>
                      <p className="font-medium">{career.eligibility}</p>
                    </div>
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => setSelectedCareer(career)}
                  >
                    Explore Career Path
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCareers.length === 0 && (
          <Card className="p-8 text-center">
            <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No career paths found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria to explore more options
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setSelectedStream("All");
                setSelectedIndustry("All");
                setSelectedSalary("All");
              }}
            >
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}