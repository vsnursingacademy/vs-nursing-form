// ✅ Correct runtime value for Vercel
export const config = {
  runtime: 'nodejs',
};

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return res.status(500).send('Missing Telegram credentials');
    }

    const {
      name = '',
      phone = '',
      email = '',
      exam = '',
      status = '',
      counselling = '',
      queryType = '',
      guidance = '',
      contact = '',
    } = req.body || {};

    const text = [
      '🩺 *New Guidance Form Submission*',
      '',
      `👤 Name: ${name}`,
      `📞 Phone: ${phone}`,
      email ? `✉️ Email: ${email}` : '',
      `📘 Exam: ${exam}`,
      `🎓 Status: ${status}`,
      counselling ? `💬 Counselling: ${counselling}` : '',
      `🧩 Query Type: ${queryType}`,
      guidance ? `🗒 Guidance: ${guidance}` : '',
      contact ? `📱 Contact Method: ${contact}` : '',
      '',
      '© VS Nursing Academy'
    ].filter(Boolean).join('\n');

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const tgRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    });

    if (!tgRes.ok) {
      const errText = await tgRes.text();
      return res.status(500).send('Telegram error: ' + errText);
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).send(e.message || 'Error');
  }
}
