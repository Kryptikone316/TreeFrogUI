---
layout: default
title: Add box art and artwork
permalink: /guides/artwork/
---
<article class="post-content guide-content">
  <div class="page-heading"><p class="eyebrow">Guide 3</p><h1>Add box art &amp; artwork</h1><p>Use the browser tool to scan a ROM folder, find artwork and download a frontend-ready ZIP. No software install required.</p></div>
  <section class="installer-callout">
    <p class="eyebrow">The easy way · runs in your browser</p>
    <h2>Build an artwork ZIP in three steps.</h2>
    <p>The browser artwork tool scans your card locally and prepares box art in the folder layout for your selected frontend.</p>
    <a class="button" href="{{ '/scraper/' | relative_url }}">Open browser artwork tool</a>
    <ol class="installer-steps">
      <li><strong>Choose your card.</strong><span>Select the SD card or a ROM folder in your browser.</span></li>
      <li><strong>Choose your frontend.</strong><span>TreeFrogUI is detected when possible; other supported layouts are available.</span></li>
      <li><strong>Download the ZIP.</strong><span>Copy or extract the generated artwork files onto your card.</span></li>
    </ol>
    <p class="quiet">Existing artwork is skipped by default. If you prefer a desktop app, <a href="https://github.com/tzubertowski/mini-scraper-cfw/releases">download Mini Scraper</a>.</p>
  </section>
  {% capture guide_markdown %}{% include generated-guides/artwork.md %}{% endcapture %}
  {{ guide_markdown | markdownify }}
</article>
