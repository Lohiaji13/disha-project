import { query, mutation } from "./_generated/server";
import { ConvexError } from "convex/values";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

// Get colleges with filtering and pagination
export const getColleges = query({
  args: {
    paginationOpts: paginationOptsValidator,
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    stream: v.optional(v.string()),
    searchQuery: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Get colleges with location filter if provided
    let allColleges;
    
    if (args.city && args.state) {
      allColleges = await ctx.db
        .query("colleges")
        .withIndex("by_location", (q) => q.eq("city", args.city!).eq("state", args.state!))
        .collect();
    } else {
      allColleges = await ctx.db.query("colleges").collect();
    }
    
    // Apply filters in JavaScript
    const filteredColleges = allColleges.filter(college => {
      // Search query filter
      if (args.searchQuery) {
        const searchLower = args.searchQuery.toLowerCase();
        const matchesSearch = 
          college.name.toLowerCase().includes(searchLower) ||
          college.city.toLowerCase().includes(searchLower) ||
          college.location.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Stream filter
      if (args.stream) {
        const hasStream = college.courses.some(course => 
          course.stream.toLowerCase() === args.stream!.toLowerCase()
        );
        if (!hasStream) return false;
      }

      return true;
    });

    // Manual pagination since we filtered in JavaScript
    const { numItems, cursor } = args.paginationOpts;
    const startIndex = cursor ? parseInt(cursor) : 0;
    const endIndex = startIndex + numItems;
    
    const page = filteredColleges.slice(startIndex, endIndex);
    const isDone = endIndex >= filteredColleges.length;
    const continueCursor = isDone ? null : endIndex.toString();

    return {
      page,
      isDone,
      continueCursor
    };
  },
});

// Get college by ID
export const getCollegeById = query({
  args: { collegeId: v.id("colleges") },
  handler: async (ctx, args) => {
    const college = await ctx.db.get(args.collegeId);
    if (!college) {
      throw new ConvexError({
        message: "College not found",
        code: "NOT_FOUND",
      });
    }
    return college;
  },
});

// Search colleges by course/stream
export const searchCollegesByCourse = query({
  args: {
    stream: v.string(),
    courseName: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const colleges = await ctx.db
      .query("colleges")
      .filter((q) => {
        // Check if college has courses in the specified stream
        return true; // We'll filter in JavaScript since array filtering is complex
      })
      .take(args.limit || 20);

    // Filter colleges that have courses matching the criteria
    return colleges.filter(college => 
      college.courses.some(course => 
        course.stream.toLowerCase() === args.stream.toLowerCase() &&
        (!args.courseName || course.name.toLowerCase().includes(args.courseName.toLowerCase()))
      )
    );
  },
});

// Get nearby colleges (mock implementation - in real app would use coordinates)
export const getNearbyColleges = query({
  args: {
    userLocation: v.string(), // city, state format
    maxDistance: v.optional(v.number()), // in km
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const [userCity, userState] = args.userLocation.split(', ');
    
    // First, get colleges in the same city
    const sameCity = await ctx.db
      .query("colleges")
      .withIndex("by_location")
      .filter((q) => 
        q.and(
          q.eq(q.field("city"), userCity),
          q.eq(q.field("state"), userState)
        )
      )
      .take(args.limit || 10);

    // If not enough colleges in the same city, get from the same state
    if (sameCity.length < (args.limit || 10)) {
      const remaining = (args.limit || 10) - sameCity.length;
      const sameState = await ctx.db
        .query("colleges")
        .filter((q) => 
          q.and(
            q.eq(q.field("state"), userState),
            q.neq(q.field("city"), userCity)
          )
        )
        .take(remaining);
      
      return [...sameCity, ...sameState];
    }

    return sameCity;
  },
});

// Add sample colleges (for development/testing)
export const addSampleColleges = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if colleges already exist
    const existingColleges = await ctx.db.query("colleges").take(1);
    if (existingColleges.length > 0) {
      return "Sample colleges already exist";
    }

    const sampleColleges = [
      {
        name: "Government College of Arts and Science",
        location: "Central District",
        city: "Mumbai",
        state: "Maharashtra",
        type: "Government",
        establishedYear: 1962,
        affiliation: "University of Mumbai",
        courses: [
          { 
            name: "B.A. (English)", 
            stream: "Arts", 
            duration: "3 years", 
            eligibility: "10+2", 
            cutoff: 85, 
            fees: 15000 
          },
          { 
            name: "B.Com", 
            stream: "Commerce", 
            duration: "3 years", 
            eligibility: "10+2", 
            cutoff: 88, 
            fees: 18000 
          },
          { 
            name: "B.Sc. (Mathematics)", 
            stream: "Science", 
            duration: "3 years", 
            eligibility: "10+2 with Science", 
            cutoff: 90, 
            fees: 20000 
          }
        ],
        facilities: ["Library", "Hostel", "Computer Lab", "Sports Complex", "WiFi"],
        contact: {
          phone: "+91 22 1234 5678",
          email: "info@gcas-mumbai.edu.in",
          website: "www.gcas-mumbai.edu.in"
        }
      },
      {
        name: "Dr. A.P.J. Abdul Kalam Government College",
        location: "Tech Park Area",
        city: "Bangalore",
        state: "Karnataka", 
        type: "Government",
        establishedYear: 1995,
        affiliation: "Bangalore University",
        courses: [
          { 
            name: "B.Sc. Computer Science", 
            stream: "Science", 
            duration: "3 years", 
            eligibility: "10+2 with Mathematics", 
            cutoff: 92, 
            fees: 25000 
          },
          { 
            name: "B.Com (Hons)", 
            stream: "Commerce", 
            duration: "3 years", 
            eligibility: "10+2", 
            cutoff: 90, 
            fees: 22000 
          },
          { 
            name: "BBA", 
            stream: "Commerce", 
            duration: "3 years", 
            eligibility: "10+2", 
            cutoff: 87, 
            fees: 28000 
          }
        ],
        facilities: ["Digital Library", "Hostel", "Computer Lab", "Innovation Center", "WiFi", "Canteen"],
        contact: {
          phone: "+91 80 9876 5432",
          email: "admissions@apjgc-blr.edu.in",
          website: "www.apjgc-bangalore.edu.in"
        }
      }
    ];

    for (const college of sampleColleges) {
      await ctx.db.insert("colleges", college);
    }

    return "Sample colleges added successfully";
  },
});