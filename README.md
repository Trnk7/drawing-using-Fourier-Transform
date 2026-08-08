# 🌀 Fourier Drawing Machine

An interactive tool that decomposes any hand-drawn shape into rotating vectors using the **Discrete Fourier Transform (DFT)** — then reconstructs and animates it in real time.

> Draw anything with your mouse and watch a series of spinning circles trace it back perfectly.

---

## ✨ How It Works

1. **Draw** any shape on the canvas with your mouse
2. The app computes the **DFT** of your drawing — breaking it into frequency components
3. Each frequency becomes a **rotating vector** (epicycle) with its own speed, radius, and phase
4. The tip of the last vector traces your original shape as all vectors spin simultaneously

This is the same math used in signal processing, audio compression (MP3), and image compression (JPEG) — visualized interactively.

By default, the app animates the letters **"TRN"** using pre-defined coordinate points.

---

## 🎮 How to Use

- **Default** — loads and animates "TRN" using Fourier series automatically
- **Draw mode** — click and drag anywhere on the canvas to draw your own shape
- **Release** mouse to trigger the DFT and start the animation
- The more points in your drawing, the more accurate the reconstruction

---

## 🧮 The Math

For a set of N sampled points, the DFT computes:

```
X[k] = Σ x[n] * e^(-i2πkn/N)   for k = 0, 1, ..., N-1
```

Each resulting component has:
- **Amplitude** → radius of the rotating circle
- **Frequency** → how fast it spins
- **Phase** → starting angle

Vectors are sorted by amplitude (largest first) so the most significant frequencies dominate the drawing.

---

## 🚀 How to Run

No setup needed — just open in a browser:

```bash
git clone https://github.com/Trnk7/drawing-using-Fourier-Transform.git

open index.html
```

Or just double-click `index.html` — runs entirely in the browser, no dependencies.

---

## 🛠️ Tech

- HTML5 Canvas API
- Vanilla JavaScript
- Pure math — no libraries

---

## 🔧 Customization

To animate a custom shape by default, replace the `TRN` coordinate array with your own points and call:

```javascript
setup(yourPoints);
draw();
```

Tweak the visual feel:
```javascript
let TRAIL_COUNT = 500;   // Length of the drawn trail
let scl = 2.5;           // Scale of the default shape
```

---

## 🧠 What I Learned

- Implementing DFT from scratch in JavaScript
- Decomposing 2D paths into X and Y signals independently
- Animating epicycles using trigonometry
- HTML5 Canvas mouse interaction and real-time rendering

---

**Tarun Kachhawa** — [GitHub](https://github.com/Trnk7) · [LinkedIn](https://linkedin.com/in/the-trn)
