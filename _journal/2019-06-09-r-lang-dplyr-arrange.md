---
layout: post
title: "Dplyr - Arrange Function"
categories:
  - Blog Posts
top_tags: General
tags:
- Data Toolbox
---

<hr>

I don't find arrange as useful as the other dplyr functions, but in the interest of 
posterity I'm including an example here!

<br>

    library('tidyverse')
    library('nycflights13')

<br>

## Arrange

Often observations within a data frame are ordered arbitrarily, or
unproductively. `arrange()` reorders observations according to its user
specified arguments. In this example, the flights data frame is called
upon as the first argument once again; this is common syntax within
dplyr functions and I won’t be referencing it henceforth. The second
argument is `desc(dep_time)`. `desc()` is one of the secondary functions
listed previously; it simply transforms a vector into a format that will
be sorted in descending order. `dep_time` is the flights variable
departure time, a number from 0000 to 2400, indicating the actual
departure time of an individual aircraft. The resulting data frame has
all 336,776 observations sorted from latest (highest) to earliest
(lowest) departure time.

    arrange(flights, desc(dep_time))

    ## # A tibble: 336,776 x 19
    ##     year month   day dep_time sched_dep_time dep_delay arr_time
    ##    <int> <int> <int>    <int>          <int>     <dbl>    <int>
    ##  1  2013    10    30     2400           2359         1      327
    ##  2  2013    11    27     2400           2359         1      515
    ##  3  2013    12     5     2400           2359         1      427
    ##  4  2013    12     9     2400           2359         1      432
    ##  5  2013    12     9     2400           2250        70       59
    ##  6  2013    12    13     2400           2359         1      432
    ##  7  2013    12    19     2400           2359         1      434
    ##  8  2013    12    29     2400           1700       420      302
    ##  9  2013     2     7     2400           2359         1      432
    ## 10  2013     2     7     2400           2359         1      443
    ## # … with 336,766 more rows, and 12 more variables: sched_arr_time <int>,
    ## #   arr_delay <dbl>, carrier <chr>, flight <int>, tailnum <chr>,
    ## #   origin <chr>, dest <chr>, air_time <dbl>, distance <dbl>, hour <dbl>,
    ## #   minute <dbl>, time_hour <dttm>

<br  />

That's all for now!

\- Fisher

<br>
<br>

