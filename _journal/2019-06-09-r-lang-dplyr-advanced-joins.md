---
layout: post
title: "Dplyr - Advanced Joins"
categories:
  - Blog Posts
top_tags: General
tags:
- Data Toolbox
---

<hr> 

This is a continuation of the dplyr basic joins post. In that data toolkit article
I covered the most basic joins: left, right, and inner. In this section, I'll be covering 
full, semi, and anti joins. 

<br>

    library('tidyverse')
    library('dplyr')

<br>

To effectively demonstrate dplyr's join functions, I'll again have to prepare some data. 

<br>

    tib_1 <- tibble(x = 1:2, y = 2:1)
    tib_1

    ## # A tibble: 2 x 2
    ##       x     y
    ##   <int> <int>
    ## 1     1     2
    ## 2     2     1

<br>

    tib_2 <- tibble(x = c(1,3), a = 10, b = "a")
    tib_2

    ## # A tibble: 2 x 3
    ##       x     a b    
    ##   <dbl> <dbl> <chr>
    ## 1     1    10 a    
    ## 2     3    10 a

<br>

## Full Join

The most inclusive join of all, `full_join()` joins every observation
from both tables, as the name suggests. If there is no match, the cell 
is filled in with `NA`. 

<br>

    full_join(tib_1, tib_2, by = "x")

    ## # A tibble: 3 x 4
    ##       x     y     a b    
    ##   <dbl> <int> <dbl> <chr>
    ## 1     1     2    10 a    
    ## 2     2     1    NA <NA> 
    ## 3     3    NA    10 a

<br>

## Semi Join

The first of two filter joins, `semi_join()`, keeps all observations in
the `x` argument that have a match in the `y` argument. In this example,
the key is the “x” column of `tib_1`; the only row that matches in
`tib_2` is the observation x = 1. Thus, the resulting semi\_join only
has one observation filtered from `tib_1`.

<br>

    semi_join(tib_1, tib_2, by = "x")

    ## # A tibble: 1 x 2
    ##       x     y
    ##   <int> <int>
    ## 1     1     2

<br>

## Anti Join

`anti_join()` is the antithesis of `semi_join()`, the function only
returns observations that are not present in the `y` dataset.

<br>

    anti_join(tib_1, tib_2)

    ## Joining, by = "x"

    ## # A tibble: 1 x 2
    ##       x     y
    ##   <int> <int>
    ## 1     2     1

<br>

That's it for joining! Really an easy concept once you map out what exactly you're looking for. 

Thanks for reading!

\- Fisher

<br> 
<br>
