const body = JSON.parse($response.body);
const responses = body.responses;

for (let i = 0; i < responses.length; i++) {
  const response = responses[i];
  const { status, body: raw } = response;

  if (status !== 200 || raw == null || raw === "") continue;

  const body = JSON.parse(raw);

  if (body.plusStatus === "FREE") {
    body.plusStatus = "PLUS";
  }

  if (Array.isArray(body.privacySettings)) {
    body.privacySettings = [];
  }

  if (body.timerBoostConfig != null) {
    body.timerBoostConfig.timerBoosts = 10;
  }

  response.body = JSON.stringify(body);
}

$done({ body: JSON.stringify(body) });
