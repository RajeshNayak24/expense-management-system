import os 

class Config:
    SECRET_KEY= ''
    SQLALCHEMY_DATABASE_URL = 'sqlite:///budget.db'
    SQLALCHEMY_TRACK_MODIFICATION = False