// Hero video to thumbnail
const heroVideo = document.getElementById('heroVideo');
const heroThumbnail = document.getElementById('heroThumbnail');
if (heroVideo && heroThumbnail) {
  heroVideo.onended = function() {
    heroVideo.style.display = 'none';
    heroThumbnail.style.display = 'block';
  };
}

// Simple slider for product images
document.addEventListener('DOMContentLoaded', function() {
  const imgs = document.querySelectorAll('.slider-img');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const caption = document.querySelector('.slider-caption');
  const captions = [
    'SUBURB! - "Outskirts, Unchained" // BLACK',
    'SUBURB! - "Outskirts, Unchained" // WHITE'
  ];
  let idx = 0;

  function showImg(i) {
    imgs.forEach((img, j) => {
      img.classList.toggle('active', j === i);
    });
    if (caption) caption.textContent = captions[i];
  }

  if (prevBtn && nextBtn) {
    prevBtn.onclick = function() {
      idx = (idx - 1 + imgs.length) % imgs.length;
      showImg(idx);
    };
    nextBtn.onclick = function() {
      idx = (idx + 1) % imgs.length;
      showImg(idx);
    };
  }

  showImg(idx);
});

// Slider for products page drop-in
(function() {
  const imgs = document.querySelectorAll('.slider-img-products');
  const prevBtn = document.getElementById('sliderPrevProducts');
  const nextBtn = document.getElementById('sliderNextProducts');
  const caption = document.querySelector('.slider-caption-products');
  const captions = [
    'SUBURB! - "Outskirts, Unchained" // BLACK',
    'SUBURB! - "Outskirts, Unchained" // WHITE'
  ];
  let idx = 0;
  if (imgs.length && prevBtn && nextBtn && caption) {
    function showImg(i) {
      imgs.forEach((img, j) => {
        img.classList.toggle('active', j === i);
      });
      caption.textContent = captions[i];
    }
    prevBtn.onclick = function() {
      idx = (idx - 1 + imgs.length) % imgs.length;
      showImg(idx);
    };
    nextBtn.onclick = function() {
      idx = (idx + 1) % imgs.length;
      showImg(idx);
    };
    showImg(idx);
  }
})();

// ====== BURGER MENU (Mobile Only) ======
(function() {
  function isMobile() {
    return window.innerWidth <= 600;
  }
  function createBurgerMenu() {
    // Hapus burger menu & overlay lama jika ada
    var oldBurger = document.querySelector('.burger-menu');
    if (oldBurger) oldBurger.remove();
    var oldOverlay = document.querySelector('.burger-overlay');
    if (oldOverlay) oldOverlay.remove();
    var oldBurgerNav = document.querySelector('.burger-nav-links');
    if (oldBurgerNav) oldBurgerNav.remove();
    // Burger icon
    var burger = document.createElement('div');
    burger.className = 'burger-menu';
    burger.innerHTML = '<span></span><span></span><span></span>';
    // Overlay
    var overlay = document.createElement('div');
    overlay.className = 'burger-overlay';
    // Burger menu items (HTML)
    var burgerMenuHTML = [
      '<li><a href="index.html">Home</a></li>',
      '<li><a href="products.html">Products</a></li>',
      '<li><a href="about.html">About</a></li>',
      '<li><a href="https://www.instagram.com/suburb.studioo" target="_blank">Social</a></li>',
      '<li><a href="https://wa.me/60128262967" target="_blank">Contact</a></li>'
    ].join('');
    // Burger nav links (ul)
    var burgerNav = document.createElement('ul');
    burgerNav.className = 'burger-nav-links';
    burgerNav.innerHTML = burgerMenuHTML;
    // Toggle burger
    function openBurger() {
      burgerNav.classList.add('active');
      overlay.classList.add('active');
    }
    function closeBurger() {
      burgerNav.classList.remove('active');
      overlay.classList.remove('active');
    }
    burger.onclick = function(e) {
      e.stopPropagation();
      if (burgerNav.classList.contains('active')) {
        closeBurger();
      } else {
        openBurger();
      }
    };
    overlay.onclick = closeBurger;
    // Tambahkan ke DOM
    document.querySelector('.navbar').appendChild(burger);
    document.body.appendChild(overlay);
    document.body.appendChild(burgerNav);
    // Close menu jika resize ke desktop
    window.addEventListener('resize', function() {
      if (!isMobile()) closeBurger();
    });
  }
  // Init on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    if (isMobile()) createBurgerMenu();
  });
  // Re-init on resize
  window.addEventListener('resize', function() {
    if (isMobile() && !document.querySelector('.burger-menu')) createBurgerMenu();
  });
})();

// ====== CANVAS GALLERY SLIDER (Mobile Only) ======
(function() {
  function isMobile() {
    return window.innerWidth <= 600;
  }
  function setupCanvasSlider() {
    var galleries = document.querySelectorAll('.canvas-gallery');
    galleries.forEach(function(gallery) {
      var imgs = gallery.querySelectorAll('img');
      if (imgs.length <= 1) return;
      // Remove old slider controls if any
      var oldPrev = gallery.querySelector('.canvas-slider-prev');
      var oldNext = gallery.querySelector('.canvas-slider-next');
      if (oldPrev) oldPrev.remove();
      if (oldNext) oldNext.remove();
      // Set first image active
      imgs.forEach(function(img, i) {
        img.classList.toggle('active-canvas', i === 0);
      });
      var idx = 0;
      // Create prev/next buttons
      var prevBtn = document.createElement('button');
      prevBtn.className = 'canvas-slider-prev';
      prevBtn.innerHTML = '&#60;';
      var nextBtn = document.createElement('button');
      nextBtn.className = 'canvas-slider-next';
      nextBtn.innerHTML = '&#62;';
      // Style buttons (inline, so no HTML/CSS needed)
      [prevBtn, nextBtn].forEach(function(btn) {
        btn.style.position = 'absolute';
        btn.style.top = '50%';
        btn.style.transform = 'translateY(-50%)';
        btn.style.background = '#fff';
        btn.style.color = '#000';
        btn.style.border = 'none';
        btn.style.borderRadius = '50%';
        btn.style.width = '32px';
        btn.style.height = '32px';
        btn.style.fontSize = '1.2rem';
        btn.style.opacity = '0.85';
        btn.style.zIndex = '10';
        btn.style.cursor = 'pointer';
        btn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
      });
      prevBtn.style.left = '8px';
      nextBtn.style.right = '8px';
      // Insert buttons
      gallery.style.position = 'relative';
      gallery.appendChild(prevBtn);
      gallery.appendChild(nextBtn);
      // Slider logic
      function showImg(i) {
        imgs.forEach(function(img, j) {
          img.classList.toggle('active-canvas', j === i);
        });
      }
      prevBtn.onclick = function(e) {
        e.stopPropagation();
        idx = (idx - 1 + imgs.length) % imgs.length;
        showImg(idx);
      };
      nextBtn.onclick = function(e) {
        e.stopPropagation();
        idx = (idx + 1) % imgs.length;
        showImg(idx);
      };
    });
  }
  function maybeInitSlider() {
    if (isMobile()) setupCanvasSlider();
    else {
      // Remove slider controls if not mobile
      document.querySelectorAll('.canvas-slider-prev, .canvas-slider-next').forEach(function(btn){btn.remove();});
      document.querySelectorAll('.canvas-gallery img').forEach(function(img){img.classList.remove('active-canvas');});
    }
  }
  document.addEventListener('DOMContentLoaded', maybeInitSlider);
  window.addEventListener('resize', maybeInitSlider);
})();

// ====== STAPLES SECTION SLIDER (Mobile Only) ======
(function() {
  function isMobile() {
    return window.innerWidth <= 600;
  }
  function setupStaplesSlider() {
    var grid = document.querySelector('.staples-grid');
    if (!grid) return;
    var items = grid.querySelectorAll('.staple-item');
    if (items.length <= 1) return;
    // Remove old slider controls if any
    var oldPrev = grid.querySelector('.staples-slider-prev');
    var oldNext = grid.querySelector('.staples-slider-next');
    if (oldPrev) oldPrev.remove();
    if (oldNext) oldNext.remove();
    // Remove all .active-staple
    items.forEach(function(item) {
      item.classList.remove('active-staple');
    });
    var idx = 0;
    // Create prev/next buttons
    var prevBtn = document.createElement('button');
    prevBtn.className = 'staples-slider-prev';
    prevBtn.innerHTML = '&#60;';
    var nextBtn = document.createElement('button');
    nextBtn.className = 'staples-slider-next';
    nextBtn.innerHTML = '&#62;';
    // Style buttons (inline, so no HTML/CSS needed)
    [prevBtn, nextBtn].forEach(function(btn) {
      btn.style.position = 'absolute';
      btn.style.top = '50%';
      btn.style.transform = 'translateY(-50%)';
      btn.style.background = '#fff';
      btn.style.color = '#000';
      btn.style.border = 'none';
      btn.style.borderRadius = '50%';
      btn.style.width = '36px';
      btn.style.height = '36px';
      btn.style.fontSize = '1.5rem';
      btn.style.opacity = '0.85';
      btn.style.zIndex = '10';
      btn.style.cursor = 'pointer';
      btn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    });
    prevBtn.style.left = '-18px';
    nextBtn.style.right = '-18px';
    // Insert buttons
    grid.style.position = 'relative';
    grid.appendChild(prevBtn);
    grid.appendChild(nextBtn);
    // Slider logic
    function showItem(i) {
      items.forEach(function(item, j) {
        item.classList.toggle('active-staple', j === i);
      });
    }
    prevBtn.onclick = function(e) {
      e.stopPropagation();
      idx = (idx - 1 + items.length) % items.length;
      showItem(idx);
    };
    nextBtn.onclick = function(e) {
      e.stopPropagation();
      idx = (idx + 1) % items.length;
      showItem(idx);
    };
    showItem(idx);
  }
  function maybeInitStaplesSlider() {
    var grid = document.querySelector('.staples-grid');
    if (!grid) return;
    var items = grid.querySelectorAll('.staple-item');
    if (isMobile()) {
      setupStaplesSlider();
    } else {
      // Remove slider controls if not mobile, show all items
      var oldPrev = grid.querySelector('.staples-slider-prev');
      var oldNext = grid.querySelector('.staples-slider-next');
      if (oldPrev) oldPrev.remove();
      if (oldNext) oldNext.remove();
      items.forEach(function(item) {
        item.classList.remove('active-staple');
        item.style.display = '';
      });
    }
  }
  document.addEventListener('DOMContentLoaded', maybeInitStaplesSlider);
  window.addEventListener('resize', maybeInitStaplesSlider);
})();

document.addEventListener('DOMContentLoaded', function() {
  var navLinks = document.querySelectorAll('.nav-links li a');
  var currentPath = window.location.pathname.split('/').pop();

  navLinks.forEach(function(link) {
    // Hapus semua class active dulu
    link.classList.remove('active');
    // Cek apakah href link mengandung nama file halaman saat ini
    if (
      link.getAttribute('href') === currentPath ||
      (currentPath === '' && link.getAttribute('href').includes('index.html'))
    ) {
      link.classList.add('active');
    }
  });
}); 