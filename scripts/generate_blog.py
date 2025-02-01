#pyright:basic
import os
from jinja2 import Template


BLOG_SRC_DIR = "blog_src/"
BLOG_TEMPLATE_FILEPATH = "templates/blog.html"
BLOG_OUTPUT_FILEPATH = "blog.html"


# read template in to be filled out
with open(BLOG_TEMPLATE_FILEPATH, "r") as template_file:
    raw_text = template_file.read()
    template = Template(raw_text)

# read blog post data from src
blog_posts = []
for textfile in os.listdir(BLOG_SRC_DIR):
    date = textfile[:-4]
    with open(os.path.join(BLOG_SRC_DIR, textfile), 'r') as rf:
        title = rf.readline()[:-1]
        imagepath = rf.readline()[:-1]
        post_content = "".join(rf.readlines())
    blog_posts.append({"title": title,
                       "date": date,
                       "imagepath": imagepath,
                       "post_content": post_content
                       })

# construct html blog post list, post contents
post_list_items = []
post_container_items = []
for i, blog_post in enumerate(blog_posts):
    one_indexed = i + 1

    post_list_items.append(f'''
<btn id="post_link_{one_indexed}" class="sidebar_item">
• {blog_post.get("title")}
<p style="margin: 0px 14px; font-size: 0.75em;">📅 {blog_post.get("date")}</p>
</btn>''')

    post_container_items.append(f'''<div class="blog_post" id="blog_post_{one_indexed}">
<h1> {blog_post.get("title")} </h1>
<img src="{blog_post.get("imagepath")}"/>
<p> {blog_post.get("post_content")} </p>
</div>''')

# insert blog list and post contents into template page
# notable that newer blog posts are below older ones in the HTML,
# *probably* doesn't matter because only one post should be visible at a time
built_html = template.render(
        post_list_items="\n".join(post_list_items),
        post_container_items="\n".join(post_container_items)
)
#TODO instead of loading all the post contents at once, save each to a file in some blog_posts dir,
# write some javascript such that clicking a sidebar item loads the blog post in post_container div

# Pretty sure I could store each post as its own HTML file and then just load that HTML from the
# server into the container on the client on demand

# write output to blog.html
with open(BLOG_OUTPUT_FILEPATH, "w") as output_file:
    _ = output_file.write(built_html)
