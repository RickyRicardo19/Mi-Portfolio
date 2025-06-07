// Función para dividir nombre en letras (tu código original)
function dividirNombre() {
  const nombre = document.getElementById('nombre');
  const texto = nombre.textContent;
  nombre.innerHTML = '';
  for (let letra of texto) {
    const span = document.createElement('span');
    span.textContent = letra;
    span.classList.add('letra');
    nombre.appendChild(span);
  }
}

// Función para animar números (contador)
function animateNumbers() {
  const numbers = document.querySelectorAll('.stat-number');
  numbers.forEach(number => {
    const target = parseInt(number.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      number.textContent = Math.floor(current);
    }, 16);
  });
}

// Función para animar barras de progreso
function animateSkills() {
  const skills = document.querySelectorAll('.skill-progress');
  skills.forEach(skill => {
    const width = skill.getAttribute('data-width');
    setTimeout(() => {
      skill.style.width = width + '%';
    }, 500);
  });
}

// Intersection Observer para animaciones de scroll
function setupScrollAnimations() {
  const sections = document.querySelectorAll('.fade-in-section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Animar números si es la sección sobre-mi
        if (entry.target.id === 'sobre-mi') {
          animateNumbers();
        }
        
        // Animar skills si es la sección skills
        if (entry.target.id === 'skills') {
          animateSkills();
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Navegación flotante
function setupFloatingNav() {
  const nav = document.getElementById('floating-nav');
  const navLinks = nav.querySelectorAll('a');
  
  // Mostrar navegación después del scroll
 window.addEventListener("load", function () {
  // Forzar scroll arriba
  window.scrollTo(0, 0);

  // Resto de tu código (animación welcome...)
  const welcomeScreen = document.getElementById("welcome-screen");

  setTimeout(() => {
    welcomeScreen.style.display = "none";

    const sections = document.querySelectorAll("main section");
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add("visible");
      }, 300 * index);
    });

    const floatingNav = document.querySelector(".floating-nav");
    if (floatingNav) {
      floatingNav.classList.add("visible");
    }
  }, 3000);
});


}

// Actualizar enlace activo en navegación
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.floating-nav a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
      currentSection = section.id;
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Filtros de proyectos
function setupProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.proyecto');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Actualizar botón activo
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      projects.forEach(project => {
        if (filter === 'all' || project.getAttribute('data-category') === filter) {
          project.style.display = 'block';
          setTimeout(() => {
            project.style.opacity = '1';
            project.style.transform = 'translateY(0)';
          }, 50);
        } else {
          project.style.opacity = '0';
          project.style.transform = 'translateY(20px)';
          setTimeout(() => {
            project.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Sistema de modales
function setupModals() {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.querySelector('.modal-close');
  
  // Cerrar modal
  closeBtn.addEventListener('click', closeModal);
  
  // Cerrar modal al hacer click fuera
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Cerrar modal con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
}

// Abrir modal con contenido específico
function openModal(projectType) {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  
  const projectData = {
    calc: {
      title: 'Calculadora Avanzada',
      description: 'Una calculadora completa con funciones científicas, historial de operaciones y temas personalizables.',
      features: ['Operaciones básicas y avanzadas', 'Funciones trigonométricas', 'Historial de cálculos', 'Interfaz responsive'],
      tech: ['HTML5', 'CSS3', 'JavaScript ES6', 'Local Storage'],
      demo: 'https://tu-demo-calculadora.com',
      github: 'https://github.com/tu-usuario/calculadora'
    },
    tasks: {
      title: 'Task Manager Pro',
      description: 'Aplicación completa para gestión de tareas con categorías, prioridades y seguimiento de progreso.',
      features: ['Crear y editar tareas', 'Categorías personalizadas', 'Sistema de prioridades', 'Estadísticas de productividad'],
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Local Storage API'],
      demo: 'https://tu-demo-tasks.com',
      github: 'https://github.com/tu-usuario/task-manager'
    },
    memory: {
      title: 'Memory Game',
      description: 'Juego de memoria interactivo con múltiples niveles, efectos sonoros y sistema de puntuación.',
      features: ['Múltiples niveles de dificultad', 'Efectos sonoros', 'Sistema de puntuación', 'Animaciones fluidas'],
      tech: ['JavaScript', 'CSS Animations', 'Web Audio API', 'Canvas'],
      demo: 'https://tu-demo-memory.com',
      github: 'https://github.com/tu-usuario/memory-game'
    },
    blog: {
      title: 'Blog Personal',
      description: 'Blog completo desarrollado con Python y Flask, con panel de administración y sistema de comentarios.',
      features: ['Panel de administración', 'Sistema de comentarios', 'Editor de texto enriquecido', 'SEO optimizado'],
      tech: ['Python', 'Flask', 'SQLite', 'Bootstrap', 'Jinja2'],
      demo: 'https://tu-blog.com',
      github: 'https://github.com/tu-usuario/blog-flask'
    }
  };
  
  const project = projectData[projectType];
  
  modalBody.innerHTML = `
    <h2>${project.title}</h2>
    <p>${project.description}</p>
    
    <h3>Características principales:</h3>
    <ul>
      ${project.features.map(feature => `<li>${feature}</li>`).join('')}
    </ul>
    
    <h3>Tecnologías utilizadas:</h3>
    <div class="modal-tech">
      ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
    </div>
    
    <div class="modal-links">
      <a href="${project.demo}" target="_blank" class="btn-demo">Ver Demo</a>
      <a href="${project.github}" target="_blank" class="btn-code">Ver Código</a>
    </div>
  `;
  
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Cerrar modal
function closeModal() {
  const modal = document.getElementById('project-modal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Formulario de contacto
function setupContactForm() {
  const form = document.getElementById('contact-form');
  const btnText = document.querySelector('.btn-text');
  const btnLoading = document.querySelector('.btn-loading');
  const submitBtn = document.querySelector('.btn-submit');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Cambiar estado del botón
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    
    // Simular envío (aquí conectarías con tu backend)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mostrar mensaje de éxito
    showNotification('¡Mensaje enviado con éxito! Te responderé pronto.', 'success');
    
    // Resetear formulario
    form.reset();
    
    // Restaurar botón
    submitBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
  });
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Estilos dinámicos
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '1rem 1.5rem',
    borderRadius: '8px',
    color: 'white',
    fontWeight: '600',
    zIndex: '10001',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease'
  });
  
  if (type === 'success') {
    notification.style.background = 'linear-gradient(to right, #4CAF50, #45a049)';
  } else if (type === 'error') {
    notification.style.background = 'linear-gradient(to right, #f44336, #da190b)';
  }
  
  document.body.appendChild(notification);
  
  // Animar entrada
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remover después de 4 segundos
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 4000);
}

// Scroll to top
function setupScrollToTop() {
  const scrollBtn = document.getElementById('scroll-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Efecto parallax suave
function setupParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Inicialización principal
document.addEventListener("DOMContentLoaded", () => {
  // Funciones originales
  dividirNombre();
  
  // Animar las cards con delay
  const proyectos = document.querySelectorAll('.proyecto');
  proyectos.forEach((card, i) => {
    card.style.setProperty('--delay', `${i * 0.15}s`);
  });
  
  // Modo oscuro (tu código original mantenido)
  const toggleCheckbox = document.getElementById('toggle');
  const body = document.body;
  const toggleLabel = document.querySelector('.toggle-switch');
  const iconToggle = document.getElementById('icon-toggle');
  
  // Sincronizar estado con localStorage
  if (localStorage.getItem('dark-mode') === 'true') {
    body.classList.add('dark-mode');
    toggleCheckbox.checked = true;
    toggleLabel.setAttribute('aria-checked', 'true');
    iconToggle.textContent = '🌙';
  }
  
  toggleCheckbox.addEventListener('change', () => {
    const isDark = toggleCheckbox.checked;
    body.classList.toggle('dark-mode', isDark);
    toggleLabel.setAttribute('aria-checked', isDark.toString());
    
    iconToggle.classList.add('girando');
    
    iconToggle.addEventListener('animationend', function handler() {
      iconToggle.textContent = isDark ? '🌙' : '☀️';
      iconToggle.classList.remove('girando');
      iconToggle.removeEventListener('animationend', handler);
    }, { once: true });
    
    localStorage.setItem('dark-mode', isDark);
  });
  
  // Nuevas funcionalidades
  setupScrollAnimations();
  setupFloatingNav();
  setupProjectFilters();
  setupModals();
  setupContactForm();
  setupScrollToTop();
  setupParallax();
  
  // Scroll suave para indicador
  document.querySelector('.scroll-arrow').addEventListener('click', () => {
    document.getElementById('sobre-mi').scrollIntoView({
      behavior: 'smooth'
    });
  });
  
  console.log('🚀 Portfolio cargado con éxito!');
});
