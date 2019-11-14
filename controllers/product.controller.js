const http = require('http');
const request = require('sync-request')
const elastic_url = 'http://localhost:9200'
var passwordHash = require('password-hash');
var flask_url="http://localhost:5000"
    
const default_header = {
    "Content-Type": "application/json"
}
//elastic search check if email exists
function make_email_exists_query(email){
    query = {
            "query":{
                "match_phrase":{
                    "email":email
                }
            }
        };
    console.log(query);
    return query;
}

function make_area_query(value){
    query = {
        "query":{
            "match_phrase":{
                "area":value
            }
        }
    };
console.log(query);
return query;
}

function make_field_query(value){
    query = {
        "query":{
            "match_phrase":{
                "field":value
            }
        }
    };
console.log(query);
return query;
}

// makes the req data json
function make_user_signup_json(request_obj){
    var hashedPassword = passwordHash.generate(request_obj['password']);
    query = {
            "name"     : request_obj['name'],
            "gender"   : request_obj['gender'],
            "email"    : request_obj['email'],
            "mobile"   : request_obj['mobile'],
            "password" : hashedPassword
    }
    return query;
}

function make_smart_search_query(field,original_query){
    searchQuery = field + original_query;
    elasticsearchQuery = {
        "query": {
        "bool":{
            "must":{
                "multi_match": {
                    "query": searchQuery,
                    "fields": ["field^10",
                               "name^5",
                               "area^5",
                               "expertise^3",
                               "other_info^5",
                               ],
                    "type" : "best_fields",
                    "fuzziness" : fuzzy
                }
            }
            
        }
        
      }
    }
    return elasticsearchQuery;

}


//creates user sanitises input and check if data previosuly there
exports.user_signup=function(req,res,next){
    console.log(req.body);
    if(req.body["email"] == "" || req.body["name"] == "" || req.body["password"] == "" || req.body["gender"] == ""){ res.status(400).send("missing values in request"); return;}
    email_query = make_email_exists_query(req.body['email']);
    var response = request('POST',elastic_url+'/user/_search',{json:email_query});
    var result = JSON.parse(response.getBody('utf8'))
    console.log("result",result);
    if(result.hits.total.value!=0){
        res.status(400).send("Email Exists"); 
        return;
    }
    bodyJson = make_user_signup_json(req['body']);
    response = request('POST',elastic_url+'/user/user',{json:bodyJson});
    result = JSON.parse(response.getBody('utf8'))
    res.status(201).send();
};

//check pass and id
exports.user_login=function(req,res,next){
    console.log(req.body);
    if(req.body["email"] == "" || req.body["password"] == ""){ res.status(400).send("missing values in request"); return;}
    email_query = make_email_exists_query(req.body['email']);
    var response = request('POST',elastic_url+'/user/_search',{json:email_query});
    var result = JSON.parse(response.getBody('utf8'))
    console.log("result",result);
    if(result.hits.total.value==0){
        res.status(400).send("User Doesn't Exist"); 
        return;
    }
    var hashedPassword = result.hits.hits[0]._source.password;
    if(passwordHash.verify(req.body.password, hashedPassword)){
        res.status(200).send("login Succesful");
        return;
    }
    res.status(401).send('invalid username/password');
};

exports.get_doc_by_id=function(req,res,next){
    console.log(req.params.ID);
    //query_json = make_matching_query('_id',req.params.ID);
    var response = request('GET',elastic_url+'/doctor/_doc/'+req.params.ID);
    var result = JSON.parse(response.getBody('utf8'));
    res.status(200).json(result._source);
    return;
};

exports.get_doc_by_area=function(req,res,next){
    console.log(req.params.Area);
    query_json = make_area_query(req.params.Area);
    var response = request('POST',elastic_url+'/doctor/_search',{json:query_json});
    var result = JSON.parse(response.getBody('utf8'));
    var temp = {};
    var truncated_result = [];
    for(i=0;i<result.hits.hits.length;i++){
        temp = {
            "id" : result.hits.hits[i]['_id'],
            "name" : result.hits.hits[i]['_source']['name'],
		    "field" : result.hits.hits[i]['_source']['field'],
		    "area" : result.hits.hits[i]['_source']['area'],
		    "experience" : result.hits.hits[i]['_source']['experience']
        }
        truncated_result.push(temp);
    }
    res.status(200).json(truncated_result);
    return;
};

exports.get_doc_by_field=function(req,res,next){
    console.log(req.params.Field);
    query_json = make_field_query(req.params.Field);
    var response = request('POST',elastic_url+'/doctor/_search',{json:query_json});
    var result = JSON.parse(response.getBody('utf8'));
    var temp = {};
    var truncated_result = [];
    for(i=0;i<result.hits.hits.length;i++){
        temp = {
            "id" : result.hits.hits[i]['_id'],
            "name" : result.hits.hits[i]['_source']['name'],
		    "field" : result.hits.hits[i]['_source']['field'],
		    "area" : result.hits.hits[i]['_source']['area'],
		    "experience" : result.hits.hits[i]['_source']['experience']
        }
        truncated_result.push(temp);
    }
    res.status(200).json(truncated_result);
    return;
};

exports.add_smartsearch=function(req,res,next){
    console.log(req.body);
    query_json = {
        "query" : req.body['query'],
        "patient_age" : req.body["patient_age"]
    }
    var response = request('POST',flask_url+'/search',{json:query_json});
    var result = JSON.parse(response.getBody('utf8'));
    result = result['field'];
    query_json = make_smart_search_query(result,req.body['query']);
    var response = request('POST',flask_url+'/search',{json:query_json});
    var result = JSON.parse(response.getBody('utf8'));
    res.status(200).json(result.hits.hits);
};




