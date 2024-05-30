import { v } from 'convex/values';

import { mutation, query } from './_generated/server';
import { localeSort } from './utils';

export const getCollection = query({
  args: {},
  handler: async ctx => {
    const data = await ctx.db.query('recipes').collect();
    return localeSort(data);
  },
});

export const get = query({
  args: { id: v.id('recipes') },
  handler: async (ctx, args) => {
    const response = await Promise.all([
      ctx.db.get(args.id),
      ctx.db
        .query('products')
        .filter(q => q.eq(q.field('parent'), args.id))
        .collect(),
    ]);

    return response[0]
      ? { ...response[0], products: localeSort(response[1]) }
      : null;
  },
});

export const create = mutation({
  args: { name: v.string(), unit: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db.insert('recipes', args);
  },
});

export const update = mutation({
  args: {
    _id: v.id('recipes'),
    name: v.optional(v.string()),
    unit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { _id, ...values } = args;
    return await ctx.db.patch(_id, values);
  },
});

export const remove = mutation({
  args: { _id: v.id('recipes') },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args._id);
  },
});
