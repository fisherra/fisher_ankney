---
layout: post
title: "Dplyr - Group By Function"
categories:
  - Blog Posts
top_tags: General
tags:
- Data Toolbox
---

<hr>

A bit more tricky, the `group_by()` function allows for custom aggregation
in order to make other dplyr functions even more powerful. 

<br>

    library('tidyverse')
    library('nycflights13')

<br>

## Group By

`summarize()` becomes extremely useful when paired with the final
primary dplyr function, `group_by()`. `group_by()` changes the unit of
analysis from the complete dataset to an individual group, thus changing
the scope of summarize. In the above example, the flights dataset is
grouped by the `dest` variable, destination. Grouping by destination by
itself does nothing to the data frame, so the then pipe, %&gt;%, is used
to push the output to the `summarize()` function. Summarize first
creates a count variable that is equivalent to the function `n()`. `n()`
is another one of those secondary dplyr functions that often comes in
handy; `n()` is a function that finds the number of observations in the
current group. Next, `summarize()` creates a variable named distance
based off the mean distance travelled by each observation, as grouped by
destination. Finally, `summarize()` creates a variable named delay,
based off the mean arrival delay each observation experienced, as
grouped by destination. The resulting data frame gives excellent insight
into each of the 105 destinations present in the flights dataset.

<br>

    group_by(flights, dest) %>%                       
      summarize(count = n(),                          
                dist = mean(distance, na.rm = TRUE),  
                delay = mean(arr_delay, na.rm = TRUE) 
                ) 

    ## # A tibble: 105 x 4
    ##    dest  count  dist delay
    ##    <chr> <int> <dbl> <dbl>
    ##  1 ABQ     254 1826   4.38
    ##  2 ACK     265  199   4.85
    ##  3 ALB     439  143  14.4 
    ##  4 ANC       8 3370  -2.5 
    ##  5 ATL   17215  757. 11.3 
    ##  6 AUS    2439 1514.  6.02
    ##  7 AVL     275  584.  8.00
    ##  8 BDL     443  116   7.05
    ##  9 BGR     375  378   8.03
    ## 10 BHM     297  866. 16.9 
    ## # … with 95 more rows

<br  />

Really take a look into `group_by()`, often it's your data wrangling solution, and you didn't
even know it!


\- Fisher

<br>
<br>
