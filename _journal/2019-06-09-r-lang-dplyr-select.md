---
layout: post
title: "Dplyr - Select Function"
categories:
  - Blog Posts
top_tags: General
tags:
- Data Toolbox
---

<hr>

Another 'big five' function in dplyr, select is used in almost every
data cleaning task I perform. 

<br>


    library('tidyverse')
    library('nycflights13')

<br>

## Select

In a data frame with numerous variables it’s easy become overwhelmed and
broad with analysis. `select()` reduces the number of variables in a
data frame, only keeping variables that the user inputs as arguments. In
this example, flights are reduced from 19 variables to the variables
year, month and day.

    select(flights, year:day)

    ## # A tibble: 336,776 x 3
    ##     year month   day
    ##    <int> <int> <int>
    ##  1  2013     1     1
    ##  2  2013     1     1
    ##  3  2013     1     1
    ##  4  2013     1     1
    ##  5  2013     1     1
    ##  6  2013     1     1
    ##  7  2013     1     1
    ##  8  2013     1     1
    ##  9  2013     1     1
    ## 10  2013     1     1
    ## # … with 336,766 more rows

<br>

Thanks for reading!

\- Fisher

<br> 
<br>
