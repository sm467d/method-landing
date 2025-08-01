import { NextResponse } from 'next/server';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let client: any = null;

  try {
    const body = await request.json();
    const { email } = body;

    // Validate email format
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Get environment variables
    const dbName = process.env.WAITLIST_DB;
    const collectionName = process.env.WAITLIST_COLLECTION;
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';

    if (!dbName || !collectionName) {
      console.error('Database configuration missing');
      // Silent fail - return success to user
      return NextResponse.json({ success: true });
    }

    // Dynamically import MongoDB to avoid build issues
    try {
      const { MongoClient } = await import('mongodb');
      client = new MongoClient(mongoUri);
      await client.connect();
    } catch (importError) {
      console.error('MongoDB import failed:', importError);
      return NextResponse.json({ success: true });
    }

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Check if email already exists
    const existingEntry = await collection.findOne({ email: email.toLowerCase() });
    
    if (existingEntry) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist' },
        { status: 400 }
      );
    }

    // Insert new signup
    await collection.insertOne({
      email: email.toLowerCase(),
      signupDate: new Date(),
      source: 'landing_page'
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Waitlist signup error:', error);
    // Silent fail for any other errors
    return NextResponse.json({ success: true });
  } finally {
    // Clean up database connection
    if (client) {
      await client.close();
    }
  }
}