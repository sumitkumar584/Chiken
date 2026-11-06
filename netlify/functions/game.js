const { randomInt, randomUUID } = require('node:crypto');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Cache-Control': 'no-store',
  'Content-Type': 'application/json; charset=utf-8'
};
const json = (statusCode, body) => ({ statusCode, headers, body: JSON.stringify(body) });

function aviatorRound() {
  // Simulated demo outcome only. This is not a certified or real-money game engine.
  const value = 1 + Math.pow(randomInt(1, 1000000) / 1000000, 2) * 24;
  return { game: 'aviator', roundId: randomUUID(), crashAt: Number(value.toFixed(2)), simulated: true };
}

function teenPattiRound() {
  const suits = ['♠', '♥', '♦', '♣'];
  const deck = [];
  for (let value = 2; value <= 14; value++) for (const suit of suits) deck.push({ value, suit });
  for (let i = deck.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  const hand = deck.slice(0, 3).sort((a, b) => a.value - b.value);
  const values = hand.map(card => card.value);
  const sameSuit = hand.every(card => card.suit === hand[0].suit);
  const triple = values[0] === values[1] && values[1] === values[2];
  const pair = values[0] === values[1] || values[1] === values[2];
  const sequence = (values[0] + 1 === values[1] && values[1] + 1 === values[2]) || (values.join(',') === '2,3,14');
  let handName = 'High card';
  let payoutMultiplier = 0;
  if (triple) { handName = 'Trail'; payoutMultiplier = 5; }
  else if (sameSuit && sequence) { handName = 'Pure sequence'; payoutMultiplier = 4; }
  else if (sequence) { handName = 'Sequence'; payoutMultiplier = 3; }
  else if (sameSuit) { handName = 'Color'; payoutMultiplier = 2; }
  else if (pair) { handName = 'Pair'; payoutMultiplier = 1.5; }
  return {
    game: 'teenpatti', roundId: randomUUID(), handName, payoutMultiplier,
    cards: hand.map(card => ({ rank: card.value === 14 ? 'A' : card.value === 11 ? 'J' : card.value === 12 ? 'Q' : card.value === 13 ? 'K' : String(card.value), suit: card.suit, color: card.suit === '♥' || card.suit === '♦' ? 'red' : 'black' })),
    simulated: true
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };
  if (event.httpMethod !== 'GET') return json(405, { error: 'Method not allowed' });
  const game = event.queryStringParameters?.game;
  if (game === 'health') return json(200, { ok: true, mode: 'demo', realMoney: false });
  if (game === 'aviator') return json(200, aviatorRound());
  if (game === 'teenpatti') return json(200, teenPattiRound());
  return json(400, { error: 'Choose game=aviator or game=teenpatti.' });
};
