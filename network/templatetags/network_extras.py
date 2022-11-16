from django import template

register = template.Library()

@register.filter
def keyvalue(dict, key):    
    # print("holitasdddddddddddddddddddd")
    # print(key)
    # print(dict[key])
    if(key==None):
        key=1
    return dict[key]