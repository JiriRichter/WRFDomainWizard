import requests
import requests_cache
from datetime import timedelta
import time
import datetime

requests_cache.install_cache('github_cache', expire_after=timedelta(hours=1))

def sleep_until(timestamp):
    d = datetime.datetime.now(datetime.UTC)
    epoch = datetime.datetime(1970,1,1, tzinfo=datetime.UTC)
    now_timestamp = (d - epoch).total_seconds()
    if now_timestamp >= timestamp:
        return
    sleep_seconds = timestamp - now_timestamp
    print("sleep for {0} seconds".format(sleep_seconds))
    time.sleep(sleep_seconds)

def github_get(url):
    attempt = 1
    while attempt <= 3:
        response = requests.get(url)
        print("Requesting {0} -> {1}".format(url, response.status_code))
        if response.ok:
            return response
        ratelimit_remaining = response.headers.get("x-ratelimit-remaining")
        if ratelimit_remaining == "0":
            ratelimit_reset = response.headers.get("x-ratelimit-reset")
            sleep_until(int(ratelimit_reset) + 1)
            attempt += 1
        else:
            raise RuntimeError("Request failed")
    raise RuntimeError("Request failed after {0} attempts".format(attempt))

wrf_model_url = "https://api.github.com/repos/wrf-model/WRF/git/trees/master?recursive=1"
def get_git_trees():
    return github_get(wrf_model_url).json()
