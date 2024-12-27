---
layout: post
title: "Casino Games - Dice"
categories:
  - Blog Posts
top_tags: R
exc: "A short project to explore the game of craps through vizualizations of relative frequency, and change. The project culminates to creating a function to plot the relative frequency of the sum of any number of dice for any number of rolls."
tags:
- probability
- simulation
- visualization
- project
---

<br>

### Introduction

I'm finishing up the fourth week of my master's in statistics program at Oklahoma State University. I've already learned so much about hypothesis testing, SAS (yuck), probability, and R. 

My probability course is very theoretical, but often we refer to real world examples using dice, decks of cards, and other games. 

I'm constantly looking for ways to expand my knowledge of R, so I decided to take ideas surrounding probability and dice and illustrate them in R with a blog post. 

So without further ado, let's load up the trusty tidyverse and get rolling!

<br>

### Libraries

    library('tidyverse')

<br>

### Rolling a Single Die

Starting off in the simplest way - I want to simulate the roll of a die using R. The base function `sample` was built for such a task. `sample` generates a random number or series of numbers within a bound you set, replacing the numbers at your discretion. If you want each roll of the die to be independent, simply set the replace argument to true. 


    sample(1:6,1)

    ## [1] 4

Looks like we rolled a 4! Notice how you don't need to use the replace argument if your only sampling a single number with each use of the function. 

<br> 

### Relative Frequency with a Die

Relative frequency is the fraction of outcomes in which an event occurs. The relative frequency might be equal to the probability of an event, but it might not. 

You would expect a die to roll each of the six possible numbers 1/6 of the time. That's the probability of each event in the sample space. 

The relative frequency is the number of times a die rolls a certain number, or event. 

Let's see the relative frequency of 50 independent rolls of a single die and see how close they are to the expected probability of 1/6. 


    # use the sample function to simulate 50 independent rolls of a die
    single_die_1 <- sample(1:6, 50, replace=T)

    # order the values into a dataframe named sd_1_freq
    sd_1_freq <- data_frame(num = 1:6, roll = table(single_die_1)/50)

    # plot the frequency data
    ggplot(sd_1_freq) + 
      geom_bar(aes(num,roll),
               stat = "identity",
               color = "darkslateblue",
               fill = "darkslateblue") + 
      geom_hline(yintercept = (1/6),
                 col = "firebrick",
                 size = 1
                 ) + 
      scale_x_continuous(name = "Result",
                         breaks = sd_1_freq$num, 
                         labels = sd_1_freq$num) + 
      ylab("Relative Frequency") + 
      ggtitle("50 Roll Relative Frequency") + 
      theme_minimal()

![]({{ site.baseurl}}/images/roll_em/roll_em_1.png)

The red bar denotes the expected 1/6 or 0.166 probability of each event. Some of our relative frequency results are close to their expected probability, but most are not. 

Relative frequency approaches the probability as the sample size increases. 

To illustrate that this is true, let's increase the sample size from 50 rolls to 50,000 rolls. 


    # use the sample function to simulate 50,000 independent rolls of a die
    single_die_2 <- sample(1:6, 50000, replace=T)

    # order the values into a dataframe named sd_1_freq
    sd_2_freq <- data_frame(num = 1:6, roll = table(single_die_2)/50000)

    # plot the frequency data
    ggplot(sd_2_freq) + 
      geom_bar(aes(num,roll), 
               stat="identity",
               color = "darkslateblue",
               fill = "darkslateblue"
               ) + 
      geom_hline(
        yintercept = (1/6),
        col = "firebrick",
        size = 1
        ) + 
      scale_x_continuous(name = "Result",
                         breaks = sd_2_freq$num, 
                         labels = sd_2_freq$num
                         ) + 
      ylab("Relative Frequency") + 
      ggtitle("50,000 Roll Relative Frequency") + 
      theme_minimal()

![]({{ site.baseurl}}/images/roll_em/roll_em_2.png)

After 50,000 rolls, the relative frequency is almost exactly the expected probability. We could continue move the relative frequency closer and closer to the probability value by increasing the sample size even more. But I'll call this one 

<br>

### Summing Two Dice

Have you ever played the casino game Craps? In Craps, you roll two dice and sum them to determine if you've automatically won (7 or 11), lost (2, 3, or 12) or if you need to roll again.

So let's start by rolling two dice.

    sum(sample(1:6,1), sample(1:6,1))

    ## [1] 6


That was easy! Now let's do it 10,000 times and plot the relative frequency of each result! Because our sample size will be so high (10,000), the relative frequencies should be negligibly close to the probabilities of each outcome.

    # create empty dataframe of 10,000 values
    roll_vector <- vector("double", 10000)

    # for each element in roll_vector
    for (i in seq_along(roll_vector)) {
    # the element equals the sum of two dice
      roll_vector[i] = sum(sample(1:6,1), sample(1:6,1))
    }

    # turn the resulting vector into a dataframe to plot
    roll_df <- as_data_frame(table(roll_vector)/10000)
    # name the variables roll, and freq
    colnames(roll_df) <- c("roll", "freq")
    # turn the table-created roll variable into a numeric
    roll_df$roll <- as.numeric(roll_df$roll)

    # plot the relative frequencies 
    ggplot(roll_df) + 
      geom_bar(aes(roll, freq),
               stat = "identity",
               color = "mediumpurple4",
               fill = "mediumpurple4"
               ) + 
      scale_x_continuous(name = "Sum of Dice",
                         breaks = roll_df$roll, 
                         labels = roll_df$roll
                         ) + 
      ylab("Relative Frequency") + 
      ggtitle("10,000 Two-Dice Roll Relative Frequency") + 
      theme_minimal()

![]({{ site.baseurl}}/images/roll_em/roll_em_3.png)

<br>

### Generalizing with a Function

So we've recorded the relative frequency of one and two-die rolls, can we do it for a 100 die roll? How about a 10,000 Die roll? and What if I
want to roll the die 67 times instead of 50, or 670,000 times instead of 50,000 times?

To efficiently create plots for any input, we need to create a function. I'll call the function `roll_em`!

    # Create the function "roll_em" to sum any number of dice for any number of rolls and produce a relative frequency plot as the output. 

    # naming the function
    roll_em <- function(n_dice, n_roll) {

    # check for input errors, both inputs must be non-zero integers  
      if (n_dice == 0 | is.na(n_dice) | n_dice %% 1 != 0) {
          stop("Enter a non-zero integer for the number of dice to roll")
      } 
        else if (n_roll == 0 | is.na(n_roll) | n_roll %% 1 != 0) {
          stop("Enter a non-zero integer for the number of rolls to perform")
      } 
        else {

    # if no errors are detected, move on to the body of the function
       
    # declare a counter, i, and set it to zero
      i <- 0  
      
    # create roll vector of user-specified length
      roll_vector <- vector("double", n_roll)


    # while the counter doesn't equal the user-specified length of roll_vector, loop through the following commands
      while (i <= length(roll_vector)) {
        
    # create a new dice_vector of user-specified length
        dice_vector <- vector("double", n_dice)

    # for each element j in dice vector, roll a single die and record the value
        for (j in seq_along(dice_vector)) {
          dice_vector[j] = sample(1:6,1)
        }
        
    # sum the values in the dice vector and put that value into the current roll_vector element
        roll_vector[i] <- sum(dice_vector)

    # add one iteration to the roll_vector counter
        i <- i + 1

    # repeat the sequence
      }
      

    # once all elements of the roll_vector are filled, create a roll dataframe
      roll_df <- as_data_frame(table(roll_vector)/n_roll)
      
    # name the columns, or variables, roll and freq (frequency)
      colnames(roll_df) <- c("roll", "freq")

    # ensure the roll numbers are numerics, instead of characters (default in table)
      roll_df$roll <- as.numeric(roll_df$roll)
      
    # plot the output
      ggplot(roll_df) + 
        geom_bar(aes(roll, freq),
               stat="identity", 
               color = "midnightblue",
               fill = "midnightblue"
               ) + 
      scale_x_continuous(name = "Sum of Dice",
                         breaks = roll_df$roll, 
                         labels = roll_df$roll
                         ) + 
      ylab("Relative Frequency") + 
      ggtitle("Roll 'EM! Results") + 
      theme_minimal()
      
    # conclude else statement function
        }
      
    # conclude roll_em function
    }


Now that we've made `roll_em`, let's check to see if it works!

<br>

### Testing Roll 'EM!

A generic entry:

    roll_em(5,200)

![]({{ site.baseurl}}/images/roll_em/roll_em_4.png)

<br>

An entry designed to give an error:

    roll_em(0,1)

    ## Error in roll_em(0, 1): Enter a non-zero integer for the number of dice to roll

<br>

Another error entry:

    roll_em(2,500.1)

    ## Error in roll_em(2, 500.1): Enter a non-zero integer for the number of rolls to perform

<br>

An obscure entry:

    roll_em(502,7)

![]({{ site.baseurl}}/images/roll_em/roll_em_5.png)

<br>

A large number of rolls:

    roll_em(5, 91572)

![]({{ site.baseurl}}/images/roll_em/roll_em_6.png)

<br>

Looks like `roll_em` works as we expect it to! It's tempting to put enormous inputs, 1 billion rolls of 100 billion dice, but you'll probably crash R doing it. 

What a fun little project to practice making functions and better visualize relative frequencies. 

I'm starting to work through [Hands-On Programming with R](https://d1b10bmlvqabco.cloudfront.net/attach/ighbo26t3ua52t/igp9099yy4v10/igz7vp4w5su9/OReilly_HandsOn_Programming_with_R_2014.pdf) in my free time and it looks like there are a few more casino examples coming my way. So, look forward to a blog post about playing cards and one about slot machines in the near future!

<br>

Until next time, <br>

\- Fisher



