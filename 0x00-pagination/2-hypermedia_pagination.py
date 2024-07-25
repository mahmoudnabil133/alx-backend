#!/usr/bin/env python3
"""
class server
and start paginate the data
"""
import csv
import math
from typing import List


def index_range(page, page_size):
    "define indx_range func"
    start = (page - 1) * page_size
    end = start + page_size

    return start, end


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        "paginate data"
        assert type(page) is int and page > 0
        assert type(page_size) is int and page_size > 0
        start, end = index_range(page, page_size)
        self.dataset()
        return self.__dataset[start: end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> List[List]:
        "paginate with hyper to next and prev pages"
        data = self.get_page(page, page_size)
        total_pages = math.ceil(len(self.__dataset) / page_size)
        next_page = page + 1 if page < total_pages else None
        prev_page = page - 1 if page > 1 else None

        hyper = {
                'page_size': page_size,
                'page': page,
                'data': data,
                'next_page': next_page,
                'prev_page': prev_page,
                'total_pages': total_pages}
        return hyper
