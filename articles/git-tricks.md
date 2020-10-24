# GIT tricks

## Ignore locally without using gitignore
Add file to `.git/info/exclude`

Then run
```sh
$ git update-index --assume-unchanged file
```

## Delete branch
Locally
```sh
$ git branch -d branch-name
```

Remote
```sh
$ git push -d origin branch-name
```
