---
layout: post
title: "The Tibble Package"
categories:
  - Blog Posts
top_tags: General
tags:
- Data Toolbox
---

<br>

    library('tidyverse') 

<br>

It’s simple to create a tibble - instead of using base R’s
`data.frame()` function, use tibble’s `tibble()` function. If you’re
looking to coerce an object into a tibble, use `as_tibble()` instead of
`as.data.frame()`. The function `as_tibble()` was created with speed in
mind, it is much quicker than the base R counterpart.

Using tibbles instead of data frames is an easy habit to form, and the
benefits of using tibbles make it time well spent. Tibbles never change
input types like data frames do, they also never adjust the names of
variables. Tibbles evaluate arguments lazily and sequentially, resulting
in more user-friendly structure creation and manipulation. They also
don’t use `rownames()` and store variables as special attributes;
tibbles are a standardized data frame that consistently simplify the
user experience.

In addition to the previously mentioned benefits of tibbles, here are
perhaps the three most important changes made from the outdated data
frame.

<br>

## Printing

Objects as a `data.frame` will print every column in the data frame.
This behavior is rarely useful, so I’ve used the `head()` function to
limit the output.

<br>

    head(iris, n = 10)

    ##    Sepal.Length Sepal.Width Petal.Length Petal.Width Species
    ## 1           5.1         3.5          1.4         0.2  setosa
    ## 2           4.9         3.0          1.4         0.2  setosa
    ## 3           4.7         3.2          1.3         0.2  setosa
    ## 4           4.6         3.1          1.5         0.2  setosa
    ## 5           5.0         3.6          1.4         0.2  setosa
    ## 6           5.4         3.9          1.7         0.4  setosa
    ## 7           4.6         3.4          1.4         0.3  setosa
    ## 8           5.0         3.4          1.5         0.2  setosa
    ## 9           4.4         2.9          1.4         0.2  setosa
    ## 10          4.9         3.1          1.5         0.1  setosa

<br>

When an object is stored as a tibble, calling it will automatically
limit the output to ten rows.

<br>

    iris.tib <- as_tibble(iris)
    iris.tib

    ## # A tibble: 150 x 5
    ##    Sepal.Length Sepal.Width Petal.Length Petal.Width Species
    ##           <dbl>       <dbl>        <dbl>       <dbl> <fct>  
    ##  1          5.1         3.5          1.4         0.2 setosa 
    ##  2          4.9         3            1.4         0.2 setosa 
    ##  3          4.7         3.2          1.3         0.2 setosa 
    ##  4          4.6         3.1          1.5         0.2 setosa 
    ##  5          5           3.6          1.4         0.2 setosa 
    ##  6          5.4         3.9          1.7         0.4 setosa 
    ##  7          4.6         3.4          1.4         0.3 setosa 
    ##  8          5           3.4          1.5         0.2 setosa 
    ##  9          4.4         2.9          1.4         0.2 setosa 
    ## 10          4.9         3.1          1.5         0.1 setosa 
    ## # … with 140 more rows

<br>

You’ll also notice that tibbles inform you on the data structures and
dimensions, data frames do not. If you want to view the entire dataset,
the `View()` function in RStudio is a great option.

<br>

#### Subsetting

Tibbles are more strict on subsetting; remember that a single bracket
`[` will produce another tibble (multiple vectors) and a double bracket
`[[` will produce a single vector.

-   `[`= Multiple Vectors
-   `[[` = Single Vector

You can also use the `$` to pull single vector of information, but only
by its name.

When using `$` within a tibble, don’t expect the partial matching
behavior that’s found in data frames.

<br>

    df <- data.frame(abc = 1)
    df$a

    ## [1] 1

<br>

    df2 <- tibble(abc = 1)
    df2$a

    ## Warning: Unknown or uninitialised column: 'a'.

    ## NULL

<br>

If you’re a fan of the magrittr pipe like I am, you’ll need to use the
special character `.` to subset the tibble.

<br>

    df <- tibble(
      x = runif(5),
      y = rnorm(5)
    )
    df %>% .$x

    ## [1] 0.8407117 0.5250497 0.9844013 0.3676194 0.2659309

    df %>% .[["x"]]

    ## [1] 0.8407117 0.5250497 0.9844013 0.3676194 0.2659309

<br>

## Recycling

My favorite from data frames is the lack of vector recycling in tibbles.
Within data.frames, if a vector doesn’t fit the structures dimensions it
is repeated or “recycled” until it does.

<br>

    data.frame(a = 1:6, b = 1:2)

    ##   a b
    ## 1 1 1
    ## 2 2 2
    ## 3 3 1
    ## 4 4 2
    ## 5 5 1
    ## 6 6 2

<br>

Tibbles don’t recycle vectors, unless they’re of length 1.

<br>

    tibble(a = 1:6, b = 1:2)

    ## Tibble columns must have consistent lengths, only values of length one are recycled:
    ## * Length 2: Column `b`
    ## * Length 6: Column `a`

<br>

That's all for now!

\- Fisher

<br>
<br>
