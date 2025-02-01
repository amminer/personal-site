#pyright:basic
import os
from jinja2 import Template


BLOG_SRC_DIR = "blog_src/"
BLOG_POSTS_DIR = "blog_posts/"
BLOG_TEMPLATE_FILEPATH = "templates/blog.html"
BLOG_OUTPUT_FILEPATH = "blog.html"


# read template in to be filled out
with open(BLOG_TEMPLATE_FILEPATH, "r") as template_file:
    raw_text = template_file.read()
    template = Template(raw_text)

# read blog post data from src
blog_post_sources = []
for textfile in os.listdir(BLOG_SRC_DIR):
    date = textfile[:-4]
    with open(os.path.join(BLOG_SRC_DIR, textfile), 'r') as rf:
        title = rf.readline()[:-1]
        imagepath = rf.readline()[:-1]
        post_content = "".join(rf.readlines())
        print(post_content)
    blog_post_sources.append({"title": title,
                       "date": date,
                       "imagepath": imagepath,
                       "post_content": post_content
                       })
blog_post_sources.reverse()

# construct html blog post list, post contents
post_list_items = []
post_datas = []
for i, blog_post_source in enumerate(blog_post_sources):
    one_indexed = i + 1

    post_list_items.append(f'''
            <p style="pointer-events: none;">
            <a id="{blog_post_source.get("date")}" class="sidebar_item nav-link"
            style="pointer-events: auto" href="#top">
            • {blog_post_source.get("title")}
            <br/>📅 {blog_post_source.get("date")}
            </a></p>''')

    post_datas.append((blog_post_source.get("date"), f'''<div class="blog_post" id="blog_post_{one_indexed}">
        <h1 class="blog_post_title"> {blog_post_source.get("title")} </h1>
          <img class="blog_post_image" src="{blog_post_source.get("imagepath")}"/>
          <p class="blog_post_text"> {blog_post_source.get("post_content")} </p>
    </div>'''))

for post_date, rendered_post_content in post_datas:
    postfile = os.path.join(BLOG_POSTS_DIR, post_date + '.html')
    #if not os.path.exists(postfile):
    print(rendered_post_content)
    with open(postfile, "w") as wf:
        wf.write(rendered_post_content)

# insert blog list and post contents into template page
# notable that newer blog posts are below older ones in the HTML,
# *probably* doesn't matter because only one post should be visible at a time
blog_home_rendered_html = template.render(
        post_list_items="\n".join(post_list_items),
        post_container_items=post_datas[0][1]
)

# write output to blog.html
with open(BLOG_OUTPUT_FILEPATH, "w") as output_file:
    _ = output_file.write(blog_home_rendered_html)
