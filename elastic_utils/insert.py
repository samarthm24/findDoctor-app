import pandas as pd
import requests
import json
import random
import base64

df = pd.read_excel('doctors.xlsx')

for i in range(len(df)):
    mobile = int('9'+''.join([str(random.randint(0,9)) for x in range(9)]))
    email = ''.join(df.loc[i]['Name'].lower().split())[:max(12,len(df.loc[i]['Name']))] + '@gmail.com'
    with open("../images/"+str(df.loc[i]['image_src'])+".jpg", "rb") as image_file:
        encoded_string = 'data:image/jpeg;base64,'+base64.b64encode(image_file.read()).decode('utf-8')
    
    temp = {
        'name' : df.loc[i]['Name'].strip(),
        'mobile' : mobile,
        'email' : email,
        'image' : encoded_string,
        'field' : df.loc[i]['Field'],
        'gender' : df.loc[i]['Gender'],
        'address' : df.loc[i]['Address'],
        'maps_link' : df.loc[i]['Maps_link'],
        'area' : df.loc[i]['Area'],
        'experience' : int(df.loc[i]['Experience']),
        'expertise' : df.loc[i]['Expertise'],
        'other_info': df.loc[i]['Other_info']
    }
    r = requests.post('http://localhost:9200/doctor/doctor',data=json.dumps(temp),headers={'Content-Type':'application/json'},timeout=10)
    print(r.json())