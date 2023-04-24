class airplane():
    def __init__(self,velocidad, matricula):
        self.velcidadActual = velocidad
        self.matricula = matricula
        self.sistemaDeMedidaVelocidad = "km"

    def acelera(self,incremento):
        self.velcidadActual += incremento

    def imprimeVelocidad(self):
        print("La velocidad actual es de {0} {1}/h".format(self.velcidadActual, 
                                                        self.sistemaDeMedidaVelocidad))

    def PrintPlate(self):
        print("La matricula del coche es " + self.matricula)