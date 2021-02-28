from django.shortcuts import render
from .models import Problem
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
def story(request):
    return render(request,"story/story.html")

def stats(request):
    problems_basic = Problem.objects.all().order_by('-idk_count')
    context = {
        "problems": problems_basic
    }
    return render(request,"story/stats.html",context)

def push_prob(request):
    if request.method == "POST":
        content = request.POST.get('opinion')
        problem, created = Problem.objects.get_or_create(problem_name=content)
        problem.save()
        return HttpResponse("success")
    else:
        return HttpResponse("unsuccesful")

@csrf_exempt
def push_count(request):
    if request.method == "POST":
        problem_id = request.POST.get('p_id')
        value = request.POST.get('value')
        problem = Problem.objects.get(problem_ID=problem_id)
        if value == "happy":
            problem.happy_count += 1
        elif value == "sad":
            problem.sad_count += 1
        elif value == "idk":
            problem.idk_count += 1
        problem.save()
        return HttpResponse("success")
    else:
        return HttpResponse("unsuccesful")

def fetch_problems(request):
    problems = []
    problem_list = Problem.objects.all()
    #object_list = Film.objects.filter(reduce(lambda x, y: x | y, [Q(country__name__icontains=country) for country in countries]))
    #object_list = object_list.exclude(year__in=["2025","2024","2023","2022","2021"])
    #object_list = object_list.order_by('-year')
    #seen_list = Audience.objects.filter(
        #Q(audience=request.user),~Q(country_pass=4))
    #n_seen_list = ([mov.movie for mov in seen_list])
    for problem in problem_list:
        #if film not in n_seen_list:
        problems.append(problem)
        #if len(films) >= 10:
            #break
        
    '''
    if len(films) < 10:
        return JsonResponse({
            "posts": "nop"
        })
    '''
    data = []
    for problem in problems:
        data.append({"problem_name": problem.problem_name, "problem_id": problem.problem_ID, "problem_desc":problem.description, "problem_img": problem.image.url})
    
    return JsonResponse({
        "posts": data
    })