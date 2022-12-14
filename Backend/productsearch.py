# Imports
import urllib.request
from bs4 import BeautifulSoup as bs
import itertools
from googlesearch import search
from linkpreview import link_preview
import asyncio

# retrieve links from query


def get_links(query):
    return search(query, tld="com", num=3, stop=3, pause=0)


async def get_products(query):
    links = get_links(query)
    objs = []
    for i in itertools.islice(links, 3):
        try:
            content = urllib.request.urlopen(i).read()
            preview = link_preview(i)

            content = bs(content, features="html.parser")
            objs.append({
                "title": content.title.text,
                "link": i,
                "image": preview.image
            })
        except:
            print("failed")

    return objs
