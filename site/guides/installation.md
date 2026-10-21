---
layout: default
title: Install TreeFrogUI
permalink: /guides/installation/
---
<article class="post-content guide-content">
  <div class="page-heading"><p class="eyebrow">Start here · recommended</p><h1>Install TreeFrogUI</h1><p>Skip the folder juggling. The TreeFrogUI Installer sets up your SD card for you on Windows, macOS, or Linux.</p></div>

  <section class="installer-callout">
    <p class="eyebrow">The easy way</p>
    <h2>Three simple clicks. Ready to play.</h2>
    <p>Download and open the desktop installer. It gets the right files for your handheld and installs TreeFrogUI for you.</p>
    <a class="button" href="https://github.com/tzubertowski/TreeFrogUI-installer/releases">Download TreeFrogUI Installer</a>
    <ol class="installer-steps">
      <li><strong>Choose your handheld.</strong><span>Pick your device and the stable release.</span></li>
      <li><strong>Select your SD card.</strong><span>The installer identifies the card and prepares the matching setup.</span></li>
      <li><strong>Confirm installation.</strong><span>Click <b>Format and install</b>. The installer does the rest.</span></li>
    </ol>
    <p class="installer-warning"><strong>Before you start:</strong> a fresh install erases and reformats the selected SD card. Back up anything you want to keep, and check the selected card before confirming.</p>
    <p class="quiet">Windows fresh installs need the installer run as Administrator. Linux may ask you to approve formatting. macOS uses its built-in disk utility.</p>
  </section>

  <section class="manual-install">
    <h2>Prefer to install manually?</h2>
    <p>Use this route if you want to prepare the card yourself. Follow the steps in order: restore the right device backup, copy TreeFrogUI, then boot and add games.</p>
    {% capture guide_markdown %}{% include generated-guides/manual-installation.md %}{% endcapture %}
    {{ guide_markdown | markdownify }}
    <p>Need the controller shortcuts or BIOS file list? They have their own guides: <a href="{{ '/guides/shortcuts/' | relative_url }}">In-game controls</a> · <a href="{{ '/guides/bios/' | relative_url }}">BIOS files</a>.</p>
  </section>
</article>
