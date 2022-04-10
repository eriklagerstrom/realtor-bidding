from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys

import numpy as np
import pandas as pd
import time

from scraper import scrape

# Sätt igång den, dataframe

index_list = [2,0,1,0,0,0,0,0,0,0,0,0,0]
replace = [False, False, False, False, False, False, False,False,True,True,True,True,True]
XPATH_list = ['//*[@id="page-content"]/div[1]/div[1]/div[5]/div[1]/div[1]/div[1]/text()','//*[@id="page-content"]/div[1]/div[1]/div[5]/div[1]/div[1]/div[1]/p/a',
    '//*[@id="page-content"]/div[1]/h1/text()','//*[@id="page-content"]/div[1]/div[1]/div[3]/dl[2]/dd[1]','//*[@id="page-content"]/div[1]/div[1]/div[3]/dl[2]/dd[2]',
    '//*[@id="page-content"]/div[1]/div[1]/div[3]/dl[2]/dd[3]','//*[@id="page-content"]/div[1]/div[1]/div[3]/dl[2]/dd[4]','//*[@id="page-content"]/div[1]/div[1]/div[3]/dl[2]/dd[7]','//*[@id="page-content"]/div[1]/div[1]/div[2]/div/span[2]',
    '//*[@id="page-content"]/div[1]/div[1]/div[3]/dl[1]/dd[2]','//*[@id="page-content"]/div[1]/div[1]/div[3]/dl[1]/dd[1]',
    '//*[@id="page-content"]/div[1]/div[1]/div[3]/dl[2]/dd[8]','//*[@id="page-content"]/div[1]/div[1]/div[3]/dl[2]/dd[9]']
element_order = ['realtor house','realtor', 'address', 'housing form','housing type', 'rooms', 'square meters','building year','final price','asking price',
    'square meter price', 'monthly fee','yearly maintenance' ]


driver = webdriver.Safari()

page_url = 'https://www.hemnet.se/salda/bostader?location_ids%5B%5D=17800&page=1&sold_age=12m'
next_page_xpath = '//*[@id="result"]/div[2]/div[1]/div/div[6]/a'
next_page_class_name = "pagination__item pagination__item--responsive"
class_next_page_final = 'next_page pagination__item pagination__item--disabled'
class_next_page = '"pagination__item pagination__item--responsive'
class_sold_items = 'sold-property-link'

loaded_page = driver.get(page_url)
time.sleep(5)
df = pd.DataFrame(columns=element_order)

print("Starting scraper")
counter_page = 1

while True:
        
    sold_items_page = driver.find_elements(By.CLASS_NAME, class_sold_items)
    if len(sold_items_page) == 0:
        print("No items found on page, exiting")
        driver.close()
        break

    old_page_string = "page="+str(counter_page)
    counter_page += 1
    new_page_string = "page="+str(counter_page)
    url_list = list()
    for item in sold_items_page:
        url_list.append(item.get_attribute("href"))

    for url in url_list:
        scraped_data = scrape(driver, url, index_list, replace, XPATH_list, element_order)
        to_append = pd.Series(scraped_data, index=df.columns)

        df = df.append(to_append, ignore_index=True)
    
    page_url = page_url.replace(old_page_string, new_page_string)
    print("Page done, moving to next")
    print()
    driver.get(page_url)
    time.sleep(3)

df.to_excel("Uppsala12M.xlsx")