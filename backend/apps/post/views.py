from django.shortcuts import render

# Create your views here.


def PostList(request):
    return render(request, 'list.html')