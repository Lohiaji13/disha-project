import { query, mutation } from "./_generated/server";
import { ConvexError } from "convex/values";
import { v } from "convex/values";
import { api } from "./_generated/api";

// Get or create user profile
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        message: "User not authenticated",
        code: "UNAUTHENTICATED",
      });
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), identity.tokenIdentifier))
      .first();

    return user;
  },
});

// Create user profile (separate mutation)
export const createUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        message: "User not authenticated",
        code: "UNAUTHENTICATED",
      });
    }

    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), identity.tokenIdentifier))
      .first();

    if (existingUser) {
      return existingUser;
    }

    // Create new user profile
    const newUserId = await ctx.db.insert("users", {
      userId: identity.tokenIdentifier,
      name: identity.name || "",
      email: identity.email || "",
      createdAt: Date.now(),
    });

    return await ctx.db.get(newUserId);
  },
});

// Update user profile
export const updateProfile = mutation({
  args: {
    name: v.optional(v.string()),
    age: v.optional(v.number()),
    gender: v.optional(v.string()),
    currentClass: v.optional(v.string()),
    location: v.optional(v.string()),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        message: "User not authenticated",
        code: "UNAUTHENTICATED",
      });
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), identity.tokenIdentifier))
      .first();

    if (!user) {
      throw new ConvexError({
        message: "User profile not found",
        code: "NOT_FOUND",
      });
    }

    // Update user profile with provided fields
    const updateData: Record<string, unknown> = {};
    if (args.name !== undefined) updateData.name = args.name;
    if (args.age !== undefined) updateData.age = args.age;
    if (args.gender !== undefined) updateData.gender = args.gender;
    if (args.currentClass !== undefined) updateData.currentClass = args.currentClass;
    if (args.location !== undefined) updateData.location = args.location;
    if (args.phone !== undefined) updateData.phone = args.phone;

    await ctx.db.patch(user._id, updateData);

    return await ctx.db.get(user._id);
  },
});

// Get user progress
export const getUserProgress = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const progress = await ctx.db
      .query("userProgress")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), identity.tokenIdentifier))
      .first();

    return progress;
  },
});

// Update user progress
export const updateProgress = mutation({
  args: {
    milestoneType: v.string(),
    description: v.string(),
    selectedStream: v.optional(v.string()),
    selectedColleges: v.optional(v.array(v.string())),
    selectedCourses: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        message: "User not authenticated",
        code: "UNAUTHENTICATED",
      });
    }

    const existingProgress = await ctx.db
      .query("userProgress")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), identity.tokenIdentifier))
      .first();

    const newMilestone = {
      type: args.milestoneType,
      date: Date.now(),
      description: args.description,
    };

    if (existingProgress) {
      // Update existing progress
      const updatedMilestones = [...existingProgress.milestones, newMilestone];
      const updateData: Record<string, unknown> = {
        milestones: updatedMilestones,
        lastActive: Date.now(),
      };

      if (args.selectedStream !== undefined) {
        updateData.selectedStream = args.selectedStream;
      }
      if (args.selectedColleges !== undefined) {
        updateData.selectedColleges = args.selectedColleges;
      }
      if (args.selectedCourses !== undefined) {
        updateData.selectedCourses = args.selectedCourses;
      }

      await ctx.db.patch(existingProgress._id, updateData);
      return await ctx.db.get(existingProgress._id);
    } else {
      // Create new progress record
      const progressId = await ctx.db.insert("userProgress", {
        userId: identity.tokenIdentifier,
        milestones: [newMilestone],
        selectedStream: args.selectedStream,
        selectedColleges: args.selectedColleges || [],
        selectedCourses: args.selectedCourses || [],
        lastActive: Date.now(),
      });

      return await ctx.db.get(progressId);
    }
  },
});