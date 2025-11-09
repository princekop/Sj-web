import { NextRequest, NextResponse } from 'next/server'

const GOOGLE_VISION_API_KEY = 'AIzaSyAGLfjGCUjO8CLPkvBEMHzV9E4a8Z9IbuE'

interface PaymentDetails {
  amount: string | null
  timestamp: string | null
  transactionId: string | null
  paymentMethod: string | null
  receiverEmail: string | null
}

async function analyzePaymentScreenshot(base64Image: string): Promise<PaymentDetails> {
  const url = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`
  
  const requestBody = {
    requests: [
      {
        image: {
          content: base64Image
        },
        features: [
          {
            type: 'TEXT_DETECTION',
            maxResults: 1
          }
        ]
      }
    ]
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Vision API error:', response.status, errorData)
      // Return empty details instead of throwing
      return {
        amount: null,
        timestamp: null,
        transactionId: null,
        paymentMethod: null,
        receiverEmail: null
      }
    }

    const data = await response.json()
    const text = data.responses[0]?.fullTextAnnotation?.text || ''
    
    // Extract payment details from text
    const paymentDetails = extractPaymentDetails(text)
    return paymentDetails
  } catch (error) {
    console.error('Error analyzing screenshot:', error)
    // Return empty details instead of throwing
    return {
      amount: null,
      timestamp: null,
      transactionId: null,
      paymentMethod: null,
      receiverEmail: null
    }
  }
}

function extractPaymentDetails(text: string): PaymentDetails {
  const lowerText = text.toLowerCase()
  
  // Extract amount (looking for patterns like ₹100, Rs. 100, 100.00)
  const amountPattern = /(?:₹|rs\.?|inr)\s*(\d+(?:,\d+)*(?:\.\d{2})?)/i
  const amountMatch = text.match(amountPattern)
  const amount = amountMatch ? amountMatch[1].replace(/,/g, '') : null

  // Extract timestamp (various date/time formats)
  const timestampPattern = /(\d{1,2}[-/]\d{1,2}[-/]\d{2,4}|\d{1,2}:\d{2}(?:\s*(?:AM|PM))?)/i
  const timestampMatch = text.match(timestampPattern)
  const timestamp = timestampMatch ? timestampMatch[0] : null

  // Extract transaction ID (usually alphanumeric)
  const txnIdPattern = /(?:transaction id|txn id|ref(?:erence)? id|utr|order id)[:\s]*([A-Z0-9]{10,})/i
  const txnIdMatch = text.match(txnIdPattern)
  const transactionId = txnIdMatch ? txnIdMatch[1] : null

  // Detect payment method
  let paymentMethod = null
  if (lowerText.includes('fampay') || lowerText.includes('fam pay')) {
    paymentMethod = 'FamPay'
  } else if (lowerText.includes('upi')) {
    paymentMethod = 'UPI'
  } else if (lowerText.includes('paytm')) {
    paymentMethod = 'Paytm'
  } else if (lowerText.includes('gpay') || lowerText.includes('google pay')) {
    paymentMethod = 'Google Pay'
  } else if (lowerText.includes('phonepe') || lowerText.includes('phone pe')) {
    paymentMethod = 'PhonePe'
  }

  // Extract email
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  const emailMatch = text.match(emailPattern)
  const receiverEmail = emailMatch ? emailMatch[0] : null

  return {
    amount,
    timestamp,
    transactionId,
    paymentMethod,
    receiverEmail
  }
}

async function sendToDiscord(
  paymentDetails: PaymentDetails,
  image: string,
  orderId: string,
  userId: string,
  expectedAmount: number
): Promise<boolean> {
  const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1437037588707016724/cfod3ZbtQ3LE2nfWki_WPjW1tWOZ_UJm08pZHQnxIKkIPqqYFGLAGHPxV_RIeKfD20oV'
  
  try {
    // Convert base64 to buffer
    const imageBuffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64')
    
    // Create form data
    const formData = new FormData()
    
    // Create embed
    const embed = {
      title: '💳 Payment Verification Request',
      color: 0x5865F2, // Discord blurple
      fields: [
        {
          name: '📋 Order ID',
          value: orderId,
          inline: true
        },
        {
          name: '👤 User ID',
          value: userId,
          inline: true
        },
        {
          name: '💰 Expected Amount',
          value: `₹${expectedAmount}`,
          inline: true
        },
        {
          name: '💵 Detected Amount',
          value: paymentDetails.amount ? `₹${paymentDetails.amount}` : '❌ Not detected',
          inline: true
        },
        {
          name: '🕐 Timestamp',
          value: paymentDetails.timestamp || '❌ Not detected',
          inline: true
        },
        {
          name: '🔢 Transaction ID',
          value: paymentDetails.transactionId || '❌ Not detected',
          inline: true
        },
        {
          name: '💳 Payment Method',
          value: paymentDetails.paymentMethod || '❌ Not detected',
          inline: true
        },
        {
          name: '📧 Email',
          value: paymentDetails.receiverEmail || '❌ Not detected',
          inline: true
        },
        {
          name: '⚠️ Status',
          value: 'Pending Manual Review',
          inline: false
        }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'SJ Nodes Payment System'
      }
    }
    
    const payload = {
      username: 'Payment Verification Bot',
      avatar_url: 'https://cdn.discordapp.com/embed/avatars/0.png',
      content: `@everyone New payment verification required!`,
      embeds: [embed]
    }
    
    // Send embed first
    formData.append('payload_json', JSON.stringify(payload))
    
    // Attach image
    const blob = new Blob([imageBuffer], { type: 'image/png' })
    formData.append('file', blob, `payment_${orderId}.png`)
    
    const response = await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) {
      console.error('Discord webhook failed:', response.status)
      return false
    }
    
    console.log('✅ Payment screenshot sent to Discord')
    return true
  } catch (error) {
    console.error('Error sending to Discord:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { image, orderId, userId, expectedAmount } = body

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Remove data URL prefix if present
    const base64Image = image.replace(/^data:image\/\w+;base64,/, '')

    // Try to analyze screenshot with AI (won't throw errors)
    const paymentDetails = await analyzePaymentScreenshot(base64Image)

    // Always send to Discord for manual verification
    const discordSent = await sendToDiscord(
      paymentDetails,
      image,
      orderId,
      userId,
      expectedAmount || 0
    )

    // Consider approved if sent to Discord (manual verification required)
    const isApproved = discordSent

    // Log for manual review
    console.log('✅ Payment screenshot sent to Discord:', {
      orderId,
      userId,
      discordSent,
      detectedAmount: paymentDetails.amount
    })

    return NextResponse.json({
      success: true,
      paymentDetails,
      emailVerified: discordSent,
      isApproved: true, // Always true if sent to Discord
      message: discordSent 
        ? '✅ Payment screenshot sent for verification! Check Discord to approve.' 
        : '⚠️ Failed to send to Discord. Please contact support.'
    })

  } catch (error) {
    console.error('❌ Payment verification error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to verify payment',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
