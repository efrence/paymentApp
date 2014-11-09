Payments demo app
========

# Technologies:

  * Custumized Twitter's Bootstrap css with Jeet grid system
  * Angularjs and jquery
  * Lato Font family
  * Toastr notifications
  * LocalstorageDB for storage
  * Bower

## Rationale:

Bootstrap 3 flat design is ok but then making the app responsive can be cumbersome, I replace bootstrap responsive grid with Jeet 2,
Jeet has as dependency Stylus or Sass, however I don't have any problem using css precompilers(I'm a big fan of them actually), what I like about Jeet is that comes with a set of mixins that allow you to have full control
of the layout and how elements are arrange for different target resolutions, also save you from a ton of bootstrap classes that just increment the markup size.
In order to make the app look different to standard bootstrap theme I decided to change some styles like the font and the background color for primary and 
success buttons. Related to the UX and cause the app was conceived as a Single Page Application, I arrived to the conclusion that I needed a framework, so
why do I chose angularjs?, merely because it is the one I have more experience with. I used bower to manage the dependancies. Finally added localstorageDB to the 
project because has some useful functions on top of localstorage that make it handy.


