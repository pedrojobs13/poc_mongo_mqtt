import dotenv from 'dotenv';
dotenv.config();

const { MONGODB_URI, MONGODB_DATABASE } = process.env;

if (!MONGODB_URI || !MONGODB_DATABASE) {
    throw new Error('Environment variables MONGODB_URI and MONGODB_DATABASE are required.');
}

import { MongoClient, ServerApiVersion } from 'mongodb';

const client = new MongoClient(MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

try {
    await client.connect();
    await client.db(MONGODB_DATABASE).command({ ping: 1 });
    console.log('Connected to MongoDB successfully.');
} catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
}

export const db = client.db(MONGODB_DATABASE);
