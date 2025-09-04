import { useState, useMemo } from "react";
import { 
  MapPin, 
  Search, 
  Filter, 
  Star, 
  Users, 
  BookOpen, 
  Wifi, 
  Home, 
  Building,
  Phone,
  Mail,
  Globe,
  ChevronRight,
  Heart,
  ExternalLink
} from "lucide-react";

import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";

// Mock data - in real app, this would come from the backend
const mockColleges = [
  {
    id: "1",
    name: "Government College of Arts and Science",
    location: "Central District",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Government",
    establishedYear: 1962,
    affiliation: "University of Mumbai",
    courses: [
      { name: "B.A. (English)", stream: "Arts", duration: "3 years", eligibility: "10+2", cutoff: 85, fees: 15000 },
      { name: "B.Com", stream: "Commerce", duration: "3 years", eligibility: "10+2", cutoff: 88, fees: 18000 },
      { name: "B.Sc. (Mathematics)", stream: "Science", duration: "3 years", eligibility: "10+2 with Science", cutoff: 90, fees: 20000 }
    ],
    facilities: ["Library", "Hostel", "Computer Lab", "Sports Complex", "WiFi"],
    contact: {
      phone: "+91 22 1234 5678",
      email: "info@gcas-mumbai.edu.in",
      website: "www.gcas-mumbai.edu.in"
    },
    rating: 4.2,
    distance: "2.5 km"
  },
  {
    id: "2",
    name: "Dr. A.P.J. Abdul Kalam Government College",
    location: "Tech Park Area",
    city: "Bangalore",
    state: "Karnataka",
    type: "Government",
    establishedYear: 1995,
    affiliation: "Bangalore University",
    courses: [
      { name: "B.Sc. Computer Science", stream: "Science", duration: "3 years", eligibility: "10+2 with Mathematics", cutoff: 92, fees: 25000 },
      { name: "B.Com (Hons)", stream: "Commerce", duration: "3 years", eligibility: "10+2", cutoff: 90, fees: 22000 },
      { name: "BBA", stream: "Commerce", duration: "3 years", eligibility: "10+2", cutoff: 87, fees: 28000 }
    ],
    facilities: ["Digital Library", "Hostel", "Computer Lab", "Innovation Center", "WiFi", "Canteen"],
    contact: {
      phone: "+91 80 9876 5432",
      email: "admissions@apjgc-blr.edu.in",
      website: "www.apjgc-bangalore.edu.in"
    },
    rating: 4.5,
    distance: "5.8 km"
  },
  {
    id: "3",
    name: "Mahatma Gandhi Government College",
    location: "Civil Lines",
    city: "Delhi",
    state: "Delhi",
    type: "Government",
    establishedYear: 1948,
    affiliation: "Delhi University",
    courses: [
      { name: "B.A. (Political Science)", stream: "Arts", duration: "3 years", eligibility: "10+2", cutoff: 89, fees: 12000 },
      { name: "B.A. (History)", stream: "Arts", duration: "3 years", eligibility: "10+2", cutoff: 85, fees: 12000 },
      { name: "B.Com", stream: "Commerce", duration: "3 years", eligibility: "10+2", cutoff: 91, fees: 16000 }
    ],
    facilities: ["Central Library", "Boys Hostel", "Girls Hostel", "Auditorium", "WiFi"],
    contact: {
      phone: "+91 11 2345 6789",
      email: "info@mggc-delhi.edu.in",
      website: "www.mggc-delhi.edu.in"
    },
    rating: 4.0,
    distance: "3.2 km"
  }
];

export default function Colleges() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedStream, setSelectedStream] = useState("all");
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("distance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const allStates = [...new Set(mockColleges.map(college => college.state))];
  const allStreams = [...new Set(mockColleges.flatMap(college => college.courses.map(course => course.stream)))];
  const allFacilities = [...new Set(mockColleges.flatMap(college => college.facilities))];

  const filteredColleges = useMemo(() => {
    const filtered = mockColleges.filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           college.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesState = selectedState === "all" || college.state === selectedState;
      const matchesStream = selectedStream === "all" || 
                           college.courses.some(course => course.stream === selectedStream);
      const matchesFacilities = selectedFacilities.length === 0 ||
                               selectedFacilities.every(facility => college.facilities.includes(facility));

      return matchesSearch && matchesState && matchesStream && matchesFacilities;
    });

    // Sort colleges
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "distance":
          return parseFloat(a.distance) - parseFloat(b.distance);
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        case "established":
          return b.establishedYear - a.establishedYear;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedState, selectedStream, selectedFacilities, sortBy]);

  const handleFacilityToggle = (facility: string) => {
    setSelectedFacilities(prev => 
      prev.includes(facility)
        ? prev.filter(f => f !== facility)
        : [...prev, facility]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedState("all");
    setSelectedStream("all");
    setSelectedFacilities([]);
    setSortBy("distance");
  };

  const getFacilityIcon = (facility: string) => {
    switch (facility.toLowerCase()) {
      case "library": case "digital library": case "central library":
        return <BookOpen className="h-4 w-4" />;
      case "hostel": case "boys hostel": case "girls hostel":
        return <Home className="h-4 w-4" />;
      case "wifi":
        return <Wifi className="h-4 w-4" />;
      case "computer lab": case "innovation center":
        return <Building className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  const CollegeCard = ({ college }: { college: typeof mockColleges[0] }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{college.name}</CardTitle>
            <CardDescription className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4" />
              {college.location}, {college.city}, {college.state}
            </CardDescription>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Est. {college.establishedYear}</span>
              <Badge variant="outline">{college.type}</Badge>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{college.rating}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="courses">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="space-y-3 mt-4">
            {college.courses.slice(0, 2).map((course, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{course.name}</h4>
                  <Badge variant="secondary" className="text-xs">{course.stream}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <span>Duration: {course.duration}</span>
                  <span>Fees: ₹{course.fees.toLocaleString()}/year</span>
                  <span>Eligibility: {course.eligibility}</span>
                  <span>Cutoff: {course.cutoff}%</span>
                </div>
              </div>
            ))}
            {college.courses.length > 2 && (
              <Button variant="ghost" size="sm" className="w-full">
                View {college.courses.length - 2} more courses
              </Button>
            )}
          </TabsContent>
          
          <TabsContent value="facilities" className="mt-4">
            <div className="grid grid-cols-2 gap-2">
              {college.facilities.map((facility, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  {getFacilityIcon(facility)}
                  <span>{facility}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="contact" className="space-y-3 mt-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{college.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{college.contact.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-500" />
                <a href={`https://${college.contact.website}`} className="text-blue-600 hover:underline">
                  {college.contact.website}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{college.distance} away</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex gap-2 mt-4">
          <Button className="flex-1">
            Apply Now
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline">
            View Details
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Government Colleges Directory
          </h1>
          <p className="text-gray-600">
            Find the perfect government college near you with detailed course information and facilities
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Filters</CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <Label className="text-sm font-medium">Search</Label>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="College name or city..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Separator />

                {/* State Filter */}
                <div>
                  <Label className="text-sm font-medium">State</Label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      {allStates.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Stream Filter */}
                <div>
                  <Label className="text-sm font-medium">Stream</Label>
                  <Select value={selectedStream} onValueChange={setSelectedStream}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select stream" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Streams</SelectItem>
                      {allStreams.map(stream => (
                        <SelectItem key={stream} value={stream}>{stream}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Facilities Filter */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Facilities</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {allFacilities.map(facility => (
                      <div key={facility} className="flex items-center space-x-2">
                        <Checkbox
                          id={facility}
                          checked={selectedFacilities.includes(facility)}
                          onCheckedChange={() => handleFacilityToggle(facility)}
                        />
                        <Label htmlFor={facility} className="text-sm">
                          {facility}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {filteredColleges.length} Colleges Found
                </h2>
                <p className="text-gray-600">
                  Showing government colleges matching your criteria
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distance">Nearest First</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="established">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* College Cards */}
            {filteredColleges.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="space-y-4">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No colleges found
                    </h3>
                    <p className="text-gray-600">
                      Try adjusting your filters to see more results
                    </p>
                  </div>
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredColleges.map(college => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>
            )}

            {/* Load More */}
            {filteredColleges.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline">
                  Load More Colleges
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}