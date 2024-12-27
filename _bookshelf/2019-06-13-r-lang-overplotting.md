---
layout: post
title: "Overplotting in Base R"
categories:
  - Blog Posts
top_tags: General
tags:
- Data Toolbox
---

<hr>

## Points Function

    plot(1:10, type = 'o')
    points(1:10, rnorm(10,5), col = 'firebrick')

![]({{ site.baseurl }}/images/data_toolbox/overplot-1.png)

<br>

## Lines Function

    a <- c(5,3,6,1,5,10)
    b <- c(1,3,5,6,7,8)

    plot(a, type = 'o')
    lines(b, type = 'o', col = 'firebrick')

![]({{ site.baseurl }}/images/data_toolbox/overplot-2.png)

<br>

## Par Function

    plot(1:10, type = 'o')
    par(new = T)
    plot(1:10, rnorm(10,5), type = 'o',
         xlab = '', ylab = '', axes = F,
         col = 'firebrick')

![]({{ site.baseurl }}/images/data_toolbox/overplot-3.png)

<br>

## abline Function


Horizontal and vertical line:


    plot(1:10)

    abline(h = 5, col = 'firebrick')
    abline(v = 5, col = 'firebrick')

<br>

Coefficient based line:

    plot(1:10)
    abline(0,1, col = 'firebrick')

![]({{ site.baseurl }}/images/data_toolbox/overplot-4.png)

<br>


That's all for now!

\- Fisher

<br>
<br>
