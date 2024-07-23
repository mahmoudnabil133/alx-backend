"""
implement fifo cache
"""
from base_caching import BaseCaching
from collections import OrderedDict


class FIFOCache(BaseCaching):
    """
    fifo class to implement fifo cach
    """

    def __init__(self):
        "init method"
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        "define put method"
        if not key or not item:
            return
        if not self.cache_data.get(key):
            if len(self.cache_data) >= FIFOCache.MAX_ITEMS:
                removed = self.cache_data.popitem(0)
                print(f'DISCARD: {removed[0]}')
        self.cache_data[key] = item

    def get(self, key):
        "(hit) get item from cache"
        if not key or not self.cahce_data.get(key):
            return None
        return self.cache_data[key]
