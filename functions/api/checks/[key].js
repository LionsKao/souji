const KEY_RE = /^\d{4}-\d{2}$/;
const FIELD_RE = /^[\w.-]+-\d{1,2}$/;

export async function onRequestGet({ params, env }) {
  const key = params.key;
  if (!KEY_RE.test(key)) {
    return new Response('invalid key', { status: 400 });
  }
  const { results } = await env.DB.prepare(
    'SELECT field_key FROM checks WHERE month_key = ? AND value = 1'
  ).bind(key).all();

  const data = {};
  for (const row of results) data[row.field_key] = true;
  return Response.json(data);
}

export async function onRequestPost({ params, env, request }) {
  const key = params.key;
  if (!KEY_RE.test(key)) {
    return new Response('invalid key', { status: 400 });
  }
  const body = await request.json();
  const fieldKey = body.fieldKey;
  const value = !!body.value;
  if (typeof fieldKey !== 'string' || !FIELD_RE.test(fieldKey)) {
    return new Response('invalid fieldKey', { status: 400 });
  }

  if (value) {
    await env.DB.prepare(
      'INSERT INTO checks (month_key, field_key, value) VALUES (?, ?, 1) ' +
      'ON CONFLICT(month_key, field_key) DO UPDATE SET value = 1'
    ).bind(key, fieldKey).run();
  } else {
    await env.DB.prepare(
      'DELETE FROM checks WHERE month_key = ? AND field_key = ?'
    ).bind(key, fieldKey).run();
  }

  return Response.json({ ok: true });
}
