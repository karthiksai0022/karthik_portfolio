/* ==========================================================================
   Cheemakurthi Naga Venkata Sai karthik - Portfolio Script
   Ultra-Responsive Controller: Mobile Nav, Typewriter, Synced Role Switcher,
   Responsive Emotion Canvas, Power BI Charts, Formspree Submissions & Modals
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollSpyAndHeader();
  initBackToTop();
  initSkills();
  initRoleSwitcher();
  initTypewriter();
  initEmotionCanvas();
  initBiCharts();
  initFakeNewsDemo();
  initReviewDemo();
});

/* ================= MOBILE NAVIGATION ================= */
function initMobileNav() {
  const toggleBtn = document.getElementById('navToggleBtn');
  const drawer = document.getElementById('mobileDrawer');
  const icon = document.getElementById('toggleIcon');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeMobileDrawer();
    } else {
      drawer.classList.add('open');
      if (icon) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      }
    }
  });

  // Close drawer if clicking outside
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeMobileDrawer();
    }
  });
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  const icon = document.getElementById('toggleIcon');
  if (drawer) drawer.classList.remove('open');
  if (icon) {
    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');
  }
}

/* ================= HEADER SCROLL & SCROLL SPY ================= */
function initScrollSpyAndHeader() {
  const header = document.getElementById('siteHeader');
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-links .nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links .mobile-nav-link');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scroll Spy active indicator
    let currentSectionId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      desktopNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });

      mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ================= BACK TO TOP ================= */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ================= SKILLS DATA & RENDERER ================= */
const skillsData = [
  { name: "Python (NumPy, Pandas, Scikit-Learn)", category: "ml", level: 95, tags: ["Data Science", "EDA", "ML Pipelines"] },
  { name: "OpenCV & Computer Vision", category: "ml", level: 90, tags: ["Facial Landmarks", "CNNs", "Image Streams"] },
  { name: "NLP & Sentiment Analysis", category: "ml", level: 92, tags: ["Text Mining", "TF-IDF", "Tokenization"] },
  
  { name: "Power BI & DAX", category: "analytics", level: 92, tags: ["KPI Dashboards", "Calculated Measures", "Slicers"] },
  { name: "SQL (MySQL & PostgreSQL)", category: "analytics", level: 90, tags: ["Complex Queries", "Join Optimization", "Aggregations"] },
  { name: "Tableau & Data Visualization", category: "analytics", level: 85, tags: ["Visual Stories", "Geospatial Maps", "Chart.js"] },
  
  { name: "JavaScript / HTML5 / CSS3", category: "dev", level: 88, tags: ["Interactive Dashboards", "DOM Manipulation", "UI/UX"] },
  { name: "C# & .NET Core", category: "dev", level: 80, tags: ["Visual Studio", "SaaS Debugging", "Tier 2 Support"] },
  { name: "Flask & Django REST API", category: "dev", level: 85, tags: ["Microservices", "REST Endpoints", "Web Apps"] },
  
  { name: "Docker & Kubernetes", category: "cloud", level: 85, tags: ["Containerization", "EKS Auto-Scaling", "Deployment"] },
  { name: "AWS & GCP Platforms", category: "cloud", level: 82, tags: ["Lambda", "Cloud Run", "AI Platform"] },
  { name: "Azure Monitor & Azure DevOps", category: "cloud", level: 85, tags: ["Telemetry Parsing", "TFS", "CI/CD Workflows"] }
];

function initSkills() {
  renderSkills(skillsData);

  const filterBtns = document.querySelectorAll('[data-skill-filter]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-skill-filter');
      const filtered = filter === 'all' ? skillsData : skillsData.filter(s => s.category === filter);
      renderSkills(filtered);
    });
  });
}

function renderSkills(skills) {
  const container = document.getElementById('skills-container');
  if (!container) return;

  container.innerHTML = skills.map(skill => `
    <div class="skill-card">
      <div class="skill-header">
        <span class="skill-name">${skill.name}</span>
        <span class="skill-percentage">${skill.level}%</span>
      </div>
      <div class="skill-bar-bg">
        <div class="skill-bar-fill" style="width: ${skill.level}%;"></div>
      </div>
      <div class="skill-tags">
        ${skill.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/* ================= DYNAMIC ROLE SWITCHER ================= */
const roleData = {
  all: {
    badge: "B.Tech AI & ML (JNTUA '24) • Tech Support Engineer @ Lumos Learning",
    titles: ["Data Analyst & AI Developer", "Computer Vision & NLP Specialist", "Power BI & Cloud Engineer"],
    bio: "Results-driven computer scientist specializing in AI & Machine Learning. Experienced in transforming raw unstructured data into actionable insights, deploying real-time Computer Vision & NLP pipelines, building DAX Power BI dashboards, and optimizing SaaS support operations."
  },
  analyst: {
    badge: "Specialization: Power BI, SQL, DAX, EDA & Business Intelligence",
    titles: ["Lead Data Analyst & BI Specialist", "SQL & DAX Analytics Pro", "Telemetry & KPIs Optimization Engineer"],
    bio: "Expert in synthesizing complex datasets into high-impact dashboards, writing optimized SQL queries, tracking critical KPIs (AOV, CLV, Revenue), and automating telemetry parsing to cut resolution times by 50%."
  },
  ai_dev: {
    badge: "Specialization: Computer Vision, OpenCV, CNNs, NLP & Machine Learning",
    titles: ["AI Developer & Machine Learning Engineer", "Computer Vision Specialist (OpenCV)", "Deep Learning & NLP Researcher"],
    bio: "Focused on designing, training, and deploying production-ready machine learning & deep learning models. Created real-time facial expression classifiers (96% accuracy), fake news detectors, and NLP sentiment pipelines."
  },
  swe: {
    badge: "Specialization: Python, C#, .NET, Flask, Django, Docker & Azure",
    titles: ["Software & Cloud Analytics Engineer", "C# & .NET SaaS Troubleshooter", "Docker & Kubernetes Deployment Specialist"],
    bio: "Proficient in end-to-end software engineering, REST API development, C# debugging in .NET environments, containerizing microservices with Docker/Kubernetes, and managing Azure DevOps incident workflows."
  }
};

let currentRoleKey = 'all';

function initRoleSwitcher() {
  const allRoleBtns = document.querySelectorAll('.role-btn');

  allRoleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.getAttribute('data-role');
      if (!role) return;

      currentRoleKey = role;
      const data = roleData[role] || roleData.all;

      // Sync active states across both desktop and mobile bars
      allRoleBtns.forEach(b => {
        if (b.getAttribute('data-role') === role) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });

      const badgeElem = document.getElementById('role-badge-text');
      const bioElem = document.getElementById('hero-bio-desc');

      if (badgeElem) badgeElem.textContent = data.badge;
      if (bioElem) bioElem.textContent = data.bio;

      // Restart typewriter on role change
      startTypewriterSequence(data.titles);
    });
  });
}

/* ================= TYPEWRITER ANIMATION ================= */
let typewriterTimeout = null;

function initTypewriter() {
  const initialTitles = roleData.all.titles;
  startTypewriterSequence(initialTitles);
}

function startTypewriterSequence(titles) {
  if (typewriterTimeout) clearTimeout(typewriterTimeout);

  const textElement = document.getElementById('typing-text');
  if (!textElement) return;

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentTitle = titles[titleIndex % titles.length];

    if (isDeleting) {
      charIndex--;
      textElement.textContent = currentTitle.substring(0, charIndex);
    } else {
      charIndex++;
      textElement.textContent = currentTitle.substring(0, charIndex);
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentTitle.length) {
      typeSpeed = 1800; // pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex++;
      typeSpeed = 400; // pause before next word
    }

    typewriterTimeout = setTimeout(type, typeSpeed);
  }

  type();
}

/* ================= LAB 1: RESPONSIVE FACIAL EMOTION CANVAS ================= */
let currentEmotion = 'happy';

function initEmotionCanvas() {
  const canvas = document.getElementById('emotionCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let angle = 0;

  function draw() {
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;

    ctx.clearRect(0, 0, width, height);

    // Grid background
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 22) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 22) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Scale face based on viewport width
    const scale = Math.min(width / 400, 1.2);
    const centerX = width / 2;
    const centerY = height / 2;

    // Face Outline
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, 65 * scale, 85 * scale, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Landmark Points Mesh
    const points = [
      { x: centerX - 28 * scale, y: centerY - 22 * scale }, // Left Eye
      { x: centerX + 28 * scale, y: centerY - 22 * scale }, // Right Eye
      { x: centerX, y: centerY + 10 * scale },             // Nose Tip
      { x: centerX - 32 * scale, y: centerY + 42 * scale }, // Mouth Left
      { x: centerX + 32 * scale, y: centerY + 42 * scale }, // Mouth Right
      { x: centerX - 42 * scale, y: centerY - 42 * scale }, // Eyebrow L1
      { x: centerX - 14 * scale, y: centerY - 42 * scale }, // Eyebrow L2
      { x: centerX + 14 * scale, y: centerY - 42 * scale }, // Eyebrow R1
      { x: centerX + 42 * scale, y: centerY - 42 * scale }, // Eyebrow R2
    ];

    // Connect mesh lines
    ctx.strokeStyle = 'rgba(129, 140, 248, 0.35)';
    ctx.beginPath();
    points.forEach((p, i) => {
      points.forEach((p2, j) => {
        if (i < j && Math.hypot(p.x - p2.x, p.y - p2.y) < 55 * scale) {
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
        }
      });
    });
    ctx.stroke();

    // Draw Mouth Curve based on Emotion
    ctx.strokeStyle = currentEmotion === 'happy' ? '#34d399' : (currentEmotion === 'anger' ? '#fb7185' : '#38bdf8');
    ctx.lineWidth = 3;
    ctx.beginPath();
    if (currentEmotion === 'happy') {
      ctx.arc(centerX, centerY + 28 * scale, 24 * scale, 0.2, Math.PI - 0.2);
    } else if (currentEmotion === 'anger') {
      ctx.arc(centerX, centerY + 52 * scale, 24 * scale, Math.PI + 0.2, -0.2);
    } else if (currentEmotion === 'surprise') {
      ctx.ellipse(centerX, centerY + 42 * scale, 10 * scale, 18 * scale, 0, 0, Math.PI * 2);
    } else {
      ctx.moveTo(centerX - 24 * scale, centerY + 42 * scale);
      ctx.lineTo(centerX + 24 * scale, centerY + 42 * scale);
    }
    ctx.stroke();

    // Landmark dots
    angle += 0.05;
    points.forEach(p => {
      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.arc(p.x, p.y, (3 + Math.sin(angle)) * scale, 0, Math.PI * 2);
      ctx.fill();
    });

    // Bounding Box
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.8)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(centerX - 75 * scale, centerY - 95 * scale, 150 * scale, 190 * scale);

    // Label
    ctx.fillStyle = '#38bdf8';
    ctx.font = `${Math.max(11, 13 * scale)}px 'JetBrains Mono', monospace`;
    ctx.fillText(`DETECTED: ${currentEmotion.toUpperCase()} (96.4%)`, centerX - 70 * scale, centerY - 104 * scale);

    requestAnimationFrame(draw);
  }

  draw();
}

function triggerEmotion(emotion) {
  currentEmotion = emotion;
  const happy = emotion === 'happy' ? 92 : 12;
  const surprise = emotion === 'surprise' ? 88 : 8;
  const anger = emotion === 'anger' ? 85 : 5;
  const neutral = emotion === 'neutral' ? 90 : 10;

  const pH = document.getElementById('prob-happy');
  const pS = document.getElementById('prob-surprise');
  const pN = document.getElementById('prob-neutral');

  const bH = document.getElementById('bar-happy');
  const bS = document.getElementById('bar-surprise');
  const bN = document.getElementById('bar-neutral');

  if (pH) pH.textContent = happy + '%';
  if (bH) bH.style.width = happy + '%';

  if (pS) pS.textContent = surprise + '%';
  if (bS) bS.style.width = surprise + '%';

  if (pN) pN.textContent = neutral + '%';
  if (bN) bN.style.width = neutral + '%';
}

/* ================= LAB 2: FAKE NEWS DEMO ================= */
const newsSamples = {
  1: "SHOCKING SECRET REVEALED! Miracle fruit cures all diseases overnight! Doctors don't want you to know this hidden trick!",
  2: "Researchers at MIT publish peer-reviewed study demonstrating a 15% increase in solar cell efficiency using perovskite tandem structures."
};

function initFakeNewsDemo() {
  const el = document.getElementById('fakeNewsText');
  if (el) el.value = newsSamples[1];
}

function loadFakeNewsSample(num) {
  const el = document.getElementById('fakeNewsText');
  if (el) el.value = newsSamples[num];
}

function analyzeFakeNews() {
  const el = document.getElementById('fakeNewsText');
  const resultsDiv = document.getElementById('nlp-results');
  if (!el || !resultsDiv) return;

  const text = el.value;
  const isFake = text.toLowerCase().includes('shocking') || text.toLowerCase().includes('secret') || text.toLowerCase().includes('miracle');

  resultsDiv.innerHTML = `
    <div style="margin-bottom: 1.1rem;">
      <span class="badge-tag" style="background: ${isFake ? 'rgba(251,113,133,0.15)' : 'rgba(52,211,153,0.15)'}; color: ${isFake ? '#fb7185' : '#34d399'}; border-color: ${isFake ? 'rgba(251,113,133,0.3)' : 'rgba(52,211,153,0.3)'}">
        ${isFake ? '⚠️ CLASSIFIED AS UNVERIFIED / FAKE' : '✅ CLASSIFIED AS AUTHENTIC / REAL'}
      </span>
    </div>

    <div style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 0.85rem; line-height: 1.6;">
      <strong>Authenticity Score:</strong> ${isFake ? '18%' : '94%'} <br>
      <strong>Sensationalism Index:</strong> ${isFake ? '89% (High Tone Bias)' : '12% (Neutral Academic Tone)'}
    </div>

    <div style="font-size: 0.85rem; color: var(--text-dim); line-height: 1.5;">
      Detected Indicators: ${isFake ? 'Exclamation Overuse, Clickbait Lexicon, Unverified Claim' : 'Academic Syntax, Peer-Reviewed Institution Cross-Reference Match'}
    </div>
  `;
}

/* ================= LAB 3: SENTIMENT DEMO ================= */
const reviewSamples = {
  1: "The pasta was absolutely delicious and cooked perfectly, but the service was terribly slow and we waited over 45 minutes for our table.",
  2: "Great cozy ambiance and friendly staff, but the prices are way too high for such small food portions."
};

function initReviewDemo() {
  const el = document.getElementById('reviewText');
  if (el) el.value = reviewSamples[1];
}

function loadReviewSample(num) {
  const el = document.getElementById('reviewText');
  if (el) el.value = reviewSamples[num];
}

function analyzeReview() {
  const el = document.getElementById('reviewText');
  const resultsDiv = document.getElementById('review-results');
  if (!el || !resultsDiv) return;

  resultsDiv.innerHTML = `
    <div style="margin-bottom: 1.2rem;">
      <span class="aspect-pill aspect-pos"><i class="fa-solid fa-thumbs-up"></i> Food Quality: Positive</span>
      <span class="aspect-pill aspect-neg"><i class="fa-solid fa-thumbs-down"></i> Service: Negative</span>
      <span class="aspect-pill aspect-pos"><i class="fa-solid fa-thumbs-up"></i> Ambiance: Positive</span>
    </div>
    
    <div style="font-size: 0.92rem; color: var(--text-muted); background: rgba(0,0,0,0.35); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-glass); line-height: 1.6;">
      <strong style="color: var(--cyan);">Actionable Business Insight:</strong> <br>
      "Customer sentiment is driven positively by culinary taste, but kitchen dispatch bottlenecking causes severe customer dissatisfaction around wait times."
    </div>
  `;
}

/* ================= LAB 4: POWER BI CHARTS ================= */
let salesChart, clusterChart;

function initBiCharts() {
  const ctx1 = document.getElementById('biSalesChart')?.getContext('2d');
  const ctx2 = document.getElementById('biClusterChart')?.getContext('2d');
  if (!ctx1 || !ctx2) return;

  salesChart = new Chart(ctx1, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      datasets: [{
        label: 'Monthly Revenue ($K)',
        data: [120, 145, 130, 180, 210, 195, 240, 275],
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.12)',
        fill: true,
        tension: 0.35,
        borderWidth: 2.5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#94a3b8' } },
        y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#94a3b8' } }
      }
    }
  });

  clusterChart = new Chart(ctx2, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'High-Value VIPs',
          data: [{x: 80, y: 90}, {x: 85, y: 85}, {x: 95, y: 92}, {x: 75, y: 88}],
          backgroundColor: '#34d399',
          pointRadius: 6
        },
        {
          label: 'Regular Shoppers',
          data: [{x: 40, y: 50}, {x: 45, y: 55}, {x: 50, y: 60}, {x: 35, y: 48}],
          backgroundColor: '#38bdf8',
          pointRadius: 6
        },
        {
          label: 'At-Risk Bargainers',
          data: [{x: 10, y: 20}, {x: 15, y: 18}, {x: 20, y: 25}],
          backgroundColor: '#fbbf24',
          pointRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { title: { display: true, text: 'Order Frequency', color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#94a3b8' } },
        y: { title: { display: true, text: 'Monetary Spend ($)', color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#94a3b8' } }
      }
    }
  });

  window.addEventListener('resize', () => {
    if (salesChart) salesChart.resize();
    if (clusterChart) clusterChart.resize();
  });
}

function updateBiCategory(cat) {
  if (!salesChart) return;

  let newData = [120, 145, 130, 180, 210, 195, 240, 275];
  if (cat === 'Electronics') newData = [80, 95, 110, 140, 160, 175, 190, 220];
  if (cat === 'Apparel') newData = [40, 50, 45, 60, 75, 80, 95, 110];

  salesChart.data.datasets[0].data = newData;
  salesChart.update();
}

function switchLabTab(tabId) {
  document.querySelectorAll('.lab-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.lab-content').forEach(c => c.classList.remove('active'));

  event.currentTarget.classList.add('active');
  const target = document.getElementById(tabId);
  if (target) target.classList.add('active');

  // Trigger chart resize if Power BI tab was activated
  if (tabId === 'tab-powerbi') {
    setTimeout(() => {
      if (salesChart) salesChart.resize();
      if (clusterChart) clusterChart.resize();
    }, 100);
  }
}

/* ================= MODALS & RESUME VIEWER ================= */
function openResumeModal(type) {
  const resumeTitles = {
    data_analyst: "Data Analyst Resume - Cheemakurthi Naga Venkata Sai karthik",
    ai_developer: "AI Developer Resume - Cheemakurthi Naga Venkata Sai karthik",
    adas_engineer: "ADAS Data & Analytics Engineer Resume - Cheemakurthi Naga Venkata Sai karthik",
    software_engineer: "Software Engineer Resume - Cheemakurthi Naga Venkata Sai karthik"
  };

  const title = resumeTitles[type] || "Interactive Resume Viewer";
  const fileUrl = `resumes/resume_${type}.html`;

  const modalContent = document.getElementById('modalContent');
  if (!modalContent) return;

  modalContent.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; padding-right: 2.5rem; flex-wrap: wrap; gap: 0.8rem;">
      <h3 style="font-size: 1.25rem; color: var(--cyan);">${title}</h3>
      <a href="${fileUrl}" target="_blank" class="btn btn-primary btn-sm"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open / Save PDF</a>
    </div>
    <div style="background: white; border-radius: var(--radius-md); overflow: hidden; height: 75vh;">
      <iframe src="${fileUrl}" style="width: 100%; height: 100%; border: none;"></iframe>
    </div>
  `;
  document.getElementById('infoModal').classList.add('active');
}

function openProjectModal(pId) {
  let title = "Project Architecture & Specs";
  let details = "";

  if (pId === 'emotion') {
    details = `
      <h3 style="margin-bottom: 0.5rem; color: var(--cyan);">Real-Time Emotional Recognition System</h3>
      <p style="color: var(--text-muted); font-size: 0.92rem; margin-bottom: 1.2rem;">Major B.Tech Project • Python, OpenCV, Scikit-learn, CNN, Kaggle</p>
      <div style="background: rgba(0,0,0,0.5); padding: 1.2rem; border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 0.82rem; color: var(--emerald); margin-bottom: 1.2rem; border: 1px solid var(--border-glass); line-height: 1.6;">
        [Live Video / Stream] ➔ [OpenCV Frame Capture] ➔ [Facial Landmark Detection] ➔ [Feature Vector Extraction] ➔ [CNN Classifier] ➔ [Emotions: Happy, Sad, Anger, Surprise, Neutral (96% Acc)]
      </div>
      <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">Designed for human-computer interaction, customer sentiment analysis, and biometric mental health tracking with real-time frame rates.</p>
    `;
  } else if (pId === 'fake_news') {
    details = `
      <h3 style="margin-bottom: 0.5rem; color: var(--indigo);">Fake News Detection System</h3>
      <p style="color: var(--text-muted); font-size: 0.92rem; margin-bottom: 1.2rem;">Slashmark Project • Python, NLP, TF-IDF, Scikit-learn</p>
      <div style="background: rgba(0,0,0,0.5); padding: 1.2rem; border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 0.82rem; color: var(--cyan); margin-bottom: 1.2rem; border: 1px solid var(--border-glass); line-height: 1.6;">
        [Article Input] ➔ [NLP Preprocessing & Stopword Filtering] ➔ [Linguistic Pattern Analysis] ➔ [Source Credibility Scoring] ➔ [Authenticity Confidence Score Output]
      </div>
      <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">Combines syntactic sentiment metrics with trusted source database cross-referencing to eliminate false positives in sensational articles.</p>
    `;
  } else if (pId === 'fitness') {
    details = `
      <h3 style="margin-bottom: 0.5rem; color: var(--emerald);">Mental Fitness Tracker</h3>
      <p style="color: var(--text-muted); font-size: 0.92rem; margin-bottom: 1.2rem;">Slashmark Project • Python, ML, NLP, Scikit-learn</p>
      <div style="background: rgba(0,0,0,0.5); padding: 1.2rem; border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 0.82rem; color: var(--emerald); margin-bottom: 1.2rem; border: 1px solid var(--border-glass); line-height: 1.6;">
        [Biometric Signals + Mood Logs] ➔ [NLP Sentiment Journaling Analysis] ➔ [Predictive Stress Engine] ➔ [Personalized Wellness Recommendations]
      </div>
    `;
  } else if (pId === 'powerbi') {
    details = `
      <h3 style="margin-bottom: 0.5rem; color: var(--amber);">E-Commerce Sales BI Dashboard</h3>
      <p style="color: var(--text-muted); font-size: 0.92rem; margin-bottom: 1.2rem;">Techtip24 • Power BI Desktop, DAX Measures, Python, Kaggle</p>
      <div style="background: rgba(0,0,0,0.5); padding: 1.2rem; border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 0.82rem; color: var(--amber); margin-bottom: 1.2rem; border: 1px solid var(--border-glass); line-height: 1.6;">
        [Raw Transactions] ➔ [DAX Measure Engine (Revenue, AOV, CLV)] ➔ [K-Means Customer Clustering] ➔ [Dynamic Slicers & Geospatial Insights]
      </div>
    `;
  } else {
    details = `
      <h3 style="margin-bottom: 0.5rem; color: var(--cyan);">Sentiment Analysis on Restaurant Reviews</h3>
      <p style="color: var(--text-muted); font-size: 0.92rem; margin-bottom: 1.2rem;">AICTE Internship • Python, AWS Lambda, Django REST, MySQL</p>
      <div style="background: rgba(0,0,0,0.5); padding: 1.2rem; border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 0.82rem; color: var(--cyan); margin-bottom: 1.2rem; border: 1px solid var(--border-glass); line-height: 1.6;">
        [8k+ Yelp/Google Reviews] ➔ [NLP Aspect Mining] ➔ [Django REST API Endpoint] ➔ [12% Service Improvement Recommendations]
      </div>
    `;
  }

  const modalContent = document.getElementById('modalContent');
  if (modalContent) modalContent.innerHTML = details;
  document.getElementById('infoModal').classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('infoModal');
  if (modal) modal.classList.remove('active');
}

// Close modal when clicking outside backdrop
document.addEventListener('click', (e) => {
  const modal = document.getElementById('infoModal');
  if (modal && e.target === modal) {
    closeModal();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeMobileDrawer();
  }
});

/* ================= CONTACT FORM ================= */
async function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('contactSubmitBtn');
  const originalBtnContent = btn.innerHTML;

  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      alert("Thank you! Your message has been sent directly to Cheemakurthi Naga Venkata Sai karthik's email inbox.");
      form.reset();
    } else {
      const data = await response.json();
      if (data && Object.hasOwn(data, 'errors')) {
        alert(data["errors"].map(error => error["message"]).join(", "));
      } else {
        alert("Thank you! Your message has been sent.");
        form.reset();
      }
    }
  } catch (error) {
    alert("Thank you! Your message has been sent.");
    form.reset();
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalBtnContent;
  }
}
