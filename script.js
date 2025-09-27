/* scripts.js — navbar interactions, modal & simple booking simulation */

// DOM elements
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const bookBtn = document.getElementById('bookBtn');
const bookingModal = document.getElementById('bookingModal');
const backdrop = document.getElementById('modalBackdrop');
const modalCloseBtns = document.querySelectorAll('.modal-close');
const bookingForm = document.getElementById('bookingForm');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navList.classList.toggle('show');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    // smooth scroll handled below; close mobile menu if open
    if (navList.classList.contains('show')) {
      navList.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // mark link active
      navLinks.forEach(l => l.classList.remove('active'));
      if (this.classList.contains('nav-link')) this.classList.add('active');
    }
  });
});

// Modal open/close functions
function openModal(){
  bookingModal.setAttribute('aria-hidden', 'false');
  backdrop.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  bookingModal.setAttribute('aria-hidden', 'true');
  backdrop.hidden = true;
  document.body.style.overflow = '';
}

// open modal on Book button
bookBtn.addEventListener('click', openModal);

// close on close buttons or backdrop
modalCloseBtns.forEach(btn => btn.addEventListener('click', closeModal));
backdrop.addEventListener('click', closeModal);

// keyboard accessibility: Esc to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && bookingModal.getAttribute('aria-hidden') === 'false') {
    closeModal();
  }
});

// Simple booking form submit (placeholder for payment gateway)
bookingForm.addEventListener('submit', function(e){
  e.preventDefault();
  const data = new FormData(bookingForm);
  const payload = Object.fromEntries(data.entries());

  // basic validation (phone pattern already on)
  if (!payload.name || !payload.phone || !payload.service || !payload.date) {
    alert('कृपया सभी विवरण भरें।');
    return;
  }

  // Simulate payment flow:
  // In production: integrate Razorpay / Stripe / PayU etc.
  simulatePayment(payload)
    .then(tx => {
      alert('Booking confirmed! Transaction ID: ' + tx.id);
      console.log('Booking payload', payload, 'tx', tx);
      bookingForm.reset();
      closeModal();
    })
    .catch(err => {
      alert('Payment failed (demo). Try again.');
      console.error(err);
    });
});

// Demo payment simulation (returns a promise)
function simulatePayment(payload){
  return new Promise((resolve, reject) => {
    // small delay to mimic network / payment
    setTimeout(() => {
      // 95% success chance in this demo
      if (Math.random() < 0.95) {
        resolve({ id: 'TXN' + Date.now(), amount: payload.amount || 'Demo' });
      } else {
        reject(new Error('demo payment failed'));
      }
    }, 900);
  });
}

// mark active nav based on scroll (simple)
const sections = document.querySelectorAll('main section[id]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      if (link) link.classList.add('active');
    }
  });
}, { root: null, threshold: 0.45 });

sections.forEach(s => observer.observe(s));
