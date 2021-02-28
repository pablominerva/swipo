from django.contrib import admin
from .models import Problem

# Register your models here.
class ProblemAdmin(admin.ModelAdmin):
    list_display = ("problem_ID", "problem_name", "happy_count","sad_count","idk_count")

admin.site.register(Problem,ProblemAdmin)