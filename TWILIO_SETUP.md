# Setting Up Twilio WhatsApp Notifications

This document provides instructions for setting up automated WhatsApp notifications using Twilio for Soma Scents e-commerce website.

## Prerequisites

1. A Twilio account (Sign up at [twilio.com](https://www.twilio.com))
2. WhatsApp Business API access through Twilio
3. Node.js and npm installed

## Setup Instructions

### 1. Create a Twilio Account

- Sign up for a Twilio account at [twilio.com](https://www.twilio.com)
- Navigate to the Twilio Console and note your Account SID and Auth Token

### 2. Set Up WhatsApp Sandbox

- In the Twilio Console, navigate to Messaging > Try it out > Send a WhatsApp message
- Follow the instructions to join your WhatsApp Sandbox
- Note your Twilio WhatsApp number

### 3. Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=your_twilio_whatsapp_number
ADMIN_PHONE_NUMBER=your_admin_phone_number
```

### 4. Install Twilio SDK

Run the following command to install the Twilio SDK:

```bash
npm install twilio
```

### 5. Update API Route

Update the `app/api/send-notification/route.ts` file to use the Twilio SDK instead of the simulation:

```typescript
import { NextResponse } from 'next/server';
import twilio from 'twilio';

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || 'your_account_sid';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || 'your_auth_token';
const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER || '+14155238886';
const ADMIN_PHONE_NUMBER = process.env.ADMIN_PHONE_NUMBER || '7416778158';

export async function POST(request: Request) {
  try {
    const { recipientType, phoneNumber, message } = await request.json();
    
    if (!message) {
      return NextResponse.json({ success: false, error: 'Message is required' }, { status: 400 });
    }

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

    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    const result = await client.messages.create({
      from: `whatsapp:${TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${recipient}`,
      body: message
    });

    return NextResponse.json({ success: true, messageId: result.sid });
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send notification' },
      { status: 500 }
    );
  }
}
```

## Testing

1. Make sure your WhatsApp number is connected to the Twilio Sandbox
2. Fill out the checkout form with your WhatsApp number
3. Submit the form and check for notifications

## Production Considerations

1. For production, you'll need to apply for a WhatsApp Business API account through Twilio
2. Set up proper error handling and logging
3. Implement message templates for WhatsApp Business API compliance
4. Consider implementing a queue system for high-volume scenarios

## Additional Resources

- [Twilio WhatsApp API Documentation](https://www.twilio.com/docs/whatsapp/api)
- [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp/api/)
- [Next.js API Routes Documentation](https://nextjs.org/docs/api-routes/introduction)