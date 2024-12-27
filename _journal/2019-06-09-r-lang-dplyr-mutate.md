---
layout: post
title: "Dplyr - Mutate"
categories:
  - Blog Posts
top_tags: General
tags:
- Data Toolbox
---

<hr>

Quick calculations - that's the name of the game when it comes to `mutate()`. 

<br>

    library('tidyverse')
    library('nycflights13')

<br>

## Mutate

`mutate()` allows users to alter current variables and create new ones
through various vectorized functions. In the above example the variable
speed is created and is equal to distance divided by air time multiplied
by 60. The pipe function %&gt;%, is used to move the `mutate()` output
to `select()`. The new variable, speed, is output by the `select()`
function, along with each flight’s tail number, air time, and travel
distance.

<br>

    mutate(flights, speed = distance / air_time * 60) %>%
      select(tailnum, distance, air_time, speed)

    ## # A tibble: 336,776 x 4
    ##    tailnum distance air_time speed
    ##    <chr>      <dbl>    <dbl> <dbl>
    ##  1 N14228      1400      227  370.
    ##  2 N24211      1416      227  374.
    ##  3 N619AA      1089      160  408.
    ##  4 N804JB      1576      183  517.
    ##  5 N668DN       762      116  394.
    ##  6 N39463       719      150  288.
    ##  7 N516JB      1065      158  404.
    ##  8 N829AS       229       53  259.
    ##  9 N593JB       944      140  405.
    ## 10 N3ALAA       733      138  319.
    ## # … with 336,766 more rows

<br  />

That's all for now!

\- Fisher

<br>
<br>

