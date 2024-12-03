const { body } = $request

const parsedBody = JSON.parse(body)

parsedBody.hasBoost = true
parsedBody.xpBoostMultiplier = 3

$done({ body: JSON.stringify(parsedBody) })
