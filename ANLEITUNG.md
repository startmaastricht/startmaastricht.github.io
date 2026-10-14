# START Maastricht Website – Anleitung für Bearbeiter

Diese Website wurde so aufgebaut, dass **Design, Technik und Inhalte strikt getrennt** sind.
Dadurch kann jeder im Team Texte, Vorstandsmitglieder, Events, FAQs und Fotos verändern – ganz **ohne HTML- oder Programmierkenntnisse**.

---

## 📁 Ordner-Übersicht

```text
start website/
├── content/               <-- HIER WERDEN INHALTE BEARBEITET (JSON)
│   ├── board.json         <-- Vorstandsmitglieder & Rollen
│   ├── events.json        <-- Events, Beschreibungen & Event-Bilder
│   ├── faq.json           <-- Häufige Fragen & Antworten
│   ├── departments.json   <-- Departments & "Learn & Grow" Aufgaben
│   └── photos.json        <-- Zuweisung der Fotos zu den Website-Bereichen
│
├── photos/                <-- HIER LIEGEN ALLE BILDER & LOGOS
│   ├── hero.jpg
│   ├── rtss.jpg, dd.jpg, stc.jpg, online.jpg
│   ├── start_maastricht.svg, favicon.svg
│   └── (neue Bilder einfach hier hineinkopieren)
│
├── index.html             <-- HTML-Grundgerüst der Website
├── style.css              <-- Design & Styling (Farben, Abstände, Schriftarten)
├── main.js                <-- Interaktionen (Menü, Scrollbalken, Animationen)
├── content.js             <-- Lädt die Daten aus content/ automatisch in die Seite
└── start-server.command   <-- Doppelklick zum Starten einer lokalen Vorschau (Mac)
```

---

## 🚀 Website lokal anschauen (Vorschau auf dem Mac)

Moderne Browser blockieren aus Sicherheitsgründen das Nachladen von externen JSON-Dateien, wenn man eine HTML-Datei einfach per Doppelklick als Datei (`file://`) öffnet.

**Die einfachste Lösung:**
- Mache einfach einen **Doppelklick auf `start-server.command`**.
- Es öffnet sich sofort dein Browser mit der Website unter `http://localhost:8080`.
- Änderungen an den JSON-Dateien sind nach einem einfachen Neuladen im Browser (Cmd + R) sofort sichtbar!

---

## ✏️ Wie ändere ich Inhalte?

Alle Inhalte liegen im Ordner **`content/`** als `.json`-Dateien. Du kannst sie mit jedem Texteditor (z.B. TextEdit, VS Code, Notepad) öffnen.

### 1. Board-Mitglieder ändern (`content/board.json`)
```json
{
  "ueberschrift": "Meet the team: the board",
  "mitglieder": [
    { "name": "Léo Tambourg", "rolle": "President" },
    { "name": "Selina Rametsteiner", "rolle": "Vice President" }
  ]
}
```
- Möchtest du jemanden hinzufügen? Einfach eine neue Zeile mit `{ "name": "...", "rolle": "..." }` ergänzen.
- Achte darauf, dass zwischen den Einträgen ein Komma steht (nur nach dem letzten Eintrag kein Komma).

---

### 2. Events anpassen (`content/events.json`)
Jedes Event hat einen Titel, Beschreibung und ein Foto:
```json
{
  "id": "rtss",
  "titel": "Road to START Summit",
  "foto": "photos/rtss.jpg",
  "foto_alt": "Beschreibung des Bildes",
  "beschreibung": "Hier steht der Text..."
}
```

---

### 3. FAQ bearbeiten (`content/faq.json`)
Hier kannst du Fragen und Antworten direkt anpassen:
```json
{
  "faqs": [
    {
      "frage": "Do I have to have a startup to join?",
      "antwort": "No. You should have an intrinsic motivation..."
    }
  ]
}
```

---

### 4. Fotos ändern oder neue einfügen (`content/photos.json` & `photos/`)
1. Speichere dein neues Bild (z.B. `unser-team.jpg`) im Ordner **`photos/`**.
2. Öffne **`content/photos.json`** und trage den Dateinamen beim gewünschten Slot ein:
```json
{
  "hero":       "photos/hero.jpg",
  "about":      "photos/unser-team.jpg",
  "community":  "",
  "students":   "",
  "partners":   "",
  "board":      "",
  "team":       ""
}
```
*Wenn du ein Feld leer lässt (`""`), bleibt der Platzhalter sichtbar.*

---

## 🎨 Design anpassen

- **Farben & Typografie:** Alle Design-Tokens und Stile befinden sich in **`style.css`**.
- Die HTML-Struktur in **`index.html`** muss für Text- und Inhaltsänderungen nicht angefasst werden.
