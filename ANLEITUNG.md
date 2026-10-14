# START Maastricht Website – Contributor Guide

This website is designed with a **clean separation of design, structure, and content**.
Anyone on the team can edit texts, board members, events, FAQs, and photos **without any technical, HTML, or coding knowledge**.

---

## 📁 Project Structure

```text
start website/
├── content/               <-- EDIT YOUR CONTENT HERE (JSON files)
│   ├── board.json         <-- Board members & roles (auto-syncs with For Partners section!)
│   ├── events.json        <-- Events, descriptions, and event images
│   ├── faq.json           <-- Frequently asked questions & answers
│   ├── departments.json   <-- Departments & member tasks
│   └── photos.json        <-- Assigns photos to website slots
│
├── photos/                <-- STORE ALL IMAGES & LOGOS HERE
│   ├── hero.jpg, about.jpg, community.jpeg, students.jpeg, partners.jpeg
│   ├── rtss.jpg, dd.jpg, stc.jpg, online.jpg
│   └── (simply place any new photos here)
│
├── index.html             <-- Semantic HTML structure of the website
├── style.css              <-- Design & styling (colors, typography, spacing)
├── main.js                <-- Interactive elements (mobile menu, scroll progress, animations)
├── content.js             <-- Automatically loads data from content/ into the page
└── start-server.command   <-- Double-click to preview the site locally on macOS
```

---

## 🚀 How to Preview the Website Locally (Mac)

Modern browsers block loading external JSON files when opening an HTML file directly via double-click (`file:///`) due to browser security restrictions.

**The simplest way to preview:**
1. **Double-click `start-server.command`** in the folder.
2. A terminal window will open and your browser will launch automatically at `http://localhost:8080`.
3. Whenever you save an edit in any JSON file, just refresh the browser (**Cmd + R**) to see your changes immediately.

*(Note: Once the website is uploaded to a live web hosting service like Netlify, Vercel, or your domain, everything loads automatically without needing any local script.)*

---

## ✏️ How to Edit Content

All content files reside in the **`content/`** folder. You can open and edit them with any text editor (TextEdit, VS Code, Notepad, etc.).

### 1. Board Members (`content/board.json`)
```json
{
  "ueberschrift": "Meet the team: the board",
  "mitglieder": [
    { "name": "Lara Enzi", "rolle": "President" },
    { "name": "Leo Böse", "rolle": "Vice President" },
    { "name": "Jakob Rojahn", "rolle": "Head of Partnerships" }
  ]
}
```
- **Automatic Sync:** The person with `"rolle": "Head of Partnerships"` is **automatically updated** in both the Board section and the "For Partners" contact section!
- To add a new member, simply add a new line: `{ "name": "...", "rolle": "..." }`.
- *Make sure every item has a comma after it, except for the last item in the list.*

---

### 2. Photos (`content/photos.json` & `photos/`)
1. Place your image file (e.g., `about.jpg`) inside the **`photos/`** folder.
2. Open **`content/photos.json`** and specify the filename for the matching section:
```json
{
  "hero":       "photos/hero.jpg",
  "about":      "photos/about.jpg",
  "community":  "photos/community.jpeg",
  "students":   "photos/students.jpeg",
  "partners":   "photos/partners.jpeg",
  "board":      "",
  "team":       ""
}
```
- **Clean display:** Any slot left empty (`""`) is automatically hidden so no empty placeholder boxes clutter the live site.
- Photos are styled with compact, modern aspect ratios to keep the page clean and engaging.

---

### 3. Events (`content/events.json`)
Each event entry has a title, photo, and description:
```json
{
  "id": "rtss",
  "titel": "Road to START Summit",
  "foto": "photos/rtss.jpg",
  "foto_alt": "Two hosts on stage at Road to START Summit",
  "beschreibung": "Our annual pitching competition..."
}
```

---

### 4. FAQs (`content/faq.json`)
You can freely add, modify, or remove questions and answers:
```json
{
  "faqs": [
    {
      "frage": "Do I have to have a startup to join?",
      "antwort": "No. You should have an intrinsic motivation towards entrepreneurship topics..."
    }
  ]
}
```

---

### 5. Departments (`content/departments.json`)
Update the department names, descriptions, and the 3 core "Learn & Grow" pillars.

---

## 💡 JSON Tips for Beginners
- Always enclose keys and text values in double quotes: `"name": "Value"`.
- Do not put a comma after the last item in a list or object.
- If you accidentally make a syntax error, check the browser console (**Right click -> Inspect -> Console**) which will tell you the exact line number.
