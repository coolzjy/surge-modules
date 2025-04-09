const body = JSON.parse($response.body);
const responses = body.responses;

for (let i = 0; i < responses.length; i++) {
  const response = responses[i];
  const { status, body: raw } = response;

  if (status !== 200 || raw == null || raw === "" || !raw.includes("subscriberLevel")) continue;

  // enable duolingo plus
  response.body = raw.replace('FREE', 'PREMIUM')
}

$done({ body: JSON.stringify(body) });
