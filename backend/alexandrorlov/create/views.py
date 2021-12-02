from django.http import HttpResponse
from create.extension import transformExtension
import requests
from django.shortcuts import render

url = 'https://pastebin.com/api/api_post.php'
api_dev_key = '9e52XiycBJ9wHFM8e8wv3eo0F_OtR2Or'
api_option = 'paste'

def index(request):
    if  'text' in request.GET and 'extension' in request.GET:
        api_paste_format  = transformExtension(request.GET['extension'])
        api_paste_code = request.GET['text']

        if api_paste_format  == None:
            return HttpResponse("Error: extension error")

        data = ({'api_dev_key': api_dev_key, 'api_paste_code': api_paste_code, 'api_option': api_option,
                 'api_paste_format': api_paste_format})

        res = requests.post(url, data)

        if res.text.split()[0] == 'Bad':
            return HttpResponse("Error: ", res.error)

        return HttpResponse(res.text)
    else:
        return HttpResponse("Error: invalid parameters")
