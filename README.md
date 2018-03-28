# Vue_using_API
Vue.js test - using API

Characteristics:
- The architecture: This test has one parent and several child components (composing). It uses VueJS library by CDN.
- The data: Data are loaded from an API (https://jsonplaceholder.typicode.com/). Parent passes data down to the child via props, and the children send messages to the parent via events (emit). There is an example of how to update parent data from child. Children load details doing API requests.
- It uses directives, custom events and bindings to do the scaffold.

Features:
- This test shows the way to load blog posts and their comments using an API.
- You can filter by author. 

Advice:
If you want to use this test, you have to disable security options to avoid CORS problems in Chrome.
I got it creating a shortcut with the following options:
"...chrome.exe" --user-data-dir="C:/Chrome dev session" --disable-web-security
