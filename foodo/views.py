from django.shortcuts import render
from  django.shortcuts import render_to_response
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.template import RequestContext, loader
from django.http import HttpResponse
from foodo.models import NewsItems, UserProfile, UserSetting
from django.contrib.auth.models import User
from django.db.models import Count

import datetime

def index(request):
 
    # Construct a dictionary to pass to the template engine as its context.
    # Note the key boldmessage is the same as {{ boldmessage }} in the template!
    #context_dict = {'boldmessage': "I am bold font from the context"}

    # Return a rendered response to send to the client.
    # We make use of the shortcut function to make our lives easier.
    # Note that the first parameter is the template we wish to use.

    return render(request, 'foodo/index.html')

   
from foodo.forms import UserForm, UserProfileForm

def foodtrending(request):
    hottest_ten = NewsItems.objects.values('cuisine', 'food').annotate(food_count = Count('id')).order_by('-food_count')[:5]
    hottest_cuisine = NewsItems.objects.values('cuisine').annotate(cuisine_count = Count('id')).order_by('-cuisine_count')[:5]
    hottest_type = NewsItems.objects.values('food').annotate(type_count = Count('id')).order_by('-type_count')[:5]
    return render_to_response('foodo/foodtrending.html',
                              {'hottest_ten':hottest_ten,'hottest_cuisine':hottest_cuisine, 'hottest_type':hottest_type, 'this_user': request.user},
                         context_instance=RequestContext(request))

def save_status(request):
    
    status=request.POST["status"] #matches html
    cuisine=request.POST["selcuisine"] #matches html
    food=request.POST["selfood"]
    timestamp=datetime.datetime.now()
    if "picinput" in request.FILES:
        image=request.FILES['picinput']
    else:
        image=None
    
    NewsItems.objects.create(status=status, cuisine=cuisine, food=food, timestamp=timestamp, userid=request.user.id, picture=image)    #matches above post thing
    return HttpResponseRedirect('/newsfeed/')



def newsfeed_page(request):
    last_ten = NewsItems.objects.all().order_by('-timestamp')[:10]
    for item in last_ten:
        item.username = User.objects.get(id=item.userid).username
        if UserSetting.objects.filter(userid=item.userid).exists():
            item.userphoto = UserSetting.objects.get(userid=item.userid).picture
        else:
            item.userphoto = "profile_images/defaultimg.png"
   
    userlist= User.objects.all().order_by('username')
    return render_to_response('foodo/timeline-list.html',
                              {'last_ten':last_ten, 'this_user': request.user, 'users': userlist},
                         context_instance=RequestContext(request))


def user_newsfeed_page(request, userid):
    user = User.objects.get(id=userid)
    if UserSetting.objects.filter(userid=userid).exists():
        cuisine = UserSetting.objects.get(userid=userid).cuisine
        dish = UserSetting.objects.get(userid=userid).food
        photo = UserSetting.objects.get(userid=userid).picture
    else:
        cuisine = "Add your own!"
        dish = "Add your own!"
        photo = "profile_images/defaultimg.png"
    last_ten = NewsItems.objects.filter(userid=userid).order_by('-timestamp')[:10]
    for item in last_ten:
        item.username = User.objects.get(id=item.userid).username
        if UserSetting.objects.filter(userid=item.userid).exists():
            item.userphoto = UserSetting.objects.get(userid=item.userid).picture
        else:
            item.userphoto = "profile_images/defaultimg.png"
    userlist= User.objects.all().order_by('username')
    if request.user.is_authenticated():
        return render_to_response('foodo/profile.html',
                              {'last_ten':last_ten, 'this_user': user, 'this_cuisine':cuisine, 
                              'this_dish': dish, 'this_photo': photo, 'users': userlist},
                              context_instance=RequestContext(request))
    else:
        return HttpResponseRedirect('/home/')
       


def register(request):

    # A boolean value for telling the template whether the registration was successful.
    # Set to False initially. Code changes value to True when registration succeeds.
    registered = False

    # If it's a HTTP POST, we're interested in processing form data.
    if request.method == 'POST':
        # Attempt to grab information from the raw form information.
        # Note that we make use of both UserForm and UserProfileForm.
        user_form = UserForm(data=request.POST)
        profile_form = UserProfileForm(data=request.POST)

        # If the two forms are valid...
        if user_form.is_valid() and profile_form.is_valid() and request.POST["password"]==request.POST["passwordconfirm"]:
            # Save the user's form data to the database.
            user = user_form.save()

            # Now we hash the password with the set_password method.
            # Once hashed, we can update the user object.
            user.set_password(user.password)
            user.save()
            user = authenticate(username=request.POST["username"], password=request.POST["password"])
            login(request, user)

            # Now sort out the UserProfile instance.
            # Since we need to set the user attribute ourselves, we set commit=False.
            # This delays saving the model until we're ready to avoid integrity problems.
            profile = profile_form.save(commit=False)
            profile.user = user

            # Did the user provide a profile picture?
            # If so, we need to get it from the input form and put it in the UserProfile model.
            if 'picture' in request.FILES:
                profile.picture = request.FILES['picture']

            # Now we save the UserProfile model instance.
            profile.save()

            # Update our variable to tell the template registration was successful.
            registered = True

        # Invalid form or forms - mistakes or something else?
        # Print problems to the terminal.
        # They'll also be shown to the user.
        else:
            print user_form.errors, profile_form.errors
            return render(request,
                          'index_username.html',
                          {'user_form': user_form, 'profile_form': profile_form, 'registered': registered} )

#THINK ABOUT THIS

    # Not a HTTP POST, so we render our form using two ModelForm instances.
    # These forms will be blank, ready for user input.
    else:
        user_form = UserForm()
        profile_form = UserProfileForm()

    # Render the template depending on the context.
    #my_foods = Food.objects.filter(user_id=request.user.id)
    return HttpResponseRedirect('/foodo/profile/' + str(request.user.id))

#HTTP REDIRECT
def user_login(request):

    # If the request is a HTTP POST, try to pull out the relevant information.
    if request.method == 'POST':
        # Gather the username and password provided by the user.
        # This information is obtained from the login form.
        username = request.POST['username']
        password = request.POST['password']

        # Use Django's machinery to attempt to see if the username/password
        # combination is valid - a User object is returned if it is.
        user = authenticate(username=username, password=password)

        # If we have a User object, the details are correct.
        # If None (Python's way of representing the absence of a value), no user
        # with matching credentials was found.
        if user:
            # Is the account active? It could have been disabled.
            if user.is_active:
                # If the account is valid and active, we can log the user in.
                # We'll send the user back to the homepage.
                login(request, user)
                return HttpResponseRedirect('/foodo/profile/' + str(request.user.id))
            else:
                # An inactive account was used - no logging in!
                return HttpResponse("Your Foodo account is disabled.")
        else:
            # Bad login details were provided. So we can't log the user in.
            print "Invalid login details: {0}, {1}".format(username, password)
            return render_to_response('index_login.html',  {},
                                      context_instance=RequestContext(request))

    # The request is not a HTTP POST, so display the login form.
    # This scenario would most likely be a HTTP GET.
    else:
        # No context variables to pass to the template system, hence the
        # blank dictionary object...
        return render(request, 'index.html', {})

@login_required
def restricted(request):
    return HttpResponse("Since you're logged in, you can see this text!")

from django.contrib.auth import logout

# Use the login_required() decorator to ensure only those logged in can access the view.
@login_required
def user_logout(request):
    # Since we know the user is logged in, we can now just log them out.
    logout(request)

    # Take the user back to the homepage.
    return HttpResponseRedirect('/home/')



def home(request):  #This is the view function to home
    return render_to_response('index.html',
                              {},
                              context_instance=RequestContext(request))



#def signup(request):
#username = request.POST.get('username')
#password = request.POST.get('password')
#email = request.POST.get('email')

#if User.objects.filter(username=username).exists():
#return HttpResponse('taken')

#User.objects.create_user(username, email, password)
# return HttpResponse('successful')


def edit(request, userid):

    user = User.objects.get(id=userid)
    if not request.user.id==user.id:
        return render_to_response('foodo/error.html',  {},
                                  context_instance=RequestContext(request))
    return render_to_response('foodo/settings.html', {'this_user':user}, context_instance=RequestContext(request))


def change_settings(request):

    cuisine=request.POST["favcuisine"] #matches html
    food=request.POST["favfood"]
    UserSetting.objects.filter(userid=request.user.id).delete()
    if "picture_html" in request.FILES:
        image=request.FILES['picture_html']
    else:
        image=None

    UserSetting.objects.create(cuisine=cuisine, food=food, userid=request.user.id, picture=image)    #matches above post thing
    return HttpResponseRedirect('/foodo/profile/' + str(request.user.id))


def search(request):
    userid = request.POST["usersearch"]
    return HttpResponseRedirect('/foodo/profile/' + str(userid))

def error(request):  #This is the view function to home
    return render_to_response('index.html',
                              {},
                              context_instance=RequestContext(request))



from django.shortcuts import render_to_response
from django.template import RequestContext


def handler404(request):
    response = render_to_response('foodo/error.html', {},
                                  context_instance=RequestContext(request))
    response.status_code = 404
    return response


def handler500(request):
    response = render_to_response('foodo/eroor.html', {},
                                  context_instance=RequestContext(request))
    response.status_code = 500
    return response











