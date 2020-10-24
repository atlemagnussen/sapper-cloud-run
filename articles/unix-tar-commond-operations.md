# Tar (tarball) compress and extract files in Unix or Linux

<div class="separator" style="clear: both; text-align: center;"><img border="0" src="https://storage.googleapis.com/atle-static/pics/tar.png" width="420" height="420" /></div>

Are you, like the rest of the world, figuring out how to unwrap whatever is inside a `.tar.gz` file?  
Or have you learned the command for tar.gz but now you have a `.tar.bz2` file?

Or have you stumbled over `.tgz`, `.tbz` or `.tbz2`?

Alright, I will give you a very short list of commands that I find is the most useful

First, short explanation of relevant flags:

-   c = create
-   v = verbose (list files in archive when operate, can be ommited)
-   f = archive
-   x = extract
-   z = gzip
-   j = bzip2

## Tar

### Extract

#### Univarsal extract method

If you remember this you'll get a long way  
It turns out tar figures it out if you dont specify z or j flag on extract

```
tar xvf myfile.tar.gz
tar xvf myfile.tar.bz2
```

#### extract gzip archive

```sh
tar xvzf myfile.tar.gz
```

#### extract bzip2 archive

```sh
tar xvjf myfile.tar.gz
```

### Create compressed tar archives

### Gzip - .tar.gz/.tgz file

```sh
# folder
tar cvzf myfolder.tar.gz ./myfolder
# file
tar cvzf myfile.tar.gz myfile.txt
# many files
tar cvzf myfiles.tar.gz myfile myfile2
# wildcard
tar cvzf my.tar.gz my*

```

### Bzip2 - .tar.bz2/.tbz/.tar.tb2 files

Same tricks of including files in archive as for gzip

```sh
tar cvfj myfolder.tar.bz2 ./myfolder
```
