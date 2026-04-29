import React, { useState } from 'react';

const RavintoPage = ({ t }) => {
  const [result, setResult] = useState(null);

  const proteiinit = {
    'kaikki':  { aamu: 'munakas (3 munaa) + raejuusto 150 g', lounas: 'kanafilee 150 g', illallinen: 'lohi tai naudanliha 140 g' },
    'ei-kala': { aamu: 'munakas (3 munaa) + raejuusto 150 g', lounas: 'kanafilee 150 g', illallinen: 'kalkkuna tai naudanliha 140 g' },
    'kasvis':  { aamu: 'munakas (3 munaa) + kreikkalainen jogurtti 200 g', lounas: 'raejuusto 200 g + linssipata', illallinen: 'tofu 150 g + kikherneet' },
    'vegaani': { aamu: 'kaurapuuro + soijajogurtti + saksanpähkinät', lounas: 'tempeh 150 g + kvinoa', illallinen: 'tofu 200 g + linssit + papusalaatti' }
  };

  const kerroin = {
    'aloittelija': 1.6,
    'keskitaso':   1.8,
    'kokenut':     2.0
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const paino = parseFloat(data.get('paino'));
    const taso = data.get('taso');
    const ruokavalio = data.get('ruokavalio');
    const jauhe = data.get('proteiinijauhe') === 'kylla';
    const ateriat = data.get('ateriat');

    const proteiiniTavoite = Math.round(paino * kerroin[taso]);
    const p = proteiinit[ruokavalio];

    let ohjelma = [];
    
    if (ateriat === '2') {
      ohjelma.push({ nimi: 'Ateria 1 (n. klo 12)', sisalto: p.lounas + ' + täysjyväriisi + salaatti', proteiini: '~50 g' });
      ohjelma.push({ nimi: 'Ateria 2 (n. klo 19)', sisalto: p.illallinen + ' + bataatti + uunivihannekset', proteiini: '~45 g' });
      if (jauhe) ohjelma.push({ nimi: 'Proteiinipirtelö', sisalto: '1 mittalusikallinen heraproteiinia + maito', proteiini: '~25 g' });
    } 
    else if (ateriat === '3+2') {
      ohjelma.push({ nimi: 'Aamiainen', sisalto: p.aamu, proteiini: '~35 g' });
      ohjelma.push({ nimi: 'Välipala 1', sisalto: jauhe ? 'Proteiinipirtelö + banaani' : 'Raejuusto 150 g + pähkinöitä', proteiini: '~25 g' });
      ohjelma.push({ nimi: 'Lounas', sisalto: p.lounas + ' + bulguri + salaatti', proteiini: '~45 g' });
      ohjelma.push({ nimi: 'Välipala 2', sisalto: 'Kreikkalainen jogurtti 200 g + marjat', proteiini: '~20 g' });
      ohjelma.push({ nimi: 'Illallinen', sisalto: p.illallinen + ' + kvinoa + vihannekset', proteiini: '~40 g' });
    } 
    else if (ateriat === '4') {
      ohjelma.push({ nimi: 'Aamiainen', sisalto: p.aamu, proteiini: '~35 g' });
      ohjelma.push({ nimi: 'Lounas', sisalto: p.lounas + ' + täysjyväriisi + salaatti', proteiini: '~45 g' });
      ohjelma.push({ nimi: 'Välipala', sisalto: jauhe ? 'Proteiinipirtelö + kaurahiutaleita' : 'Raejuusto 200 g + pähkinöitä', proteiini: '~30 g' });
      ohjelma.push({ nimi: 'Illallinen', sisalto: p.illallinen + ' + bataatti + uunivihannekset', proteiini: '~40 g' });
    }

    setResult({ proteiiniTavoite, paino, taso, ohjelma });
    
    // Auto scroll to result slightly after render
    setTimeout(() => {
      document.getElementById('ravinto-tulos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="page-container" style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '40px', background: 'var(--bg-color)', color: '#fff' }}>
      <section id="ravinto-section" style={{ maxWidth: '900px', margin: '40px auto', padding: '30px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>{t.navRavinto || 'Ravinto-ohjelma'}</h2>
        <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '30px' }}>
          Henkilökohtainen proteiinipainotteinen päiväohjelma
        </p>

        <form id="ravinto-form" onSubmit={handleSubmit} style={{ background: '#1e1e1e', padding: '25px', borderRadius: '12px', border: '1px solid #333' }}>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>1. Taso</label>
            <select name="taso" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #444', background: '#2a2a2a', color: '#fff' }}>
              <option value="">-- Valitse --</option>
              <option value="aloittelija">Aloittelija</option>
              <option value="keskitaso">Keskitaso</option>
              <option value="kokenut">Kokenut</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>2. Paino (kg)</label>
            <input type="number" name="paino" min="40" max="200" step="0.5" required 
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #444', background: '#2a2a2a', color: '#fff' }} 
                  placeholder="esim. 75" />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>3. Voitko syödä kaikkea?</label>
            <select name="ruokavalio" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #444', background: '#2a2a2a', color: '#fff' }}>
              <option value="">-- Valitse --</option>
              <option value="kaikki">Kyllä, syön kaikkea (liha, kala, maitotuotteet)</option>
              <option value="ei-kala">Syön lihaa, mutta en kalaa</option>
              <option value="kasvis">Kasvissyöjä (kananmuna + maitotuotteet ok)</option>
              <option value="vegaani">Vegaani</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>4. Käytätkö proteiinijauhetta?</label>
            <select name="proteiinijauhe" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #444', background: '#2a2a2a', color: '#fff' }}>
              <option value="">-- Valitse --</option>
              <option value="kylla">Kyllä</option>
              <option value="ei">En</option>
            </select>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>5. Miten ateriasi jakautuvat?</label>
            <select name="ateriat" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #444', background: '#2a2a2a', color: '#fff' }}>
              <option value="">-- Valitse --</option>
              <option value="2">A: 2 pääateriaa</option>
              <option value="3+2">B: 3 pääateriaa + 2 välipalaa</option>
              <option value="4">C: 4 ateriaa</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', border: 'none', background: 'var(--accent-color)', color: '#000' }}>
            Luo ohjelmani
          </button>
        </form>

        {result && (
          <div id="ravinto-tulos" style={{ marginTop: '30px', padding: '25px', background: '#1e1e1e', border: '2px solid var(--accent-color)', borderRadius: '12px' }}>
            <h3 style={{ marginTop: '0', color: '#fff' }}>Päiväohjelmasi</h3>
            <div style={{ background: '#2a2a2a', padding: '15px', borderRadius: '8px', marginBottom: '20px', color: '#fff' }}>
              <strong>Proteiinitavoitteesi:</strong> <span style={{ color: 'var(--accent-color)' }}>{result.proteiiniTavoite} g / päivä</span><br />
              <small style={{ color: '#aaa' }}>({result.paino} kg × {kerroin[result.taso]} g/kg — taso: {result.taso})</small>
            </div>
            <div style={{ display: 'grid', gap: '12px' }}>
              {result.ohjelma.map((a, index) => (
                <div key={index} style={{ padding: '15px', background: '#2a2a2a', borderLeft: '4px solid var(--accent-color)', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <strong style={{ color: '#fff' }}>{a.nimi}</strong>
                    <span style={{ background: 'var(--accent-color)', color: '#000', padding: '3px 10px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold' }}>{a.proteiini}</span>
                  </div>
                  <div style={{ color: '#ddd' }}>{a.sisalto}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '20px', padding: '15px', background: '#332b00', border: '1px solid #ffd700', borderRadius: '8px', fontSize: '14px', color: '#ffd700' }}>
              <strong>Vinkki:</strong> Juo vähintään 2,5–3 litraa vettä päivässä. Säädä annoskokoja tarpeen mukaan, jotta saavutat {result.proteiiniTavoite} g proteiinia.
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default RavintoPage;
