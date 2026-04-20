export function parseSort(sortParam, defaultField = 'createdAt') {
  const raw = sortParam || `-${defaultField}`;
  const field = raw.startsWith('-') ? raw.slice(1) : raw;
  const order = raw.startsWith('-') ? -1 : 1;
  const alias = {
    created_date: 'createdAt',
  };
  const mongoField = alias[field] || field;
  return { [mongoField]: order };
}
