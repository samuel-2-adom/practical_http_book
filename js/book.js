/* ============================================================
   Practical HTTP, Requests & APIs with Python — book.js
   ============================================================ */

// --- Theme ---
const saved = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', saved);

function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeBtn();
}

function updateThemeBtn() {
  const btn = document.getElementById('theme-btn');
  if (!btn) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.textContent = isDark ? '☀️' : '🌙';
  btn.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
}

// --- Mobile sidebar ---
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
}

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
  const sidebar = document.querySelector('.sidebar');
  const btn = document.querySelector('.menu-btn');
  if (sidebar && sidebar.classList.contains('open')) {
    if (!sidebar.contains(e.target) && e.target !== btn) {
      sidebar.classList.remove('open');
    }
  }
});

// --- Quiz options ---
function initQuiz() {
  document.querySelectorAll('.option').forEach(opt => {
    opt.addEventListener('click', () => {
      const question = opt.closest('.question');
      if (question.dataset.answered) return;
      question.dataset.answered = 'true';

      const correct = question.dataset.correct;
      const chosen  = opt.dataset.value;

      question.querySelectorAll('.option').forEach(o => {
        if (o.dataset.value === correct) o.classList.add('correct');
        else if (o.dataset.value === chosen) o.classList.add('wrong');
      });

      // Show feedback if present
      const fb = question.querySelector('.feedback-' + (chosen === correct ? 'correct' : 'wrong'));
      if (fb) fb.style.display = 'block';
    });
  });
}

// --- Reveal buttons ---
function initReveals() {
  document.querySelectorAll('.reveal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      const open = target.classList.toggle('open');
      btn.textContent = open ? (btn.dataset.hideLabel || 'Hide') : (btn.dataset.showLabel || btn.textContent);
    });
  });
}

// --- Active nav link ---
function setActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    link.classList.toggle('active', href === current);
  });
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  updateThemeBtn();
  initQuiz();
  initReveals();
  setActiveNav();
});
