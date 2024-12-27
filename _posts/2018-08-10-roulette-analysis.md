---
layout: post
title: "Casino Games - Roulette"
categories:
  - Blog Posts
top_tags: R
exc: "A short study to evaluate three roulette strategies over a
period to practice using for-loop and if-then statements in R."
tags:
- probability
- simulation
- visualization
- project
---

<br>

### Introduction

Recently, I re-watched the classic 1971 western *Support your Local
Gunfighter*. Throughout the movie, a signature bet of 23-black is placed
on a game of roulette. While the cast of played out gun fights and
roulette spins, I began to devise this simple roulette analysis in R.

Roulette is a simple game of chance; a ball is dropped onto a wheel with
38 slots for it to land. The slots are numbered 0 to 36, with a 00
thrown in to further the odds in the casino's favor. The 0 and 00 slots
are green, while the 36 numbered slots are split evenly between black
and red. For more information on how roulette is played, check out [this
video](https://www.youtube.com/watch?v=BMtFBOk2ehs).

I've created a short study to evaluate three roulette strategies over a
period to practice using for-loop and if-then statements in R. In this
simulation, Gambler A always bets $10 on black, which has a 47.37%
chance of winning. Gambler B always bets $10 on the third dozen numbers,
which has a 32.43% chance of winning. Gambler C, Latigo, always bets $10
on 23 black, which has a 2.7% change of winning.

By creating a sample of 10,000 roulette spins and running a simulation
with these three gambling strategies, I will evaluate how each gambler
performs at defined intervals. The number of wins and total earnings of
each gambler, how these trends change over time, and the occurrences and
duration of *dry streaks* are all of interest in this simulation.

I'll finish up the post by creating a simple roulette function in R that
will satisfy all your gambling desires. But I'll be willing to bet that
those desires will be long gone after we evaluate the long-term earnings
associated with playing roulette.

<br> <br>

### Libraries

The only library needed to complete this study is the tidyverse set of
packages.

    library('tidyverse')

<br> <br>

### Simulation

I've created a script to simulate 10,000 roulette spins as a separate
file. The files have been separated like this because I want to work
with a single, consistent simulation. The script loads the tidyverse
library, then creates a data structure saving 10,000 elements containing
a randomly chosen number between -1 and 36. In this simulation, -1 acts
as 00. Each of these elements are individually generated, and are not
affected by the preceding sample. The data structure is saved as a .csv
file and loaded into this study.

    # A copy of the roulette.csv file
    library('tidyverse')

    roulette <- as_tibble(sample(-1:36, 10000, replace=T))
    write_csv(roulette, "roulette.csv")

<br> <br>

    # loading roulette.csv
    roulette <- read_csv("roulette.csv")
    roulette <- as.integer(roulette$value)

<br> <br>

Before analyzing the three gambling styles, we must define them. Gambler
A always bets on black, Gambler B always bets the third dozen numbers,
and Gambler C always bets on his lucky number 23.

    # The Gamblers Bets
    black <- c(2, 4, 7, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35)
    third_dozen <- c(25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36)
    lucky_23 <- 23

<br> <br>

The next step is to create a series of data structures to record how
each gambling strategy performs throughout the simulation. A vector to
record cash is created for each of the three strategies. Cash records
the cumulative earnings (or losings) for each of the 10,000 spins. At
the end of every spin, a singular variable, *total cash* is saved for
each of the three gamblers. Total cash is copied to an element of the
cash vector, thus saving its value for each of the 10,000 spins.

A similiar process is used for keeping track of each gamblers wins. A
wins vector is created continuously record the number of wins throughout
the simulation. A single variable, total wins, is updated and copied to
an element of the wins vector for each spin.

This system is repeated three times to keep track of all three gamblers
running winnings, cumulative winnings, running earnings, and cumulative
earnings.

    # Initialize gambler A
    ga_earn <- vector("double", length(roulette))
    ga_total_earn <- 0 
    ga_wins <- vector("double", length(roulette))
    ga_total_wins <- 0 

    # Initialize gambler B
    gb_earn <- vector("double", length(roulette))
    gb_total_earn <- 0 
    gb_wins <- vector("double", length(roulette))
    gb_total_wins <- 0 

    # Initialize gambler C
    gc_earn <- vector("double", length(roulette))
    gc_total_earn <- 0 
    gc_wins <- vector("double", length(roulette))
    gc_total_wins <- 0 

<br> <br>

Now we can analyze the roulette spins. For each element in the sequence
of 10,000 spins saved in the variable `roulette`, the following occurs.
Ten dollars is taken from each of the gamblers total winnings as their
bets. The new total winnings amount is saved over the old winnings. If
the number inside of the roulette element falls within the previously
defined `black` bet, Gambler A wins. When gambler A wins, Gambler A's
total cash is increased by $20 and their total wins are increased by 1.
Gamblers B and C go through similar if - then statements, each receiving
winnings according to the payout of their specific bets.

After all the gamblers bets have been analyzed, the new total earnings
and wins are saved into an empty element in the running cash and wins
matrices. The running wins and earnings matrices are the key to
exploring each of the gambling strategies in this simulation.

    for (i in seq_along(roulette)) {
    # All gamblers bet $10
      ga_total_earn = ga_total_earn - 10
      gb_total_earn = gb_total_earn - 10
      gc_total_earn = gc_total_earn - 10
    # If gambler A wins, +$20 and +1 win
      if (roulette[[i]] %in% black) {
        ga_total_earn = ga_total_earn + 20 
        ga_total_wins = ga_total_wins + 1 
      }
    # If gambler B wins, +$30 and +1 win
      if (roulette[[i]] %in% third_dozen) {
        gb_total_earn = gb_total_earn + 30 
        gb_total_wins = gb_total_wins + 1
      }
    # If gambler C wins, +$360 and +1 win
      if (roulette[[i]] == lucky_23) {
        gc_total_earn = gc_total_earn + 360
        gc_total_wins = gc_total_wins + 1
      }
    # End of round - save totals 
      ga_earn[[i]] <- ga_total_earn
      ga_wins[[i]] <- ga_total_wins
      gb_earn[[i]] <- gb_total_earn
      gb_wins[[i]] <- gb_total_wins
      gc_earn[[i]] <- gc_total_earn
      gc_wins[[i]] <- gc_total_wins
    }

<br> <br>

### Results

Before we jump into the wins and cash data structures, lets going to
quickly plot up the 10,000 roulette spins to see if we can spot any
unwanted patterns. The roulette spin results should all be random
numbers between -1 and 36, independent of each other.

    plot(roulette)

![]({{ site.baseurl}}/images/roulette/roulette_1.png)

The spread looks random, let's go ahead and sort the data into
magnitudes and name each variable.

    # Define each gambler as a variable 
    ga <- "Gambler A"
    gb <- "Gambler B"
    gc <- "Gambler C"

    # Break up the simulation into the defined magnitude intervals
    results <- tibble(spin_num = 1:10000, ga, ga_earn, ga_wins, gb, gb_earn, gb_wins, gc, gc_earn, gc_wins)
    results_100 <- head(results, n=100)
    results_1000 <- head(results, n=1000)

<br> <br>

### Earnings

We'll analyze the roulette strategies at three different magnitudes.
First, we'll take a look at trends within the first 100 spins,
`results_100`, then we'll look at the first 1000 spins, `results_1000`,
and finally all 10,000 spins, `results`.

Let's look at how many times each of the gamblers won their roulette bet
in the first 100 spins.

    ggplot(results_100) + 
      geom_point(aes(x = spin_num, y = ga_wins, color = ga), alpha = 0.8) + 
      geom_point(aes(x = spin_num, y = gb_wins, color = gb), alpha = 0.8) + 
      geom_point(aes(x = spin_num, y  = gc_wins, color = gc), alpha = 0.8) + 
      theme_minimal() +
      theme(legend.title=element_blank()) + 
      scale_colour_manual(values = c("black", "#E0080B", "#016D29")) + 
        labs(title = "100 Spin Results - Wins", 
           y = "Number of Wins",
           x = "Number of Spins"
           )

![]({{ site.baseurl}}/images/roulette/roulette_2.png)

<br> <br>

If it isn't clear by the graph, here's the each of the gambler's running
totals at spin 100.

    ga_wins[100]

    ## [1] 48

    gb_wins[100]

    ## [1] 45

    gc_wins[100]

    ## [1] 3

<br>

It turns out that 100 spins are a large enough sample size to accurately
reflect the probability of each gambler's bets. Gambler A's probability
of winning is ~47%, Gambler B's is ~32%, and Gambler C's is ~3%. Now
let's have a look at each of the gamblers earnings in the first 100
roulette games.

    ggplot(results_100) + 
      geom_point(aes(x = spin_num, y = ga_earn, color = ga), alpha = 0.8) + 
      geom_point(aes(x = spin_num, y = gb_earn, color = gb), alpha = 0.8) + 
      geom_point(aes(x = spin_num, y = gc_earn, color = gc), alpha = 0.8) + 
      theme_minimal() +
      theme(legend.title=element_blank()) + 
      scale_colour_manual(values = c("black", "#E0080B", "#016D29")) + 
        labs(title = "100 Spin Results - Earnings", 
           y = "Earnings ($)",
           x = "Number of Spins"
           )

![]({{ site.baseurl}}/images/roulette/roulette_3.png)

No gambler earns money by the end of the first 100 simulated spins.
Gambler C is the most interesting to observe because of the massive
payout upon each win. Briefly, around spin 28, Gambler C reaches a
maximum at $50. Increasing the sample size by a magnitude may tell us a
different story.

<br>

    ggplot(results_1000) + 
      geom_point(aes(x = spin_num, y = ga_earn, color = ga), alpha = 0.8) + 
      geom_point(aes(x = spin_num, y = gb_earn, color = gb), alpha = 0.8) + 
      geom_point(aes(x = spin_num, y  = gc_earn, color = gc), alpha = 0.8) + 
      theme_minimal() +
      theme(legend.title=element_blank()) + 
      scale_colour_manual(values = c("black", "#E0080B", "#016D29")) + 
        labs(title = "1000 Spin Results - Earnings", 
           y = "Earnings ($)",
           x = "Number of Spins"
           )

![]({{ site.baseurl}}/images/roulette/roulette_4.png)

Increasing the sample size by 900 tells us a very different story for
Gambler C. Their luck takes a turn for the better, ending the 1000 spin
simulation at over $1000 in earnings. Gambler A and Gambler B keep to
much the same earnings path, steadily losing money. Let's try another
magnitude.

<br>

    ggplot(results) + 
      geom_point(aes(x = spin_num, y = ga_earn, color = ga), alpha = 0.8) + 
      geom_point(aes(x = spin_num, y = gb_earn, color = gb), alpha = 0.8) + 
      geom_point(aes(x = spin_num, y  = gc_earn, color = gc), alpha = 0.8) + 
      theme_minimal() +
      theme(legend.title=element_blank()) + 
      scale_colour_manual(values = c("black", "#E0080B", "#016D29")) + 
        labs(title = "10,000 Spin Results - Earnings", 
           y = "Earnings ($)",
           x = "Number of Spins"
           )

![]({{ site.baseurl}}/images/roulette/roulette_5.png)

Increasing the sample size to 10,000 spins tells us a completely
different story for Gambler C. His luck doesn't hold out, and total
earnings plummet lower than both Gambler A and Gambler B. The other two
gamblers continue to experience a slow and steady decline in total
earnings.

<br> <br>

### Wins

The number of wins each gambler experiences in 10,000 games is
predictable.

    ggplot(results) + 
      geom_point(aes(x = spin_num, y = ga_wins, color = ga), alpha = 0.8) + 
      geom_point(aes(x = spin_num, y = gb_wins, color = gb), alpha = 0.8) + 
      geom_point(aes(x = spin_num, y  = gc_wins, color = gc), alpha = 0.8) + 
      theme_minimal() +
      theme(legend.title=element_blank()) + 
      scale_colour_manual(values = c("black", "#E0080B", "#016D29")) + 
        labs(title = "10,000 Spin Results - Wins", 
           y = "Number of Wins",
           x = "Number of Spins"
           )

![]({{ site.baseurl}}/images/roulette/roulette_6.png)

<br>

After 10,000 spins, each gambler's wins approach their bet's
probabilities.

<br>

Gambler A's actual probability of winning is 46.37%.

    ga_total_wins / 10000 * 100

    ## [1] 47.04

<br>

Gambler B's actual probability of winning is 31.58%.

    gb_total_wins / 10000 * 100

    ## [1] 31.22

<br>

Gamber C's actual probability o winning is 2.63%.

    gc_total_wins / 10000 * 100

    ## [1] 2.55

<br>

### Other Calculations

Let's do a few more simple calculations! If you average it out, how much
does each game of roulette cost our three gamblers?

    ga_total_earn / 10000

    ## [1] -0.592

    gb_total_earn / 10000

    ## [1] -0.634

    gc_total_earn / 10000

    ## [1] -0.82

It turns out, that it costs our gamblers anywhere from $0.59 to $0.82 to
play a single $10 game of roulette!

<br>

We know the final earnings for each of the gamblers in a 10,000-spin
simulation, but how low did their earnings drop? How high did they
reach? Did any single gambler have a good opportunity to quit while they
were ahead?

<br>

    max(ga_earn)

    ## [1] 10

    min(ga_earn)

    ## [1] -5950

<br>

    max(gb_earn)

    ## [1] 360

    min(gb_earn)

    ## [1] -6570

<br>

    max(gc_earn)

    ## [1] 1790

    min(gc_earn)

    ## [1] -10220

<br> As we saw before, Gambler C had a good opportunity to come out
ahead, at $1790 in earnings. The same gambler also ended the
10,000-round analysis with over $10,000 in losses. A and B never really
reached a high point in earnings, maxing at $10 and $360 respectively.
For all three gamblers, their universal minima came at the end of the
10,000 rounds of roulette.

<br> <br>

### Dry Streaks

Finally, let's look at the dry streaks each of the three gambler's
experienced over 10,000 roulette games. A dry streak of "1" is defined
as losing a single game between two winning games.

This is why it was important to save each win occurrence into a tibble,
rather than just keep a running tally of overall wins earlier in the
project.

    # create a lead dataframe based on the wins dataframe, game number 1 cannot be a dry streak game
    ga_wins_lead <- lead(ga_wins)
    gb_wins_lead <- lead(gb_wins)
    gc_wins_lead <- lead(gc_wins) 

    # fill in the 10,000 entry with a 0 to make up for the lead 
    ga_wins_binary <- ga_wins_lead - ga_wins
    ga_wins_binary[10000] = 0
    gb_wins_binary <- gb_wins_lead - gb_wins
    gb_wins_binary[10000] = 0 
    gc_wins_binary <- gc_wins_lead - gc_wins
    gc_wins_binary[10000] = 0

    # create an empty dry_count dataframe the same size as the wins binary dataframe
    dry_count_a <- 0 
    dry_count_save_a  <- vector("double", length(ga_wins_binary))
    dry_count_b <- 0
    dry_count_save_b  <- vector("double", length(gb_wins_binary))
    dry_count_c <- 0
    dry_count_save_c  <- vector("double", length(gc_wins_binary))

    # fill in the wins binary dataframe with 0 or 1 depending on wins
    for (i in seq_along(ga_wins_binary)) {
      if (ga_wins_binary[[i]] == FALSE) {
        dry_count_a = dry_count_a + 1
      }
      if (ga_wins_binary[[i]] == TRUE) {
        dry_count_save_a[[i]] = dry_count_a
        dry_count_a = 0
      }
    }

    # display results for gambler A
    dry_tibble_a <- tibble("dry_streak" = dry_count_save_a)

    dry_tibble_a <- dry_tibble_a %>%
      filter(dry_streak != 0)

    ggplot(dry_tibble_a) + 
      geom_bar(aes(dry_streak)) + 
      theme_bw() + 
      labs(title = "Gambler A's Dry Streaks", 
        y = "Number of Occurances",
        x = "Length of Dry Streak"
        )

![]({{ site.baseurl}}/images/roulette/roulette_7.png)

An excellent skew right distribution shows us that in fact a dry streak
lasting a single game is by far the most likely outcome (surprise,
surprise). Gambler A never experiences a dry streak lasting longer than
14 games.

<br> <br>

    for (i in seq_along(gb_wins_binary)) {
      if (gb_wins_binary[[i]] == FALSE) {
        dry_count_b = dry_count_b + 1
      }
      if (gb_wins_binary[[i]] == TRUE) {
        dry_count_save_b[[i]] = dry_count_b
        dry_count_b = 0
      } 
    }

    dry_tibble_b <- tibble("dry_streak" = dry_count_save_b)
    dry_tibble_b <- dry_tibble_b %>%
      filter(dry_streak != 0)

    ggplot(dry_tibble_b) + 
      geom_bar(aes(dry_streak)) + 
      theme_bw() + 
      labs(title = "Gambler B's Dry Streaks", 
        y = "Number of Occurances",
        x = "Length of Dry Streak"
        )

![]({{ site.baseurl}}/images/roulette/roulette_8.png)

In another beautiful skew right distribution, Gambler B has experienced
over 600 single-game dry streaks. The length of potential dry streaks
extends all the way to 27 games! That's awful luck considering Gambler B
has a ~32% chance of winning. In fact, the odds of gambler B having a 27
game dry streak is `0.6 ^ 27` or 0.0001%.

<br> <br>

    for (i in seq_along(gc_wins_binary)) {
      if (gc_wins_binary[[i]] == FALSE) {
        dry_count_c = dry_count_c + 1
      }
      if (gc_wins_binary[[i]] == TRUE) {
        dry_count_save_c[[i]] = dry_count_c
        dry_count_c = 0
      } 
    }


    dry_tibble_c <- tibble("dry_streak" = dry_count_save_c)
    dry_tibble_c <- dry_tibble_c %>%
      filter(dry_streak != 0)

    ggplot(dry_tibble_c) + 
      geom_bar(aes(dry_streak)) + 
      theme_bw() + 
      labs(title = "Gambler C's Dry Streaks", 
        y = "Number of Occurances",
        x = "Length of Dry Streak"
        )

![]({{ site.baseurl}}/images/roulette/roulette_9.png)

As always, Gambler C gives us a more interesting result. The most common
dry streak lasts two games, not one. The graph is not a simple skew
right, but still holds to that general pattern. Gambler C experienced a
dry streak of over 250 games, bummer.

<br> <br>

### Summary

In conclusion, you probably shouldn't be playing roulette if you're
looking to earn money. If you're not interested in winning, and you're
just playing for fun, know that each $10 game will cost you anywhere
from $0.59 to $0.82 on average.

Don't expect 2:1 payout bets to ever put you ahead for more than a game
or two, the odds are too consistent. 3:1 payouts tell a very similar.
Betting on a single number is daring, and as we saw in the simulation
can put you ahead. Single number bets also lead to the highest losses
over the life of the simulation.

Whatever you decide to do at the roulette table, remember to have fun!

As always, Thanks for reading! <br> - Fisher
