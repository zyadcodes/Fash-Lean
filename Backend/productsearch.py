# Imports
import urllib.urlopen as open_url
from bs4 import BeautifulSoup as bs
import itertools
from googlesearch import search

# retrieve links from query
def get_links(query):
  return search(query, tld="co.in", num=3, stop=3, pause=2)

def get_products(query):
  links = get_links(query)
  objs = []
  for i in itertools.islice(links, 3):
    content = open_url(i)
    content = bs(content)
    title = content.find('title')
    content.find('')
    objs.append({
        "title": title,
        "link": i
    })
  return objs

