import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

export const getCollection = query({
  args: { parent: v.union(v.id('recipes'), v.id('shopping')) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('products')
      .withIndex('by_name', q => q)
      .filter(q => q.eq(q.field('parent'), args.parent))
      .collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    note: v.optional(v.string()),
    parent: v.union(v.id('recipes'), v.id('shopping')),
    quantity: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('products', args);
  },
});

export const update = mutation({
  args: {
    _id: v.id('products'),
    name: v.optional(v.string()),
    note: v.optional(v.string()),
    quantity: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { _id, ...values } = args;
    return await ctx.db.patch(_id, values);
  },
});

export const remove = mutation({
  args: { _id: v.id('products') },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args._id);
  },
});
