from foodo.models import Category, Page
from foodo.models import UserProfile, NewsItems, UserSetting
from django.contrib import admin

admin.site.register(Category)
admin.site.register(Page)
admin.site.register(UserProfile)
admin.site.register(NewsItems)
admin.site.register(UserSetting)

