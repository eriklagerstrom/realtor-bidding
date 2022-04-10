from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys

import numpy as np
import pandas as pd
import time

# Få bort \xa0- done
# Sätt i en lista och loopa tillsammans med try catch- done
start_url = 'https://www.hemnet.se/salda/bostader?location_ids%5B%5D=17800'

def scrape(driver, url, index_list, replace, XPATH_list, element_order):

    driver.get(url)
    driver.maximize_window()
    return_list = []

    # try: 
    #     WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '/html/body/div[8]/div/div/div/div/div/div[2]/div[2]/div[2]/button'))).click()
    # except:
    #     print("Something went wrong while minimizing modal.")

    for i in range(len(index_list)):
        try:
            tmp = driver.find_elements(By.XPATH, XPATH_list[i])[index_list[i]].text.strip()
            if(replace[i]):
                tmp = tmp.replace(u'\xa0', u" ")
            return_list.append(tmp)

        except:
            return_list.append('#N/A')

    return return_list

