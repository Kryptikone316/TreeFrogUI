---
layout: default
title: News & notes
permalink: /news/
---

<section class="page-heading"><p class="eyebrow">From the workbench</p><h1>News & notes</h1><p>Longer updates and community notes.</p></section>

<div class="post-list">
  {% for post in site.posts %}
    <article class="post-card"><time>{{ post.date | date: "%b %-d, %Y" }}</time><h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2><p>{{ post.excerpt | strip_html | strip_newlines | truncate: 220 }}</p></article>
  {% else %}
    <p class="quiet">No posts yet. Add your first Markdown note to <code>site/_posts/</code>.</p>
  {% endfor %}
</div>
