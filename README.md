# nzoom
A responsive popup image viewer

##Components
* scripts/nzoom.js
* stylesheets/nzoom.css
* images/default.gif

##How to use
* Include the *nzoom.css* and *nzoom.js* or the minified one anywhere on your code since this **DOES NOT** require *JQuery*

* Add `nzoom-img` class to your img element. 
###Example
  ```html 
    <img id="1" width="300px" class="nzoom-img" src="images/54322683.jpg" alt="alt">
    ```
###Options
  ```javascript
    nzoom.options({
      setMaxWidth: (n),
      setTransDuration: (n)
    });
  ```

**For a better sample visit** [**nzoom**](http://lightnick.github.io/nzoom/)**!**
