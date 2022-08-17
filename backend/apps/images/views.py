from django.shortcuts import render
from .models import Image
from .forms import ImageForm
from django.http import JsonResponse
# Create your views here.

def main_view(request):
    # object = Image.objects.get(id=1)
    form = ImageForm(request.POST or None, request.FILES or None)
    if form.is_valid():
        form.save()
        return JsonResponse({'messege':'works'})
    context = {'form': form}
    return render(request, 'main.html', context)