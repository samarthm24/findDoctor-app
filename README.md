# findDoctor-app
# Abstract
Need to find the best doctor for your health issues - Our website is the perfect fit. Search through a wide range of verified, experienced doctors of all fields. Our powerful search helps users find the doctors based on their problem, patient age, locality of the user etc. Search Modelled to classify medical field based on patient issues. The users can also book appointments with the doctors based on availability of slots. The doctors can view all the registered appointments for any date. Website built with React.JS, Node.JS, Flask and Elasticsearch.

#NLP - Model
The above model has about 1 million unique vectors for each word. The model predicts the similarity between these 2 vectors based on an algorithm called cosine similarity. The more similar the words are the higher the cosine similarity score. The model implemented finds the similarity between the given symptom and the field related to it(i.e physician, gynaecologist, pediatrician, ophthalmologist, cardiologist, orthopedic, otolaryngology,  neurologist, dermatologist) and gives us a single field with the highest cosine similarity. 

# Dependencies
 - Elasticsearch - 7.4
 - Node.JS
 - React.JS
 - Python Flask
 
# Run
 - Load the data into doctors.xlsx in elasticsearch 
 - sudo service elasticsearch start
 - cd node/elastic_utils 
 - python elastic_init.py
 - python insert.py
 - cd ..
 - node index
 - cd python
 - python WT_NLP_model.py
 - cd react
 - npm start
 
