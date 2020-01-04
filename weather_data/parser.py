# import urllib.request

# fhand = urllib.request.urlopen('https://map.onesoil.ai/2018#2/44.35/-43.66')
# for line in fhand:
#     print(line.decode().strip())
import urllib.request, urllib.parse, urllib.error
from bs4 import BeautifulSoup
import ssl
import json

#please ignore SSL certificate errors
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = "https://maps.googleapis.com/maps/api/geocode/json?"
#input('Enter - ')
html = urllib.request.urlopen(url, context=ctx).read()
soup = BeautifulSoup(html, 'html.parser')

# Retrieve all of the specified tags 
tags = soup('script')
count=0
total=0
data_req = tags[1]
# print(data_req)

info = json.loads(data_req)
print(info)
