# Imports
import urllib.request
from bs4 import BeautifulSoup as bs
import itertools
from googlesearch import search

# retrieve links from query
def get_links(query):
  return search(query, tld="com", num=3, stop=3, pause=0)

def get_products(query):
  links = get_links(query)
  objs = []
  for i in itertools.islice(links, 3):
    content = urllib.request.urlopen(i).read()
    content = bs(content, features="html.parser")
    title = content.find('title').text
    objs.append({
        "title": title,
        "link": i
    })
  return objs

