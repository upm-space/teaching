from airplane import airplane
from hangar import hangar


hangar1 = hangar()
hangar1.AddAirplane(airplane(0,'kjh-1223')) 
hangar1.AddAirplane(airplane(0,'fdf-1224')) 
hangar1.AddAirplane(airplane(0,'gbn-1225')) 
hangar1.AddAirplane(airplane(0,'dfc-1226')) 
hangar1.AddAirplane(airplane(0,'hjk-1227')) 

hangar1.PrintAirplanes()