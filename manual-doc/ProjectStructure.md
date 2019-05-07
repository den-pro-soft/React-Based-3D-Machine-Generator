#### List of global variables
1. **app** - Container.js
2. **container** - Container.js
4. **Popup, DialogPopup, DraggablePopup** - popup.js (need remove from global scope)
5. **Helper** - Container.js
6. **Exception** - Container.js

---
popup.js and function.1.0.js - most be removed

---
The project has environment variables. The default values define in the webpack.config.json file.  
You can override the variables in the ./.env file. 

All the environment variables are global.


---
Structure of data file [*.emsx](./asset/example.emsx) is in the  [data_structure.dtd](./asset/format.dtd) file.



---
_The design was carried out in the program [StarUML](http://staruml.io/) ,
the actual project file can be found [here](./asset/UML project.mdj)_