// pages/api/generate.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { secteur = "marketing", ton = "professionnel" } = req.body || {};
  const prompt = `
Tu aides un freelance ou une agence en ${secteur} à faire de la prospection B2B.

Génère pour lui :
- une séquence de 4 emails de prospection
- un message d'approche LinkedIn + 1 relance courte
- le texte d'une mini-page de vente (titre, sous-titre, bénéfices, preuve sociale, appel à l'action)

Le ton doit être : ${ton}.

IMPORTANT : respecte STRICTEMENT le format SUIVANT, sans texte avant ni après, sans explication, sans markdown :

[EMAILS]
Email 1 - Sujet:
...
Corps:
...

---
Email 2 - Sujet:
...
Corps:
...

---
Email 3 - Sujet:
...
Corps:
...

---
Email 4 - Sujet:
...
Corps:
...

[LINKEDIN]
Message principal:
...

Relance:
...

[PAGE]
Titre:
...
Sous-titre:
...
Benefices:
- ...
- ...
Preuve sociale:
...
Appel a l'action:
...

Ne rajoute rien d'autre en dehors de ces sections et de ces balises [EMAILS], [LINKEDIN], [PAGE].`;
  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });
    if (!r.ok) {
      const text = await r.text();
      return res.status(r.status).json({ error: "OpenAI error", details: text });
    }
    const data = await r.json();
    const text = data?.choices?.[0]?.message?.content || "";
    return res.status(200).json({ result: text });
  } catch (e) {
    return res.status(500).json({ error: "Server error", details: String(e) });
  }
}
