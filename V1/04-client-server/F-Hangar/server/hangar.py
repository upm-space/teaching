from airplane import airplane

class hangar():
    def __init__(self):
        self.airplanes = []

    def AddAirplane(self, airplane):
        self.airplanes.append(airplane)
    
    def PrintAirplanes(self):
        for airplane in self.airplanes:
            airplane.PrintPlate()