
# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask
#from operations import addTwoNumbers, division, multiplication
#import operations as op

from airplane import airplane
from hangar import hangar
hangar1 = hangar()


# Flask constructor takes the name of 
# current module (__name__) as argument.
app = Flask(__name__)
  
@app.route('/')


@app.route("/addp/<model>/<plate>")
def saluda2(model,plate):
    hangar1.AddAirplane(airplane(model,plate)) 
    return {
        "msg": "Plane added " + model + plate
    }



# main driver function
if __name__ == '__main__':
  
    app.run(host='0.0.0.0', port=5001)