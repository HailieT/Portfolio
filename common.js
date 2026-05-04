/* ============================================
   COMMON JAVASCRIPT FOR ALL PAGES
   This file handles shared functionality across the website
   ============================================ */

// === DARK MODE FUNCTIONALITY ===
// Handles theme switching and persistence
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const mobileDarkModeToggle = document.getElementById('dark-mode-toggle-mobile');
    const body = document.body;
    
    console.log('Dark mode init:', { darkModeToggle, mobileDarkModeToggle }); // Debug
    
    // Load saved preference from localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    if (isDarkMode) {
        body.classList.add('dark-mode');
        updateDarkModeUI(true);
    } else {
        updateDarkModeUI(false);
    }
    
    // Desktop toggle handler
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            console.log('Desktop toggle clicked'); // Debug
            toggleDarkMode();
        });
    }
    
    // Mobile toggle handler
    if (mobileDarkModeToggle) {
        mobileDarkModeToggle.addEventListener('click', (e) => {
            console.log('Mobile toggle clicked'); // Debug
            e.preventDefault();
            e.stopPropagation();
            toggleDarkMode();
        });
    }
    
    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        
        console.log('Dark mode toggled:', isDark); // Debug
        
        updateDarkModeUI(isDark);
        
        // Save preference
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    }
    
    function updateDarkModeUI(isDark) {
        const icon = isDark ? '☀️' : '🌙';
        const label = isDark ? 'Light mode' : 'Dark mode';
        
        if (darkModeToggle) {
            darkModeToggle.textContent = icon;
            darkModeToggle.setAttribute('aria-label', label + ', currently ' + (isDark ? 'on' : 'off'));
        }
        if (mobileDarkModeToggle) {
            mobileDarkModeToggle.textContent = icon;
            mobileDarkModeToggle.setAttribute('aria-label', label + ', currently ' + (isDark ? 'on' : 'off'));
        }
    }
}

// === ACTIVE PAGE INDICATOR ===
// Highlights current page in navigation
function setActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// === MOBILE MENU FUNCTIONALITY ===
// Handles mobile menu open/close and overlay
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    if (!mobileMenuButton || !mobileMenu || !mobileMenuOverlay) return;

    // Toggle menu on button click
    mobileMenuButton.addEventListener('click', () => {
        const isExpanded = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        mobileMenuOverlay.classList.toggle('show');
        mobileMenuButton.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });

    // Close menu when clicking overlay
    mobileMenuOverlay.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuOverlay.classList.remove('show');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
    });

    // Close menu when clicking any link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuOverlay.classList.remove('show');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        });
    });
}

// === SCROLL TO TOP BUTTON ===
// Shows/hides button based on scroll position
// To change when button appears, modify the threshold value (currently 300px)
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (!scrollToTopBtn) return;
    
    // Show button after scrolling 300px
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // Smooth scroll to top on click
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// === REVEAL ANIMATION ON SCROLL ===
// Animates elements as they come into view
function initRevealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    if (reveals.length === 0) return;
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => revealObserver.observe(reveal));
}

// === FLOATING HEARTS ANIMATION ===
// Static hearts are now in HTML for all pages
// This function is disabled to prevent duplicate/giant hearts
function initFloatingHearts() {
    // Disabled - hearts are now static SVG elements in HTML
    // If you want to re-enable dynamic hearts, uncomment the code below
    /*
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = '💖';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        document.body.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => heart.remove(), 20000);
    }, 3000);
    */
}

// === SPARKLE CURSOR EFFECT ===
// Creates heart sparkles that follow mouse movement
// To change heart frequency, modify the timing check
let lastSparkleTime = 0;
function initSparkleEffect() {
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        // Create heart every 100ms
        if (now - lastSparkleTime > 100) {
            createSparkle(e.pageX, e.pageY);
            lastSparkleTime = now;
        }
    });
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    // Add heart SVG instead of just a dot
    sparkle.innerHTML = '<svg viewBox="0 0 32 29.6"><path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/></svg>';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.position = 'fixed'; // Use fixed positioning to prevent scroll issues
    document.body.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => sparkle.remove(), 600);
}

// === INITIALIZE ALL FEATURES ===
// Called when page loads
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    setActivePage();
    initMobileMenu();
    initScrollToTop();
    initRevealOnScroll();
    // initFloatingHearts(); // DISABLED - Static SVG hearts are in HTML instead
    initSparkleEffect();
    initChatbot();
});



// ============================================
// AI CHATBOT ASSISTANT
// A smart assistant that knows everything about Hailie
// To update info, edit the knowledgeBase object below
// ============================================

function initChatbot() {
    // --- Build the chat widget HTML ---
    const chatHTML = `
    <button class="chat-toggle" id="chat-toggle" aria-label="Open chat assistant">💬</button>
    <div class="chat-window" id="chat-window" role="dialog" aria-label="Chat with Hailie's AI assistant">
        <div class="chat-header">
            <div class="chat-header-info">
                <div class="chat-header-avatar">🤖</div>
                <div>
                    <h3>Hailie's Assistant</h3>
                    <p>Ask me anything!</p>
                </div>
            </div>
            <button class="chat-close" id="chat-close" aria-label="Close chat">&times;</button>
        </div>
        <div class="chat-messages" id="chat-messages"></div>
        <div class="chat-quick-replies" id="chat-quick-replies"></div>
        <div class="chat-input-area">
            <input type="text" class="chat-input" id="chat-input" placeholder="Ask about Hailie..." aria-label="Type your message">
            <button class="chat-send" id="chat-send" aria-label="Send message">➤</button>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', chatHTML);

    const toggle = document.getElementById('chat-toggle');
    const window_ = document.getElementById('chat-window');
    const closeBtn = document.getElementById('chat-close');
    const messagesEl = document.getElementById('chat-messages');
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const quickRepliesEl = document.getElementById('chat-quick-replies');

    // --- Toggle chat open/close ---
    toggle.addEventListener('click', () => {
        const isOpen = window_.classList.toggle('open');
        toggle.textContent = isOpen ? '✕' : '💬';
        if (isOpen && messagesEl.children.length === 0) showWelcome();
    });

    closeBtn.addEventListener('click', () => {
        window_.classList.remove('open');
        toggle.textContent = '💬';
    });

    // --- Send message on Enter or button click ---
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });

    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;
        addMsg(text, 'user');
        input.value = '';
        quickRepliesEl.innerHTML = '';
        showTyping();
        setTimeout(() => {
            removeTyping();
            const reply = getReply(text);
            addMsg(reply, 'bot');
            showFollowUps(text);
        }, 600 + Math.random() * 400);
    }

    function addMsg(text, sender) {
        const div = document.createElement('div');
        div.className = 'chat-msg ' + sender;
        div.innerHTML = text;
        messagesEl.appendChild(div);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function showTyping() {
        const div = document.createElement('div');
        div.className = 'chat-typing';
        div.id = 'chat-typing';
        div.innerHTML = '<span></span><span></span><span></span>';
        messagesEl.appendChild(div);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function removeTyping() {
        const t = document.getElementById('chat-typing');
        if (t) t.remove();
    }

    function showQuickReplies(options) {
        quickRepliesEl.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'chat-quick-btn';
            btn.textContent = opt;
            btn.addEventListener('click', () => {
                input.value = opt;
                sendMessage();
            });
            quickRepliesEl.appendChild(btn);
        });
    }

    function showWelcome() {
        addMsg("Hi there! 👋 I'm Hailie's virtual assistant. I can tell you about her projects, experience, skills, and more. What would you like to know?", 'bot');
        showQuickReplies(['Who is Hailie?', 'Her projects', 'Experience', 'Contact info', 'Skills']);
    }

    function showFollowUps(query) {
        const q = query.toLowerCase();
        if (q.includes('project')) {
            showQuickReplies(['Game projects', 'Web projects', 'Hackathons', 'Contact info']);
        } else if (q.includes('experience') || q.includes('work')) {
            showQuickReplies(['Her projects', 'Skills', 'Awards', 'Contact info']);
        } else if (q.includes('contact') || q.includes('email')) {
            showQuickReplies(['Her projects', 'Who is Hailie?', 'Testimonials']);
        } else {
            showQuickReplies(['Projects', 'Experience', 'Skills', 'Contact info']);
        }
    }

    // ============================================
    // KNOWLEDGE BASE
    // Edit this to update what the chatbot knows
    // ============================================
    function getReply(query) {
        const q = query.toLowerCase().trim();

        // --- Greetings ---
        if (/^(hi|hello|hey|sup|yo|howdy|greetings|what'?s up)[\s!?.]*$/i.test(q)) {
            const g = ["Hey there! 👋 Welcome to Hailie's corner of the internet. What can I help you find?","Hi! 😊 I know basically everything about Hailie (she told me to say that). What would you like to know?","Hey! 👋 Ask me anything about Hailie — projects, experience, skills, or just some fun facts!"];
            return g[Math.floor(Math.random() * g.length)];
        }

        // --- Employer / Boss (MUST be before name check) ---
        if (q.includes('employer') || q.includes('boss') || q.includes('manager') || q.includes('supervisor') || q.includes('work for') || q.includes('work under') || q.includes('report to')) {
            return "Hailie has a few! Here's the lineup:<br>💻 <b>Derek Kooi</b> — supervises her ITS Emerging Technology internship<br>🎮 <b>Arcvale Studio</b> — where she interns on Prawmite<br>🏠 <b>FSU Housing</b> — her Desk Assistant gig<br>📣 <b>DevLUp Club</b> — she's the Social Chair (technically her own boss on that one 😄)";
        }

        // --- Teammates / Collaborators (before name check) ---
        if (q.includes('teammate') || (q.includes('team') && q.includes('member')) || q.includes('collaborat') || q.includes('work with') || q.includes('worked with') || q.includes('partner')) {
            return "Hailie's worked with some great people!<br>🧠 <b>Team Netrunners</b> (AI Maker): Alan Villarreal, Alan Bernal, Wilson Shi<br>🌐 <b>Katya Serechenko</b> — Big Event Website collab<br>🎮 <b>Jackson's team</b> — Spider Sol at Horror Jam 🤝";
        }

        // --- Professor / Teacher (before name check) ---
        if (q.includes('professor') || q.includes('teacher') || q.includes('instructor')) {
            return "<b>Jackson Anderson</b> is her VR Development 1 & 2 professor! He said: <i>\"A phenomenal student, a great developer, but do not ever ask her to name a variable.\"</i> 😂 Iconic.";
        }

        // --- Name (only if NOT asking about someone else) ---
        if ((q.includes('name') || q.includes('called')) && !q.includes('employer') && !q.includes('boss') && !q.includes('professor') && !q.includes('team') && !q.includes('variable')) {
            return "Her name is <b>Hailie Tucker</b>! Aspiring game dev, CS student, and the person whose portfolio you're currently browsing. 😄✨";
        }

        // --- Who is she / About ---
        if (q.includes('who is') || q.includes('who\'s') || q.includes('tell me about') || q === 'about' || q.includes('introduce') || (q.includes('about') && q.includes('hailie'))) {
            return "That's <b>Hailie Tucker</b>! CS student at <a href='https://www.fsu.edu' target='_blank'>FSU</a>, game dev enthusiast, and builder of cool things. She contributes to <b>DevLUp</b> and <b>Arcvale</b>, and honestly just loves making stuff. 🎮";
        }

        // --- Age / Birthday (with actual info) ---
        if (q.includes('age') || q.includes('how old') || q.includes('birthday') || q.includes('born') || q.includes('birth')) {
            return "Hailie was born on <b>November 27, 2004</b>! 🎂 A Sagittarius — which honestly explains the ambition and the stubbornness. ♐";
        }

        // --- Location ---
        if (q.includes('where') && (q.includes('live') || q.includes('from') || q.includes('located') || q.includes('based'))) {
            return "Hailie is based in <b>Tallahassee, Florida</b> — home of the Seminoles and apparently a lot of game dev energy. 🏠🎮";
        }

        // === PERSONAL FAVORITES (must be BEFORE generic favorite check) ===

        // --- Favorite food ---
        if ((q.includes('food') || q.includes('eat') || q.includes('meal') || q.includes('dinner') || q.includes('lunch')) && (q.includes('favorite') || q.includes('favourite') || q.includes('like') || q.includes('love') || q.includes('best') || q.includes('what'))) {
            return "<b>Chicken Alfredo</b> 🍝 — the ultimate comfort food. She's a woman of taste (literally).";
        }

        // --- Favorite dessert ---
        if (q.includes('dessert') || q.includes('sweet') || q.includes('treat') || q.includes('pastry') || q.includes('bake') || q.includes('cinnamon')) {
            return "<b>Cinnamon rolls</b> 🍩 — warm, gooey, and absolutely elite. Don't argue with her on this one.";
        }

        // --- Favorite color ---
        if (q.includes('color') || q.includes('colour')) {
            return "<b>Coral</b> 🪸 — which honestly makes this whole pink-and-orange website make a lot more sense, doesn't it? 😄";
        }

        // --- Favorite game ---
        if ((q.includes('game') && !q.includes('project') && !q.includes('jam')) && (q.includes('favorite') || q.includes('favourite') || q.includes('like') || q.includes('play'))) {
            return "That's a great question — you should ask her directly! 🎮 <a href='mailto:hlt22c@fsu.edu'>Email Hailie</a> or hit her up on <a href='https://discord.com/users/829684294413713468' target='_blank'>Discord</a> to find out!";
        }

        // --- Favorite movie / show / music / book / anime ---
        if ((q.includes('movie') || q.includes('film') || q.includes('show') || q.includes('tv') || q.includes('music') || q.includes('song') || q.includes('book') || q.includes('anime') || q.includes('manga') || q.includes('band') || q.includes('artist') || q.includes('watch') || q.includes('listen') || q.includes('read')) && (q.includes('favorite') || q.includes('favourite') || q.includes('like') || q.includes('love') || q.includes('best') || q.includes('what') || q.includes('recommend'))) {
            return "Ooh, I don't have that intel! 🤔 You'll have to ask Hailie yourself — <a href='mailto:hlt22c@fsu.edu'>email her</a> or find her on <a href='https://www.instagram.com/hailiethehuman/' target='_blank'>Instagram</a>. I'm sure she'd love to chat about it!";
        }

        // --- Favorite animal / pet ---
        if (q.includes('animal') || q.includes('pet') || q.includes('dog') || q.includes('cat')) {
            return "I don't have that on file! 🐾 Ask Hailie directly — <a href='mailto:hlt22c@fsu.edu'>email her</a> or DM on <a href='https://www.instagram.com/hailiethehuman/' target='_blank'>Instagram</a>!";
        }

        // --- Generic favorite (catch-all for unknown favorites) ---
        if (q.includes('favorite') || q.includes('favourite')) {
            return "Hmm, I don't know that specific favorite! 🤔 The ones I DO know:<br>🍝 Food: <b>Chicken Alfredo</b><br>🍩 Dessert: <b>Cinnamon Rolls</b><br>🪸 Color: <b>Coral</b><br>For anything else, ask Hailie directly! <a href='mailto:hlt22c@fsu.edu'>Email her</a> 😊";
        }

        // --- Best project (separate from favorites) ---
        if (q.includes('best') || q.includes('proudest') || q.includes('biggest')) {
            return "Tough call! The <b>Big Event Website</b> (1,200+ real users!) and the <b>AI Maker Challenge</b> ($2,500 prize 💰) are probably the biggest flex. <a href='Projects.html'>Judge for yourself</a>!";
        }

        // === RANDOM PERSONAL QUESTIONS ===

        // --- Zodiac / Star sign ---
        if (q.includes('zodiac') || q.includes('sign') || q.includes('horoscope') || q.includes('sagittarius')) {
            return "She's a <b>Sagittarius</b> ♐ (November 27). Ambitious, adventurous, and a little stubborn — sounds about right for someone juggling 4 jobs and 9 projects. 😄";
        }

        // --- Relationship / Single / Dating ---
        if (q.includes('single') || q.includes('dating') || q.includes('boyfriend') || q.includes('girlfriend') || q.includes('relationship') || q.includes('taken')) {
            return "Her radar chart says Romance: 25%. She's too busy building games and winning hackathons to worry about that. 😂💻 Next question!";
        }

        // --- Height ---
        if (q.includes('height') || q.includes('tall') || q.includes('short')) {
            return "<b>5'2 and three quarters</b> — and yes, the three quarters is VERY important. Don't you dare round down. 😤📏";
        }

        // --- GPA / Grades ---
        if (q.includes('gpa') || q.includes('grade') || q.includes('academic')) {
            return "I don't have her GPA on file, but given the 2nd place finishes and 4 simultaneous roles... she's doing just fine. 📚💪";
        }

        // --- Salary / Money ---
        if (q.includes('salary') || q.includes('money') || q.includes('pay') || q.includes('income') || q.includes('how much')) {
            return "That's between Hailie and her bank account! 💰😂 I can tell you she won $2,500 in AWS credits though. That counts, right?";
        }

        // --- Phone number ---
        if (q.includes('phone') || q.includes('number') || q.includes('call')) {
            return "I can't give out phone numbers! 📱 But you can reach her at <a href='mailto:hlt22c@fsu.edu'>hlt22c@fsu.edu</a> or on <a href='https://discord.com/users/829684294413713468' target='_blank'>Discord</a>.";
        }

        // --- Address / Where does she live specifically ---
        if (q.includes('address') || q.includes('dorm') || q.includes('apartment')) {
            return "Nice try! 🕵️ I'm not giving out addresses. She's at FSU in Tallahassee, Florida — that's all you're getting from me. 😄";
        }

        // --- Why game dev / motivation ---
        if (q.includes('why') && (q.includes('game') || q.includes('programming') || q.includes('coding') || q.includes('computer science'))) {
            return "Her journey into tech began with the escape that games allowed in her childhood. She originally loved math, but got drawn to the creativity of game dev and programming. It's been a passion ever since! 🎮✨";
        }

        // --- How many jobs ---
        if (q.includes('how many') && (q.includes('job') || q.includes('role') || q.includes('position'))) {
            return "<b>4 roles</b> at the same time! ITS Intern, Arcvale Intern, DevLUp Social Chair, and FSU Desk Assistant. Sleep is optional apparently. 😴💪";
        }

        // --- How many projects ---
        if (q.includes('how many') && q.includes('project')) {
            return "<b>9 projects</b> and counting. Quality AND quantity. 💅 <a href='Projects.html'>See them all</a>!";
        }

        // --- Skills ---
        if (q.includes('skill') || q.includes('tech') || (q.includes('language') && !q.includes('speak')) || q.includes('tool') || q.includes('know how') || q.includes('can she do') || q.includes('good at') || q.includes('stack')) {
            return "Hailie's toolkit: <b>C++, C#, HTML & CSS, Git & GitHub, Blender,</b> and <b>Unity</b>. Basically a Swiss Army knife of game dev and web dev. 🛠️ Just don't ask her to name variables (her professor's words, not mine 😂).";
        }

        // --- Education ---
        if (q.includes('school') || q.includes('education') || q.includes('university') || q.includes('degree') || q.includes('major') || q.includes('study') || q.includes('college') || q.includes('fsu')) {
            return "<b>B.S. in Computer Science</b> at <a href='https://www.fsu.edu' target='_blank'>Florida State University</a> (Fall 2023 - Present). Coursework: Computer Org, VR Development, Data Structures & Algorithms. She's learning the hard stuff so she can make the fun stuff. 🎓";
        }

        // --- Contact ---
        if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('message') || q.includes('get in touch')) {
            return "Want to reach Hailie? Here you go:<br>📧 <a href='mailto:hlt22c@fsu.edu'>hlt22c@fsu.edu</a><br>🔗 <a href='https://www.linkedin.com/in/hailie-tucker-b56725300/' target='_blank'>LinkedIn</a><br>🐙 <a href='https://github.com/HailieT' target='_blank'>GitHub</a><br>📸 <a href='https://www.instagram.com/hailiethehuman/' target='_blank'>Instagram</a><br>🎮 <a href='https://discord.com/users/829684294413713468' target='_blank'>Discord</a><br>🕹️ <a href='https://hailiet.itch.io/' target='_blank'>Itch.io</a><br>She doesn't bite. Probably. 😄";
        }

        // --- Resume ---
        if (q.includes('resume') || q.includes('cv')) {
            return "You can view Hailie's resume here: <a href='Hailie%20Tucker%20Resume.pdf' target='_blank'>Download Resume (PDF)</a> 📄";
        }

        // --- Game projects ---
        if (q.includes('game') && q.includes('project') || q === 'game projects') {
            return "Hailie's game projects include:<br>🎮 <b>Prawmite</b> - Arcvale's biggest game (since 2019)<br>🌌 <b>Orbital Odyssey</b> - First DevLUp project (Blender assets)<br>⚔️ <b>Dawn of Dion</b> - 2025-2026 DevLUp game<br>🥽 <b>Viverse</b> - VR competition entry (<a href='https://hailiet.itch.io/haven' target='_blank'>play it!</a>)<br>🕷️ <b>Spider Sol</b> - Horror Jam game (<a href='https://jdevo.itch.io/spidersol' target='_blank'>play it!</a>)<br>🏓 <b>VR Pickleball</b> - Class project (<a href='https://hailiet.itch.io/vrpickleball' target='_blank'>play it!</a>)";
        }

        // --- Web projects ---
        if (q.includes('web') && q.includes('project') || q === 'web projects') {
            return "Hailie's web projects include:<br>🌐 <b>DevLUp Club Website</b> - <a href='https://devlupfsu.netlify.app/' target='_blank'>View live</a><br>🎉 <b>Big Event Reveal Website</b> - 1200-1500 users! <a href='https://thebigevent.github.io/TBE2026/' target='_blank'>View live</a><br>🍦 <b>Nakai's Ice Cream Truck</b> - Small business website<br>💼 <b>This portfolio!</b> - hailietucker.com";
        }

        // --- Hackathons ---
        if (q.includes('hackathon') || q.includes('competition') || q.includes('jam')) {
            return "Hailie's hackathon experience:<br>🏆 <b>AI Maker Challenge - 2nd Place</b> (Feb-Mar 2026) - Won $2,500 AWS credits with Team Netrunners<br>🎓 <b>Faculty Research Awards - 2nd Place</b> (Mar 2026)<br>🕷️ <b>DevLUp Horror Jam</b> (Oct 2025) - Created 'Spider Sol'<br>🥽 <b>Viverse Competition</b> - VR game entry";
        }

        // --- All projects ---
        if (q.includes('project') || q.includes('portfolio') || q.includes('work') && q.includes('on')) {
            return "Hailie has <b>9 projects</b> spanning games, web, and hackathons! Here are the highlights:<br>🎮 <b>Prawmite</b> - Arcvale's biggest game<br>🏆 <b>AI Maker Challenge</b> - 2nd place, $2,500 prize<br>🎉 <b>Big Event Website</b> - 1200+ users<br>⚔️ <b>Dawn of Dion</b> - DevLUp 2025-2026<br>🌐 <b>DevLUp Club Website</b><br>Check the <a href='Projects.html'>Projects page</a> for all of them!";
        }

        // --- Experience / Work / Jobs ---
        if (q.includes('experience') || q.includes('job') || q.includes('work') || q.includes('intern') || q.includes('career')) {
            return "Hailie stays booked and busy:<br>💻 <b>ITS Emerging Tech Intern</b> (Spring 2026+) — VR dev under Derek Kooi<br>🎮 <b>Arcvale Intern</b> (Summer 2025+) — UI mods & bug fixes<br>📣 <b>DevLUp Social Chair</b> (Fall 2025+) — social media & events<br>🏠 <b>FSU Desk Assistant</b> (Summer 2024+) — 24/7 desk coverage<br>More on the <a href='Experience.html'>Experience page</a>!";
        }

        // --- Awards ---
        if (q.includes('award') || q.includes('achievement') || q.includes('certificate') || q.includes('won') || q.includes('prize')) {
            return "Hailie's awards & achievements:<br>🏆 <b>AI Maker Challenge - 2nd Place</b> ($2,500 AWS credits)<br>🎓 <b>Faculty Research Awards - 2nd Place</b><br>🎮 <b>DevLUp Horror Jam Participant</b><br>🏛️ <b>ITS RISE Together Showcase</b> - Selected presenter (April 7, 2026)";
        }

        // --- 3D Models ---
        if (q.includes('3d') || q.includes('model') || q.includes('blender')) {
            return "Hailie creates 3D models in Blender! Her gallery includes:<br>🏓 Pickleball<br>⛄ Snowman<br>🎁 Present<br>🛢️ Barrel<br>☕ Coffee Mug<br>♟️ Pawn<br>✏️ ITS Pencil Holder<br>Check them out on the <a href='3DModels.html'>3D Models page</a> - you can rotate them and download the .GLB files!";
        }

        // --- Testimonials ---
        if (q.includes('testimonial') || q.includes('recommendation') || q.includes('said about') || q.includes('review')) {
            return "People love working with Hailie! Here are some quotes:<br><br>💬 <b>Katya Serechenko:</b> \"She's dedicated to her craft... she always gives great advice.\"<br><br>💬 <b>Alan Bernal:</b> \"Her effective communication demonstrates commitment and dedication.\"<br><br>💬 <b>Jackson Anderson</b> (Professor): \"A phenomenal student, a great developer, but do not ever ask her to name a variable.\" 😄<br><br>See all on the <a href='Testimonials.html'>Testimonials page</a>!";
        }

        // --- DevLUp ---
        if (q.includes('devlup') || q.includes('club')) {
            return "<b>DevLUp</b> is a game development club at FSU where Hailie serves as <b>Social Chair</b>. She manages their social media, organized a collaboration with WiCS (Women in Computer Science), and created their <a href='https://devlupfsu.netlify.app/' target='_blank'>club website</a>. She's also worked on DevLUp games like Orbital Odyssey and Dawn of Dion! 🎮";
        }

        // --- Arcvale ---
        if (q.includes('arcvale')) {
            return "Hailie has been an <b>Arcvale Intern</b> since Summer 2025. She works on UI modifications and minor bug fixes in an Agile environment. She's also helping with <b>Prawmite</b>, Arcvale's biggest game that's been in development since 2019! 🎮";
        }

        // --- Big Event ---
        if (q.includes('big event')) {
            return "Hailie collaborated with <a href='https://kittyyykattt.github.io' target='_blank'>Katya Serechenko</a> to create the <b>Big Event Reveal Website</b> for 1,200-1,500 volunteers from FSU, FAMU, and TCC. It launched on February 18, 2026! <a href='https://thebigevent.github.io/TBE2026/' target='_blank'>Check it out</a> 🎉";
        }

        // --- AI Maker ---
        if (q.includes('ai maker') || q.includes('netrunner') || q.includes('aws')) {
            return "Hailie's team <b>Netrunners</b> placed <b>2nd</b> in the AI Maker Challenge (Feb 27 - Mar 3, 2026), hosted by AWS and FSU. They won <b>$2,500 in AWS credits</b>! She also presented the project at the Faculty Research Awards Ceremony. 🏆";
        }

        // --- ITS / Showcase ---
        if (q.includes('its') || q.includes('showcase') || q.includes('rise together')) {
            return "Hailie was selected to present at the <b>ITS RISE Together Showcase</b> on April 7, 2026 (1:00-4:30 PM) at the Florida State Conference Center. She also works as an <b>ITS Emerging Technology Intern</b> doing VR development! <a href='https://its.fsu.edu/about-its/initiatives/its-rise-together-showcase' target='_blank'>Learn more</a>";
        }

        // --- VR ---
        if (q.includes('vr') || q.includes('virtual reality')) {
            return "Hailie loves VR development! She's created:<br>🥽 <b>Viverse</b> - Competition entry (<a href='https://hailiet.itch.io/haven' target='_blank'>play it</a>)<br>🏓 <b>VR Pickleball</b> - Class project (<a href='https://hailiet.itch.io/vrpickleball' target='_blank'>play it</a>)<br>She also works on VR at her <b>ITS Emerging Tech Internship</b> and took VR Development 1 & 2 courses!";
        }

        // --- Fun / personality ---
        if (q.includes('fun fact') || q.includes('personality') || q.includes('stat') || q.includes('hobby') || q.includes('interest') || q.includes('random') || q.includes('something cool')) {
            const f = ["Stats: Sociability 90%, Determination 90%, Charisma 88%... Romance 25%. Too busy shipping code to ship relationships. 😂💻","Her professor said \"do not ever ask her to name a variable.\" Legend behavior. 😂","She's worked on a game since 2019 (Prawmite). Commitment or stubbornness? Yes. 🎮","She built a website for 1,200+ real users. Most students can barely get their mom to visit their portfolio. 😄🎉"];
            return f[Math.floor(Math.random() * f.length)];
        }

        // --- Thanks ---
        if (q.includes('thank') || q.includes('thanks') || q.includes('thx') || q.includes('appreciate')) {
            return "Anytime! 😊 Go explore the rest of Hailie's portfolio!";
        }

        // --- Bye ---
        if (q.includes('bye') || q.includes('goodbye') || q.includes('see ya') || q.includes('later') || q.includes('gtg')) {
            return "Later! 👋 Thanks for stopping by!";
        }

        // --- What can you do ---
        if (q.includes('what can you') || (q.includes('help') && q.length < 20) || q.includes('what do you know') || q.includes('how do you work') || q.includes('what are you')) {
            return "I'm Hailie's personal hype bot — I mean, assistant. 😄 I know about:<br>• 👤 Who she is<br>• 💻 Projects<br>• 💼 Experience, employers, teammates<br>• 🛠️ Skills<br>• 🏆 Awards<br>• 🎨 3D Models<br>• 📧 Contact & socials<br>• 💬 Testimonials<br>• 🎲 Fun facts & jokes";
        }

        // --- Likes / Passions ---
        if ((q.includes('like') || q.includes('enjoy') || q.includes('love') || q.includes('passion')) && (q.includes('she') || q.includes('her') || q.includes('hailie'))) {
            return "Game dev, web dev, 3D modeling, VR, and hanging out with cool people. If it involves creating something cool, she's in. 💖";
        }

        // --- Major ---
        if (q.includes('major') || q.includes('studying')) {
            return "<b>Computer Science</b> at FSU! Learning the theory so she can break the rules creatively. 🎓";
        }

        // --- GitHub ---
        if (q.includes('github') || q.includes('repo')) {
            return "<a href='https://github.com/HailieT' target='_blank'>github.com/HailieT</a> 🐙";
        }

        // --- LinkedIn ---
        if (q.includes('linkedin')) {
            return "<a href='https://www.linkedin.com/in/hailie-tucker-b56725300/' target='_blank'>Hailie on LinkedIn</a> 🔗";
        }

        // --- Instagram ---
        if (q.includes('instagram') || q.includes('insta')) {
            return "<a href='https://www.instagram.com/hailiethehuman/' target='_blank'>@hailiethehuman</a> 📸";
        }

        // --- Are you real / AI ---
        if (q.includes('are you real') || q.includes('are you ai') || q.includes('are you a bot') || q.includes('are you human')) {
            return "I'm an AI living inside this portfolio. I don't eat, sleep, or name variables poorly — unlike some people. 😏🤖";
        }

        // --- Joke ---
        if (q.includes('joke') || q.includes('funny') || q.includes('laugh')) {
            const j = ["Why do programmers prefer dark mode? Because light attracts bugs. 🐛😂","Her professor said don't ask her to name a variable. I asked anyway. She named it 'x'. I rest my case. 😂","How many projects does it take to fill a portfolio? Apparently 9 and counting. She doesn't know how to stop. 😄"];
            return j[Math.floor(Math.random() * j.length)];
        }

        // --- Default fallback ---
        return "Hmm, I don't have a great answer for that one! 🤔 Try asking about:<br>• 👤 Her <b>name</b>, <b>age</b>, or <b>background</b><br>• 💻 <b>Projects</b><br>• 💼 <b>Experience</b>, <b>employers</b>, or <b>teammates</b><br>• 🛠️ <b>Skills</b><br>• 🏆 <b>Awards</b><br>• 🎨 <b>3D Models</b><br>• 📧 <b>Contact</b> & socials<br>• 💬 <b>Testimonials</b><br>• 🎲 <b>Fun facts</b>, <b>favorites</b>, or <b>jokes</b><br>Or if it's really personal, <a href='mailto:hlt22c@fsu.edu'>ask Hailie herself</a>! 😊";
    }
}
