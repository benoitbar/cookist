import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  products: defineTable({
    checked: v.optional(v.boolean()),
    name: v.string(),
    note: v.optional(v.string()),
    parent: v.union(v.id('recipes'), v.id('shopping')),
    quantity: v.string(),
  }).index('by_name', ['name']),
  recipes: defineTable({
    name: v.string(),
    unit: v.number(),
  }).index('by_name', ['name']),
  shopping: defineTable({
    name: v.string(),
  }).index('by_name', ['name']),
});
