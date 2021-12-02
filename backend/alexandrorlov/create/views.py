from django.http import HttpResponse
from create.extension import transformExtension
import requests
from django.shortcuts import render

def index(request):

    if  'text' in request.GET and 'extension' in request.GET:
        extension = transformExtension(request.GET['extension'])

        if extension == None:
            return HttpResponse("Error: extension error")

        
        return HttpResponse(request.GET['text'])
    else:
        return HttpResponse("Error: invalid parameters")
