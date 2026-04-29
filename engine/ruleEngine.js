const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const processRules = (user, text) => {
  if (text === "INFO") {
    return {
      action: "ASK_EMAIL",
      state: "WAITING_EMAIL",
    };
  }

  if (user.state === "WAITING_EMAIL" && emailRegex.test(text)) {
    return {
      action: "SUBSCRIBE",
      state: "SUBSCRIBED",
      email: text,
    };
  }

  return {
    action: "DEFAULT",
  };
};

module.exports = { processRules };
