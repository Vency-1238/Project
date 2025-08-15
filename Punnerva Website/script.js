// JavaScript for mobile menu, theme switcher, yoga pose, and event gallery
document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Theme Switcher ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('theme-toggle-sun');
    const moonIcon = document.getElementById('theme-toggle-moon');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            if (sunIcon) sunIcon.classList.remove('hidden');
            if (moonIcon) moonIcon.classList.add('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            if (sunIcon) sunIcon.classList.add('hidden');
            if (moonIcon) moonIcon.classList.remove('hidden');
        }
    };

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    applyTheme(currentTheme);

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }

    // --- Yoga Pose of the Day feature ---
    const yogaPoses = [
        {
            name: "Tree Pose (Vrikshasana)",
            image: "https://placehold.co/300x300/a7f3d0/14532d?text=Tree+Pose",
            benefits: "Improves balance, strengthens legs and core, and enhances focus."
        },
        {
            name: "Warrior II (Virabhadrasana II)",
            image: "https://placehold.co/300x300/a7f3d0/14532d?text=Warrior+II",
            benefits: "Strengthens legs and ankles, opens hips and shoulders, and builds stamina."
        },
        {
            name: "Downward-Facing Dog (Adho Mukha Svanasana)",
            image: "https://placehold.co/300x300/a7f3d0/14532d?text=Downward+Dog",
            benefits: "Stretches the entire body, calms the brain, and helps relieve stress."
        },
        {
            name: "Triangle Pose (Trikonasana)",
            image: "https://placehold.co/300x300/a7f3d0/14532d?text=Triangle+Pose",
            benefits: "Stretches legs, hips, and spine. Stimulates abdominal organs."
        }
    ];

    const yogaPoseCard = document.getElementById('yoga-pose-card');
    if (yogaPoseCard) {
        const today = new Date().getDate();
        const poseIndex = today % yogaPoses.length;
        const currentPose = yogaPoses[poseIndex];

        document.getElementById('pose-image').src = currentPose.image;
        document.getElementById('pose-name').textContent = currentPose.name;
        document.getElementById('pose-benefits').textContent = currentPose.benefits;
    }

    // --- Event Gallery Modal ---
    const eventGalleries = {
        'opening-ceremony': {
            title: 'Opening Ceremony',
            images: [
                './photo/openingcermony1.JPG',
                './photo/openingcermony2.JPG',
                './photo/openingcermony3.JPG',
                './photo/openingcermony4.JPG',
                './photo/openingcermony5.JPG'
            ]
        },
        'daily-yoga': {
            title: 'Daily Yoga Sessions',
            images: [
                './photo/dailyyoga1.png',
                './photo/dailyyoga2.png',
                './photo/dailyyoga3.png',
                './photo/dailyyoga4.png',
                './photo/dailyyoga5.png',
                './photo/dailyyoga6.png'
            ]
        },
        'acro-yoga': {
            title: 'Acro Yoga',
            images: [
                './photo/acroyoga1.png',
                './photo/acroyoga2.png',
                './photo/acroyoga3.png',
                './photo/acroyoga4.png',
                './photo/acroyoga5.png',
                './photo/acroyoga6.png'
            ]
        },
        'sound-therapy': {
            title: 'Sound Therapy',
            images: [
                './photo/sound1.png',
                './photo/sound2.png',
                './photo/sound3.png',
                './photo/sound4.png',
                './photo/sound5.png'
            ]
        },
        'intro-session': {
            title: 'Introductory Session',
            images: [
                './photo/intro1.png',
                './photo/intro2.png',
                './photo/intro3.png'
            ]
        },
        'energy-cup': {
            title: 'Energy Cup',
            images: [
                './photo/energycup1.png',
                './photo/energycup2.png',
                './photo/energycup3.png',
                './photo/energycup4.png',
                './photo/energycup5.png',
                './photo/energycup6.png'
            ]
        },
        'face-yoga': {
            title: 'Face Yoga',
            images: [
                './photo/faceyoga1.png',
                './photo/faceyoga2.png',
                './photo/faceyoga3.png'
            ]
        },
        'mental-health': {
            title: 'Pair Yoga',
            images: [
                './photo/pairyoga1.png',
                './photo/pairyoga2.png',
                './photo/pairyoga3.png',
                './photo/pairyoga4.png',
                './photo/pairyoga5.png',
                './photo/pairyoga6.png'
            ]
        }
    };

    const modal = document.getElementById('gallery-modal');
    const modalContent = document.getElementById('modal-content');
    const modalTitle = document.getElementById('modal-title');
    const modalGrid = document.getElementById('modal-grid');
    const modalClose = document.getElementById('modal-close');
    const eventCards = document.querySelectorAll('.event-card');

    const openModal = (eventKey) => {
        const eventData = eventGalleries[eventKey];
        if (!eventData) return;

        modalTitle.textContent = eventData.title;
        modalGrid.innerHTML = ''; // Clear previous images

        eventData.images.forEach(imgUrl => {
            const img = document.createElement('img');
            img.src = imgUrl;
            img.alt = eventData.title;
            img.className = 'w-full h-auto rounded-lg object-cover';
            modalGrid.appendChild(img);
        });

        modal.classList.remove('opacity-0', 'pointer-events-none');
        modalContent.classList.remove('scale-95');
    };

    const closeModal = () => {
        modal.classList.add('opacity-0', 'pointer-events-none');
        modalContent.classList.add('scale-95');
    };

    eventCards.forEach(card => {
        card.addEventListener('click', () => {
            const eventKey = card.dataset.event;
            openModal(eventKey);
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});
