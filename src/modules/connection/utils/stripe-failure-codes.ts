type FailureReason =
  | "CARD_DECLINED"
  | "INSUFFICIENT_FUNDS"
  | "EXPIRED_CARD"
  | "INCORRECT_CVC"
  | "PROCESSING_ERROR"
  | "DO_NOT_HONOR"
  | "UNKNOWN";

export const mapStripeFailureCode = (code: string | null): FailureReason => {
  const map: Record<string, FailureReason> = {
    card_declined: "CARD_DECLINED",
    insufficient_funds: "INSUFFICIENT_FUNDS",
    expired_card: "EXPIRED_CARD",
    incorrect_cvc: "INCORRECT_CVC",
    processing_error: "PROCESSING_ERROR",
    do_not_honor: "DO_NOT_HONOR",
  };
  return map[code ?? ""] ?? "UNKNOWN";
};
