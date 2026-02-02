class airplane():
    def __init__(self,model, plate):
        self.velcidadActual = 0
        self.model = model
        self.plate = plate
        self.sistemaDeMedidaVelocidad = "km"

    def acelera(self,incremento):
        self.velcidadActual += incremento

    def imprimeVelocidad(self):
        print("La velocidad actual es de {0} {1}/h".format(self.velcidadActual, 
                                                        self.sistemaDeMedidaVelocidad))

    def PrintPlate(self):
        print("La matricula del coche es " + self.plate)

    def getJson(self):
        return {"model": self.model, "plate": self.plate}