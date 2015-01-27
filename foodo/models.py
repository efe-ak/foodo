from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=128, unique=True)

    def __unicode__(self):
        return self.name

class Page(models.Model):
    category = models.ForeignKey(Category)
    title = models.CharField(max_length=128)
    url = models.URLField()
    views = models.IntegerField(default=0)

    def __unicode__(self):
        return self.title




class UserProfile(models.Model):
    # This line is required. Links UserProfile to a User model instance.
    user = models.OneToOneField(User)

    # The additional attributes we wish to include.
    website = models.URLField(blank=True)
    picture = models.ImageField(upload_to='profile_images', blank=True)

    # Override the __unicode__() method to return out something meaningful!
    def __unicode__(self):
        return self.user.username


class NewsItems(models.Model):
    
#    CUISINE_CHOICES = ( ("Chinese", "Chinese"), ("Mexican", "Mexican"), ("American", "American"), ("Turkish", "Turkish"), ("Italian", "Italian"), ("French", "French"), ("Japanese", "Japanese"), ("Thai", "Thai"), ("German", "German"), ("Indian", "Indian"), ("Brazilian", "Brazilian"))

#    FOOD_CHOICES = ( ("Sushi", "Sushi"), ("Steak", "Steak"), ("Burger", "Burger"), ("Kebab", "Kebab"), ("Cocktail", "Cocktail"), ("Frog Legs", "Frog Legs"), ("Rice", "Rice"), ("Ramen", "Ramen"), ("Burrito", "Burrito"), ("Fajita", "Fajita"), ("Falafel", "Falafel"), ("Shawarma", "Shawarma"), ("Sandwich", "Sandwich"), ("Hookah", "Hookah"), ("Noodle", "Noodle"), ("Manti", "Manti"), ("Dolma", "Dolma"), ("Chips", "Chips"), ("Lobster", "Lobster"), ("Oyster", "Oyster"), ("Seabass", "Seabass"), ("Miso Soup", "Miso Soup"), ("Cappucino", "Cappucino") , ("Espresso", "Espresso"), ("Tea", "Tea"), ("Miso Soup", "Miso Soup"))

    
    userid= models.IntegerField(max_length=20)
    picture = models.ImageField(upload_to='news_images', blank=True, null=True)
    status= models.TextField(max_length=2000)
    timestamp = models.DateTimeField()
    cuisine = models.CharField(max_length=200)
    food = models.CharField(max_length=200)

class UserSetting(models.Model):
      
    userid= models.IntegerField(max_length=20)
    picture = models.ImageField(upload_to='profile_images', blank=True, null=True)
    cuisine = models.CharField(max_length=200)
    food = models.CharField(max_length=200)


