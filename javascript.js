//AI Usage:
//I used Google Gemini to help me adjust the style. I also used it to built the interactive button. I also used Gemini to create interactive designs. I modified the color I want and the size of patterns.
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('solarCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const backBtn = document.getElementById('backToSolarBtn');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // 状态管理
    let currentMode = 'SOLAR'; // 'SOLAR' | 'EARTH_MOON'
    let hoveredEntity = null;
    let mousePos = { x: 0, y: 0 };
    let transitionState = { active: false, targetUrl: '', progress: 0 };
    let sunPulse = 0;
    let earthRotation = 0; // 地球云层旋转角度

    // 太阳与小行星带
    const sun = { x: 0, y: 0, radius: 48, color: '#f97316' };
    const asteroidBelt = { minRadius: 190, maxRadius: 220, particles: [] };

    for (let i = 0; i < 320; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = asteroidBelt.minRadius + Math.random() * (asteroidBelt.maxRadius - asteroidBelt.minRadius);
        asteroidBelt.particles.push({
            angle,
            dist,
            speed: (0.0003 + Math.random() * 0.0008) * (Math.random() > 0.5 ? 1 : -1),
            size: Math.random() * 1.8 + 0.6,
            color: Math.random() > 0.3 ? '#94a3b8' : '#cbd5e1'
        });
    }

    // 8大行星数据
    const planets = [
        { name: 'Mercury', label: 'Mercury', func: '', distance: 80, radius: 5, color: '#a1a1aa', speed: 0.012, angle: 0.5 },
        { name: 'Venus', label: 'Venus', func: '', distance: 115, radius: 8, color: '#fde047', speed: 0.008, angle: 2.1 },
        { name: 'Earth', label: 'Earth', func: 'Click to enter Earth-Moon system', distance: 160, radius: 11, color: '#38bdf8', speed: 0.006, angle: 4.2 },
        { name: 'Mars', label: 'Mars', func: '', distance: 245, radius: 7, color: '#ef4444', speed: 0.0045, angle: 1.3 },
        { name: 'Jupiter', label: 'Jupiter', func: '', distance: 310, radius: 20, color: '#eab308', speed: 0.003, angle: 5.5, hasStripes: true },
        { name: 'Saturn', label: 'Saturn', func: '', distance: 375, radius: 15, color: '#fef08a', speed: 0.002, angle: 3.1, hasRings: true },
        { name: 'Uranus', label: 'Uranus', func: '', distance: 430, radius: 11, color: '#22d3ee', speed: 0.0015, angle: 0.2 },
        { name: 'Neptune', label: 'Neptune', func: '', distance: 485, radius: 10, color: '#3b82f6', speed: 0.001, angle: 2.8 }
    ];

    // 显著放大尺寸的地月系 (更新地球点击提示文本)
    const earthMoonSystem = {
        earth: { name: 'Earth', label: 'Earth', func: 'Click to View Projects (Part 1)', x: 0, y: 0, radius: 85, color: '#0284c7' },
        moon: { name: 'Moon', label: 'Moon', func: 'Click to View About Me', distance: 210, radius: 22, color: '#cbd5e1', angle: 0, speed: 0.012 }
    };

    // 主渲染循环
    function animate() {
        ctx.clearRect(0, 0, width, height);
        const cx = width / 2;
        const cy = height / 2;

        sunPulse += 0.03;
        earthRotation += 0.005;

        if (currentMode === 'SOLAR') {
            drawSolarSystem(cx, cy);
        } else if (currentMode === 'EARTH_MOON') {
            drawEarthMoonSystem(cx, cy);
        }

        drawTooltip();

        if (transitionState.active) {
            drawTransitionEffect();
        }

        requestAnimationFrame(animate);
    }

    // 1. 太阳系绘制
    function drawSolarSystem(cx, cy) {
        // 太阳日冕发光
        const glowRadius = sun.radius + Math.sin(sunPulse) * 5 + (hoveredEntity === 'Sun' ? 20 : 0);
        const sunGlow = ctx.createRadialGradient(cx, cy, sun.radius * 0.4, cx, cy, glowRadius + 30);
        sunGlow.addColorStop(0, '#fdba74');
        sunGlow.addColorStop(0.5, 'rgba(249, 115, 22, 0.45)');
        sunGlow.addColorStop(1, 'rgba(249, 115, 22, 0)');
        
        ctx.beginPath();
        ctx.arc(cx, cy, glowRadius + 30, 0, Math.PI * 2);
        ctx.fillStyle = sunGlow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(cx, cy, sun.radius, 0, Math.PI * 2);
        ctx.fillStyle = sun.color;
        ctx.fill();

        // 小行星带
        const isAsteroidHovered = hoveredEntity === 'AsteroidBelt';
        asteroidBelt.particles.forEach(p => {
            p.angle += p.speed;
            const px = cx + Math.cos(p.angle) * p.dist;
            const py = cy + Math.sin(p.angle) * p.dist;
            ctx.beginPath();
            ctx.arc(px, py, p.size, 0, Math.PI * 2);
            ctx.fillStyle = isAsteroidHovered ? '#38bdf8' : p.color;
            ctx.fill();
        });

        // 8大行星
        planets.forEach(p => {
            p.angle += p.speed;
            const px = cx + Math.cos(p.angle) * p.distance;
            const py = cy + Math.sin(p.angle) * p.distance;
            p.x = px; p.y = py;

            ctx.beginPath();
            ctx.arc(cx, cy, p.distance, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
            ctx.stroke();

            if (hoveredEntity === p.name) {
                ctx.beginPath();
                ctx.arc(px, py, p.radius + 10, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.fill();
            }

            if (p.hasRings) {
                ctx.save();
                ctx.translate(px, py);
                ctx.rotate(0.4);
                ctx.beginPath();
                ctx.ellipse(0, 0, p.radius * 2.3, p.radius * 0.7, 0, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(254, 240, 138, 0.7)';
                ctx.lineWidth = 3;
                ctx.stroke();
                ctx.restore();
            }

            ctx.beginPath();
            ctx.arc(px, py, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            if (p.hasStripes) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(px, py, p.radius, 0, Math.PI * 2);
                ctx.clip();
                ctx.fillStyle = '#ca8a04';
                ctx.fillRect(px - p.radius, py - 4, p.radius * 2, 3);
                ctx.fillRect(px - p.radius, py + 3, p.radius * 2, 4);
                ctx.restore();
            }
        });
    }

    // 2. 地月系绘制
    function drawEarthMoonSystem(cx, cy) {
        const er = earthMoonSystem.earth.radius;
        earthMoonSystem.earth.x = cx;
        earthMoonSystem.earth.y = cy;

        // 2.1 地球外大气光晕层
        const atmosGlow = ctx.createRadialGradient(cx, cy, er * 0.9, cx, cy, er + 25);
        atmosGlow.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
        atmosGlow.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.beginPath();
        ctx.arc(cx, cy, er + 25, 0, Math.PI * 2);
        ctx.fillStyle = atmosGlow;
        ctx.fill();

        // Hover 时的外包裹高亮
        if (hoveredEntity === 'Earth_Sub') {
            ctx.beginPath();
            ctx.arc(cx, cy, er + 15, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.fill();
        }

        // 地球海洋基底
        ctx.beginPath();
        ctx.arc(cx, cy, er, 0, Math.PI * 2);
        ctx.fillStyle = earthMoonSystem.earth.color;
        ctx.fill();

        // 地球陆地与云层细节
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, er, 0, Math.PI * 2);
        ctx.clip();

        ctx.fillStyle = '#16a34a'; // 大陆绿色
        ctx.beginPath();
        ctx.arc(cx - 20 + Math.cos(earthRotation) * 15, cy - 10, 35, 0, Math.PI * 2);
        ctx.arc(cx + 30 + Math.cos(earthRotation) * 15, cy + 20, 28, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.55)'; // 白云纹理
        ctx.beginPath();
        ctx.arc(cx + Math.sin(earthRotation * 1.5) * 40, cy - 25, 22, 0, Math.PI * 2);
        ctx.arc(cx - Math.sin(earthRotation * 1.5) * 35, cy + 30, 25, 0, Math.PI * 2);
        ctx.fill();

        const shadowGrad = ctx.createLinearGradient(cx - er, cy - er, cx + er, cy + er);
        shadowGrad.addColorStop(0, 'rgba(0,0,0,0)');
        shadowGrad.addColorStop(0.75, 'rgba(15, 23, 42, 0.4)');
        shadowGrad.addColorStop(1, 'rgba(3, 7, 18, 0.85)');
        ctx.fillStyle = shadowGrad;
        ctx.fillRect(cx - er, cy - er, er * 2, er * 2);
        ctx.restore();

        ctx.beginPath();
        ctx.arc(cx, cy, er, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // 2.2 月球轨道与月球细节
        const em = earthMoonSystem.moon;
        em.angle += em.speed;
        const mx = cx + Math.cos(em.angle) * em.distance;
        const my = cy + Math.sin(em.angle) * em.distance;
        em.x = mx; em.y = my;

        ctx.beginPath();
        ctx.arc(cx, cy, em.distance, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (hoveredEntity === 'Moon_Sub') {
            ctx.beginPath();
            ctx.arc(mx, my, em.radius + 12, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
            ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(mx, my, em.radius, 0, Math.PI * 2);
        ctx.fillStyle = em.color;
        ctx.fill();

        ctx.save();
        ctx.beginPath();
        ctx.arc(mx, my, em.radius, 0, Math.PI * 2);
        ctx.clip();
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath();
        ctx.arc(mx - 5, my - 4, 6, 0, Math.PI * 2);
        ctx.arc(mx + 6, my + 5, 8, 0, Math.PI * 2);
        ctx.arc(mx - 2, my + 8, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // 3. Tooltip 绘制 (更新小行星带提示词)
    function drawTooltip() {
        if (!hoveredEntity) return;

        let nameText = '';
        let funcText = '';

        if (currentMode === 'SOLAR') {
            if (hoveredEntity === 'Sun') {
                nameText = 'Sun';
                funcText = 'Click to View Contact Page';
            } else if (hoveredEntity === 'AsteroidBelt') {
                nameText = 'Asteroid Belt';
                funcText = 'Click to View Projects (Part 2)';
            } else {
                const found = planets.find(p => p.name === hoveredEntity);
                if (found) {
                    nameText = found.label;
                    funcText = found.func;
                }
            }
        } else if (currentMode === 'EARTH_MOON') {
            if (hoveredEntity === 'Earth_Sub') {
                nameText = earthMoonSystem.earth.label;
                funcText = earthMoonSystem.earth.func;
            } else if (hoveredEntity === 'Moon_Sub') {
                nameText = earthMoonSystem.moon.label;
                funcText = earthMoonSystem.moon.func;
            }
        }

        if (!nameText) return;

        const tx = mousePos.x + 20;
        const ty = mousePos.y - 20;

        ctx.font = 'bold 18px "Inter", sans-serif';
        const nameWidth = ctx.measureText(nameText).width;
        ctx.font = '14px "Inter", sans-serif';
        const funcWidth = funcText ? ctx.measureText(funcText).width : 0;

        const boxWidth = Math.max(nameWidth, funcWidth) + 30;
        const boxHeight = funcText ? 56 : 36;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(tx, ty, boxWidth, boxHeight, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 17px "Inter", sans-serif';
        ctx.fillText(nameText, tx + 15, ty + 24);

        if (funcText) {
            ctx.fillStyle = '#38bdf8';
            ctx.font = '13px "Inter", sans-serif';
            ctx.fillText(funcText, tx + 15, ty + 44);
        }
    }

    // 鼠标移动监听
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mousePos.x = e.clientX - rect.left;
        mousePos.y = e.clientY - rect.top;

        const cx = width / 2;
        const cy = height / 2;
        hoveredEntity = null;

        if (currentMode === 'SOLAR') {
            if (Math.hypot(mousePos.x - cx, mousePos.y - cy) < sun.radius) {
                hoveredEntity = 'Sun';
                return;
            }
            const distFromCenter = Math.hypot(mousePos.x - cx, mousePos.y - cy);
            if (distFromCenter >= asteroidBelt.minRadius && distFromCenter <= asteroidBelt.maxRadius) {
                hoveredEntity = 'AsteroidBelt';
                return;
            }
            planets.forEach(p => {
                if (Math.hypot(mousePos.x - p.x, mousePos.y - p.y) < p.radius + 8) {
                    hoveredEntity = p.name;
                }
            });
        } else if (currentMode === 'EARTH_MOON') {
            if (Math.hypot(mousePos.x - cx, mousePos.y - cy) < earthMoonSystem.earth.radius) {
                hoveredEntity = 'Earth_Sub';
            } else if (Math.hypot(mousePos.x - earthMoonSystem.moon.x, mousePos.y - earthMoonSystem.moon.y) < earthMoonSystem.moon.radius) {
                hoveredEntity = 'Moon_Sub';
            }
        }
    });

    // 点击事件更新 (重点修改区域)
    canvas.addEventListener('click', () => {
        if (currentMode === 'SOLAR') {
            if (hoveredEntity === 'Sun') triggerTransition('contact.html');
            else if (hoveredEntity === 'Earth') {
                currentMode = 'EARTH_MOON';
                backBtn.classList.remove('hidden');
            } else if (hoveredEntity === 'AsteroidBelt') {
                // 点击小行星带直接跳转 projectp2.html
                triggerTransition('projectp2.html');
            }
        } else if (currentMode === 'EARTH_MOON') {
            if (hoveredEntity === 'Earth_Sub') {
                // 地月系中点击地球直接跳转 projectp1.html
                triggerTransition('projectp1.html');
            } else if (hoveredEntity === 'Moon_Sub') {
                triggerTransition('about.html');
            }
        }
    });

    // 返回按钮
    backBtn.addEventListener('click', () => {
        currentMode = 'SOLAR';
        backBtn.classList.add('hidden');
    });

    function triggerTransition(url) {
        transitionState.active = true;
        transitionState.targetUrl = url;
        setTimeout(() => { window.location.href = url; }, 700);
    }

    function drawTransitionEffect() {
        transitionState.progress += 0.05;
        ctx.fillStyle = `rgba(255, 255, 255, ${transitionState.progress})`;
        ctx.fillRect(0, 0, width, height);
    }

    document.getElementById('nav-contact')?.addEventListener('click', (e) => {
        e.preventDefault(); triggerTransition('contact.html');
    });
    document.getElementById('nav-about')?.addEventListener('click', (e) => {
        e.preventDefault(); triggerTransition('about.html');
    });
    document.getElementById('nav-projects')?.addEventListener('click', (e) => {
        e.preventDefault(); triggerTransition('projects.html');
    });

    animate();
});

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. 火箭光标跟随与喷火交互
    // ==========================================
    const rocket = document.getElementById('rocketCursor');

    if (rocket) {
        window.addEventListener('mousemove', (e) => {
            rocket.style.left = `${e.clientX}px`;
            rocket.style.top = `${e.clientY}px`;
        });

        // 监听可交互元素，触发火焰喷射
        const interactiveSelector = 'a, button, .map-marker, input, .switch, [role="button"]';
        
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(interactiveSelector)) {
                rocket.classList.add('hovering');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(interactiveSelector)) {
                rocket.classList.remove('hovering');
            }
        });
    }
    // 全局火箭光标跟随逻辑
    const rocketCursor = document.getElementById('rocketCursor');

    // 仅在非触屏设备（有鼠标的设备）上启用火箭跟随
    if (rocketCursor && window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            rocketCursor.style.left = `${e.clientX}px`;
            rocketCursor.style.top = `${e.clientY}px`;
        });
    } else if (rocketCursor) {
        // 移动端/触屏设备直接隐藏
        rocketCursor.style.display = 'none';
    }
    // ==========================================
    // 2. 左上角 Logo 面板与 Dark Mode 切换
    // ==========================================
    const logoBtn = document.getElementById('logoControlBtn');
    const controlPanel = document.getElementById('controlPanel');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // 展开 / 隐藏控制面板
    if (logoBtn && controlPanel) {
        logoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = controlPanel.style.display === 'block';
            controlPanel.style.display = isVisible ? 'none' : 'block';
        });

        // 点击页面其他区域自动收起面板
        document.addEventListener('click', (e) => {
            if (!controlPanel.contains(e.target) && e.target !== logoBtn) {
                controlPanel.style.display = 'none';
            }
        });
    }

    // Dark Mode 状态初始化与切换
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (darkModeToggle) darkModeToggle.checked = false;
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.remove('light-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});

// 全局火箭光标与 Control Panel 绑定
document.addEventListener('DOMContentLoaded', () => {
    // 1. 火箭光标
    const rocket = document.getElementById('rocketCursor');
    if (rocket) {
        window.addEventListener('mousemove', (e) => {
            rocket.style.left = `${e.clientX}px`;
            rocket.style.top = `${e.clientY}px`;
        });

        const interactiveSelector = 'a, button, .map-marker, input, .switch, [role="button"]';
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(interactiveSelector)) rocket.classList.add('hovering');
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(interactiveSelector)) rocket.classList.remove('hovering');
        });
    }

    // 2. 左上角 Command Center
    const logoBtn = document.getElementById('logoControlBtn');
    const controlPanel = document.getElementById('controlPanel');
    const darkModeToggle = document.getElementById('darkModeToggle');

    if (logoBtn && controlPanel) {
        logoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = controlPanel.style.display === 'block';
            controlPanel.style.display = isVisible ? 'none' : 'block';
        });

        document.addEventListener('click', (e) => {
            if (!controlPanel.contains(e.target) && e.target !== logoBtn) {
                controlPanel.style.display = 'none';
            }
        });
    }

    // 3. 深色/浅色主题初始化
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (darkModeToggle) darkModeToggle.checked = false;
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.remove('light-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});
