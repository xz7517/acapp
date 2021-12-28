from django.http import HttpResponse

def index(request):
    line1 = '<h1 style="text-align:center">术士之战</h1>'
    line2 ='<img src="https://img0.baidu.com/it/u=4035339947,1492935398&fm=26&fmt=auto" width=2000>'
    line3 = '<a href="/play/">start</a>'
    return HttpResponse(line1+line3+line2)

def play(request):
    line1 ='<h1 style="text-align:center">Menu</h1>'
    line2 = '<a href="/">return</a>'
    return HttpResponse(line1+line2)
