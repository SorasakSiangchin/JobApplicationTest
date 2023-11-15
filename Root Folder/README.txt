FrontEnd => React Ts (สร้างโปรเจ็คโดย vite)
	- css framework => Ant Design 5.0
	- จัดการ form โดย formik --version 2.4.5

BackEnd => Api .Net Core C# (7.0)
	- ใช้วิธีการ ORM ในการสร้าง Database
	- มีการ Hash Password
	- มีการสร้าง token ให้กับผู้ใช้งาน

Database => Sql Server Menagement --version 15.0.2000.5

ระบบความปลอดภัย => กันมุดโดยเริ่มต้นจะเข้าได้แค่หน้า Login กับ Register ถ้าพยายามจะมุดไปหน้าอื่นระบบจะให้กับมา Login ก่อน แต่ถ้า Login แล้วจะกลับไปที่หน้า Login กับ Register ไม่ได้จนกว่าจะ Logout 

วิธีใช้งานคร่าวๆ => หากเข้าสู่ระบบสำเร็จผู้ใช้งานจะยังไม่เห็น Post ของไครจนกว่าจะเพิ่มเพื่อน และในหน้าเพิ่มเพื่อนจะมี Input สำหรับคนหาเพื่อนโดยใช้ชื่อ ในหน้าโปรไฟล์จะมี Post ของเรา เราสร้างสามารถสร้าง Content จะ Post ได้