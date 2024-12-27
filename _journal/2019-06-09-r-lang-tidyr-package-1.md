---
layout: post
title: "tidyr - Gather and Spread Functions"
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

## Gather

Often, a dataset has column names that are not the names of variables,
but the values of variables. take `table4a` for example.

<br>

    table4a

    ## # A tibble: 3 x 3
    ##   country     `1999` `2000`
    ## * <chr>        <int>  <int>
    ## 1 Afghanistan    745   2666
    ## 2 Brazil       37737  80488
    ## 3 China       212258 213766

<br>

In `table4a`, the column names `1999` and `2000` are values of the
variable year, not variables themselves. The `gather()` function can fix
this, it is perhaps the most commonly used function in tidyr. Begin by
listing the column names that are actually variable names into
`gather()` as its first arguments. Once these column names have been
entered, define a `key` as the second argument. In this case, `1999` and
`2000` are both years, so the key, or new variable name, is `year`.
Finally, define a `value` to be associated with the key as the last
argument in `gather()`. The `value` is the name given to the elements
that were previously linked to the previous `1999` and `2000` false
variables. Because these two years have been gathered into a new `year`
variable, the associated elements need a new column to call home. In
this case, the values represent a number positive cases, so the `value`
is now defined as cases.

<br>

    table4a %>% 
      gather(`1999`, `2000`, key = "year", value = "cases")

    ## # A tibble: 6 x 3
    ##   country     year   cases
    ##   <chr>       <chr>  <int>
    ## 1 Afghanistan 1999     745
    ## 2 Brazil      1999   37737
    ## 3 China       1999  212258
    ## 4 Afghanistan 2000    2666
    ## 5 Brazil      2000   80488
    ## 6 China       2000  213766

<br>

## Spread

When an observation is scattered across multiple rows, variable names
appear repeatedly as elements in a dataframe. In `table2` a single
observation is a country in each year, but each observation is spread
across two rows.

<br>

    table2

    ## # A tibble: 12 x 4
    ##    country      year type            count
    ##    <chr>       <int> <chr>           <int>
    ##  1 Afghanistan  1999 cases             745
    ##  2 Afghanistan  1999 population   19987071
    ##  3 Afghanistan  2000 cases            2666
    ##  4 Afghanistan  2000 population   20595360
    ##  5 Brazil       1999 cases           37737
    ##  6 Brazil       1999 population  172006362
    ##  7 Brazil       2000 cases           80488
    ##  8 Brazil       2000 population  174504898
    ##  9 China        1999 cases          212258
    ## 10 China        1999 population 1272915272
    ## 11 China        2000 cases          213766
    ## 12 China        2000 population 1280428583

<br>

To tidy this data, utilize `spread()`, one of the most common functions
in tidyr. The first argument in `spread()` is the column that contains
the variable names, the `key` column. In the case of `table2`, the key
column is type, because cases and population are both variables, not
values. The second and final argument in `spread()` is the column that
contains values associated with the previously defined key, the `value`
column. In `table2` the it is the count column that contains the
associated values.

<br> 

    table2 %>%
    spread(key = type, value = count)

    ## # A tibble: 6 x 4
    ##   country      year  cases population
    ##   <chr>       <int>  <int>      <int>
    ## 1 Afghanistan  1999    745   19987071
    ## 2 Afghanistan  2000   2666   20595360
    ## 3 Brazil       1999  37737  172006362
    ## 4 Brazil       2000  80488  174504898
    ## 5 China        1999 212258 1272915272
    ## 6 China        2000 213766 1280428583

<br>

Thanks for reading!

\- Fisher

<br>
<br>

