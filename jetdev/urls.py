from django.conf.urls import patterns, url
from foodo import views
from django.conf import settings
from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings

handler500 = 'foodo.views.handler500'
handler404 = 'foodo.views.handler404'


urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'foodo.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
                       
    url(r'^foodo/', include('foodo.urls')),

    url(r'^foodo/register/$', 'foodo.views.register', name='register'),                 
                       
    url(r'^signup/', 'foodo.views.signup'), #tugrul
                       
                       
    url(r'^home/', 'foodo.views.home'), #tugrul
    
    url(r'^login/', 'foodo.views.user_login'), #efe

    url(r'^logout/$', 'foodo.views.user_logout', name='logout'),
                       
    url(r'^settings/(?P<userid>\d+)/$' ,'foodo.views.edit'),

    url(r'^foodo/profile/(?P<userid>\d+)/$' , 'foodo.views.user_newsfeed_page'), 

    url(r'^search/' , 'foodo.views.search'),

    url(r'^newsfeed/', 'foodo.views.newsfeed_page'),

    url(r'^foodo/save-status/', 'foodo.views.save_status'),

    url(r'^change-settings/', 'foodo.views.change_settings'),

    url(r'^foodtrending/', 'foodo.views.foodtrending'),
                       
    
)

if  settings.DEBUG:
    urlpatterns += patterns(
        'django.views.static',
        (r'^media/(?P<path>.*)',
        'django.views.static.serve',
        {'document_root': settings.MEDIA_ROOT}), )


