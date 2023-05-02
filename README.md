# mark-evaluation
  student marksheet and attendance management system using mern stack 
 
# Installation

 * Clone this repository in your PC.
 * Run the following commands :

 * For frontend :
 ```bash
   install all the dependencies mentioned in package.json from client folder
  and run the command : npm start   (inside client folder)
```
 <br/>

 * For Backend :
 bash
  install all the dependencies mentioned in package.json from server folder
  and run the command : npm run dev   (inside server folder)

 <br/>

 * For database :
 bash
   Either use mongoDB compass or mongoDB atlas 
   ![image](https://user-images.githubusercontent.com/115083239/235641063-890fb003-4642-41a1-8d06-544af6e9a4ac.png)
   in the server/server.js page ..... const DB = ///ur mongodb atlas database link !
 <br/>
 
  * For adminsection :
 bash
    Go to http://localhost:8000/adminlogin
 <br/>
 
 # TechStack
 
 1. Reactjs
 2. Redux
 3. css
 4. Material UI icons
 5. Node
 6. expressjs
 7. mongoose
 8. mongoDB atlas
 
 
# Features

 1. fully functional admin , faculty , student options
 2. admin can add student , add faculty , add subject  to respective departments of that year
 3. The project is build on a large scale which cover all departments and students of all Four year
 4. admin can create notice 
 5. admin has to initiate classroom ... like assigning a teacher to class ,  every teacher can be assigned with maximum four classes
 6. The admin's home page will have an option to upgrade the year. Clicking this option will increment all student's year levels, removes fourth-year student's data       from the database, and send them to alumni lists. Additionally, there is an option to start the odd semester and even semester.
 7. student, subject , faculty can be deleted by admin
 8. when the student/faculty login for the first time they have to change thier password compulsorily
 9. Faculty can enter student's marks for IA/MIDSEM/ENDSEM, and once entered, they can be changed in the future if necessary. If a subject has a practical sessions,       then term work and oral marks should also be entered. Teachers will give credit points to each student based on their behavior during lectures and interactions with teachers..                                                                
 10. The admin can generate results for the ongoing semester, in which the SGPI for every student will be calculated based on the marks entered by their teachers. If a student fails in any subject, their result will be incomplete
    
 11. faculty can also record attendance of students and monthly defaulter list will be released automatically on the first day of every month ,Teachers can download the defaulter list in excel format
 
 12. students can check their IA/MIDSEM/ENDSEM marks their final result.
 13. students can also check thier overall attendance of ongoing semester or monthly attendance of every subjects
 
 
 
# Features to be added later in future

 1. forgot password options
 2. contest for students
 3. mobile responsiveness and css
 
# Preview
## Login
![image](https://user-images.githubusercontent.com/115083239/234982792-47984150-0373-42ee-90f8-d95e2706f77a.png)
![image](https://user-images.githubusercontent.com/115083239/234982944-3b2bcd9d-c437-4c41-93ab-1a36afdf5223.png)

## Student session
![image](https://user-images.githubusercontent.com/115083239/234983424-9fef9bdd-b832-43c5-bc78-e9d8d7e820ac.png)
![image](https://user-images.githubusercontent.com/115083239/234984332-c91ce73d-3d69-48d3-987d-d7a20f9a383a.png)
![image](https://user-images.githubusercontent.com/115083239/234983362-28d313c3-574c-4779-88f1-dac571f9d1d0.png)
![image](https://user-images.githubusercontent.com/115083239/234983632-bfe8e506-a2f5-4d73-a7fd-667a77aad275.png)
![image](https://user-images.githubusercontent.com/115083239/234983833-48710b70-f42f-4f8e-ad01-a8e629778dbd.png)


## Teacher Session
![image](https://user-images.githubusercontent.com/115083239/234984038-a4dcb245-f9be-4f0e-b73c-66e72576c978.png)


<br/><br/>
Regards,<br/>
Jamal Mydeen. 
 




    
 
 
 
