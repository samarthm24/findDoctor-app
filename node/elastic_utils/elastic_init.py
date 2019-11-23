import requests
import json


url = 'http://localhost:9200'
headers = {"Content-Type" : "application/json"}


index_names = ['doctor','user','appointment','sp_user']
r = [requests.put(url+"/"+str(name),headers=headers,timeout=10) for name in index_names]
for response in r:
    print(response)
