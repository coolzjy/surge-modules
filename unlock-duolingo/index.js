const body = JSON.parse($response.body);
const responses = body.responses;

for (let i = 0; i < responses.length; i++) {
  const response = responses[i];
  const { status, body: raw } = response;

  if (status !== 200 || raw == null || raw === "" || (!raw.includes("plusStatus") && !raw.includes("subscriberLevel"))) continue;
  
  const body = JSON.parse(raw);

  // enable duolingo plus
  if (body.plusStatus === "FREE") {
    body.plusStatus = "PLUS";
  }

  if (body.subscriberLevel === "FREE") {
    body.subscriberLevel = "PREMIUM"
  }

  // fill timer boost
  if (body.timerBoostConfig != null) {
    body.timerBoostConfig.timerBoosts = 10;
    body.timerBoostConfig.timePerBoost = 120;
  }

  response.body = JSON.stringify(body);
}

$done({ body: JSON.stringify(body) });
