---
layout: cv
title: 김민지 — 웹 이력서
permalink: /about/
draft_page: true
---
{% include cv-head.html active='cv' %}

{% comment %}/about/ 는 메인 홈페이지와 같은 원고(_includes/cv-body.html)를 그대로 보여 준다. 검색엔진에는 노출하지 않음(noindex). 이력서 내용은 _includes/cv-body.html 한 곳에서만 수정한다.{% endcomment %}
{% include cv-body.html %}
