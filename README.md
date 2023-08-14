Usage of LOCALFORAGE
Offline storage, improved.
https://localforage.github.io/localForage/#data-api-keys

localforage.setItem('key', 'value', doSomethingElse);
localForage is a JavaScript library that improves the offline experience of your web app by using an asynchronous data store with a simple, localStorage-like API. It allows developers to store many types of data instead of just strings.

localForage includes a localStorage-backed fallback store for browsers with no IndexedDB or WebSQL support. Asynchronous storage is available in the current versions of all major browsers: Chrome, Firefox, IE, and Safari (including Safari Mobile).

// Set a value with localStorage:
localStorage.setItem('key', JSON.stringify('value'));
doSomethingElse();

// The same code with localForage:
localforage.setItem('key', 'value').then(doSomethingElse);

// localForage also support callbacks:
