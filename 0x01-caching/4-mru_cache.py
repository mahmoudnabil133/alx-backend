"""
implement mru cache
"""
from base_caching import BaseCaching
from collections import OrderedDict


class MRUCache(BaseCaching):
    """
    mru class to implement mru cach
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
            if len(self.cache_data) >= MRUCache.MAX_ITEMS:
                removed = self.cache_data.popitem(1)
                print(f'DISCARD: {removed[0]}')
        else:
            self.cache_data.move_to_end(key)
        self.cache_data[key] = item

    def get(self, key):
        "(hit) get item from cache"
        if self.cache_data.get(key):
            self.cache_data.move_to_end(key)
        return self.cache_data.get(key, None)
