## 4.A Hello World Web Server

In this example we will use the library ExpressJS, which is not part of nodeJs core libraries, so we will use **npm** to install it

```
cd .04-client-server/B-WebServerWithExpressJS               # From root dir type
npm init                                                    # create a new npm project. Answer the questions by its default value
                                                            # this will create a package.json file. Open it and see its content
npm install express --save                                  # Install ExpressJS and save the reference into package.json
                                            
```

To bear in mind:

* If the package.json already exists just type
```
npm install         # this will create a node_modules folder with all the dependencies
```

* The folder node_modules is not included into git since we are not going to modify this code (see .gitignore file)

See this [link]{https://medium.com/@adnanrahic/hello-world-app-with-node-js-and-express-c1eb7cfa8a30}
