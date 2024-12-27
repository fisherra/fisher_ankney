---
layout: post
title: "Custom Fonts and Text in R"
categories:
  - Blog Posts
top_tags: General
tags:
- Data Toolbox
---

<hr>

While R gives you absolute control over your graphics, you’ll quickly
find that it’s not that great with fonts and customized text. The
extrafont package isn’t exactly straight forward to use, so let’s go
over it!

<br>

    library('ggplot2')

    ## Registered S3 methods overwritten by 'ggplot2':
    ##   method         from 
    ##   [.quosures     rlang
    ##   c.quosures     rlang
    ##   print.quosures rlang

    library('extrafont')

    ## Registering fonts with R

<br>

## Importing Fonts


The first time you use extrafont, you’ll have to run this sequence of
commands:

<br>

    font_import()
    loadfonts()

<br>

This imports all of the custom fonts you have saved to your local
machine so that they’re usable with R. If you want additional fonts,
you’ll have to load them onto your computer and then re-run the above
commands. To view all of the fonts that are now available for use, use
the fonts function.

<br>

    fonts()

    ##  [1] ".Keyboard"             "System Font"          
    ##  [3] ".SF NS Rounded"        "Andale Mono"          
    ##  [5] "Apple Braille"         "AppleMyungjo"         
    ##  [7] "Arial Black"           "Arial"                
    ##  [9] "Arial Narrow"          "Arial Rounded MT Bold"
    ## [11] "Arial Unicode MS"      "Bodoni Ornaments"     
    ## [13] "Bodoni 72 Smallcaps"   ""                     
    ## [15] "Brush Script MT"       "Comic Sans MS"        
    ## [17] "Courier New"           "DIN Alternate"        
    ## [19] "DIN Condensed"         "Georgia"              
    ## [21] "Impact"                "Khmer Sangam MN"      
    ## [23] "Lao Sangam MN"         "Luminari"             
    ## [25] "Microsoft Sans Serif"  "Tahoma"               
    ## [27] "Times New Roman"       "Trattatello"          
    ## [29] "Trebuchet MS"          "Verdana"              
    ## [31] "Webdings"              "Wingdings"            
    ## [33] "Wingdings 2"           "Wingdings 3"          
    ## [35] "Winter Calligraphy"

<br>

## Custom Font Examples

R defaults to the font thats marked "". But now we have a lot more
variety! Let’s check a few of them out. Here’s how you choose a custom
font with a base R plot.

<br>

    plot(rnorm(10), 1:10, main = 'This is the Impact font', family = 'Impact')

![]({{ site.baseurl}}/images/data_toolbox/custom_font_1.png)

<br>

And here’s how you choose a custom font in ggplot2.

<br>

    ggplot() + 
      geom_point(aes(rnorm(10), 1:10)) + 
      ggtitle('This is my favorite font') + 
      theme(text = element_text(size = 22, family = 'Winter Calligraphy'))

![]({{ site.baseurl}}/images/data_toolbox/custom_font_2.png)

<br>

## Annotations

Sometimes you need to add text that doesn’t neatly fit into R’s
pre-defined labels. You can annotate your ggplot2 graphic with custom
fonts as well! Note that the annotate function doesn’t just annotate
text, you can overlay circles, shapes, shading, and more.

<br>

    set.seed(1)

    ggplot() + 
      geom_point(aes(rnorm(10), 1:10)) + 
      annotate('text', x = -0.25, y = 3, label = 'This is the (il)Luminari', family = 'Luminari', size = 14)

![]({{ site.baseurl}}/images/data_toolbox/custom_font_3.png)

<br>

## Mathematical Formulas

As a student of statistics, I often need to plot probability
distributions. Here’s how to include the mathematical formulas that
produce them.

In base R:

<br>

    curve(dnorm, from=-3, to=3, main="Normal Distribution", family = 'Winter Calligraphy', cex.main = 2)
    text(x=0, y=0.1, cex=1.5, expression(italic(y == frac(1, sqrt(2 * pi)) *
                                         e ^ {-frac(x^2, 2)} )), family = 'Brush Script MT')



![]({{ site.baseurl}}/images/data_toolbox/custom_font_4.png)


<br>

With ggplot2:

    ggplot(data.frame(x=c(-3,3)), aes(x=x)) + ggtitle("The Normal Distribution") +
      stat_function(fun=dnorm, geom="line") +
      theme_bw() +
      theme(text=element_text(family="Comic Sans MS"),
            plot.title = element_text(size = 28, face = "bold")) + 
      annotate("text", x=0, y=.1, label="italic(y == frac(1, sqrt(2 * pi)) * e ^ {-frac(x^2, 2)} )",
               parse=TRUE, family="Comic Sans MS",)

![]({{ site.baseurl}}/images/data_toolbox/custom_font_5.png)

<br>

## Embedding Fonts in Export

If you’re looking to export your new, beautiful custom-font graphic as a
pdf, you’ll have to embed the font with the file for it to work! Kind of
stupid, right?

Anyways, here are the simple steps to make sure your pdf looks just as
it should when someone else opens it on a different computer. You save
the graphic using your favorite method, then you run the `embed_fonts`
function.

<br>

    ggsave('my_file.pdf', favorite_plot, width = 5, height = 4)
    embed_fonts('my_file.pdf', outfile = 'my_file_embedded.pdf')

<br>

That’s all for now! Thanks for reading.

\- Fisher

<br>
<br>
