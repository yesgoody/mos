import requests
import pprint
import datetime
import json
from requests.auth import OAuth1

local_url = "http://localhost:5000/api"
heroku_url = "http://yesgoody-mos.herokuapp.com/api" 
url = local_url
#url = heroku_url

payload = {
    "type" : "order",
    "time" : int(datetime.datetime.utcnow().strftime("%s")),
    "data" : { 
        "merchantID": 1,
        "price": 15.32,
        "customerID": -1, #-1 means guest
        "details": {
            "pizza" : 2,
            "coke"  : 1,
        },
    },
}
client_key = u"1234567890"
client_secret = u"1234567890"
resource_owner_key = u"1234567890"
resource_owner_secret = u"1234567890"
headeroauth = OAuth1(client_key, client_secret,
                     resource_owner_key, resource_owner_secret,
                     signature_type='auth_header')
                     
#pprint.pprint(json.dumps(payload))
headers = {'content-type': 'application/json'}
r = requests.post(url, data=json.dumps(payload), auth=headeroauth)

pprint.pprint(r.json)