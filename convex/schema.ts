import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  products: defineTable({
    checked: v.optional(v.boolean()),
    color: v.optional(v.string()),
    name: v.string(),
    note: v.optional(v.string()),
    parent: v.union(v.id('recipes'), v.id('shopping')),
    quantity: v.string(),
  }),
  recipes: defineTable({
    name: v.string(),
    unit: v.number(),
  }),
  shopping: defineTable({
    name: v.string(),
  }),
});
