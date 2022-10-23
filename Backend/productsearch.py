# Imports
import urllib.request as req
from linkpreview import link_preview
import itertools
from googlesearch import search

# retrieve links from query
def get_links(query):
  return search(query, tld="co.in", num=3, stop=3, pause=2)

def preview_link(url):
  content = req.urlopen(url).read()
  preview = link_preview(url, content)
  return preview

def get(query):
  links = get_links(query)
  objs = []
  for i in itertools.islice(links, 3):
    preview = preview_link(i)
    objs.append({
        "title": preview.title,
        "image": preview.image,
        "link": i
    })
  return objs

