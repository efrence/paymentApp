Payments demo app
========

# Technologies:

  * Bootstrap css with Jeet grid system
  * Angularjs and jquery
  * Lato Font family
  * Toastr notifications
  * LocalstorageDB for storage
  * Bower

## Rationale:

Bootstrap 3 flat design is ok but then making the app responsive can be cumbersome, I replace bootstrap responsive grid with Jeet 2,
Jeet has as dependency Stylus or Sass(I chose stylus), what I like about Jeet is that comes with a set of mixins that allow you to have full control
of the layout and how elements are arrange for different resolutions, also save you from a ton of bootstrap classes that just increment the markup size.
In order to make the app look different to standard bootstrap theme I decided to change some styles like the font and the background color for primary and 
success buttons. Beyond the UI, due to the app required to some extend a degree of interactivity, I arrived to the conclusion that I needed a framework, so
I chose angularjs merely because it is the one I have more experience with. I use bower to manage some of the dependancies. I added localstorageDB to the 
project because has some useful functions on top of localstorage that make it handy.


