from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/hello")
async def root(mass:float, x:float, y:float, z:float, minutes:int):
    fakt = ("Pakunek ma cięzar aż "+str(mass*10)+" niutonów oraz objętość "+str(x*y*z)+" cm^3."
            +" Ma być dostarczony w ciągu "+str(minutes) + " minut.")
    return {"fact": fakt}