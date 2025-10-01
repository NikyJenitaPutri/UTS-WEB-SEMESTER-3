// Quote 
const quoteDiv = document.getElementById('quote');

// Array quotes lokal
const quotes = [
  { quote: "Belajar adalah investasi terbaik.", author: "Anonim" },
  { quote: "Kesuksesan datang dari ketekunan.", author: "Anonim" },
  { quote: "Jangan takut gagal, karena dari situ kita belajar.", author: "Anonim" },
  { quote: "Kreativitas itu tidak ada batasnya.", author: "Anonim" },
  { quote: "Kerja keras mengalahkan bakat jika bakat tidak bekerja keras.", author: "Anonim" }
];

function showQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  quoteDiv.style.opacity = 0;
  setTimeout(() => {
    quoteDiv.textContent = `"${quote.quote}" — ${quote.author}`;
    quoteDiv.style.opacity = 1;
  }, 300);
}

// Tampilkan saat halaman load
showQuote();
setInterval(showQuote, 9000);


// Hamburger Menu 
function toggleMenu() {
  const nav = document.querySelector('.nav-links');
  nav.classList.toggle('active');
}


// Smooth Scroll & Highlight 
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
    document.querySelector('.nav-links').classList.remove('active');
  });
});

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 150; // offset
  sections.forEach(sec => {
    // Highlight nav
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(link => link.classList.remove('active-link'));
      const activeLink = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
      if (activeLink) activeLink.classList.add('active-link');
    }
    // Fade-in effect
    if (scrollPos >= sec.offsetTop - 400) {
      sec.style.opacity = 1;
      sec.style.transform = 'translateY(0)';
    }
  });
});


//  Fade-in Section on Load 
sections.forEach(sec => {
  sec.style.opacity = 0;
  sec.style.transform = 'translateY(50px)';
  sec.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});


//  Profil Pic Hover 
const profilePic = document.querySelector('.profile-pic');
if (profilePic) {
  profilePic.addEventListener('mouseenter', () => {
    profilePic.style.transform = 'scale(1.2) rotate(10deg)';
  });
  profilePic.addEventListener('mouseleave', () => {
    profilePic.style.transform = 'scale(1) rotate(0deg)';
  });
}


//  Tooltips 
const kontakItems = document.querySelectorAll('.kontak-item');
kontakItems.forEach(item => {
  const a = item.querySelector('a');
  if (!a) return;
  const tooltip = document.createElement('span');
  tooltip.textContent = a.textContent;
  tooltip.style.cssText = `
    position:absolute; background:#4caf50; color:white; padding:3px 8px;
    border-radius:5px; top:-30px; font-size:0.8rem; opacity:0;
    transition: opacity 0.3s ease; pointer-events:none;
  `;
  item.style.position = 'relative';
  item.appendChild(tooltip);

  item.addEventListener('mouseenter', () => { tooltip.style.opacity = 1; });
  item.addEventListener('mouseleave', () => { tooltip.style.opacity = 0; });
});


//  Timeline & Pengalaman Fade-in 
const timelineItems = document.querySelectorAll('.timeline-item, #pengalaman article');
timelineItems.forEach(item => {
  item.style.opacity = 0;
  item.style.transform = 'translateY(30px)';
  item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + window.innerHeight - 100;
  timelineItems.forEach((item, idx) => {
    if (scrollPos > item.offsetTop) {
      setTimeout(() => {
        item.style.opacity = 1;
        item.style.transform = 'translateY(0)';
      }, idx * 100);
    }
  });
});


// Kotak Saran Button Anim 
const saranButton = document.querySelector('.saran-box button');
if (saranButton) {
  setInterval(() => {
    saranButton.style.background = `linear-gradient(45deg, #ff9800, #4caf50, #a5d6a7, #ff9800)`;
    saranButton.style.backgroundSize = '400% 400%';
    saranButton.style.animation = 'gradShift 6s ease infinite';
  }, 100);
}


//Form Validasi
const saranForm = document.querySelector('.saran-box');
if (saranForm) {
  saranForm.addEventListener('submit', e => {
    e.preventDefault();
    const nama = saranForm.querySelector('input[type="text"]').value.trim();
    const email = saranForm.querySelector('input[type="email"]').value.trim();
    const pesan = saranForm.querySelector('textarea').value.trim();
    if (nama && email && pesan) {
      alert(`Terima kasih, ${nama}! Saran kamu telah terkirim.`);
      saranForm.reset();
    } else {
      alert("Harap lengkapi semua kolom sebelum mengirim.");
    }
  });
}


// Back-to-top Button
const backBtn = document.createElement('button');
backBtn.textContent = '⬆';
backBtn.style.cssText = `
  position:fixed; bottom:40px; right:40px; padding:10px 15px; 
  font-size:1.2rem; border:none; border-radius:50%; background:#4caf50; 
  color:white; cursor:pointer; box-shadow:0 4px 12px rgba(0,0,0,0.3); opacity:0;
  transition: opacity 0.4s ease;
`;
document.body.appendChild(backBtn);

backBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  backBtn.style.opacity = window.scrollY > 300 ? 1 : 0;
});


// Dark Mode 
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Cek preferensi di localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
  body.classList.add('dark-mode');
  if (darkModeToggle) darkModeToggle.textContent = '☀️ Light Mode';
}

if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      darkModeToggle.textContent = '☀️ Light Mode';
      localStorage.setItem('darkMode', 'enabled');
    } else {
      darkModeToggle.textContent = '🌙 Dark Mode';
      localStorage.setItem('darkMode', 'disabled');
    }
  });
}
