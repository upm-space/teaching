#Teaching
(by Luis Izquierdo)

Very basic example of communication between a python program, nodejs program and a javascript client program.

How it works

open the websockect server (in nodejs)

    node server.js
    
open the index.html in a web browser (Java Script Client)

open the python websocket client

     python app-py
     
If you follow the order you will see in the html page

     Hello 0
     Hello 1
     Hello 2
     
These message have been trough from the python client. If you write something in the chat you will see the message in the nodejs console and in the python client console