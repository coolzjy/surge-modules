const body = JSON.parse($response.body);
const responses = body.responses;

for (let i = 0; i < responses.length; i++) {
  const response = responses[i];
  const { status, body: raw } = response;

  if (status !== 200 || raw == null || raw === "" || !raw.includes("plusStatus")) continue;
  
  const body = JSON.parse(raw);

  // enable duolingo plus
  if (body.plusStatus === "FREE") {
    body.plusStatus = "PLUS";
  }

  // enable unlimit hearts
  if (body.health != null) {
    body.health.unlimitedHeartsAvailable = true
  }

  // fill timer boost
  if (body.timerBoostConfig != null) {
    body.timerBoostConfig.timerBoosts = 1;
    body.timerBoostConfig.timePerBoost = 120;
  }

  response.body = JSON.stringify(body);
}

$done({ body: JSON.stringify(body) });
