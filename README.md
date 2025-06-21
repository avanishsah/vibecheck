# Assignment 1
1. Project Structure - folder - vibe check and inside package.json and server.js
2. Serevr is running 
![image](https://github.com/user-attachments/assets/90fc43cd-93d4-4182-aa18-07683ed6d652)

3. Root Endpoint
![image](https://github.com/user-attachments/assets/132ce406-681a-4425-8f83-5bec8c2618a1)

4. Get all vibes
![image](https://github.com/user-attachments/assets/ca3fd28a-e6d3-44aa-a7c9-bdd786fe1d68)

5. Get Single Vibe - Success
![image](https://github.com/user-attachments/assets/6aa0e7bf-26c1-4295-9ef1-6a626f6d2dd6)

# Get Single Vibe - failure
![image](https://github.com/user-attachments/assets/311660ac-6375-45f5-9efc-efd247c1b1b2)

# Assignment 2
1.
.env file not commited to git with usage of .gitignore
All new foders: config, models, routes, middleware
All files inside required: config/db.js, models/User.js, models/Vibe.js, routes/auth.js, routes/vibes.js, middleware/auth.js

![image](https://github.com/user-attachments/assets/c24dbf47-2640-45ff-9159-e6d33297f3e8)

3. Signup
![image](https://github.com/user-attachments/assets/1b739316-ddb6-4d40-a1b2-c1970443e969)

MongoDB Atlas
![image](https://github.com/user-attachments/assets/252c1c8a-194c-4957-b906-408fc9304f30)


4. User login sucess
![image](https://github.com/user-attachments/assets/a3f01172-ebdd-43d9-a32a-6cf88ea6a724)


Trying to login with wrong password
![Screenshot 2025-06-21 143019](https://github.com/user-attachments/assets/c60d5af0-df79-401f-b7f1-23cf1d8294d8)

5. Posting a Vibe - failed
![image](https://github.com/user-attachments/assets/88aac57f-cc42-40f1-95ed-004a23f5e95b)

Posting a vibe - Authorization with Bearer <your_jwt_token>
![image](https://github.com/user-attachments/assets/f62b1608-bd6c-444a-8d82-bda32ad1bda7)
MongoDB Atlas screenshot 
![image](https://github.com/user-attachments/assets/ae88cf73-8fe1-4816-8a1c-f9b28db83ac5)

6. Get All Vibe Endlpoints
![image](https://github.com/user-attachments/assets/daf5006a-af55-439d-bb79-cd1da6b433c2)

#Assignment 3

1. New Project Structure
Includes - models/Comment.js, routes/comments.js, utils/errorResponse.js, and middleware/error.js.
Logs directory containing logs files
![image](https://github.com/user-attachments/assets/ad7f4d57-75e0-4e48-95b7-af85321f961f)

2. Like/Unlike Functionality
Login as a user A(avanishkumar30)
![image](https://github.com/user-attachments/assets/867b931f-121c-4679-9046-3947e75222b6)

Posted a vibe and got vibe id
![image](https://github.com/user-attachments/assets/e6b0a307-502d-483c-8753-09eed9b34b31)

Login as user B(avanishkumar31)
![image](https://github.com/user-attachments/assets/98f46930-8d56-4d9f-a4cb-01f01949a930)

Made a PUT request and with user B 
Vibe Liked
![image](https://github.com/user-attachments/assets/e352a180-292b-4464-af7e-5186d71e6f15)

Vibe Unliked
![image](https://github.com/user-attachments/assets/50024f1a-fcb1-4945-baf6-bb4558d0e92a)

Verification of Like removed
![image](https://github.com/user-attachments/assets/3207bfe2-07a0-4f8f-bf19-1958d893fb56)

3. Comments
Comment created successfuly
![image](https://github.com/user-attachments/assets/c1335deb-936c-4057-b3b4-0e1467e3bee8)

Verification of the document in MongoDB Atlas
![image](https://github.com/user-attachments/assets/48217380-d355-4da7-b77e-4cdb9623b835)

GET Request to /api/v1/vibes/<VibeID>/comments to verify
![image](https://github.com/user-attachments/assets/a3031f68-9643-438c-a19a-8f5822d448a1)

4. Follow

User A(avanishkumar30) follower User B(avanishkumar31)
![image](https://github.com/user-attachments/assets/11071ba8-9a88-426e-9849-786d4e5d2835)

MongoDB Atlas User A gets follwed by User B
![image](https://github.com/user-attachments/assets/ad73d979-6784-4a48-81ea-9eb45d5dc373)

![image](https://github.com/user-attachments/assets/296edb32-fb9f-425a-b02b-1c93cd4aba05)

User B(avanishkumar31) posted vibe
![image](https://github.com/user-attachments/assets/c06f2d92-2066-44c0-91b3-9c8da0d456f9)
Atlas
![image](https://github.com/user-attachments/assets/6e5e9174-34ac-44a0-aa1c-b6a93cf3d21a)

User A(avanish30) request to the personalized feed endpoint

