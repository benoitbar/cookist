import { v } from 'convex/values';

import { mutation, query } from './_generated/server';
import { colorLocaleSort } from './utils';

export const getCollection = query({
  args: { parent: v.union(v.id('recipes'), v.id('shopping')) },
  handler: async (ctx, args) => {
    const data = await ctx.db
      .query('products')
      .filter(q => q.eq(q.field('parent'), args.parent))
      .collect();
    return colorLocaleSort(data);
  },
});

export const create = mutation({
  args: {
    checked: v.optional(v.boolean()),
    color: v.optional(v.string()),
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
    checked: v.optional(v.boolean()),
    color: v.optional(v.string()),
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

export const removeBulk = mutation({
  args: { ids: v.array(v.id('products')) },
  handler: async (ctx, args) => {
    return await Promise.allSettled(
      args.ids.map(async id => await ctx.db.delete(id))
    );
  },
});
