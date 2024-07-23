"""
implement a basic cache class
"""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """
    BasicCache class
    """

    def put(self, key, item):
        "assign key-value to cache"
        if not key or not item:
            return
        self.cache_data[key] = item
    
    def get(self, key):
        "get item from cache"
        if not self.cache_data.get(key):
            return None
        return self.cache_data[key]
