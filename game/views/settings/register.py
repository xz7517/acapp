from django.http import JsonResponse
from django.contrib.auth import login
from django.contrib.auth.models import User
from game.models.player.player import Player

def register(request):
    data = request.GET
    username = data.get("username","").strip();
    password = data.get("password","").strip();
    password_confirm = data.get("password_confirm", "").strip();
    if not username or not password:
        return JsonResponse({
            'result':"cannot be blank",
        })

    if password!=password_confirm:
        return JsonResponse({
            'result':"not consistent",
        })

    if User.objects.filter(username=username).exists():
        return JsonResponse({
            'result':"username already exists",
        })

    user = User(username = username)
    user.set_password(password)
    user.save()
    Player.objects.create(user = user, photo ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU7RkIH7BH4fmcisYqDuQCQ3N9lyzuE1u94A&usqp=CAU" )
    login(request,user)

    return JsonResponse({
            'result':"success",
        })
