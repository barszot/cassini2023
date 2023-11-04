from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tutaj możesz określić konkretne domeny, które mają dostęp
    allow_methods=["*"],  # Tutaj możesz określić konkretne metody HTTP, np. ["GET", "POST"]
    allow_headers=["*"],  # Tutaj możesz określić konkretne nagłówki, jeśli to konieczne
)

@app.get("/hello")
async def root(helptype: str, mass:float, x:float, y:float, z:float):
    fakt = helptype+" ma cięzar "+str(mass*10)+" niutonów oraz objętość "+str(x*y*z)+" cm^3"

    return {"fact": fakt}