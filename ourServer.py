from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from beta import main
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/hello")
async def root(mass:float, x:float, y:float, z:float, minutes:int):
    odpowiedz = main((x,y,z),mass,int(minutes)/60, (10.5354,14.1675),(10.5915,14.3130))
    #odp2 =  main((3,4,5),1,2, (10.5354,14.1675),(10.5915,14.3130))
    fakt = ("Pakunek ma cięzar aż "+str(mass*10)+" niutonów oraz objętość "+str(x*y*z)+" cm^3."
            +" Ma być dostarczony w ciągu "+str(minutes) + " minut.")
    return {"fact": odpowiedz}