import { Gateway, RecoverySequence } from "@prisma/client";

export interface GatewayStatus {
  gateway: Gateway;
  isActive: boolean;
  paymentAccountId: string | null;
}

export interface RecoverySequenceWithBrand extends RecoverySequence {
  brand: {
    name: string;
    brandVoice: string;
  };
  subscriber: {
    name: string;
    email: string;
  };
}

export interface EmailVariant {
  subject: string;
  body: string;
}

export interface GeneratedCopies {
  day1: EmailVariant;
  day3: EmailVariant;
  day7: EmailVariant;
}

export interface EmailCopiesStack {
  sequenceId: string;
  variants: Array<{ dayVariant: number; variant: EmailVariant }>;
}
