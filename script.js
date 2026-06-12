// Cursor glow effect
document.addEventListener('mousemove', (e) => {
    const glow = document.querySelector('.cursor-glow');
    if (glow) {
        glow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    }
});

// Menu mobile
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
}

// Botões de navegação
document.getElementById('exploreBtn')?.addEventListener('click', () => {
    document.getElementById('solucoes')?.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('simuladorBtn')?.addEventListener('click', () => {
    document.getElementById('simulador')?.scrollIntoView({ behavior: 'smooth' });
});

// Anima números
function animateNumbers() {
    const statCards = document.querySelectorAll('.stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const targetValue = parseInt(card.getAttribute('data-target'));
                const numberSpan = card.querySelector('.stat-number');
                let current = 0;
                
                const interval = setInterval(() => {
                    current++;
                    numberSpan.textContent = current;
                    if (current >= targetValue) {
                        clearInterval(interval);
                    }
                }, 30);
                
                observer.unobserve(card);
            }
        });
    }, { threshold: 0.5 });
    
    statCards.forEach(card => observer.observe(card));
}

// Gráfico de impacto
let impactChart;
function initChart() {
    const ctx = document.getElementById('impactChart')?.getContext('2d');
    if (!ctx) return;
    
    impactChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'Área com manejo sustentável (milhões ha)',
                data: [12, 18, 25, 34, 42, 55],
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#2ecc71',
                pointBorderColor: '#0a0f0a',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: { color: '#e8f0e8' }
                }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#e8f0e8' }
                },
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#e8f0e8' }
                }
            }
        }
    });
}

// Simulador
function initSimulator() {
    const areaSlider = document.getElementById('areaSlider');
    const areaValue = document.getElementById('areaValue');
    const irrigacaoSelect = document.getElementById('irrigacaoSelect');
    const reservaRadios = document.querySelectorAll('input[name="reserva"]');
    
    function updateSimulator() {
        const area = parseInt(areaSlider?.value || 200);
        const irrigacao = irrigacaoSelect?.value || 'gotejamento';
        const temReserva = Array.from(reservaRadios).find(r => r.checked)?.value === 'sim';
        
        // Cálculos simulados
        let aguaEconomizada = 0;
        let carbonoSequestrado = 0;
        let sustentabilidadeScore = 0;
        
        // Economia de água baseada na irrigação
        if (irrigacao === 'gotejamento') {
            aguaEconomizada = Math.floor(area * 5000);
        } else if (irrigacao === 'solar') {
            aguaEconomizada = Math.floor(area * 7000);
        } else {
            aguaEconomizada = Math.floor(area * 2000);
        }
        
        // Carbono sequestrado
        carbonoSequestrado = Math.floor(area * 300);
        if (temReserva) carbonoSequestrado *= 1.5;
        
        // Score de sustentabilidade
        sustentabilidadeScore = Math.floor((aguaEconomizada / 10000) + (carbonoSequestrado / 500));
        
        // Atualizar DOM
        document.getElementById('aguaEconomizada').textContent = aguaEconomizada.toLocaleString();
        document.getElementById('carbonoSequestrado').textContent = carbonoSequestrado.toLocaleString();
        document.getElementById('sustentabilidadeScore').textContent = sustentabilidadeScore;
    }
    
    areaSlider?.addEventListener('input', () => {
        areaValue.textContent = `${areaSlider.value} ha`;
        updateSimulator();
    });
    
    irrigacaoSelect?.addEventListener('change', updateSimulator);
    reservaRadios.forEach(radio => radio.addEventListener('change', updateSimulator));
    
    updateSimulator();
}

// Scroll animations
function initScrollAnimations() {
    const cards = document.querySelectorAll('.solucao-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s';
        observer.observe(card);
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    animateNumbers();
    initChart();
    initSimulator();
    initScrollAnimations();
});

// Smooth scroll para links do menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        }
    });
});
