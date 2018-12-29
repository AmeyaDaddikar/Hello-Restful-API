# Hello-Restful-API

## Home Assignment #1 ([Pirple's NodeJS Masterclass](https://pirple.thinkific.com/))

This is my submission project for the first assignment for the NodeJS masterclass.

### Features
1. HTTP/HTTPS support
2. NODE_ENV to toggle between debug modes
3. Modularized code
4. https POST request made to [Yandex Translation API](https://tech.yandex.com/translate/) using the default NodeJS https module
5. Every time you request /hello, it randomizes the message shown. If /hello?lang= is specified, then the Yandex API will translate it to that language.

![Screenshot 1](./screenshots/screenshot_1.png)
![Screenshot 2](./screenshots/screenshot_2.png)

##### P.S.
To get the translator feature to work, add the in the file ./config/private.json (The site still works without the translator, and just returns the message in English.)

```json
"yandex_api_key" : "_your_api_key_"
```

### Things to improve
1. Unnecessary passing of req and callback objects to the messageGenerator function.
I had to resort to that because the https request to translator API was async, and so there I could not return the result of https to the calling function, and hence had to pass the callback function to the generator.
The generator in my opinion should not at all require res or callback, it should just return the string.

[ajaxHandler](./src/ajaxHandler.js)
```(javascript)
messageGenerator.generate(lang, callback, res);  
```

2. Had to create the responseCallback function just because the res object I am passing got overriden by the res object in the https block

[messageGenerator](./src/messageGenerator.js)
```(javascript)
//res passed here
messageGenerator.generate = function (lang, callback, res) {
  
  const responseCallback = function (data) {
    callback(res, 200, data);
  }
  
  .
  .
  .
  
//res used in https for POST request to translator API

  const req = https.request(options, (res) => {
    res.on('data', (data) => {
      response_buffer += data;
    });

    res.on('end', ()=> {
      let message = JSON.parse(response_buffer);
      
      //right here, I can't do the callback(res) as the res will be assumed as the https res
      responseCallback({lang, message: response_buffer});
    })
  });
```

