
# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask
#from operations import addTwoNumbers, division, multiplication
import operations as op


# Flask constructor takes the name of 
# current module (__name__) as argument.
app = Flask(__name__,
            static_folder='./',)
  
# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.
@app.route('/')
# ‘/’ URL is bound with hello_world() function.
def hello_world():
    return 'Hello World'

# example http://127.0.0.1:5000/add_operation/1/2
@app.route("/add_operation/<a>/<b>")
def add_operation(a,b):
    add = op.addTwoNumbers(a, b)
    mult = op.multiplication(a,b)
    div = op.division(a,b)
    return {
        "suma": add,
        "multiplicacion": mult,
        "division": div
    }
@app.route("/greetings/<nombre>")
def saluda(nombre):
    return {
        "saludo": "Buenos días " + nombre
    }

# main driver function
if __name__ == '__main__':
  
    # run() method of Flask class runs the application 
    # on the local development server
    #app.run()                               # just for local
    app.run(host='0.0.0.0', port=5000)