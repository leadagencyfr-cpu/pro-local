// pages/landing.js
export default function Landing() {
  return (
    <div>
      <section className="container section center">
        <span className="badge">LeadBoost IA</span>
        <h1>Ta prospection, écrite par l’IA & optimisée conversion</h1>
        <p style={{color:"#475569", maxWidth:760, margin:"6px auto 18px"}}>
          Gagne des clients plus vite : séquences d’emails + scripts LinkedIn + mini-page de vente alignée à ton marché.
        </p>
        <div style={{display:"flex", gap:12, justifyContent:"center"}}>
          <a href="/" className="btn">Essayer gratuitement</a>
          <a href="#pricing" className="btn-ghost">Voir les tarifs</a>
        </div>
      </section>
      <section className="container section">
        <div className="grid grid-2">
          <div className="card" style={{padding:20}}>
            <h3>Ce que tu obtiens</h3>
            <ul style={{margin:0, paddingLeft:18, color:"#334155", lineHeight:1.7}}>
              <li>4 emails de prospection personnalisés</li>
              <li>Message d’approche LinkedIn + follow-up</li>
              <li>Mini-page de vente (texte) prête à publier</li>
              <li>Export/Copy-Paste instantané</li>
            </ul>
          </div>
          <div className="card" style={{padding:20}}>
            <h3>Intégrations</h3>
            <p style={{color:"#475569"}}>Connexion via Zapier/Make vers MailerLite, HubSpot, Pipedrive…</p>
          </div>
        </div>
      </section>
      <section id="pricing" className="container section">
        <h2 className="center">Tarifs simples</h2>
        <div className="grid grid-2" style={{marginTop:10}}>
          <div className="card" style={{padding:22, background:"#fff"}}>
            <h3>Starter</h3>
            <p style={{fontSize:28, fontWeight:800}}>9 €<span style={{fontSize:14, fontWeight:600}}>/mois</span></p>
            <ul style={{paddingLeft:18, color:"#334155", lineHeight:1.8}}>
              <li>3 générations / jour</li>
              <li>Templates email + LinkedIn</li>
              <li>Support email</li>
            </ul>
            <a href="/" className="btn" style={{marginTop:12}}>Commencer</a>
          </div>
          <div className="card" style={{padding:22, background:"#fff", border:"2px solid #c7d2fe"}}>
            <div className="pill" style={{marginBottom:8}}>Populaire</div>
            <h3>Pro</h3>
            <p style={{fontSize:28, fontWeight:800}}>19 €<span style={{fontSize:14, fontWeight:600}}>/mois</span></p>
            <ul style={{paddingLeft:18, color:"#334155", lineHeight:1.8}}>
              <li>Générations illimitées raisonnables</li>
              <li>Mini-page de vente avancée</li>
              <li>Intégrations Zapier/Make</li>
            </ul>
            <a href="/" className="btn" style={{marginTop:12}}>Choisir Pro</a>
          </div>
        </div>
      </section>
      <section className="container section">
        <h2 className="center">FAQ</h2>
        <div className="grid grid-2" style={{marginTop:10}}>
          <div className="card" style={{padding:18, background:"#fff"}}>
            <strong>Est-ce légal d’utiliser l’IA pour prospecter ?</strong>
            <p style={{color:"#475569"}}>Oui. Respecte RGPD et bonnes pratiques (opt-out, pertinence). Nous ne stockons pas tes données.</p>
          </div>
          <div className="card" style={{padding:18, background:"#fff"}}>
            <strong>Puis-je modifier les textes ?</strong>
            <p style={{color:"#475569"}}>Bien sûr. Tu reçois un résultat 100 % éditable que tu adaptes en un clic.</p>
          </div>
        </div>
      </section>
      <footer className="container center">
        <div>© {new Date().getFullYear()} LeadBoost IA — Mentions légales sur demande.</div>
      </footer>
    </div>
  );
}
