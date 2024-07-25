#!/usr/bin/env python3
"""
create function that takes page an pageSize
and return start index and index of page
"""


def index_range(page, page_size):
    "define indx_range func"
    start = (page - 1) * page_size
    end = start + page_size

    return start, end
