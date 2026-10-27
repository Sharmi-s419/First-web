# Romantic First-Month Anniversary Website ❤️
### Dedicated to KD & ROWDY • Celebrating Our 1st Month Together

A premium, emotional, cinematic anniversary website built with **React, Vite, and Vanilla CSS**. Styled with a deep midnight-black background, warm antique copper/bronze accents, delicate warm cream typography, and subtle wine-red highlights.

---

## ✨ Features Included

1. **Cinematic Welcome Screen**
   - Headlined with *“To My Favourite Person ❤️”*
   - Subtitle: *“One month down, a lifetime of memories to go.”*
   - Glowing *“Open Your Surprise 💌”* button with smooth unfolding animation.

2. **Live Relationship Counter**
   - Real-time counter calculating **Days, Hours, Minutes, and Seconds** since **4/10/26** (October 4, 2026).
   - Live milestone ticker for your **1st Month Anniversary on 4/11/26** (November 4, 2026).
   - Graceful fallback for custom dates.

3. **“Our Little Beginning” Story Timeline**
   - Vertical milestone journey honoring your beginning.
   - Interactive nodes with glowing badges.
   - Add, edit, or remove milestones anytime.

4. **Our Memories Gallery**
   - High-aesthetic photo cards with hover glow and soft zoom.
   - Click any photo to open the **Fullscreen Lightbox** with previous/next navigation.
   - Upload your own pictures directly from your phone or computer.
   - Edit captions or replace photos anytime. Stored locally in your browser.

5. **“Reasons I Love You” Interactive Cards**
   - Features the 5 romantic reasons celebrating him.
   - Interactive cards with subtle heart badges and tap-to-expand details.
   - Add your own reasons, edit existing ones, or delete reasons.

6. **“A Letter From My Heart 💌”**
   - Realistic 3D sealed envelope stamped with your custom wax seal (*KD & ROWDY*).
   - Click to break the wax seal and unfold an elegant parchment letter.
   - Pre-filled with your heartfelt message and editable inline.
   - Includes a **"Keep as Memory"** button to print or save as PDF.

7. **Our Song 🎵**
   - Built-in romantic felt-piano and chime melody (Web Audio synthesizer — works offline with 0 bandwidth and never breaks!).
   - Option to upload your and ROWDY's favorite song (MP3 / WAV) or paste a custom audio URL.
   - Play/pause button, volume control, mute button, and spinning vinyl record visualizer.
   - Fully compliant with browser audio policies (no intrusive autoplay).

8. **“Miles Apart, Close at Heart” (Long-Distance Section)**
   - Starry night sky and luminous crescent moon.
   - Romantic message honoring his discipline, courage, and dedication.
   - Interactive **“Send a Virtual Hug to ROWDY”** button with heartwarming toast feedback.

9. **Final Surprise & Celebration**
   - *“Our First Month Is Just the Beginning ❤️”*
   - *“Here’s to more memories, more laughter, more love, and more chapters of us.”*
   - **“Celebrate Our 1st Month 🎉”** button with romantic copper, gold, and ruby heart confetti!
   - **“Replay Our Story ↺”** button that smoothly restarts the experience.

10. **Interactive Customizer & Vercel Exporter**
    - Click **"Customize"** or **"Edit Mode"** in the bottom-left corner at any time to modify names, dates, letters, and reasons.
    - Click **"Copy Code for defaultData.js"** to export your customized website code with 1 click before deploying!

---

## 🚀 How to Run the Website Locally

1. **Open a terminal in this project folder:**
   ```bash
   cd c:\Users\sharm\Desktop\fma
   ```

2. **Install dependencies (if not already installed):**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser at:**
   ```
   http://localhost:5173/
   ```

---

## 🎨 Where to Customize Everything

You can customize the website in **two easy ways**:

### Option A: Using the In-App "Customize" Button (No Coding Needed!)
1. Click the floating **"Customize ⚙️"** button in the bottom-left corner of the website.
2. Change your names (**KD** & **ROWDY**), start dates, anniversary dates, and messages.
3. Turn on **"Edit Mode"** in the top navbar to edit photo captions, letter text, reasons, and milestones directly on the page!

### Option B: Editing the Code Directly
All initial text, dates, milestones, and settings live in one clean file:
- **`src/data/defaultData.js`**

| What you want to change | Location in `src/data/defaultData.js` |
|---|---|
| **Names (KD & ROWDY)** | `myName` and `partnerName` (Lines 6-7) |
| **Relationship Start Date (4/10/26)** | `relationshipStartDate: "2026-10-04T00:00:00"` |
| **Anniversary Date (4/11/26)** | `anniversaryDate: "2026-11-04T00:00:00"` |
| **Milestones Timeline** | `milestones` array |
| **Reasons I Love You** | `reasons` array |
| **Personal Letter** | `letter` object (`greeting`, `paragraphs`, `signoff`) |
| **Song Details** | `song` object (`title`, `artist`) |
| **Long-Distance Message** | `longDistance` object (`quote`, `subtext`) |

---

## 📸 How to Add Your Own Photos

1. Click **"Upload New Photo"** in the Memories Gallery section or click **"Edit Mode"** to replace any sample picture with your own.
2. Select any picture from your phone or computer. The image is automatically compressed and saved locally in your browser!
3. To add permanent photos that show up on any device when deployed:
   - Save your photos into the `public/images/` folder (e.g. `public/images/my_photo1.jpg`).
   - Reference `/images/my_photo1.jpg` in `src/data/defaultData.js` under the `photos` list.

---

## 🎵 How to Add Your Special Song

1. In the **Our Song 🎵** section, click **"Upload Our Song (MP3)"** to select an MP3/WAV file from your device.
2. Or click **"Audio URL"** and paste a direct link to your song (e.g., from Dropbox, Google Drive, or an audio host).
3. If no file is uploaded, the website automatically plays the built-in romantic ambient felt-piano chords!

---

## 🌐 How to Deploy to Vercel for Free

Deploying to Vercel gives you a permanent, fast, secure `https://...` link that works on your boyfriend's phone:

1. **Export your customized settings (Important):**
   - Click the **"Customize"** button in the bottom-left corner of your site.
   - Go to the **"Export for Vercel"** tab.
   - Click **"Copy Code for defaultData.js"**.
   - Open `src/data/defaultData.js` in your code editor and paste the copied code there. Save the file.
   *(This ensures your boyfriend sees your exact personalized names, dates, photos, and letters on his phone!)*

2. **Push your code to GitHub:**
   - Create a free GitHub account at [github.com](https://github.com) if you haven't already.
   - Create a new **Private Repository** (e.g. named `our-first-month`).
   - In your terminal:
     ```bash
     git init
     git add .
     git commit -m "Our Romantic 1st Month Anniversary Website"
     git branch -M main
     git remote add origin <your-github-repo-url>
     git push -u origin main
     ```

3. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign up/log in with your GitHub account.
   - Click **"Add New Project"**.
   - Select your `our-first-month` repository.
   - Click **"Deploy"**.
   - In less than 1 minute, Vercel will give you a live URL (e.g., `https://our-first-month.vercel.app`)!

---

## 💌 How to Share the Link Privately with ROWDY

- **Keep the repository private:** When creating your GitHub repository, select **"Private"** so only you can see the code.
- **Unlisted Vercel URL:** The generated Vercel link (`https://our-first-month.vercel.app`) is unlisted. Search engines cannot find or index it because there are no public links pointing to it.
- **Surprise Delivery:** Send the link directly to ROWDY in your private chat or WhatsApp with a sweet note like:
  > *“Hey my favourite person... I made something special just for you to celebrate our first month. Click when you have a quiet moment: [Your Link] ❤️”*

---

*Made with love for KD & ROWDY.*
#   L o v e  
 #   L o v e  
 #   R o w d y  
 