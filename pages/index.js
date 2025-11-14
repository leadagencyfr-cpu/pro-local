// pages/index.js
import { useState } from "react";

function CheckIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M20 6 9 17l-5-5"
        stroke="#16a34a"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function parseStructuredResult(text) {
  const extract = (start, end) => {
    const s = text.indexOf(start);
    if (s === -1) return "";
    const from = s + start.length;
    if (!end) return text.slice(from).trim();
    const e = text.indexOf(end, from);
    return (e === -1 ? text.slice(from) : text.slice(from, e)).trim();
  };

  const emails = extract("[EMAILS]", "[LINKEDIN]");
  const linkedin = extract("[LINKEDIN]", "[PAGE]");
  const page = extract("[PAGE]", null);

  return { emails, linkedin, page };
}

function extractFirstEmail(emailsText) {
  if (!emailsText) return "";
  const parts = emailsText.split(/---+/);
  return (parts[0] || emailsText).trim();
}

export default function Home() {
  const [secteur, setSecteur] = useState("");
  const [ton, setTon] = useState("professionnel");
  const [rawResult, setRawResult] = useState("");
  const [structured, setStructured] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("emails");
  const [copyMsg, setCopyMsg] = useState("");

  const handleCopy = async (type) => {
    if (!structured) return;
    let text = "";
    if (type === "email1") {
      text = extractFirstEmail(structured.emails || rawResult);
    } else if (type === "all") {
      text = rawResult || "";
    }
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopyMsg(type === "email1" ? "Email 1 copié ✓" : "Tout copié ✓");
      setTimeout(() => setCopyMsg(""), 1800);
    } catch {
      setCopyMsg("Impossible de copier (droits navigateur).");
      setTimeout(() => setCopyMsg(""), 2000);
    }
  };

  const generate = async () => {
    if (!secteur) {
      setError("Indique ton secteur (ex : coaching B2B).");
      return;
    }
    setLoading(true);
    setError("");
    setRawResult("");
    setStructured(null);
    setCopyMsg("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secteur, ton }),
      });
      if (!res.ok) throw new Error("Erreur API");
      const data = await res.json();
      const text = data.result || "";
      setRawResult(text);
      setStructured(parseStructuredResult(text));
      setActiveTab("emails");
    } catch (e) {
      console.error(e);
      setError(
        "Une erreur est survenue. Vérifie ta clé OPENAI_API_KEY dans Netlify."
      );
    } finally {
      setLoading(false);
    }
  };

  const currentContent = () => {
    if (!structured) return "";
    if (activeTab === "emails") return structured.emails || rawResult;
    if (activeTab === "linkedin") return structured.linkedin;
    if (activeTab === "page") return structured.page;
    return rawResult;
  };

  return (
    <div>
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 18,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="pill" title="LeadBoost IA">
            🚀
          </div>
          <strong>LeadBoost IA</strong>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <a href="/landing" className="btn-ghost">
            Tarifs
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <section className="container section">
        <div className="grid grid-2">
          <div className="fade-in">
            <span className="badge">Nouveau • Micro-SaaS pour freelances</span>
            <h1>
              Génère ta prospection{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#2563eb,#7c3aed)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                en 2 minutes
              </span>
            </h1>
            <p style={{ color: "#475569", marginTop: 6 }}>
              Emails + script LinkedIn + mini-page de vente. Personnalisé à ton
              secteur. Prêt à copier-coller ou à envoyer via tes outils.
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "16px 0",
                color: "#334155",
              }}
            >
              <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CheckIcon /> Templates testés & optimisés conversion
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CheckIcon /> Ton au choix : professionnel, convivial, percutant
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CheckIcon /> Intégrable Zapier/Make (MailerLite, etc.)
              </li>
            </ul>
          </div>

          <div className="card fade-in" style={{ padding: 20 }}>
            <h3 style={{ marginBottom: 6 }}>Créer ma séquence</h3>
            <label style={{ fontSize: 14, color: "#475569" }}>Secteur</label>
            <input
              className="input"
              placeholder="Ex : coaching LinkedIn B2B, agence SEO, création de sites"
              value={secteur}
              onChange={(e) => setSecteur(e.target.value)}
            />
            <div style={{ height: 12 }} />
            <label style={{ fontSize: 14, color: "#475569" }}>
              Ton du message
            </label>
            <select
              className="select"
              value={ton}
              onChange={(e) => setTon(e.target.value)}
            >
              <option value="professionnel">Professionnel</option>
              <option value="convivial">Convivial</option>
              <option value="percutant">Percutant</option>
            </select>

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button className="btn" onClick={generate} disabled={loading}>
                {loading ? "Génération..." : "Générer"}
              </button>
              <a className="btn-ghost" href="/landing">
                Voir les offres
              </a>
            </div>

            {error && (
              <p style={{ color: "crimson", marginTop: 12 }}>{error}</p>
            )}
          </div>
        </div>
      </section>

      {structured && (
        <section className="container section fade-in">
          <h2 style={{ marginBottom: 16 }}>Résultat généré</h2>
          <div className="card" style={{ padding: 18, background: "#fff" }}>
            <div className="tabs">
              <button
                className={`tab ${activeTab === "emails" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("emails")}
              >
                📧 Emails
              </button>
              <button
                className={`tab ${activeTab === "linkedin" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("linkedin")}
              >
                💼 LinkedIn
              </button>
              <button
                className={`tab ${activeTab === "page" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("page")}
              >
                🧾 Mini-page
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="btn-outline"
                  type="button"
                  onClick={() => handleCopy("email1")}
                >
                  Copier l’email 1
                </button>
                <button
                  className="btn-outline"
                  type="button"
                  onClick={() => handleCopy("all")}
                >
                  Copier tout
                </button>
              </div>
              {copyMsg && (
                <span style={{ fontSize: 13, color: "#16a34a" }}>{copyMsg}</span>
              )}
            </div>

            <pre
              style={{
                whiteSpace: "pre-wrap",
                margin: 0,
                marginTop: 4,
                fontSize: 14,
                lineHeight: 1.6,
              }}
            >
              {currentContent()}
            </pre>
          </div>
        </section>
      )}

      <section className="container section">
        <div className="card" style={{ padding: 22 }}>
          <h2 className="center">Résultats de nos premiers utilisateurs</h2>
          <div className="grid grid-2" style={{ marginTop: 10 }}>
            <div className="card" style={{ padding: 16, background: "#fff" }}>
              <strong>Maxime – Consultant SEO</strong>
              <p style={{ color: "#475569" }}>
                “3 rendez-vous qualifiés en 48h grâce à la séquence IA.”
              </p>
            </div>
            <div className="card" style={{ padding: 16, background: "#fff" }}>
              <strong>Sarah – Coach LinkedIn</strong>
              <p style={{ color: "#475569" }}>
                “J’ai gagné 4h par semaine. Et le taux de réponse a bondi.”
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="container center">
        <div>
          © {new Date().getFullYear()} LeadBoost IA — Créé pour freelances &
          agences.
        </div>
      </footer>
    </div>
  );
}
