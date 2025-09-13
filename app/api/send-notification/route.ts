import { NextResponse } from 'next/server';

// This would be stored in environment variables in a production environment
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || 'your_account_sid';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || 'your_auth_token';
const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER || '+14155238886'; // Twilio sandbox number
const ADMIN_PHONE_NUMBER = process.env.ADMIN_PHONE_NUMBER || '7416778158';

export async function POST(request: Request) {
  try {
    const { recipientType, phoneNumber, message } = await request.json();
    
    // Validate required fields
    if (!message) {
      return NextResponse.json({ success: false, error: 'Message is required' }, { status: 400 });
    }

    // Determine recipient based on type
    let recipient;
    if (recipientType === 'admin') {
      recipient = ADMIN_PHONE_NUMBER;
    } else if (recipientType === 'customer' && phoneNumber) {
      recipient = phoneNumber;
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid recipient type or missing phone number' },
        { status: 400 }
      );
    }

    // In a production environment, you would use the Twilio SDK
    // const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    // const result = await twilio.messages.create({
    //   from: `whatsapp:${TWILIO_WHATSAPP_NUMBER}`,
    //   to: `whatsapp:${recipient}`,
    //   body: message
    // });

    // For development, we'll simulate a successful response
    console.log(`Notification sent to ${recipientType}:`, {
      recipient,
      message
    });

    return NextResponse.json({ success: true, recipient, message });
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send notification' },
      { status: 500 }
    );
  }
}