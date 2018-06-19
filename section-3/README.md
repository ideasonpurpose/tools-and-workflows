# Section 3. Stylesheets evolved: Sass & PostCSS

Sass, short for _Syntactically Awesome Style Sheets_, is a preprocessing language which compiles to CSS. That's a mouthful, but in practice, Sass just adds some really helpful features to CSS syntax which make writing stylesheets faster and more enjoyable.

One of the best things about Sass is how easy it is to get started. Sass just extends CSS, so _all CSS files are inherently valid Sass files._ Just change the file extension from `*.css` to `*.scss` and you're writing Sass.

Some key Sass features include:

- Variables
- Nesting
- Math
- Functions and Mixins
- Partials and included files
- Output Styles

There's more in the [Sass Guide][]. Because Sass is a pre-processing language, we need to compile the SCSS files into a CSS stylesheet. There's a gulp package to do that.

This section will also introduce a few other tools to make stylesheet authoring easier and development faster; PostCSS, Browsersync and Browserslist.

## Installing tools and new gulpfile tasks

All the packages required in this section are already saved in package.json. To install everything, just `cd` into this directory and run `npm install`:

```
$ cd section-3
$ npm install
```

A few new tasks have been added to the gulpfile from [Section 2][]: `sass` and `watch`. There's also a simple `html` task which copies `*.html` files from `src` to `dist`.

Calling `npm run build` now compresses images, copies html files _and_ compiles stylesheets.

## Sass Features

### Variables

Using Sass variables treat stylesheets more like code and reduce repetition. Storing frequently used values in one location makes revising and refactoring style rules much faster and substantially more reliable. No more need for global find-and-replace.

One common use-case is colors. Simply define a set of colors at the top of your Sass stylesheet (or in a Sass partial) and then reference the variable everywhere that color gets used. New color? Change one line.

The same goes for font stacks. The whole list of fallbacks can be hidden behind one clean and simple token.

```scss
$primary: #9a1b35;
$title-font: "Oswald", "Arial Narrow", Arial, sans-serif;

.button {
  border: 2px solid $primary;
  color: $primary;
}
.label {
  color: $primary;
  font-family: $title-font;
}
```

Compiles to this:

```css
.button {
  border: 2px solid #9a1b35;
  color: #9a1b35;
}

.label {
  color: #9a1b35;
  font-family: "Oswald", "Arial Narrow", Arial, sans-serif;
}
```

### Nesting

Sass allows us to nest rules to reflect document structure and element hierarchies. This nesting compiles logically as child selectors.

```scss
ul.custom {
  list-style: none;

  li {
    float: left;
    margin: 6px;
    padding: 0;
  }
}
```

Just like how `<li>` tags are children of `<ul>`, the `li` selectors are compiled as children of `ul.custom`.

```css
ul.custom {
  list-style: none;
}

ul.custom li {
  float: left;
  margin: 6px;
  padding: 0;
}
```

Sass introduces another helper for nesting rules. Ampersands are placeholders for the parent context. This means that nested rules can define direct-descendent selectors, sibling selectors and pseudo-classes using a very concise syntax.

```scss
.copy {
  p {
    & + blockquote {
      color: $primary;
    }
    &:first-child {
      font-size: 125%;
    }
  }
}
```

Compiles to this:

```css
.copy p + blockquote {
  color: blue;
}

.copy p:first-child {
  font-size: 150%;
}
```

### Math

Even though the CSS native [`calc()` function](https://caniuse.com/#feat=calc) is finally safe to use, stylesheets often require calculated values to make everything work. In the past, a comment might explain how some bizarre-looking numeric value was derived, but with Sass we can just write the equations directly into the source.

A common use is calculating box proportions. Instead of doing the math and leaving some ugly percentage, we can just use the box's ratio directly.

```scss
// .pic-frame should maintain an 8x5 ratio
.pic-frame {
  width: 100%;
  background: papayawhip;
  padding-bottom: 5 / 7 * 100%;
  padding-bottom: percentage(5/7); // this also works
}
```

Compiled:

```css
.pic-frame {
  width: 100%;
  background: papayawhip;
  padding-bottom: 71.42857%;
  padding-bottom: 71.42857%;
}
```

We can also use simple operators to maintain typographic rhythm.

```scss
$height: 4.25rem;
$font-size: 23/16 * 1rem;

.subtitle {
  font-size: $font-size;
  padding-top: $height - $font-size;
}
```

After compiling, the total height of the element is still `4.25rem`, but the equation is much easier to read.

```css
.subtitle {
  font-size: 1.4375rem;
  padding-top: 2.8125rem;
}
```

### Functions and Mixins

Sass includes many useful built-in functions, some favorites include:

- [percentage()](http://sass-lang.com/documentation/Sass/Script/Functions.html#mix-instance_method)<br>Convert a floating point value to a percentage, numeric equations work!
- [rgba()](http://sass-lang.com/documentation/Sass/Script/Functions.html#rgba-instance_method)<br>Helper function for generating `rgba()` values.
- [mix()](http://sass-lang.com/documentation/Sass/Script/Functions.html#mix-instance_method)<br>Percentage of the first color to mix onto the second.

```scss
.example {
  padding-top: percentage(9/16);
  color: rgba(teal, 1/3); // named colors and math!
  color: mix(tomato, bisque, percentage(5/8)); // nested functions!
}
```

Compiles to:

```css
.example {
  padding-top: 56.25%;
  color: rgba(0, 128, 128, 0.333333);
  color: #ff9376;
}
```

We can also define our own mixin functions. One common use is injecting the clearfix pseudo-element:

```scss
@mixin clearfix {
  &::after {
    content: "";
    display: table;
    clear: both;
  }
}

.container {
  @include clearfix;
  margin: 1rem auto;
}
.box {
  @include clearfix;
}
```

Pseudo-elements are automatically generated for every element the mixin is applied to:

```css
.container {
  margin: 1rem auto;
}

.container::after {
  content: "";
  display: table;
  clear: both;
}

.box::after {
  content: "";
  display: table;
  clear: both;
}
```

A slightly more complex mixin can make writing media breakpoints much easier. Here is a mobile-first breakpoint which can change specific properties alongside their initial definitions. Keeping media queries together with their base rules results in styles which are easier to reason about and less likely to be forgotten when making changes.

Because of how Sass handles nesting, we can easily inject media queries and breakpoint definitions where they make the most sense, making our styles easier to maintain later on.

```scss
// First, name and define our breakpoints
$breakpoints: (
  sm: 576px,
  md: 768px,
  lg: 992px
);

@mixin breakpoint-up($point) {
  $w: map-get($breakpoints, $point);

  @media only screen and (min-width: $w) {
    @content;
  }
}

.banner {
  color: crimson;
  font-size: 2rem;
  @include breakpoint-up(sm) {
    color: orchid;
  }
  @include breakpoint-up(md) {
    color: turquoise;
  }
  @include breakpoint-up(lg) {
    color: teal;
    font-size: 3rem;
  }
}
```

Compiled: (notice how the media queries bubbled up out of the rulesets)

```css
.banner {
  color: crimson;
  font-size: 2rem;
}

@media only screen and (min-width: 576px) {
  .banner {
    color: orchid;
  }
}

@media only screen and (min-width: 768px) {
  .banner {
    color: turquoise;
  }
}

@media only screen and (min-width: 992px) {
  .banner {
    color: teal;
    font-size: 3rem;
  }
}
```

Try it out on CodePen: [Simple Sass breakpoint mixin](https://codepen.io/joemaller/pen/XEOvBv)

We usually don't need to be concerned with the order of CSS output, or how many media queries there are. But for those times where it does matter, there's a popular PostCSS tool, [CSS MQPacker](https://github.com/hail2u/node-css-mqpacker), which can combine matching media queries.

### Including files

Sass will build the final stylesheet from any number of included partial files. This allows authors to modularize their SCSS files to match page components or any other organizational system.

Sass uses a naming convention where partials are [prepended with an underscore](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#partials):

> If you have a SCSS or Sass file that you want to import but don't want to compile to a CSS file, you can add an underscore to the beginning of the filename. This will tell Sass not to compile it to a normal CSS file. You can then import these files without using the underscore.

Native CSS imports will pass through transparently and are hoisted to the top of the output file. From there, we can use the PostCSS-import plugin to inline the file.

```scss
/* A standard Sass partial */
@import "partials/module";

/* A CSS native import which gets hoisted to the top of the output file */
@import "partials/legacy.css";
```

That compiles to the following.

```css
code.legacy {
  font-family: monaco, courier, "courier new", menlo, monospace;
  color: #0c7;
  background: #eef;
}

/* A standard Sass partial */
.module {
  color: dodgerblue;
}
/* A CSS native import which gets hoisted to the top of the output file */
```

Note the order of imports after `legacy.css` was hoisted to the top. The "module" file imported would be here: `src/sass/partials/_module.scss` and is referenced relative to the main Sass file. In the past, some Sass implementations have been capable of inlining CSS imports, but the syntax was confusing and the feature has been deprecated... with [much consternation][css imports].

### Output styles

Sass can generate stylesheets using several different [output styles][sass-output]: [`nested`](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#nested), [`expanded`](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#expanded), [`compact`](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#compact) and [`compressed`](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#compressed). Because we use PostCSS to minify for production, all our Sass files compile to `expanded` with [`line_comments`][sass-line-comments]. This also replaces source-maps, which were big, slow and rarely used.

<!-- prettier-ignore -->
```css
/* compressed */
.active{color:magenta}.off{color:#ff00ff}


/* compact */
.active { color: magenta; }

.off { color: #ff00ff; }


/* expanded */
.active {
  color: magenta;
}

.off {
  color: #aabbcc;
}
```

## PostCSS

[PostCSS](https://postcss.org/) is a tool for transforming CSS with it's own [ecosystem of plugins](https://www.postcss.parts/). Our css task compiles Sass, then pipes the result through PostCSS before writing the file. The PostCSS plugins we use are described below.

### Autoprefixer

[Autoprefixer][] applies vendor prefixes and compatibility oddities to our CSS. The tool determines which syntax to apply by querying the [Can I Use database][caniuse] of browser capabilities. With Autoprefixer, years of mental clutter and vendor-specific nonsense can be safely forgotten.

Here's an example: Running autoprefixer converts this simple CSS:

```css
.box {
  display: flex;
  transition: all 0.5s;
  background: linear-gradient(to bottom, white, black);
}
```

to this, highly-compatible mess:

```css
.box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(white),
    to(black)
  );
  background: linear-gradient(to bottom, white, black);
}
```

### postcss-import

As demonstrated above, this simple plugin inlines legacy CSS `@import` rules. Saves requests and lets us compress all our CSS in one pass.

### cssnano

For production, the last step of our CSS pipeline goes through [cssnano][]. This PostCSS plugin runs the compiled CSS file through a number of optimizations resulting in a very small, highly compressed file.

## Browsersync

[Browsersync][] is a fantastically useful tool which auto-reloads browsers and synchronizes front-end interactions across devices. It feels like magic.

Our gulpfile integrates Browsersync, but the tool can also be used as a standalone development server or injection proxy.

## Browserslist and Can I Use

The [Can I Use database][caniuse] tracks which features are available on various web platforms.

[Browserslist][] is a convention for defining which baseline target browsers should be supported. Other front-end tools like Autoprefixer will use this definition to determine which compatibility add-ons and polyfills should be added to your code.

We prefer to use `.browserslistrc` files to define our browser targets. Though target browsers change per project, our default file [looks like this](http://browserl.ist/?q=%3E+2%25+in+US%2C+last+1+version%2C+not+dead):

```
> 2% in US
last 1 version
not dead
```

---

[Home](../)

1.  [HTML back and forth with Git](../section-1)
2.  [Build Tools](../section-2)
3.  **Stylesheets evolved: Sass & PostCSS**
4.  Next-level JavaScript (coming soon)

[section 2]: ../section-2
[browserslist]: https://github.com/browserslist/browserslist
[sass guide]: http://sass-lang.com/guide
[sass-output]: http://sass-lang.com/documentation/file.SASS_REFERENCE.html#output_style
[browsersync]: https://browsersync.io
[normalize.css]: https://necolas.github.io/normalize.css/
[caniuse]: https://caniuse.com/
[autoprefixer]: http://autoprefixer.github.io/
[cssnano]: http://cssnano.co/
[css imports]: https://github.com/sass/node-sass/issues/2362
[sass-line-comments]: http://sass-lang.com/documentation/file.SASS_REFERENCE.html#line_numbers-option
