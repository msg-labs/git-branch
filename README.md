# git-branch

Move branch from your terminal with ease

## Tips

By default the exported binary name has been made intentionally long so it
doesn't collide with any other binary. I suggest to shorten it with an alias.

```sh
alias b="msg-git-branch"
```

## Wishlist

In no special order I'd like to have:

* Testing
* .gif with a demo of the functionality
* Accepts a default filter
* Remote branches
* intelligent switch for package.json
    Checks if there are any differences, if so it could
    * Clean the environment
    * reinstall packages
* Better messages
* Better error handling
* Pull more info for each branch
    * Is it ahead/behind remote?