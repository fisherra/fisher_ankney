---
layout: post
title: "The Purrr Package"
categories:
  - Blog Posts
top_tags: General
tags:
- Data Toolbox
---

<hr>


## Library

    library('tidyverse')

<br>

## Iteration by Hand

Iteration allows you to conduct the same operation on multiple inputs
without tediously copying-and-pasting code. To illustrate the need for
iteration, I’ll set up a repetitive task and complete it by hand. Once
we have a baseline of tediousness, I’ll complete the same task using a
for loop. After that, we’ll move to the purrr package’s `map` functions
for maximum-awesome.

To illustrate the need for iteration, let’s compute a simple summary
statistic on a dataset. First we’ll create a dataframe with 4 variables:
a, b, c, and d. Each of these variables will contain 10 randomly
generated numbers from the normal distribution using the function
`rnorm`.

<br>

    df <- tibble(
    a = rnorm(10),
    b = rnorm(10), 
    c = rnorm(10),
    d = rnorm(10)
    )
    df

    ## # A tibble: 10 x 4
    ##          a       b        c        d
    ##      <dbl>   <dbl>    <dbl>    <dbl>
    ##  1 -0.554  -0.0567 -0.550    0.527  
    ##  2 -0.364   0.697  -0.00842 -0.329  
    ##  3 -0.247   0.395   0.179   -0.477  
    ##  4  0.701   0.943  -0.760   -1.26   
    ##  5  0.724   0.0190 -1.66    -0.0738 
    ##  6 -0.0406 -0.427  -0.315   -0.645  
    ##  7  1.16   -0.185  -0.931    0.529  
    ##  8  0.498  -0.378   0.636    0.00134
    ##  9 -0.832  -0.594   0.355   -0.176  
    ## 10 -0.786   0.468   0.882   -1.27

<br>

As you can see the numbers range from around negative 3 to positive 3,
but are mostly populating -1 to 1. This is typical of the normal
distribution, to see this distribution in action, check out my previous
blog post [A Roll of the
Dice](%7B%7B%20site.baseurl%20%7D%7D/a-roll-of-the-dice).

Now to compute the mean of each of the variables a-d:

<br>

    mean(df)

    ## Warning in mean.default(df): argument is not numeric or logical: returning
    ## NA

    ## [1] NA

<br>

Well that doesn’t work…

I guess we’ll have to specify each variable.

<br>

    mean(df$a)

    ## [1] 0.02607439

    mean(df$b)

    ## [1] 0.08807291

    mean(df$c)

    ## [1] -0.2174574

    mean(df$d)

    ## [1] -0.3171327

<br>

That’s better. But imagine if we have 100 variables that we want to
calculate the mean of… That would be awful! Good thing we have for loops
to rescue us from all of this *work*.

<br>

## For Loops

Let’s make a for loop, and use it to calculate the mean of each of these
variables.

    # Step 1 
    output_vector <- vector("double", ncol(df))
    # Step 2 
    for (i in seq_along((df))) {
    # Step 3 
      output_vector[[i]] <- mean(df[[i]])
    # close for loop
    }
    # display results
    output_vector

    ## [1]  0.02607439  0.08807291 -0.21745738 -0.31713274

<br>

We’ve successfully created a for loop to iterate through the variables!
It may seem like more work at first, and maybe it is for such a simple
task as calculating the mean of 4 variables. But for loops are an
integral programming technique and can be extremely useful. Even if
you’re a master at purrr.

Each for loop is broken down into three steps.

The first step, you must create an output vector to store your results.
It’s easy to create an empty vector of the correct size using the
`vector()` function. In the first argument of `vector()` you specify
what kind of vector to create. This could be specified as any of the
data structures i.e. integer, logical, character, etc. The second
argument of `vector()` is the length of the vector. Clever use of
`ncol()`, `nrow()`, or `length()` will give you the proper length for
your output vector.

The second step of a for loop is to define the sequence. Here we
determine what to loop over using base R’s `seq_along()` function.
Create the variable `i` as a counter variable.

The third and most complicated step of creating a for loop is in the
body of the sequence. Here we describe to R exactly what we want to do
as we loop through our defined dataframe. Sometimes we simply want to
take the mean of each variable, and store that number into our output
vector. Other times we may want to insert a series of if then
statements, of generate graphics of the data we’re looping over. The
possibilities are endless.

Great, so we’ve covered a iteration and a simple for loop. Now let’s get
to the good stuff. The reason you came here. The purrr package!

<br>

## Purrr Map Function

In our quest to find the mean of each of the four variables in `df`, we
can use the most basic purrr function `map()`.

<br>

    df %>% 
      map(mean)

    ## $a
    ## [1] 0.02607439
    ## 
    ## $b
    ## [1] 0.08807291
    ## 
    ## $c
    ## [1] -0.2174574
    ## 
    ## $d
    ## [1] -0.3171327

<br>

The function `map` takes two main arguments, a target to iterate over,
and a function to apply during that iteration. `map` Returns a list of
values, but if you don’t want a generic list you can the variants of the
`map` function.

-   `map_lgl()` returns a logical vector.
-   `map_int()` returns an integer vector.
-   `map_dbl()` returns a double vector.
-   `map_chr()` returns a character vector.

<br>

Here’s what `map_dbl()` looks like when applied to our favorite
iteration-situation.

<br>

    df %>%
      map_dbl(mean)

    ##           a           b           c           d 
    ##  0.02607439  0.08807291 -0.21745738 -0.31713274

<br>

That’s smooooth.

So let’s make it more complex! How about we create our own function and
test out the `map_chr` function. I want to run through a dataframe of
arbitrary size, and return the words “positive”, “negative”, or “zero”,
if the elements are as such. I want this to function to be done to every

First things first, let’s make the custom function!

<br>

    # name the function 'classify_chr' with input = 'input'
    classify_chr <- function(input) {
    # set a counter equal to 1 
    i <- 1
    # create a save vector of input length
    save_vect <- vector("character", length(input))
    # main while loop, while counter is less than or equal
    # to input length, classify the elements and put that
    # character classification into the save vector. 
    # Then, add one to the counter to move on to the next 
    # element. 
    while (i <= length(input))
      {
        if (input[[i]] > 0) {
          save_vect[[i]] = "positive"
        }
        if (input[[i]] < 0) {
          save_vect[[i]] = "negative"
        }
        if (input[[i]] == 0) {
          save_vect[[i]] = "zero"
        }
      i <- i + 1
      }
    # When the save vector is full of output, collapse the
    # results and separate them by a space. Finally, print
    # the resulting output vector.
    output <- str_c(save_vect, collapse=" ")
    print(output)
    }

<br>

Alright. That function was relatively easy to create! Let’s test it out.

<br>

    # test classify_chr function
    classify_chr(-1)

    ## [1] "negative"

    classify_chr(0)

    ## [1] "zero"

    classify_chr(1)

    ## [1] "positive"

<br>

Single entries are working as expected. Let’s give the custom function a
concatenated list of numbers and see what it does.

<br>

    # test classify_chr on a numeric vector
    a <- c(-1,0,1)
    classify_chr(a)

    ## [1] "negative zero positive"

<br>

Looking good, how about we step it up to the final level of complexity!
Running through a tibble that has lists of numbers as it’s variables.

<br>

    # test classify_chr on a tibble
    test_tib <- tibble(
      a = sample(-10:10,10, replace = T),
      b = sample(1:10,10, replace = T),
      c = 0
    )
    test_tib

    ## # A tibble: 10 x 3
    ##        a     b     c
    ##    <int> <int> <dbl>
    ##  1   -10     7     0
    ##  2     2     5     0
    ##  3     4     7     0
    ##  4   -10     5     0
    ##  5    -8     1     0
    ##  6   -10    10     0
    ##  7     1     7     0
    ##  8     5     1     0
    ##  9    10     5     0
    ## 10     0     8     0

    classify(test_tib)

    ## Error in classify(test_tib): could not find function "classify"

<br>

An Error! Oh no! Wait, that’s exactly why we went through all of this.
That’s where purrr comes in! Let’s give it a shot.

<br>

    # use map_chr to apply custom function to a tibble
    test_tib %>%
      map_chr(classify_chr)

    ## [1] "negative positive positive negative negative negative positive positive positive zero"
    ## [1] "positive positive positive positive positive positive positive positive positive positive"
    ## [1] "zero zero zero zero zero zero zero zero zero zero"

    ##                                                                                           a 
    ##     "negative positive positive negative negative negative positive positive positive zero" 
    ##                                                                                           b 
    ## "positive positive positive positive positive positive positive positive positive positive" 
    ##                                                                                           c 
    ##                                         "zero zero zero zero zero zero zero zero zero zero"

<br>

Alright! Not the prettiest of outputs, but it does what it’s designed to
do. And it’s a great illustration of when we need to use the map
function.

<br>

### Purrr map2 & pmap Function

When we want to map over two arguments in our function, we can use the
map2 function. Say you want to generate a random number from the normal
distribution with a specific mean and standard deviation.

Using the `rnorm` function, you could do something like this.

<br>

    rnorm(10, 5, n = 1)

    ## [1] 16.51869

<br>

There we’ve taken number from the normal curve with mean (mu) 10, and
standard deviation (sigma) 5. now say we want to do this 5 times each
with 10 different inputs. Instead of writing 50 `rnorm` statements,
`Map2` can help us out.

<br>

    # create a variety of mean inputs 
    mu <- rep(20:24, 2)
    # create a variety of standard devation inputs
    sigma <- sample(1:5, size = 10, replace = T)
    # check the inputs
    mu

    ##  [1] 20 21 22 23 24 20 21 22 23 24

    sigma

    ##  [1] 3 5 1 2 5 1 3 4 1 5

    # apply mu and sigma inputs to the rnorm function,
    # produce 5 outputs for each pair of input arguments
    map2(mu, sigma, rnorm, n=5)

    ## [[1]]
    ## [1] 21.17404 22.56106 22.49158 22.15317 16.70522
    ## 
    ## [[2]]
    ## [1] 19.08679 17.91927 21.51969 17.75422 12.80090
    ## 
    ## [[3]]
    ## [1] 21.73921 20.89284 22.85076 22.23587 19.92050
    ## 
    ## [[4]]
    ## [1] 25.29599 23.64171 23.27595 20.67421 21.70236
    ## 
    ## [[5]]
    ## [1] 19.87137 15.18446 15.11524 19.59864 20.91303
    ## 
    ## [[6]]
    ## [1] 20.39417 19.47562 18.83630 19.57695 19.72240
    ## 
    ## [[7]]
    ## [1] 12.27347 19.89696 26.24954 18.58605 20.20357
    ## 
    ## [[8]]
    ## [1] 14.32382 22.86421 18.62573 25.46024 21.88317
    ## 
    ## [[9]]
    ## [1] 24.44066 23.07704 23.02711 23.51332 22.88832
    ## 
    ## [[10]]
    ## [1] 28.77960 22.31481 33.42296 20.08290 29.53275

<br>

It’s easy to see how you could want 3 arguments, or 4 or 5. For the
generalized case, of **p** inputs, we use the `pmap` function in much
the same way we would use map2.

As a final example, we want to again use the `rnorm` function to choose
a number from the normal distribution with a set mean and standard
deviation. this time, we also want to vary the number of outputs the
function returns by changing the `n =` argument in `rnorm`. 3 varied
arguements is the job for `pmap`.

    outs <- c(10,15,20)
    mu <- c(5,6,7)
    sigma <- c(1,2,3)
    arguments <- list(outs, mu, sigma)
    arguments %>%
      pmap(rnorm)

    ## [[1]]
    ##  [1] 5.752082 4.529751 5.569735 3.719392 2.931446 5.323930 3.992918
    ##  [8] 3.253352 4.440078 6.312741
    ## 
    ## [[2]]
    ##  [1] 6.363228 4.626116 7.005189 7.429690 9.127814 6.009882 4.589295
    ##  [8] 6.587369 6.612209 3.677911 6.607614 8.443922 5.242299 5.776972
    ## [15] 4.124226
    ## 
    ## [[3]]
    ##  [1]  5.1630993  9.4077378  0.4833954  6.3163107  3.2688190  9.4852517
    ##  [7]  2.4587297  9.8187866  3.0978455  7.3941717  2.1337123  7.4064330
    ## [13]  7.5908101  6.4423399  9.2909349  8.8124667 12.9292212  8.6884592
    ## [19]  8.1997732  6.3380038

<br>

That's all for now!

\- Fisher

<br>
<br>
