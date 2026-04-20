import mongoose from 'mongoose';

function resolveMongoUri() {
  const useLocal =
    process.env.USE_LOCAL_MONGO === 'true' || process.env.USE_LOCAL_MONGO === '1';
  if (useLocal) {
    return (process.env.MONGODB_URI_LOCAL || 'mongodb://127.0.0.1:27017/littlestars').trim();
  }
  return process.env.MONGODB_URI?.trim();
}

export async function disconnectDB() {
  await mongoose.disconnect().catch(() => {});
}

export async function connectDB() {
  const uri = resolveMongoUri();
  if (!uri) {
    throw new Error(
      'Set MONGODB_URI in backend/.env, or USE_LOCAL_MONGO=1 for local Mongo (docker compose up -d). See .env.example.'
    );
  }

  mongoose.set('strictQuery', true);
  if (process.env.USE_LOCAL_MONGO === 'true' || process.env.USE_LOCAL_MONGO === '1') {
    console.log('Using local MongoDB:', uri.replace(/:[^:@/]+@/, ':****@'));
  }
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15_000,
      // Prefer IPv4 — on some Windows networks IPv6 to Atlas fails (ReplicaSetNoPrimary, etc.).
      family: 4,
      maxPoolSize: 10,
    });
    const host = mongoose.connection.host || 'atlas';
    console.log('MongoDB connected (' + host + ')');
  } catch (err) {
    console.error('\n--- MongoDB connection failed ---');
    if (uri.includes('mongodb.net')) {
      console.error(
        'Atlas: Security → Network Access must allow connections from your network.\n' +
          '  Use "Add Current IP Address", or for dev-only testing 0.0.0.0/0 (never use in production).\n' +
          '  Also verify Database Access user/password and that the URI includes the DB name, e.g. .../littlestars?...\n'
      );
    } else {
      console.error(
        'Check that MongoDB is running and the URI is correct. For Docker: from project root run `docker compose up -d` and set USE_LOCAL_MONGO=1 in backend/.env.\n'
      );
    }
    throw err;
  }
}
