---
layout: post
title: "Casino Games - Slots"
categories:
  - Blog Posts
top_tags: R
exc: "Sometimes big programs can be a bit overwhelming. It's hard to figure otu where to even get started. In this post, I walk you through how to create a complex function by using pseudo-code, and breaking the entire program down into simple, easy-to-complete tasks."
tags:
- R
- function
- project
- tutorial
---

<br>

Introduction
------------

In the final entry of my three-part series of casino games in R, I break
down how to tackle creating a complex function. Following closely with
third project of *Hands-On Programming with R* by Garrett Grolemund,
I'll walk you through how to create a slot machine, step-by-step. If you
find this post interesting, check out my [resource
review](%7B%7Bsite.baseurl%7D%7D/resource-review) and have a go at the
[book](https://www.amazon.com/Hands-Programming-Write-Functions-Simulations/dp/1449359019/ref=pd_lpo_sbs_14_t_2?_encoding=UTF8&psc=1&refRID=RQ3DSSGC8VHX626WSG6X)
yourself.

First, we'll have to define exactly what we want to achieve. Then we'll
break up the project into smaller and more simple tasks and achieve
those tasks individually. Finally, we'll bring it all back together to
format and test out our finished product to make sure it works.

I want to create a function that randomly generates three symbols, just
as a traditional three-wheel slot machine would. I will define the
probability of each symbol, and I want the symbols to be generated
according to these probabilities.

I also want my function to score the symbols and tell me just how much
I've won in that round. I want the prize to be presented as a dollar
amount, and I want it to be accurate for every possible combination of
symbols.

Finally, I want the function to return the values in this manner -

    play() 
    ### 0 0 DD 
    ### $0 

<br>

Sounds easy enough!

<br>

Part I - Generate Symbols
-------------------------

The first step in creating this complex function is to break it down
into bite-sized functions and tasks. Taking a sample of seven different
symbols isn't terribly difficult.

The possible symbols are diamonds, 7's, 3 bars, 2 bars, 1 bar, a cherry,
and a zero.

Their probabilities are 0.03, 0.03, 0.06, 0.10, 0.25, 0.01, and 0.52,
respectively.

<br>

Let's write this into a table in R:

<br>

    possible_symbols <- c('DD' = 0.03,
                          '7' = 0.03,
                          'BBB' = 0.06,
                          'BB' = 0.1,
                          'B' = 0.25,
                          'C' = 0.01,
                          '0' = 0.52
                          )

    possible_symbols

    ##   DD    7  BBB   BB    B    C    0 
    ## 0.03 0.03 0.06 0.10 0.25 0.01 0.52

<br>

Now that we've defined the symbols and their associated probabilities,
we’ll use the sample function to choose the symbols three times, based
on their probabilities. We will replace the symbols as we pick them, or
else we would never be able to get more than 1 of any symbol.

<br>

    get_symbols <- function() {
      
      # possible symbols are defined as the names of the possible_symbols vector
      wheel <- names(possible_symbols)
      # symbols take a sample from variable wheel
      symbols <- sample(
                        wheel,
      # the sample has size of 3 symbols
                        size = 3,
      # the symbols are taken and replaced so they can show up two or three times
                        replace = T, 
      # the probability of each symbol is taken from possible_symbols vector
                        prob <- possible_symbols
                        )
      # the generated symbols are now displayed
      symbols
      
    }

      # test the function
    get_symbols()

    ## [1] "0"   "B"   "BBB"

<br>

Looks good! You can think of `get_symbols()` as pulling the slot
machine's lever, and it's output as the slot machine’s display. The
symbols aren't formatted properly, but we'll format them at the same
time as we format the prize output. For now, let's move on to
calculating that prize.

<br>

Part II - Calculate Prize
-------------------------

This function is a little more difficult because it deals with multiple
cases. We should clearly explain what we want the function to do, then
we should write pseudo-code for the function. Pseudo code is a notation
resembling a simplified programming language, used in program design.
Instead of using specific R syntax, we just state something like "if
this, do that" in English.

Once we've wrote sufficient pseudo code, we'll identify and complete
simple tasks within the pseudo code until we've completed every piece of
the function individually. Then we'll work these simple tasks in
together in a generalized way so they work for the larger program.

Once all of that is complete, we'll test the program to make sure it all
functions as expected.

Let's get started by defining exactly how we want to score each of the
combinations of symbols.

If `get_symbols()` returns three of a kind, such as `DD DD DD`, or
`B B B`, the gambler wins. Three of a kind prizes are defined based on
how rare the associated symbol is, where:

    DD DD DD = $100
    7 7 7 = $80 
    BBB BBB BBB = $40 
    BB BB BB = $25
    B B B = $10 
    C C C = $10 
    0 0 0 = $0 

If `get_symbols()` returns any sequence of three bars, the gambler wins
$5. A sequence of three bars can look like, but is not limited to, these
examples:

    BB BBB B 
    BBB BBB BB
    B B BB

If the bars are exactly alike, the three-of-a-kind prize takes
precedence.

If `get_symbol()` returns one cherry, the gambler wins $2. If
`get_symbol()` returns two cherries, the gambler wins $5. If
`get_symbol()` returns three cherries, the gambler wins the
three-of-a-kind cherries prize of $10.

Finally, the presence of diamonds doubles a payout. So, if
`get_symbols()` returns all three diamonds, `DD DD DD`, the payout of
$100 is doubled three times to equal $800. If `get_symbols()` returns
`C DD 0`, the payout doubles from $2 for the single cherry, to $4 for
the cherry and diamond.

And that's the rules! They sound like a lot, but when we break them down
into pseudo code they seem a lot more manageable.

<br>

Here's some pseudo code to outline our tasks -

    # get_symbols() returns 3 symbols 

    define what three-of-a-kind is
    define how three-of-a-kinds are scored

    define sequence of bars
    define how sequence of bars are scored

    count cherries 
    define how cherries are scored


    count diamonds
    apply diamond multiplier to score

    # plug the defined values into a decision tree 

    if (three-of-a-kind = True) {
        return three-of-a-kind score
    } else if (sequence of bars = True) { 
      return bars scores
    } else if (cherries = 1 or 2) {
      return cherries score
    } else if (diamonds = 1, 2, or 3)
      return score with diamond multiplier
      
      
    # return the calculated prize

<br>

If you thought about completing the task another way, that's great! It
might even be that your way is better. R prefers vectorized code, but my
R-chops aren't quite up to that level yet, so I'm still working with old
fashion if-then statements and for-loops.

Now let's work through these tasks one at a time.

<br>

### Task 1. Define 3-of-a-kind

First things first, we'll make test symbols so we don't have to run the
function `get_symbols()` over and over again, wishing for a testable
results.

<br>

    symbols_1 <- c('7', '7', '7')
    symbols_2 <- c('0', '7', '7')
    symbols_3 <- c('0', 'DD', '7')

<br>

A good way to test if the symbols are all alike utilizes the simple
functions `unique()` and `length()` functions.

<br>

    symbols_1

    ## [1] "7" "7" "7"

    unique(symbols_1)

    ## [1] "7"

    length(unique(symbols_1))

    ## [1] 1

<br>

If the symbols are alike, this sequence of functions returns the value
`1`. Let's see what it does when the symbols are not all the same.

<br>

    symbols_2

    ## [1] "0" "7" "7"

    length(unique(symbols_2))

    ## [1] 2

    symbols_3 

    ## [1] "0"  "DD" "7"

    length(unique(symbols_3))

    ## [1] 3

<br>

This sequence of functions is just what we're looking for. Now to create
a simple variable that we can plug into an if-then statement, returning
true if the functions equal 1, returning false if they do not.

<br>

    same <- length(unique(symbols)) == 1

<br>

### Task 2. Score Three-of-a-kind

We can again utilize a lookup table to score three of a kind in
accordance with the defined payouts.

<br>

    payouts <- c('DD' = 100,
                 '7' = 80, 
                 'BBB' = 40,
                 'BB' = 25, 
                 'B' = 10, 
                 'C' = 10, 
                 '0' = 0
                 )

    payouts

    ##  DD   7 BBB  BB   B   C   0 
    ## 100  80  40  25  10  10   0

<br>

This chunk of code will be placed after the `same` test we previously
created. That means that only symbols that are three of a kind will ever
reach this task. We can take any of the three symbols (because they must
all be the same to get here) and return the payout based on that symbol.

<br>

    symbols_1

    ## [1] "7" "7" "7"

    payouts[[symbols_1[[1]]]]

    ## [1] 80

<br>

The payout associated with three-of-a-kind symbols `7` is $80. Our
lookup table returns just that. Now let's create the generalized version
that we can insert into the function.

<br>

    same_table <- c(
                    'DD' = 100,
                    '7' = 80,
                    'BBB' = 40,
                    'BB' = 25,
                    'B' = 10,
                    'C' = 10,
                    '0' = 0
                    )

    same_prize <- same_table[[symbols[[1]]]]

<br>

### Task 3. Test if symbols are all a version of ‘bar’

This task is actually very easy. We want to see if all three elements of
the symbols variable are either `B`, `BB`, or `BBB`. Let's create new
test variables to help us with this.

<br>

    symbols_1 <- c('B', 'BB', 'BBB')
    symbols_2 <- c('0', 'B', '0')
    symbols_3 <- c('7', 'BBB', 'BBB')

<br>

Two tools that can help us make this test easier are the `all()`
function and the `%in%` operator.

<br>

    bars <- all(symbols_1 %in% c('B','BB','BBB'))
    bars

    ## [1] TRUE

    bars <- all(symbols_2 %in% c('B','BB','BBB'))
    bars

    ## [1] FALSE

    bars <- all(symbols_3 %in% c('B', 'BB', 'BBB'))
    bars

    ## [1] FALSE

<br>

In English, this code tests if all elements of symbol can be found in
the vector containing `B`, `BB`, and `BBB`. Let's generalize this code
for the function.

<br>

    bars <- all(symbols %in% c('B','BB','BBB'))

<br>

### Task 4. Assign Prize for Bars

This is the easiest task in the entire function. If the function passes
the prescribed "bar" test, the gambler wins $5. We've already created
the bar test, so all we must do is award the prize.

<br>

    prize <- 5 

<br>

### Task 5. Test if Cherries are Present

This task is also quite easy. First, we need to determine if there are
cherries present in the three symbols. Then we need to determine how
many cherries there are. That's it!

We’ll change the test parameters to fit this task again.

<br>

    symbols_1 <- c('C', 'C', '7')
    symbols_2 <- c('0', '0', 'C')
    symbols_3 <- c('0', '0', '0')

<br>

Now we can use the `sum` function to add up how many of the elements in
symbol are cherries.

<br>

    cherries <- sum(symbols_1 == 'C')
    cherries

    ## [1] 2

    cherries <- sum(symbols_2 == 'C')
    cherries

    ## [1] 1

    cherries <- sum(symbols_3 == 'C')
    cherries

    ## [1] 0

<br>

Here's a generalized version of this.

<br>

    cherries <- sum(symbols == 'C')
    cherries

<br>

### Task 6. Cherries Payout

It's time for another look-up table! Remember that 0 cherries require no
payout, 1 cherry earns a $2 payout, and two cherries earns a $5 payout.

Because of R's indexing rules, we should add 1 to the cherry sum to
access the proper payout (R starts at index 1, while the cherry count
starts at 0).

<br>

    cherries_0 <- 0
    cherries_1 <- 1
    cherries_2 <- 2

    cherries_pay <- c(0, 2, 5)

    cherries_pay[[cherries_0 + 1]]

    ## [1] 0

    cherries_pay[[cherries_1 + 1]]

    ## [1] 2

    cherries_pay[[cherries_2 + 1]]

    ## [1] 5

<br>

Great! Implementing a lookup table gets easier every time you do it. The
generalized version of this task looks as follows.

<br>

    cherries_pay <- c(0, 2, 5)

    prize <- cherries_pay[[cherries + 1]]

<br>

### Task 7. Diamond Count

Just like the cherry count, we're going to sum how many diamonds are
present in symbols.

<br>

    diamonds <- sum(symbols == 'DD')
    diamonds

<br>

### Task 8. Diamonds Multiplier

If there is one diamond, we should multiply the prize that has already
been determined by 2. If there are two diamonds, we should multiply it
again by two. And for three, we do the same thing. A clever way of
writing this is 2^diamond. Here's what the code looks like in action.

<br>

    diamonds_0 <- 0 
    diamonds_1 <- 1 
    diamonds_2 <- 2

    prize <- 100 

    prize * 2 ^ diamonds_0

    ## [1] 100

    prize * 2 ^ diamonds_1

    ## [1] 200

    prize * 2 ^ diamonds_2

    ## [1] 400

<br>

And the generalized version.

<br>

    prize <- prize * 2 ^ diamonds

<br>

#### Creating the Score Function

Now that we've done the hard work, we can simply insert the generalized
bits of code into the bare-bones program we previously described in
pseudo-code. Translate that pseudo-code structure to R syntax, and we
should have a complex function up and running in no time!

<br>

    #### Create Function 
    score <- function(symbols) {

    ### Definitions 

    #  define default prize 
    prize <- 0 

    #  define same 
    same <- length(unique(symbols)) == 1
    #  define same prize
    same_table <- c('DD' = 100,'7' = 80, 'BBB' = 40, 'BB' = 25, 'B' = 10, 'C' = 10, '0' = 0)
    same_prize <- same_table[[symbols[[1]]]]

    #  define bars
    bars <- all(symbols %in% c('B','BB','BBB'))
    #  define bar scores
    bars_prize <- 5 

    #  define cherries
    cherries <- sum(symbols == 'C')
    #  define cherries scores
    cherries_table <- c(0, 2, 5)
    cherries_prize <- cherries_table[[cherries + 1]]

    #  define diamonds
    diamonds <- sum(symbols =="DD")
    #  define diamonds scores
    diamonds_prize <- same_prize * 2 ^ diamonds
    diamonds_prize <- diamonds_prize + cherries_prize * 2 ^ diamonds


    ### If / Then 

    #  if same, same prize
    if (same) {
      prize <- same_prize
    # if bars, bars prize
    } else if (bars) {
      prize <- bars_prize
    # if cherries, cherries prize
    } else if (cherries > 0) {
      prize <- cherries_prize
    # if diamonds, diamonds multiplier
    }

    if (diamonds > 0) {
      prize <- diamonds_prize
    }


    ### Display Prize
    prize 

    ### End Function
    }

<br>

Let's test the function to make sure it works.

<br>

    symbols <- c('7', '7', '7')
    score(symbols)

    ## [1] 80

    symbols <- c('B', 'BBB', 'B')
    score(symbols)

    ## [1] 5

    symbols <- c('C', 'B', 'B')
    score(symbols)

    ## [1] 2

    symbols <- c('DD', 'DD', 'DD')
    score(symbols)

    ## [1] 800

    symbols <- c('0', '0', '0')
    score(symbols)

    ## [1] 0

<br>

Part two complete! Now to combine the `get_symbols()` function with the
`score()` function, and format the results!

<br>

### Part III - Format Results

Now that we've done all the hard work, we can put it together and make
it beautiful!

<br>

    play <- function() {
      symbols <- get_symbols()
      print(symbols)
      score(symbols)
    }

<br>

Like always, we should test the function before moving forward.

<br>

    play()

    ## [1] "BB" "B"  "B"

    ## [1] 5

<br>

Well it’s together, but the output isn’t beautiful! One. More. Step!

Create a function called `slot_display` that takes the output of
`play()` and does the following.

<br>

    slot_display <- function(prize){
      
    # extra symbol 
    symbols <- attr(prize, "symbols")

    # collapse symbols into single string 
    symbols <- paste(symbols, collapse = " ")

    # combine symbols with prize as a regex
    string <- paste(symbols, prize, sep = '\n$')

    #display regex in consol without quotes
    cat(string)

    }

<br>

Does slot display works?

<br>

    slot_display(play())

    ## [1] "BB" "B"  "B" 
    ## 
    ## $5

<br>

We're getting closer! Now to encode the `slot_display()` function into
`print()`. Print is what's called a generic function. That means it can
interact with different objects in different ways.

To define how it interacts with objects that have the attribute `slots`,
we do the following.

<br>

    print.slots <- function(x, ...) {
      slot_display(x)
    }

<br>

For print to recognize that an object is of attribute `slots` and print
it properly, we should assign that attribute to the play function.

<br>

    play <- function() {
      symbols <- get_symbols()
      structure(score(symbols), symbols = symbols, class= 'slots')
    }

    class(play())

    ## [1] "slots"

<br>

Now for the big reveal, the complete, fully formatted, function!

<br>

    play()

    ## 0 B DD
    ## $0

<br>

Aaaand didn't win a dime. Oh well.

<br>

Conclusions
-----------

If you've made it through this blog post, I'm positive you would find
the
[book](https://www.amazon.com/Hands-Programming-Write-Functions-Simulations/dp/1449359019/ref=pd_lpo_sbs_14_t_2?_encoding=UTF8&psc=1&refRID=RQ3DSSGC8VHX626WSG6X)
ten times more informative. Garrett Goes much deeper into S3 attributes
and dives into simulations, vectorized code, and much more.

His book is easy to read and will teach you quite a lot. Check it out
sometime.

I'll be switching gears to Python programming soon. I've picked up a few
books on the fundamentals of Python, and I'm excited to get working on
them as my semester progresses. check out my most recent [Data Science
Update](%7B%7B%20site.baseurl%20%7D%7D/ds-update-3) for more information
on that.

<br>

Until next time, <br>

- Fisher
