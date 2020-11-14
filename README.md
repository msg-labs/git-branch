# git-branch

> Navigate git branches with ease

Git branch allows you to interactively search a branch name on the current
git repository. It displays a list of candidates and a promp to filter the
results.

![Demo of git-branch](./public/demo.gif)

## Install

```sh
npm install -g @msg-labs/git-branch
```

By default the exported binary name has been made intentionally long so it
doesn't collide with any other binary. I suggest to shorten it with an alias.

```sh
alias b="msg-git-branch"
```

## Usage

```sh
Usage: msg-git-branch [options] [search...]

Options:
  -V, --version         output the version number
  -l, --limit [number]  limits the line outputs (default: 10)
  -s, --sortBy [field]  sorts the output (default: "refname")
  -h, --help            display help for command
```

## Wishlist

In no special order I'd like to have:

* Handle all of the issues below from the Github projects tab
* Testing
* Flag merged
* Remote branches
* intelligent switch for package.json
    Checks if there are any differences, if so it could
    * Clean the environment
    * reinstall packages
* Better messages
* Better error handling
* Pull more info for each branch
    * Is it ahead/behind remote?
