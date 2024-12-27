---
layout: post
title: "tidyr - Complete and Fill Functions"
categories:
  - Blog Posts
top_tags: General
tags:
- Data Toolbox
---

<hr> 

The concept of tidy data is an extremely important one. Often, we spend a lot of our time
preparing the data to be analyzed instead of actually conducting the analysis.
 Hadley Wickham, the creator of tidyr and the tidyverse wrote a [foundational paper](https://www.jstatsoft.org/article/view/v059i10) on the topic in 2014. I suggest giving that paper a read, then coming back to learn about tidyr. 

<br>

    library('tidyverse')

<br> 


## Fill

When dealing with missing data, it can be the case that you know that
missing values are supposed to be carried on from the last observation.
Something along the line of “ditto” quotations on a sign-up sheet. In
the tibble treatment, we see just that.

<br>

    treatment

    ## # A tibble: 4 x 3
    ##   person           treatment response
    ##   <chr>                <dbl>    <dbl>
    ## 1 Derrick Whitmore         1        7
    ## 2 <NA>                     2       10
    ## 3 <NA>                     3        9
    ## 4 Katherine Burke          1        4

<br>

The function `fill()` is the perfect fix for this situation. `fill()`
takes a set of columns where you want missing values to be replaced with
the most recent non-missing value. Simply input the column in question
as the argument in `fill()`, and let R do the rest. In the case of the
tibble `treatment`, the column in question is `person`.

<br>

    treatment %>%
      fill(person)

    ## # A tibble: 4 x 3
    ##   person           treatment response
    ##   <chr>                <dbl>    <dbl>
    ## 1 Derrick Whitmore         1        7
    ## 2 Derrick Whitmore         2       10
    ## 3 Derrick Whitmore         3        9
    ## 4 Katherine Burke          1        4

<br>

## Complete

When dealing with missing data it’s often important to turn implicitly
missing values to explicit missing values. There are two missing values
from the stocks tibble, 4th quarter 2015 and 1st quarter 2016.

<br>

    stocks

    ## # A tibble: 7 x 3
    ##    year   qtr return
    ##   <dbl> <dbl>  <dbl>
    ## 1  2015     1   1.88
    ## 2  2015     2   0.59
    ## 3  2015     3   0.35
    ## 4  2015     4  NA   
    ## 5  2016     2   0.92
    ## 6  2016     3   0.17
    ## 7  2016     4   2.66

<br>

The `complete()` function takes a set of columns, and finds all unique
combinations. It ensures the original dataset contains all those values,
explicitly filling in `NA` when necessary. The input arguments of
`complete()` are simply the columns you want to cross reference. In the
case of `stocks` we want to find all of the combinations between the
`year` and `qtr` variable, as to fill in implicit missing variables with
`NA`.

<br>

    stocks %>% 
      complete(year, qtr)

    ## # A tibble: 8 x 3
    ##    year   qtr return
    ##   <dbl> <dbl>  <dbl>
    ## 1  2015     1   1.88
    ## 2  2015     2   0.59
    ## 3  2015     3   0.35
    ## 4  2015     4  NA   
    ## 5  2016     1  NA   
    ## 6  2016     2   0.92
    ## 7  2016     3   0.17
    ## 8  2016     4   2.66

<br> 

Until next time, 

\- Fisher

<br>
<br>
