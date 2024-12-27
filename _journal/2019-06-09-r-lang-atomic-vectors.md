---
layout: post
title: "Atomic Vectors in R"
categories:
  - Blog Posts
top_tags: General
tags:
- Data Toolbox
---

<hr> 

Atomic vectors are the most basic data types in R. These are the building blocks of
matrices, dataframes, and all of the other commonly used data structures. 
 These are the four most important types of atomic vectors. 

<br> 

## Data Types

<br>

#### Double - a number with a decimal

<br> 

    double <- c(1, 0.1, 1.0, 1.01)
    is.double(double)

    ## [1] TRUE

<br>

#### Integer - a whole number

<br>

    integer <- c(1L, 500L, 0L)
    is.integer(integer)

    ## [1] TRUE

<br>

#### Logical - true or false

<br>

    logical <- c(T, TRUE, F, FALSE)
    is.logical(logical)

    ## [1] TRUE

<br>

#### Character - a string, or word

<br>

    character <- c('string_1', "string 2", '345')
    is.character(character)

    ## [1] TRUE

<br>

## Coercion Rules

Coercion is forcing data from one type to another to make your calculation 
compatable. You can't add 1 + 'seven', but you can add 1 + 7. Coercion rules 
are based on which data type retains the most information.

<br>

#### logical to numeric (double or integer)

<br>

    mixed <- c(T, 1L)
    typeof(mixed)

    ## [1] "integer"

<br>

#### integer to double

    mixed <- c(1, 2L)
    typeof(mixed)

    ## [1] "double"

<br>

#### everything to character

<br>

    mixed_1 <- c('a', 1)
    mixed_2 <- c(T, 'a')
    mixed_3 <- c('a', 1L)

    typeof(mixed_1)

    ## [1] "character"

    typeof(mixed_2)

    ## [1] "character"

    typeof(mixed_3)

    ## [1] "character"

<br>

## Forcing Coersion

Some functions will force coersion on their own, this can be useful for counting. 

<br>

    example_log <- c(T, T, F)
    example_num <- as.numeric(example_log)

    example_num

    ## [1] 1 1 0

<br> 

    sum(example_log)

    ## [1] 2

<br>

    mean(example_log)

    ## [1] 0.6666667

<br>

## Other Useful Functions

Here are a few extra useful functions that may be useful when dealing with atomic vector structure.

<br>

```
class() 
length()
typeof()
attributes()
```

<br>

That's all for now!

\- Fisher

<br> 
<br>
