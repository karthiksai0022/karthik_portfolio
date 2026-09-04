/* ==========================================================================
   Cheemakurthi Naga Venkata Sai karthik - Portfolio Script
   Interactive Role Switcher, AI Demos, Canvas Animation, Power BI Charts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSkills();
  initRoleSwitcher();
  initEmotionCanvas();
  initBiCharts();
  initFakeNewsDemo();
  initReviewDemo();
});

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
  const container = document.getElementById('skills-container');
  renderSkills(skillsData);

  const filterBtns = document.querySelectorAll('[data-skill-filter]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const filter = e.target.getAttribute('data-skill-filter');
      const filtered = filter === 'all' ? skillsData : skillsData.filter(s => s.category === filter);
      renderSkills(filtered);
    });
  });
}

function renderSkills(skills) {
  const container = document.getElementById('skills-container');
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
    typing: "Data Analyst & AI Developer",
    bio: "Results-driven computer scientist specializing in AI & Machine Learning. Experienced in transforming raw unstructured data into actionable insights, deploying real-time Computer Vision & NLP pipelines, building DAX Power BI dashboards, and optimizing SaaS support operations."
  },
  analyst: {
    badge: "Specialization: Power BI, SQL, DAX, EDA & Business Intelligence",
    typing: "Lead Data Analyst & BI Specialist",
    bio: "Expert in synthesizing complex datasets into high-impact dashboards, writing optimized SQL queries, tracking critical KPIs (AOV, CLV, Revenue), and automating telemetry parsing to cut resolution times by 50%."
  },
  ai_dev: {
    badge: "Specialization: Computer Vision, OpenCV, CNNs, NLP & Machine Learning",
    typing: "AI Developer & Machine Learning Engineer",
    bio: "Focused on designing, training, and deploying production-ready machine learning & deep learning models. Created real-time facial expression classifiers (96% accuracy), fake news detectors, and NLP sentiment pipelines."
  },
  swe: {
    badge: "Specialization: Python, C#, .NET, Flask, Django, Docker & Azure",
    typing: "Software & Cloud Analytics Engineer",
    bio: "Proficient in end-to-end software engineering, REST API development, C# debugging in .NET environments, containerizing microservices with Docker/Kubernetes, and managing Azure DevOps incident workflows."
  }
};

function initRoleSwitcher() {
  const btns = document.querySelectorAll('.role-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const role = btn.getAttribute('data-role');
      const data = roleData[role] || roleData.all;
      
      document.getElementById('role-badge-text').textContent = data.badge;
      document.getElementById('typing-text').textContent = data.typing;
      document.getElementById('hero-bio-desc').textContent = data.bio;
    });
  });
}

/* ================= LAB 1: FACIAL EMOTION CANVAS ================= */
let currentEmotion = 'happy';

function initEmotionCanvas() {
  const canvas = document.getElementById('emotionCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  canvas.width = 400;
  canvas.height = 300;
  
  let angle = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid background
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw Face Outline
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, 70, 90, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Landmark Points Mesh
    const points = [
      { x: centerX - 30, y: centerY - 25 }, // Left Eye
      { x: centerX + 30, y: centerY - 25 }, // Right Eye
      { x: centerX, y: centerY + 10 },      // Nose Tip
      { x: centerX - 35, y: centerY + 45 }, // Mouth Left
      { x: centerX + 35, y: centerY + 45 }, // Mouth Right
      { x: centerX - 45, y: centerY - 45 }, // Eyebrow L1
      { x: centerX - 15, y: centerY - 45 }, // Eyebrow L2
      { x: centerX + 15, y: centerY - 45 }, // Eyebrow R1
      { x: centerX + 45, y: centerY - 45 }, // Eyebrow R2
    ];

    // Connect mesh lines
    ctx.strokeStyle = 'rgba(129, 140, 248, 0.4)';
    ctx.beginPath();
    points.forEach((p, i) => {
      points.forEach((p2, j) => {
        if (i < j && Math.hypot(p.x - p2.x, p.y - p2.y) < 60) {
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
        }
      });
    });
    ctx.stroke();

    // Draw Mouth Curve based on Emotion
    ctx.strokeStyle = currentEmotion === 'happy' ? '#34d399' : (currentEmotion === 'anger' ? '#f87171' : '#38bdf8');
    ctx.lineWidth = 3;
    ctx.beginPath();
    if (currentEmotion === 'happy') {
      ctx.arc(centerX, centerY + 30, 25, 0.2, Math.PI - 0.2);
    } else if (currentEmotion === 'anger') {
      ctx.arc(centerX, centerY + 55, 25, Math.PI + 0.2, -0.2);
    } else if (currentEmotion === 'surprise') {
      ctx.ellipse(centerX, centerY + 45, 12, 20, 0, 0, Math.PI * 2);
    } else {
      ctx.moveTo(centerX - 25, centerY + 45);
      ctx.lineTo(centerX + 25, centerY + 45);
    }
    ctx.stroke();

    // Draw landmark dots with pulse
    angle += 0.05;
    points.forEach(p => {
      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3 + Math.sin(angle) * 1, 0, Math.PI * 2);
      ctx.fill();
    });

    // Bounding Box
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.8)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(centerX - 80, centerY - 100, 160, 200);

    // Label
    ctx.fillStyle = '#38bdf8';
    ctx.font = '12px JetBrains Mono';
    ctx.fillText(`DETECTED: ${currentEmotion.toUpperCase()} (96.4%)`, centerX - 75, centerY - 110);

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

  document.getElementById('prob-happy').textContent = happy + '%';
  document.getElementById('bar-happy').style.width = happy + '%';
  
  document.getElementById('prob-surprise').textContent = surprise + '%';
  document.getElementById('bar-surprise').style.width = surprise + '%';

  document.getElementById('prob-neutral').textContent = neutral + '%';
  document.getElementById('bar-neutral').style.width = neutral + '%';
}

/* ================= LAB 2: FAKE NEWS DEMO ================= */
const newsSamples = {
  1: "SHOCKING SECRET REVEALED! Miracle fruit cures all diseases overnight! Doctors don't want you to know this hidden trick!",
  2: "Researchers at MIT publish peer-reviewed study demonstrating a 15% increase in solar cell efficiency using perovskite tandem structures."
};

function initFakeNewsDemo() {
  document.getElementById('fakeNewsText').value = newsSamples[1];
}

function loadFakeNewsSample(num) {
  document.getElementById('fakeNewsText').value = newsSamples[num];
}

function analyzeFakeNews() {
  const text = document.getElementById('fakeNewsText').value;
  const resultsDiv = document.getElementById('nlp-results');
  
  const isFake = text.toLowerCase().includes('shocking') || text.toLowerCase().includes('secret') || text.toLowerCase().includes('miracle');
  
  resultsDiv.innerHTML = `
    <div style="margin-bottom: 1rem;">
      <span class="badge-tag" style="background: ${isFake ? 'rgba(248,113,113,0.15)' : 'rgba(52,211,153,0.15)'}; color: ${isFake ? '#f87171' : '#34d399'};">
        ${isFake ? '⚠️ CLASSIFIED AS UNVERIFIED / FAKE' : '✅ CLASSIFIED AS AUTHENTIC / REAL'}
      </span>
    </div>

    <div style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0.75rem;">
      <strong>Authenticity Score:</strong> ${isFake ? '18%' : '94%'} <br>
      <strong>Sensationalism Index:</strong> ${isFake ? '89% (High Tone Bias)' : '12% (Neutral Academic Tone)'}
    </div>

    <div style="font-size: 0.8rem; color: var(--text-dim);">
      Detected Indicators: ${isFake ? 'Exclamation Overuse, Clickbait Lexicon, Unverified Claim' : 'Academic Syntax, Institution Cross-Reference Match'}
    </div>
  `;
}

/* ================= LAB 3: SENTIMENT DEMO ================= */
const reviewSamples = {
  1: "The pasta was absolutely delicious and cooked perfectly, but the service was terribly slow and we waited over 45 minutes for our table.",
  2: "Great cozy ambiance and friendly staff, but the prices are way too high for such small food portions."
};

function initReviewDemo() {
  document.getElementById('reviewText').value = reviewSamples[1];
}

function loadReviewSample(num) {
  document.getElementById('reviewText').value = reviewSamples[num];
}

function analyzeReview() {
  const text = document.getElementById('reviewText').value;
  const resultsDiv = document.getElementById('review-results');
  
  resultsDiv.innerHTML = `
    <div style="margin-bottom: 1rem;">
      <span class="aspect-pill aspect-pos"><i class="fa-solid fa-thumbs-up"></i> Food Quality: Positive</span>
      <span class="aspect-pill aspect-neg"><i class="fa-solid fa-thumbs-down"></i> Service: Negative</span>
      <span class="aspect-pill aspect-pos"><i class="fa-solid fa-thumbs-up"></i> Ambiance: Positive</span>
    </div>
    
    <div style="font-size: 0.88rem; color: var(--text-muted); background: rgba(0,0,0,0.3); padding: 0.8rem; border-radius: 8px;">
      <strong>Actionable Business Insight:</strong> <br>
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
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }
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
          backgroundColor: '#34d399'
        },
        {
          label: 'Regular Shoppers',
          data: [{x: 40, y: 50}, {x: 45, y: 55}, {x: 50, y: 60}, {x: 35, y: 48}],
          backgroundColor: '#38bdf8'
        },
        {
          label: 'At-Risk Bargainers',
          data: [{x: 10, y: 20}, {x: 15, y: 18}, {x: 20, y: 25}],
          backgroundColor: '#fb923c'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { title: { display: true, text: 'Order Frequency', color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
        y: { title: { display: true, text: 'Monetary Spend ($)', color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }
      }
    }
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
  document.getElementById(tabId).classList.add('active');
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

  document.getElementById('modalContent').innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-right: 2rem;">
      <h3 style="font-size: 1.25rem; color: var(--primary);">${title}</h3>
      <a href="${fileUrl}" target="_blank" class="btn btn-primary btn-sm"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open / Save PDF</a>
    </div>
    <div style="background: white; border-radius: 8px; overflow: hidden; height: 75vh;">
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
      <h3 style="margin-bottom: 0.5rem; color: var(--primary);">Real-Time Emotional Recognition System</h3>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">Major B.Tech Project • Python, OpenCV, Scikit-learn, CNN, Kaggle</p>
      <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 8px; font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent); margin-bottom: 1rem;">
        [Live Video / Stream] -> [OpenCV Frame Capture] -> [Facial Landmark Detection] -> [Feature Vector Extraction] -> [CNN Classifier] -> [Emotions: Happy, Sad, Anger, Surprise, Neutral (96% Acc)]
      </div>
      <p style="color: var(--text-muted); font-size: 0.88rem;">Designed for human-computer interaction, customer sentiment analysis, and biometric mental health tracking.</p>
    `;
  } else if (pId === 'fake_news') {
    details = `
      <h3 style="margin-bottom: 0.5rem; color: var(--secondary);">Fake News Detection System</h3>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">Slashmark Project • Python, NLP, TF-IDF, Scikit-learn</p>
      <div style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 8px; font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); margin-bottom: 1rem;">
        [Article Input] -> [NLP Preprocessing & Stopword Filtering] -> [Linguistic Pattern Analysis] -> [Source Credibility Scoring] -> [Authenticity Confidence Score Output]
      </div>
    `;
  } else {
    details = `
      <h3 style="margin-bottom: 0.5rem; color: var(--accent);">Project Architectural Specs</h3>
      <p style="color: var(--text-muted); font-size: 0.9rem;">Demonstrates end-to-end data pipeline design, clean code architecture, scalable deployment, and quantifiable business results.</p>
    `;
  }

  document.getElementById('modalContent').innerHTML = details;
  document.getElementById('infoModal').classList.add('active');
}

function closeModal() {
  document.getElementById('infoModal').classList.remove('active');
}

/* ================= CONTACT FORM ================= */
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contactName').value;
  alert(`Thank you ${name}! Your message has been sent successfully. Cheemakurthi Naga Venkata Sai karthik will respond shortly.`);
  e.target.reset();
}
