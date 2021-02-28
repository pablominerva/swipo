from django.db import models

def image_directory_path(instance, filename): 
    # file will be uploaded to MEDIA_ROOT / user_<id>/<filename> 
    return 'problem/{0}/{1}'.format(instance.problem_ID, f"{filename}") 

# Create your models here.
class Problem(models.Model):
    problem_ID = models.AutoField(primary_key=True)
    problem_name = models.CharField(max_length=60)
    happy_count = models.IntegerField(default=0) #these ones will need a specific person through table
    sad_count = models.IntegerField(default=0)
    idk_count = models.IntegerField(default=0)
    description = models.TextField()
    image = models.ImageField(default='problem/999/default.png',upload_to=image_directory_path)
