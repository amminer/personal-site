"""
This script reads each file in BLOG_SRC_DIR,
generates HTML elements to represent each blog post,
formats and writes each blog post as an HTML file in BLOG_OUTPUT_FILEPATH,
and inserts the necessary HTML elements into the template blog homepage
stored at BLOG_TEMPLATE_FILEPATH, writing the result out to BLOG_OUTPUT_FILEPATH.

blog post src files MUST be named with the date of the blog post in yyyy-mm-dd.txt format.

the blog homepage template MUST be a jinja2-compatible template using these variables:
    post_list_items: sidebar link elements, one for each post
    current_post_content: content of the post currently loaded and visible
"""
#pyright:basic
import os
from jinja2 import Template
from typing import Dict


BLOG_SRC_DIR = "blog_src/"
BLOG_POSTS_DIR = "blog_posts/"
BLOG_TEMPLATE_FILEPATH = "templates/blog.html"
BLOG_OUTPUT_FILEPATH = "blog.html"


# read blog post data from src
sidebar_links: list[str] = [] # rendered sidebar link html as strings
post_datestamps_and_contents: Dict[str, str] = {}  # {post_datestring: rendered_post_html}

blog_post_source_files = os.listdir(BLOG_SRC_DIR)
blog_post_source_files.reverse()

for i, textfile in enumerate(blog_post_source_files):
    one_indexed = i + 1
    post_datestring = textfile[:-4]
    with open(os.path.join(BLOG_SRC_DIR, textfile), 'r') as rf:
        post_title = rf.readline()[:-1]
        post_title_abbreviated = post_title if len(post_title) <= 25 else post_title[:25] + '...'
        post_imagepath = rf.readline()[:-1]
        post_rawtext = "".join(rf.readlines())

    # construct html for sidebar link list, post contents
    sidebar_links.append(
        f'''
            <a id="{post_datestring}" class="sidebar_item sidebar_link nav-link"
            style="pointer-events: auto" href="#top">
            • {post_datestring}
            <br/> &nbsp&nbsp {post_title_abbreviated}
            </a>
        '''
    )

    rendered_post_content =\
        f'''<div class="blog_post" id="blog_post_{one_indexed}">
            <h1 class="blog_post_title"> {post_title} </h1>
            <img class="blog_post_image" src="{post_imagepath}"/>
            <p class="blog_post_text"> {post_rawtext} </p>
        </div>'''
    post_datestamps_and_contents[post_datestring] = rendered_post_content

    postfile = os.path.join(BLOG_POSTS_DIR, post_datestring + '.html')
    with open(postfile, "w") as wf:
        _ = wf.write(rendered_post_content)

# insert blog list and post contents into template page
with open(BLOG_TEMPLATE_FILEPATH, "r") as template_file:
    raw_text = template_file.read()
    template = Template(raw_text)
blog_home_rendered_html = template.render(
        post_list_items="\n".join(sidebar_links),
        current_post_content=list(post_datestamps_and_contents.values())[0]
)

# write rendered homepage to blog.html
with open(BLOG_OUTPUT_FILEPATH, "w") as output_file:
    _ = output_file.write(blog_home_rendered_html)
