try:
    import sys
    import json
    import requests
    import tkinter as tk
    

    # VARIABLES
    url = "http://localhost:3000/api/users"

    root =tk.Tk()
    root.title("Interfaz de Usuario")

    main_frame = tk.Frame( root, width = 500, height = 300 ) # root window dimensions
    main_frame.pack() # putting our frame into the root window
    
    # LABELS
    name_label = tk.Label(main_frame, text = "Name: ") # name label
    name_label.grid( row = 0, column = 0, sticky = "w", padx = 10, pady = 10) # name label position

    lastname_label = tk.Label(main_frame, text  = "Lastname: ")
    lastname_label.grid( row = 1, column = 0, sticky = "w", padx = 10, pady = 10)

    day_label = tk.Label(main_frame, text  = "Day of Birth: ")
    day_label.grid( row = 2, column = 0, sticky = "w", padx = 10, pady = 10)

    month_label = tk.Label(main_frame, text  = "Birth Month: ")
    month_label.grid( row = 3, column = 0, sticky = "w", padx = 10, pady = 10)

    year_label = tk.Label(main_frame, text  = "Year of Birth: ")
    year_label.grid( row = 4, column = 0, sticky = "w", padx = 10, pady = 10)

    # STRINGVARS
    name = tk.StringVar()
    lastname = tk.StringVar()
    day = tk.StringVar()
    month = tk.StringVar()
    year = tk.StringVar()
    message = tk.StringVar()

    # ENTRIES
    name_entry = tk.Entry(main_frame, textvariable = name)
    name_entry.grid( row = 0, column = 1, padx = 10, pady = 10, columnspan = 4)

    lastname_entry = tk.Entry(main_frame, textvariable = lastname)
    lastname_entry.grid( row = 1, column = 1, padx = 10, pady = 10, columnspan = 4)

    day_entry = tk.Entry(main_frame, textvariable = day)
    day_entry.grid( row = 2, column = 1, padx = 10, pady = 10, columnspan = 4)

    month_entry = tk.Entry(main_frame, textvariable = month)
    month_entry.grid( row = 3, column = 1, padx = 10, pady = 10, columnspan = 4)

    year_entry = tk.Entry(main_frame, textvariable = year)
    year_entry.grid( row = 4, column = 1, padx = 10, pady = 10, columnspan = 4)


    def requesting():
        user = {
            "name": name.get(),
            "lastname": lastname.get(),
            "day": day.get(),
            "month": month.get(),
            "year": year.get() 
        }

        if( user["day"] ):
            user["day"] = int(user["day"])
        else:
            user["day"] = "";

        if( user["month"] ):
            user["month"] = int(user["month"])
        else:
            user["month"] = "";
        
        if( user["year"] ):
            user["year"] = int(user["year"])
        else:
            user["year"] = "";

        print("el json que enviamos por la solicitud: " + json.dumps(user))
        request = requests.post( url, json = user )

        response = request.json() # Anything the POST requests gets, it will be saved in this var "response"
        print("el que recibimos: " + str(response))
        try:
            response_str = 'Your name is ' + response.get('name') + ' and you are ' + str(response.get('age')) + ' years old'
            return response_str
        except:
            return str(response.get('error'))

    def message_creation():

        message_label = tk.Label(main_frame, text  = "Message: ")
        message_label.grid( row = 5, column = 0, sticky = "w", padx = 10, pady = 10)

        year_text = tk.Entry(main_frame, textvariable = message, width = 60 ) # .TEXT creates a text grid
        year_text.grid( row = 5, column = 1, padx = 10, pady = 10, columnspan = 4 )

        final_message = requesting()
        message.set(final_message)
        

    # BUTTON
    send_button = tk.Button(root, text = "Submit", command = message_creation )
    send_button.pack() # packing the button into the ui



    root.mainloop()
    

except ImportError:
    raise ImportError("Se requiere el modulo Tkinter")