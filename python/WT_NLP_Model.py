# -*- coding: utf-8 -*-
"""
Created on Thu Nov 14 21:00:10 2019

@author: acer
"""
#-------installation instructions-------
#conda install -c conda-forge spacy
#python -m spacy download en_core_web_lg
#---------------------------------------

from flask import Flask, jsonify, request
import spacy 
import operator
import collections

app = Flask(__name__)


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Methods',
                         'GET, PUT, POST,DELETE,OPTIONS')
    response.headers.add('Origin', '127.0.0.1')
    return response


nlp = spacy.load('en_core_web_lg')


def doc_sug(symp):  
    doc_arr = "physician gynaecologist pediatrician ophthalmologist cardiologist orthopedic ent neurologist dermatologist"
    doc_tokens = nlp(doc_arr) 
    symp_token = nlp(symp)
    sim = {}
    
    for token in doc_tokens:
        sim[token.text] = (token.similarity(symp_token))
        
    #print(sim)
    #return a single doctor suggestion
    #return(max(sim.items(), key=operator.itemgetter(1))[0])
    
    #return 1 or more doctor suggestion
    sorted_x = sorted(sim.items(), key=lambda kv: kv[1],reverse=True)
    sorted_dict = collections.OrderedDict(sorted_x)
    
    #print(sorted_dict)
    
    sug = []
    count = 0
    for k in sorted_dict.keys():
        if count!=2:
            sug.append(k)
            count = count + 1
        else:
            break
    return sug[0]
    

    
#print(doc_sug("arrythmia"))    

@app.route('/search', methods=['POST'])
def search():
    print(request.json)
    field = doc_sug(request.json['query'])
    if int(request.json['patient_age'])<12:
        field = field+" pediatrician"
    result = {'field':field}
    return jsonify(result),200

if __name__ == '__main__':

    app.run("0.0.0.0", port=5001, debug=True)
    
#    for token in tokens:
#        print(token.text, token.has_vector, token.vector_norm, token.is_oov)
