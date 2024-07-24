import scrapy
import csv

class PokemonSpider(scrapy.Spider):
    name = "pokemonCards"

    def start_requests(self):
        urls = [
            'https://www.pricecharting.com/console/pokemon-scarlet-&-violet-151'
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    