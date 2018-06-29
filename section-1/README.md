# Section 1. HTML back and forth with Git

The goal of this section is just to get comfortable with a basic Git workflow.

At IOP we use Git as a clean way of synchronizing our code and letting us collaborate remotely. The primary goal of this section is to push and pull code from a GitHub repository.

## Installing Git

First, we need to be sure Git is installed. If you're using a Mac, I recommend installing the [Homebrew][] package manager first. Homebrew greatly simplifies installation of command line tools, installation instructions are here: [brew.sh](https://brew.sh/)

Git is a command line tool, but there are a number of cross-platform GUI apps like [GitHub Desktop][], [GitKracken][] or [SourceTree][] which are great alternatives. The [Visual Studio Code app][visual studio code] also integrates a very nice Git client. All the GUI tools just put buttons over the same CLI text commands, so use which ever tool you prefer.

- If you installed Homebrew, just run `brew install git`
- [Command line Installers](https://git-scm.com/downloads)
- [GitHub Desktop][]
- [GitKracken][]
- [SourceTree][]
- [Visual Studio Code][]

### Git terminology and workflow

Some important Git terms include:

- **Repository**<br>
  A collection of the source code and project history
- **Clone**<br>
  Every repository is a clone
- **Commit**<br>
  Commits are collections of changes to files. These are the building blocks of a project’s history.
- **Push and Pull**<br>
  These commands are how repositories talk to each other. Commits are sent between repositories.

The basic workflow goes something like this:

1.  Pull changes (or clone a repository) to do some local work
2.  Make changes to the files in your local clone (edit/save)
3.  Gather changes into commits (stage your changed files, then commit them locally)
4.  Push your commits to the remote repository (usually GitHub)

### Tutorial links

- A brief, gentle introduction: [Git for Designers](https://code.tutsplus.com/tutorials/git-for-designers--pre-54689)
- How Git works: [Getting Started - Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)

## Jumping in

Let's start out by cloning this repository. At the top of this page, click the name of the repository to get back to the top level. Now click the green **Clone or download** button to reveal the cloning URL.

- Command line: `git clone https://github.com/ideasonpurpose/tools-and-workflows.git`
- [Clone with GitHub Desktop](https://help.github.com/desktop/guides/contributing-to-projects/cloning-a-repository-from-github-desktop/)
- [Clone with GitKracken](https://support.gitkraken.com/working-with-repositories/open-clone-init)
- [Clone with SourceTree](https://confluence.atlassian.com/sourcetreekb/clone-a-repository-into-sourcetree-780870050.html)

You should now have a folder named **tools-and-workflows** on your computer with cloned copies of all the files in the project (and all its history).

### Things to do

This section contains a few HTML files and some images.

Try modifying the files in this section and adding or removing other files. Gather those changes by staging the files and then commit them. A commit is just a group of saves.

All changes will be on your own computer until you push (sync) your commits back to GitHub.

- [Git workflows](https://git-scm.com/book/en/v2/Distributed-Git-Distributed-Workflows) (IOP mostly follows the "Centralized Workflow" model)
- [Syncing your Branch with GitHub Desktop](https://help.github.com/desktop/guides/contributing-to-projects/syncing-your-branch/)
- [Pushing and Pulling with GitKracken](https://support.gitkraken.com/working-with-repositories/pushing-and-pulling)
- [Commit, Push, and Pull a repository on SourceTree](https://confluence.atlassian.com/sourcetreekb/commit-push-and-pull-a-repository-on-sourcetree-785616067.html)

[![Git](https://imgs.xkcd.com/comics/git.png)](https://xkcd.com/1597/)

### Project History

Every Git commit is a snapshot of the project's history and can be described by a commit hash (a blob of numbers and letters). Generally, only the first 6-8 digits of the hash matter for uniqueness.

GUI apps generally show the project history all the time. On the command line, run `git log` (then type `q` to quit).

Past commits can be checked out or branched from. In extreme cases, the entire repository can even be reset (rolled back) to a previous commit.

### Where am I?

`git status` is one of the most useful commands in Git. It reports the state of the repository, the working file tree, relationship to remote repos and which branch is active. All the GUI apps run this constantly to update their interfaces.

### Ignoring files

While we can choose to omit certain files from our repositories, Git includes a feature to make this easier. Adding a `.gitignore` to the top of a repository lets us define files, directories or file globs which should never be included. These are useful for preventing accidental inclusion of third-party libraries or filesystem junk like `.DS_Store` and `Thumbs.DB` files.

- [gitignore documentation](https://git-scm.com/docs/gitignore)
- [.gitignore](https://www.atlassian.com/git/tutorials/saving-changes/gitignore)
- [A managed WordPress .gitignore file](https://gist.github.com/joemaller/4f7518e0d04a82a3ca16)

### Additional Features to explore

Please also take a look at branching and conflict resolution. Conflicts do happen, but can often be avoided by talking to others on the project.

```bash
// Create a new branch and switch to it
$ git checkout -b new_branch

// List branches
$ git branch


// Switch back to the master branch
$ git checkout master

// Merge new_branch onto master (after checking out master)
$ git merge new_branch
```

- [Branches in GitHub Desktop](https://help.github.com/desktop/guides/contributing-to-projects/making-changes-in-a-branch/)
- [Branching and Merging with GitKracken](https://support.gitkraken.com/working-with-repositories/branching-and-merging)
- [Branch Management with SourceTree](https://confluence.atlassian.com/sourcetreekb/branch-management-785325799.html)

Configuring SSH keys for remote access makes connecting to remote repositories much easier. Some of the GUI apps will handle this for you. More info here:

- [SSH Keys at Git-SCM](https://git-scm.com/book/en/v2/Git-on-the-Server-Generating-Your-SSH-Public-Key)
- [About SSH at GitHub](https://help.github.com/articles/about-ssh/)
- [SSH Keys in GitKracken](https://support.gitkraken.com/integrations/authentication)

---

[Home](../)

1.  **HTML back and forth with Git**
2.  [Build Tools](../section-2)
3.  [Stylesheets evolved: Sass & PostCSS](../section-3)
4.  Next-level JavaScript (coming soon)

[homebrew]: https://brew.sh/
[github desktop]: https://desktop.github.com/
[sourcetree]: https://www.sourcetreeapp.com/
[gitkracken]: https://www.gitkraken.com/
[visual studio code]: https://code.visualstudio.com/
