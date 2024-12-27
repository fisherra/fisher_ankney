---
layout: post
title: "Dplyr - Basic Joins"
categories:
  - Blog Posts
top_tags: General
tags:
- Data Toolbox
---

<hr>

There are two types of two-table joining functions, mutating joins and
filtering joins. Mutating joins allow you to add new variables from one
table to matching observations in another table. these functions are
`left_join()`, `right_join()`, and `inner_join()`.
Filtering joins filter observations from one table based on matched
observations in the secondary table; these two functions are
`semi_join()` and `anti_join()`.

All six of the join functions are structure for the first arguments to
be `x` and `y`. These are the tables that are combined or filtered; the
output always takes the same structure as the left table, `x`. The third
argument, `by` defines the “key”, a column that occurs in both tables
that you want to join. They key in the first table is declared the
“primary key”, the key in the second table is declared the secondary, or
foreign key. The Primary key must uniquely ID each row in the first
dataset, but not necessary the second dataset. This means in some cases
that the primary key is more than one column.

They trick to understanding the six join functions is understanding how
to use the key values. Let’s get started with the most popular function,
`left_join()`.

<br>

    library('tidyverse')
    library('dplyr')

<br>

## Left Join

The `left_join()` function keeps all observations in your left table
(argument `x`). Your primary table will never lose observations when
using left join, it will only gain additional observations from the
right table (argument `y`) based on the defined key.

Here we’ll set up a simple example tibbles -

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

    left_join(tib_1, tib_2, by = "x")

    ## # A tibble: 2 x 4
    ##       x     y     a b    
    ##   <dbl> <int> <dbl> <chr>
    ## 1     1     2    10 a    
    ## 2     2     1    NA <NA>

<br>

When you don’t list a `by` argument, dplyr finds the key columns on its
own, most of the time it’s right, but not always.

<br>

    left_join(tib_1, tib_2)

    ## Joining, by = "x"

    ## # A tibble: 2 x 4
    ##       x     y     a b    
    ##   <dbl> <int> <dbl> <chr>
    ## 1     1     2    10 a    
    ## 2     2     1    NA <NA>

<br>

## Right Join

The mirror image of `left_join()`, `right_join()` includes all of the
columns in the `y` table, and adds matching observations from the `x`
table.

<br>

    right_join(tib_1, tib_2)

    ## Joining, by = "x"

    ## # A tibble: 2 x 4
    ##       x     y     a b    
    ##   <dbl> <int> <dbl> <chr>
    ## 1     1     2    10 a    
    ## 2     3    NA    10 a

<br>

## Inner Join

`inner_join()` is simple, it only includes observations that are present
in both `x` and `y`. Every row must be present in both datasets. With
the key `by = "x"`, only one row is present in both example tibbles.

<br>

    inner_join(tib_1, tib_2, by = "x")

    ## # A tibble: 1 x 4
    ##       x     y     a b    
    ##   <dbl> <int> <dbl> <chr>
    ## 1     1     2    10 a

<br>

That's all for now! Check out my article on advanced joins in R for more information on this subject. 

\- Fisher

<br>
<br>

