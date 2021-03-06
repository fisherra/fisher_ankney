---
layout: post
title: "Unpacking the Tidyverse - stringr"
categories:
  - Blog Posts
top_tags: R
exc: "Stringr manipulates character vectors using regular expressions, locales, and regular expressions. In this Unpacking the Tidyverse tutorial, I walk through how to create and manipulate strings, as well as provide useful resources on learning RegExs."
tags:
- R
- tidyverse
- stringr
- tutorial
- text mining
---

<br>

Introduction
------------

This is the sixth of eight installments of my *Unpacking the Tidyverse*
series. Each installment focuses on one of the eight core packages in
Hadley Wickham's tidyverse. Instructions given in each post are mainly
derived from Hadley's textbook, [R for Data
Science](http://r4ds.had.co.nz/), and CRAN package documentation. This
installment of *Unpacking the Tidyverse* focuses on the string
manipulation package, stringr. The previous installment focuses on the
tibble package, and can be found [here]({{ site.baseurl}}/r4ds-tibble). The next installment
focuses on the forcats package, and can be found [here]({{ site.baseurl}}/r4ds-forcats).

Strings are simply arrays of characters in your dataset. Strings can
contain numbers, letters, special symbols; really anything you decide to
stick between two quotation marks. The tidyverse's stringr function
allows you to manipulate these strings with the help of regular
expressions. While I won't be explaining regular expressions in this
post, I'll link to some useful resources to help you learn to use them.
But before we do anything, we must load the ever-useful tidyverse.

<br>

    library('tidyverse')

<br>

### Creating Strings

<br>

Let's quickly cover how to make strings, before we learn how to
manipulate them.

    string_a <- "this is how you make a string"
    string_b <- 'double or single quotes work'
    string_c_d <- c("what if I want quotes you ask?",
                    "easy! put a \ before your quotes")
    strings <- c(string_a, string_b, string_c_d)

<br>

### Simple Stringr Functions

<br>

All stringr functions start with `str_`, so if you've forgot the name of
the stringr function you're looking for, RStudio will provide you with
all the functions in its autocomplete for `str_`.

The easiest stringr function is `str_length()`. `str_length()` measures
the number of characters in the its primary argument. There are 23
letters and 6 spaces, making a total of 29 characters in `string_a`.

    str_length(string_a)

    ## [1] 29

<br>

If you give the function a vector of strings, it will measure the length
of each individual element.

    str_length(strings)

    ## [1] 29 28 30 31

<br>

Now that we can count them, let's concatenate them! `str_c` is a
function that tacks one string onto the end of another, given a defined
separator.

    str_c(string_a, string_b, sep=", ")

    ## [1] "this is how you make a string, double or single quotes work"

<br>

Another potentially useful function is substrings, `str_sub`. Substrings
extracts and replaces substrings from a character vector, typically
taking 3 input arguments. The first is your character vector, the second
is where to start the substitution, and the third argument is where to
end the substitution.

    str_sub(strings, 10) <- " ...PSYCH!"
    strings

    ## [1] "this is h ...PSYCH!" "double or ...PSYCH!" "what if I ...PSYCH!"
    ## [4] "easy! put ...PSYCH!"

<br>

The final fun-and-easy function I'll cover is `str_sort`. String sort
alphabetically sorts strings in a character vector. It has several
useful options allowing for reverse alphabetical sorting, different
languages, and NA values.

    str_sort(strings)

    ## [1] "double or ...PSYCH!" "easy! put ...PSYCH!" "this is h ...PSYCH!"
    ## [4] "what if I ...PSYCH!"

<br>

### Regular Expression Resources

<br>

Stringr really becomes useful when you use regular expressions to help
it sort through massive amounts of character vectors. RStudio's stringr
[cheatsheet](https://github.com/rstudio/cheatsheets/blob/master/strings.pdf)
has an excellent section on RegEx's on its second page. If you're still
not sure on how regular expressions work, check out
[this](https://stringr.tidyverse.org/articles/regular-expressions.html)
article on the stringr website.

<br>

### Pattern Matching with Stringr

The vignette associated with stringr has wonderful examples on how to
use stringr’s pattern matching functions; [check it
out](https://cran.r-project.org/web/packages/stringr/vignettes/stringr.html)
for great examples of all the pattern matching functions and more.

The pattern matching functions all work in a similar way, so I won't be
giving examples for each of them. All the functions take a targeted
character vector as their first argument. The regular expression that
describes the pattern you're searching for is the second argument.
Things like separators and other options come last. Here's an overview
of the pattern matching functions and what they do.

<br>

#### Stringr Pattern Matching Functions

    str_detect()      - returns T/F if pattern is found
    str_subset()      - returns the elements that match pattern
    str_count()       - counts the number of pattern matches
    str_locate()      - returns the location of the first pattern match
    str_locate_all()  - returns the location of all pattern matches
    str_extract()     - extracts the first pattern match
    str_extract_all() - extracts all pattern matches
    str_replace()     - replaces the first pattern match 
    str_replace_all() - replaces all pattern matches
    str_split()       - splits pattern matches into individual elements

<br>

To demonstrate two of my favorite pattern matching functions, I'll
create some data to sift through. This data comes from the stringr
vignette.

    # Create some strings that include phone numbers
    strings <- c(
      "Ralph", 
      "970 313 8955", 
      "989-344-6480", 
      "Work: 822-541-1234; Home: 543.355.3679"
    )

    # Create a regular expression that identifies phone numbers
    phone <- "([2-9][0-9]{2})[- .]([0-9]{3})[- .]([0-9]{4})"

<br>

String count, `str_count` is a simple function that tells you how
pattern matches are in each string:

    str_count(strings, phone)

    ## [1] 0 1 1 2

<br>

String replace all has obvious uses; it's important to note that
`str_replace_all` takes a third argument defining the replacement
string.

    str_replace_all(strings, phone, "XXX-XXX-XXXX")

    ## [1] "Ralph"                                 
    ## [2] "XXX-XXX-XXXX"                          
    ## [3] "XXX-XXX-XXXX"                          
    ## [4] "Work: XXX-XXX-XXXX; Home: XXX-XXX-XXXX"

<br>

The rest of the pattern matching functions work in a similar fashion.
Sometimes stringr's usefulness is not obvious, but that's what makes
programming fun - finding creative ways to implement what you thought
was a useless function to solve a useful problem.

<br>

### Whitespace Manipulation

<br>

Lastly, I'll cover what I find to be the most useful family of functions
in stringr, the three whitespace manipulation functions.

You can add white space using `str_pad`, remove whitespace using
`str_trim`, and manipulate existing whitespace using `str_wrap`.

String pad will "pad" vectors that are shorter than your desirable
length with whitespace either side of the string. If your string is
already greater than or equal to the desired length, it remains
unaffected. `str_pad` will never shorten a vector.

    # create example strings
    ws_example <- c("abc", "abcdefghij")

    # ensure strings are 10 chr long
    ws_example <- str_pad(ws_example, 10, side = "right")
    ws_example

    ## [1] "abc       " "abcdefghij"

    # Now ensure the strings are 20 chr long
    ws_example <- str_pad(ws_example, 20, side = "left")
    ws_example

    ## [1] "          abc       " "          abcdefghij"

<br>

String trim will remove the whitespace we've just added, returning the
strings to their original characters.

    # trim the whitespace returning the strings to original size
    ws_example <- str_trim(ws_example, side = "both")
    ws_example

    ## [1] "abc"        "abcdefghij"

<br>

This example is directly from the stringr vignette - we've got one long
string telling a jabberwocky story. We want to retain the story as one
string, but break it into multiple similar-length lines to increase
accessibility. `str_wrap` to the rescue.

    # create jabberwocky example story
    jabberwocky <- str_c(
      "`Twas brillig, and the slithy toves ",
      "did gyre and gimble in the wabe: ",
      "All mimsy were the borogoves, ",
      "and the mome raths outgrabe. "
    )

    # view the string wrap of jabberwocky, line width of 40 chr
    cat(str_wrap(jabberwocky, width = 40))

    ## `Twas brillig, and the slithy toves did
    ## gyre and gimble in the wabe: All mimsy
    ## were the borogoves, and the mome raths
    ## outgrabe.

<br>

And that's it for Unpacking the Tidyverse - stringr! There's a lot more
to stringr and regular expressions, but it's probably best to learn the
nitty-gritty when you need it. While strings aren't the most glamorous,
they're prolific in many dataset and it's useful to know how to
manipulate them.

If you'd like additional information on stringr, check out the
additional resources I've listed below. Keep an eye out for my next
*Unpacking the Tidyverse* post, forcats.

<br>

### Additional Resources

-   [Stringr chapter R4DS](http://r4ds.had.co.nz/strings.html)
-   [Stringr website
    tutorial](https://stringr.tidyverse.org/articles/regular-expressions.html)
-   [Stringr Cheat
    Sheet](https://github.com/rstudio/cheatsheets/blob/master/strings.pdf)
-   [Stringr
    Vinette](https://cran.r-project.org/web/packages/stringr/vignettes/stringr.html)

<br>

Until next time, <br  /> - Fisher
