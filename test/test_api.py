import requests
import pprint

local_url = "http://localhost:5000/api"
heroku_url = "http://yesgoody-mos." 

payload = {
    "price" : 12,
    "item" : "pizza",
}
r = requests.get(local_url, params=payload)
pprint.pprint(r.text)