import mongoose, { Document, Schema } from 'mongoose';

export interface IEmailSent extends Document {
  senderEmail: string;
  recipientEmail: string;
  subject: string;
  prospectName: string;
  companyName: string;
  status: 'sent' | 'failed';
  sentAt: Date;
  messageId?: string;
  createdAt: Date;
}

const emailSentSchema = new Schema<IEmailSent>(
  {
    senderEmail: {
      type: String,
      required: true,
      index: true,
    },
    recipientEmail: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    prospectName: {
      type: String,
      default: '',
    },
    companyName: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['sent', 'failed'],
      default: 'sent',
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
    messageId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
emailSentSchema.index({ senderEmail: 1, sentAt: -1 });
emailSentSchema.index({ sentAt: -1 });

export const EmailSent = mongoose.model<IEmailSent>('EmailSent', emailSentSchema);
