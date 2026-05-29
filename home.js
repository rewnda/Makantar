  function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-delay, .animate-fade-in-delay-2');
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('opacity-100', 'translate-y-0');
        el.classList.remove('opacity-0', 'translate-y-10');
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const signInBtn = document.getElementById("signInBtn");
    const signinForm = document.getElementById("signin-form");
    const submitSignin = document.getElementById("submitSignin");
    const nameInput = document.getElementById("nameInput");
    const userGreeting = document.getElementById("userGreeting");
    const userNameDisplay = document.getElementById("userNameDisplay");

    function updateUI() {
      const userName = localStorage.getItem("userName");
      if (userName) {
        signInBtn.textContent = "Log Out";
        userGreeting.style.display = "inline-block";
        userNameDisplay.textContent = userName;
        signinForm.style.display = "none";
      } else {
        signInBtn.textContent = "Sign In";
        userGreeting.style.display = "none";
        signinForm.style.display = "none";
      }
    }

if (signInBtn) {
signInBtn.addEventListener("click", (e) => {
  const userName = localStorage.getItem("userName");
  if (userName) {
    e.preventDefault(); 
    localStorage.removeItem("userName");
    updateUI();
  }
});
}
    if (submitSignin) {
      submitSignin.addEventListener("click", () => {
        const name = nameInput.value.trim();
        if (name) {
          localStorage.setItem("userName", name);
          nameInput.value = "";
          updateUI();
        } else {
          alert("Silakan masukkan nama.");
        }
      });
    }

    updateUI(); 

    // ========== Animasi Scroll ==========
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-delay, .animate-fade-in-delay-2');
    animatedElements.forEach(el => {
      el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-500');
    });
    document.querySelector('.animate-fade-in-delay')?.classList.add('delay-200');
    document.querySelector('.animate-fade-in-delay-2')?.classList.add('delay-300');
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    // ========== Efek Navbar saat scroll ==========
    window.addEventListener('scroll', function () {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
      }
    });
    // ========== Toggle Menu Mobile ==========
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        mobileMenuButton.innerHTML = mobileMenu.classList.contains('open')
          ? '<i class="fas fa-times"></i>'
          : '<i class="fas fa-bars"></i>';
      });
    }
  });
