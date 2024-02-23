# Agroghala - Farm | Store | Sell

## Console documentation

The Agroghala `console` is based on the `console.py` file.
Meant for users who would like to interract with Agroghala on the `CLI`. The console is written in python and is based on the `models` that can be accessed in the `models folder`.

The models include:
1. BaseModel (BaseModel where all the other models will inherit from)
    Fields:
        - id (Created using uuid4)
        - created_at (Datetime field defaults to current time when the appropriate model is created)
        - updated_at (Datetime field that updates whenever the appropriate model is updated)
    Methods:
        - `__str__()` that returns the formal string representation of the class
        - `to_dict()` that returns the dictionary representation of the class
        - `save()` that creates and saves a new instance of the class
        - `delete()` that deletes an instance of the class from the storage engine selected
2. User
    Fields:
        - first_name
        - last_name
        - email
        - password
    Methods:
        - encrypt_password (Encrypts password using `HS256` algorithm and stores it in the appropriate storage engine selected in `models/engines`)
        - verify_password (Decrypts the Password and will be used during login)
3. Token
    Fields:
        - user_id
        - access_token
        - refresh_token
    Methods:
        - `create_token()` Creates an access and refresh token for the user whose user_id is specified
4. Profile
    Fields:
        - phone_number
        - location
        - user_id      

**The rest of the Models can be accessed in the `models` folder with their appropriate documentation**

*To interact with the Console:*
Install the required dependencies using
- `pip install -r requirements.txt` in Windows Powershell
- `pip3 install -r requirements.txt` in WSL Ubuntu or Any Linux based system

**This is for `Python3` users**

Run the following Command to spin up the console:
- `python .\console.py` on Windows Powershel and you should get the following
`D:\projects\agroghala> python .\console.py`
`(agroghala)`
- `./console.py` on WSL or any Linux based System and you should get the following
`robert@servedsk:~/agroghala$ ./console.py` 
`(agroghala)`


🥳 Congratulations! You just Spun up your Console!!


Now for the Commands:
    - `help <cmd>` lists the documentation on any command available in the console. If you omit the <cmd> then it wil list all avilable commands by default. Here is an example

    `(agroghala) help

    Documented commands (type help <topic>):
    ========================================
    EOF  all  create  destroy  exit  help  show  update

    (agroghala) help create
    Creates a new instance of a class
            usage: create <class_name> <param1> <param2> <param3>...`


    - `create` Creates an instance of a specified class. Here is an example: (The parameters are optional)
        `(agroghala) create User first_name="Robert" last_name="Odhiambo" email="odhiz@gmail.com" password="odhizpwd" 
        19edacb5-2ffb-42be-b1c8-3b82986a1cef`

    - `all` Lists all object in the storage engine. Here is an example usage:
        `(agroghala) all
        [[User] (19edacb5-2ffb-42be-b1c8-3b82986a1cef) {'first_name': 'Robert', 'last_name': 'Odhiambo', 'email': 'odhiz@gmail.com', 'password': '$2b$12$0Y3N2hsVe0xOOq59Dewxv.pnWC9.PlAMvR0G32.G7EDKejiJ/f5Nu', 'id': '19edacb5-2ffb-42be-b1c8-3b82986a1cef', 'updated_at': datetime.datetime(2024, 2, 23, 14, 43, 10, 948012)}, [Blog] (263665b6-b2d0-4e53-9387-9c73ec39413f) {'title': 'Agroghala', 'author': '19edacb5-2ffb-42be-b1c8-3b82986a1cef', 'id': '263665b6-b2d0-4e53-9387-9c73ec39413f', 'updated_at': datetime.datetime(2024, 2, 23, 15, 5, 33, 465632)}]
        (agroghala) all Blog
        [[Blog] (263665b6-b2d0-4e53-9387-9c73ec39413f) {'title': 'Agroghala', 'author': '19edacb5-2ffb-42be-b1c8-3b82986a1cef', 'id': '263665b6-b2d0-4e53-9387-9c73ec39413f', 'updated_at': datetime.datetime(2024, 2, 23, 15, 5, 33, 465632)}]`

    - `destroy` Deletes an instance of the specified class and id. Here is an example:
        `(agroghala) all Blog
        [[Blog] (263665b6-b2d0-4e53-9387-9c73ec39413f) {'title': 'Agroghala', 'author': '19edacb5-2ffb-42be-b1c8-3b82986a1cef', 'id': '263665b6-b2d0-4e53-9387-9c73ec39413f', 'updated_at': datetime.datetime(2024, 2, 23, 15, 5, 33, 465632)}]
        (agroghala) destroy Blog 263665b6-b2d0-4e53-9387-9c73ec39413f
        (agroghala) all Blog
        []`

    - `show` Selects an instance of the class whose id is specified. Here is an example:
        `(agroghala) show Blog 472bc445-41cb-4762-b7e9-19fb661efaf7
        [Blog] (472bc445-41cb-4762-b7e9-19fb661efaf7) {'title': 'Agroghala', 'author': '19edacb5-2ffb-42be-b1c8-3b82986a1cef', 'id': '472bc445-41cb-4762-b7e9-19fb661efaf7', 'updated_at': datetime.datetime(2024, 2, 23, 15, 8, 4, 495243)}
        (agroghala)`

    - `update` Updates a parameter for a Class whose id is specified, Here is an example:
        `(agroghala) update Blog 472bc445-41cb-4762-b7e9-19fb661efaf7 title "Ag_ghala - Cool name" 
        (agroghala) show Blog 472bc445-41cb-4762-b7e9-19fb661efaf7
        [Blog] (472bc445-41cb-4762-b7e9-19fb661efaf7) {'title': 'Ag_ghala - Cool name', 'author': '19edacb5-2ffb-42be-b1c8-3b82986a1cef', 'id': '472bc445-41cb-4762-b7e9-19fb661efaf7', 'updated_at': datetime.datetime(2024, 2, 23, 15, 15, 47, 388529)}`

    - `exit` Exits the Console. Example usage:
        `(agroghala) exit
        Bye`

🥳 Congratulations! You just finished your first Tutorial.

**Remember that using gthis will Create a `file.json` at the root of your directory where you spun up you console from. Do not be shocked to see this new File**
We are currently using File storage.  But what about YOU, yes YOU who loves DATABASES. 
You will find a file named `setup_agroghala_dev.sql`at the root of your agroghala directory. First ensure you have every dependency installed above using `pip install -r requirements.txt`. You do not need to repeat this process if your console worked well. Open the `setup_agroghala_dev.sql` file and set a password for your `ag_dev` user where you will get the `######`. 

Once done you can run the following command in your cli to create the database and users in your MySQL Server.

`cat 'setup_agroghala_dev.sql' | mysql -uroot -p`

If this works without an error then you have successfully created the database and user. You can try this command to confirm all this.

`mysql -uag_dev -p<your password for this user>` then in your mysql server `SHOW DATABASES;` and check if `agroghala_dev_db` is in the list of databases.

If all this is okay. You have successfully setup your Database and can start working with it. Exit the shell and let's spin up the console using the database. Unfortunately I have only documented the parts that follow for users using WSL or any Linusx based system.

Run the following command to spin up the console but this time using Database_storage

`AG_MYSQL_USER=ag_dev AG_MYSQL_PWD=<your_user_password> AG_MYSQL_HOST=localhost AG_MYSQL_DB=agroghala_dev_db AG_TYPE_STORAGE=db ./console.py`

*Remember to change <your_user_password> to the correct password*

You can now interract with the console now using the DATABASE. Interesting right!! No file.json, open your database and `USE agroghala_dev_db`. You can then select from each table and see your created instances.
    