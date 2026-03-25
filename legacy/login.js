document.addEventListener('DOMContentLoaded', () => {
    // Check existing sessions
    const curStaff = localStorage.getItem('currentUser');
    if (curStaff) {
        const isAdv = JSON.parse(localStorage.getItem('nammaGCE_AdvisorList') || '[]').some(a => a.name === curStaff) || curStaff === 'Thenmozhi';
        const isHod = (curStaff === 'kavitha');
        if (isHod) return window.location.href = 'hod-portal.html';
        if (isAdv) return window.location.href = 'advisor-portal.html';
        return window.location.href = 'staff-dashboard.html';
    }
    
    if (localStorage.getItem('studentSessionRegNo')) {
        return window.location.href = 'student-portal.html';
    }
    
    if (localStorage.getItem('parentSessionRegNo')) {
        return window.location.href = 'parent-dashboard.html';
    }

    // Generate initial captchas
    generateCaptcha('student');
    generateCaptcha('parent');

    // Staff Login Form Handling
    const staffForm = document.getElementById('staff-login-form');
    if (staffForm) {
        staffForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('staff-username').value.trim();
            const password = document.getElementById('staff-password').value;
            const submitBtn = document.getElementById('staff-submit');

            const staffList = JSON.parse(localStorage.getItem('nammaGCE_StaffList') || '[]');
            const advisorList = JSON.parse(localStorage.getItem('nammaGCE_AdvisorList') || '[]');
            
            const isStaff = staffList.find(s => s.name === username && s.password === password) || 
                            (username === 'thilagavathe' && password === 'thilaga123') ||
                            (username === 'gv' && password === 'gv123') ||
                            (username === 'kalaivani s' && password === 'kalaivani123') ||
                            (username === 'annaporani' && password === 'annaporani123') ||
                            (username === 'Gayathri' && password === 'gayathri123') ||
                            (username === 'Vasuki' && password === 'vasuki123');
            
            const isAdvisor = advisorList.find(a => a.name === username && a.password === password) || 
                               (username === 'Thenmozhi' && password === 'thenmozhi123');

            const isHOD = (username === 'kavitha' && password === 'kavitha123');

            if (isStaff || isAdvisor || isHOD) {
                submitBtn.textContent = 'Redirecting...';
                submitBtn.disabled = true;
                localStorage.setItem('currentUser', username);
                setTimeout(() => {
                    let target = 'staff-dashboard.html';
                    if (isAdvisor) target = 'advisor-portal.html';
                    if (isHOD) target = 'hod-portal.html';
                    window.location.href = target;
                }, 1000);
            } else {
                alert('Invalid Credentials for Staff/Institution Access');
            }
        });
    }

    // Student Login Handling
    const studentForm = document.getElementById('student-login-form');
    if (studentForm) {
        studentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const regNo = document.getElementById('student-regno').value.trim();
            const captchaInput = document.getElementById('student-captcha-input').value.trim();
            const captchaActual = document.getElementById('student-captcha-display').textContent;
            const submitBtn = document.getElementById('student-submit');

            if (captchaInput.toUpperCase() !== captchaActual.toUpperCase()) {
                alert('Invalid Captcha for Student login.');
                generateCaptcha('student');
                return;
            }

            if (regNo) {
                submitBtn.textContent = 'Entering Portal...';
                submitBtn.disabled = true;
                localStorage.setItem('studentSessionRegNo', regNo.toUpperCase());
                setTimeout(() => { window.location.href = 'student-portal.html'; }, 1000);
            }
        });
    }

    // Parent Login Handling
    const parentForm = document.getElementById('parent-login-form');
    if (parentForm) {
        parentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const regNo = document.getElementById('parent-regno').value.trim();
            const captchaInput = document.getElementById('parent-captcha-input').value.trim();
            const captchaActual = document.getElementById('parent-captcha-display').textContent;
            const submitBtn = document.getElementById('parent-submit');

            if (captchaInput.toUpperCase() !== captchaActual.toUpperCase()) {
                alert('Invalid Captcha for Parent login.');
                generateCaptcha('parent');
                return;
            }

            if (regNo) {
                submitBtn.textContent = 'Authenticating Ward...';
                submitBtn.disabled = true;
                localStorage.setItem('parentSessionRegNo', regNo.toUpperCase());
                setTimeout(() => { window.location.href = 'parent-dashboard.html'; }, 1000);
            }
        });
    }
});

function generateCaptcha(type) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let captcha = '';
    for (let i = 0; i < 4; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const display = document.getElementById(`${type}-captcha-display`);
    if (display) {
        display.textContent = captcha.toUpperCase();
    }
}
