# nzoom
A responsive popup image viewer

##Components
* scripts/nzoom.js
* stylesheets/nzoom.css
* images/default.gif

##Installation
Include the *nzoom.css* and *nzoom.js*
```html
 <link rel="stylesheet" type="text/css" href="nzoom.css">
 <script src="nzoom.js"></script>
```
##How to use
* Add `nzoom-img` class to your img element. 
###Example
  ```html 
    <div id="w-nzoom">
		  <img src="images/default.gif">
	   </div>
	   
    <img id="1" width="300px" class="nzoom-img" src="images/54322683.jpg" alt="alt">
    ```
    **Note**: Place `w-nzoom` outside your container.
###Options
  ```javascript
    nzoom.options({
      setMaxWidth: (n),
      setTransDuration: (n)
    });
  ```
###To install using bower:
  ```
    bower install nzoom
  ```
**For a better sample visit** [**nzoom**](http://lightnick.github.io/nzoom/)**!**
