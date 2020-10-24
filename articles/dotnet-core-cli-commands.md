# Dotnet Core command-line operations
<img src="https://storage.googleapis.com/backslash-project.appspot.com/static/NETCore.png" alt="dotnet core logo" width="320">

[.Net core](https://github.com/dotnet/core) is Microsoft's wonderfully refurbished new open source-cross platform successor for the now 20 year old .NET Framework. There are a lot of improvements such as the core of the framework not being as monolithic as its ancestor but more relies on NuGet for expanding. Being cross platform it works with docker for Linux and thus making it a natural choice over .NET Framework in the new age of Big Cloud computing.  

But some of the greatest features is it's brand new and very consistent `CLI` tools. For command line and Vim geeks like myself this is very liberating. Even though you could run msbuild with .NET framework, this is completely different.

This article will show a brief example of a typical setup of a solution and different projects.  
The order of which you do these are not important.  

## Create solution file
The solution file is actually optional in dotnet core, but it's an advantage if you plan to open the solution with full Visual Studio. In addition it gives you the option to build the entire solution in one command.
[Microsoft docs on dotnet sln](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-sln)
```sh
mkdir mysolutionfolder
cd mysolutionfolder
dotnet new sln
```

## Create console app
```sh
mkdir consoleapp
cd consoleapp
dotnet new console
```

### Add console app to solution
```sh
cd ..
dotnet sln add consoleapp
```

### Run console App
```sh
cd console
dotnet run
```

## Create web app
```sh
mkdir web
cd web
dotnet new webapp
```

## Create class library
```sh
mkdir lib
cd lib
dotnet add classlib
```

## Add more projects to solution
```sh
cd ..
dotnet sln add web
dotnet sln add lib
```

## Add references in the solution
```sh
cd web
dotnet add reference ../classlib
```

## Add nuget package
```sh
cd web
dotnet add package Microsoft.Extensions.Logging.AzureAppServices
```

## List projects in solution
```sh
dotnet sln list
```

## Build and run
Works both on solution and project level
```sh
dotnet build
dotnet run
```
