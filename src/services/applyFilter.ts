import { Filter } from "./types";

export function applyFilter<T>(query: any, filter?: Filter): any {
  if (!filter) return query;

  const { field, value, method = "eq" } = filter;

  switch (method) {
    case "eq":
      return query.eq(field, value);
    case "neq":
      return query.neq(field, value);
    case "gt":
      return query.gt(field, value);
    case "lt":
      return query.lt(field, value);
    case "gte":
      return query.gte(field, value);
    case "lte":
      return query.lte(field, value);
    case "like":
      return query.like(field, value);
    case "ilike":
      return query.ilike(field, value);
    default:
      throw new Error(`Unsupported filter method: ${method}`);
  }
}
