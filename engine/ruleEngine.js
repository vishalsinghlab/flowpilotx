const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalize = (text) => text?.trim().toUpperCase();

const processRules = (user, text) => {
  const input = normalize(text);

  // =========================
  // GLOBAL TRIGGERS (work anytime)
  // =========================
  if (input === "PRICING") {
    return { action: "PRICING" };
  }

  if (input === "DEMO") {
    return { action: "DEMO" };
  }

  if (input === "INFO") {
    return {
      action: "ASK_EMAIL",
      state: "WAITING_EMAIL",
    };
  }

  if (input === "SUPPORT") return { action: "SUPPORT" };

  if (input === "OFFERS") return { action: "OFFERS" };

  // =========================
  // STATE-BASED FLOW
  // =========================
  if (user.state === "WAITING_EMAIL") {
    if (emailRegex.test(text)) {
      return {
        action: "SUBSCRIBE",
        state: "SUBSCRIBED",
        email: text,
      };
    }

    // invalid email case
    return {
      action: "INVALID_EMAIL",
    };
  }

  // =========================
  // DEFAULT FALLBACK
  // =========================
  return {
    action: "DEFAULT",
  };
};

module.exports = { processRules };
