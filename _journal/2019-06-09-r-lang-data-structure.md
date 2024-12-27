---
layout: post
title: "Data Structure in R"
categories:
  - Blog Posts
top_tags: General
tags:
- Data Toolbox
---

<hr> 

Data structures are a bit more complex thant their vector counterparts. Data structures are built
on top of atomic vectors and can be categorized into homogenous (containing
all of the same atomic vector) or heterogeneous (containing different
types of atomic vectors).

<br>

## Homogeneous Structures

#### Matix - 

Just as you’d expect from linear algebra, matrices.

<br>

    matrix_dbl <- matrix(c(1, 1, 1, 0), nrow = 1)
    matrix_int <- matrix(c(1L,2L, 3L, 4L, nrow = 4))
    matrix_chr <- matrix(c('a', 'a', 'a', 'a'), ncol = 2)
    matrix_log <- matrix(c(T, T, T, F), nrow = 2, ncol = 2)

<br>

If you try to make it homogenous, coercion rules apply, see atomic
vector note.

<br>

    coerced_matrix <- matrix(c(1, T, 'Seven', 5L), nrow = 1)
    coerced_matrix

    ##      [,1] [,2]   [,3]    [,4]
    ## [1,] "1"  "TRUE" "Seven" "5"

<br>

Attributes are different depending on the function you apply to it. This structure is both a matrix and numeric.

<br>

    is.matrix(matrix_dbl)

    ## [1] TRUE

    is.numeric(matrix_dbl)

    ## [1] TRUE

<br>

But this type of coercion wont work.

<br>


    matrix_dbl == matrix_log

    ## Error in matrix_dbl == matrix_log: non-conformable arrays

<br>

But this will!

<br>

    sum(matrix_log) == sum(matrix_dbl)

    ## [1] TRUE

<br>

    dim(matrix_chr)

    ## [1] 2 2

<br>

    matrix_int[4,1]

    ## [1] 4

<br>

#### Array - 

To me, these are by far the most confusing data structure in R. Arrays are multi-dimensional matrices.
Basically they're matrices stacked on top of each other. Notice the homogeneous structure.

<br>

    coerced_array <- array(c(matrix_dbl, matrix_int,
                             matrix_log, matrix_chr))

    is.array(coerced_array)

    ## [1] TRUE

<br>

    typeof(coerced_array)

    ## [1] "character"

<br>

    coerced_array

    ##  [1] "1"     "1"     "1"     "0"     "1"     "2"     "3"     "4"    
    ##  [9] "4"     "TRUE"  "TRUE"  "TRUE"  "FALSE" "a"     "a"     "a"    
    ## [17] "a"

<br>

Here you can see the multi-layer structure. 

<br>

    multi_layer <- array(rep(matrix_dbl, 4), dim = c(1,4,3))
    multi_layer

    ## , , 1
    ## 
    ##      [,1] [,2] [,3] [,4]
    ## [1,]    1    1    1    0
    ## 
    ## , , 2
    ## 
    ##      [,1] [,2] [,3] [,4]
    ## [1,]    1    1    1    0
    ## 
    ## , , 3
    ## 
    ##      [,1] [,2] [,3] [,4]
    ## [1,]    1    1    1    0

<br>

Let's access the first row, fourth column, 3rd ‘layer’:

    multi_layer[1,4,3]

    ## [1] 0

<br>

As you can imagine, these can get complex.

<br>

## Hetrogeneous

#### List - 

Lists are a big of an ugly catch all, retains structures and data types. Here I'll put a few different structures into a single element of a lsit. 

<br>

    single_list <- list(c(matrix_dbl, matrix_int, matrix_log, matrix_chr))
    is.list(single_list)

    ## [1] TRUE

<br>

    str(single_list)

    ## List of 1
    ##  $ : chr [1:17] "1" "1" "1" "0" ...

<br>

    single_list

    ## [[1]]
    ##  [1] "1"     "1"     "1"     "0"     "1"     "2"     "3"     "4"    
    ##  [9] "4"     "TRUE"  "TRUE"  "TRUE"  "FALSE" "a"     "a"     "a"    
    ## [17] "a"

<br>

You can also separate them out into different elements to retain their individual structures.

<br>

    multi_list <- list(matrix_dbl, matrix_int, 
                       matrix_log, matrix_chr)
    is.list(multi_list)

    ## [1] TRUE

<br>

    str(multi_list)

    ## List of 4
    ##  $ : num [1, 1:4] 1 1 1 0
    ##  $ : num [1:5, 1] 1 2 3 4 4
    ##  $ : logi [1:2, 1:2] TRUE TRUE TRUE FALSE
    ##  $ : chr [1:2, 1:2] "a" "a" "a" "a"

<br>

    multi_list

    ## [[1]]
    ##      [,1] [,2] [,3] [,4]
    ## [1,]    1    1    1    0
    ## 
    ## [[2]]
    ##      [,1]
    ## [1,]    1
    ## [2,]    2
    ## [3,]    3
    ## [4,]    4
    ## [5,]    4
    ## 
    ## [[3]]
    ##      [,1]  [,2]
    ## [1,] TRUE  TRUE
    ## [2,] TRUE FALSE
    ## 
    ## [[4]]
    ##      [,1] [,2]
    ## [1,] "a"  "a" 
    ## [2,] "a"  "a"

<br>


#### Dataframe - 

This is the most common data structure, and by far my favorite. 

<br>

    df <- data.frame(a = 1:3,
                     b = c('chr_1', 'chr_2', 'chr_3'),
                     c = c(3L, 2L, 1L),
                     d = c(T,F,T))
    df

    ##   a     b c     d
    ## 1 1 chr_1 3  TRUE
    ## 2 2 chr_2 2 FALSE
    ## 3 3 chr_3 1  TRUE

<br>

Renaming dataframe columns:

<br>

    colnames(df) <- c('name_1', 'name_2', 'name_3', 'name_4')
    df

    ##   name_1 name_2 name_3 name_4
    ## 1      1  chr_1      3   TRUE
    ## 2      2  chr_2      2  FALSE
    ## 3      3  chr_3      1   TRUE

<br>

It is not advised to name the rows of a data frame, instead use a unique 
column as an identifier. If you want to combine data frames, use cbind or 
rbind:

<br>

    new_df <- data.frame(name_5 = c(5,5,5))

    df <- cbind(df, new_df)
    df

    ##   name_1 name_2 name_3 name_4 name_5
    ## 1      1  chr_1      3   TRUE      5
    ## 2      2  chr_2      2  FALSE      5
    ## 3      3  chr_3      1   TRUE      5

<br>

    new_row <- data.frame(name_1 = 4, 
                          name_2 = 'chr_4', 
                          name_3 = 0L, 
                          name_4 = F, 
                          name_5 = 5
                          )

    df <- rbind(df, new_row)
    df

    ##   name_1 name_2 name_3 name_4 name_5
    ## 1      1  chr_1      3   TRUE      5
    ## 2      2  chr_2      2  FALSE      5
    ## 3      3  chr_3      1   TRUE      5
    ## 4      4  chr_4      0  FALSE      5

<br>


Accessing dataframe information:

    df[1]

    ##   name_1
    ## 1      1
    ## 2      2
    ## 3      3
    ## 4      4

<br>

    df[[1]]

    ## [1] 1 2 3 4

<br>

    df$name_1

    ## [1] 1 2 3 4

<br>

## What's the Difference Between \[\[\]\] and \[\]

When using a list and other data structures, you might use \[\[\]\] or \[\].
\[\[\]\] pulls the data and it's structure, \[\] shows you whats inside, returning
only the data.

See how \[\[\]\] works with a second set of indicies because now you’re
working with that specific matrix, while \[\] does not

<br>

    multi_list[[1]][1,2]

    ## [1] 1

<br>

    multi_list[1][1,2]

    ## Error in multi_list[1][1, 2]: incorrect number of dimensions

<br>

Alternatively, use tibbles!

<br>

That's all for now,

\- Fisher

<br>
<br>
