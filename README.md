# 3813ICTassignment
<h1>https://github.com/Lukefisher7/LukeFisherChatApp.git<h1>
<h1>Assignment 2 Documentation <h1>
<h4>Git <h4>
<p>For version control the repository was clone to my local device and continually updated when significant changes were made. There was a single branch used which was main, this was to avoid over complications and to keep all the progress in one place. Appropriate comments were added to each commit to ensure there was no ambiguity on what had been changed in each push to the online GitHub repository. The main branch was used to avoid errors on the version control. <p>

<h4>Data Structures<h4>
<p>Database structures and Operations 
As per assignment 2 the local storage previously used was replaced with a NoSQL database, mongoDB, this was used as a replacement as it stores the data unlike the local storage which clears when the window is closed, this also improves data security as the user data cannot be accessed from the front end. 
Within the mongo database used within the local server there was 4 collections to manage the data, users, groups, channels and chat history each dealing with the necessary information for the front end to structure the application so that the groups include the correct users and channels, and the channels include the correct users, the chat history collection is so that the previous messages are displayed on the chat component. The data was stored in 4 types of objects with the collections<p>

<p>Collections: 
Users: {
id_: string;
Username: string;
Password: string;
Email: string;
Role: string;
}
Groups: {
_id: string;
name: string;
users: [];
channels: [];
}

Channels : {
_id: string;
name: string;
users: [];
}
ChatHistory: {
Chats: [];
}
<p>
<h4>Rest API<h4>
<p>The server uses express to post or get the collections from mongodb. It will initiate the request either use post or get method when the user request data via http Client from front-end with the APIs made within the operation modules.
Get method is used for to retrieve full data, this was used for the user, group and channel lists and the chat history. Get is used to return observable which emits the requested data from the mongo database as coded as the response in the server api.
Post method is used when the data needs to be inserted, deleted or updated. It is also used for to retrieve specific piece of information from the data file like the channels in a group or users in channels/groups.
These are the APIs that Node.js express app will export with routed pathways to the mongoDB:
There are 4 main route files of which the server is connected with; UserOperatons, GroupOperations and ChannelOperations and HistoryOperations each dealing with the CRUD functionality of each type of collection used within the mongo database, exporting the necessary modules depending on the crud functionality needed.
HTTP methods were used with the localhost:3000 being the endpoint 
GET: To retrieve a resource.
POST: To create a new resource.
PUT: To edit or update an existing resource.<p>

<h5>Methods	parameters	returns	Urls	Actions<h5>
<p>
GET	(req,res)		‘/api/getUsers’	Returns array of objects within users collection
GET	(req,res)		‘/api/getGroups’	Returns array of objects within groups collection
GET	(req,res)		‘/api/getChannels’	Returns array of objects within channels collection
GET	(req,res)		‘/api/getChats’	Returns array of objects within chatHistory collection
POST	(req,res)		‘/api/deleteUser’	Removes inputted user from user collection
POST	(req,res)		‘/api/deleteChannel’	Removes inputted channel from channel collection
POST	(req,res)		‘/api/deleteGroup’	Removes inputted group from group collection
POST	(req,res)		‘/api/deleteChat’	Removes corresponding object from history collection
POST	(req,res)		‘/api/insertUser’	Adds user object to users collection
POST	(req,res)		‘/api/addGroup’	Adds group object to group collection
POST	(req,res)		‘/api/addChannel’	Adds channel object to channel collection
POST	(req,res)		‘/api/addChat’	Adds chat object to history collection
PUT	(req,res)		‘/api/editUser’	Edits current user object in users collection
<p>
<h4>Angular Architecture<h4>
<p>For the front-end angular architecture there were multiple different data types used to manage the information given from the server and how the data was displayed on the client end.
For information dependent content like group and channel components the local storage was used to store the current user and role, information was then retrieved or posted depending on the current user and role. 
Components:
Login Component: used to authenticate user with username and password and navigate to account page.
Functions: 
submit(): uses auth API to post method to check users collection for valid combinations, collection.countDocuments was used to compare fetched data of client inputted username and password, if instance of combination was found within the objects of the users collection a counter variable was incremented and  true response was sent back to the client, thus authenticating the user. The submit function then gets the user list from the collection and compares the inputted username to the corresponding user object to retrieve the correct user role for permissions. Stores the role and username to local storage for other components to use fetched data.

Account component: used as the home page for user, includes dashboard for admin actions and list of groups available to user 
Functions: 
roleSet(): uses local storage role value to assign the role permission service to the user in order to display the available admin options for the page like add group, create user, remove user.
createUser(): uses user data service addUser function to add user with inputted username and generated id password to be set on first log in. 
deleteUser(): uses user data service deleteUser function to remove use with inputted username.
addGroups(): uses httpclient and post method to send inputted new group name to insertGroup API to insert new group object into group collection, adds user who initialised group to users array as first user with httpclient post meth using the . 
deleteGroup(); deletes group object from the groups collection.


Group component: used as the group page to navigate into channels within the group, dashboard included to edit group, add channel within group or manage users within the group.
Functions:
addUser(): adds user to group object in collection into the users array within object, returns alert confirming addition success.
removeUser(); removes user from group in the users array in the collection and returns alert that user had been removed from group
channelList(); gets the group from the collection and pushes the channel array from object into variable to be printed to front end
addChannel(); adds channel to the channel collection and updates the  group collection channels array to include channel for user navigation and usage
userList(); gets the user array from the group object of the corresponding name in the collection and returns array to be printed to front end.
deleteChannel(); deletes specified channel from the channels database
Channel component: used as the chatroom page where the chat is displayed, the user list is displayed and the dashboard for any available actions including managing users or deleting the channel. This is where the chatbox component is implemented. Includes the chatbox which is the main chat functionality, displays the user and text sent. Used with the implemented sockets service with socketio to chat between users. 

Functions: 
addUser(); adds user to the users array in the channel object within the channels collection
  removeUser(); removes user from the users array in the channel object within the channels collection
   userlist(); gets the user array from the channel object of the corresponding name in the collection and returns array to be printed to front end.
initIoConnection(): connects with sockets and gets the corresponding chat history for the channel, inserts the message array into the chat history collection. Notifies when user joins the channel and socket connection is made.
chat(): sends the current message content typed to the socket service to be posted to the chat history collection with the user who sent it, then clears the message content for another message to be entered
Sidenav component: used to navigate between the groups, the logout feature and return to account functionality is also present. 
Functions:
Logout(): clears the local storage and navigates back to the login page
getGroups(): uses user value from local storage to find all instances where user is included within a group object in the groups collection, this is done with the http get method connecting the to getGroups API, if the current username is the same as the iterated username in the group.user array the group name is pushed to an array for the group list. 

Services:
RolePermissions Service: used to display admin actions based on the role of user. Below is the structure used for each role with Boolean variables depending on the role of the user, SuperAdmin, GroupAdmin, GroupAssis and BaseUser. For the sake of simplicity within the application the roles were made universal for all groups and channels as it would require implementation of group/channel roles individually.
Role = {
createUser: true,
removeUser: true,
createGroup: true,
deleteGroup: true,
updateUserGroupPerms: true,
createChannel: true,
deleteChannel: true,
updateUserChannelPerms: true,
setGroupAssRole: true,
setGroupAdminRole: true,
setSuperAdminRole: true
};
Socketio service: used to communicate with server with socket to communicate between uses in chatbox component.
Observes when user is connected or disconnected, sends and receives the chat history from the api and collections, emits messages to sockets and connects socket to local host 3000.
User data service: used to manage user information with database with CRUD functionality. 

Models:
User model: used as an interface containing the necessary info of a user like username, id, password, role.  
<p>

