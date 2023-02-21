-- Active: 1676131907121@@127.0.0.1@3306

insert into 
  cars (
	pricein, 
	brand, 
	model, 
	generation, 
	manufactureyear, 
	bodytypeid, 
	enginetype, 
	wheeltype, 
	geartype, 
	mileage, 
	id, 
	country, 
	active, 
	saleprice
  )
values
  (
	1111, 
	'mazda', 
	'626', 
	'2', 
	'1999', 
	'1', 
	'1', 
	'1', 
	'1', 
	666, 
	1, 
	2, 
	'tue', 
	888888
  );



  
  SELECT * FROM cars c 
  JOIN bodytype b ON (c.bodytypeid=b.id);