(function() {
  const styles = `
    /* Notif Bar */
    .ll-notif {
      position: fixed; top: 0; left: 0; right: 0;
      background: #fff0f3; border-bottom: 2px solid #f4b8c8;
      padding: 12px 20px; display: flex; align-items: center; justify-content: space-between;
      z-index: 1000; box-shadow: 0 4px 12px rgba(224,90,122,0.15);
      animation: slideDown 0.5s ease;
      font-family: 'Lato', sans-serif;
    }
    .ll-notif-close { background: none; border: none; font-size: 24px; color: #e05a7a; cursor: pointer; line-height: 1; }
    .ll-notif-title { font-weight: bold; color: #5c2d3a; font-size: 15px; margin-bottom: 2px; }
    .ll-notif-sub { font-size: 12px; color: #e05a7a; }

    /* Inbox Item */
    .ll-inbox-title { font-family: 'DM Serif Display', serif; font-size: 28px; color: #3a3330; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;}
    .ll-inbox-sub { font-size: 13px; color: #9e8e8a; margin-bottom: 28px; }
    .ll-inbox-label { font-size: 12px; font-weight: bold; color: #e05a7a; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; display: block; }
    .ll-inbox-item {
      background: #fff; border: 1.5px solid #f4b8c8; border-radius: 12px;
      padding: 16px; display: flex; align-items: center; gap: 16px;
      cursor: pointer; transition: all 0.2s; box-shadow: 0 2px 8px rgba(244,184,200,0.15);
    }
    .ll-inbox-item:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(224,90,122,0.15); border-color: #e05a7a; }
    .ll-icon { font-size: 32px; flex-shrink: 0; }
    .ll-content { flex: 1; min-width: 0; }
    .ll-sender { font-weight: bold; color: #5c2d3a; font-size: 15px; }
    .ll-preview { color: #e05a7a; font-size: 13px; margin-top: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; opacity: 0.8;}
    .ll-badge { background: #e05a7a; color: white; font-size: 10px; padding: 4px 8px; border-radius: 20px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;}

    /* Overlays */
    .ll-overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(30, 15, 20, 0.8); display: flex; align-items: center; justify-content: center;
      z-index: 2000; opacity: 0; pointer-events: none; transition: opacity 0.4s ease;
      backdrop-filter: blur(4px);
    }
    .ll-overlay.active { opacity: 1; pointer-events: all; }

    /* Envelope */
    .ll-envelope-wrapper { text-align: center; cursor: pointer; transition: transform 0.3s; animation: float 3s ease-in-out infinite;}
    .ll-envelope-wrapper:hover { transform: scale(1.05); }
    .ll-env-text { color: white; margin-top: 24px; font-family: 'Lato', sans-serif; font-size: 14px; letter-spacing: 1px; opacity: 0.9;}
    .ll-envelope-svg { width: 120px; height: auto; filter: drop-shadow(0 10px 20px rgba(224,90,122,0.4)); }

    /* Letter Paper */
    .ll-paper {
      background: #fffaf8; border: 2px solid #f4b8c8; border-radius: 12px;
      width: 92%; max-width: 520px; max-height: 90vh; overflow-y: auto;
      padding: 40px 32px; position: relative;
      font-family: 'Playfair Display', serif; font-style: italic; color: #5c2d3a;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      transform: translateY(50px) scale(0.95); transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      display: none;
    }
    .ll-overlay.paper-active .ll-paper { display: block; transform: translateY(0) scale(1); }
    .ll-overlay.paper-active .ll-envelope-wrapper { display: none; }
    
    .ll-close { position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 24px; color: #e05a7a; cursor: pointer; opacity: 0.7; transition: opacity 0.2s;}
    .ll-close:hover { opacity: 1; }
    .ll-ornament { text-align: center; color: #e05a7a; font-size: 16px; letter-spacing: 6px; margin-bottom: 24px; }
    .ll-date { text-align: center; font-size: 16px; color: #e05a7a; margin-bottom: 24px; opacity: 0.9;}
    .ll-separator { text-align: center; color: #f4b8c8; font-size: 14px; letter-spacing: 12px; margin: 24px 0; }
    .ll-body { font-size: 16px; line-height: 1.8; margin-bottom: 30px; text-align: justify; }
    .ll-body p { margin-bottom: 16px; }
    .ll-signature { text-align: right; margin-top: 40px; font-size: 16px; font-weight: 500; }
    .ll-ornament-bottom { text-align: center; color: #e05a7a; font-size: 14px; letter-spacing: 10px; margin-top: 40px; margin-bottom: 10px;}
    
    /* I Love You Button */
    .ll-btn {
      display: block; width: 100%; padding: 14px; margin-top: 40px;
      background: linear-gradient(135deg, #e05a7a, #c2405e); color: white; border: none; border-radius: 30px;
      font-family: 'Lato', sans-serif; font-size: 15px; font-weight: bold; cursor: pointer;
      transition: all 0.3s; box-shadow: 0 4px 12px rgba(224,90,122,0.3);
    }
    .ll-btn:hover { background: linear-gradient(135deg, #f26b8b, #d44b6a); box-shadow: 0 6px 16px rgba(224,90,122,0.4); transform: translateY(-2px);}
    .ll-btn:active { transform: scale(0.98); }

    /* Heart Animation */
    .ll-heart {
      position: fixed; font-size: 28px; user-select: none; pointer-events: none;
      animation: floatUp 3s ease-in forwards; z-index: 2500;
    }

    @keyframes slideDown { from { transform: translateY(-100%); } to { transform: translateY(0); } }
    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
    @keyframes floatUp {
      0% { transform: translateY(0) scale(0.5); opacity: 1; }
      100% { transform: translateY(-400px) scale(1.5); opacity: 0; }
    }
  `;

  const letterContent = `
    <p>Selamat ulang tahun ya, sayang.</p>
    <p>Aku nulis ini sambil senyum-senyum sendiri, karena nggak nyangka bisa kenal orang sebaik kamu. Kamu tuh beda, entah gimana jelasinnya, tapi kamu beda.</p>
    <p>Makasih ya udah sabar sama aku yang masih banyak kurangnya ini. Makasih udah percaya, makasih udah milih buat tetap ada. Itu berarti banget buat aku.</p>
    <p>Aku minta maaf kalau aku belum jadi yang kamu harapin sepenuhnya. Tapi aku janji, aku nggak akan berhenti buat jadi lebih baik — buat kamu, buat kita.</p>
    <p>Dan satu hal yang paling aku doain tiap hari... semoga Allah kasih kita kesempatan buat halal in ini semua ya. Semoga kita bisa segera, dan semoga Allah ridhoi setiap langkah kita. Aamiin.</p>
    <p>Selamat ulang tahun lagi. Kamu berharga banget.</p>
  `;

  function init() {
    // 1. Inject Styles
    const styleEl = document.createElement('style');
    styleEl.innerHTML = styles;
    document.head.appendChild(styleEl);

    // 2. Add Notification
    const notif = document.createElement('div');
    notif.className = 'll-notif';
    notif.innerHTML = `
      <div>
        <div class="ll-notif-title">Surat Cinta untuk Umma Sayang ❤️❤️❤️</div>
        <div class="ll-notif-sub">Kamu punya 1 pesan baru yang menunggu</div>
      </div>
      <button class="ll-notif-close">×</button>
    `;
    document.body.appendChild(notif);
    
    notif.querySelector('.ll-notif-close').addEventListener('click', () => {
      notif.style.transform = 'translateY(-100%)';
      notif.style.transition = 'transform 0.4s ease';
      setTimeout(() => notif.remove(), 400);
    });

    // 3. Build Inbox DOM
    const pageSurat = document.getElementById('page-surat');
    if (!pageSurat) return;

    pageSurat.innerHTML = `
      <div class="ll-inbox-title">📬 Kotak Surat</div>
      <div class="ll-inbox-sub">Pesan untukmu dari seseorang spesial</div>
      
      <span class="ll-inbox-label">Pesan Masuk</span>
      <div class="ll-inbox-item" id="openEnvelopeBtn">
        <div class="ll-icon">💌</div>
        <div class="ll-content">
          <div class="ll-sender">Dari: Seseorang yang menyayangimu</div>
          <div class="ll-preview">Selamat ulang tahun ya, sayang. Aku nulis ini sambil senyum-senyum...</div>
        </div>
        <div class="ll-badge">Baru</div>
      </div>
    `;

    // 4. Build Overlay DOM
    const overlay = document.createElement('div');
    overlay.className = 'll-overlay';
    
    overlay.innerHTML = `
      <!-- Amplop -->
      <div class="ll-envelope-wrapper" id="envWrapper">
        <svg class="ll-envelope-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="4" width="20" height="16" rx="2" fill="#f4b8c8"/>
          <path d="M2 6L12 13L22 6" stroke="#e05a7a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="2" y="4" width="20" height="16" rx="2" stroke="#e05a7a" stroke-width="2"/>
        </svg>
        <div class="ll-env-text">Klik amplop untuk membuka surat</div>
      </div>

      <!-- Kertas Surat -->
      <div class="ll-paper">
        <button class="ll-close" id="closeLetterBtn">×</button>
        <div class="ll-ornament">🌸 ✦ 🌸 ✦ 🌸</div>
        <div class="ll-date">Untukmu, di hari yang paling spesial ini 🤍</div>
        <div class="ll-separator">• • •</div>
        
        <div class="ll-body">
          ${letterContent}
        </div>
        
        <div class="ll-signature">Selalu, seseorang yang sayang kamu 🤍</div>
        <div class="ll-ornament-bottom">✦ ✦ ✦</div>
        
        <button class="ll-btn" id="loveBtn">I ❤️ You</button>
      </div>
    `;
    
    document.body.appendChild(overlay);

    // 5. Logic / Event Listeners
    const openEnvBtn = document.getElementById('openEnvelopeBtn');
    const envWrapper = document.getElementById('envWrapper');
    const closeLetterBtn = document.getElementById('closeLetterBtn');
    const loveBtn = document.getElementById('loveBtn');

    openEnvBtn.addEventListener('click', () => {
      overlay.classList.add('active');
    });

    envWrapper.addEventListener('click', () => {
      overlay.classList.add('paper-active');
    });

    closeLetterBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
      setTimeout(() => {
        overlay.classList.remove('paper-active');
      }, 400); // wait for fade out
    });

    const emojis = ['❤️', '🩷', '💕', '💗', '💖', '🫶'];
    
    loveBtn.addEventListener('click', (e) => {
      const origText = loveBtn.innerText;
      loveBtn.innerText = '💗 Aku juga sayang kamu!';
      loveBtn.style.pointerEvents = 'none';

      // Spawn hearts
      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          const heart = document.createElement('div');
          heart.className = 'll-heart';
          heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
          
          // Randomize position near the button
          const rect = loveBtn.getBoundingClientRect();
          const startX = rect.left + Math.random() * rect.width;
          const startY = rect.top + Math.random() * 20;
          
          heart.style.left = startX + 'px';
          heart.style.top = startY + 'px';
          
          // Slight random horizontal drift
          const drift = (Math.random() - 0.5) * 50;
          heart.style.transform = `translateX(${drift}px)`;
          
          document.body.appendChild(heart);
          
          setTimeout(() => heart.remove(), 3000);
        }, i * 100);
      }

      setTimeout(() => {
        loveBtn.innerText = origText;
        loveBtn.style.pointerEvents = 'all';
      }, 3000);
    });
  }

  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
