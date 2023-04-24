from airplane import airplane
from hangar import hangar


hangar1 = hangar()
hangar1.AddAirplane(airplane('A1','kjh-1223')) 
hangar1.AddAirplane(airplane('A2','fdf-1224')) 
hangar1.AddAirplane(airplane('A3','gbn-1225')) 
hangar1.AddAirplane(airplane('A4','dfc-1226')) 
hangar1.AddAirplane(airplane('A5','hjk-1227')) 

hangar1.PrintAirplanes()    