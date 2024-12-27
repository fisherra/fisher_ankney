---
layout: post
title: "tidyr - Separate and Unite Functions"
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

## Separate

Sometimes a column contains more than variable worth of information in
each element. In `table3` this is exemplified by the `rate` column.

<br>

    table3

    ## # A tibble: 6 x 3
    ##   country      year rate             
    ## * <chr>       <int> <chr>            
    ## 1 Afghanistan  1999 745/19987071     
    ## 2 Afghanistan  2000 2666/20595360    
    ## 3 Brazil       1999 37737/172006362  
    ## 4 Brazil       2000 80488/174504898  
    ## 5 China        1999 212258/1272915272
    ## 6 China        2000 213766/1280428583

<br>

A simple problem to fix, the `separate()` function splits two variables
apart from a single column. The first argument in `separate()` is the
column in question, in this case it’s `rate`. The next argument is a bit
more complex; the `into` argument needs a concatenated input, `c()` to
define the names and number of new columns. As for table3, the new
columns are defined as `into = c("cases", "population")`. Finally, a
separator character can be defined in the third argument. The separator
defaults to any non-alphanumeric character, but can be customized.

<br>

    table3 %>%
      separate(rate, into = c("cases", "population"))

    ## # A tibble: 6 x 4
    ##   country      year cases  population
    ##   <chr>       <int> <chr>  <chr>     
    ## 1 Afghanistan  1999 745    19987071  
    ## 2 Afghanistan  2000 2666   20595360  
    ## 3 Brazil       1999 37737  172006362 
    ## 4 Brazil       2000 80488  174504898 
    ## 5 China        1999 212258 1272915272
    ## 6 China        2000 213766 1280428583

<br>

## Unite

When a single variable is spread between multiple columns, it’s time to
unite them. In `table5` the century and year variables should be united
to create a single variable, the full year.

<br>

    table5

    ## # A tibble: 6 x 4
    ##   country     century year  rate             
    ## * <chr>       <chr>   <chr> <chr>            
    ## 1 Afghanistan 19      99    745/19987071     
    ## 2 Afghanistan 20      00    2666/20595360    
    ## 3 Brazil      19      99    37737/172006362  
    ## 4 Brazil      20      00    80488/174504898  
    ## 5 China       19      99    212258/1272915272
    ## 6 China       20      00    213766/1280428583

<br>

The `unite()` function works in a similar way to `separate()`, as it is
it’s inverse. The first argument of `unite()` is to define the name of
the new, united, variable. In the case of `table3`, this variable shall
be called `full_year`. The next arguments define the columns that need
to be united; this can be any number of columns. `century` and `year`
need to be united to form `full_year` in this example. Finally, it’s
sometimes wise to indicate a separator character, just as with
`separate()`. The separator character in `unite()` defaults to the
underscore, `_`.

<br>

    table5 %>%
      unite(full_year, century, year, sep = "")

    ## # A tibble: 6 x 3
    ##   country     full_year rate             
    ##   <chr>       <chr>     <chr>            
    ## 1 Afghanistan 1999      745/19987071     
    ## 2 Afghanistan 2000      2666/20595360    
    ## 3 Brazil      1999      37737/172006362  
    ## 4 Brazil      2000      80488/174504898  
    ## 5 China       1999      212258/1272915272
    ## 6 China       2000      213766/1280428583

<br  />

Thanks for reading!

\- Fisher

<br>
<br>
