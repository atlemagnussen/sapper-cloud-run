# A brief summary and how to use ECMAscript modules in browser
```html
<script type="module"></script>
```
You may or may not know about javascript's default global scope.
Meaning if you just define a variable somewhere in some file, it is by default global - and therefore extremely error-prone when creating large web applications.

This was never the case in NodeJs (server side js) - but that was because of it's late arrival to the stage compared to browsers and the lessons were learned. Due to compatibility the global scope thing cannot be fixed for browsers, but it can be avoided.

Modules are about avoiding putting things the global scope and isolate them.
ES6 modules is the first web standard way  to define modules in javascript. Usually a task that was performed via frameworks. There was a "standard" way called Immediately Invoked Function expressions - [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) - that allowed you to isolate code, but it was not very pretty.

ES6 modules is not tied to the new ES6 class definition feature, but I recommend you to start using those as well, as they will be the future.
With ES6 modules you can define anything as a module, as in the example below where I export just a string setting.

Notice the difference between default exports and named. With default you can only define one, but using named exports you can export multiple.

ECMAscript is ![es6](https://storage.googleapis.com/backslash-project.appspot.com/static/ES6.png "es6") Javascript

## Reference with script src in index.html
```html
<script type="module" src="index.js"></script>
```
## Reference without script src
```html
<script type="module">
  import { Index } from './index.js';
  let index = new Index();
</script>
```

## Declare modules (export)
### ex config.js with many exports:
```javascript
export const TestConfigOption = "I am export const TestConfigOption";
export const AnotherOption = "I am the other option";

```
### ex module.js
```javascript
export default class {
     get() {
         return "I am export default class module";
     }
}
```
### ex namedmodule.js
```javascript
export class NamedModule {
     get() {
         return "I am named export called class NamedModule";
     }
}
```
### ex subfolder/submodule.js
```javascript
export class SubFolderModule {
     get() {
         return "I am export class SubFolderModule";
     }
}
```

## Use modules (import)
```javascript
import * as config from './config.js';
import NameMeWhatEver from './module.js';
import { NamedModule } from './namedmodule.js';
import { SubFolderModule } from './subfolder/submodule.js';

console.log(config.TestConfigOption);
console.log(config.AnotherOption);

let mod = new NameMeWhatEver();
console.log(mod.get());

let named = new NamedModule();
console.log(named.get());

let sub = new SubFolderModule();
console.log(sub.get());
```

### Clone this [repo](https://github.com/atlemagnussen/es6modules) and test it
