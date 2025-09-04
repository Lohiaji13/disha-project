import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // User profiles and assessment data
  users: defineTable({
    userId: v.string(), // Auth user ID
    name: v.string(),
    email: v.string(),
    age: v.optional(v.number()),
    gender: v.optional(v.string()),
    currentClass: v.optional(v.string()),
    location: v.optional(v.string()),
    phone: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_user_id", ["userId"]),

  // Aptitude assessment results
  assessments: defineTable({
    userId: v.string(),
    type: v.string(), // "aptitude", "interest", "personality"
    questions: v.array(v.object({
      questionId: v.string(),
      answer: v.union(v.string(), v.number()),
    })),
    scores: v.object({
      science: v.number(),
      commerce: v.number(),
      arts: v.number(),
      vocational: v.number(),
    }),
    recommendedStreams: v.array(v.string()),
    completedAt: v.number(),
  }).index("by_user_id", ["userId"]),

  // Government colleges data
  colleges: defineTable({
    name: v.string(),
    location: v.string(),
    city: v.string(),
    state: v.string(),
    type: v.string(), // "government", "aided", "autonomous"
    establishedYear: v.optional(v.number()),
    affiliation: v.optional(v.string()),
    courses: v.array(v.object({
      name: v.string(),
      stream: v.string(), // "science", "commerce", "arts", "vocational"
      duration: v.string(),
      eligibility: v.string(),
      cutoff: v.optional(v.number()),
      fees: v.optional(v.number()),
    })),
    facilities: v.array(v.string()),
    contact: v.object({
      phone: v.optional(v.string()),
      email: v.optional(v.string()),
      website: v.optional(v.string()),
    }),
    coordinates: v.optional(v.object({
      lat: v.number(),
      lng: v.number(),
    })),
  }).index("by_location", ["city", "state"])
    .index("by_stream", ["courses"]),

  // Career paths and course information
  careerPaths: defineTable({
    courseName: v.string(),
    stream: v.string(),
    duration: v.string(),
    eligibility: v.string(),
    description: v.string(),
    careerOptions: v.array(v.object({
      title: v.string(),
      description: v.string(),
      averageSalary: v.optional(v.string()),
      growthProspects: v.string(),
    })),
    higherEducation: v.array(v.object({
      course: v.string(),
      eligibility: v.string(),
      entranceExams: v.array(v.string()),
    })),
    governmentExams: v.array(v.string()),
    skillsRequired: v.array(v.string()),
    industryDemand: v.string(), // "high", "medium", "low"
  }).index("by_stream", ["stream"]),

  // Important dates and notifications
  notifications: defineTable({
    title: v.string(),
    description: v.string(),
    type: v.string(), // "admission", "scholarship", "exam", "counseling"
    date: v.number(),
    endDate: v.optional(v.number()),
    targetAudience: v.array(v.string()), // ["class10", "class12", "undergraduate"]
    priority: v.string(), // "high", "medium", "low"
    link: v.optional(v.string()),
    isActive: v.boolean(),
  }).index("by_date", ["date"])
    .index("by_type", ["type"]),

  // User bookmarks and favorites
  bookmarks: defineTable({
    userId: v.string(),
    itemType: v.string(), // "college", "course", "career"
    itemId: v.string(),
    createdAt: v.number(),
  }).index("by_user_id", ["userId"])
    .index("by_user_and_type", ["userId", "itemType"]),

  // Study materials and resources
  resources: defineTable({
    title: v.string(),
    description: v.string(),
    type: v.string(), // "ebook", "video", "article", "practice_test"
    category: v.string(), // stream or subject
    fileUrl: v.optional(v.id("_storage")),
    externalUrl: v.optional(v.string()),
    tags: v.array(v.string()),
    difficulty: v.string(), // "beginner", "intermediate", "advanced"
    downloadCount: v.number(),
    isApproved: v.boolean(),
  }).index("by_category", ["category"])
    .index("by_type", ["type"]),

  // User progress tracking
  userProgress: defineTable({
    userId: v.string(),
    milestones: v.array(v.object({
      type: v.string(), // "assessment_completed", "college_applied", "course_selected"
      date: v.number(),
      description: v.string(),
    })),
    selectedStream: v.optional(v.string()),
    selectedColleges: v.array(v.string()),
    selectedCourses: v.array(v.string()),
    lastActive: v.number(),
  }).index("by_user_id", ["userId"]),
});