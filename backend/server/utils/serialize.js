export function serialize(doc) {
  if (doc == null) return null;
  const o = typeof doc.toObject === 'function' ? doc.toObject() : { ...doc };
  if (o._id) {
    o.id = o._id.toString();
    delete o._id;
  }
  delete o.__v;
  if (o.passwordHash != null) delete o.passwordHash;
  if (o.createdAt) o.created_date = o.createdAt.toISOString();
  if (o.updatedAt) o.updated_date = o.updatedAt.toISOString();
  return o;
}

export function serializeMany(docs) {
  return docs.map((d) => serialize(d));
}
