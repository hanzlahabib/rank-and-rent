import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER!;
const ownerPhone = process.env.OWNER_PHONE_NUMBER!;
const ownerEmail = process.env.OWNER_EMAIL!;

let _client: twilio.Twilio | null = null;

function getClient() {
  if (!_client) {
    if (!accountSid || !authToken) {
      throw new Error("Twilio credentials not configured");
    }
    _client = twilio(accountSid, authToken);
  }
  return _client;
}

export interface LeadNotificationData {
  name: string;
  phone: string;
  email: string;
  service: string;
  siteSlug: string;
  message?: string;
}

/**
 * Send SMS notification to site owner when a new lead comes in.
 */
export async function sendLeadSmsNotification(lead: LeadNotificationData) {
  const client = getClient();

  const smsBody = [
    `NEW LEAD from ${lead.siteSlug}`,
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Service: ${lead.service || "Not specified"}`,
    lead.message ? `Message: ${lead.message}` : "",
    `Reply CALL to auto-dial this lead.`,
  ]
    .filter(Boolean)
    .join("\n");

  const message = await client.messages.create({
    body: smsBody,
    from: twilioPhone,
    to: ownerPhone,
  });

  return { sid: message.sid, status: message.status };
}

/**
 * Generate TwiML for inbound call handling.
 * Routes to a tracking flow: greeting → record → notify.
 */
export function generateInboundCallTwiml(siteSlug: string) {
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const response = new VoiceResponse();

  response.say(
    { voice: "Polly.Matthew", language: "en-US" },
    "Thank you for calling Henderson EV Charger Pros. " +
      "Your call is important to us. Please hold while we connect you."
  );

  // Forward to owner's phone
  const dial = response.dial({
    callerId: twilioPhone,
    timeout: 30,
    record: "record-from-answer-dual",
    recordingStatusCallback: `/api/webhooks/twilio/recording?site=${siteSlug}`,
    recordingStatusCallbackMethod: "POST",
    action: `/api/webhooks/twilio/call-status?site=${siteSlug}`,
    method: "POST",
  });
  dial.number(ownerPhone);

  // If no answer, go to voicemail
  return response.toString();
}

/**
 * Generate TwiML for voicemail when owner doesn't answer.
 */
export function generateVoicemailTwiml() {
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const response = new VoiceResponse();

  response.say(
    { voice: "Polly.Matthew", language: "en-US" },
    "We are sorry we missed your call. " +
      "Please leave your name, number, and a brief message " +
      "and we will get back to you within 30 minutes."
  );

  response.record({
    maxLength: 120,
    transcribe: true,
    transcribeCallback: "/api/webhooks/twilio/transcription",
    action: "/api/webhooks/twilio/recording-complete",
    method: "POST",
  });

  return response.toString();
}

/**
 * Initiate an outbound call to a contractor with AI pitch.
 */
export async function initiateOutboundCall(
  contractorPhone: string,
  contractorName: string,
  siteSlug: string
) {
  const client = getClient();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://hendersonevcharger.com";

  const call = await client.calls.create({
    to: contractorPhone,
    from: twilioPhone,
    url: `${baseUrl}/api/outbound/twiml?name=${encodeURIComponent(contractorName)}&site=${siteSlug}`,
    statusCallback: `${baseUrl}/api/outbound/status`,
    statusCallbackEvent: ["initiated", "ringing", "answered", "completed"],
    statusCallbackMethod: "POST",
    record: true,
  });

  return { callSid: call.sid, status: call.status };
}

/**
 * Generate TwiML for outbound contractor pitch call.
 */
export function generateOutboundPitchTwiml(contractorName: string, siteSlug: string) {
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const response = new VoiceResponse();

  response.say(
    { voice: "Polly.Matthew", language: "en-US" },
    `Hi ${contractorName}, this is a message from Henderson EV Charger Pros. ` +
      `We generate exclusive EV charger installation leads in Henderson, Nevada. ` +
      `We currently have qualified homeowners looking for installation services. ` +
      `If you are interested in receiving exclusive leads for your business, ` +
      `press 1 to speak with our team, or press 2 if you are not interested.`
  );

  const gather = response.gather({
    numDigits: 1,
    action: `/api/outbound/response?name=${encodeURIComponent(contractorName)}&site=${siteSlug}`,
    method: "POST",
    timeout: 10,
  });

  gather.say(
    { voice: "Polly.Matthew" },
    "Press 1 to learn more, or press 2 to opt out."
  );

  // If no input, repeat
  response.say(
    { voice: "Polly.Matthew" },
    "We did not receive your response. Thank you for your time. Goodbye."
  );

  return response.toString();
}

export { twilioPhone, ownerPhone, ownerEmail };
