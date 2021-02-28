from django.urls import path

from .views import story, fetch_problems, push_prob, stats, push_count

urlpatterns = [
    path('', story, name="landing"),
    path('fetch',fetch_problems,name="load_problems"),
    path('push/day',push_prob, name="push_prob"),
    path('push/count',push_count, name="push_count"),
    path('stats',stats,name="stats")
]