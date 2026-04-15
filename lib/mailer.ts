import { Resend } from "resend";

type BookingEmailArgs = {
  to: string;
  attendeeName: string;
  eventTitle: string;
  ticketCode: string;
};

export async function sendBookingConfirmationEmail({
  to,
  attendeeName,
  eventTitle,
  ticketCode
}: BookingEmailArgs) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject: `Your ticket for ${eventTitle}`,
    html: `<p>Hi ${attendeeName},</p><p>Your booking is confirmed for <strong>${eventTitle}</strong>.</p><p>Ticket code: <strong>${ticketCode}</strong></p>`
  });
}
