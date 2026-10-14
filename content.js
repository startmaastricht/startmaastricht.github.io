/**
 * content.js – Lädt alle Inhalte aus dem "content/" Ordner (JSON-Dateien)
 * und befüllt die Website dynamisch.
 *
 * So können auch Personen ohne HTML- oder Programmierkenntnisse
 * ganz einfach Texte, Board-Mitglieder, Events, FAQs und Fotos bearbeiten!
 */

(function () {
  'use strict';

  /* ── Hilfsfunktion: JSON laden ── */
  function loadJSON(url) {
    return fetch(url).then(function (response) {
      if (!response.ok) {
        throw new Error('Datei ' + url + ' konnte nicht geladen werden (HTTP ' + response.status + ')');
      }
      return response.json();
    });
  }

  /* ── Board rendern ── */
  function renderBoard(data) {
    if (!data) return;

    var heading = document.getElementById('board-ueberschrift');
    if (heading && data.ueberschrift) {
      heading.innerHTML = data.ueberschrift;
    }

    var container = document.getElementById('board-mitglieder');
    if (container && data.mitglieder) {
      container.innerHTML = '';
      data.mitglieder.forEach(function (m) {
        var div = document.createElement('div');
        div.className = 'rule-top person';
        div.innerHTML =
          '<p class="person-name">' + m.name + '</p>' +
          '<p class="person-role">' + m.rolle + '</p>';
        container.appendChild(div);
      });
    }

    /* ── Head of Partnerships in der "For partners" Section synchronisieren ── */
    if (data.mitglieder) {
      var partnerHead = data.mitglieder.find(function (m) {
        return /partnership/i.test(m.rolle);
      });
      if (partnerHead) {
        var nameEl = document.getElementById('partner-contact-name');
        var roleEl = document.getElementById('partner-contact-role');
        if (nameEl) nameEl.textContent = partnerHead.name;
        if (roleEl) roleEl.textContent = partnerHead.rolle;
      }
    }
  }

  /* ── Events rendern ── */
  function renderEvents(data) {
    if (!data || !data.events) return;

    var container = document.getElementById('events-liste');
    if (!container) return;

    container.innerHTML = '';
    data.events.forEach(function (ev) {
      var article = document.createElement('article');
      article.className = 'event';
      article.innerHTML =
        '<figure class="photo" data-slot="' + ev.id + '" data-alt="' + ev.titel + '">' +
        '<img src="' + ev.foto + '" alt="' + (ev.foto_alt || ev.titel) + '" width="' + (ev.foto_breite || 1500) + '" height="' + (ev.foto_hoehe || 1125) + '" loading="lazy" style="object-position:' + (ev.foto_position || 'center') + '">' +
        '</figure>' +
        '<div class="event-text">' +
        '<h3 class="sub">' + ev.titel + '</h3>' +
        '<p>' + ev.beschreibung + '</p>' +
        '</div>';
      container.appendChild(article);
    });
  }

  /* ── FAQ rendern ── */
  function renderFAQ(data) {
    if (!data || !data.faqs) return;

    var container = document.getElementById('faq-liste');
    if (!container) return;

    container.innerHTML = '';
    data.faqs.forEach(function (item) {
      var details = document.createElement('details');
      details.innerHTML =
        '<summary>' + item.frage + '</summary>' +
        '<p>' + item.antwort + '</p>';
      container.appendChild(details);
    });
  }

  /* ── Departments rendern ── */
  function renderDepartments(data) {
    if (!data) return;

    var head = document.getElementById('departments-ueberschrift');
    if (head && data.ueberschrift) head.innerHTML = data.ueberschrift;

    var sub = document.getElementById('departments-sub');
    if (sub && data.sub) sub.innerHTML = data.sub;

    var deptContainer = document.getElementById('departments-liste');
    if (deptContainer && data.departments) {
      deptContainer.innerHTML = '';
      data.departments.forEach(function (d) {
        var art = document.createElement('article');
        art.className = 'rule-top';
        art.innerHTML =
          '<h4 class="title">' + d.name + '</h4>' +
          '<p>' + d.beschreibung + '</p>';
        deptContainer.appendChild(art);
      });
    }

    var lg = data.learn_and_grow;
    if (lg) {
      var lgHead = document.getElementById('learn-grow-heading');
      if (lgHead && lg.ueberschrift) lgHead.innerHTML = lg.ueberschrift;

      var lgIntro = document.getElementById('learn-grow-intro');
      if (lgIntro && lg.intro) lgIntro.innerHTML = lg.intro;

      var lgContainer = document.getElementById('learn-grow-aufgaben');
      if (lgContainer && lg.aufgaben) {
        lgContainer.innerHTML = '';
        lg.aufgaben.forEach(function (a) {
          var art = document.createElement('article');
          art.className = 'rule-top';
          art.innerHTML =
            '<h4 class="title">' + a.titel + '</h4>' +
            '<p>' + a.beschreibung + '</p>';
          lgContainer.appendChild(art);
        });
      }
    }
  }

  /* ── Fotos dynamisch anwenden ── */
  function renderPhotos(data) {
    if (!data) return;

    document.querySelectorAll('[data-slot]').forEach(function (f) {
      var slot = f.getAttribute('data-slot');
      var src = data[slot];

      if (!src) {
        // Leere Slots ohne Foto ausblenden, damit keine unschönen leeren Boxen entstehen
        if (!f.querySelector('img')) {
          f.style.display = 'none';
        }
        return;
      }

      f.style.display = '';
      var img = f.querySelector('img');
      if (img) {
        img.src = src;
      } else {
        img = new Image();
        img.src = src;
        img.alt = f.getAttribute('data-alt') || '';
        img.loading = 'lazy';
        f.appendChild(img);
        var s = f.querySelector('span');
        if (s) s.remove();
      }
    });
  }

  /* ── Alle JSON-Dateien laden ── */
  Promise.all([
    loadJSON('content/board.json'),
    loadJSON('content/events.json'),
    loadJSON('content/faq.json'),
    loadJSON('content/departments.json'),
    loadJSON('content/photos.json')
  ]).then(function (results) {
    renderBoard(results[0]);
    renderEvents(results[1]);
    renderFAQ(results[2]);
    renderDepartments(results[3]);
    renderPhotos(results[4]);

    // Animationen für neu eingefügte HTML-Elemente aktivieren
    if (window.initReveals) {
      window.initReveals();
    }
  }).catch(function (err) {
    console.warn('content.js: JSON-Dateien konnten nicht per fetch() geladen werden:', err.message);
    if (window.location.protocol === 'file:') {
      console.info('💡 TIPP: Wenn du die Datei direkt im Browser öffnest (file://), blockieren viele Browser das Laden externer JSON-Dateien aus Sicherheitsgründen. Öffne die Seite über einen lokalen Server (z.B. Doppelklick auf start-server.command oder "npx serve .")!');
    }
  });
})();
