// Sticky Navbar Glass Effect
const nav = document.querySelector('nav');
if (nav) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            nav.classList.add('shadow-sm', 'bg-white/95', 'backdrop-blur-sm');
            nav.classList.remove('bg-white');
        } else {
            nav.classList.remove('shadow-sm', 'bg-white/95', 'backdrop-blur-sm');
            nav.classList.add('bg-white');
        }
    });
}

// Reveal Animations on Scroll
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

// Trigger animations immediately
revealOnScroll();

// Initialize Lucide Icons (wrapped to prevent blocking)
try {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        console.warn('Lucide icons library not loaded');
    }
} catch (e) {
    console.error('Error initializing icons:', e);
}

// Mobile Menu Toggle
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

if (btn && menu) {
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });
}

// Modal Logic
const overlay = document.getElementById('modal-overlay');

function playDocAnimation() {
    const docView = document.getElementById('doc-scan-view');
    const scanLine = document.getElementById('doc-scan-line');
    const dataView = document.getElementById('doc-data-view');

    // Reset State
    docView.classList.remove('opacity-0', 'hidden');
    dataView.classList.add('hidden', 'opacity-0');
    scanLine.classList.remove('opacity-0', 'top-full');
    scanLine.style.top = '0';
    scanLine.style.transition = 'none';

    // Sequence
    setTimeout(() => {
        // Start Scan
        scanLine.classList.remove('opacity-0');
        scanLine.style.transition = 'top 1.5s ease-in-out';
        requestAnimationFrame(() => {
            scanLine.style.top = '100%';
        });

        setTimeout(() => {
            // End Scan, Switch View
            docView.classList.add('opacity-0');
            setTimeout(() => {
                docView.classList.add('hidden');
                dataView.classList.remove('hidden');
                setTimeout(() => dataView.classList.remove('opacity-0'), 50);
            }, 500);
        }, 1500);

    }, 300);
}

function playSalesAnimation() {
    const loaders = document.querySelectorAll('.sales-loading');
    const scores = document.querySelectorAll('.sales-score');
    const badge = document.getElementById('sales-action-badge');

    // Reset State
    loaders.forEach(l => {
        l.classList.remove('hidden');
        l.classList.add('border-t-blue-500');
    });
    scores.forEach(s => s.classList.add('opacity-0'));
    if (badge) {
        badge.classList.add('translate-x-full', 'opacity-0');
        badge.classList.remove('translate-x-0');
    }

    // Sequence
    setTimeout(() => {
        // Lead 1: 30%
        if (loaders[0]) loaders[0].classList.add('hidden');
        if (scores[0]) scores[0].classList.remove('opacity-0');
    }, 500);

    setTimeout(() => {
        // Lead 2: 95% (VIP)
        if (loaders[1]) loaders[1].classList.add('hidden');
        if (scores[1]) scores[1].classList.remove('opacity-0');

        // Trigger Action
        setTimeout(() => {
            if (badge) {
                badge.classList.remove('translate-x-full', 'opacity-0');
                badge.classList.add('translate-x-0');
            }
        }, 500);

    }, 1200);

    setTimeout(() => {
        // Lead 3: 60%
        if (loaders[2]) loaders[2].classList.add('hidden');
        if (scores[2]) scores[2].classList.remove('opacity-0');
    }, 800);
}

// Helper to get current translation
function t(key) {
    const lang = document.documentElement.lang || 'ca';
    return getattr(translations[lang], key) || key; // fallback
}

// Helper to safely get nested keys if needed, though here keys are flat "modal.hr.pending"
function getattr(obj, key) {
    return obj[key];
}

function playHRAnimation() {
    const cards = document.querySelectorAll('.hr-card');
    const statuses = document.querySelectorAll('.hr-status');
    const lang = document.documentElement.lang || 'ca'; // active language

    if (cards.length === 0) return;

    // Reset State
    cards.forEach(c => c.className = 'hr-card bg-slate-900 p-3 rounded-lg border border-slate-800 text-center relative transition duration-300');
    statuses.forEach(s => {
        s.className = 'hr-status text-[10px] font-bold py-1 px-2 rounded bg-slate-800 text-gray-500 transition duration-300';
        s.innerText = translations[lang]['modal.hr.pending'];
    });

    // Sequence
    setTimeout(() => {
        // Candidate 1: Descartat
        if (cards[0]) cards[0].classList.add('opacity-50');
        if (statuses[0]) {
            statuses[0].classList.remove('bg-slate-800', 'text-gray-500');
            statuses[0].classList.add('bg-red-500/10', 'text-red-500');
            statuses[0].innerText = translations[lang]['modal.hr.discarded'];
        }

        setTimeout(() => {
            // Candidate 2: Valid
            if (cards[1]) cards[1].classList.add('border-green-500/50', 'bg-green-500/5');
            if (statuses[1]) {
                statuses[1].classList.remove('bg-slate-800', 'text-gray-500');
                statuses[1].classList.add('bg-green-500/10', 'text-green-500');
                statuses[1].innerText = translations[lang]['modal.hr.valid'];
            }

            setTimeout(() => {
                // Candidate 3: Descartat
                if (cards[2]) cards[2].classList.add('opacity-50');
                if (statuses[2]) {
                    statuses[2].classList.remove('bg-slate-800', 'text-gray-500');
                    statuses[2].classList.add('bg-red-500/10', 'text-red-500');
                    statuses[2].innerText = translations[lang]['modal.hr.discarded'];
                }
            }, 1000); // 1s delay for 3rd candidate

        }, 1000); // 1s delay for 2nd candidate

    }, 800); // Initial delay
}

function playStockAnimation() {
    const barB = document.getElementById('stock-bar-b');
    const statusB = document.getElementById('stock-status-b');
    const badge = document.getElementById('stock-restock-badge');
    const badgeText = badge.querySelector('span') || badge; // Handle if span or direct text
    const lang = document.documentElement.lang || 'ca';

    // Safety check
    if (!barB || !statusB) return;

    // Reset State
    barB.classList.remove('bg-green-500', 'w-[90%]');
    barB.classList.add('bg-red-500', 'w-[15%]');
    statusB.innerText = translations[lang]['modal.stock.status.critical'];
    statusB.classList.remove('text-green-500');
    statusB.classList.add('text-red-500');
    badge.classList.add('opacity-0');
    // We only change the text node, keeping the SVG if present. 
    // Actually, badge contains an SVG and text. We should update only the text node.
    // Simpler: badge.lastChild.nodeValue = ... 
    if (badge.lastChild && badge.lastChild.nodeType === 3) {
        badge.lastChild.nodeValue = ' ' + translations[lang]['modal.stock.restock'];
    }

    // Sequence
    setTimeout(() => {
        // 1. Show Auto-Restock Badge
        badge.classList.remove('opacity-0');

        setTimeout(() => {
            // 2. Refill Bar
            barB.classList.remove('bg-red-500', 'w-[15%]');
            barB.classList.add('bg-green-500', 'w-[90%]');

            // 3. Update Text
            statusB.classList.remove('text-red-500');
            statusB.classList.add('text-green-500');
            statusB.innerText = translations[lang]['modal.stock.status.restocked'];

            // 4. Hide badge
            setTimeout(() => {
                badge.classList.add('opacity-0');
            }, 1000);

        }, 1200); // Slower refill start
    }, 800);
}

function playSentimentAnimation() {
    const items = document.querySelectorAll('.sentiment-item');
    const badges = document.querySelectorAll('.sentiment-badge');
    const lang = document.documentElement.lang || 'ca';

    if (items.length === 0) return;

    // Reset State
    items.forEach(item => {
        item.classList.remove('opacity-100', 'bg-slate-800');
        item.classList.add('opacity-50', 'bg-slate-900/50');
    });
    badges.forEach(badge => {
        badge.className = 'sentiment-badge px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-gray-500 transition-colors duration-500';
        badge.innerText = translations[lang]['modal.sentiment.analyzing'];
    });

    // Sequence
    setTimeout(() => {
        // Comment 1: Positive
        items[0].classList.remove('opacity-50', 'bg-slate-900/50');
        items[0].classList.add('opacity-100', 'bg-slate-800');

        setTimeout(() => {
            badges[0].classList.remove('bg-slate-800', 'text-gray-500');
            badges[0].classList.add('bg-green-500/10', 'text-green-400');
            badges[0].innerText = translations[lang]['modal.sentiment.positive'];
        }, 600);

        // Comment 2: Negative
        setTimeout(() => {
            items[1].classList.remove('opacity-50', 'bg-slate-900/50');
            items[1].classList.add('opacity-100', 'bg-slate-800');

            setTimeout(() => {
                badges[1].classList.remove('bg-slate-800', 'text-gray-500');
                badges[1].classList.add('bg-red-500/10', 'text-red-400');
                badges[1].innerText = translations[lang]['modal.sentiment.negative'];
            }, 600);
        }, 1500);

        // Comment 3: Neutral
        setTimeout(() => {
            items[2].classList.remove('opacity-50', 'bg-slate-900/50');
            items[2].classList.add('opacity-100', 'bg-slate-800');

            setTimeout(() => {
                badges[2].classList.remove('bg-slate-800', 'text-gray-500');
                badges[2].classList.add('bg-gray-600/20', 'text-gray-300');
                badges[2].innerText = translations[lang]['modal.sentiment.neutral'];
            }, 600);
        }, 3000);

    }, 500);
}

function playChatAnimation() {
    const userMsg = document.getElementById('chat-user-msg');
    const botTyping = document.getElementById('chat-bot-typing');
    const botMsg = document.getElementById('chat-bot-msg');
    const userMsg2 = document.getElementById('chat-user-msg-2');
    const botMsg2 = document.getElementById('chat-bot-msg-2');

    // Reset State
    userMsg.classList.add('opacity-0', 'translate-y-4');
    botTyping.classList.add('hidden', 'opacity-0');
    botMsg.classList.add('hidden', 'opacity-0', 'translate-y-4');

    if (userMsg2) {
        userMsg2.classList.add('hidden', 'opacity-0', 'translate-y-4');
        userMsg2.classList.remove('flex'); // Start hidden from layout
    }
    if (botMsg2) {
        botMsg2.classList.add('hidden', 'opacity-0', 'translate-y-4');
        botMsg2.classList.remove('flex');
    }

    // Sequence
    setTimeout(() => {
        // Show User Message 1
        userMsg.classList.remove('opacity-0', 'translate-y-4');

        setTimeout(() => {
            // Show Typing
            botTyping.classList.remove('hidden');
            setTimeout(() => botTyping.classList.remove('opacity-0'), 10);

            setTimeout(() => {
                // Hide Typing, Show Bot Message 1
                botTyping.classList.add('opacity-0');
                setTimeout(() => {
                    botTyping.classList.add('hidden');
                    botMsg.classList.remove('hidden');
                    setTimeout(() => botMsg.classList.remove('opacity-0', 'translate-y-4'), 10);

                    // --- Extended Sequence ---
                    setTimeout(() => {
                        // User Message 2
                        if (userMsg2) {
                            userMsg2.classList.remove('hidden');
                            userMsg2.classList.add('flex');
                            setTimeout(() => userMsg2.classList.remove('opacity-0', 'translate-y-4'), 10);
                        }

                        setTimeout(() => {
                            // Typing Again
                            botTyping.classList.remove('hidden');
                            setTimeout(() => botTyping.classList.remove('opacity-0'), 10);

                            setTimeout(() => {
                                // Hide Typing, Show Bot Message 2
                                botTyping.classList.add('opacity-0');
                                setTimeout(() => {
                                    botTyping.classList.add('hidden');
                                    if (botMsg2) {
                                        botMsg2.classList.remove('hidden');
                                        botMsg2.classList.add('flex');
                                        setTimeout(() => botMsg2.classList.remove('opacity-0', 'translate-y-4'), 10);
                                    }
                                }, 300);
                            }, 1500); // Typing duration 2
                        }, 1000); // Delay before typing 2
                    }, 1500); // Reading time for Bot 1
                    // --- End Extended ---

                }, 300);
            }, 1500); // Typing duration 1
        }, 800); // Delay before typing 1
    }, 500); // Initial delay
}

function openModal(id) {
    const modal = document.getElementById(id);
    overlay.classList.remove('hidden');

    // Trigger Chat Animation if opening Chat Modal
    if (id === 'modal-chat') {
        playChatAnimation();
    }

    // Trigger Doc Animation if opening Docs Modal
    if (id === 'modal-docs') {
        playDocAnimation();
    }

    // Trigger Sales Animation if opening Sales Modal
    if (id === 'modal-sales') {
        playSalesAnimation();
    }

    // Trigger HR Animation if opening HR Modal
    if (id === 'modal-hr') {
        playHRAnimation();
    }

    // Trigger Stock Animation
    if (id === 'modal-stock') {
        playStockAnimation();
    }

    // Trigger Sentiment Animation
    if (id === 'modal-sentiment') {
        playSentimentAnimation();
    }

    setTimeout(() => {
        overlay.classList.remove('opacity-0');
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('scale-95');
            modal.classList.add('scale-100');
        }, 50);
    }, 10);
}

function closeModal(id) {
    const modal = document.getElementById(id);
    modal.classList.remove('scale-100');
    modal.classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
        const anyOpen = document.querySelectorAll('.modal-content:not(.hidden)').length > 0;
        if (!anyOpen) {
            overlay.classList.add('opacity-0');
            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 300);
        }
    }, 200);
}

function closeAllModals(e) {
    if (e.target === overlay) {
        document.querySelectorAll('.modal-content').forEach(m => {
            if (!m.classList.contains('hidden')) {
                closeModal(m.id);
            }
        });
    }
}


// Methodology Animations

// Methodology Animations Loop
async function playMethodologyLoop() {
    // Infinite Loop
    while (true) {
        resetAllMethodologyAnimations(); // Clear previous states
        await playStep1Animation();
        await new Promise(r => setTimeout(r, 500)); // Pause between steps
        await playStep2Animation();
        await new Promise(r => setTimeout(r, 500));
        await playStep3Animation();
        await new Promise(r => setTimeout(r, 500));
        await playStep4Animation();
        await new Promise(r => setTimeout(r, 2000)); // 2s pause before restart
    }
}

function resetAllMethodologyAnimations() {
    // Step 1
    const alert = document.getElementById('step1-alert');
    if (alert) {
        alert.classList.remove('opacity-100');
        alert.classList.add('opacity-0');
    }

    // Step 2
    const s2nodes = [
        document.getElementById('step2-node1'),
        document.getElementById('step2-node2'),
        document.getElementById('step2-node3')
    ];
    const s2lines = [
        document.getElementById('step2-line1'),
        document.getElementById('step2-line2')
    ];
    s2nodes.forEach(el => {
        if (el) {
            el.classList.remove('opacity-100', 'translate-y-0');
            el.classList.add('opacity-0', 'translate-y-4');
        }
    });
    s2lines.forEach(el => {
        if (el) {
            el.classList.remove('opacity-100');
            el.classList.add('opacity-0');
        }
    });

    // Step 3
    ['step3-line1', 'step3-line2', 'step3-line3'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('opacity-0');
    });

    // Step 4
    const bars = document.querySelectorAll('.step4-bar');
    bars.forEach(b => {
        b.style.height = '10%';
        b.classList.remove('bg-green-500', 'bg-orange-500');
        b.classList.add('bg-slate-800');
    });
    const percent = document.getElementById('step4-percent');
    if (percent) percent.innerText = '0%';
}

function playStep1Animation() {
    return new Promise((resolve) => {
        const alert = document.getElementById('step1-alert');
        if (!alert) { resolve(); return; }

        // Reset happens automatically when we start again because we toggle classes below?
        // Actually, we must explicit reset at start if we want to ensure it animates "in" again.
        // But the user wants it to STAY until "starts again". 
        // So valid flow: 
        // 1. Loop call 1: Reset -> Animate In -> Stay.
        // 2. Loop call 2: Reset -> Animate In -> Stay.

        // Ensure reset at start
        alert.classList.remove('opacity-100');
        alert.classList.add('opacity-0');

        // Show alert after delay
        setTimeout(() => {
            alert.classList.remove('opacity-0');
            alert.classList.add('opacity-100');

            // End - Resolve immediately (or after short delay) without hiding
            setTimeout(() => {
                resolve();
            }, 1000);
        }, 1500);
    });
}

function playStep2Animation() {
    return new Promise((resolve) => {
        const n1 = document.getElementById('step2-node1');
        const n2 = document.getElementById('step2-node2');
        const n3 = document.getElementById('step2-node3');
        const l1 = document.getElementById('step2-line1');
        const l2 = document.getElementById('step2-line2');

        if (!n1) { resolve(); return; }

        // Reset
        [n1, n2, n3].forEach(el => el.classList.remove('opacity-100', 'translate-y-0'));
        [n1, n2, n3].forEach(el => el.classList.add('opacity-0', 'translate-y-4'));
        [l1, l2].forEach(el => el.classList.remove('opacity-100'));
        [l1, l2].forEach(el => el.classList.add('opacity-0'));

        // Sequence
        setTimeout(() => {
            n1.classList.remove('opacity-0', 'translate-y-4'); // Node 1
            setTimeout(() => {
                l1.classList.remove('opacity-0'); // Line 1
                setTimeout(() => {
                    n2.classList.remove('opacity-0', 'translate-y-4'); // Node 2
                    setTimeout(() => {
                        l2.classList.remove('opacity-0'); // Line 2
                        setTimeout(() => {
                            n3.classList.remove('opacity-0', 'translate-y-4'); // Node 3
                            setTimeout(() => {
                                // Keep final state
                                resolve();
                            }, 500);
                        }, 400);
                    }, 400);
                }, 400);
            }, 400);
        }, 300);
    });
}

function playStep3Animation() {
    return new Promise((resolve) => {
        const l1 = document.getElementById('step3-line1');
        const l2 = document.getElementById('step3-line2');
        const l3 = document.getElementById('step3-line3');

        if (!l1) { resolve(); return; }

        // Reset
        [l1, l2, l3].forEach(el => el.classList.add('opacity-0'));

        // Sequence
        setTimeout(() => {
            l1.classList.remove('opacity-0');
            setTimeout(() => {
                l2.classList.remove('opacity-0');
                setTimeout(() => {
                    l3.classList.remove('opacity-0');
                    setTimeout(() => {
                        // Keep final state
                        resolve();
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
    });
}

function playStep4Animation() {
    return new Promise((resolve) => {
        const bars = document.querySelectorAll('.step4-bar');
        const percent = document.getElementById('step4-percent');

        if (bars.length === 0) { resolve(); return; }

        // Reset
        bars.forEach(b => {
            b.style.height = '10%';
            b.classList.remove('bg-green-500', 'bg-orange-500');
            b.classList.add('bg-slate-800');
        });

        if (percent) percent.innerText = '0%';

        // Sequence
        setTimeout(() => {
            // Bar 1
            bars[0].style.height = '20%';

            setTimeout(() => {
                // Bar 2
                bars[1].style.height = '35%';

                setTimeout(() => {
                    // Bar 3
                    bars[2].style.height = '50%';
                    if (percent) percent.innerText = '45%';

                    setTimeout(() => {
                        // Bar 4
                        bars[3].style.height = '65%';
                        if (percent) percent.innerText = '72%';

                        setTimeout(() => {
                            // Bar 5 (Final)
                            bars[4].style.height = '85%';
                            bars[4].classList.remove('bg-slate-800');
                            bars[4].classList.add('bg-orange-500');
                            if (percent) percent.innerText = '98%';

                            setTimeout(() => {
                                // Keep final state
                                resolve();
                            }, 500);
                        }, 200);

                    }, 200);
                }, 200);
            }, 200);
        }, 300);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                playMethodologyLoop(); // Start the infinite loop
                observer.disconnect(); // Stop observing once triggered
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% visible

    // Observe the first step container to trigger the whole sequence
    const sim1 = document.querySelector('.step1-simulation');
    if (sim1) observer.observe(sim1.closest('section') || sim1);

    // Hero Flashlight Effect
    const heroSection = document.querySelector('.hero-bg');
    const heroContainer = document.getElementById('hero-image-container');
    const heroColorImg = document.getElementById('hero-image-color');

    if (heroSection && heroContainer && heroColorImg) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            heroContainer.style.setProperty('--x', `${x}px`);
            heroContainer.style.setProperty('--y', `${y}px`);

            // Ensure visible when interacting with hero section
            heroColorImg.style.opacity = '1';
        });

        heroSection.addEventListener('mouseleave', () => {
            // Fade out when leaving the entire section
            heroColorImg.style.opacity = '0';
        });
    }

    // Counter Animation Logic
    const counters = document.querySelectorAll('.animate-counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.getAttribute('data-target'));
                const prefix = el.getAttribute('data-prefix') || '';
                const suffix = el.getAttribute('data-suffix') || '';
                const duration = 2000; // 2 seconds

                // Animate
                let startTimestamp = null;
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);

                    // Ease out cubic
                    const easeProgress = 1 - Math.pow(1 - progress, 3);

                    const current = progress === 1 ? target : (Math.floor(easeProgress * target * 10) / 10);

                    // Format: remove decimals if target is integer
                    const displayValue = Number.isInteger(target) ? Math.floor(current) : current.toFixed(1);

                    el.innerText = `${prefix}${displayValue}${suffix}`;

                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    }
                };

                window.requestAnimationFrame(step);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
});

// ROI Chart Logic
let roiChart;

const roiData = {
    ca: {
        hours: {
            label1: 'Hores sense IA (Tradicional)',
            data1: [40, 42, 38, 41],
            label2: 'Hores amb People Code',
            data2: [5, 4, 5, 4],
            color2: '#107090',
            yLabel: 'Hores de Feina',
            unit: ' h',
            desc: "Passa de 40h a 4h mensuals en tasques repetitives dedicant temps al que importa."
        },
        money: {
            label1: 'Cost Operatiu Tradicional',
            data1: [100, 100, 100, 100],
            label2: 'Cost amb People Code',
            data2: [15, 14, 16, 15],
            color2: '#10b981',
            yLabel: 'Cost Relatiu (%)',
            unit: '%',
            desc: "Redueix els costos operatius un 85% automatitzant processos costosos."
        },
        errors: {
            label1: 'Errors humans (Mensuals)',
            data1: [12, 15, 10, 14],
            label2: 'Errors amb IA',
            data2: [0, 1, 0, 0],
            color2: '#109090',
            yLabel: 'Errors Detectats',
            unit: '',
            desc: "Elimina pràcticament tots els errors humans en gestió de dades i comandes."
        }
    },
    es: {
        hours: {
            label1: 'Horas sin IA (Tradicional)',
            data1: [40, 42, 38, 41],
            label2: 'Horas con People Code',
            data2: [5, 4, 5, 4],
            color2: '#107090',
            yLabel: 'Horas de Trabajo',
            unit: ' h',
            desc: "Pasa de 40h a 4h mensuales en tareas repetitivas dedicando tiempo a lo que importa."
        },
        money: {
            label1: 'Coste Operativo Tradicional',
            data1: [100, 100, 100, 100],
            label2: 'Coste con People Code',
            data2: [15, 14, 16, 15],
            color2: '#10b981',
            yLabel: 'Coste Relativo (%)',
            unit: '%',
            desc: "Reduce los costes operativos un 85% automatizando procesos costosos."
        },
        errors: {
            label1: 'Errores humanos (Mensuales)',
            data1: [12, 15, 10, 14],
            label2: 'Errores con IA',
            data2: [0, 1, 0, 0],
            color2: '#109090',
            yLabel: 'Errores Detectados',
            unit: '',
            desc: "Elimina prácticamente todos los errores humanos en gestión de datos y pedidos."
        }
    },
    en: {
        hours: {
            label1: 'Hours without AI (Traditional)',
            data1: [40, 42, 38, 41],
            label2: 'Hours with People Code',
            data2: [5, 4, 5, 4],
            color2: '#107090',
            yLabel: 'Work Hours',
            unit: ' h',
            desc: "Go from 40h to 4h monthly in repetitive tasks, dedicating time to what matters."
        },
        money: {
            label1: 'Traditional Operating Cost',
            data1: [100, 100, 100, 100],
            label2: 'Cost with People Code',
            data2: [15, 14, 16, 15],
            color2: '#10b981',
            yLabel: 'Relative Cost (%)',
            unit: '%',
            desc: "Reduce operating costs by 85% by automatically automating costly processes."
        },
        errors: {
            label1: 'Human Errors (Monthly)',
            data1: [12, 15, 10, 14],
            label2: 'Errors with AI',
            data2: [0, 1, 0, 0],
            color2: '#109090',
            yLabel: 'Detected Errors',
            unit: '',
            desc: "Eliminate virtually all human errors in data and order management."
        }
    }
};

let currentLang = 'ca';
let currentMetric = 'hours';

// Initialize I18n
function initLanguage() {
    const savedLang = localStorage.getItem('iagarriga_lang');
    if (savedLang) {
        currentLang = savedLang;
    } else {
        const browserLang = navigator.language.slice(0, 2);
        if (['ca', 'es', 'en'].includes(browserLang)) {
            currentLang = browserLang;
        } else {
            currentLang = 'ca'; // Default
        }
    }
    changeLanguage(currentLang);
}

window.changeLanguage = function (lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('iagarriga_lang', lang);
    document.documentElement.lang = lang; // Ensure global lang state is updated

    // Apply translations
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                // If checking placeholder attribute if generic, but here we likely target label or specific attr
                // Actually the data-i18n on input/textarea usually means placeholder for cleaner HTML
                // But my HTML puts data-i18n on the LABEL usually. 
                // Let's check my HTML... I added data-i18n to label and data-i18n-placeholder to input.
            } else {
                if (key.includes('html')) {
                    el.innerHTML = translations[lang][key];
                } else {
                    // Start of fade out could be nice here but simple text swap also works
                    el.innerHTML = translations[lang][key];
                }
            }
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    // Update active language styling in Navbar & Mobile Menu (if any visual indicator)
    document.querySelectorAll('button[onclick^="changeLanguage"]').forEach(btn => {
        // Simple heuristic: if text matches currentLang uppercase
        if (btn.innerText === lang.toUpperCase()) {
            btn.classList.remove('text-gray-500');
            btn.classList.add('text-blue-400', 'font-extrabold');
        } else {
            btn.classList.add('text-gray-500');
            btn.classList.remove('text-blue-400', 'font-extrabold');
        }
    });

    // Update Chart
    updateChart(currentMetric);
}

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('roiChart').getContext('2d');

    roiChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['1', '2', '3', '4'],
            datasets: [{
                label: roiData[currentLang].hours.label1,
                data: roiData[currentLang].hours.data1,
                backgroundColor: '#cbd5e1', // Slate-300
                borderRadius: 4,
                barPercentage: 0.6,
            },
            {
                label: roiData[currentLang].hours.label2,
                data: roiData[currentLang].hours.data2,
                backgroundColor: roiData[currentLang].hours.color2,
                borderRadius: 4,
                barPercentage: 0.6,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: { color: '#475569' },
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.dataset.label + ': ' + context.raw + ' h';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#e2e8f0' },
                    ticks: {
                        color: '#64748b',
                        callback: function (value) { return value + ' h'; }
                    },
                    title: {
                        display: true,
                        text: 'Hores de Feina',
                        color: '#475569'
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#64748b' },
                    title: {
                        display: true,
                        text: 'Mesos',
                        color: '#475569'
                    }
                }
            },
            animation: {
                duration: 800,
                easing: 'easeOutQuart'
            }
        }
    });

    // Start I18n
    initLanguage();
});

window.updateChart = function (metric) {
    currentMetric = metric; // Update global tracking
    const data = roiData[currentLang][metric];

    // Update Data
    roiChart.data.datasets[0].label = data.label1;
    roiChart.data.datasets[0].data = data.data1;
    roiChart.data.datasets[1].label = data.label2;
    roiChart.data.datasets[1].data = data.data2;
    roiChart.data.datasets[1].backgroundColor = data.color2;

    // Update Scales & Tooltips
    roiChart.options.scales.y.title.text = data.yLabel;
    roiChart.options.scales.y.ticks.callback = function (value) { return value + data.unit; };
    roiChart.options.scales.x.title.text = translations[currentLang]['roi.chart.month'];
    roiChart.options.plugins.tooltip.callbacks.label = function (context) {
        return context.dataset.label + ': ' + context.raw + data.unit;
    };

    roiChart.update();

    // Update Description Text
    const desc = document.getElementById('chart-description');
    desc.innerText = data.desc;
    desc.classList.remove('animate-pulse');
    void desc.offsetWidth; // trigger reflow
    desc.classList.add('animate-pulse');

    // Update Buttons UI
    ['hours', 'money', 'errors'].forEach(m => {
        const btn = document.getElementById('btn-' + m);
        // Reset base classes
        btn.className = 'px-4 py-2 rounded-lg text-sm font-semibold transition bg-white border border-slate-200 text-slate-500 hover:bg-slate-50';

        // Retain translated text if any (the button text is static in HTML but might have data-i18n)
        // Actually, if we use data-i18n on buttons, innerText will be overwritten by changeLanguage.
        // But here we are just changing classes.

        if (m === metric) {
            btn.classList.remove('bg-white', 'border-slate-200', 'text-slate-500', 'hover:bg-slate-50');
            btn.style.borderColor = 'transparent';
            btn.classList.add('text-white', 'shadow-lg');
            if (metric === 'hours') btn.classList.add('bg-blue-600', 'shadow-blue-900/20');
            if (metric === 'money') btn.classList.add('bg-emerald-600', 'shadow-emerald-900/20');
            if (metric === 'errors') btn.classList.add('bg-violet-600', 'shadow-violet-900/20');
        }
    });
};

// AI Particle Network Animation
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
let particlesArray;

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Handle resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Mouse interaction
const mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Particle Class
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    // Draw particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#60a5fa'; // Blue-400 (Brighter for dark bg)
        ctx.fill();
    }

    // Update particle position
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Check collision with mouse
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 2;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 2;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 2;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 2;
            }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

// Initialize particles
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 1) - 0.5;
        let directionY = (Math.random() * 1) - 0.5;
        let color = '#60a5fa';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Connect particles with lines
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(96, 165, 250,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

init();
animate();

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Cyborg Parallax
    const cyborg = document.getElementById('hero-image-container');
    if (cyborg) {
        // Move at 20% of scroll speed (creates depth perception)
        // Limit to first 1000px to avoid calculating when off-screen
        if (scrolled < 1000) {
            cyborg.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    }
});
// -----------------------------------------------------------------------------
// PHP Form Handling (Query Params)
// -----------------------------------------------------------------------------
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');

    if (status === 'success') {
        const msg = (translations[currentLang]['form.success']) || "Missatge enviat correctament!";
        alert(msg);
        // Clear params
        window.history.replaceState({}, document.title, window.location.pathname);
    } else if (status === 'error') {
        const msg = (translations[currentLang]['form.error']) || "Error en enviar el missatge. Prova-ho més tard.";
        alert(msg);
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});
