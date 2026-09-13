// Jack's HW 2 CyberShift 2077 (Neon Dimension)


// 1. Game Overview
CyberShift 2077 is a 2.5D cyberpunk-style game based on Crossy Road. The basic rule is same: you need to move forward to get higher points and there are different challenges. To make the game unique and attractive, I added some interesting mechanics: players can press the spacebar to toggle between the two dimensions - "Physical Network" (Dimension A) and "Deep Data" (Dimension B). Entering the Deep Data dimension allows players to ghost through red firewall cars, but remaining there too long or stepping on code gaps (glitch void holes) causes Game Over.


// 2. How to Play
- Use WASD to move around.
- Press Space to switch between Dimension A (Physical Net) and Dimension B (Deep Data).
- Press ESC to pause / resume the game.
- Press R or click Restart after the game ends.
- Your score is based on the farthest distance you reach. One row equals one point.
- Game Over conditions:
  1. If you stay in a single place for over 10 seconds, a corp hunter drone will neutralize you.
  2. In Dimension A, hitting a red firewall car, train, or falling into the plasma river results in death.
  3. In Dimension B, stepping into code gaps (glitch voids) causes you to fall into the abyss.


// 3. AI Tools and Development Process
AI tools used: Kiro / Google Antigravity
I used AI to help build the game step by step. First, I created the basic structure of Crossy Road in class using Kiro. After class, I thought about elements to make the game more exciting and used Antigravity to achieve those goals:
1. Fixed painter's algorithm z-clipping using Three.js hardware Z-buffer.
2. Locked the camera Y-axis to eliminate screen shaking and player dizziness during hops.
3. Overhauled the graphics into Cyberpunk style (fluorescent green hacker protagonist, colorful neon towers, hovercars, maglev train, plasma river).
4. Added the Dual-Dimension switching mechanic with dynamic code gap scaling.
5. Implemented ESC pause, mobile touch controls, and English/Chinese dual-language UI.


// 4. Development Summary & Files
All project files and complete chat logs are saved in this folder:
- index.html
- style.css
- javascript.js
- README.md
- conversation_export.md (Complete development chat export log)