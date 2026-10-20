import mongoose from 'mongoose';
import dns from 'node:dns';

export async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is missing. Add it to your environment variables.');
  }

  // Optional local workaround for networks whose DNS proxy blocks Atlas SRV lookups.
  const dnsServers = process.env.MONGODB_DNS_SERVERS
    ?.split(',')
    .map((server) => server.trim())
    .filter(Boolean);
  if (dnsServers?.length) dns.setServers(dnsServers);

  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
}
