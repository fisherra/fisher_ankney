---
layout: post
title: "Dplyr - Filter Function"
categories:
  - Blog Posts
top_tags: General
tags:
- Data Toolbox
---

<hr>

The filter function is one of the 'big five' functions that makes dplyr such a 
powerful data wrangling package. In essence, `filter()` returns rows that
match specific conditions. Let's check it out!

<br>

    library('tidyverse')
    library('nycflights13')

<br>

## Filter

<br>

`filter()` is a simple function that finds, or ‘filters’ observations
that match true to a declared condition. In this example `filter()`
first’s argument is the flights dataset, the following arguments declare
the conditions to be met. Retain observations (rows) with the months
variable equal to 12, and the day variable equal to 25. The result is a
data frame with 719 flights that departed New York City on Christmas
Day, 2013.

<br>

    filter(flights, month == 12 & day == 25)

    ## # A tibble: 719 x 19
    ##     year month   day dep_time sched_dep_time dep_delay arr_time
    ##    <int> <int> <int>    <int>          <int>     <dbl>    <int>
    ##  1  2013    12    25      456            500        -4      649
    ##  2  2013    12    25      524            515         9      805
    ##  3  2013    12    25      542            540         2      832
    ##  4  2013    12    25      546            550        -4     1022
    ##  5  2013    12    25      556            600        -4      730
    ##  6  2013    12    25      557            600        -3      743
    ##  7  2013    12    25      557            600        -3      818
    ##  8  2013    12    25      559            600        -1      855
    ##  9  2013    12    25      559            600        -1      849
    ## 10  2013    12    25      600            600         0      850
    ## # … with 709 more rows, and 12 more variables: sched_arr_time <int>,
    ## #   arr_delay <dbl>, carrier <chr>, flight <int>, tailnum <chr>,
    ## #   origin <chr>, dest <chr>, air_time <dbl>, distance <dbl>, hour <dbl>,
    ## #   minute <dbl>, time_hour <dttm>

<br> 

There you go! Filter is really the easiest of dplyr functions to understand. Simple, but highly
useful. 

Thanks for reading!

\- Fisher

<br> 
<br>
