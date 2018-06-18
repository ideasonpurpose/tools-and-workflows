# Section 2. Build Tools

This might my favorite section. Tools should amplify our abilities, a well-tuned build pipeline feels like having an army of helper robots working for us.

Appropriately, most build tools run on node.js. [Node.js][] is simply JavaScript, running outside the browser. Because so many people know JavaScript, the tooling ecosystem has exploded over the past few years and the pace of innovation is astonishing.

Which is to say, don't get too comfortable. This landscape changes quickly.

### A little bit of command line

This section requires a tiny bit of terminal use. Here are a few essential terminal commands to know:

- `cd` Change directory. Use this to change directories.
- `ls` List the files and folders in your current directory.
- `pwd` Print Working Directory, essentially "where am I?"

Some tutorial links:

- UNIX Tutorial for Beginners: [Lesson 1](https://w3.cs.jmu.edu/spragunr/CS139_S16/activities/unix_tutorial/unix1.html)
- [Intro to the macOS Command Line](http://blog.teamtreehouse.com/introduction-to-the-mac-os-x-command-line)

A great mac-only terminal shortcut: Drag a folder from the Finder onto the Terminal icon to open a new window inside that directory.

## node.js, npm and JavaScript packages

First we need [node.js][node.js]. If you have Homebrew installed, just run `brew install node`. Otherwise, download an installer here: [node.js downloads](https://nodejs.org/en/download/).

The **npm** command line tool is installed with node.js. **npm** refers to both the node package management app and the huge library of available packages at [npmjs.org](https://www.npmjs.com/). We'll use the app to to install some third-party tools and then kick off a build task.

Recently, a facebook-sponsored clone of npm called [Yarn](https://yarnpkg.com/) has been earning a lot of praise -- and users. The examples here use **npm**, but the two are interchangeable and **Yarn** is worth a look.

## Task Runners and Gulp

A task runner gathers together all the various tools used to compile and build a site, then organizes those into discrete tasks. At IOP we go one step further and abstract those tasks behind [npm script commands](https://docs.npmjs.com/misc/scripts), which gives us a simple and consistent interface regardless of which tools are actually doing the work behind the scenes.

We generally use two primary commands:

- **Build** (`npm run build`)<br>
  Generate a production-ready, compiled and compressed snapshot of the site in `dist`.
- **Start** (`npm run start`)<br>
  Starts a dev server and rebuilds the site whenever files are changed. Optimized for faster iteration.

Our preferred task runners are [gulp][] and [webpack][]. Gulp runs gulpfiles, which are just JavaScript files defining a set of tasks in code. Webpack bundles everything in relation to a site's JavaScript files. We'll start with gulp. The example gulpfile in this section contains one simple image optimization task.

### Install some tools

Please be sure you're working in the `section-2` directory. Either drag the folder onto the terminal, or `cd` there. Calling `pwd` and `ls`, you should see something like this:

```
$ pwd
/Users/joe/Desktop/tools-and-workflows/section-2

$ ls
README.md    gulpfile.js  package.json src
```

If we try calling `npm run build` now it will throw an error because none of the required packages have been installed yet. Our example gulpfile uses [gulp][] and [gulp-imagemin][], install them with this command:

```
$ npm install gulp gulp-imagemin
```

**npm** installs those two packages --- and all the dependencies of those packages. And those packages' packages' packages. _This is the moment where the node ecosystem seems utterly insane._ We asked for two packages, we got 436. It's turtles all the way down. Accepting that this is just "the node.js way" may require a leap of faith, but know there are a lot of really smart people doing the same thing and this crazy house of cards is stable for now.

### Build it!

Finally, let's run the build!

```
$ npm run build

[10:53:10] Using gulpfile ~/Desktop/tools-and-workflows/section-2/gulpfile.js
[10:53:10] Starting 'default'...
[10:53:10] gulp-imagemin: ✔ js-logo.svg (saved 1.15 kB - 56.4%)
[10:53:10] gulp-imagemin: ✔ mushed pug.jpg (saved 2.15 kB - 4.8%)
[10:53:10] gulp-imagemin: ✔ little cube that could.gif (saved 25.7 kB - 17.4%)
[10:53:12] gulp-imagemin: ✔ png/smile.png (saved 20 kB - 24.2%)
[10:53:12] gulp-imagemin: Minified 4 images (saved 49 kB - 17.7%)
[10:53:12] Finished 'default' after 2.05 s
```

If everything worked correctly and you see output like the above (though more colorful) then all the images in `src/images` were optimized and copied to `dist/images`!

This is a very basic pipeline, but the real power of gulp comes from combining a number of tasks and watching files for changes. We also fine-tune the configuration to better meet our needs.

## Source and Distribution directories: `src` and `dist`

We follow the `src`/`dist` convention for source code files and distribution artifacts. Most all of our work is done in the `src` directory, then the actual site deliverables are compiled into `dist`.

### Don't commit build artifacts

Do not not store build artifacts in Git. Since the site is the product of a totally deterministic and reproducible build process, contents of `dist` are disposable and should be able to be regenerated at any time.

### What are all these extra files?

One side effect of build processes are configuration and dot-files. The top-level of a repository may contain a number of these files:

- **package.json** - This is a record of the project's dependencies, metadata, author info and configuration.
- **package-lock.json** or **yarn.lock** - generated integrity files for verifying what was installed.
- **.browserslistrc**, **.editorconfig**, **.eslint.js**, **webpack.config.js** and more - configuration for specific tools.
- **node_modules/** - this directory is created when installing node libraries

---

[Home](../)

1.  [HTML back and forth with Git](../section-1)
2.  **Build Tools**
3.  Stylesheets evolved: Sass & PostCSS (coming soon)
4.  Next-level JavaScript (coming soon)

[node.js]: https://nodejs.org/en/
[gulp]: https://gulpjs.com/
[webpack]: https://webpack.js.org/
[gulp-imagemin]: https://www.npmjs.com/package/gulp-imagemin
