import json
import urllib.request
import sqlite3

conn = sqlite3.connect('weather_data.sqlite')
cur = conn.cursor()
cur.execute('''
CREATE TABLE  IF NOT EXISTS Report(temp DECIMAL,wind_speed DECIMAL,wind_deg,Humidity INTEGER,time_of_record TEXT)''')

fhand = urllib.request.urlopen("https://api.openweathermap.org/data/2.5/weather?id=2172797&APPID=81b717124c273e260289e38b838edb0a")
for line in fhand: 
    data = json.loads(line.decode().strip()) 
# print(data)

print(data["weather"])
temp = data["main"]["temp"]
wind_speed = data["wind"]["speed"]
wind_deg = data["wind"]["deg"]
Humidity = data["main"]["humidity"]
cur.execute('''SELECT datetime()''')
for row in cur: 
    time = row[0]
cur.execute('INSERT INTO Report(temp,wind_speed,wind_deg,Humidity,time_of_record) VALUES (?,?,?,?,?)',(temp,wind_speed,wind_deg,Humidity,time,))
conn.commit()
cur.close()


